'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _slider = require('../../slider');

var _slider2 = _interopRequireDefault(_slider);

var _numericstepper = require('../../numericstepper');

var _numericstepper2 = _interopRequireDefault(_numericstepper);

var _math = require('math');

var _throttle = require('../../utils/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _styles = require('../../styles');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HSVColorPicker = function (_React$Component) {
    _inherits(HSVColorPicker, _React$Component);

    function HSVColorPicker() {
        _classCallCheck(this, HSVColorPicker);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(HSVColorPicker).call(this));

        _this.state = { drag: false, boundingRect: null };

        var computeHsvFromMouseEvent = function computeHsvFromMouseEvent(e, bounds) {

            var x = e.clientX === undefined ? e.touches[0].clientX : e.clientX,
                y = e.clientY === undefined ? e.touches[0].clientY : e.clientY;

            return {
                h: _this.props.value.h,
                s: (x - bounds.left) / bounds.width * 100,
                v: (bounds.height - (y - bounds.top)) / bounds.height * 100
            };
        };

        _this.onMouseDown = function (e) {

            e.preventDefault();

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

            _this.setState({ drag: true, boundingRect: rect });
            _this.props.onChange(computeHsvFromMouseEvent(e, rect));
        };

        _this.onMouseMove = (0, _throttle2.default)(function (e) {
            e.preventDefault();
            if (_this.state.drag) _this.props.onChange(computeHsvFromMouseEvent(e, _this.state.boundingRect));
        });

        _this.onMouseUp = function (e) {
            _this.setState({ drag: false });
        };

        _this.onHueChange = function (h) {
            var _this$props$value = _this.props.value;
            var s = _this$props$value.s;
            var v = _this$props$value.v;

            _this.props.onChange({ h: h, s: s, v: v });
        };

        _this.onSaturationChange = function (s) {
            var _this$props$value2 = _this.props.value;
            var h = _this$props$value2.h;
            var v = _this$props$value2.v;

            _this.props.onChange({ h: h, s: s, v: v });
        };

        _this.onValueChange = function (v) {
            var _this$props$value3 = _this.props.value;
            var h = _this$props$value3.h;
            var s = _this$props$value3.s;

            _this.props.onChange({ h: h, s: s, v: v });
        };
        return _this;
    }

    _createClass(HSVColorPicker, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps, nextState) {
            var _props$value = this.props.value;
            var h = _props$value.h;
            var s = _props$value.s;
            var v = _props$value.v;
            var color = nextProps.value;

            return (h !== color.h || s !== color.s || v !== color.v) && (0, _reactAddonsShallowCompare2.default)(this, nextProps, nextState);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var label = _props.label;
            var onChange = _props.onChange;
            var value = _props.value;
            var style = _props.style;
            var h = value.h;
            var s = value.s;
            var v = value.v;


            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { style: [_styles.base, style] },
                    _react2.default.createElement(
                        'svg',
                        { width: '100%', height: '100%', xmlns: 'http://www.w3.org/2000/svg',
                            ref: function ref(_ref) {
                                return _this2.domRef = _ref;
                            }, style: defaultStyle,
                            onMouseDown: this.onMouseDown,
                            onMouseMove: this.state.drag ? this.onMouseMove : null,
                            onMouseUp: this.onMouseUp,
                            onTouchStart: this.onMouseDown,
                            onTouchMove: this.state.drag ? this.onMouseMove : null,
                            onTouchEnd: this.onMouseUp },
                        _react2.default.createElement(
                            'defs',
                            null,
                            _react2.default.createElement(
                                'linearGradient',
                                { id: 'horizontal-gradient' },
                                _react2.default.createElement('stop', { offset: '0%', stopColor: 'white' }),
                                _react2.default.createElement('stop', { offset: '100%', stopColor: "hsl(" + h + ",100%,50%)" })
                            ),
                            _react2.default.createElement(
                                'linearGradient',
                                { id: 'vertical-gradient', x1: '0', x2: '0', y1: '0', y2: '1' },
                                _react2.default.createElement('stop', { offset: '0%', stopColor: 'black', stopOpacity: '0' }),
                                _react2.default.createElement('stop', { offset: '100%', stopColor: 'black' })
                            ),
                            _react2.default.createElement(
                                'linearGradient',
                                { id: 'hsv-gradient' },
                                stops
                            )
                        ),
                        _react2.default.createElement('rect', { width: '100%', height: '100%', style: [rect], fill: 'url(#horizontal-gradient)' }),
                        _react2.default.createElement('rect', { width: '100%', height: '100%', style: [rect], fill: 'url(#vertical-gradient)' }),
                        _react2.default.createElement('circle', { fill: 'none', stroke: 'white', strokeWidth: '1.5', r: '0.3em', cx: s + '%', cy: 100 - v + '%' })
                    )
                ),
                _react2.default.createElement(_slider2.default, { includeStepper: false, label: '', step: 1, min: 1, max: 360, value: h, style: slider, onChange: this.onHueChange }),
                _react2.default.createElement(
                    'div',
                    { style: [_styles.base, stepperStyle] },
                    _react2.default.createElement(_numericstepper2.default, { key: 'h', style: componentLabels, step: 1, min: 1, max: 360, value: Math.round(h), onChange: this.onHueChange, label: 'H' }),
                    _react2.default.createElement(_numericstepper2.default, { key: 's', style: componentLabels, step: 1, min: 1, max: 100, value: Math.round(s), onChange: this.onSaturationChange, label: 'S' }),
                    _react2.default.createElement(_numericstepper2.default, { key: 'v', style: componentLabels, step: 1, min: 1, max: 100, value: Math.round(v), onChange: this.onValueChange, label: 'V' })
                )
            );
        }
    }]);

    return HSVColorPicker;
}(_react2.default.Component);

HSVColorPicker = (0, _radium2.default)(HSVColorPicker);

HSVColorPicker.defaultProps = {
    label: 'HSVColorPicker',
    style: { width: '100%', height: 200 },
    value: { h: 0, s: 80, l: 50 }
};

HSVColorPicker.propTypes = {

    /**
     *  A text label
     */
    label: _react2.default.PropTypes.string,

    /**
     * The default color of the component
     */
    value: _react2.default.PropTypes.shape({
        h: _react2.default.PropTypes.number.isRequired,
        s: _react2.default.PropTypes.number.isRequired,
        v: _react2.default.PropTypes.number.isRequired
    }).isRequired,

    /**
     * Optional component styling
     */
    style: _react2.default.PropTypes.object

};

var defaultStyle = { cursor: 'default' };

var slider = {
    backgroundBar: { fill: 'url(#hsv-gradient)' },
    bar: { fill: 'none' },
    thumb: { fill: 'white' },
    padding: '1em'
};

var stepperStyle = {
    marginLeft: '0.3em',
    marginRight: '0.3em'
};

var componentLabels = { display: 'inline' };

var colorDrop = {
    borderRadius: "50%",
    width: '1em',
    height: '1em',
    float: 'right'
};

var rect = {
    rx: _styles.base.borderRadius,
    ry: _styles.base.borderRadius
};

/*
    Creates an array of svg `<stop>` elements representing a full linear gradient
    from hue 0 -> 360 in a given number of steps
*/

var createLinearGradientOfSVGStops = function createLinearGradientOfSVGStops(steps) {

    var l = 0,
        i = 100 / steps,
        stops = [];

    while (l++ < steps) {
        stops.push(_react2.default.createElement('stop', { offset: String(i * l) + "%", key: l, stopColor: "hsl( " + l * 360 / steps + ", 100%, 50% )" }));
    }

    return stops;
};

/*
    Pre calculate an array of `<stops>` to use as the slider gradient
*/
var stops = createLinearGradientOfSVGStops(100);

exports.default = HSVColorPicker;