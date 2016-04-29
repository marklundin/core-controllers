'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hsv = exports.hsl = exports.rgb = undefined;

var _react = require('react');

var rgb = exports.rgb = _react.PropTypes.shape({
    r: _react.PropTypes.number.isRequired,
    g: _react.PropTypes.number.isRequired,
    b: _react.PropTypes.number.isRequired
}).isRequired;

var hsl = exports.hsl = _react.PropTypes.shape({
    h: _react.PropTypes.number.isRequired,
    s: _react.PropTypes.number.isRequired,
    l: _react.PropTypes.number.isRequired
}).isRequired;

var hsv = exports.hsv = _react.PropTypes.shape({
    h: _react.PropTypes.number.isRequired,
    s: _react.PropTypes.number.isRequired,
    v: _react.PropTypes.number.isRequired
}).isRequired;