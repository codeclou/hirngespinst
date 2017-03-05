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


//
// CALCULATE OVERALL ANIMATION DURATION
// ====================================
//
// based on SVG-Elements with 'frame-n' id like 'frame-01, frame-02 ... frame-99'
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
//
// CALCULATE AMOUNT OF FRAMES
//
const frames = getElementsStartsWithId('frame-');
var amountFrames = 0;
if (frames !== undefined && frames !== null && frames.length > 0) {
    amountFrames = frames.length;
}
//
// CALCULATE OVERALL ANIMATION DURATION
//
var overallAnimationDurationInSeconds =
    (
        frameAnimationDelayInSeconds +
        frameAnimationDurationInSeconds +
        framePauseBetweenFramesInSeconds
    ) * amountFrames;


//
// SHOW AND HIDE FRAME LOGIC
//
const initializeFrameAnimations = function() {
    console.log('   initializeFrameAnimations()');
    for (var i = 1; i < amountFrames + 1; i++) {
        var framePauseBetweenFramesInSecondsLoop = framePauseBetweenFramesInSeconds;
        if (i === 1) {
            framePauseBetweenFramesInSecondsLoop = 0;
        }
        const frame = document.getElementById(getFrameIdByNumber(i));
        frame.removeAttribute('class');
        frame.removeAttribute('style');
        const delay = ((framePauseBetweenFramesInSecondsLoop + frameAnimationDelayInSeconds) * i);
        // We need a timeout since the SVG DOM does not seem to get updated otherwise
        setTimeout(function(frame, delay, frameAnimationDurationInSeconds){
            frame.style["animation-delay"] =  delay + 's';
            frame.style["animation-duration"] = frameAnimationDurationInSeconds + 's';
            frame.style["opacity"] = 0;
            frame.setAttribute('class', 'showFrameAnimation');
        }, 300, frame, delay, frameAnimationDurationInSeconds);
    }
};


//
// LOADING BAR LOGIC
// =================
//
// NOTE: Since CSS does not apply to `width` elements of RECT SVG-elements we need
//       to write the animation ourselves in JS. (At least in Firefox the CSS approach
//       does not work at the time of writing this code).
//
var loadingBarUpdateCount = 0;
var loadingBarIntervalReference = null;
const initializeLoadingBarAnimation = function() {
    console.log('   initializeLoadingBarAnimation()');
    const loadingBar = document.getElementById('hg-loading');
    if (loadingBar !== null) {
        loadingBarUpdateCount = 0;
        loadingBar.setAttribute('width', '0%');
        if (loadingBarIntervalReference !== undefined && loadingBarIntervalReference !== null) {
            clearInterval(loadingBarIntervalReference);
            loadingBarIntervalReference = null;
        }
        const updateLoadingBar = function () {
            if (loadingBarUpdateCount <= overallAnimationDurationInSeconds) {
                loadingBarUpdateCount = loadingBarUpdateCount + 1;
                const percentage = loadingBarUpdateCount / overallAnimationDurationInSeconds * 100;
                loadingBar.setAttribute('width', percentage + '%');
            }
        };
        // updateLoadingBar every second
        loadingBarIntervalReference = setInterval(updateLoadingBar, 1000);
    }
};


//
// INIT
//
console.log('HIRNGESPINST started with overallAnimationDurationInSeconds', overallAnimationDurationInSeconds);
const init = function() {
    console.log('init()');
    initializeFrameAnimations();
    initializeLoadingBarAnimation();
};
init();
setInterval(init, overallAnimationDurationInSeconds * 1000);

