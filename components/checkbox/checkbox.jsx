import React from 'react'
import radium from 'radium'
import { base } from '../styles'

/**
 * A Simple Checkbox component.
 */
let Checkbox = ({ value, label, onChange }) => {
	return <div style={[base]}>
		<label style={[base]} onClick={evt => onChange( !value )}>{ label }</label>
		<input checked={ value } type="checkbox" onChange={evt => onChange( evt.target.checked )} />
	</div>
}

Checkbox = radium( Checkbox )

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
	label: 'Checkbox',
	onChange: a => a
}


export default Checkbox
