import React from 'react'
import NumericStepper from '../numericstepper'
import { map, clamp } from 'math'
import radium from 'radium'
import throttle from 'lodash.throttle'
import { base, secondary, highlight } from '../styles'

let style = {
    cursor: 'default',
    stroke: 'none',
    fill: secondary.color,
    rx:'2',
    ry:'2'
}

/**
 * A horizontal progress slider with step size and minimum and maximum bounds.
 */
class Slider extends React.Component{

    constructor(){

        super()

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

        let { value, label, min, max, step, onChange, width, height } = this.props,
            dimension = { width, height },
            stepperProps = { value, label, min, max, step, onChange },
            validate = v => Math.round( clamp( v, min, max ) * ( 1 / step )) / ( 1 / step )

        console.log( validate( value ), value )
        value = validate( value )



        return <div style={ base }>
            <NumericStepper {...stepperProps} onChange={ v => onChange(validate( v ))}/>
            <svg {...dimension}
                onMouseDown={this.onMouseDown}
                ref={ref => this.domRef = ref}>
                <rect {...dimension} style={style}/>
                <rect {...dimension} style={{ ...style, fill: highlight.color }} width={ map( value, min, max, 0, 100 ) + '%' }/>
            </svg>
        </div>
    }
}

Slider = radium( Slider )

Slider.propTypes = {

    /**
     *  The value of the slider to display
     */
    value: React.PropTypes.number,

    /**
     *  Specifies the minimum value for the slider
     */
    min: React.PropTypes.number,

    /**
     *  Specifies the maximum value for the slider
     */
    max: React.PropTypes.number,

    /**
     * Specifies the legal number intervals for that can be used
     */
    step: React.PropTypes.number,

    /**
	 * A callback triggered when the slider is updated
	 */
    onChange: React.PropTypes.func,

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
    value: 2,
    min: 0,
    max: 10,
    step: 0.1,
    width: 400,
    height: 10,
    onChange: a=>a,
}

export default Slider
