[![](https://codeclou.github.io/hirngespinst/img/hirngespinst-logo.svg)](https://github.com/codeclou/hirngespinst/)


&nbsp;

> Create svg infographics with ease


![](https://unpkg.com/hirngespinst@0.0.3/demo/demo-showWithDelay-embed.svg)

-----


&nbsp;


### Usage

**showWithDelay** - [DEMO](https://unpkg.com/hirngespinst@0.0.2/demo/demo-showWithDelay.svg)

> Shows the elements with id `frame-*` after 2 seconds  

```xml
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<?xml-stylesheet href="https://fonts.googleapis.com/css?family=Roboto+Mono:400,700|Source+Sans+Pro:400,600" type="text/css"?>
<?xml-stylesheet href="https://unpkg.com/hirngespinst@0.0.1/lib/showWithDelay.css" type="text/css"?>
<svg width="751px" height="529px" viewBox="0 0 751 529" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="frame-02" transform="translate(365.000000, 310.000000)" style="animation-delay: 4s; opacity: 0;" class="showFrameAnimation">
            <path d="M9.5,0.5 L9.5,109.5" id="Line" stroke="#BC00B9" stroke-width="3" stroke-linecap="square"/>
        </g>
        <g id="frame-01" transform="translate(364.000000, 113.000000)" style="animation-delay: 2s; opacity: 0;" class="showFrameAnimation">
            <path d="M9.5,0.5 L9.5,109.5" id="Line" stroke="#BC00B9" stroke-width="3" stroke-linecap="square"/>
            </g>
        <g id="static" transform="translate(41.000000, 39.000000)">
            <rect id="Rectangle" fill="#555555" x="0" y="197" width="163" height="61"/>
        </g>
    </g>
    <script src="https://unpkg.com/hirngespinst@0.0.1/lib/showWithDelay.js"></script>
</svg>
```

 * Include the two `xml-stylesheets` in the head
 * Include the `<script>` before the closing `</svg>`
 * Use `Roboto Mono` and `Source Sans Pro` for your `<text>` elements


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
 
This is how you would **embed the JS+CSS** ([demo-showWithDelay-embed.svg](./demo/demo-showWithDelay-embed.svg))

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

### License

[MIT](./LICENSE) © [Bernhard Grünewaldt](https://github.com/clouless)
  
