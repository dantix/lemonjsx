import warning from 'warning';

export function validateColor(color) {
  const result = /^#(([0-9a-f]){8})$|^#(([0-9a-f]){3}){1,2}$/i.test(color);
  warning(result, `Passed color - ${color} has a wrong format - use '#rgb', '#rrggbb' or '#aarrggbb'`);

  return result;
}
