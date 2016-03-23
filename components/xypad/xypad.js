'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _NumericStepper = require('../NumericStepper');

var _NumericStepper2 = _interopRequireDefault(_NumericStepper);

var _math = require('math');

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var XYPad = function (_React$Component) {
    _inherits(XYPad, _React$Component);

    function XYPad() {
        _classCallCheck(this, XYPad);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(XYPad).call(this));

        _this.state = { drag: false };

        _this.computeXYfromMouseEvent = function (e) {
            var bounds = _this.domRef.getBoundingClientRect();
            return {
                x: (0, _math.map)(e.clientX, bounds.left, bounds.right, _this.props.xmin, _this.props.xmax),
                y: (0, _math.map)(e.clientY, bounds.top, bounds.bottom, _this.props.ymin, _this.props.ymax)
            };
        };

        _this.onMouseDown = (0, _lodash2.default)(function (e) {
            _this.setState({ drag: true });
            _this.props.onChange(_this.computeXYfromMouseEvent(e));
        }, 1000 / 60);

        _this.onMouseMove = function (e) {
            _this.props.onChange(_this.computeXYfromMouseEvent(e));
        };

        _this.onMouseUp = function (e) {
            _this.setState({ drag: false });
        };
        return _this;
    }

    _createClass(XYPad, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var value = _props.value;
            var xmin = _props.xmin;
            var xmax = _props.xmax;
            var ymin = _props.ymin;
            var ymax = _props.ymax;
            var width = _props.width;
            var height = _props.height;
            var label = _props.label;
            var _onChange = _props.onChange;
            var x = value.x;
            var y = value.y;
            var drag = this.state.drag;


            var xVis = (0, _math.map)(x, xmin, xmax, 0, width),
                yVis = (0, _math.map)(y, ymin, ymax, 0, height);

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'label',
                    null,
                    label
                ),
                _react2.default.createElement(_NumericStepper2.default, { value: Math.round(x), onChange: function onChange(value) {
                        return _onChange({ x: value, y: y });
                    } }),
                _react2.default.createElement(_NumericStepper2.default, { value: Math.round(y), onChange: function onChange(value) {
                        return _onChange({ y: value, x: x });
                    } }),
                _react2.default.createElement(
                    'svg',
                    { width: width, height: height, viewBox: "0 0 " + width + " " + height, xmlns: 'http://www.w3.org/2000/svg',
                        ref: function ref(_ref) {
                            return _this2.domRef = _ref;
                        },
                        onMouseDown: this.onMouseDown,
                        onMouseMove: drag ? this.onMouseMove : null,
                        onMouseUp: this.onMouseUp },
                    _react2.default.createElement('rect', { fill: 'none', stroke: 'black', strokeWidth: '1', width: width, height: height }),
                    _react2.default.createElement('line', { x1: xVis, x2: xVis, y1: 0, y2: height, stroke: 'black', strokeWidth: 1 }),
                    _react2.default.createElement('line', { x1: 0, x2: width, y1: yVis, y2: yVis, stroke: 'black', strokeWidth: 1 }),
                    _react2.default.createElement('circle', { r: 2, cx: xVis, cy: yVis })
                )
            );
        }
    }]);

    return XYPad;
}(_react2.default.Component);

XYPad.propTypes = {

    width: _react2.default.PropTypes.number,
    height: _react2.default.PropTypes.number,
    value: _react2.default.PropTypes.shape({ x: _react2.default.PropTypes.number.isRequired, y: _react2.default.PropTypes.number.isRequired }),
    xmin: _react2.default.PropTypes.number,
    xmax: _react2.default.PropTypes.number,
    ymin: _react2.default.PropTypes.number,
    ymax: _react2.default.PropTypes.number
};

XYPad.defaultProps = {

    width: 400,

    height: 300,

    value: { x: 200, y: 150 },

    ymin: 0, ymax: 600,

    xmin: 0, xmax: 800

};

exports.default = XYPad;
//# sourceMappingURL=xypad.js.map