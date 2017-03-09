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
                amountFrames: 0,
                loadingBarUpdateCount: 0,
                loadingBarIntervalReference: null,
                overallAnimationDurationInSeconds: 0
            };
            var config = _extends({}, {
                frameAnimationDurationInSeconds: 8,
                framePauseBetweenFramesInSeconds: 1,
                frameAutoHide: false
            }, options);
            self.fixTspanLeadingWhitespace();
            self.preInitialize(config);
            self.initialize(config, self);
            setInterval(self.initialize, self.state.overallAnimationDurationInSeconds * 1000, config, self);
        }

        /**
         * Called multiple times by setInterval, therefore we pass 'self'
         * @param config
         * @param self
         */


        _createClass(Hirngespinst, [{
            key: 'initialize',
            value: function initialize(config, self) {
                self.initializeFrameAnimations(config);
                self.initializeLoadingBarAnimation(config);
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
            key: 'initializeFrameAnimations',
            value: function initializeFrameAnimations(config) {
                var self = this;
                for (var i = 1; i < self.state.amountFrames + 1; i++) {
                    var frame = document.getElementById(self.getFrameIdByNumber(i));
                    frame.removeAttribute('class');
                    frame.removeAttribute('style');
                    var delay = (config.framePauseBetweenFramesInSeconds + config.frameAnimationDurationInSeconds) * (i - 1);
                    // We need a timeout since the SVG DOM does not seem to get updated otherwise
                    setTimeout(function (frame, delay, frameAnimationDurationInSeconds) {
                        frame.style["animation-delay"] = delay + 's';
                        frame.style["animation-duration"] = frameAnimationDurationInSeconds + 's';
                        frame.style["opacity"] = 0;
                        var animationClass = 'showFrameAnimation';
                        if (config.frameAutoHide) {
                            animationClass = 'showFrameAndHideAnimation';
                        }
                        frame.setAttribute('class', animationClass);
                    }, 300, frame, delay, config.frameAnimationDurationInSeconds);
                }
            }
        }, {
            key: 'initializeLoadingBarAnimation',
            value: function initializeLoadingBarAnimation(config) {
                var self = this;
                var loadingBar = document.getElementById('hg-loading');
                if (loadingBar !== null) {
                    self.state.loadingBarUpdateCount = 0;
                    loadingBar.setAttribute('width', '0%');
                    if (self.state.loadingBarIntervalReference !== undefined && self.state.loadingBarIntervalReference !== null) {
                        clearInterval(self.state.loadingBarIntervalReference);
                        self.state.loadingBarIntervalReference = null;
                    }
                    var updateLoadingBar = function updateLoadingBar(config, self) {
                        if (self.state.loadingBarUpdateCount <= self.state.overallAnimationDurationInSeconds) {
                            self.state.loadingBarUpdateCount = self.state.loadingBarUpdateCount + 1;
                            var percentage = self.state.loadingBarUpdateCount / self.state.overallAnimationDurationInSeconds * 100;
                            loadingBar.setAttribute('width', percentage + '%');
                        }
                    };
                    // updateLoadingBar every second
                    self.state.loadingBarIntervalReference = setInterval(updateLoadingBar, 1000, config, self);
                }
            }
        }, {
            key: 'preInitialize',
            value: function preInitialize(hirngespinstConfig) {
                var self = this;
                var hirngespinstFrames = self.getElementsStartsWithId('frame-');
                if (hirngespinstFrames !== undefined && hirngespinstFrames !== null && hirngespinstFrames.length > 0) {
                    self.state.amountFrames = hirngespinstFrames.length;
                }
                self.state.overallAnimationDurationInSeconds = (hirngespinstConfig.frameAnimationDurationInSeconds + hirngespinstConfig.framePauseBetweenFramesInSeconds) * self.state.amountFrames;
            }
        }]);

        return Hirngespinst;
    }();

    exports.default = Hirngespinst;
    module.exports = exports['default'];
});
