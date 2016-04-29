'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _styles = require('../styles');

var _chevronLeft = require('react-icons/lib/md/chevron-left');

var _chevronLeft2 = _interopRequireDefault(_chevronLeft);

var _expandMore = require('react-icons/lib/md/expand-more');

var _expandMore2 = _interopRequireDefault(_expandMore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*
    The Folder is a container component that can be toggled opened and closed.
    To render it's children, it takes an function that returns an array of react
    elements.
*/

var Folder = function (_Component) {
    _inherits(Folder, _Component);

    function Folder() {
        _classCallCheck(this, Folder);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Folder).call(this));

        _this.state = { open: false };

        _this.toggleOpen = function (_) {
            return _this.setState({ open: !_this.state.open });
        };

        return _this;
    }

    _createClass(Folder, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var label = _props.label;
            var value = _props.value;
            var style = _props.style;
            var open = this.state.open;


            return _react2.default.createElement(
                'div',
                { style: [_styles.base, style] },
                _react2.default.createElement(
                    'div',
                    { onClick: this.toggleOpen },
                    label,
                    open ? _react2.default.createElement(_expandMore2.default, { style: floatRight }) : _react2.default.createElement(_chevronLeft2.default, { style: floatRight })
                ),
                open ? _react2.default.createElement(
                    'div',
                    null,
                    value()
                ) : null
            );
        }
    }]);

    return Folder;
}(_react.Component);

Folder = (0, _radium2.default)(Folder);

Folder.defaultProps = {

    label: 'Folder',
    onChange: function onChange(a) {
        return a;
    }

};

Folder.propTypes = {

    value: _react.PropTypes.func.isRequired,

    onChange: _react.PropTypes.func,

    label: _react.PropTypes.string,

    style: _react.PropTypes.object

};

var floatRight = {
    float: 'right'
};

exports.default = Folder;