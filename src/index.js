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
  align: value => value,
  background: value => `B${value}`,
  foreground: value => `F${value}`,
};

function attributes(attrs) {
  if (!attrs) { return ''; }

  const result = Object.entries(attrs)
    .map(([key, value]) => attributesValue[key](value))
    .join(' ');

  return `%{${result}}`;
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
