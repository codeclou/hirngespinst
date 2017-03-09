[![](https://codeclou.github.io/hirngespinst/img/hirngespinst-logo.svg)](https://github.com/codeclou/hirngespinst/)

> create self-contained »slideshow-like« SVG infographics with ease

&nbsp;

**:sparkles: [DEMO](https://codeclou.github.io/hirngespinst/demo/demo.svg)**

[![](https://codeclou.github.io//hirngespinst/img/demo.gif?v2)](https://codeclou.github.io/hirngespinst/demo/demo.svg)


-----


&nbsp;


### Usage with Sketch and Atom.io

![](https://codeclou.github.io//hirngespinst/img/sketch-and-atom.png)

You can easily create such above graphic with **[Sketch](https://www.sketchapp.com/)** and **[Atom](https://atom.io/)** like so:

&nbsp;

**(1)** Download the example [**`demo.sketch`**](https://codeclou.github.io/hirngespinst/demo/demo.sketch)

&nbsp;

**(2)** Create groups with names from `frame-01` to `frame-99` which get shown after each other.
 
![](https://codeclou.github.io/hirngespinst/img/01.png)

&nbsp;

**(3)** Create a rect with name `hg-loading` placed in the bottom left. This rect will then be expanded to 100% width as an animation.
 
![](https://codeclou.github.io/hirngespinst/img/02.png)

&nbsp;

**(4)** Insert a slice and export as SVG.
 
![](https://codeclou.github.io/hirngespinst/img/03.png)

&nbsp;

**(5)** Open the SVG in an Editor like the [awesome Atom](https://atom.io/) and add the following.

![](https://codeclou.github.io/hirngespinst/img/04.png)

&nbsp;

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<?xml-stylesheet href="https://unpkg.com/hirngespinst@0.1.1/dist/hirngespinst.min.css" type="text/css"?>
<svg width="751px" height="529px" viewBox="0 0 751 529" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g>
      ...
      <!-- svg stuff -->
      ...
    </g>
    <script type="text/javascript"
            xlink:href="https://unpkg.com/hirngespinst@0.1.1/dist/hirngespinst.min.js"
            href="https://unpkg.com/hirngespinst@0.1.1/dist/hirngespinst.min.js"
    />
    <script type="text/javascript">
        new hirngespinst();
    </script>
</svg>
```

&nbsp;


**(6)** Now use your SVG like so in your website

```html
<img src="http://myserver/my.svg" />
```

&nbsp;

**Demo**

See a working [demo here](https://codeclou.github.io/hirngespinst/demo/demo-showWithDelay.svg)

&nbsp;

**Options**

You can customize the options like so

```js
new hirngespinst({
    frameAnimationDurationInSeconds: 4,   // Duration how long a frame is shown
    framePauseBetweenFramesInSeconds: 2,  // Pause between frames in seconds 
    frameAutoHide: true                   // will hide the frame after it was shown for a certain time
});
```

-----


&nbsp;


### Browser Support

Works in all modern browsers and was tested in the following versions

![](https://codeclou.github.io/hirngespinst/img/supported-browsers.svg)

Note: Internally CSS animations with `@keyframe` are used since SMIL browser-support will fade out.  


-----

&nbsp;

### Development and Release

See [DEVELOPMENT.md](./DEVELOPMENT.md)

-----

&nbsp;

### License

[MIT](./LICENSE.md) © [Bernhard Grünewaldt](https://github.com/clouless)
  
