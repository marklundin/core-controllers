import React from 'react'


/**
 * A horizontal progress slider with step size and minimum and maximum bounds.
 */
let Slider = ({ value, label, min, max, step, onChange, width, height }) => {

    let mask = width / 2

    return <div>
        <label>{ label }</label>
        <input type="range" value={value} step={step} min={min} max={max} onChange={e => onChange( parseFloat( e.nativeEvent.target.value ))}/>
    </div>
}

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
     *  The width of the component in pixels
     */
    width: React.PropTypes.number,

    /**
     *  The height of the component in pixels
     */
    height: React.PropTypes.number

}

Slider.defaultProps = {
    value: 2,
    min: 0,
    max: 10,
    step: 1,
    width: 400,
    height: 10,
    onChange: a => a,
}

export default Slider
