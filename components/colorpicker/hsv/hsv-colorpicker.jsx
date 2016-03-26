import React from 'react'
import Slider from '../../slider'
import NumericStepper from '../../numericstepper'
import { map } from 'math'
import throttle from 'lodash.throttle'
import shallowCompare from '../../shallowCompare'

let style = {
    cursor: 'default'
}

class HSVColorPicker extends React.Component {

    // shouldComponentUpdate: shallowCompare,

    constructor(){
        super()
        this.state = {drag:false};


        let computeHsvFromMouseEvent = e => {

            let bounds = this.domRef.getBoundingClientRect()

            let hsv = {
                h: this.props.value.h,
                s: ( e.pageX - bounds.left ) / bounds.width * 100,
                v: ( bounds.height - ( e.clientY - bounds.top )) / bounds.height * 100
            }

            return hsv
        }

        this.onMouseDown = e => {
            this.setState({drag:true})
            this.props.onChange( computeHsvFromMouseEvent( e ))
        }

        this.onMouseMove = e => {
            this.props.onChange( computeHsvFromMouseEvent( e ))
        }

        this.onMouseUp = e => {
            this.setState({drag:false})
        }
    }

    render(){

        let { width, height, label, onChange, value } = this.props,
            { h, s, v } = value

        console.log( 'boo' )

        return <div>
            <label>{ label }</label>
            <svg width={width} height={height} viewBox={"0 0 "+width+" "+height} xmlns="http://www.w3.org/2000/svg"
                ref={ref => this.domRef = ref } style={style}
                onMouseDown={this.onMouseDown} onMouseMove={this.state.drag ? this.onMouseMove : null } onMouseUp={this.onMouseUp} >
                <defs>
                    <linearGradient id="horizontal-gradient">
                        <stop offset="0%" stopColor="white"/>
                        <stop offset="100%" stopColor={"hsl("+h+",100%,50%)"}/>
                    </linearGradient>
                    <linearGradient id="vertical-gradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="black" stopOpacity="0"/>
                        <stop offset="100%" stopColor="black"/>
                    </linearGradient>
                </defs>
                <rect width={width} height={height} fill='url(#horizontal-gradient)'/>
                <rect width={width} height={height} fill='url(#vertical-gradient)'/>
                <circle fill='none' stroke='black' strokeWidth="2" r="4" cx={s*width/100} cy={height - (v*height/100)}/>
            </svg>
            <Slider label={'hue'} max={359} value={h} width={width} onChange={h => onChange({ h, s, v })}/>
            <NumericStepper key="h" min={1} max={360} value={Math.round(h)} onChange={h => onChange({ h, s, v })} label={'H'}/>
            <NumericStepper key="s" min={1} max={100} value={Math.round(s)} onChange={s => onChange({ h, s, v })} label={'S'}/>
            <NumericStepper key="v" min={1} max={100} value={Math.round(v)} onChange={v => onChange({ h, s, v })} label={'V'}/>
        </div>

    }
}

HSVColorPicker.propTypes = {

    width: React.PropTypes.number,
    height: React.PropTypes.number,

    value: React.PropTypes.shape({
        h: React.PropTypes.number.isRequired,
        s: React.PropTypes.number.isRequired,
        v: React.PropTypes.number.isRequired
    }).isRequired
}

export default HSVColorPicker
