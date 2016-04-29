'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _numericstepper = require('../numericstepper');

var _numericstepper2 = _interopRequireDefault(_numericstepper);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _math = require('math');

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _throttle = require('../utils/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _styles = require('../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
    A classic numerical slider, useful for representing numbers within a bounded
    range. It also contains a `NumericalStepper` for displaying the text value
    and entering values directly.
*/

var Slider = function (_React$Component) {
    _inherits(Slider, _React$Component);

    function Slider() {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Slider).call(this));

        _this.state = { drag: false, rect: null };

        _this.validate = function (value) {
            var _this$props = _this.props;
            var onChange = _this$props.onChange;
            var min = _this$props.min;
            var max = _this$props.max;
            var step = _this$props.step;


            value = (0, _math.clamp)(value, min, max);
            value = Math.round(value * (1 / step)) / (1 / step);

            return value;
        };

        _this.onNumericStepperChange = function (value) {
            _this.props.onChange(_this.validate(value));
        };

        /*
            Compute the numerical value from a touch/mouse event
        */

        var computeValuefromMouseEvent = function computeValuefromMouseEvent(e, bounds) {
            return (0, _math.map)(e.clientX === undefined ? e.touches[0].clientX : e.clientX, bounds.left, bounds.right, _this.props.min, _this.props.max);
        };

        /*
            Computes the value on mouse/touch down and triggers an `onChange`
        */

        _this.onMouseDown = function (e) {

            e.preventDefault();

            var _this$props2 = _this.props;
            var value = _this$props2.value;
            var min = _this$props2.min;
            var max = _this$props2.max;
            var step = _this$props2.step;
            var onChange = _this$props2.onChange;
            var validate = function validate(v) {
                return Math.round((0, _math.clamp)(v, min, max) * (1 / step)) / (1 / step);
            };

            /*
                For performance reasons we pre calculate the bounding rect on
                mouse down, this means we don't need to do this on every mouse move
                event and therefore we avoid any layout thrashing.
                 The caveat is that any sizing changes that occur between mousedown
                will cause mean the cached boundingRect is invalid and causes incorrect
                results. However because of performance gains, this is acceptable
                behaviour as changes to size are expected to be rare enough
            */
            var rect = _this.domRef.getBoundingClientRect();

            _this.setState({ drag: true, rect: rect });
            onChange(validate(computeValuefromMouseEvent(e, rect)));
        };

        /*
            On mouse/touch move, trigger an onChange event
        */

        _this.onMouseMove = (0, _throttle2.default)(function (e) {
            var _this$props3 = _this.props;
            var value = _this$props3.value;
            var min = _this$props3.min;
            var max = _this$props3.max;
            var step = _this$props3.step;
            var onChange = _this$props3.onChange;
            var validate = function validate(v) {
                return Math.round((0, _math.clamp)(v, min, max) * (1 / step)) / (1 / step);
            };

            onChange(validate(computeValuefromMouseEvent(e, _this.state.rect)));
        });

        _this.onTouchMove = (0, _throttle2.default)(function (e) {

            e.preventDefault();

            var _this$props4 = _this.props;
            var value = _this$props4.value;
            var min = _this$props4.min;
            var max = _this$props4.max;
            var step = _this$props4.step;
            var onChange = _this$props4.onChange;
            var validate = function validate(v) {
                return Math.round((0, _math.clamp)(v, min, max) * (1 / step)) / (1 / step);
            };

            onChange(validate(computeValuefromMouseEvent(e, _this.state.rect)));
        });

        /*
            changes the dragging state
        */

        _this.onMouseUp = function (e) {
            _this.setState({ drag: false });
        };
        return _this;
    }

    _createClass(Slider, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            return (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props, state) {
            if (this.state.drag && !state.drag) {
                document.addEventListener('mousemove', this.onMouseMove);
                document.addEventListener('mouseup', this.onMouseUp);
                document.addEventListener('touchmove', this.onTouchMove);
                document.addEventListener('touchend', this.onMouseUp);
            } else if (!this.state.drag && state.drag) {
                document.removeEventListener('mousemove', this.onMouseMove);
                document.removeEventListener('mouseup', this.onMouseUp);
                document.removeEventListener('touchmove', this.onTouchMove);
                document.removeEventListener('touchend', this.onMouseUp);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var value = _props.value;
            var label = _props.label;
            var min = _props.min;
            var max = _props.max;
            var step = _props.step;
            var onChange = _props.onChange;
            var includeStepper = _props.includeStepper;
            var style = _props.style;
            var stepperProps = { value: value, label: label, min: min, max: max, step: step, onChange: onChange };

            var offsetPercentage = (0, _math.map)((0, _math.clamp)(value, min, max), min, max, 0, 100) + '%';
            value = this.validate(value);

            return _react2.default.createElement(
                'div',
                { style: _styles.base },
                includeStepper ? _react2.default.createElement(_numericstepper2.default, _extends({}, stepperProps, { onChange: this.onNumericStepperChange })) : null,
                _react2.default.createElement(
                    'svg',
                    { width: '100%', height: '0.9em', xmlns: 'http://www.w3.org/2000/svg',
                        style: defaultStyle,
                        onMouseDown: this.onMouseDown,
                        onTouchStart: this.onMouseDown,
                        ref: function ref(_ref) {
                            return _this2.domRef = _ref;
                        } },
                    _react2.default.createElement('rect', { width: '100%', height: '100%', style: [defaultStyle, backgroundBar, style.backgroundBar] }),
                    _react2.default.createElement('rect', _defineProperty({ width: '100%', height: '100%', style: [defaultStyle, bar, style.bar] }, 'width', offsetPercentage)),
                    _react2.default.createElement('circle', { cy: '50%', cx: offsetPercentage, r: '0.45em', style: [defaultStyle, thumb, style.thumb] })
                )
            );
        }
    }]);

    return Slider;
}(_react2.default.Component);

Slider = (0, _radium2.default)(Slider);

Slider.propTypes = {

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
     *  If false, the numeric stepper is not displayed
     */
    includeStepper: _react2.default.PropTypes.bool,

    /**
     * Optional component styling
     */
    style: _react2.default.PropTypes.object

};

Slider.defaultProps = {

    label: 'Slider',
    includeStepper: true,
    min: 0,
    max: 10,
    step: 0.1,
    onChange: function onChange(a) {
        return a;
    },
    style: { width: '100%' }

};

var defaultStyle = {
    overflow: 'visible',
    cursor: 'default',
    stroke: 'none',

    rx: 2,
    ry: 2
};

var thumb = {
    fill: 'none'
};

var backgroundBar = {
    fill: _styles.secondary.color
};

var bar = {
    fill: _styles.highlight.color
};

exports.default = Slider;