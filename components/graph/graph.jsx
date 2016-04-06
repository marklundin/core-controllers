import React, { PropTypes } from 'react'
import radium from 'radium'
import { base, secondary, highlight } from '../styles'
import { map } from 'math'

 const defaultStyle = {
    nonScalingStroke: {
        vectorEffect:'non-scaling-stroke',
        shapeRendering:'geometricPrecision'
    },
    rect:{
        fill: 'none',
        strokeWidth: 1,
        stroke: secondary.color
    }
}

/**
    Takes an array of numbers and renders a simple line graph. The range or
    domain of the graph is based on the `min`, `max` properties. This effectively
    changes the height of the graph. If no bounds are supplied then the graph
    plots against the minimum and maximum values of the data.
*/

let Graph = ({ value, label, style, min, max }) => {

    /**
     *  If no domain is supplied, calculate based on the bounds
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
        value2D.push( String( i * interval ))
        value2D.push( String( map( n, min, max, 100, 0 ))  )
    }

    return <div style={[base, style]}>
        <div>{ label }</div>
        <svg style={[base, style]} width='100%' height='100%' xmlns="http://www.w3.org/2000/svg" viewBox='0 0 100 100' preserveAspectRatio='none'>
            <rect style={[defaultStyle.rect, defaultStyle.nonScalingStroke]} width='100%' height='100%' />
            <polyline style={[defaultStyle.nonScalingStroke]} fill="none" stroke={highlight.color} points={value2D} />
        </svg>
    </div>
}


Graph = radium( Graph )


Graph.propTypes = {


	/**
	 * A text label
	 */
	label: React.PropTypes.string,


    /**
     *
     * Note: there is a bug when generating the documentation
     * with the below `oneOfType` structure. This will raise a warning
     * in the docs when it's run.
     *
     * See https://github.com/sapegin/react-styleguidist/issues/111
    */

    /**
     * An array of numbers to display on the graph
     */
    value: PropTypes.oneOfType([
        PropTypes.arrayOf( PropTypes.number ),
        PropTypes.instanceOf( Int8Array ),
        PropTypes.instanceOf( Uint8Array ),
        PropTypes.instanceOf( Uint8ClampedArray ),
        PropTypes.instanceOf( Int16Array ),
        PropTypes.instanceOf( Uint16Array ),
        PropTypes.instanceOf( Int32Array ),
        PropTypes.instanceOf( Uint32Array ),
        PropTypes.instanceOf( Float32Array ),
        PropTypes.instanceOf( Float64Array )
    ]).isRequired,


    /**
     * Defines the minimum value of the domain. If none is supplied it will be calculated
     */
    min : PropTypes.number,


    /**
     * Defines the maximum value of the domain. If none is supplied it will be calculated
     */
    max : PropTypes.number,


    /**
     * Optional component styling
     */
    style: PropTypes.object

}


Graph.defaultProps = {

    label: 'Graph',
    value:[],
    style:{width:'100%',height:150}

}

export default Graph
