import {
  validateColor,
  validateAlignment,
} from './validate';

const tags = {
  section: {
    open: '',
    close: '',
  },
  bar: {
    open: '',
    close: '\n',
  },
};

const attributesValue = {
  align: value => (validateAlignment(value) ? value : null),
  background: value => (validateColor(value) ? `B${value}` : null),
  foreground: value => (validateColor(value) ? `F${value}` : null),
  underline: value => (validateColor(value) ? `U${value}` : null),
};

function attributes(attrs) {
  if (!attrs) { return ''; }

  const result = Object.entries(attrs)
    .map(([key, value]) => attributesValue[key](value))
    .filter(v => v)
    .join(' ');

  return result ? `%{${result}}` : '';
}

export default function f(element, attrs, ...children) {
  if (typeof element === 'function') {
    return element(Object.assign({}, attrs, { children }));
  }

  const tag = tags[element];
  const attrsValue = attributes(attrs);
  const childrenValue = children.join('');

  return `${tag.open}${attrsValue}${childrenValue}${tag.close}`;
}
