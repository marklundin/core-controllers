import { rgb, hsl } from './prop-types'
import Colr from 'colr'

export let rgb2Hsv = c => Colr.fromRgbObject(c).toRawHsvObject()
export let hsl2Hsv = c => Colr.fromHslObject(c).toRawHsvObject()
export let hsv2Hsv = c => c

rgb2Hsv.invert = c => Colr.fromHsvObject(c).toRawRgbObject()
hsl2Hsv.invert = c => Colr.fromHsvObject(c).toRawHslObject()
hsv2Hsv.invert = c => c

export default value => {

    let converter = hsv2Hsv

    if ( rgb( {value}, 'value' ) === null ) converter = rgb2Hsv
    else if ( hsl( {value}, 'value' ) === null ) converter = hsl2Hsv

    return converter

}
