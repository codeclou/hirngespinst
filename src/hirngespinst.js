/*!
 * @license MIT
 * Copyright (c) 2017 Bernhard Grünewaldt
 * https://github.com/codeclou/hirngespinst
 */
class Hirngespinst {

    constructor(options) {
        const self = this;
        self.state = {
            amountFrames: 0,
            loadingBarUpdateCount: 0,
            loadingBarIntervalReference: null,
            overallAnimationDurationInSeconds: 0
        };
        const config = Object.assign({}, {
            frameAnimationDurationInSeconds: 8,
            framePauseBetweenFramesInSeconds: 1,
            frameAutoHide: false
        }, options);
        self.fixTspanLeadingWhitespace();
        self.preInitialize(config);
        self.initialize(config);
        setInterval(self.initialize, self.state.overallAnimationDurationInSeconds * 1000, config);
    }

    initialize(config) {
        const self = this;
        self.initializeFrameAnimations(config);
        self.initializeLoadingBarAnimation(config);
    }

    fixTspanLeadingWhitespace() {
        const children = document.getElementsByTagName('tspan');
        let child;
        const widthOfOneWhiteSpaceInPixels = 5;
        for (var i = 0, length = children.length; i < length; i++) {
            child = children[i];
            // since "white-space: pre" on "tspan" does not work in every browser as expected
            // Replace each leading whitespace with 5 px
            var text = child.textContent;
            if (text !== undefined && text !== null && /^\s/.test(text)) {
                var leadingWhitespace = text.replace(/^(\s*).*$/, '$1');
                var xOffset = parseInt(child.getAttribute('x'), 10) + leadingWhitespace.length * widthOfOneWhiteSpaceInPixels;
                child.setAttribute('x', xOffset);
                child.textContent = text.substring(leadingWhitespace.length, text.length);
            }

        }
    }

    getElementsStartsWithId(id) {
        const children = document.getElementsByTagName('*');
        const elements = [];
        let child;
        for (let i = 0, length = children.length; i < length; i++) {
            child = children[i];
            if (child.id.substr(0, id.length) == id) {
                elements.push(child);
            }
        }
        return elements;
    };

    getFrameIdByNumber(number) {
        if (number < 10) {
            return 'frame-0' + number;
        }
        return 'frame-' + number;
    }

    initializeFrameAnimations(config) {
        const self = this;
        for (var i = 1; i < self.state.amountFrames + 1; i++) {
            const frame = document.getElementById(self.getFrameIdByNumber(i));
            frame.removeAttribute('class');
            frame.removeAttribute('style');
            const delay = ((config.framePauseBetweenFramesInSeconds + config.frameAnimationDurationInSeconds) * (i - 1));
            // We need a timeout since the SVG DOM does not seem to get updated otherwise
            setTimeout(function (frame, delay, frameAnimationDurationInSeconds) {
                frame.style["animation-delay"] = delay + 's';
                frame.style["animation-duration"] = frameAnimationDurationInSeconds + 's';
                frame.style["opacity"] = 0;
                let animationClass = 'showFrameAnimation';
                if (config.frameAutoHide) {
                    animationClass = 'showFrameAndHideAnimation';
                }
                frame.setAttribute('class', animationClass);
            }, 300, frame, delay, config.frameAnimationDurationInSeconds);
        }
    };


    /**
     * LOADING BAR LOGIC
     *
     * NOTE: Since CSS does not apply to `width` elements of RECT SVG-elements we need
     *       to write the animation ourselves in JS. (At least in Firefox the CSS approach
     *       does not work at the time of writing this code).
     *
     * @param config
     */
    initializeLoadingBarAnimation(config) {
        const self = this;
        const loadingBar = document.getElementById('hg-loading');
        if (loadingBar !== null) {
            self.state.loadingBarUpdateCount = 0;
            loadingBar.setAttribute('width', '0%');
            if (self.state.loadingBarIntervalReference !== undefined && self.state.loadingBarIntervalReference !== null) {
                clearInterval(self.state.loadingBarIntervalReference);
                self.state.loadingBarIntervalReference = null;
            }
            const updateLoadingBar = function(config) {
                if (self.state.loadingBarUpdateCount <= self.state.overallAnimationDurationInSeconds) {
                    self.state.loadingBarUpdateCount = self.state.loadingBarUpdateCount + 1;
                    const percentage = self.state.loadingBarUpdateCount / self.state.overallAnimationDurationInSeconds * 100;
                    loadingBar.setAttribute('width', percentage + '%');
                }
            };
            // updateLoadingBar every second
            self.state.loadingBarIntervalReference = setInterval(updateLoadingBar, 1000, config);
        }
    };

    /**
     * CALCULATE OVERALL ANIMATION DURATION AND AMOUNT OF FRAMES
     *
     * @param hirngespinstConfig
     */
    preInitialize(hirngespinstConfig) {
        const self = this;
        const hirngespinstFrames = self.getElementsStartsWithId('frame-');
        if (hirngespinstFrames !== undefined && hirngespinstFrames !== null && hirngespinstFrames.length > 0) {
            self.state.amountFrames = hirngespinstFrames.length;
        }
        self.state.overallAnimationDurationInSeconds = (
                hirngespinstConfig.frameAnimationDurationInSeconds +
                hirngespinstConfig.framePauseBetweenFramesInSeconds
            ) * (self.state.amountFrames);
    }

}

export default Hirngespinst;
