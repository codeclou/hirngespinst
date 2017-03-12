/*!
 * @license MIT
 * Copyright (c) 2017 Bernhard Grünewaldt
 * https://github.com/codeclou/hirngespinst
 */
class Hirngespinst {

    constructor(options) {
        const self = this;
        self.initialState = {
            tick: null,
            amountFrames: 0,
            currentFrame: null,
            previousFrame: null,
            isPlaying: true,
            manualPrevOrNextClick: false,
            updateLock: false,
            overallAnimationDurationInSeconds: 0
        };
        self.state = Object.assign({}, self.initialState);
        self.config = Object.assign({}, {
            frameAnimationDurationInSeconds: 8,
            framePauseBetweenFramesInSeconds: 1,
            frameAutoHide: false
        }, options);
        self.fixTspanLeadingWhitespace();
        self.preInitialize();
        self.initializePlayPauseButtons();
        self.initializePrevNextButtons();
        setInterval(self.update, 100, self, 1);
    }

    /**
     * Called every 0.5 seconds.
     *
     * @param self
     * @param direction {int} 1 for forward direction; -1 for backward direction
     */
    update(self, direction) {
        const tickModulo = 24;

        //
        // TICK
        //
        if (self.state.tick !== null && self.state.manualPrevOrNextClick === false) {
            self.state.tick = self.state.tick + 1;
        }
        if (self.state.tick === null) {
            // Start to play immediately
            self.state.tick = tickModulo;
        }

        //
        // FRAME LOGIC
        //
        if (self.state.updateLock === false && (
                self.state.tick % tickModulo === 0 && self.state.isPlaying === true ||
                self.state.manualPrevOrNextClick === true
                )) {
            //
            // INIT LOCKS
            //
            self.state.updateLock = true;
            self.state.currentFrame = self.state.currentFrame + direction;

            //
            // ONLY WHEN PLAYING OR MANUAL ACTION
            //
            if (self.state.isPlaying || self.state.manualPrevOrNextClick === true) {
                //
                // RESTART LOOP
                //
                if (self.state.currentFrame > self.state.amountFrames) {
                    self.resetAllFrames();
                    self.state.previousFrame = null;
                    self.state.currentFrame = 1;
                }
                if (self.state.currentFrame < 1) {
                    self.state.currentFrame = self.state.amountFrames;
                }
                //
                // HIDE
                //
                if (self.config.frameAutoHide === true) {
                    self.animateSingleFrame(self.state.previousFrame, 'hide');
                }
                //
                // SHOW
                //
                self.animateSingleFrame(self.state.currentFrame, 'show');
                self.updateFrameLabel();
                self.animateProgressBar();
            }
            //
            // RELEASE LOCKS
            //
            self.state.previousFrame = self.state.currentFrame;
            self.state.manualPrevOrNextClick = false;
            self.state.updateLock = false;
        }
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

    animateSingleFrame(frameNumber, showOrHide) {
        const self = this;
        const frame = document.getElementById(self.getFrameIdByNumber(frameNumber));
        if (frame !== null) {
            frame.removeAttribute('class');
            // We need a timeout since the SVG DOM does not seem to get updated otherwise
            setTimeout(function (frame, showOrHide) {
                if (showOrHide === 'show') {
                    frame.setAttribute('class', 'showFrameAnimation');
                    frame.style.opacity = 1;
                } else {
                    frame.setAttribute('class', 'hideFrameAnimation');
                    frame.style.opacity = 0;
                }
            }, 200, frame, showOrHide);
        }
    };

    updateFrameLabel() {
        const self = this;
        const hgFrame = document.getElementById('hg-frame');
        if (hgFrame !== null) {
            const frameLabel = hgFrame.querySelector('tspan');
            frameLabel.textContent = self.state.currentFrame;
        }
    }

    initializePrevNextButtons() {
        const self = this;
        const next = document.getElementById('hg-next');
        if (next !== null) {
            next.onclick = function() {
                self.state.manualPrevOrNextClick = true;
                self.update(self, +1);
            };
        }
        const prev = document.getElementById('hg-prev');
        if (prev !== null) {
            prev.onclick = function () {
                self.state.manualPrevOrNextClick = true;
                self.update(self, -1);
            };
        }
    }

    resetAllFrames() {
        const self = this;
        const hirngespinstFrames = self.getElementsStartsWithId('frame-');
        if (hirngespinstFrames !== undefined && hirngespinstFrames !== null && hirngespinstFrames.length > 0) {
            for (let i=0;i<hirngespinstFrames.length;i++) {
                hirngespinstFrames[i].removeAttribute('class');
                hirngespinstFrames[i].removeAttribute('style');
            }
        }
    }

    resetAnimationCompletely() {
        const self = this;
        self.resetAllFrames();
        self.state = Object.assign({}, self.initialState);
        self.preInitialize();
        self.update(self, 1);
    }

    initializePlayPauseButtons() {
        const self = this;
        const play = document.getElementById('hg-play');
        if (play!== null) {
            play.onclick = function () {
                self.state.isPlaying = true;
            };
        }
        const pause = document.getElementById('hg-pause');
        if (pause !== null) {
            pause.onclick = function () {
                self.state.isPlaying = false;
            };
        }
        const restart = document.getElementById('hg-restart');
        if (restart !== null) {
            restart.onclick = function () {
                self.resetAnimationCompletely();
            };
        }
    }

    /**
     * PROGRESS BAR LOGIC
     *
     * NOTE: Since CSS does not apply to `width` elements of RECT SVG-elements we need
     *       to write the animation ourselves in JS. (At least in Firefox the CSS approach
     *       does not work at the time of writing this code).
     *
     */
    animateProgressBar() {
        const self = this;
        const loadingBar = document.getElementById('hg-progress');
        if (loadingBar !== null) {
            const percentage = self.state.currentFrame / self.state.amountFrames * 100;
            loadingBar.setAttribute('width', percentage + '%');
        }
    };

    /**
     * CALCULATE OVERALL ANIMATION DURATION AND AMOUNT OF FRAMES
     *
     */
    preInitialize() {
        const self = this;
        const hirngespinstFrames = self.getElementsStartsWithId('frame-');
        if (hirngespinstFrames !== undefined && hirngespinstFrames !== null && hirngespinstFrames.length > 0) {
            self.state.amountFrames = hirngespinstFrames.length;
        }
        self.state.overallAnimationDurationInSeconds = (
                self.config.frameAnimationDurationInSeconds +
                self.config.framePauseBetweenFramesInSeconds
            ) * (self.state.amountFrames);
    }

}

export default Hirngespinst;
