import React from 'react'
import throttle from 'lodash.throttle'

class NumericStepper extends React.Component{

    constructor(){
        super()
        this.state = { drag:false }

        this.onMouseUp = _ => {
            this.setState({
                value: this.props.value,
                drag: false
            })
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
        let { min, max } = this.props,
            validate = value => Math.max( Math.min( value, max ), min ),
            onChange = e => this.props.onChange( validate( parseFloat( this.domRef.value )))
        return <input type='number' {...this.props} inInput={ onChange } onChange={ onChange } ref={ref => (this.domRef = ref )} /*onMouseDown={ e => this.setState({drag:true, initialValue: this.props.value})}*/></input>
    }
}

NumericStepper.propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.number
}

NumericStepper.defaultProps = {
    onChange: a=>a,
    value:0
}


export default NumericStepper
