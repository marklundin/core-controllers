'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _colr = require('colr');

var _colr2 = _interopRequireDefault(_colr);

var _button = require('../../button');

var _button2 = _interopRequireDefault(_button);

var _styles = require('../../styles');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The ColorButton is simply a coloured button used as
 * square glyph in the colour palette
 */
var ColorButton = function ColorButton(props) {
    var value = props.value;
    var onClick = props.onClick;


    var color = _colr2.default.fromHsvObject(value).toHex();

    var style = {
        backgroundColor: color,
        width: '1em', height: '1em',
        marginLeft: '0.3em',
        marginBottom: '0.5em',
        marginRight: '0.3em',
        padding: '0.7em',
        display: 'inline-block',
        ':hover': {
            backgroundColor: color
        }
    };

    return _react2.default.createElement(_button2.default, _extends({}, props, { style: style }));
};

var Palette = function (_React$Component) {
    _inherits(Palette, _React$Component);

    function Palette() {
        _classCallCheck(this, Palette);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Palette).call(this));

        _this.state = { hover: null };
        return _this;
    }

    _createClass(Palette, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var values = _props.values;
            var onSelect = _props.onSelect;
            var onDeselect = _props.onDeselect;
            var hover = this.state.hover;

            //

            var areColoursRemoveable = onDeselect !== undefined;

            // If we have no colors then don't bother showing anything
            if (!values || values.length === 0) return null;

            return _react2.default.createElement(
                'div',
                null,
                values.map(function (color, i) {
                    return _react2.default.createElement(ColorButton, { key: i, value: color,
                        label: i === hover ? '-' : '',
                        onMouseOver: function onMouseOver(e) {
                            return areColoursRemoveable && e.shiftKey ? _this2.setState({ hover: i }) : null;
                        },
                        onMouseOut: areColoursRemoveable ? function (e) {
                            return _this2.setState({ hover: null });
                        } : null,
                        onClick: function onClick(e) {
                            return e.shiftKey ? onDeselect(color, i) : onSelect(color);
                        } });
                })
            );
        }
    }]);

    return Palette;
}(_react2.default.Component);

Palette.defaultProps = {

    /**
     * An array of colors
     */

    values: [],

    onSelect: function onSelect(a) {
        return a;
    }
};

Palette.propTypes = {

    values: _react.PropTypes.arrayOf(_react.PropTypes.shape({ h: _react.PropTypes.number.isRequired, s: _react.PropTypes.number.isRequired, v: _react.PropTypes.number.isRequired })).isRequired,

    onSelect: _react.PropTypes.func,

    onDeselect: _react.PropTypes.func,

    /**
     * Optional component styling
     */
    style: _react2.default.PropTypes.object
};

var style = {
    margin: '0.5em'
};

exports.default = Palette;