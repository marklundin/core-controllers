import React from 'react'
import radium from 'radium'
import { base, highlight } from '../styles'

let defaultStyle = {
    outline: 'none',
    border: 'none',
    padding: '0.5rem',
    verticalAlign: 'middle',
    textAlign: 'center',
    lineHeight: '50%',
    ':hover':{
        backgroundColor: highlight.color,
        color: 'white'
    }
}

let Button = props => {

    let { label, style } = props

    return <button {...props} style={[ base, defaultStyle, style ]} >{ label }</button>

}

Button = radium( Button )

Button.defaultProps = {

    label: 'Button'

}

Button.propTypes = {


    /**
     * A function called when the button is clicked
     */
    onClick: React.PropTypes.func,


    /**
     * A function called when the button is clicked
     */
    onMouseOver: React.PropTypes.func,


    /**
     * A function called when the button is clicked
     */
    onMouseOut: React.PropTypes.func,


    /**
     * A text label
     */
    label: React.PropTypes.string,


    /**
     * Optional component styling
     */
    style: React.PropTypes.object

}

export default Button
