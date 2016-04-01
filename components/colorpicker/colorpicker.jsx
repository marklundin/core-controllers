import React from 'react'
import radium from 'radium'
import HSVColorPicker from './hsv/hsv-colorpicker'
import Colr from 'colr'
import Palette from './palette/palette'
import FaAdd from 'react-icons/lib/md/add';
import Button from '../button'
import localStorageMixin from 'react-localstorage'
import { base, secondary, highlight } from '../styles'
import shallowCompare from '../shallowCompare'


const rgb = React.PropTypes.shape({
    r: React.PropTypes.number.isRequired,
    g: React.PropTypes.number.isRequired,
    b: React.PropTypes.number.isRequired
}).isRequired


const hsl = React.PropTypes.shape({
    h: React.PropTypes.number.isRequired,
    s: React.PropTypes.number.isRequired,
    l: React.PropTypes.number.isRequired
}).isRequired

const hsv = HSVColorPicker.propTypes.value


let rgb2Hsv = c => Colr.fromRgbObject(c).toRawHsvObject(),
    hsl2Hsv = c => Colr.fromHslObject(c).toRawHsvObject(),
    hsv2Hsv = c => c

rgb2Hsv.invert = c => Colr.fromHsvObject(c).toRawRgbObject()
hsl2Hsv.invert = c => Colr.fromHsvObject(c).toRawHslObject()
hsv2Hsv.invert = c => c

let getConverterForColorType = props => {

    let converter = hsv2Hsv

    if ( rgb( props, 'value' ) === null ) converter = rgb2Hsv
    else if ( hsl( props, 'value' ) === null ) converter = hsl2Hsv

    return converter
}

/**

A general purpose color picker with an optional app colour palette and a user
palette. The app palette is provided by the author, whilst the user palette
is specific to the user. This means users can save colours which persist across
page refreshes.

To save the current color click the `+` icon which adds it to the users palette.
Shift click the colour swatch to remove it.

Each domain will have it's own user pallete, this means `localhost` can retain
it's own colours seperate to `livesite.com`

*/

let ColorPicker = radium( React.createClass({

    mixins: [localStorageMixin],

    localStorageKey: 'core-color-picker',

    //shouldComponentUpdate: shallowCompare,

    propTypes: {


        /**
         *  An color object
         */
        value: React.PropTypes.oneOf([rgb, hsv]),


        /**
         *  A function triggered when the color changes
         */
        onChange: React.PropTypes.func,


        /**
         * An array of colors used as a palette
         */
        oneOf: React.PropTypes.oneOfType([
            React.PropTypes.arrayOf( rgb ),
            React.PropTypes.arrayOf( hsv ),
            React.PropTypes.arrayOf( hsl ),
        ]),


        /**
         * The text label to display
         */
        label: React.PropTypes.string,


        /**
         * Optional component styling
         */
        style: React.PropTypes.object

    },


    getDefaultProps: function(){
        return {
            label: 'ColorPicker',
            value:{ h:0, s:80, l:50 },
            oneOf: [],
            onChange: a=>a
        }
    },


    getInitialState: function() {
        return {colors:[]};
    },


    onAddColorClick: function( color ){
        this.setState({
            colors: this.state.colors.slice().concat([ color ])
        })
    },


    onRemoveColorClick: function( color, index ){
        this.state.colors.splice( index, 1 )
        this.setState({ colors: this.state.colors })
    },


    render: function(){

        let { value, onChange, style, oneOf, useSystemPalette } = this.props,
            { systemColors } = this.state,
            toHsv = getConverterForColorType( this.props ),
            fromHsv = toHsv.invert,
            hsvColor = toHsv( value )


        let onColorChange = outHsv => onChange( fromHsv( outHsv ))


        return <div style={[base, style, {height:'auto'}]}>
            <HSVColorPicker {...this.props} value={ hsvColor } onChange={onColorChange} />
            <Palette key={'user-palette'} values={ oneOf.map( toHsv ) } onSelect={ onColorChange } />
            <Palette key={'system-palette'} values={ this.state.colors } onSelect={onColorChange} onDeselect={ this.onRemoveColorClick } />
            <span style={[ base, { ':hover': secondary }]}><FaAdd onClick={ e => this.onAddColorClick( toHsv( value )) }/></span>
        </div>
    }
}))

console.log( ColorPicker )

export default ColorPicker
