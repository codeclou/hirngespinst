[![](https://codeclou.github.io/hirngespinst/img/hirngespinst-logo.svg)](https://github.com/codeclou/hirngespinst/)


&nbsp;

> Create svg infographics with ease


[![](https://codeclou.github.io//hirngespinst/img/demo.gif)](demo-showWithDelay--withAutoHide.svg)


-----


&nbsp;


### Usage with Sketch

You can easily create such above graphic with [Sketch](https://www.sketchapp.com/) like so:

**(1)** Download the example [`demo-showWithDelay.sketch`](./demo/demo-showWithDelay.sketch)

**(2)** Create groups with names from `frame-01` to `frame-99` which get shown after each other.
 
![](https://codeclou.github.io/hirngespinst/img/01-sketch.png)

**(3)** Create a rect with name `gh-loading` placed in the bottom left. This rect will then be expanded to 100% width as an animation.
 
![](https://codeclou.github.io/hirngespinst/img/02-sketch.png)

**(4)** Insert a slice and export as SVG.
 
![](https://codeclou.github.io/hirngespinst/img/04-sketch.png)

**(5)** Open the SVG in an Editor like the [awesome Atom](https://atom.io/) and add the following.

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<?xml-stylesheet href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Source+Sans+Pro:400,600" type="text/css"?>
<!-- ADD STYLESHEET -->
<?xml-stylesheet href="https://unpkg.com/hirngespinst@0.0.8/dist/showWithDelay.min.css" type="text/css"?>
<svg width="751px" height="529px" viewBox="0 0 751 529" version="1.1" 
    xmlns="http://www.w3.org/2000/svg" 
    xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      ...
    </g>
    <!-- ADD JAVASCRIPT AT THE BOTTOM -->
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

If the server serving the SVG file has a very strict 
[HSTS](https://de.wikipedia.org/wiki/HTTP_Strict_Transport_Security) like
the `camo.githubusercontent.com` has for proxying images from README.md files on GitHub
that forbids the loading of the Hirngespinst JS and CSS then you need to either:
 
 * (1) Allow the unpgk.com Domain in your server's HTST settings
 * (2) Put the JS+CSS on the same server
 * (3) Embed the JS+CSS directly in the SVG

**:bangbang: Currently there is no way to get it to work with GitHub inside a Readme.md :bangbang:**

This is how you would **embed the JS+CSS** ([demo-showWithDelay-embed.svg](./demo/demo-showWithDelay--withAutoHide--embedded.svg))

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="751px" height="529px" viewBox="0 0 751 529" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <style>
      /* <![CDATA[ */
        // PUT CONTENTS OF CSS FILE HERE
      /* ]]> */
    </style>
    <!-- Generator: Sketch 42 (36781) - http://www.bohemiancoding.com/sketch -->
    <title>animation</title>
    <desc>Created with Sketch.</desc>
    <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="frame-01" transform="translate(364.000000, 113.000000)" style="animation-delay: 2s; opacity: 0;" class="showFrameAnimation">
            <path d="M9.5,0.5 L9.5,109.5" id="Line" stroke="#BC00B9" stroke-width="3" stroke-linecap="square"/>
        </g>
        <g id="static" transform="translate(41.000000, 39.000000)">
            <rect id="Rectangle" fill="#555555" x="0" y="197" width="163" height="61"/>
        </g>
    </g>
    <script type="text/javascript">
      // <![CDATA[
        // PUT CONTENTS OF JS FILE HERE
      // ]]>
    </script>
</svg>
```

-----

&nbsp;

### Development and Release

See [DEVELOPMENT.md](./DEVELOPMENT.md)

-----

&nbsp;

### License

[MIT](./LICENSE.md) © [Bernhard Grünewaldt](https://github.com/clouless)
  
