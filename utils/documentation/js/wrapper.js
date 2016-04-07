var React = require( 'react' )

module.exports = React.createClass({

    getInitialState: function(){
        return{ value: this.props.children.props.value }
    },

    render: function(){

        var setState = this.setState.bind( this )
        var child = React.cloneElement( this.props.children, {
            value: this.state.value,
            onChange: function( n ){
                setState({ value: n })
            }})

        return child

    }
})
