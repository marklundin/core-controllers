import React from 'react'
import throttle from 'lodash.throttle'
import radium from 'radium'
import { clamp } from 'math'
import { base, highlight } from '../styles'
import shallowCompare from '../shallowCompare'


let style = {
    fontFamily: 'inherit',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom : '1px solid ' + base.color,
    backgroundColor : 'transparent',
    ":focus":{
        outline: 'none',
        borderBottom : '1px solid ' + highlight.color
    },
    ":hover":{
        borderBottom : '1px solid ' + highlight.color,
    }
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

        let { label, min, max, step } = this.props,
            validate = v => v,//Math.round( clamp( v, min, max ) * ( 1 / step )) / ( 1 / step ),
            value = validate( this.props.value ),
            onChange = e => {
                if( !isNaN( this.domRef.value )) this.props.onChange( validate( parseFloat( this.domRef.value )))
            }

        console.log( label, value )
        return <div style={base}>
            <label >{ label }</label>
            <input type='number' style={[ base, style ]} {...this.props} value={value} inInput={ onChange } onChange={ onChange } ref={ref => (this.domRef = ref )} /*onMouseDown={ e => this.setState({drag:true, initialValue: this.props.value})}*//>
        </div>
    }
}

NumericStepper = radium( NumericStepper )

NumericStepper.propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number,
    step: React.PropTypes.number
}

NumericStepper.defaultProps = {
    onChange: a=>a,
    min: 0,
    max: 100,
    step: 0.1,
    value:0
}


export default NumericStepper
