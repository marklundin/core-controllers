import React, { Component, PropTypes } from 'react'
import radium from 'radium'
import { base } from '../styles'
import { MdExpandMore, MdExpandLess } from 'react-icons/lib/md';

/*
    The Folder is a container component that can be toggled opened and closed.
    To render it's children, it takes an function that returns an array of react
    elements.
*/

class Folder extends Component {

    constructor(){

        super()

        this.state = { open: false }

        this.toggleOpen = _ => this.setState({ open:!this.state.open })

    }


    render(){

        let { label, value } = this.props,
            { open } = this.state

        return <div style={base}>
            <div onClick={this.toggleOpen}>{ label }{ open ? <MdExpandLess style={floatRight}/> : <MdExpandMore style={floatRight}/> }</div>
            { open ? value() : null }
        </div>

    }
}


Folder.defaultProps = {

    label: 'Folder',
    onChange: a=>a

}


Folder.propTypes = {

    value : PropTypes.func.isRequired,

    onChange: PropTypes.func,

    label: PropTypes.string,

    style: PropTypes.object

}

var floatRight = {
    float: 'right'
}

export default Folder
