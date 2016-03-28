import React from 'react'
import radium from 'radium'
import { base, secondary } from '../styles'
import { map } from 'math'

/**
 *  This component plots a line chart based on an input `value` of data. This
 *  can be used for visualising arrays of data, plotting functions or things
 *  fps meters
 */

 let style = {
     nonScalingStroke: {
        vectorEffect:'non-scaling-stroke'
     },
     rect:{
        fill: 'none',
        strokeWidth: 1,
        stroke: secondary.color
     }
 }

let LineChart = ({ value, label, width, height, min, max }) => {


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
        interval = 100 / ( length - 1 )

    /*
        TODO: Update this to work with percentages for adaptale width
    */

    for( let i = 0 ; i < length ;i++ ){
        n = value[i]
        value2D.push( i * interval )
        value2D.push( map( n, min, max, 98, 0 ) + 1)
    }

    console.log( value2D )


    return <div style={[base]}>
        <div>{ label }</div>
        <svg width={width} height={height} viewBox={"0 0 100 100"} preserveAspectRatio='none' >
            <rect style={[style.rect, style.nonScalingStroke]} width='100%' height='100%' />
            <polyline style={[style.nonScalingStroke]} fill="none" stroke="red" points={value2D} />
        </svg>
    </div>
}


LineChart = radium( LineChart )


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
