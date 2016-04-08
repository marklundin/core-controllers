# Components for creative coding

This library contains of a small set of javascript controllers specifically
designed for creative coding. It's goal is to create a common set of practical
interfaces useful for prototyping 2D, 3D or audio applications. Along with some
fundamental elements such as [buttons](#Button), [sliders](#Slider)
and [checkboxes](#Checkbox) are more complex ones such as the [ColorPicker](#ColorPicker),
[Graph](#Graph) and [XYPad](#XYPad). All of these are designed to help you visualize
and control aspects of your programs in a more intelligible way.

All components are built in [react](REACT), built specifically for the [DUI](TBC)
project, a library for quickly instrumenting A/V applications.

## Getting started

`npm install core-controllers`

### Using React

As all the components are just regular react components, once installed render
them as you usually would.

```javascript
import Slider from 'core-controllers/components/slider'
import React from 'react-dom'

React.render( <Slider label={'aNumber'} value={10} />, myElement )
```

### Using DUI

Alternatively, you can use [DUI](TBC), a rapid prototyping library which allows
you to declaratively define user interfaces using plain old javascript objects.

Here's how you'd render a [Slider](#Slider)

```javascript
import { draw } from dui

draw({
    aNumber: 10
})
```

Both of these draw a slider:

```
<Slider label={'aNumber'} value={10} />
```
