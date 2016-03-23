'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A Simple Checkbox component.
 */
var Checkbox = function Checkbox(_ref) {
	var value = _ref.value;
	var label = _ref.label;
	var _onChange = _ref.onChange;

	return _react2.default.createElement(
		'div',
		null,
		_react2.default.createElement(
			'label',
			null,
			label
		),
		_react2.default.createElement('input', { checked: value, type: 'checkbox', onChange: function onChange(evt) {
				return _onChange(evt.target.checked);
			} })
	);
};

Checkbox.propTypes = {

	/**
  * Determines whether the element is checked or not.
  */
	value: _react2.default.PropTypes.bool,

	/**
  * A callback triggered when the checkbox is toggled
  */
	onChange: _react2.default.PropTypes.func,

	/**
  * Label for form element
  */
	label: _react2.default.PropTypes.string

};

Checkbox.defaultProps = {
	value: false,
	label: '',
	onChange: function onChange(a) {
		return a;
	}
};

exports.default = Checkbox;
//# sourceMappingURL=checkbox.js.map