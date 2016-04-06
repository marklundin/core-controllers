Below is a simple counter example. You click the button to increment the counter


    let count = state.count || 0,
        increment = _ => setState({ count:count + 1 });

    <Button label={"Button " + count} onClick={ increment }/>
