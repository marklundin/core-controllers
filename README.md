# A set of components for creative coding

[View on Github](https://github.com/marklundin/core-controllers), [Documentation](http://mark-lundin.com/core-controllers/documentation)

This library contains of a selection of javascript controllers specifically
designed for creative coding. It aims to create a common set of practical
interfaces useful for prototyping 2D, 3D graphical or audio applications. Along
with some the regular core components such as buttons, sliders and checkboxes are
more complex ones such as the [ColorPicker](#ColorPicker), Graph and XYPad. All
of these are designed to help you visualize and control aspects of your
programs in a more intelligible way.

The components are built in [react](https://github.com/facebook/react), built
specifically for the [DUI](TBC) project, a library for quickly instrumenting
A/V applications.

## Getting started

`npm install core-controllers`

### Using React

As all the components are just regular react components, once installed render
them as you usually would.

```javascript
import Slider from 'core-controllers/components/slider'
import React from 'react-dom'

React.render( <Slider label={'aNumber'} value={7} />, myElement )
```

### Using DUI

Alternatively, you can use [DUI](TBC), a rapid prototyping library which allows
you to declaratively define user interfaces using plain old javascript objects.

```javascript
import { draw } from dui

draw({
    aNumber: 7
})
```

Both of these draw the same slider


```
<Slider label={'aNumber'} value={7} />
```
