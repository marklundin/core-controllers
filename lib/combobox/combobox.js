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

var defaultStyle = {
    float: 'right',
    ":focus": {
        outline: 'none'
    }
};

/**
    Another simple component. The Combobox provides a basic wrapper around the
    native form element with support for an array of strings, an array
    of key value tuples, or an object.
*/

var ComboBox = function ComboBox(_ref) {
    var label = _ref.label;
    var options = _ref.options;
    var value = _ref.value;
    var _onChange = _ref.onChange;


    var isArray = Array.isArray(options);

    var optionsElems = [_react2.default.createElement(
        'option',
        { key: value.toString(), value: value },
        isArray ? value : value.toString()
    )];

    for (var i in options) {
        optionsElems.push(_react2.default.createElement(
            'option',
            { key: i, value: options[i] },
            isArray ? options[i] : i
        ));
    }

    return _react2.default.createElement(
        'div',
        { style: _styles.base },
        _react2.default.createElement(
            'label',
            null,
            label
        ),
        _react2.default.createElement(
            'select',
            { onChange: function onChange(e) {
                    return _onChange(e.target.value);
                }, style: defaultStyle },
            optionsElems
        )
    );
};

ComboBox = (0, _radium2.default)(ComboBox);

ComboBox.defaultProps = {

    /**
    * A text label
    */
    label: 'ComboBox',

    /**
    * An array of options to populate the combobox
    */
    options: [],

    /**
    * A callback triggered when the component updates
    */
    onChange: function onChange(a) {
        return a;
    }
};

ComboBox.propTypes = {

    label: _react.PropTypes.any,

    options: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.string).isRequired, _react.PropTypes.arrayOf(_react.PropTypes.arrayOf(_react.PropTypes.any)).isRequired, _react.PropTypes.objectOf(_react.PropTypes.any).isRequired]),

    onChange: _react.PropTypes.func

};

exports.default = ComboBox;