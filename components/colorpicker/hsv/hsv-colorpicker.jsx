import React from 'react'
import radium from 'radium'
import Colr from 'colr'
import Slider from '../../slider'
import NumericStepper from '../../numericstepper'
import { map } from 'math'
import throttle from 'lodash.throttle'
import { base, secondary } from '../../styles'
import shallowCompare from '../../shallowCompare'

let style = {
    cursor: 'default',
    slider: {
        backgroundBar:{ fill:'url(#hsv-gradient)'},
        bar: { fill : 'none' },
        thumb: { fill : 'white' }
    },
    componentLabels: {display:'inline'},
    colorDrop: {
        borderRadius:"50%",
        width: '1rem',
        height: '1rem',
        float:'right'
    },
    rect:{
        rx: base.borderRadius,
        ry: base.borderRadius,
    }
}

// Calucalte HSV color stops
let l = 0, i = 100/360, stops = []
while( l++ < 360 ){
    stops.push(<stop offset={String(i*l)+"%"} stopColor={"hsl( "+l+", 100%, 50% )"} />)
}

class HSVColorPicker extends React.Component {

    // shouldComponentUpdate: shallowCompare,

    constructor(){
        super()
        this.state = {drag:false};

        let computeHsvFromMouseEvent = e => {

            let bounds = this.domRef.getBoundingClientRect()

            return {
                h: this.props.value.h,
                s: ( e.pageX - bounds.left ) / bounds.width * 100,
                v: ( bounds.height - ( e.clientY - bounds.top )) / bounds.height * 100
            }
        }

        this.onMouseDown = e => {
            this.setState({drag:true})
            this.props.onChange( computeHsvFromMouseEvent( e ))
        }

        this.onMouseMove = throttle( e => {
            this.props.onChange( computeHsvFromMouseEvent( e ))
        })

        this.onMouseUp = e => {
            this.setState({drag:false})
        }
    }

    render(){

        let { label, onChange, value, style } = this.props,
            { h, s, v } = value

        return <div style={[base, style]}>
            <div>
                { label }
                <span style={[ style.colorDrop, {backgroundColor:Colr.fromHsvObject( value ).toHex() } ]}></span>
            </div>
            <svg width='100%' height='100%' xmlns="http://www.w3.org/2000/svg"
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
                    <linearGradient id='hsv-gradient'>{ stops }</linearGradient>
                </defs>
                <rect width='100%' height='100%' style={[style.rect]} fill='url(#horizontal-gradient)'/>
                <rect width='100%' height='100%' style={[style.rect]} fill='url(#vertical-gradient)'/>
                <circle fill='none' stroke='white' strokeWidth="1.5" r="5" cx={s+'%'} cy={(100 - v)+'%'}/>
            </svg>
            <Slider includeStepper={false} label={''} step={1} min={1} max={360} value={h} style={style.slider} onChange={h => onChange({ h, s, v })}/>
            <NumericStepper key="h" style={style.componentLabels} step={1} min={1} max={360} value={Math.round(h)} onChange={h => onChange({ h, s, v })} label={'H'}/>
            <NumericStepper key="s" style={style.componentLabels} step={1} min={1} max={100} value={Math.round(s)} onChange={s => onChange({ h, s, v })} label={'S'}/>
            <NumericStepper key="v" style={style.componentLabels} step={1} min={1} max={100} value={Math.round(v)} onChange={v => onChange({ h, s, v })} label={'V'}/>
        </div>

    }
}

HSVColorPicker = radium( HSVColorPicker )



HSVColorPicker.defaultProps = {
    label: 'ColorPicker',
    // width: 256,
    // height: 256,
    style:{
        width:'100%'
    },
    value:{ h:0, s:80, l:50 }
}

HSVColorPicker.propTypes = {

    /**
     *  A text label
     */
    label: React.PropTypes.string,


    /**
     * The default color of the component
     */
    value: React.PropTypes.shape({
        h: React.PropTypes.number.isRequired,
        s: React.PropTypes.number.isRequired,
        v: React.PropTypes.number.isRequired
    }).isRequired,


    // /**
    //  * The width of the component
    //  */
    // width: React.PropTypes.oneOfType([
    //     React.PropTypes.string,
    //     React.PropTypes.number
    // ]),
    //
    //
    // /**
    //  * The height of the component
    //  */
    // height: React.PropTypes.oneOfType([
    //     React.PropTypes.string,
    //     React.PropTypes.number
    // ]),


    /**
     * Optional component styling
     */
    style: React.PropTypes.object

}

export default HSVColorPicker
