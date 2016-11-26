'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = f;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _validate = require('./validate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tags = {
  section: {
    open: '',
    close: '',
    availableAttrs: ['align', 'foreground', 'background', 'underline', 'offset', 'font']
  },
  bar: {
    open: '',
    close: '\n',
    availableAttrs: []
  },
  'reverse-colors': {
    open: '%{R}',
    close: '%{R}',
    availableAttrs: []
  }
};

var attributesValue = {
  align: function align(value) {
    return (0, _validate.validateAlignment)(value) ? value : null;
  },
  background: function background(value) {
    return (0, _validate.validateColor)(value) ? 'B' + value : null;
  },
  foreground: function foreground(value) {
    return (0, _validate.validateColor)(value) ? 'F' + value : null;
  },
  underline: function underline(value) {
    return (0, _validate.validateColor)(value) ? 'U' + value : null;
  },
  font: function font(value) {
    return (0, _validate.validateFont)(value) ? 'T' + value : null;
  },
  offset: function offset(value) {
    return (0, _validate.validateOffset)(value) ? 'O' + value : null;
  }
};

function getAttributeValueForTag(available) {
  return function getAttributeValue(attribute, input) {
    var converter = attributesValue[attribute];
    if (!converter) {
      return (0, _warning2.default)(converter, 'This attribute - ' + attribute + ' is not supported');
    }

    var canBeUsed = available.includes(attribute);
    if (!canBeUsed) {
      return (0, _warning2.default)(canBeUsed, 'This attribute - ' + attribute + ' is not available for this tag');
    }

    return converter(input);
  };
}

function attributes(attrs, getAttributeValue) {
  if (!attrs) {
    return '';
  }

  var result = Object.entries(attrs).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return getAttributeValue(key, value);
  }).filter(function (v) {
    return v;
  }).join(' ');

  return result ? '%{' + result + '}' : '';
}

function f(element, attrs) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (typeof element === 'function') {
    return element(Object.assign({}, attrs, { children: children }));
  }

  var tag = tags[element];

  if (!tag) return '';

  var getAttributeValue = getAttributeValueForTag(tag.availableAttrs);
  var attrsValue = attributes(attrs, getAttributeValue);
  var childrenValue = children.join('');

  return '' + tag.open + attrsValue + childrenValue + tag.close;
}