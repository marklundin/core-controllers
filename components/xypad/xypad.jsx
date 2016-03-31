import React from 'react'
import NumericStepper from '../numericstepper'
import { map } from 'math'
import throttle from 'lodash.throttle'
import radium from 'radium'
import { base } from '../styles'
import shallowCompare from '../shallowCompare'


let style = {
    cursor: 'default',
    stroke: base.color,
    strokeWidth: 1,
    crisp:{
        shapeRendering:'crispEdges',
    },
    circle:{
        fill: base.color,
        stroke:'none'
    }
}

class XYPad extends React.Component {

    // shouldComponentUpdate: shallowCompare

    constructor(){
        super()

        this.state = {drag:false}

        this.computeXYfromMouseEvent = e => {
            let bounds = this.domRef.getBoundingClientRect()
            console.log( map( e.clientX, bounds.left, bounds.right, 0, 1 ) )
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
            this.props.onChange( this.computeXYfromMouseEvent( e ))
        }

        this.onMouseUp = e => {
            this.setState({drag:false})
        }
    }

    render(){

        let { value, xmin, xmax, ymin, ymax, label, onChange } = this.props,
            { x, y } = value,
            { drag } = this.state

        let xVis = map( x, xmin, xmax, 0, 100 ) + '%',
            yVis = map( y, ymin, ymax, 0, 100 ) + '%'


        return <div style={[base, style]}>
            <div>{ label }</div>
            <svg style={[base, style]} width='100%' height='100%' xmlns="http://www.w3.org/2000/svg"
                ref={ref => this.domRef = ref}
                onMouseDown={ this.onMouseDown}
                onMouseMove={ drag ? this.onMouseMove : null }
                onMouseUp={ this.onMouseUp }>

                <rect fill='none' stroke={base.color} strokeWidth='1' width='100%' height='100%' />
                <line x1={xVis} x2={xVis} y1={0} y2='100%' style={[style, style.crisp]}/>
                <line x1={0} x2='100%' y1={yVis} y2={yVis}  style={[style, style.crisp]}/>
                <circle r={3} cx={xVis} cy={yVis} style={style.circle} />
            </svg>
            <NumericStepper min={xmin} max={xmax} value={Math.round(x)} onChange={ value => onChange({ x:value, y })} label={'X'}/>
            <NumericStepper min={ymin} max={ymax} value={Math.round(y)} onChange={ value => onChange({ y:value, x })} label={'Y'}/>
        </div>
    }
}

XYPad = radium( XYPad )

XYPad.propTypes = {

    // /**
    //  *  The width of the component
    //  */
    // width: React.PropTypes.oneOfType([
    //     React.PropTypes.number,
    //     React.PropTypes.string,
    // ]),
    //
    //
    // /**
    //  *  The height of the component
    //  */
    // height: React.PropTypes.oneOfType([
    //     React.PropTypes.number,
    //     React.PropTypes.string,
    // ]),


    /**
     *  The initial value of the component
     */
    value: React.PropTypes.shape({ x: React.PropTypes.number.isRequired, y: React.PropTypes.number.isRequired }).isRequired,


    /**
     *  The minimum x constraint
     */
    xmin: React.PropTypes.number.isRequired,


    /**
     *  The maximum x constraint
     */
    xmax: React.PropTypes.number.isRequired,


    /**
     *  The minimum y constraint
     */
    ymin: React.PropTypes.number.isRequired,


    /**
     *  The maximum y constraint
     */
    ymax: React.PropTypes.number.isRequired,


    /**
     *  Called when the component updates
     */
    onChange: React.PropTypes.func,


    /**
     * Optional component styling
     */
    style: React.PropTypes.object


}

XYPad.defaultProps = {

    label: 'XYPad',
    style:{
        width:'100%'
    },
    width: 400,
    height: 300,
    onChange: a=>a

}

export default XYPad
