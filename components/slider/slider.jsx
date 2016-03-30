import React from 'react'
import NumericStepper from '../numericstepper'
import shallowCompare from '../shallowCompare'
import { map, clamp } from 'math'
import radium from 'radium'
import throttle from 'lodash.throttle'
import { base, secondary, highlight } from '../styles'

let defaultStyle = {
    overflow:'visible',
    cursor: 'default',
    stroke: 'none',

    rx:'2',
    ry:'2',
    thumb: {
        fill: 'none'
    },
    backgroundBar:{
        fill: secondary.color
    },
    bar:{
        fill: highlight.color
    }

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

        let { value, label, min, max, step, onChange, width, height, includeStepper, style } = this.props,
            dimension = { width, height },
            stepperProps = { value, label, min, max, step, onChange },
            validate = v => Math.round( clamp( v, min, max ) * ( 1 / step )) / ( 1 / step )


        let offsetPercentage = map( value, min, max, 0, 100 ) + '%'
        value = validate( value )

        return <div style={ base }>
            { includeStepper ? <NumericStepper {...stepperProps} onChange={ v => onChange(validate( v ))}/> : null }
            <svg {...dimension}
                style={ defaultStyle }
                onMouseDown={this.onMouseDown}
                ref={ref => this.domRef = ref}>

                <rect {...dimension} style={[ defaultStyle, defaultStyle.backgroundBar, style.backgroundBar ]}/>
                <rect {...dimension} style={[ defaultStyle, defaultStyle.bar, style.bar ]} width={ offsetPercentage }/>
                <circle cy={height/2} cx={offsetPercentage} r={height*0.5} style={[defaultStyle, defaultStyle.thumb, style.thumb ]}/>
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

    /**
     *  The width of the component
     */
    width: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
    ]),

    /**
     *  The height of the component
     */
    height: React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
    ])

}

Slider.defaultProps = {

    label: 'Slider',
    includeStepper: true,
    min: 0,
    max: 10,
    step: 0.1,
    width: 400,
    height: 10,
    onChange: a=>a,
    style:{}

}

export default Slider
