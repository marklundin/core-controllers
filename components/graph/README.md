Here we're plotting a simple static array of numerical data. In this instance,
it's a list of frame deltas, marking the time it took to render the last
`requestAnimationFrame`. Rendering this continuously gives you an FPS meter,
however any array of numerical data can be rendered in this way

```
let frameDeltas = [ ];
<Graph label='FPS demo' min={0} max={80}value={frameDeltas}/>
```

Here we're plotting a simple oscillating wave function. The wave function outputs an
array of numbers. This time we're not suppling any domain, so the natural boundaries
of the data are used instead.

```
let data = new Float32Array( 100 );
let phase = state.phase || 1;
//let waveFn = ( v, i ) => Math.sin(( i + phase ) / 50 * Math.PI * 4.0 );
let waveFn = ( v, i ) => Math.sin( i/100 )* 7 + Math.cos( Math.sqrt( 3 ) * (i/100)*7 );
setTimeout( _ => setState({ phase:phase + 0.05 }));
<Graph label='Oscillating Wave function' fill={true} value={ _.map( data, waveFn )}/>
```

Any function can be plotted in this as long as it outputs an array of numbers.
