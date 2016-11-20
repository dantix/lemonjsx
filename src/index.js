import warning from 'warning';

import {
  validateColor,
  validateAlignment,
  validateFont,
  validateOffset,
} from './validate';

const tags = {
  section: {
    open: '',
    close: '',
    availableAttrs: [
      'align',
      'foreground',
      'background',
      'underline',
      'offset',
      'font',
    ],
  },
  bar: {
    open: '',
    close: '\n',
    availableAttrs: [],
  },
};

const attributesValue = {
  align: value => (validateAlignment(value) ? value : null),
  background: value => (validateColor(value) ? `B${value}` : null),
  foreground: value => (validateColor(value) ? `F${value}` : null),
  underline: value => (validateColor(value) ? `U${value}` : null),
  font: value => (validateFont(value) ? `T${value}` : null),
  offset: value => (validateOffset(value) ? `O${value}` : null),
};

function getAttributeValueForTag(available) {
  return function getAttributeValue(attribute, input) {
    const converter = attributesValue[attribute];
    if (!converter) {
      return warning(converter, `This attribute - ${attribute} is not supported`);
    }

    const canBeUsed = available.includes(attribute);
    if (!canBeUsed) {
      return warning(canBeUsed, `This attribute - ${attribute} is not available for this tag`);
    }

    return converter(input);
  };
}

function attributes(attrs, getAttributeValue) {
  if (!attrs) { return ''; }

  const result = Object.entries(attrs)
    .map(([key, value]) => getAttributeValue(key, value))
    .filter(v => v)
    .join(' ');

  return result ? `%{${result}}` : '';
}

export default function f(element, attrs, ...children) {
  if (typeof element === 'function') {
    return element(Object.assign({}, attrs, { children }));
  }

  const tag = tags[element];
  const getAttributeValue = getAttributeValueForTag(tag.availableAttrs);
  const attrsValue = attributes(attrs, getAttributeValue);
  const childrenValue = children.join('');

  return `${tag.open}${attrsValue}${childrenValue}${tag.close}`;
}
