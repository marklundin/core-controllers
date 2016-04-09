
/**
 * Performs a shallow comparison between 2 values ommiting any keys found in `without`.
 * If both are the same value, or contain the same properties, then they are equivalent.
 */

let shallowEqualsWithout = ( a, b, without ) => {

    if( Object.keys( a ).length !== Object.keys( b ).length ) return false

    for( var i in a ){
        if( a[i] !== b[i] || without[i] !== undefined ) return false
    }

    return true
}

/**
 * A `shouldComponentUpdate` component check that performs a shallow comparison between
 * the current and incoming state/props whilst ignoring the `onChange` handle
 */

export default ( props, nextProps, state, nextState ) => {


    /**
     *  If the props or state contains a different number of keys, then we should update
     */

    let without = ['onChange']

    return !shallowEqualsWithout( props, nextProps, without );// || !shallowCompareWithout( state, nextState, [] )
}
