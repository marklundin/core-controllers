'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _math = require('math');

var _styles = require('../styles');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
    This component is an alternative way to control a number. It's generally used
    for unbounded numerical ranges, when a minimum or maximum isn't unneccesary,
    although you can optionally supply either.
*/

var NumericStepper = function (_React$Component) {
    _inherits(NumericStepper, _React$Component);

    function NumericStepper() {
        _classCallCheck(this, NumericStepper);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(NumericStepper).apply(this, arguments));
    }

    _createClass(NumericStepper, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var label = _props.label;
            var min = _props.min;
            var max = _props.max;
            var step = _props.step;
            var style = _props.style;
            var validate = function validate(v) {
                return Math.round((0, _math.clamp)(v, min, max) * (1 / step)) / (1 / step);
            };
            var value = validate(this.props.value);
            var onChange = function onChange(e) {
                if (!isNaN(_this2.domRef.value)) _this2.props.onChange(validate(parseFloat(_this2.domRef.value)));
            };

            return _react2.default.createElement(
                'div',
                { style: [_styles.base, style] },
                _react2.default.createElement(
                    'label',
                    null,
                    label
                ),
                _react2.default.createElement(
                    'style',
                    null,
                    '\n                input[type=number] {\n                    -moz-appearance:textfield;\n                }\n\n                input::-webkit-inner-spin-button,\n                input::-webkit-outer-spin-button{\n                    margin: 0;\n                    -webkit-appearance: none;\n                }\n            '
                ),
                _react2.default.createElement('input', _extends({ type: 'number' }, this.props, { style: [defaultStyle], value: value, inInput: onChange, onChange: onChange, ref: function ref(_ref) {
                        return _this2.domRef = _ref;
                    } }))
            );
        }
    }]);

    return NumericStepper;
}(_react2.default.Component);

NumericStepper = (0, _radium2.default)(NumericStepper);

NumericStepper.propTypes = {

    /**
     *  A text label
     */
    label: _react2.default.PropTypes.string,

    /**
     *  The value of the slider
     */
    value: _react2.default.PropTypes.number.isRequired,

    /**
     *  Specifies the minimum value for the component
     */
    min: _react2.default.PropTypes.number,

    /**
     *  Specifies the maximum value for the component
     */
    max: _react2.default.PropTypes.number,

    /**
     * Specifies the intervals step
     */
    step: _react2.default.PropTypes.number,

    /**
    * A callback triggered when the component updates
    */
    onChange: _react2.default.PropTypes.func,

    /**
     * Optional component styling
     */
    style: _react2.default.PropTypes.object

};

NumericStepper.defaultProps = {

    label: 'NumericStepper',
    min: 0,
    max: 100,
    style: { width: '100%' },
    step: 0.1,
    onChange: function onChange(a) {
        return a;
    }

};

var defaultStyle = {
    fontFamily: 'inherit',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: _styles.secondary.color,
    borderRadius: 2,
    backgroundColor: 'transparent',
    outline: 'none',
    textAlign: 'center',
    float: 'right',
    ":focus": {
        borderColor: _styles.highlight.color
    },
    ":hover": {
        borderColor: _styles.highlight.color
    }
};

exports.default = NumericStepper;