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

	A simple wrapper around a editable text field. It pretty much does what you'd
	expect it to.

*/

var TextInput = function TextInput(_ref) {
    var value = _ref.value;
    var label = _ref.label;
    var _onChange = _ref.onChange;
    var style = _ref.style;


    return _react2.default.createElement(
        'div',
        { style: [_styles.base, style] },
        _react2.default.createElement(
            'label',
            null,
            label
        ),
        _react2.default.createElement('input', { type: 'text', value: value,
            style: [_styles.base, defaultStyle], onChange: function onChange(evt) {
                return _onChange(evt.target.value);
            } })
    );
};

TextInput = (0, _radium2.default)(TextInput);

TextInput.propTypes = {

    /**
     * The default value for the text input field
     */
    value: _react2.default.PropTypes.string,

    /**
     * A function called when the text field changes
     */
    onChange: _react2.default.PropTypes.func,

    /**
     * A text label for the input field
     */
    label: _react2.default.PropTypes.string,

    /**
     * Optional component styling
     */
    style: _react2.default.PropTypes.object

};

TextInput.defaultProps = {

    value: '',
    style: { width: '100%' },
    label: 'Text Input',
    onChange: function onChange(a) {
        return a;
    }

};

var defaultStyle = {
    fontFamily: 'inherit',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 'none',
    float: 'right',
    textAlign: 'right',
    borderBottom: '1px solid ' + _styles.secondary.color,
    backgroundColor: 'transparent',
    ":focus": {
        outline: 'none',
        borderBottom: '1px solid ' + _styles.highlight.color
    },
    ":hover": {
        borderBottom: '1px solid ' + _styles.highlight.color
    }
};

exports.default = TextInput;