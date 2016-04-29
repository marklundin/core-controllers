'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _styles = require('../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 	Another stupidly simple component, it effectively wraps the native checkbox.
	Documentation included for completeness
 */
var Checkbox = function Checkbox(_ref) {
	var value = _ref.value;
	var label = _ref.label;
	var _onChange = _ref.onChange;


	return _react2.default.createElement(
		'div',
		{ style: [_styles.base] },
		_react2.default.createElement(
			'label',
			{ style: [_styles.base], onClick: function onClick(evt) {
					return _onChange(!value);
				} },
			label
		),
		_react2.default.createElement('input', { checked: value, style: defaultStyle, type: 'checkbox', onChange: function onChange(evt) {
				return _onChange(evt.target.checked);
			} })
	);
};

// class Checkbox extends React.Component {
//
//
// 	render(){
//
// 		let { value, label, onChange } = this.props
//
// 		return <div style={[base]}>
// 			<label style={[base]} onClick={evt => onChange( !value )}>{ label }</label>
// 			<input checked={ value } style={defaultStyle} type="checkbox" onChange={evt => onChange( evt.target.checked )} />
// 		</div>
// 	}
// }

Checkbox = (0, _radium2.default)(Checkbox);

Checkbox.propTypes = {

	/**
  * A text label
  */
	label: _react2.default.PropTypes.string,

	/**
  * Determines whether the element is checked or not.
  */
	value: _react2.default.PropTypes.bool,

	/**
  * A callback triggered when the checkbox is toggled
  */
	onChange: _react2.default.PropTypes.func

};

Checkbox.defaultProps = {
	label: 'Checkbox',
	value: false,
	onChange: function onChange(a) {
		return a;
	}
};

var defaultStyle = {
	float: 'right'
};

exports.default = Checkbox;