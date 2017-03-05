[![](https://codeclou.github.io/hirngespinst/img/hirngespinst-logo.svg)](https://github.com/codeclou/hirngespinst/)


&nbsp;

> Create svg infographics with ease


[![](https://codeclou.github.io//hirngespinst/img/demo.gif)](demo-showWithDelay--withAutoHide.svg)


-----


&nbsp;


### Usage with Sketch

You can easily create such above graphic with [Sketch](https://www.sketchapp.com/) like so:

**(1)** Download the example [**`demo-showWithDelay.sketch`**](https://github.com/codeclou/hirngespinst/raw/master/demo/demo-showWithDelay.sketch)

&nbsp;

**(2)** Create groups with names from `frame-01` to `frame-99` which get shown after each other.
 
![](https://codeclou.github.io/hirngespinst/img/01-sketch.png)

&nbsp;

**(3)** Create a rect with name `hg-loading` placed in the bottom left. This rect will then be expanded to 100% width as an animation.
 
![](https://codeclou.github.io/hirngespinst/img/02-sketch.png)

&nbsp;

**(4)** Insert a slice and export as SVG.
 
![](https://codeclou.github.io/hirngespinst/img/03-sketch.png)

&nbsp;

**(5)** Open the SVG in an Editor like the [awesome Atom](https://atom.io/) and add the following.

![](https://codeclou.github.io/hirngespinst/img/04-atom.png)

&nbsp;

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<?xml-stylesheet href="https://unpkg.com/hirngespinst@0.0.8/dist/showWithDelay.min.css" type="text/css"?>
<svg width="751px" height="529px" viewBox="0 0 751 529" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g>
      ...
      <!-- svg stuff -->
      ...
    </g>
    <script type="text/javascript"
            xlink:href="https://unpkg.com/hirngespinst@0.0.8/dist/showWithDelay.min.js"
            href="https://unpkg.com/hirngespinst@0.0.8/dist/showWithDelay.min.js"
    />
    <script type="text/javascript">
        Hirngespinst.showWithDelay();
    </script>
</svg>
```

See a working [demo here](https://unpkg.com/hirngespinst@0.0.8/demo/demo-showWithDelay.svg)

-----


&nbsp;


### Browser Support

Works in all modern browsers and was tested in versions:

 * Apple Safari 10+
 * Microsoft Internet Explorer 11
 * Microsoft Edge
 * Google Chrome 56+
 * Mozilla Firefox 51+


-----


&nbsp;


### Usage for HSTS (HTTP Strict Transport Security)

See [README_HTST.md](./README_HTST.md)

-----

&nbsp;

### Development and Release

See [DEVELOPMENT.md](./DEVELOPMENT.md)

-----

&nbsp;

### License

[MIT](./LICENSE.md) © [Bernhard Grünewaldt](https://github.com/clouless)
  
