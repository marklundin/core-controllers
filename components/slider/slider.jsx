import React from 'react'
import NumericStepper from '../numericstepper'
import shallowCompare from '../utils/shallowCompare'
import { map, clamp } from 'math'
import radium from 'radium'
import throttle from 'lodash.throttle'
import { base, secondary, highlight } from '../styles'

let defaultStyle = {
    overflow:'visible',
    cursor: 'default',
    stroke: 'none',

    rx:'2',
    ry:'2'
}

const thumb = {
    fill: 'none'
}
const backgroundBar = {
    fill: secondary.color
}

const bar = {
    fill: highlight.color
}

/**
 * A horizontal progress slider with step size and minimum and maximum bounds.
 */
class Slider extends React.Component{

    constructor(){

        super()

        shouldComponentUpdate: shallowCompare,

        this.computeValuefromMouseEvent = e => {
            let bounds = this.domRef.getBoundingClientRect()
            return map( e.clientX, bounds.left, bounds.right, this.props.min, this.props.max )
        }

        this.onMouseDown = e => {

            let { value, min, max, step, onChange } = this.props,
                validate = v => Math.round( clamp( v, min, max ) * ( 1 / step )) / ( 1 / step )

            this.setState({drag:true})
            onChange( validate( this.computeValuefromMouseEvent( e )))
        }

        this.onMouseMove = e => {
            let { value, min, max, step, onChange } = this.props,
                validate = v => Math.round( clamp( v, min, max ) * ( 1 / step )) / ( 1 / step )

            onChange( validate( this.computeValuefromMouseEvent( e )))
        }

        this.onMouseUp = e => {
            this.setState({drag:false})
        }
    }

    componentDidUpdate (props, state) {
        if (this.state.drag && !state.drag) {
          document.addEventListener('mousemove', this.onMouseMove)
          document.addEventListener('mouseup', this.onMouseUp)
        } else if (!this.state.drag && state.drag) {
          document.removeEventListener('mousemove', this.onMouseMove)
          document.removeEventListener('mouseup', this.onMouseUp)
        }
    }

    render(){

        let { value, label, min, max, step, onChange, includeStepper, style } = this.props,
            stepperProps = { value, label, min, max, step, onChange },
            validate = v => Math.round( clamp( v, min, max ) * ( 1 / step )) / ( 1 / step )


        let offsetPercentage = map( clamp( value, min, max ), min, max, 0, 100 ) + '%'
        value = validate( value )

        return <div style={ base }>
            { includeStepper ? <NumericStepper {...stepperProps} onChange={ v => onChange(validate( v ))}/> : null }
            <svg width='100%' height="0.8em" xmlns="http://www.w3.org/2000/svg"
                style={ defaultStyle }
                onMouseDown={this.onMouseDown}
                ref={ref => this.domRef = ref}>
                <rect width='100%' height="100%" style={[ defaultStyle, backgroundBar, style.backgroundBar ]}/>
                <rect width='100%' height="100%" style={[ defaultStyle, bar, style.bar ]} width={ offsetPercentage }/>
                <circle cy={'50%'} cx={offsetPercentage} r='0.4em' style={[defaultStyle, thumb, style.thumb ]}/>
            </svg>
        </div>
    }
}

Slider = radium( Slider )

Slider.propTypes = {

    /**
     *  A text label
     */
    label: React.PropTypes.string,

    /**
     *  The value of the slider
     */
    value: React.PropTypes.number.isRequired,

    /**
     *  Specifies the minimum value for the component
     */
    min: React.PropTypes.number,

    /**
     *  Specifies the maximum value for the component
     */
    max: React.PropTypes.number,

    /**
     * Specifies the intervals step
     */
    step: React.PropTypes.number,

    /**
	 * A callback triggered when the component updates
	 */
    onChange: React.PropTypes.func,


    /**
     *  If false, the numeric stepper is not displayed
     */
    includeStepper: React.PropTypes.bool,


    /**
     * Optional component styling
     */
    style: React.PropTypes.object,


}

Slider.defaultProps = {

    label: 'Slider',
    includeStepper: true,
    min: 0,
    max: 10,
    step: 0.1,
    onChange: a=>a,
    style:{width:'100%'}

}

export default Slider
