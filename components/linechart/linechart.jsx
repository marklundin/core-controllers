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


    for( let i = 0 ; i < length ;i++ ){
        n = value[i]
        value2D.push( i * interval )
        value2D.push( map( n, min, max, 98, 0 ) + 1)
    }


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
	 * Label for form element
	 */
	label: React.PropTypes.string,


    /**
     * An array of numbers to display on the graph
     *
     * Note: there is a bug when generating the documentation
     * with the below `oneOfType` structure. This will raise a warning
     * in the docs when it's run.
     *
     * See https://github.com/sapegin/react-styleguidist/issues/111
     */
    value: React.PropTypes.oneOfType([
        React.PropTypes.arrayOf( React.PropTypes.number ),
        React.PropTypes.instanceOf( Int8Array ),
        React.PropTypes.instanceOf( Uint8Array ),
        React.PropTypes.instanceOf( Uint8ClampedArray ),
        React.PropTypes.instanceOf( Int16Array ),
        React.PropTypes.instanceOf( Uint16Array ),
        React.PropTypes.instanceOf( Int32Array ),
        React.PropTypes.instanceOf( Uint32Array ),
        React.PropTypes.instanceOf( Float32Array ),
        React.PropTypes.instanceOf( Float64Array )
    ]).isrequired,


    /**
     * The width of the line chart
     */
    width : React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string,
    ]),


    /**
     * The height of the line chart
     */
    height : React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string,
    ]),


    /**
     * Defines the minimum value of the domain. If none is supplied it will be calculated
     */
    min : React.PropTypes.number,


    /**
     * Defines the maximum value of the domain. If none is supplied it will be calculated
     */
    max : React.PropTypes.number,


    /**
     * Optional component styling
     */
    style: React.PropTypes.object

}


LineChart.defaultProps = {

    label: 'LineChart',
    width: 400,
    height: 200

}

export default LineChart
