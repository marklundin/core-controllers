'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextInput = function TextInput(_ref) {
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
		_react2.default.createElement('input', {
			value: value,
			type: 'text',
			onChange: function onChange(evt) {
				return _onChange(evt.target.value);
			} })
	);
};

TextInput.propTypes = {

	/**
  * Determines the content of the text area
  */
	value: _react2.default.PropTypes.string,

	/**
  * A callback triggered when the checkbox is toggled
  */
	onChange: _react2.default.PropTypes.func,

	/**
  * Label for the form element
  */
	label: _react2.default.PropTypes.string
};

TextInput.defaultProps = {
	value: '',
	label: '',
	onChange: function onChange(a) {
		return a;
	}
};

exports.default = TextInput;
//# sourceMappingURL=textinput.js.map