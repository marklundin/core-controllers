'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _math = require('math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 *  This component plots a line chart based on an input `value` of data. This
 *  can be used for visualising arrays of data, plotting functions or things
 *  fps meters
 */

var LineChart = function LineChart(_ref) {
    var value = _ref.value;
    var label = _ref.label;
    var width = _ref.width;
    var height = _ref.height;
    var min = _ref.min;
    var max = _ref.max;


    /**
     *  If no domain is supplied, calculate based on the extremities
     *  of the `value` data
     */
    min = min !== undefined ? min : Math.min.apply(Math, _toConsumableArray(value));
    max = max !== undefined ? max : Math.max.apply(Math, _toConsumableArray(value));

    /**
     *  In order to render the data we need to populate the array with `x`
     *  coordinates. Polyine expects an array or `x, y` tuples.
     */

    var value2D = [],
        length = value.length,
        n = void 0,
        interval = width / (length - 1);

    for (var i = 0; i < length; i++) {
        n = value[i];
        value2D.push(i * interval);
        value2D.push((0, _math.map)(n, min, max, height, 0));
    }

    return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
            'label',
            null,
            label
        ),
        _react2.default.createElement(
            'svg',
            { width: width, height: height, viewPort: "0 0 " + width + ' ' + height, version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
            _react2.default.createElement('polyline', { fill: 'none', stroke: 'red', points: value2D })
        )
    );
};

LineChart.propTypes = {

    /**
     * An array of numbers to display on the graph
     */
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number), _react2.default.PropTypes.instanceOf(Int8Array), _react2.default.PropTypes.instanceOf(Uint8Array), _react2.default.PropTypes.instanceOf(Uint8ClampedArray), _react2.default.PropTypes.instanceOf(Int16Array), _react2.default.PropTypes.instanceOf(Uint16Array), _react2.default.PropTypes.instanceOf(Int32Array), _react2.default.PropTypes.instanceOf(Uint32Array), _react2.default.PropTypes.instanceOf(Float32Array), _react2.default.PropTypes.instanceOf(Float64Array)]),

    /**
     * Label for form element
     */
    label: _react2.default.PropTypes.string,

    /**
     * The width of the line chart in pixels
     */
    width: _react2.default.PropTypes.number,

    /**
     * The height of the line chart in pixels
     */
    height: _react2.default.PropTypes.number,

    /**
     * Defines the minimum value of the domain. If none is supplied it will be calculated
     */
    min: _react2.default.PropTypes.number,

    /**
     * Defines the maximum value of the domain. If none is supplied it will be calculated
     */
    max: _react2.default.PropTypes.number

};

LineChart.defaultProps = {

    value: [],
    label: 'LineChart',
    width: 400,
    height: 200

};

exports.default = LineChart;
//# sourceMappingURL=linechart.js.map