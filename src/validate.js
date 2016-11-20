import warning from 'warning';

export function validateAlignment(align) {
  const result = /^(r|l|c)$/i.test(align);
  warning(result, `Passed alignment - ${align} has a wrong value. It can be one of these: 'r', 'l' or 'c'`);

  return result;
}

export function validateFont(font) {
  const number = +font;

  const result = typeof number === 'number'
    && number > 0
    && number <= 5;
  warning(result, `Passed font number - ${number} has a wrong value. It should be a number between 1 and 5 inclusively`);

  return result;
}

export function validateColor(color) {
  const result = /^#(([0-9a-f]){8})$|^#(([0-9a-f]){3}){1,2}$/i.test(color);
  warning(result, `Passed color - ${color} has a wrong format - use '#rgb', '#rrggbb' or '#aarrggbb'`);

  return result;
}

