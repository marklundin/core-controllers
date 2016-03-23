'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _hslColorpicker = require('./hsl/hsl-colorpicker');

var _hslColorpicker2 = _interopRequireDefault(_hslColorpicker);

var _colr = require('colr');

var _colr2 = _interopRequireDefault(_colr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rgb = _react2.default.PropTypes.shape({
    r: _react2.default.PropTypes.number.isRequired,
    g: _react2.default.PropTypes.number.isRequired,
    b: _react2.default.PropTypes.number.isRequired
}).isRequired;

var hsl = _hslColorpicker2.default.propTypes.value;

var hsl2Rgb = function hsl2Rgb(c) {
    return _colr2.default.fromHslObject(c).toRawRgbObject();
},
    rgb2Hsl = function rgb2Hsl(c) {
    return _colr2.default.fromRgbObject(c).toRawHslObject();
};

var ColorPicker = function (_React$Component) {
    _inherits(ColorPicker, _React$Component);

    function ColorPicker() {
        _classCallCheck(this, ColorPicker);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ColorPicker).apply(this, arguments));
    }

    _createClass(ColorPicker, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var value = _props.value;
            var _onChange = _props.onChange;

            var isRGB = rgb(this.props, 'value') === null;
            var inHsl = isRGB ? rgb2Hsl(value) : value;

            return _react2.default.createElement(_hslColorpicker2.default, _extends({}, this.props, { value: inHsl, onChange: function onChange(outHSL) {
                    return _onChange(isRGB ? hsl2Rgb(outHSL) : outHSL);
                } }));
        }
    }]);

    return ColorPicker;
}(_react2.default.Component);

ColorPicker.propTypes = {

    /**
     *  An object representing a color.
     */
    value: _react2.default.PropTypes.oneOf([rgb, hsl]).isRequired,

    /**
     *  A callback triggered when the color is updated
     */
    onChange: _react2.default.PropTypes.func
};

ColorPicker.defaultProps = {
    value: { r: 1, g: 0, b: 0 },
    onChange: function onChange(a) {
        return a;
    }
};

exports.default = ColorPicker;
//# sourceMappingURL=colorpicker.js.map