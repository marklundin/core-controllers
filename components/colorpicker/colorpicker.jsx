import React, { Component, PropTypes } from 'react'
import radium from 'radium'
import HSVColorPicker from './hsv/hsv-colorpicker'
import Colr from 'colr'
import Palette from './palette/palette'
import FaAdd from 'react-icons/lib/md/add';
import Button from '../button'
import { base, secondary, highlight } from '../styles'
import shallowCompare from '../shallowCompare'
import getConverterForColorType from './color-converter'
import saveState from '../utils/local-storage-hoc'
import { rgb, hsv, hsl } from './prop-types'


/**

A general purpose colour picker with optional colour palettes. One you, the developer
can supply and one the user can create for themselves. This means that in addition
to any pallete you provide, the user can add and save colours to their own system
colour palette, much in the same way as photoshop. These user saved colors will
persist across page refreshes.

To save the current color click the `+` to add it to system palette. Shift click
to remove it.

Each domain will have it's own user pallete, this means `localhost` can retain
it's own colours seperate to `livesite.com`

*/


class ColorPicker extends Component {

    //shouldComponentUpdate: shallowCompare,

    constructor(){
        super()
        this.state = {colors:[]}
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
        //
        let { value, label, onChange, style, palette, useSystemPalette } = this.props,
            { colors, open } = this.state,
            toHsv = getConverterForColorType( value ),
            fromHsv = toHsv.invert,
            hsvColor = toHsv( value )

        console.log( toHsv, hsvColor, Colr.fromHsvObject( hsvColor ).toHex() )

        let onColorChange = outHsv => onChange( fromHsv( outHsv ))


        return <div style={[base, style, {height:'auto'}]}>
            <div onClick={ v => this.setState({open:!open})}>
                { label }
                <span style={[ colorDropletStyle, {backgroundColor:Colr.fromHsvObject( hsvColor ).toHex() } ]}></span>
            </div>
            { open ?
                <div>
                    <HSVColorPicker {...this.props} value={ hsvColor } onChange={onColorChange} />
                    <Palette key={'user-palette'} values={ palette.map( getConverterForColorType( palette[0] )) } onSelect={ onColorChange } />
                    <Palette key={'system-palette'} values={ colors } onSelect={onColorChange} onDeselect={ this.onRemoveColorClick.bind( this ) } />
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
