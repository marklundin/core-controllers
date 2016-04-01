Here we plot a chart from a simple array of data. If no bounds are supplied, then
the minimum and maximum bounds of the data are used.

    <LineChart value={[ 20, 10, 20, 10, 20, 10, 20, 10, 20, 10, 20, 10, 20 ]}/>

Function plotter

    let wave = phase => new Float32Array( 100 ).map(( v, i ) => Math.sin( i/100 * Math.PI * 8 * phase + phase ));
    //setTimeout( _ => setState({phase:state.phase+0.01}));
    <LineChart value={wave( state.phase || 1 )}/>
