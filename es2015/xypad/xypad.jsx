import React, { PropTypes } from 'react'
import NumericStepper from '../numericstepper'
import { map } from 'math'
import throttle from '../utils/throttle'
import radium from 'radium'
import { base, secondary } from '../styles'


/**

    This component provides a generic way of controlling 2d numerical quantities such as
    vectors. It's a staple of traditional A/V style applications as a way to
    play with multiple inputs via one interaction. Useful for positional values.
    In this case the values signature is `{x:Number, y:Number}`.

*/

class XYPad extends React.Component {

    constructor(){


        super()


        this.state = {drag:false}


        let computeXYfromMouseEvent = ( e, bounds ) => ({
            x: map( e.clientX === undefined ? e.touches[0].clientX : e.clientX,
                bounds.left, bounds.right, this.props.min.x, this.props.max.x ),
            y: map( e.clientY === undefined ? e.touches[0].clientY : e.clientY,
                 bounds.top, bounds.bottom, this.props.min.y, this.props.max.y )
        })


        this.onMouseDown = e => {

            /*
                For performance reasons we pre calculate the bounding rect on
                mouse down, this means we don't need to do this on every mouse move
                event and therefore we avoid any layout thrashing.

                The caveat is that any sizing changes that occur between mousedown
                will cause mean the cached boundingRect is invalid and causes incorrect
                results. However because of performance gains, this is acceptable
                behaviour as changes to size are expected to be rare enough
            */
            var rect = this.domRef.getBoundingClientRect()

            this.setState({drag:true, rect })
            this.props.onChange( computeXYfromMouseEvent( e, rect ))

        }


        this.onMouseMove = throttle( e => {
            if( this.state.drag ) this.props.onChange( computeXYfromMouseEvent( e, this.state.rect ))
        })


        this.onTouchMove = e => {
            e.preventDefault()
            if( this.state.drag ) this.props.onChange( computeXYfromMouseEvent( e, this.state.rect ))
        }


        this.onMouseUp = e => {
            this.setState({drag:false})
        }


        this.onXChange = x => this.props.onChange({ ...this.props.value, x })

        this.onYChange = y => this.props.onChange({ ...this.props.value, y })

    }

    /*
        We're deliberatley not performing any comparison here. This is because
        the props passed in would have to be a copy of the original value, which
        currently isn't the case
    */
    // shouldComponentUpdate( nextProps, nextState ){}


    render(){

        let { value, label, onChange, style } = this.props,
            { x, y } = value

        let min = { ...this.props.min, ...XYPad.min },
            max = { ...this.props.max, ...XYPad.max }


        let xVis = map( x, min.x, max.x, 0, 100 ) + '%',
            yVis = map( y, min.y, max.y, 0, 100 ) + '%'


        return <div style={base}>
            <div>{ label }</div>
            <div style={[style]}>
                <svg width='100%' height='100%' xmlns="http://www.w3.org/2000/svg"
                    style={defaultStyle}
                    ref={ref => this.domRef = ref}
                    onMouseDown={ this.onMouseDown}
                    onMouseMove={ this.state.drag ? this.onMouseMove : null }
                    onMouseUp={ this.onMouseUp }

                    onTouchStart={ this.onMouseDown }
                    onTouchMove={ this.onTouchMove }
                    onTouchEnd={ this.onMouseUp }>

                    <rect fill='none' stroke={secondary.color} strokeWidth='1' width='100%' height='100%' />
                    <line x1={xVis} x2={xVis} y1={0} y2='100%' style={[defaultStyle, style, crisp]}/>
                    <line x1={0} x2='100%' y1={yVis} y2={yVis} style={[defaultStyle, style, crisp]}/>
                    <circle r={3} cx={xVis} cy={yVis} style={circle} />
                </svg>
                <NumericStepper style={{ ...componentLabels, width:style.width }} min={min.x} max={max.x} value={x} onChange={ this.onXChange } label={'X'}/>
                <NumericStepper style={{ ...componentLabels, width:style.width }} min={min.y} max={max.y} value={y} onChange={ this.onYChange } label={'Y'}/>
            </div>
            <div style={{clear: 'both'}}></div>
        </div>
    }
}

XYPad = radium( XYPad )

XYPad.propTypes = {


    /**
     * A text label
     */
    label: PropTypes.string,

    /**
     *  The initial value of the component
     */
    value: PropTypes.shape({ x: PropTypes.number.isRequired, y: PropTypes.number.isRequired }).isRequired,


    /**
     *  The minimum bounding range
     */
    min: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),


    /**
     *  The maximum bounding range
     */
    max: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number }),



    /**
     *  Called when the component updates
     */
    onChange: PropTypes.func,


    /**
     * Optional component styling
     */
    style: PropTypes.object


}

XYPad.defaultProps = {


    label: 'XYPad',
    style:{width:'100%', height:150},
    min: {x:0,y:0},
    max: {x:100,y:100},
    onChange: a=>a

}


var defaultStyle = {
    cursor: 'default',
    stroke: secondary.color,
    strokeWidth: 1
}

var crisp = {
    shapeRendering:'crispEdges',
}

var circle = {
    fill: secondary.color,
    stroke:'none'
}

var componentLabels = {display:'inline'}


export default XYPad
