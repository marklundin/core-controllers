import { PropTypes } from 'react'

export const rgb = PropTypes.shape({
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired
}).isRequired

export const hsl = PropTypes.shape({
    h: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    l: PropTypes.number.isRequired
}).isRequired

export const hsv = PropTypes.shape({
    h: PropTypes.number.isRequired,
    s: PropTypes.number.isRequired,
    v: PropTypes.number.isRequired
}).isRequired
