"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A horizontal progress slider with step size and minimum and maximum bounds.
 */
var Slider = function Slider(_ref) {
  var value = _ref.value;
  var label = _ref.label;
  var min = _ref.min;
  var max = _ref.max;
  var step = _ref.step;
  var _onChange = _ref.onChange;
  var width = _ref.width;
  var height = _ref.height;


  var mask = width / 2;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "label",
      null,
      label
    ),
    _react2.default.createElement("input", { type: "range", value: value, step: step, min: min, max: max, onChange: function onChange(e) {
        return _onChange(parseFloat(e.nativeEvent.target.value));
      } })
  );
};

Slider.propTypes = {
  /**
   *  The value of the slider to display
   */
  value: _react2.default.PropTypes.number,

  /**
   *  Specifies the minimum value for the slider
   */
  min: _react2.default.PropTypes.number,

  /**
   *  Specifies the maximum value for the slider
   */
  max: _react2.default.PropTypes.number,

  /**
   * Specifies the legal number intervals for that can be used
   */
  step: _react2.default.PropTypes.number,

  /**
  * A callback triggered when the slider is updated
  */
  onChange: _react2.default.PropTypes.func,

  /**
   *  The width of the component in pixels
   */
  width: _react2.default.PropTypes.number,

  /**
   *  The height of the component in pixels
   */
  height: _react2.default.PropTypes.number

};

Slider.defaultProps = {
  value: 2,
  min: 0,
  max: 10,
  step: 1,
  width: 400,
  height: 10,
  onChange: function onChange(a) {
    return a;
  }
};

exports.default = Slider;
//# sourceMappingURL=slider.js.map