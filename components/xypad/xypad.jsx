import React from 'react'
import NumericStepper from '../numericstepper'
import { map } from 'math'
import throttle from 'lodash.throttle'
import radium from 'radium'
import { base } from '../styles'


let style = {
    pointer:"default",
    stroke: base.color,
    strokeWidth: 1
}

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


        return <div style={[base, style]}>
            <div>{ label }</div>
            <svg style={[base, style]} width={width} height={height} viewBox={"0 0 "+width+" "+height} xmlns="http://www.w3.org/2000/svg"
                ref={ref => this.domRef = ref}
                onMouseDown={ this.onMouseDown}
                onMouseMove={ drag ? this.onMouseMove : null }
                onMouseUp={ this.onMouseUp }>

                <rect fill='none' stroke={base.color} strokeWidth='1' width={width} height={height} />
                <line x1={xVis} x2={xVis} y1={0} y2={height} style={style}/>
                <line x1={0} x2={width} y1={yVis} y2={yVis}  style={style}/>
                <circle r={2} cx={xVis} cy={yVis} stroke='none' fill={base.color}/>
            </svg>
            <NumericStepper min={xmin} max={xmax} value={Math.round(x)} onChange={ value => onChange({ x:value, y })} label={'X'}/>
            <NumericStepper min={ymin} max={ymax} value={Math.round(y)} onChange={ value => onChange({ y:value, x })} label={'Y'}/>
        </div>
    }
}

XYPad = radium( XYPad )

XYPad.propTypes = {

    width: React.PropTypes.number,
    height: React.PropTypes.number,
    value: React.PropTypes.shape({ x: React.PropTypes.number.isRequired, y: React.PropTypes.number.isRequired }),
    xmin: React.PropTypes.number,
    xmax: React.PropTypes.number,
    ymin: React.PropTypes.number,
    ymax: React.PropTypes.number,
    onChange: React.PropTypes.func

}

XYPad.defaultProps = {

    width: 400,

    height: 300,

    value: {x:1,y:1},

    ymin: 0, ymax: 600,

    xmin: 0, xmax: 800,

    onChange: a=>a

}

export default XYPad
