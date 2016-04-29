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

var _math = require('math');

var _throttle = require('../utils/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _styles = require('../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**

    This component provides a generic way of controlling 2d numerical quantities such as
    vectors. It's a staple of traditional A/V style applications as a way to
    play with multiple inputs via one interaction. Useful for positional values.
    In this case the values signature is `{x:Number, y:Number}`.

*/

var XYPad = function (_React$Component) {
    _inherits(XYPad, _React$Component);

    function XYPad() {
        _classCallCheck(this, XYPad);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(XYPad).call(this));

        _this.state = { drag: false };

        var computeXYfromMouseEvent = function computeXYfromMouseEvent(e, bounds) {
            return {
                x: (0, _math.map)(e.clientX === undefined ? e.touches[0].clientX : e.clientX, bounds.left, bounds.right, _this.props.min.x, _this.props.max.x),
                y: (0, _math.map)(e.clientY === undefined ? e.touches[0].clientY : e.clientY, bounds.top, bounds.bottom, _this.props.min.y, _this.props.max.y)
            };
        };

        _this.onMouseDown = function (e) {

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
            _this.props.onChange(computeXYfromMouseEvent(e, rect));
        };

        _this.onMouseMove = (0, _throttle2.default)(function (e) {
            if (_this.state.drag) _this.props.onChange(computeXYfromMouseEvent(e, _this.state.rect));
        });

        _this.onTouchMove = function (e) {
            e.preventDefault();
            if (_this.state.drag) _this.props.onChange(computeXYfromMouseEvent(e, _this.state.rect));
        };

        _this.onMouseUp = function (e) {
            _this.setState({ drag: false });
        };

        _this.onXChange = function (x) {
            return _this.props.onChange(_extends({}, _this.props.value, { x: x }));
        };

        _this.onYChange = function (y) {
            return _this.props.onChange(_extends({}, _this.props.value, { y: y }));
        };

        return _this;
    }

    /*
        We're deliberatley not performing any comparison here. This is because
        the props passed in would have to be a copy of the original value, which
        currently isn't the case
    */
    // shouldComponentUpdate( nextProps, nextState ){}

    _createClass(XYPad, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var value = _props.value;
            var label = _props.label;
            var onChange = _props.onChange;
            var style = _props.style;
            var x = value.x;
            var y = value.y;


            var min = _extends({}, this.props.min, XYPad.min),
                max = _extends({}, this.props.max, XYPad.max);

            var xVis = (0, _math.map)(x, min.x, max.x, 0, 100) + '%',
                yVis = (0, _math.map)(y, min.y, max.y, 0, 100) + '%';

            return _react2.default.createElement(
                'div',
                { style: _styles.base },
                _react2.default.createElement(
                    'div',
                    null,
                    label
                ),
                _react2.default.createElement(
                    'div',
                    { style: [style] },
                    _react2.default.createElement(
                        'svg',
                        { width: '100%', height: '100%', xmlns: 'http://www.w3.org/2000/svg',
                            style: defaultStyle,
                            ref: function ref(_ref) {
                                return _this2.domRef = _ref;
                            },
                            onMouseDown: this.onMouseDown,
                            onMouseMove: this.state.drag ? this.onMouseMove : null,
                            onMouseUp: this.onMouseUp,

                            onTouchStart: this.onMouseDown,
                            onTouchMove: this.onTouchMove,
                            onTouchEnd: this.onMouseUp },
                        _react2.default.createElement('rect', { fill: 'none', stroke: _styles.secondary.color, strokeWidth: '1', width: '100%', height: '100%' }),
                        _react2.default.createElement('line', { x1: xVis, x2: xVis, y1: 0, y2: '100%', style: [defaultStyle, style, crisp] }),
                        _react2.default.createElement('line', { x1: 0, x2: '100%', y1: yVis, y2: yVis, style: [defaultStyle, style, crisp] }),
                        _react2.default.createElement('circle', { r: 3, cx: xVis, cy: yVis, style: circle })
                    ),
                    _react2.default.createElement(_numericstepper2.default, { style: _extends({}, componentLabels, { width: style.width }), min: min.x, max: max.x, value: x, onChange: this.onXChange, label: 'X' }),
                    _react2.default.createElement(_numericstepper2.default, { style: _extends({}, componentLabels, { width: style.width }), min: min.y, max: max.y, value: y, onChange: this.onYChange, label: 'Y' })
                ),
                _react2.default.createElement('div', { style: { clear: 'both' } })
            );
        }
    }]);

    return XYPad;
}(_react2.default.Component);

XYPad = (0, _radium2.default)(XYPad);

XYPad.propTypes = {

    /**
     * A text label
     */
    label: _react.PropTypes.string,

    /**
     *  The initial value of the component
     */
    value: _react.PropTypes.shape({ x: _react.PropTypes.number.isRequired, y: _react.PropTypes.number.isRequired }).isRequired,

    /**
     *  The minimum bounding range
     */
    min: _react.PropTypes.shape({ x: _react.PropTypes.number, y: _react.PropTypes.number }),

    /**
     *  The maximum bounding range
     */
    max: _react.PropTypes.shape({ x: _react.PropTypes.number, y: _react.PropTypes.number }),

    /**
     *  Called when the component updates
     */
    onChange: _react.PropTypes.func,

    /**
     * Optional component styling
     */
    style: _react.PropTypes.object

};

XYPad.defaultProps = {

    label: 'XYPad',
    style: { width: '100%', height: 150 },
    min: { x: 0, y: 0 },
    max: { x: 100, y: 100 },
    onChange: function onChange(a) {
        return a;
    }

};

var defaultStyle = {
    cursor: 'default',
    stroke: _styles.secondary.color,
    strokeWidth: 1
};

var crisp = {
    shapeRendering: 'crispEdges'
};

var circle = {
    fill: _styles.secondary.color,
    stroke: 'none'
};

var componentLabels = { display: 'inline' };

exports.default = XYPad;