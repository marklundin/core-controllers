Here we're plotting a graph from a static array of data. No minimum or maximum
boundaries are supplied, so the range of the data is used instead

    <Graph value={[ 20, 10, 20, 10, 20, 10, 20, 10, 20, 10, 20, 10, 20 ]}/>

Below we're plotting a simple sine wave by continuously drawing a function. Again,
no boundaries are declared, so we use the range of data. You can plot any function
that outputs an array of data.

    let data = new Float32Array( 100 );
    let phase = state.phase || 1;
    let waveFn = ( v, i ) => Math.sin( i/100 * Math.PI * 8 * phase + phase );
    setTimeout( _ => setState({ phase:phase + 0.01 }));
    <Graph value={ _.map( data, waveFn )}/>
