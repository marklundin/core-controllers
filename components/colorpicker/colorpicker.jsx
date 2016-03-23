import React from 'react'
import HSVColorPicker from './hsv/hsv-colorpicker'
import Colr from 'colr'
import Palette from './palette/palette'
import localStorageMixin from 'react-localstorage'


var rgb = React.PropTypes.shape({
    r: React.PropTypes.number.isRequired,
    g: React.PropTypes.number.isRequired,
    b: React.PropTypes.number.isRequired
}).isRequired

var hsl = React.PropTypes.shape({
    h: React.PropTypes.number.isRequired,
    s: React.PropTypes.number.isRequired,
    l: React.PropTypes.number.isRequired
}).isRequired

let hsv = HSVColorPicker.propTypes.value


let rgb2Hsv = c => Colr.fromRgbObject(c).toRawHsvObject(),
    hsl2Hsv = c => Colr.fromHslObject(c).toRawHsvObject(),
    hsv2Hsv = c => c

rgb2Hsv.invert = c => Colr.fromHsvObject(c).toRawRgbObject()
hsl2Hsv.invert = c => Colr.fromHsvObject(c).toRawHslObject()
hsv2Hsv.invert = c => c

let getConverterForColorType = props => {

    let converter = hsv2Hsv

    if      ( rgb( props, 'value' ) === null ) converter = rgb2Hsv
    else if ( hsl( props, 'value' ) === null ) converter = hsl2Hsv

    return converter
}

let ColorPicker = React.createClass({

    mixins: [localStorageMixin],

    propTypes: {


        /**
         *  An object representing a color.
         */
        value: React.PropTypes.oneOf([rgb, hsv]).isRequired,


        /**
         *  A callback triggered when the color is updated
         */
        onChange: React.PropTypes.func,


        /**
         * An array of colors used as a palette
         */
        oneOf: React.PropTypes.oneOf([
            React.PropTypes.arrayOf( rgb ),
            React.PropTypes.arrayOf( hsv )
        ])

    },


    // getDefaultProps: function(){
    //     return {
    //         value:{ r: 1, g: 0, b: 0 },
    //         onChange: a => a
    //     }
    // },


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
        this.setState({
            colors: this.state.colors
        })
    },


    render: function(){

        let { value, onChange, oneOf } = this.props,
            { systemColors } = this.state,
            toHsv = getConverterForColorType( this.props ),
            fromHsv = toHsv.invert,
            hsvColor = toHsv( value )


        let onColorChange = outHsv => onChange( fromHsv( outHsv ))


        return <div>
            <HSVColorPicker {...this.props} value={ hsvColor } onChange={onColorChange} />
            <Palette key={'user-palette'} values={ oneOf } onSelect={onColorChange} />
            <Palette key={'system-palette'} values={ this.state.colors } onSelect={onColorChange} onDeselect={ this.onRemoveColorClick } />
            <button onClick={ e => this.onAddColorClick( toHsv( value )) }>+</button>
        </div>
    }
})

export default ColorPicker
