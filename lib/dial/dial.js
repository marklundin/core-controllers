'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _numericstepper = require('../numericstepper');

var _numericstepper2 = _interopRequireDefault(_numericstepper);

var _throttle = require('../utils/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _styles = require('../styles');

var _math = require('math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**

    Another numerical control, that provides similar functionality to the
    [Slider](#Slider) but with different layout and more suited for touch
    enabled devices.

*/

var Dial = function (_Component) {
    _inherits(Dial, _Component);

    function Dial() {
        _classCallCheck(this, Dial);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dial).call(this));

        _this.state = { drag: false };

        _this.onMouseDown = function (e) {
            e.preventDefault();
            _this.setState({ drag: true, value: _this.props.value, dragValue: e.clientY == undefined ? e.touches[0].clientY : e.clientY });
        };

        _this.onMouseUp = function (e) {
            _this.setState({ drag: false });
        };

        _this.onMouseMove = (0, _throttle2.default)(function (e) {
            e.preventDefault();
            var y = e.clientY == undefined ? e.touches[0].clientY : e.clientY;
            _this.props.onChange(_this.state.value + (y - _this.state.dragValue) * -0.1);
        });
        return _this;
    }

    _createClass(Dial, [{
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
                document.addEventListener('touchmove', this.onMouseMove);
                document.addEventListener('touchend', this.onMouseUp);
            } else if (!this.state.drag && state.drag) {
                document.removeEventListener('mousemove', this.onMouseMove);
                document.removeEventListener('mouseup', this.onMouseUp);
                document.removeEventListener('touchmove', this.onMouseMove);
                document.removeEventListener('touchend', this.onMouseUp);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var label = _props.label;
            var value = _props.value;
            var min = _props.min;
            var max = _props.max;
            var step = _props.step;
            var style = _props.style;
            var onChange = _props.onChange;
            var stepperProps = { label: label, value: value, min: min, max: max, onChange: onChange };

            value = (0, _math.clamp)(value, min, max);
            value = Math.round(value * (1 / step)) / (1 / step);
            value = (0, _math.normalize)(value, min, max);

            var radius = style.width * 0.5,
                range = 0.8,
                circumference = 2.0 * Math.PI * radius,
                a = [circumference * value * range, circumference].join(' '),
                b = [circumference, circumference].join(' '),
                transform = 'rotate(' + String((1.0 - range) * 0.5 * 360 + 90) + 'deg )';

            /*
                Using a styling trick with the stroke-dasharray property to create
                the dial outline.
                 See https://www.smashingmagazine.com/2015/07/designing-simple-pie-charts-with-css/
                for future reference
            */

            return _react2.default.createElement(
                'div',
                { style: [_styles.base, style, { height: 'auto' }] },
                _react2.default.createElement(_numericstepper2.default, stepperProps),
                _react2.default.createElement(
                    'svg',
                    { style: [svgStyle, { transform: transform }], width: style.width, height: style.width, xmlns: 'http://www.w3.org/2000/svg',
                        ref: function ref(_ref) {
                            return _this2.domRef = _ref;
                        },
                        onMouseDown: this.onMouseDown,
                        onTouchStart: this.onMouseDown },
                    _react2.default.createElement('circle', { r: radius, cx: radius, cy: radius, strokeDasharray: b, fill: 'transparent', stroke: _styles.secondary.color, strokeWidth: radius }),
                    value > 0 ? _react2.default.createElement('circle', { r: radius, cx: radius, cy: radius, strokeDasharray: a, fill: 'transparent', stroke: _styles.highlight.color, strokeWidth: radius }) : null
                )
            );
        }
    }]);

    return Dial;
}(_react.Component);

Dial = (0, _radium2.default)(Dial);

Dial.propTypes = {

    /**
     *  A text label
     */
    label: _react.PropTypes.string,

    /**
     *  The default value
     */
    value: _react.PropTypes.number.isRequired,

    /**
     *  Specifies the minimum value for the component
     */
    min: _react.PropTypes.number,

    /**
     *  Specifies the maximum value for the component
     */
    max: _react.PropTypes.number,

    /**
     * Specifies the intervals step
     */
    step: _react.PropTypes.number,

    /**
    * A callback triggered when the component updates
    */
    onChange: _react.PropTypes.func,

    /**
     * Optional component styling
     */
    style: _react2.default.PropTypes.object

};

Dial.defaultProps = {

    label: 'Dial',
    min: 0,
    max: 10,
    value: 5,
    step: 0.1,
    onChange: function onChange(a) {
        return a;
    },
    style: { width: 100, display: 'inline-block' }

};

var svgStyle = {
    cursor: 'default',
    borderRadius: "50%"
};

exports.default = Dial;