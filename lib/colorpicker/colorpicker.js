'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _hsvColorpicker = require('./hsv/hsv-colorpicker.jsx');

var _hsvColorpicker2 = _interopRequireDefault(_hsvColorpicker);

var _colr = require('colr');

var _colr2 = _interopRequireDefault(_colr);

var _palette = require('./palette/palette.jsx');

var _palette2 = _interopRequireDefault(_palette);

var _add = require('react-icons/lib/md/add');

var _add2 = _interopRequireDefault(_add);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var _styles = require('../styles');

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _colorConverter = require('./color-converter');

var _colorConverter2 = _interopRequireDefault(_colorConverter);

var _propTypes = require('./prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**

A collapsible color picker with colour palette. One is assigned by you, the
developer, the other is defined by the end user which persists across page refreshes.
This means that in addition to any pallete you provide, the user can also add and save
their own colours, much in the same way as photoshop.

To save the current color click the `+` icon to save it to the users palette.
Shift click to remove it.

The users colour palette is saved to [localStorage](localStorage), this means
each domain will have it's own unique user pallete, meaning `localhost` will differ
from `staging.com`.

*/

var ColorPicker = function (_Component) {
    _inherits(ColorPicker, _Component);

    //shouldComponentUpdate: shallowCompare,

    function ColorPicker() {
        _classCallCheck(this, ColorPicker);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ColorPicker).call(this));

        _this.state = { colors: [] };

        _this.getSystemColors = function (_) {
            return JSON.parse(localStorage.getItem('dui.colorpicker')) || [];
        };
        _this.setSystemColors = function (colors) {
            return localStorage.setItem('dui.colorpicker', JSON.stringify(colors));
        };

        _this.onColorChange = function (hsv) {

            var color = (0, _colorConverter2.default)(_this.props.value).invert(hsv);
            _this.props.onChange(color);
        };
        return _this;
    }

    _createClass(ColorPicker, [{
        key: 'onAddColorClick',
        value: function onAddColorClick(color) {

            var colors = this.getSystemColors();
            colors.push(color);
            localStorage.setItem('dui.colorpicker', JSON.stringify(colors));
        }
    }, {
        key: 'onRemoveColorClick',
        value: function onRemoveColorClick(color, index) {

            var colors = this.getSystemColors();
            colors.splice(index, 1);
            this.setSystemColors(colors);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props;
            var value = _props.value;
            var label = _props.label;
            var onChange = _props.onChange;
            var style = _props.style;
            var palette = _props.palette;
            var _state = this.state;
            var colors = _state.colors;
            var open = _state.open;
            var toHsv = (0, _colorConverter2.default)(value);
            var hsvColor = toHsv(value);

            return _react2.default.createElement(
                'div',
                { style: [_styles.base, style, { height: 'auto' }] },
                _react2.default.createElement(
                    'div',
                    { onClick: function onClick(v) {
                            return _this2.setState({ open: !open });
                        } },
                    label,
                    _react2.default.createElement('span', { style: [colorDropletStyle, { backgroundColor: _colr2.default.fromHsvObject(hsvColor).toHex() }] })
                ),
                open ? _react2.default.createElement(
                    'div',
                    null,
                    _react2.default.createElement(_hsvColorpicker2.default, { style: style, value: hsvColor, onChange: this.onColorChange }),
                    _react2.default.createElement(_palette2.default, { key: 'user-palette', values: palette.map((0, _colorConverter2.default)(palette[0])), onSelect: this.onColorChange }),
                    _react2.default.createElement(_palette2.default, { key: 'system-palette', values: JSON.parse(localStorage.getItem('dui.colorpicker')), onSelect: this.onColorChange, onDeselect: this.onRemoveColorClick.bind(this) }),
                    _react2.default.createElement(
                        'span',
                        { style: [_styles.base, addButton] },
                        _react2.default.createElement(_add2.default, { onClick: function onClick(e) {
                                return _this2.onAddColorClick(toHsv(value));
                            } })
                    )
                ) : null
            );
        }
    }]);

    return ColorPicker;
}(_react.Component);

ColorPicker.displayName = 'ColorPicker';

// ColorPicker = saveState( ColorPicker )
ColorPicker = (0, _radium2.default)(ColorPicker);

ColorPicker.propTypes = {

    /**
     * The text label to display
     */
    label: _react.PropTypes.string,

    /**
     *  An color object
     */
    value: _react.PropTypes.oneOfType([_propTypes.rgb, _propTypes.hsv, _propTypes.hsl]),

    /**
     * An array of colors used as a palette
     */
    palette: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_propTypes.rgb), _react.PropTypes.arrayOf(_propTypes.hsv), _react.PropTypes.arrayOf(_propTypes.hsl)]),

    /**
     * Optional component styling
     */
    style: _react.PropTypes.object,

    /**
     *  A function triggered when the color changes
     */
    onChange: _react.PropTypes.func

};

ColorPicker.defaultProps = {
    open: false,
    label: 'ColorPicker',
    value: { h: 1, s: 50, v: 50 },
    palette: [],
    onChange: function onChange(a) {
        return a;
    }
};

var addButton = {
    ':hover': _styles.secondary,
    marginLeft: '0.3em',
    marginRight: '0.3em'
};

var colorDropletStyle = {
    borderRadius: "50%",
    width: '1em',
    height: '1em',
    float: 'right'
};

exports.default = ColorPicker;