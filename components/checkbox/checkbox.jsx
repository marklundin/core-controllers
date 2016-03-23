import React from 'react'

/**
 * A Simple Checkbox component.
 */
const Checkbox = ({ value, label, onChange }) => {
	return <div>
		<label>{ label }</label>
		<input checked={ value } type="checkbox" onChange={evt => onChange( evt.target.checked )} />
	</div>
}

Checkbox.propTypes = {

	/**
	 * Determines whether the element is checked or not.
	 */
	value: React.PropTypes.bool,


	/**
	 * A callback triggered when the checkbox is toggled
	 */
	onChange: React.PropTypes.func,

	/**
	 * Label for form element
	 */
	label: React.PropTypes.string

}

Checkbox.defaultProps = {
	value: false,
	label: '',
	onChange: a => a
}


export default Checkbox
