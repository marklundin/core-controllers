import React from 'react'
import radium from 'radium'
import { base, highlight } from '../styles'

let defaultStyle = {
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
    padding: '1em',
    verticalAlign: 'middle',
    textAlign: 'center',
    lineHeight: '50%',
    ':hover':{
        backgroundColor: highlight.color,
        color: 'white'
    }
}

/**
    Just a regular button, it click, it hovers, nothing else
*/

let Button = props => <button {...props} style={[ base, defaultStyle, props.style ]} >{ props.label }</button>


Button = radium( Button )

Button.defaultProps = {

    label: 'Button'

}

Button.propTypes = {


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
