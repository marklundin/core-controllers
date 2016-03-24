import React from 'react'
import NumericStepper from '../numericstepper'
import { map } from 'math'
import throttle from 'lodash.throttle'

class XYPad extends React.Component{

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
            this.props.onChange( this.computeXYfromMouseEvent( e ))
        }

        this.onMouseUp = e => {
            this.setState({drag:false})
        }
    }

    render(){

        let { value, xmin, xmax, ymin, ymax, width, height, label, onChange } = this.props,
            { x, y } = value,
            { drag } = this.state

        let xVis = map( x, xmin, xmax, 0, width ),
            yVis = map( y, ymin, ymax, 0, height )


        return <div>
            <label>{ label }</label>
            <NumericStepper value={Math.round(x)} onChange={ value => onChange({ x:value, y })}/>
            <NumericStepper value={Math.round(y)} onChange={ value => onChange({ y:value, x })}/>
            <svg width={width} height={height} viewBox={"0 0 "+width+" "+height} xmlns="http://www.w3.org/2000/svg"
                ref={ref => this.domRef = ref}
                onMouseDown={ this.onMouseDown}
                onMouseMove={ drag ? this.onMouseMove : null }
                onMouseUp={ this.onMouseUp }>

                <rect fill='none' stroke='black' strokeWidth='1' width={width} height={height} />
                <line x1={xVis} x2={xVis} y1={0} y2={height} stroke='black' strokeWidth={1}/>
                <line x1={0} x2={width} y1={yVis} y2={yVis} stroke='black' strokeWidth={1} />
                <circle r={2} cx={xVis} cy={yVis} />

            </svg>
        </div>
    }
}

XYPad.propTypes = {

    width: React.PropTypes.number,
    height: React.PropTypes.number,
    value: React.PropTypes.shape({ x: React.PropTypes.number.isRequired, y: React.PropTypes.number.isRequired }),
    xmin: React.PropTypes.number,
    xmax: React.PropTypes.number,
    ymin: React.PropTypes.number,
    ymax: React.PropTypes.number
}

XYPad.defaultProps = {

    width: 400,

    height: 300,

    value: { x: 200, y : 150 },

    ymin: 0, ymax: 600,

    xmin: 0, xmax: 800,

}

export default XYPad
