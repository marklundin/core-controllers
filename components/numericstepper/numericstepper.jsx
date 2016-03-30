import React from 'react'
import throttle from 'lodash.throttle'
import radium from 'radium'
import { clamp } from 'math'
import { base, secondary, highlight } from '../styles'
import shallowCompare from '../shallowCompare'


let defaultStyle = {
    fontFamily: 'inherit',
    // borderTop: 'none',
    // borderLeft: 'none',
    // borderRight: 'none',
    borderWidth : 1,
    borderStyle: 'solid',
    borderColor: secondary.color,
    borderRadius: 2,
    backgroundColor : 'transparent',
    outline: 'none',
    textAlign: 'center',
    ":focus":{
        borderColor : highlight.color
    },
    ":hover":{
        borderColor : highlight.color,
    }
}



let hideSpinners = {
    '::-webkit-inner-spin-button':'{ margin: 0; -webkit-appearance: none; }'
}

class NumericStepper extends React.Component{

    // shouldComponentUpdate: shallowCompare,

    constructor(){

        super()
        this.state = { drag:false }

        this.onMouseUp = _ => {
            // this.setState({
            //     value: this.props.value,
            //     drag: false
            // })
        }

        this.onMouseMove = e => {
            // let boundingBox = this.domRef.getBoundingClientRect(),
            //     height = boundingBox.top - boundingBox.bottom,
            //     center = boundingBox.top - height * 0.5,
            //     value = e.clientY - center,
            //     ({ min, max }) = this.props,
            //     validate = value = Math.max( Math.min( value, max ), min )
            //
            // this.props.onChange( validate( this.state.initialValue - value ))

        }
    }

    // input::-webkit-outer-spin-button,
    // input::-webkit-inner-spin-button {
    //     /* display: none; <- Crashes Chrome on hover */
    //     -webkit-appearance: none;
    //     margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    // }
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

        let { label, min, max, step, style } = this.props,
            validate = v => Math.round( clamp( v, min, max ) * ( 1 / step )) / ( 1 / step ),
            value = validate( this.props.value ),
            onChange = e => {
                if( !isNaN( this.domRef.value )) this.props.onChange( validate( parseFloat( this.domRef.value )))
            }

        return <div style={[ base, style ]}>
            <label >{ label }</label>
            <style>{`
                input::-webkit-inner-spin-button,
                input::-webkit-outer-spin-button{
                    margin: 0;
                    -webkit-appearance: none;
                }
            `}</style>
            <input type='number' {...this.props} style={[ defaultStyle, style ]} value={value} inInput={ onChange } onChange={ onChange } ref={ref => (this.domRef = ref )} /*onMouseDown={ e => this.setState({drag:true, initialValue: this.props.value})}*//>
        </div>
    }
}

NumericStepper = radium( NumericStepper )

NumericStepper.propTypes = {

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
     * Optional component styling
     */
    style: React.PropTypes.object

}

NumericStepper.defaultProps = {

    min: 0,
    max: 100,
    step: 0.1,
    onChange: a=>a

}


export default NumericStepper
