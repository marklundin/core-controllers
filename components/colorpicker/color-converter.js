import { rgbObject, hslObject, rgbArray } from './validators'
import Colr from 'colr'

export let rgb2Hsv = c => Colr.fromRgbObject(c).toRawHsvObject()
export let rgbArr2Hsv = c => Colr.fromRgbArray(c.map( channel => channel * 255 )).toRawHsvObject()
export let hsl2Hsv = c => Colr.fromHslObject(c).toRawHsvObject()
export let hsv2Hsv = c => c

rgb2Hsv.invert = c => Colr.fromHsvObject(c).toRawRgbObject()
rgbArr2Hsv.invert = c => Colr.fromHsvObject(c).toRawRgbArray().map( channel => channel / 255 )
hsl2Hsv.invert = c => Colr.fromHsvObject(c).toRawHslObject()
hsv2Hsv.invert = c => c

export default value => {

    let converter = hsv2Hsv

    if ( rgbObject( value )) converter = rgb2Hsv
    else if( rgbArray( value ) ) converter = rgbArr2Hsv
    else if ( hslObject( value )) converter = hsl2Hsv

    return converter

}
