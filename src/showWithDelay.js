/*!
 * @license MIT
 * Copyright (c) 2017 Bernhard Grünewaldt https://github.com/codeclou/hirngespinst
 */


//
// CALCULATE OVERALL ANIMATION DURATION
// ====================================
//
// based on SVG-Elements with 'frame-n' id like 'frame-01, frame-02 ... frame-99'
//
var hirngespinst__getElementsStartsWithId = function(id) {
    var children = document.getElementsByTagName('*');
    var elements = [];
    var child;
    for (var i = 0, length = children.length; i < length; i++) {
        child = children[i];
        if (child.id.substr(0, id.length) == id) {
            elements.push(child);
        }
    }
    return elements;
};
var hirngespinst__getFrameIdByNumber = function(number) {
    if (number < 10) {
        return 'frame-0' + number;
    }
    return 'frame-' + number;
};



//
// SHOW AND HIDE FRAME LOGIC
//
var hirngespinst__initializeFrameAnimations = function(config) {
    for (var i = 1; i < hirngespinstGlobalState.amountFrames + 1; i++) {
        var framePauseBetweenFramesInSecondsLoop = config.framePauseBetweenFramesInSeconds;
        if (i === 1) {
            framePauseBetweenFramesInSecondsLoop = 0;
        }
        var frame = document.getElementById(hirngespinst__getFrameIdByNumber(i));
        frame.removeAttribute('class');
        frame.removeAttribute('style');
        var delay = ((framePauseBetweenFramesInSecondsLoop + config.frameAnimationDelayInSeconds) * i);
        // We need a timeout since the SVG DOM does not seem to get updated otherwise
        setTimeout(function(frame, delay, frameAnimationDurationInSeconds){
            frame.style["animation-delay"] =  delay + 's';
            frame.style["animation-duration"] = frameAnimationDurationInSeconds + 's';
            frame.style["opacity"] = 0;
            var animationClass = 'showFrameAnimation';
            if (config.frameAutoHide) {
                animationClass = 'showFrameAndHideAnimation';
            }
            frame.setAttribute('class', animationClass);
        }, 300, frame, delay, config.frameAnimationDurationInSeconds);
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
var hirngespinst__initializeLoadingBarAnimation = function(config) {
    var loadingBar = document.getElementById('hg-loading');
    if (loadingBar !== null) {
        hirngespinstGlobalState.loadingBarUpdateCount = 0;
        loadingBar.setAttribute('width', '0%');
        if (hirngespinstGlobalState.loadingBarIntervalReference !== undefined && hirngespinstGlobalState.loadingBarIntervalReference !== null) {
            clearInterval(hirngespinstGlobalState.loadingBarIntervalReference);
            hirngespinstGlobalState.loadingBarIntervalReference = null;
        }
        var updateLoadingBar = function (config) {
            if (hirngespinstGlobalState.loadingBarUpdateCount <= hirngespinstGlobalState.overallAnimationDurationInSeconds) {
                hirngespinstGlobalState.loadingBarUpdateCount = hirngespinstGlobalState.loadingBarUpdateCount + 1;
                var percentage = hirngespinstGlobalState.loadingBarUpdateCount / hirngespinstGlobalState.overallAnimationDurationInSeconds * 100;
                loadingBar.setAttribute('width', percentage + '%');
            }
        };
        // updateLoadingBar every second
        hirngespinstGlobalState.loadingBarIntervalReference = setInterval(updateLoadingBar, 1000, config);
    }
};

//
// CALCULATE OVERALL ANIMATION DURATION
// AND AMOUNT OF FRAMES
var hirngespinst__preInitialize = function(hirngespinstConfig) {
    var hirngespinstFrames = hirngespinst__getElementsStartsWithId('frame-');
    if (hirngespinstFrames !== undefined && hirngespinstFrames !== null && hirngespinstFrames.length > 0) {
        hirngespinstGlobalState.amountFrames = hirngespinstFrames.length;
    }
    hirngespinstGlobalState.overallAnimationDurationInSeconds = (
            hirngespinstConfig.frameAnimationDelayInSeconds +
            hirngespinstConfig.frameAnimationDurationInSeconds +
            hirngespinstConfig.framePauseBetweenFramesInSeconds
        ) * (hirngespinstGlobalState.amountFrames);
};

//
// DEFS AND GLOBAL VAES
//
var hirngespinstConfigDefault = {
    frameAnimationDelayInSeconds: 1,
    frameAnimationDurationInSeconds: 4,
    framePauseBetweenFramesInSeconds: 2,
    frameAutoHide: false
};
var hirngespinstGlobalState = {
    amountFrames: 0,
    loadingBarUpdateCount: 0,
    loadingBarIntervalReference: null,
    overallAnimationDurationInSeconds: 0
};

//
// INIT
//
var hirngespinst__initialize = function(config) {
    hirngespinst__initializeFrameAnimations(config);
    hirngespinst__initializeLoadingBarAnimation(config);
};
var Hirngespinst = {
    showWithDelay: function (userConfig) {
        var config = Object.assign({}, hirngespinstConfigDefault);
        if (userConfig !== undefined && userConfig !== null) {
            config = Object.assign({}, hirngespinstConfigDefault, userConfig);
        }
        hirngespinst__preInitialize(config);
        hirngespinst__initialize(config);
        setInterval(hirngespinst__initialize, hirngespinstGlobalState.overallAnimationDurationInSeconds * 1000, config);
    }
}

