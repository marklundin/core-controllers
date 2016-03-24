import React from 'react'
import radium from 'radium'
import { base, highlight } from '../styles'

let style = {
    fontFamily: 'inherit',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom : '1px solid ' + base.color,
    backgroundColor : 'transparent',
    ":focus":{
        outline: 'none',
        borderBottom : '1px solid ' + highlight.color
    },
    ":hover":{
        borderBottom : '1px solid ' + highlight.color,
    }
}

let TextInput = ({ value, label, onChange }) => {
	return <div style={[base]}>
		<label>{ label }</label>
        <input type="text"
			value={value}
			style={[base, style]}
			onChange={evt => onChange( evt.target.value )}/>
	</div>
}

TextInput = radium( TextInput )

TextInput.propTypes = {

	/**
	 * Determines the content of the text area
	 */
	value: React.PropTypes.string,


	/**
	 * A callback triggered when the checkbox is toggled
	 */
	onChange: React.PropTypes.func,

	/**
	 * Label for the form element
	 */
	label: React.PropTypes.string
}

TextInput.defaultProps = {
    value: '',
	label: '',
    onChange: a=>a,
}

export default TextInput
