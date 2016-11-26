'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateAlignment = validateAlignment;
exports.validateOffset = validateOffset;
exports.validateFont = validateFont;
exports.validateColor = validateColor;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateAlignment(align) {
  var result = /^(r|l|c)$/i.test(align);
  (0, _warning2.default)(result, 'Passed alignment - ' + align + ' has a wrong value. It can be one of these: \'r\', \'l\' or \'c\'');

  return result;
}

function validateOffset(input) {
  var result = +input === +input && +input > 0;
  (0, _warning2.default)(result, 'Passed offset - ' + input + ' has a wrong value. It should be a number and greater than 0');

  return result;
}

function validateFont(font) {
  var number = +font;

  var result = typeof number === 'number' && number > 0 && number <= 5;
  (0, _warning2.default)(result, 'Passed font number - ' + number + ' has a wrong value. It should be a number between 1 and 5 inclusively');

  return result;
}

function validateColor(color) {
  var result = /^#(([0-9a-f]){8})$|^#(([0-9a-f]){3}){1,2}$/i.test(color);
  (0, _warning2.default)(result, 'Passed color - ' + color + ' has a wrong format - use \'#rgb\', \'#rrggbb\' or \'#aarrggbb\'');

  return result;
}