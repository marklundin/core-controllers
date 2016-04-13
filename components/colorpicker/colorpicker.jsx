import React, { Component, PropTypes } from 'react'
import radium from 'radium'
import HSVColorPicker from './hsv/hsv-colorpicker.jsx'
import Colr from 'colr'
import Palette from './palette/palette.jsx'
import FaAdd from 'react-icons/lib/md/add';
import Button from '../button'
import { base, secondary, highlight } from '../styles'
import shallowCompare from 'react-addons-shallow-compare'
import getConverterForColorType from './color-converter'
import saveState from '../utils/local-storage-hoc'
import { rgb, hsv, hsl } from './prop-types'


/**

A collapsible color picker with colour palette. One is assigned by you, the
developer, the other is defined by the end user which persists across page refreshes.
This means that in addition to any pallete you provide, the user can also add and save
their own colours, much in the same way as photoshop.

To save the current color click the `+` icon to save it to the users palette.
Shift click to remove it.

The users colour palette is saved to [localStorage](localStorage), this means
each domain will have it's own unique user pallete, meaning `localhost` will differ
from `staging.com`.

*/


class ColorPicker extends Component {

    //shouldComponentUpdate: shallowCompare,

    constructor(){
        super()
        this.state = {colors:[]}

        this.onColorChange = hsv => {

            let color = getConverterForColorType( this.props.value ).invert( hsv )
            this.props.onChange( color )
        }
    }


    onAddColorClick( color ){
        this.setState({
            colors: this.state.colors.slice().concat([ color ])
        })
    }


    onRemoveColorClick( color, index ){
        console.log( this )
        this.state.colors.splice( index, 1 )
        this.setState({ colors: this.state.colors })
    }





    render(){

        let { value, label, onChange, style, palette } = this.props,
            { colors, open } = this.state,
            toHsv = getConverterForColorType( value ),
            hsvColor = toHsv( value )


        return <div style={[base, style, {height:'auto'}]}>
            <div onClick={ v => this.setState({open:!open})}>
                { label }
                <span style={[ colorDropletStyle, {backgroundColor:Colr.fromHsvObject( hsvColor ).toHex() } ]}></span>
            </div>
            { open ?
                <div>
                    <HSVColorPicker style={ style } value={ hsvColor } onChange={ this.onColorChange } />
                    <Palette key={'user-palette'} values={ palette.map( getConverterForColorType( palette[0] )) } onSelect={ this.onColorChange } />
                    <Palette key={'system-palette'} values={ colors } onSelect={ this.onColorChange } onDeselect={ this.onRemoveColorClick.bind( this ) } />
                    <span style={[ base, { ':hover': secondary }]}><FaAdd onClick={ e => this.onAddColorClick( toHsv( value )) }/></span>
                </div>
            : null }
        </div>
    }
}

ColorPicker.displayName = 'ColorPicker'

ColorPicker = saveState( ColorPicker )
ColorPicker = radium( ColorPicker )


ColorPicker.propTypes = {


    /**
     * The text label to display
     */
    label: PropTypes.string,


    /**
     *  An color object
     */
    //value: PropTypes.oneOf([rgb, hsv, hsl]),


    /**
     * An array of colors used as a palette
     */
    palette: PropTypes.oneOfType([
        PropTypes.arrayOf( rgb ),
        PropTypes.arrayOf( hsv ),
        PropTypes.arrayOf( hsl )
    ]),


    /**
     * Optional component styling
     */
    style: PropTypes.object,


    /**
     *  A function triggered when the color changes
     */
    onChange: PropTypes.func


}


ColorPicker.defaultProps = {
    open: false,
    label: 'ColorPicker',
    value:{h:1,s:50,v:50},
    palette: [],
    onChange: a=>a
}


var colorDropletStyle = {
    borderRadius:"50%",
    width: '1em',
    height: '1em',
    float:'right'
}

export default ColorPicker
