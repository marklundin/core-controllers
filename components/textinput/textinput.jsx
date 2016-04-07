import React from 'react'
import radium from 'radium'
import { base, highlight, secondary } from '../styles'

let defaultStyle = {
    fontFamily: 'inherit',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 'none',
    float:'right',
    textAlign: 'right',
    borderBottom : '1px solid ' + secondary.color,
    backgroundColor : 'transparent',
    ":focus":{
        outline: 'none',
        borderBottom : '1px solid ' + highlight.color
    },
    ":hover":{
        borderBottom : '1px solid ' + highlight.color,
    }
}

let TextInput = ({ value, label, onChange, style }) => {

	return <div style={[base, style]}>
		<label>{ label }</label>
        <input type="text" value={value}
            style={[base, defaultStyle]} onChange={evt => onChange( evt.target.value )}/>
	</div>
}

TextInput = radium( TextInput )

TextInput.propTypes = {

	/**
	 * The default value for the text input field
	 */
	value: React.PropTypes.string,


	/**
	 * A function called when the text field changes
	 */
	onChange: React.PropTypes.func,


	/**
	 * A text label for the input field
	 */
	label: React.PropTypes.string,


    /**
     * Optional component styling
     */
    style: React.PropTypes.object

}

TextInput.defaultProps = {

    value: '',
    style: {width:'100%'},
	label: 'Text Input',
    onChange: a=>a

}

export default TextInput
