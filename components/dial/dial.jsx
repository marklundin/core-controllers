import React, { Component, PropTypes } from 'react'
import radium from 'radium'
import NumericStepper from '../numericstepper'
import shallowCompare from '../utils/shallowCompare'
import { base, highlight, secondary} from '../styles'
import { normalize, map, clamp } from 'math'

class Dial extends Component {


    // shouldComponentUpdate( nextProps, nextState ){
    //     console.log( 'checking ')
    //     return shallowCompare( this.props, nextProps, this.state, nextState )
    // }


    constructor(){

        super()

        this.state = {drag:false}

        let computeValueFromEvent = ( e, domRef ) => {

            let { min, max } = this.props,
                bounds = this.domRef.getBoundingClientRect(),
                value = map( e.clientY, bounds.top, bounds.bottom, max, min )

            return clamp( value, min, max )
        }

        this.onMouseDown = e => {

            this.props.onChange( computeValueFromEvent( e ))
            this.setState({drag:true})
        }

        this.onMouseUp = e => {

            this.setState({drag:false})
        }

        this.onMouseMove = e => {
            // console.log( this.domRef )
            this.props.onChange( computeValueFromEvent( e ))
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

        let { label, value, min, max, style } = this.props,
            stepperProps = { label, value, min, max }

        value = normalize( value, min, max )

        let radius = 50,
            range = 0.8,
            circumference = 2.0 * Math.PI * radius,
            a = [ circumference * value * range, circumference ].join(' '),
            b = [ circumference , circumference ].join(' '),
            transform = String(( 1.0 - range ) * 360 - 90) + 'deg'

            console.log( transform )

        /*
            Using a styling trick with the stroke-dasharray property to create
            the dial outline.

            See https://www.smashingmagazine.com/2015/07/designing-simple-pie-charts-with-css/
            for future reference
        */

        return <div  style={[base, style]}>
            <NumericStepper { ...stepperProps } />
            <svg style={[svgStyle, {transform}]} width='100px' height='100px' xmlns="http://www.w3.org/2000/svg"
                ref={ref => this.domRef = ref}
                onMouseDown={this.onMouseDown.bind( this )}>
            <circle r={radius} cx="50" cy="50" strokeDasharray={b} fill='transparent' stroke={secondary.color} strokeWidth={radius}></circle>
            <circle r={radius} cx="50" cy="50" strokeDasharray={a} fill='transparent' stroke={highlight.color} strokeWidth={radius}/>
            </svg>
        </div>
    }
}

Dial = radium( Dial )

Dial.propTypes = {

    /**
     *  A text label
     */
    label: PropTypes.string,


    /**
     *  The default value
     */
    value: PropTypes.number.isRequired,


    /**
     *  Specifies the minimum value for the component
     */
    min: PropTypes.number,


    /**
     *  Specifies the maximum value for the component
     */
    max: PropTypes.number,


    /**
     * Specifies the intervals step
     */
    step: PropTypes.number,


    /**
	 * A callback triggered when the component updates
	 */
    onChange: PropTypes.func,


    /**
     * Optional component styling
     */
    style: React.PropTypes.object,

}


Dial.defaultProps = {

    label: 'Dial',
    min: 0,
    max: 10,
    step: 0.1,
    onChange: a=>a,
    style:{width:'100%'}

}


var svgStyle = {
    cursor: 'default',
    borderRadius: "50%"
}


export default Dial
