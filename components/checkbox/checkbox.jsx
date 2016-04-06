import React from 'react'
import radium from 'radium'
import { base } from '../styles'

/**
 	Yes, it's a checkbox. You click it once, you click it twice. Pretty exciting stuff. 
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
	 * A text label
	 */
	label: React.PropTypes.string,

	/**
	 * Determines whether the element is checked or not.
	 */
	value: React.PropTypes.bool,


	/**
	 * A callback triggered when the checkbox is toggled
	 */
	onChange: React.PropTypes.func



}

Checkbox.defaultProps = {
	label: 'Checkbox',
	value: false,
	onChange: a=>a
}


export default Checkbox
