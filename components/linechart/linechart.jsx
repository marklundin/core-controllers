import React from 'react'
import { map as domain } from 'math'

/**
 *  This component plots a line chart based on an input `value` of data. This
 *  can be used for visualising arrays of data, plotting functions or things
 *  fps meters
 */

const LineChart = ({ value, label, width, height, min, max }) => {


    /**
     *  If no domain is supplied, calculate based on the extremities
     *  of the `value` data
     */
    min = min !== undefined ? min : Math.min( ...value )
    max = max !== undefined ? max : Math.max( ...value )



    /**
     *  In order to render the data we need to populate the array with `x`
     *  coordinates. Polyine expects an array or `x, y` tuples.
     */

    let value2D = [],
        length = value.length, n,
        interval = width / ( length - 1 )

    for( let i = 0 ; i < length ;i++ ){
        n = value[i]
        value2D.push( i * interval )
        value2D.push( domain( n, min, max, height, 0 ))
    }


    return <div>
        <label>{ label }</label>
        <svg width={width} height={height} viewPort={ "0 0 "+ width + ' ' + height }  version="1.1" xmlns="http://www.w3.org/2000/svg">
            <polyline fill="none" stroke="red" points={value2D}/>
        </svg>
    </div>
}


LineChart.propTypes = {

    /**
     * An array of numbers to display on the graph
     */
    value: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf(React.PropTypes.number),
        React.PropTypes.instanceOf( Int8Array ),
        React.PropTypes.instanceOf( Uint8Array ),
        React.PropTypes.instanceOf( Uint8ClampedArray ),
        React.PropTypes.instanceOf( Int16Array ),
        React.PropTypes.instanceOf( Uint16Array ),
        React.PropTypes.instanceOf( Int32Array ),
        React.PropTypes.instanceOf( Uint32Array ),
        React.PropTypes.instanceOf( Float32Array ),
        React.PropTypes.instanceOf( Float64Array )
    ]),


	/**
	 * Label for form element
	 */
	label: React.PropTypes.string,


    /**
     * The width of the line chart in pixels
     */
    width : React.PropTypes.number,


    /**
     * The height of the line chart in pixels
     */
    height : React.PropTypes.number,


    /**
     * Defines the minimum value of the domain. If none is supplied it will be calculated
     */
    min : React.PropTypes.number,


    /**
     * Defines the maximum value of the domain. If none is supplied it will be calculated
     */
    max : React.PropTypes.number

}


LineChart.defaultProps = {

    value: [],
    label: 'LineChart',
    width: 400,
    height: 200

}

export default LineChart
