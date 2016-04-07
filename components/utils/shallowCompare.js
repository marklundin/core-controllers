
/**
 * Performs a shallow comparison between 2 values ommiting any keys found in `without`.
 * If both are the same value, or contain the same properties, then they are equivalent.
 */

let shallowCompareWithout = ( a, b, without ) => {

    if( a === b ) return  true

    if( Object.keys( a ).length !==  Object.keys( b ).length ) return false

    for( var i in a ){
        if( without.indexOf( i ) !== -1 ){
            if( a[i] !== b[i] ) return false
        }
    }

    return true
}

/**
 * A `shouldComponentUpdate` component check that performs a shallow comparison between
 * the current and incoming state/props whilst ignoring the `onChange` handle
 */

export default ( props, state, nextProps, nextState ) => {


    /**
     *  If the props or state contains a different number of keys, then we should update
     */

    let without = ['onChange']

    return !shallowCompareWithout( props, nextProps, without ) || !shallowCompareWithout( state, nextState, without )
}
