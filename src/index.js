import warning from 'warning';

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

function checkColor(color) {
  const result = /^#(([0-9a-f]){8})$|^#(([0-9a-f]){3}){1,2}$/i.test(color);
  warning(result, `Passed color - ${color} has a wrong format - use '#rgb', '#rrggbb' or '#aarrggbb'`);

  return result;
}

const attributesValue = {
  align: value => value,
  background: value => (checkColor(value) ? `B${value}` : null),
  foreground: value => (checkColor(value) ? `F${value}` : null),
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
