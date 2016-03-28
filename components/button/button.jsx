import React from 'react'
import radium from 'radium'

let Button = props => {

    let { value, label } = props

    return <button onClick={ value }>{ label }</button>

}

Button = radium( Button )

Button.defaultProps = {

    /**
     * A function called when the button is clicked
     */
    value: a=>a,

    /**
     * A text label for the button
     */
    label: 'Button'
}

Button.propTypes = {
    value: React.PropTypes.func.isRequired,
    label: React.PropTypes.string
}

export default Button
