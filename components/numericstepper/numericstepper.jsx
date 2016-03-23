import React from 'react'
import throttle from 'lodash.throttle'

export default class NumericStepper extends React.Component{

    constructor(){
        super()
        this.state = { drag:false }

        this.onMouseUp = _ => {
            this.setState({
                value: this.props.value,
                drag: false
            })
        }

        this.onMouseMove = throttle( e => {
            let boundingBox = this.domRef.getBoundingClientRect()
            let height = boundingBox.top - boundingBox.bottom
            let center = boundingBox.top - height * 0.5
            let value = e.clientY - center
            this.props.onChange( this.state.initialValue - value )
        }, 1000 / 60 )
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
        return <input type='text' value={ this.props.value } onChange={this.props.onChange} ref={ref => (this.domRef = ref )} onMouseDown={ e => this.setState({drag:true, initialValue: this.props.value})}></input>
    }
}
