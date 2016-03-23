Visualising an array of numeric data. This can be a native array or a TypedArray

    <LineChart value={new Uint16Array([ 20, 10, 20, 10, 20, 10, 20, 10, 20, 10, 20, 10, 20 ])} height={60}/>

Function plotter

    <LineChart value={_.range( 100 ).map( v => Math.sin( v / 100 * Math.PI*8.0 ))} height={60} />
