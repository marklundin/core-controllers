import React, { PropTypes } from 'react'
import NumericStepper from '../numericstepper'
import { map } from 'math'
import throttle from 'lodash.throttle'
import radium from 'radium'
import { base, secondary } from '../styles'
import shallowCompare from '../utils/shallowCompare'


const defaultStyle = {
    cursor: 'default',
    stroke: base.color,
    strokeWidth: 1
}

const crisp = {
    shapeRendering:'crispEdges',
}

const circle = {
    fill: base.color,
    stroke:'none'
}

const componentLabels = {display:'inline'}

class XYPad extends React.Component {

    constructor(){
        super()

        this.state = {drag:false}

        this.computeXYfromMouseEvent = e => {
            let bounds = this.domRef.getBoundingClientRect()

            return {
                x: map( e.clientX, bounds.left, bounds.right, this.props.xmin, this.props.xmax ),
                y: map( e.clientY, bounds.top, bounds.bottom, this.props.ymin, this.props.ymax )
            }
        }

        this.onMouseDown = throttle( e => {
            this.setState({drag:true})
            this.props.onChange( this.computeXYfromMouseEvent( e ))
        }, 1000/60 )

        this.onMouseMove = e => {
            if( this.state.drag ) this.props.onChange( this.computeXYfromMouseEvent( e ))
        }

        this.onMouseUp = e => {
            this.setState({drag:false})
        }
    }


    shouldComponentUpdate( nextProps, nextState ){

        let { x, y } = this.props.value,
            value = nextProps.value

        return ( x !== value.x
            || y !== value.y )
            && shallowCompare( this, nextProps, this.state )

    }


    render(){

        let { value, xmin, xmax, ymin, ymax, label, onChange, style } = this.props,
            { x, y } = value

        let xVis = map( x, xmin, xmax, 0, 100 ) + '%',
            yVis = map( y, ymin, ymax, 0, 100 ) + '%'


        return <div style={base}>
            <div>{ label }</div>
            <div style={[style]}>
                <svg width='100%' height='100%' xmlns="http://www.w3.org/2000/svg"
                    style={defaultStyle}
                    ref={ref => this.domRef = ref}
                    onMouseDown={ this.onMouseDown}
                    onMouseMove={ this.state.drag ? this.onMouseMove : null }
                    onMouseUp={ this.onMouseUp }>

                    <rect fill='none' stroke={base.color} strokeWidth='1' width='100%' height='100%' />
                    <line x1={xVis} x2={xVis} y1={0} y2='100%' style={[defaultStyle, style, crisp]}/>
                    <line x1={0} x2='100%' y1={yVis} y2={yVis} style={[defaultStyle, style, crisp]}/>
                    <circle r={3} cx={xVis} cy={yVis} style={circle} />
                </svg>
                <NumericStepper style={{ ...componentLabels, width:style.width }} min={xmin} max={xmax} value={x} onChange={ value => onChange({ x:value, y })} label={'X'}/>
                <NumericStepper style={{ ...componentLabels, width:style.width }} min={ymin} max={ymax} value={y} onChange={ value => onChange({ y:value, x })} label={'Y'}/>
            </div>
            <div style={{clear: 'both'}}></div>
        </div>
    }
}

XYPad = radium( XYPad )

XYPad.propTypes = {


    /**
     * A text label
     */
    label: PropTypes.string,

    /**
     *  The initial value of the component
     */
    value: PropTypes.shape({ x: PropTypes.number.isRequired, y: PropTypes.number.isRequired }).isRequired,


    /**
     *  The minimum x constraint
     */
    xmin: PropTypes.number.isRequired,


    /**
     *  The maximum x constraint
     */
    xmax: PropTypes.number.isRequired,


    /**
     *  The minimum y constraint
     */
    ymin: PropTypes.number.isRequired,


    /**
     *  The maximum y constraint
     */
    ymax: PropTypes.number.isRequired,


    /**
     *  Called when the component updates
     */
    onChange: PropTypes.func,


    /**
     * Optional component styling
     */
    style: PropTypes.object


}

XYPad.defaultProps = {


    label: 'XYPad',


    style:{width:'100%', height:'auto'},


    onChange: a=>a

}

export default XYPad
