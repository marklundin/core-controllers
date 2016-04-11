var React = require( 'react' )

module.exports = React.createClass({

    getInitialState: function(){
        return{ value: this.props.children.props.value }
    },

    onComponentChange: function( n ){
        this.setState({ value: n })
    },

    render: function(){

        var setState = this.setState.bind( this )
        return React.cloneElement( this.props.children, {
            value: this.state.value,
            onChange: this.onComponentChange
        })
    }
})
