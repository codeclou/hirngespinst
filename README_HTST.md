
# Usage for HSTS (HTTP Strict Transport Security)

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
