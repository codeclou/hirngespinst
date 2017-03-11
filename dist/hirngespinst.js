/*!
 * @license MIT
 * Copyright (c) 2017 Bernhard Grünewaldt
 * https://github.com/codeclou/hirngespinst
 */
(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
        factory(module, exports);
    } else {
        var mod = {
            exports: {}
        };
        factory(mod, mod.exports);
        global.hirngespinst = mod.exports;
    }
})(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];

            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }

        return target;
    };

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var Hirngespinst = function () {
        function Hirngespinst(options) {
            _classCallCheck(this, Hirngespinst);

            var self = this;
            self.state = {
                tick: null,
                amountFrames: 0,
                currentFrame: null,
                previousFrame: null,
                isPlaying: true,
                manualPrevOrNextClick: false,
                updateLock: false,
                overallAnimationDurationInSeconds: 0
            };
            self.config = _extends({}, {
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


        _createClass(Hirngespinst, [{
            key: 'update',
            value: function update(self, direction) {
                var tickModulo = 24;

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
                if (self.state.updateLock === false && (self.state.tick % tickModulo === 0 && self.state.isPlaying === true || self.state.manualPrevOrNextClick === true)) {
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
                        // HIDE
                        //
                        if (self.config.frameAutoHide === true) {
                            self.animateSingleFrame(self.state.previousFrame, 'hide');
                        }
                        //
                        // RESTART LOOP
                        //
                        if (self.state.currentFrame > self.state.amountFrames) {
                            self.state.currentFrame = 1;
                        }
                        if (self.state.currentFrame < 1) {
                            self.state.currentFrame = self.state.amountFrames;
                        }
                        //
                        // SHOW
                        //
                        self.animateSingleFrame(self.state.currentFrame, 'show');
                        self.updateFrameLabel();
                    }
                    //
                    // RELEASE LOCKS
                    //
                    self.state.previousFrame = self.state.currentFrame;
                    self.state.manualPrevOrNextClick = false;
                    self.state.updateLock = false;
                }
            }
        }, {
            key: 'fixTspanLeadingWhitespace',
            value: function fixTspanLeadingWhitespace() {
                var children = document.getElementsByTagName('tspan');
                var child = void 0;
                var widthOfOneWhiteSpaceInPixels = 5;
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
        }, {
            key: 'getElementsStartsWithId',
            value: function getElementsStartsWithId(id) {
                var children = document.getElementsByTagName('*');
                var elements = [];
                var child = void 0;
                for (var i = 0, length = children.length; i < length; i++) {
                    child = children[i];
                    if (child.id.substr(0, id.length) == id) {
                        elements.push(child);
                    }
                }
                return elements;
            }
        }, {
            key: 'getFrameIdByNumber',
            value: function getFrameIdByNumber(number) {
                if (number < 10) {
                    return 'frame-0' + number;
                }
                return 'frame-' + number;
            }
        }, {
            key: 'animateSingleFrame',
            value: function animateSingleFrame(frameNumber, showOrHide) {
                var self = this;
                var frame = document.getElementById(self.getFrameIdByNumber(frameNumber));
                if (frame !== null) {
                    frame.removeAttribute('class');
                    // We need a timeout since the SVG DOM does not seem to get updated otherwise
                    console.log(frameNumber, showOrHide);
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
            }
        }, {
            key: 'updateFrameLabel',
            value: function updateFrameLabel() {
                var self = this;
                var hgFrame = document.getElementById('hg-frame');
                if (hgFrame !== null) {
                    var frameLabel = hgFrame.querySelector('tspan');
                    frameLabel.textContent = self.state.currentFrame;
                }
            }
        }, {
            key: 'initializePrevNextButtons',
            value: function initializePrevNextButtons() {
                var self = this;
                var next = document.getElementById('hg-next');
                if (next !== null) {
                    next.onclick = function () {
                        self.state.manualPrevOrNextClick = true;
                        self.update(self, +1);
                    };
                }
                var prev = document.getElementById('hg-prev');
                if (prev !== null) {
                    prev.onclick = function () {
                        self.state.manualPrevOrNextClick = true;
                        self.update(self, -1);
                    };
                }
            }
        }, {
            key: 'initializePlayPauseButtons',
            value: function initializePlayPauseButtons() {
                var self = this;
                var play = document.getElementById('hg-play');
                if (play !== null) {
                    play.onclick = function () {
                        self.state.isPlaying = true;
                    };
                }
                var pause = document.getElementById('hg-pause');
                if (pause !== null) {
                    pause.onclick = function () {
                        self.state.isPlaying = false;
                    };
                }
            }
        }, {
            key: 'preInitialize',
            value: function preInitialize() {
                var self = this;
                var hirngespinstFrames = self.getElementsStartsWithId('frame-');
                if (hirngespinstFrames !== undefined && hirngespinstFrames !== null && hirngespinstFrames.length > 0) {
                    self.state.amountFrames = hirngespinstFrames.length;
                }
                self.state.overallAnimationDurationInSeconds = (self.config.frameAnimationDurationInSeconds + self.config.framePauseBetweenFramesInSeconds) * self.state.amountFrames;
            }
        }]);

        return Hirngespinst;
    }();

    exports.default = Hirngespinst;
    module.exports = exports['default'];
});
