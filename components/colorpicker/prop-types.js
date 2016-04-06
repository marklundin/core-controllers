import { PropTypes } from 'react'

export const rgb = React.PropTypes.shape({
    r: React.PropTypes.number.isRequired,
    g: React.PropTypes.number.isRequired,
    b: React.PropTypes.number.isRequired
}).isRequired

export const hsl = React.PropTypes.shape({
    h: React.PropTypes.number.isRequired,
    s: React.PropTypes.number.isRequired,
    l: React.PropTypes.number.isRequired
}).isRequired

export const hsv = React.PropTypes.shape({
    h: React.PropTypes.number.isRequired,
    s: React.PropTypes.number.isRequired,
    v: React.PropTypes.number.isRequired
}).isRequired
