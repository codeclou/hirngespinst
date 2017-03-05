/*!
 * @license MIT
 * Copyright (c) 2017 Bernhard Grünewaldt https://github.com/codeclou/hirngespinst
 */

//
// DEFS
//
const frameAnimationDelayInSeconds = 1;
const frameAnimationDurationInSeconds = 2;
const framePauseBetweenFramesInSeconds = 2;
var overallAnimationTimeInSeconds = 4;

//
// SHOW FRAMES LOGIC
// =================
//
// SHOW ALL SVG-Elements with 'frame-n' ID like 'frame-01, frame-02 ... frame-99'
// WITH A DELAY OF n SECONDS
//
const getElementsStartsWithId = function(id) {
    var children = document.getElementsByTagName('*');
    var elements = [], child;
    for (var i = 0, length = children.length; i < length; i++) {
        child = children[i];
        if (child.id.substr(0, id.length) == id)
            elements.push(child);
    }
    return elements;
};
const getFrameIdByNumber = function(number) {
    if (number < 10) {
        return 'frame-0' + number;
    }
    return 'frame-' + number;
};
const frames = getElementsStartsWithId('frame-');
var amountFrames = 0;
if (frames !== undefined && frames !== null && frames.length > 0) {
    amountFrames = frames.length;
}
for (var i=1;i<amountFrames+1;i++) {
    var framePauseBetweenFramesInSecondsLoop = framePauseBetweenFramesInSeconds;
    if (i === 1) {
        framePauseBetweenFramesInSecondsLoop = 0;
    }
    const frame = document.getElementById(getFrameIdByNumber(i));
    frame.style["animation-delay"] = ((framePauseBetweenFramesInSecondsLoop + frameAnimationDelayInSeconds) * i) + 's';
    frame.style["animation-duration"] = frameAnimationDurationInSeconds + 's';
    frame.style["opacity"] = 0;
    frame.setAttribute('class', 'showFrameAnimation');
    overallAnimationTimeInSeconds = overallAnimationTimeInSeconds + ((framePauseBetweenFramesInSecondsLoop + frameAnimationDelayInSeconds) * i) + frameAnimationDurationInSeconds;
}

//
// LOADING BAR LOGIC
// =================
//
// NOTE: Since CSS does not apply to `width` elements of RECT SVG-elements we need
//       to write the animation ourselves in JS. (At least in Firefox the CSS approach
//       does not work at the time of writing this code).
//
var loadingBarUpdateCount = 0;
const loadingBar = document.getElementById('hg-loading');
if (loadingBar !== null) {
    const updateLoadingBar = function () {
        loadingBarUpdateCount = loadingBarUpdateCount + 1;
        loadingBar.setAttribute('width', loadingBarUpdateCount * 10);
    };
    // updateLoadingBar every second
    setInterval(updateLoadingBar, 1000);
}


//
// INIT
//
console.log('init hirngespinst with overallAnimationTimeInSeconds', overallAnimationTimeInSeconds);

