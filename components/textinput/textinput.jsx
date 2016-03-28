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
	 * The default value for the text inout field
	 */
	value: React.PropTypes.string,

	/**
	 * A function called when the text field changes
	 */
	onChange: React.PropTypes.func,

	/**
	 * A text label for the input field
	 */
	label: React.PropTypes.string
}

TextInput.defaultProps = {
    value: '',
	label: '',
    onChange: a=>a,
}

export default TextInput
