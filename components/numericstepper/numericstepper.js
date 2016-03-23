'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash.throttle');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NumericStepper = function (_React$Component) {
    _inherits(NumericStepper, _React$Component);

    function NumericStepper() {
        _classCallCheck(this, NumericStepper);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NumericStepper).call(this));

        _this.state = { drag: false };

        _this.onMouseUp = function (_) {
            _this.setState({
                value: _this.props.value,
                drag: false
            });
        };

        _this.onMouseMove = (0, _lodash2.default)(function (e) {
            var boundingBox = _this.domRef.getBoundingClientRect();
            var height = boundingBox.top - boundingBox.bottom;
            var center = boundingBox.top - height * 0.5;
            var value = e.clientY - center;
            _this.props.onChange(_this.state.initialValue - value);
        }, 1000 / 60);
        return _this;
    }

    _createClass(NumericStepper, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(props, state) {
            if (this.state.drag && !state.drag) {
                document.addEventListener('mousemove', this.onMouseMove);
                document.addEventListener('mouseup', this.onMouseUp);
            } else if (!this.state.drag && state.drag) {
                document.removeEventListener('mousemove', this.onMouseMove);
                document.removeEventListener('mouseup', this.onMouseUp);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement('input', { type: 'text', value: this.props.value, onChangge: this.props.onChange, ref: function ref(_ref) {
                    return _this2.domRef = _ref;
                }, onMouseDown: function onMouseDown(e) {
                    return _this2.setState({ drag: true, initialValue: _this2.props.value });
                } });
        }
    }]);

    return NumericStepper;
}(_react2.default.Component);

exports.default = NumericStepper;
//# sourceMappingURL=numericstepper.js.map