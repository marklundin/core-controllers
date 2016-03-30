import React from 'react'
import radium from 'radium'

let Button = props => {

    let { value, label } = props

    return <button onClick={ value }>{ label }</button>

}

Button = radium( Button )

Button.defaultProps = {

    label: 'Button'

}

Button.propTypes = {

    /**
     * A function called when the button is clicked
     */
    value: React.PropTypes.func.isRequired,

    /**
     * A text label
     */
    label: React.PropTypes.string

}

export default Button
