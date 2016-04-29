'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _styles = require('../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultStyle = {
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
    padding: '1em',
    verticalAlign: 'middle',
    textAlign: 'center',
    lineHeight: '50%',
    ':hover': {
        backgroundColor: _styles.highlight.color,
        color: 'white'
    }
};

/**
    The Button, arguably most basic of all components. You hover, you click, you rollout.
    Pretty self explanatory. Documentation included for completeness
*/

var Button = function Button(props) {
    return _react2.default.createElement(
        'button',
        _extends({}, props, { style: [_styles.base, defaultStyle, props.style] }),
        props.label
    );
};

Button = (0, _radium2.default)(Button);

Button.defaultProps = {

    label: 'Button'

};

Button.propTypes = {

    /**
     * A text label
     */
    label: _react2.default.PropTypes.string,

    /**
     * Optional component styling
     */
    style: _react2.default.PropTypes.object

};

exports.default = Button;