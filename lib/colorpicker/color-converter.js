'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.hsv2Hsv = exports.hsl2Hsv = exports.rgb2Hsv = undefined;

var _propTypes = require('./prop-types');

var _colr = require('colr');

var _colr2 = _interopRequireDefault(_colr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rgb2Hsv = exports.rgb2Hsv = function rgb2Hsv(c) {
    return _colr2.default.fromRgbObject(c).toRawHsvObject();
};
var hsl2Hsv = exports.hsl2Hsv = function hsl2Hsv(c) {
    return _colr2.default.fromHslObject(c).toRawHsvObject();
};
var hsv2Hsv = exports.hsv2Hsv = function hsv2Hsv(c) {
    return c;
};

rgb2Hsv.invert = function (c) {
    return _colr2.default.fromHsvObject(c).toRawRgbObject();
};
hsl2Hsv.invert = function (c) {
    return _colr2.default.fromHsvObject(c).toRawHslObject();
};
hsv2Hsv.invert = function (c) {
    return c;
};

exports.default = function (value) {

    var converter = hsv2Hsv;

    if ((0, _propTypes.rgb)({ value: value }, 'value') === null) converter = rgb2Hsv;else if ((0, _propTypes.hsl)({ value: value }, 'value') === null) converter = hsl2Hsv;

    return converter;
};