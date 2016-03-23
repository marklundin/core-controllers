import React from 'react'

let TextInput = ({ value, label, onChange }) => {
	return <div>
		<label>{ label }</label>
        <input
			value={value}
			type="text"
			onChange={evt => onChange( evt.target.value )}/>
	</div>
}

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
    onChange: a => a,
}

export default TextInput
