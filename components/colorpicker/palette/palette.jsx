import React from 'react'
import Colr from 'colr'
import { PropTypes } from 'react'


let ColorButton = props => {

    let { value, onClick, children, onMouseOver } = props

    let styles = {
        backgroundColor:Colr.fromHsvObject( value ).toHex(),
        width: 20, height: 20,
        display: 'inline-block'
    }

    return <div style={styles} {...props} onClick={ e => {
        onClick( value, e.shiftKey )
    }}>{ children }</div>
}

class Palette extends React.Component {

    constructor(){
        super()
        this.state = {hover:null}
    }

    render(){

        let { values, onSelect, onDeselect } = this.props


        // If we have no colors then don't bother showing anything
        if( !values || values.length === 0 ) return null

        return <div>
            { values.map(( color, i ) => <ColorButton key={i} value={color}
                    onClick={( value, modifier ) => {
                        modifier ? onDeselect( value, i ) : onSelect( value )
                        // onDeselect( color, i )
                    }}
                    onMouseOver={ e => onDeselect && e.shiftKey ? this.setState({hover:i}) : null }
                    onMouseOut={ e => this.setState({hover:null})}>
                        { this.state.hover === i ? '-' : '' }
                </ColorButton>
            )}
        </div>

    }
}

Palette.defaultProps = {

    /**
     * An array of colors
     */

    value: [],

    onSelect: a=>a
}

Palette.propTypes = {
    value: PropTypes.arrayOf(
        PropTypes.shape({ h: PropTypes.number.isRequired, s: PropTypes.number.isRequired, v: PropTypes.number.isRequired })
    ).isRequired,
    onSelect: PropTypes.func,
    onDeselect: PropTypes.func
}

export default Palette
