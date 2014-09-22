(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var mainExample = require('./main-example').default;
var hljs = require('highlight.js');
mainExample('canvas');
hljs.initHighlightingOnLoad();


},{"./main-example":153,"highlight.js":49}],2:[function(require,module,exports){
"use strict";
require('traceur/bin/traceur-runtime');
var toExport = {
  Engine: require('./lib/engine').default,
  CircleEntity: require('./lib/circle-entity').default,
  ImageEntity: require('./lib/image-entity').default,
  RectEntity: require('./lib/rect-entity').default
};
toExport.default = toExport;
module.exports = toExport;


},{"./lib/circle-entity":4,"./lib/engine":5,"./lib/image-entity":6,"./lib/rect-entity":9,"traceur/bin/traceur-runtime":45}],3:[function(require,module,exports){
"use strict";
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
function degreesToRadians(degrees) {
  return degrees / 180 * Math.PI;
}
var BaseEntity = function BaseEntity(x, y) {
  this.x = x || 0;
  this.y = y || 0;
  this.anis = [];
  this.color = [0, 0, 0];
};
($traceurRuntime.createClass)(BaseEntity, {
  addPlunderAnimation: function(ani) {
    this.anis.push(ani);
  },
  clearPlunderAnimations: function() {
    this.anis = [];
  },
  update: function(delta) {
    for (var $__1 = this.anis[Symbol.iterator](),
        $__2; !($__2 = $__1.next()).done; ) {
      var ani = $__2.value;
      {
        ani.update(delta);
      }
    }
    this.onUpdate && this.onUpdate(delta);
  },
  _innerDraw: function(context) {},
  draw: function(context) {
    context.save();
    context.fillStyle = "rgba(" + (this.color[0] | 0) + ", " + (this.color[1] | 0) + ", " + (this.color[2] | 0) + ", " + (this.color[3] || 1) + ")";
    context.translate(this.x, this.y);
    if (this.scale) {
      context.scale(this.scale, this.scale);
    }
    if (this.angle) {
      context.rotate(degreesToRadians(this.angle));
    }
    this._innerDraw(context);
    context.restore();
  }
}, {});
var $__default = BaseEntity;


},{}],4:[function(require,module,exports){
"use strict";
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__base_45_entity__;
var BaseEntity = ($__base_45_entity__ = require("./base-entity"), $__base_45_entity__ && $__base_45_entity__.__esModule && $__base_45_entity__ || {default: $__base_45_entity__}).default;
var CircleEntity = function CircleEntity(x, y, r) {
  $traceurRuntime.superCall(this, $CircleEntity.prototype, "constructor", [x, y]);
  this.r = r || 0;
};
var $CircleEntity = CircleEntity;
($traceurRuntime.createClass)(CircleEntity, {_innerDraw: function(context) {
    context.beginPath();
    context.arc(0, 0, this.r, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
  }}, {}, BaseEntity);
var $__default = CircleEntity;


},{"./base-entity":3}],5:[function(require,module,exports){
"use strict";
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__image_45_loader__,
    $__raf__;
var ImageLoader = ($__image_45_loader__ = require("./image-loader"), $__image_45_loader__ && $__image_45_loader__.__esModule && $__image_45_loader__ || {default: $__image_45_loader__}).default;
var raf = ($__raf__ = require("./raf"), $__raf__ && $__raf__.__esModule && $__raf__ || {default: $__raf__}).default;
var Engine = function Engine(canvasId) {
  this.canvas = document.getElementById(canvasId);
  this.context = this.canvas.getContext('2d');
  this.lastTimestamp = null;
  this.entities = [];
  this.imageLoader = new ImageLoader();
  this.updateBound = this.update.bind(this);
  this.pause();
};
($traceurRuntime.createClass)(Engine, {
  add: function(entity) {
    if (entity.imgSrc) {
      this.imageLoader.add(entity.imgSrc, entity);
    }
    this.entities.push(entity);
  },
  start: function() {
    var $__2 = this;
    this.imageLoader.load().then((function() {
      $__2.unpause();
      $__2.update(0);
    }));
  },
  update: function(ts) {
    if (!this.lastTimestamp) {
      this.lastTimestamp = ts;
    }
    var delta = ts - this.lastTimestamp;
    this.lastTimestamp = ts;
    if (!this.paused) {
      for (var $__4 = this.entities[Symbol.iterator](),
          $__5; !($__5 = $__4.next()).done; ) {
        var entity = $__5.value;
        {
          entity.update(delta);
        }
      }
      if (this.clearColor) {
        this.context.fillStyle = this.clearColor;
      }
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      for (var $__6 = this.entities[Symbol.iterator](),
          $__7; !($__7 = $__6.next()).done; ) {
        var entity = $__7.value;
        {
          entity.draw(this.context);
        }
      }
    }
    raf(this.updateBound);
  },
  pause: function() {
    this.paused = true;
  },
  unpause: function() {
    this.paused = false;
  },
  togglePause: function() {
    this.paused = !this.paused;
  }
}, {});
var $__default = Engine;


},{"./image-loader":7,"./raf":8}],6:[function(require,module,exports){
"use strict";
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__base_45_entity__;
var BaseEntity = ($__base_45_entity__ = require("./base-entity"), $__base_45_entity__ && $__base_45_entity__.__esModule && $__base_45_entity__ || {default: $__base_45_entity__}).default;
var ImageEntity = function ImageEntity(x, y, imgSrc) {
  $traceurRuntime.superCall(this, $ImageEntity.prototype, "constructor", [x, y]);
  this.imgSrc = imgSrc;
};
var $ImageEntity = ImageEntity;
($traceurRuntime.createClass)(ImageEntity, {
  onImageLoaded: function(image) {
    this.image = image;
    this.w = this.image.width;
    this.h = this.image.height;
  },
  _innerDraw: function(context) {
    if (this.image) {
      context.drawImage(this.image, -this.w / 2, -this.h / 2);
    }
  }
}, {}, BaseEntity);
var $__default = ImageEntity;


},{"./base-entity":3}],7:[function(require,module,exports){
"use strict";
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__bluebird__;
var Promise = ($__bluebird__ = require("bluebird"), $__bluebird__ && $__bluebird__.__esModule && $__bluebird__ || {default: $__bluebird__}).default;
var ImageLoader = function ImageLoader() {
  this.toLoad = [];
};
($traceurRuntime.createClass)(ImageLoader, {
  add: function(src, entity) {
    this.toLoad.push({
      src: src,
      entity: entity
    });
  },
  load: function() {
    var loadingPromises = this.toLoad.map(this._loadSrc, this);
    return Promise.all(loadingPromises);
  },
  _loadSrc: function(config) {
    var deferred = Promise.defer();
    var i = new Image();
    i.onload = (function() {
      config.entity.onImageLoaded(i);
      deferred.resolve();
    });
    i.src = config.src;
    return deferred.promise;
  }
}, {});
var $__default = ImageLoader;


},{"bluebird":12}],8:[function(require,module,exports){
"use strict";
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var raf = window.requestAnimationFrame;
var vendors = ["ms", "moz", "webkit", "o"];
var x = 0;
while (x < vendors.length && !raf) {
  raf = window[vendors[x] + "RequestAnimationFrame"];
  x += 1;
}
if (!raf) {
  var lastTime = 0;
  raf = function(callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout((function() {
      callback(currTime + timeToCall);
    }), timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}
function raf() {
  raf.apply(window, arguments);
}
var $__default = raf;
;


},{}],9:[function(require,module,exports){
"use strict";
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var $__base_45_entity__;
var BaseEntity = ($__base_45_entity__ = require("./base-entity"), $__base_45_entity__ && $__base_45_entity__.__esModule && $__base_45_entity__ || {default: $__base_45_entity__}).default;
var RectEntity = function RectEntity(x, y, w, h) {
  $traceurRuntime.superCall(this, $RectEntity.prototype, "constructor", [x, y]);
  this.w = w || 0;
  this.h = h || 0;
};
var $RectEntity = RectEntity;
($traceurRuntime.createClass)(RectEntity, {_innerDraw: function(context) {
    context.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
  }}, {}, BaseEntity);
var $__default = RectEntity;


},{"./base-entity":3}],10:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise) {
var SomePromiseArray = Promise._SomePromiseArray;
function Promise$_Any(promises) {
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    if (promise.isRejected()) {
        return promise;
    }
    ret.setHowMany(1);
    ret.setUnwrap();
    ret.init();
    return promise;
}

Promise.any = function Promise$Any(promises) {
    return Promise$_Any(promises);
};

Promise.prototype.any = function Promise$any() {
    return Promise$_Any(this);
};

};

},{}],11:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
var schedule = require("./schedule.js");
var Queue = require("./queue.js");
var errorObj = require("./util.js").errorObj;
var tryCatch1 = require("./util.js").tryCatch1;
var _process = typeof process !== "undefined" ? process : void 0;

function Async() {
    this._isTickUsed = false;
    this._schedule = schedule;
    this._length = 0;
    this._lateBuffer = new Queue(16);
    this._functionBuffer = new Queue(65536);
    var self = this;
    this.consumeFunctionBuffer = function Async$consumeFunctionBuffer() {
        self._consumeFunctionBuffer();
    };
}

Async.prototype.haveItemsQueued = function Async$haveItemsQueued() {
    return this._length > 0;
};

Async.prototype.invokeLater = function Async$invokeLater(fn, receiver, arg) {
    if (_process !== void 0 &&
        _process.domain != null &&
        !fn.domain) {
        fn = _process.domain.bind(fn);
    }
    this._lateBuffer.push(fn, receiver, arg);
    this._queueTick();
};

Async.prototype.invoke = function Async$invoke(fn, receiver, arg) {
    if (_process !== void 0 &&
        _process.domain != null &&
        !fn.domain) {
        fn = _process.domain.bind(fn);
    }
    var functionBuffer = this._functionBuffer;
    functionBuffer.push(fn, receiver, arg);
    this._length = functionBuffer.length();
    this._queueTick();
};

Async.prototype._consumeFunctionBuffer =
function Async$_consumeFunctionBuffer() {
    var functionBuffer = this._functionBuffer;
    while (functionBuffer.length() > 0) {
        var fn = functionBuffer.shift();
        var receiver = functionBuffer.shift();
        var arg = functionBuffer.shift();
        fn.call(receiver, arg);
    }
    this._reset();
    this._consumeLateBuffer();
};

Async.prototype._consumeLateBuffer = function Async$_consumeLateBuffer() {
    var buffer = this._lateBuffer;
    while(buffer.length() > 0) {
        var fn = buffer.shift();
        var receiver = buffer.shift();
        var arg = buffer.shift();
        var res = tryCatch1(fn, receiver, arg);
        if (res === errorObj) {
            this._queueTick();
            if (fn.domain != null) {
                fn.domain.emit("error", res.e);
            } else {
                throw res.e;
            }
        }
    }
};

Async.prototype._queueTick = function Async$_queue() {
    if (!this._isTickUsed) {
        this._schedule(this.consumeFunctionBuffer);
        this._isTickUsed = true;
    }
};

Async.prototype._reset = function Async$_reset() {
    this._isTickUsed = false;
    this._length = 0;
};

module.exports = new Async();

}).call(this,require('_process'))
},{"./queue.js":34,"./schedule.js":37,"./util.js":44,"_process":46}],12:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
var Promise = require("./promise.js")();
module.exports = Promise;
},{"./promise.js":29}],13:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
var cr = Object.create;
if (cr) {
    var callerCache = cr(null);
    var getterCache = cr(null);
    callerCache[" size"] = getterCache[" size"] = 0;
}

module.exports = function(Promise) {
var util = require("./util.js");
var canEvaluate = util.canEvaluate;
var isIdentifier = util.isIdentifier;

function makeMethodCaller (methodName) {
    return new Function("obj", "                                             \n\
        'use strict'                                                         \n\
        var len = this.length;                                               \n\
        switch(len) {                                                        \n\
            case 1: return obj.methodName(this[0]);                          \n\
            case 2: return obj.methodName(this[0], this[1]);                 \n\
            case 3: return obj.methodName(this[0], this[1], this[2]);        \n\
            case 0: return obj.methodName();                                 \n\
            default: return obj.methodName.apply(obj, this);                 \n\
        }                                                                    \n\
        ".replace(/methodName/g, methodName));
}

function makeGetter (propertyName) {
    return new Function("obj", "                                             \n\
        'use strict';                                                        \n\
        return obj.propertyName;                                             \n\
        ".replace("propertyName", propertyName));
}

function getCompiled(name, compiler, cache) {
    var ret = cache[name];
    if (typeof ret !== "function") {
        if (!isIdentifier(name)) {
            return null;
        }
        ret = compiler(name);
        cache[name] = ret;
        cache[" size"]++;
        if (cache[" size"] > 512) {
            var keys = Object.keys(cache);
            for (var i = 0; i < 256; ++i) delete cache[keys[i]];
            cache[" size"] = keys.length - 256;
        }
    }
    return ret;
}

function getMethodCaller(name) {
    return getCompiled(name, makeMethodCaller, callerCache);
}

function getGetter(name) {
    return getCompiled(name, makeGetter, getterCache);
}

function caller(obj) {
    return obj[this.pop()].apply(obj, this);
}
Promise.prototype.call = function Promise$call(methodName) {
    var $_len = arguments.length;var args = new Array($_len - 1); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}
    if (canEvaluate) {
        var maybeCaller = getMethodCaller(methodName);
        if (maybeCaller !== null) {
            return this._then(maybeCaller, void 0, void 0, args, void 0);
        }
    }
    args.push(methodName);
    return this._then(caller, void 0, void 0, args, void 0);
};

function namedGetter(obj) {
    return obj[this];
}
function indexedGetter(obj) {
    return obj[this];
}
Promise.prototype.get = function Promise$get(propertyName) {
    var isIndex = (typeof propertyName === "number");
    var getter;
    if (!isIndex) {
        if (canEvaluate) {
            var maybeGetter = getGetter(propertyName);
            getter = maybeGetter !== null ? maybeGetter : namedGetter;
        } else {
            getter = namedGetter;
        }
    } else {
        getter = indexedGetter;
    }
    return this._then(getter, void 0, void 0, propertyName, void 0);
};
};

},{"./util.js":44}],14:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise, INTERNAL) {
var errors = require("./errors.js");
var canAttach = errors.canAttach;
var async = require("./async.js");
var CancellationError = errors.CancellationError;

Promise.prototype._cancel = function Promise$_cancel(reason) {
    if (!this.isCancellable()) return this;
    var parent;
    var promiseToReject = this;
    while ((parent = promiseToReject._cancellationParent) !== void 0 &&
        parent.isCancellable()) {
        promiseToReject = parent;
    }
    promiseToReject._attachExtraTrace(reason);
    promiseToReject._rejectUnchecked(reason);
};

Promise.prototype.cancel = function Promise$cancel(reason) {
    if (!this.isCancellable()) return this;
    reason = reason !== void 0
        ? (canAttach(reason) ? reason : new Error(reason + ""))
        : new CancellationError();
    async.invokeLater(this._cancel, this, reason);
    return this;
};

Promise.prototype.cancellable = function Promise$cancellable() {
    if (this._cancellable()) return this;
    this._setCancellable();
    this._cancellationParent = void 0;
    return this;
};

Promise.prototype.uncancellable = function Promise$uncancellable() {
    var ret = new Promise(INTERNAL);
    ret._propagateFrom(this, 2 | 4);
    ret._follow(this);
    ret._unsetCancellable();
    return ret;
};

Promise.prototype.fork =
function Promise$fork(didFulfill, didReject, didProgress) {
    var ret = this._then(didFulfill, didReject, didProgress,
                         void 0, void 0);

    ret._setCancellable();
    ret._cancellationParent = void 0;
    return ret;
};
};

},{"./async.js":11,"./errors.js":19}],15:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function() {
var inherits = require("./util.js").inherits;
var defineProperty = require("./es5.js").defineProperty;

var rignore = new RegExp(
    "\\b(?:[a-zA-Z0-9.]+\\$_\\w+|" +
    "tryCatch(?:1|2|3|4|Apply)|new \\w*PromiseArray|" +
    "\\w*PromiseArray\\.\\w*PromiseArray|" +
    "setTimeout|CatchFilter\\$_\\w+|makeNodePromisified|processImmediate|" +
    "process._tickCallback|nextTick|Async\\$\\w+)\\b"
);

var rtraceline = null;
var formatStack = null;

function formatNonError(obj) {
    var str;
    if (typeof obj === "function") {
        str = "[function " +
            (obj.name || "anonymous") +
            "]";
    } else {
        str = obj.toString();
        var ruselessToString = /\[object [a-zA-Z0-9$_]+\]/;
        if (ruselessToString.test(str)) {
            try {
                var newStr = JSON.stringify(obj);
                str = newStr;
            }
            catch(e) {

            }
        }
        if (str.length === 0) {
            str = "(empty array)";
        }
    }
    return ("(<" + snip(str) + ">, no stack trace)");
}

function snip(str) {
    var maxChars = 41;
    if (str.length < maxChars) {
        return str;
    }
    return str.substr(0, maxChars - 3) + "...";
}

function CapturedTrace(ignoreUntil, isTopLevel) {
    this.captureStackTrace(CapturedTrace, isTopLevel);

}
inherits(CapturedTrace, Error);

CapturedTrace.prototype.captureStackTrace =
function CapturedTrace$captureStackTrace(ignoreUntil, isTopLevel) {
    captureStackTrace(this, ignoreUntil, isTopLevel);
};

CapturedTrace.possiblyUnhandledRejection =
function CapturedTrace$PossiblyUnhandledRejection(reason) {
    if (typeof console === "object") {
        var message;
        if (typeof reason === "object" || typeof reason === "function") {
            var stack = reason.stack;
            message = "Possibly unhandled " + formatStack(stack, reason);
        } else {
            message = "Possibly unhandled " + String(reason);
        }
        if (typeof console.error === "function" ||
            typeof console.error === "object") {
            console.error(message);
        } else if (typeof console.log === "function" ||
            typeof console.log === "object") {
            console.log(message);
        }
    }
};

CapturedTrace.combine = function CapturedTrace$Combine(current, prev) {
    var curLast = current.length - 1;
    for (var i = prev.length - 1; i >= 0; --i) {
        var line = prev[i];
        if (current[curLast] === line) {
            current.pop();
            curLast--;
        } else {
            break;
        }
    }

    current.push("From previous event:");
    var lines = current.concat(prev);

    var ret = [];

    for (var i = 0, len = lines.length; i < len; ++i) {

        if (((rignore.test(lines[i]) && rtraceline.test(lines[i])) ||
            (i > 0 && !rtraceline.test(lines[i])) &&
            lines[i] !== "From previous event:")
       ) {
            continue;
        }
        ret.push(lines[i]);
    }
    return ret;
};

CapturedTrace.protectErrorMessageNewlines = function(stack) {
    for (var i = 0; i < stack.length; ++i) {
        if (rtraceline.test(stack[i])) {
            break;
        }
    }

    if (i <= 1) return;

    var errorMessageLines = [];
    for (var j = 0; j < i; ++j) {
        errorMessageLines.push(stack.shift());
    }
    stack.unshift(errorMessageLines.join("\u0002\u0000\u0001"));
};

CapturedTrace.isSupported = function CapturedTrace$IsSupported() {
    return typeof captureStackTrace === "function";
};

var captureStackTrace = (function stackDetection() {
    if (typeof Error.stackTraceLimit === "number" &&
        typeof Error.captureStackTrace === "function") {
        rtraceline = /^\s*at\s*/;
        formatStack = function(stack, error) {
            if (typeof stack === "string") return stack;

            if (error.name !== void 0 &&
                error.message !== void 0) {
                return error.name + ". " + error.message;
            }
            return formatNonError(error);


        };
        var captureStackTrace = Error.captureStackTrace;
        return function CapturedTrace$_captureStackTrace(
            receiver, ignoreUntil) {
            captureStackTrace(receiver, ignoreUntil);
        };
    }
    var err = new Error();

    if (typeof err.stack === "string" &&
        typeof "".startsWith === "function" &&
        (err.stack.startsWith("stackDetection@")) &&
        stackDetection.name === "stackDetection") {

        defineProperty(Error, "stackTraceLimit", {
            writable: true,
            enumerable: false,
            configurable: false,
            value: 25
        });
        rtraceline = /@/;
        var rline = /[@\n]/;

        formatStack = function(stack, error) {
            if (typeof stack === "string") {
                return (error.name + ". " + error.message + "\n" + stack);
            }

            if (error.name !== void 0 &&
                error.message !== void 0) {
                return error.name + ". " + error.message;
            }
            return formatNonError(error);
        };

        return function captureStackTrace(o) {
            var stack = new Error().stack;
            var split = stack.split(rline);
            var len = split.length;
            var ret = "";
            for (var i = 0; i < len; i += 2) {
                ret += split[i];
                ret += "@";
                ret += split[i + 1];
                ret += "\n";
            }
            o.stack = ret;
        };
    } else {
        formatStack = function(stack, error) {
            if (typeof stack === "string") return stack;

            if ((typeof error === "object" ||
                typeof error === "function") &&
                error.name !== void 0 &&
                error.message !== void 0) {
                return error.name + ". " + error.message;
            }
            return formatNonError(error);
        };

        return null;
    }
})();

return CapturedTrace;
};

},{"./es5.js":21,"./util.js":44}],16:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(NEXT_FILTER) {
var util = require("./util.js");
var errors = require("./errors.js");
var tryCatch1 = util.tryCatch1;
var errorObj = util.errorObj;
var keys = require("./es5.js").keys;
var TypeError = errors.TypeError;

function CatchFilter(instances, callback, promise) {
    this._instances = instances;
    this._callback = callback;
    this._promise = promise;
}

function CatchFilter$_safePredicate(predicate, e) {
    var safeObject = {};
    var retfilter = tryCatch1(predicate, safeObject, e);

    if (retfilter === errorObj) return retfilter;

    var safeKeys = keys(safeObject);
    if (safeKeys.length) {
        errorObj.e = new TypeError(
            "Catch filter must inherit from Error "
          + "or be a simple predicate function");
        return errorObj;
    }
    return retfilter;
}

CatchFilter.prototype.doFilter = function CatchFilter$_doFilter(e) {
    var cb = this._callback;
    var promise = this._promise;
    var boundTo = promise._boundTo;
    for (var i = 0, len = this._instances.length; i < len; ++i) {
        var item = this._instances[i];
        var itemIsErrorType = item === Error ||
            (item != null && item.prototype instanceof Error);

        if (itemIsErrorType && e instanceof item) {
            var ret = tryCatch1(cb, boundTo, e);
            if (ret === errorObj) {
                NEXT_FILTER.e = ret.e;
                return NEXT_FILTER;
            }
            return ret;
        } else if (typeof item === "function" && !itemIsErrorType) {
            var shouldHandle = CatchFilter$_safePredicate(item, e);
            if (shouldHandle === errorObj) {
                var trace = errors.canAttach(errorObj.e)
                    ? errorObj.e
                    : new Error(errorObj.e + "");
                this._promise._attachExtraTrace(trace);
                e = errorObj.e;
                break;
            } else if (shouldHandle) {
                var ret = tryCatch1(cb, boundTo, e);
                if (ret === errorObj) {
                    NEXT_FILTER.e = ret.e;
                    return NEXT_FILTER;
                }
                return ret;
            }
        }
    }
    NEXT_FILTER.e = e;
    return NEXT_FILTER;
};

return CatchFilter;
};

},{"./errors.js":19,"./es5.js":21,"./util.js":44}],17:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
var util = require("./util.js");
var isPrimitive = util.isPrimitive;
var wrapsPrimitiveReceiver = util.wrapsPrimitiveReceiver;

module.exports = function(Promise) {
var returner = function Promise$_returner() {
    return this;
};
var thrower = function Promise$_thrower() {
    throw this;
};

var wrapper = function Promise$_wrapper(value, action) {
    if (action === 1) {
        return function Promise$_thrower() {
            throw value;
        };
    } else if (action === 2) {
        return function Promise$_returner() {
            return value;
        };
    }
};


Promise.prototype["return"] =
Promise.prototype.thenReturn =
function Promise$thenReturn(value) {
    if (wrapsPrimitiveReceiver && isPrimitive(value)) {
        return this._then(
            wrapper(value, 2),
            void 0,
            void 0,
            void 0,
            void 0
       );
    }
    return this._then(returner, void 0, void 0, value, void 0);
};

Promise.prototype["throw"] =
Promise.prototype.thenThrow =
function Promise$thenThrow(reason) {
    if (wrapsPrimitiveReceiver && isPrimitive(reason)) {
        return this._then(
            wrapper(reason, 1),
            void 0,
            void 0,
            void 0,
            void 0
       );
    }
    return this._then(thrower, void 0, void 0, reason, void 0);
};
};

},{"./util.js":44}],18:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseReduce = Promise.reduce;

Promise.prototype.each = function Promise$each(fn) {
    return PromiseReduce(this, fn, null, INTERNAL);
};

Promise.each = function Promise$Each(promises, fn) {
    return PromiseReduce(promises, fn, null, INTERNAL);
};
};

},{}],19:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
var Objectfreeze = require("./es5.js").freeze;
var util = require("./util.js");
var inherits = util.inherits;
var notEnumerableProp = util.notEnumerableProp;

function markAsOriginatingFromRejection(e) {
    try {
        notEnumerableProp(e, "isOperational", true);
    }
    catch(ignore) {}
}

function originatesFromRejection(e) {
    if (e == null) return false;
    return ((e instanceof OperationalError) ||
        e["isOperational"] === true);
}

function isError(obj) {
    return obj instanceof Error;
}

function canAttach(obj) {
    return isError(obj);
}

function subError(nameProperty, defaultMessage) {
    function SubError(message) {
        if (!(this instanceof SubError)) return new SubError(message);
        this.message = typeof message === "string" ? message : defaultMessage;
        this.name = nameProperty;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
    inherits(SubError, Error);
    return SubError;
}

var _TypeError, _RangeError;
var CancellationError = subError("CancellationError", "cancellation error");
var TimeoutError = subError("TimeoutError", "timeout error");
var AggregateError = subError("AggregateError", "aggregate error");
try {
    _TypeError = TypeError;
    _RangeError = RangeError;
} catch(e) {
    _TypeError = subError("TypeError", "type error");
    _RangeError = subError("RangeError", "range error");
}

var methods = ("join pop push shift unshift slice filter forEach some " +
    "every map indexOf lastIndexOf reduce reduceRight sort reverse").split(" ");

for (var i = 0; i < methods.length; ++i) {
    if (typeof Array.prototype[methods[i]] === "function") {
        AggregateError.prototype[methods[i]] = Array.prototype[methods[i]];
    }
}

AggregateError.prototype.length = 0;
AggregateError.prototype["isOperational"] = true;
var level = 0;
AggregateError.prototype.toString = function() {
    var indent = Array(level * 4 + 1).join(" ");
    var ret = "\n" + indent + "AggregateError of:" + "\n";
    level++;
    indent = Array(level * 4 + 1).join(" ");
    for (var i = 0; i < this.length; ++i) {
        var str = this[i] === this ? "[Circular AggregateError]" : this[i] + "";
        var lines = str.split("\n");
        for (var j = 0; j < lines.length; ++j) {
            lines[j] = indent + lines[j];
        }
        str = lines.join("\n");
        ret += str + "\n";
    }
    level--;
    return ret;
};

function OperationalError(message) {
    this.name = "OperationalError";
    this.message = message;
    this.cause = message;
    this["isOperational"] = true;

    if (message instanceof Error) {
        this.message = message.message;
        this.stack = message.stack;
    } else if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    }

}
inherits(OperationalError, Error);

var key = "__BluebirdErrorTypes__";
var errorTypes = Error[key];
if (!errorTypes) {
    errorTypes = Objectfreeze({
        CancellationError: CancellationError,
        TimeoutError: TimeoutError,
        OperationalError: OperationalError,
        RejectionError: OperationalError,
        AggregateError: AggregateError
    });
    notEnumerableProp(Error, key, errorTypes);
}

module.exports = {
    Error: Error,
    TypeError: _TypeError,
    RangeError: _RangeError,
    CancellationError: errorTypes.CancellationError,
    OperationalError: errorTypes.OperationalError,
    TimeoutError: errorTypes.TimeoutError,
    AggregateError: errorTypes.AggregateError,
    originatesFromRejection: originatesFromRejection,
    markAsOriginatingFromRejection: markAsOriginatingFromRejection,
    canAttach: canAttach
};

},{"./es5.js":21,"./util.js":44}],20:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise) {
var TypeError = require('./errors.js').TypeError;

function apiRejection(msg) {
    var error = new TypeError(msg);
    var ret = Promise.rejected(error);
    var parent = ret._peekContext();
    if (parent != null) {
        parent._attachExtraTrace(error);
    }
    return ret;
}

return apiRejection;
};

},{"./errors.js":19}],21:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
var isES5 = (function(){
    "use strict";
    return this === void 0;
})();

if (isES5) {
    module.exports = {
        freeze: Object.freeze,
        defineProperty: Object.defineProperty,
        keys: Object.keys,
        getPrototypeOf: Object.getPrototypeOf,
        isArray: Array.isArray,
        isES5: isES5
    };
} else {
    var has = {}.hasOwnProperty;
    var str = {}.toString;
    var proto = {}.constructor.prototype;

    var ObjectKeys = function ObjectKeys(o) {
        var ret = [];
        for (var key in o) {
            if (has.call(o, key)) {
                ret.push(key);
            }
        }
        return ret;
    }

    var ObjectDefineProperty = function ObjectDefineProperty(o, key, desc) {
        o[key] = desc.value;
        return o;
    }

    var ObjectFreeze = function ObjectFreeze(obj) {
        return obj;
    }

    var ObjectGetPrototypeOf = function ObjectGetPrototypeOf(obj) {
        try {
            return Object(obj).constructor.prototype;
        }
        catch (e) {
            return proto;
        }
    }

    var ArrayIsArray = function ArrayIsArray(obj) {
        try {
            return str.call(obj) === "[object Array]";
        }
        catch(e) {
            return false;
        }
    }

    module.exports = {
        isArray: ArrayIsArray,
        keys: ObjectKeys,
        defineProperty: ObjectDefineProperty,
        freeze: ObjectFreeze,
        getPrototypeOf: ObjectGetPrototypeOf,
        isES5: isES5
    };
}

},{}],22:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise, INTERNAL) {
var PromiseMap = Promise.map;

Promise.prototype.filter = function Promise$filter(fn, options) {
    return PromiseMap(this, fn, options, INTERNAL);
};

Promise.filter = function Promise$Filter(promises, fn, options) {
    return PromiseMap(promises, fn, options, INTERNAL);
};
};

},{}],23:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise, NEXT_FILTER, cast) {
var util = require("./util.js");
var wrapsPrimitiveReceiver = util.wrapsPrimitiveReceiver;
var isPrimitive = util.isPrimitive;
var thrower = util.thrower;

function returnThis() {
    return this;
}
function throwThis() {
    throw this;
}
function return$(r) {
    return function Promise$_returner() {
        return r;
    };
}
function throw$(r) {
    return function Promise$_thrower() {
        throw r;
    };
}
function promisedFinally(ret, reasonOrValue, isFulfilled) {
    var then;
    if (wrapsPrimitiveReceiver && isPrimitive(reasonOrValue)) {
        then = isFulfilled ? return$(reasonOrValue) : throw$(reasonOrValue);
    } else {
        then = isFulfilled ? returnThis : throwThis;
    }
    return ret._then(then, thrower, void 0, reasonOrValue, void 0);
}

function finallyHandler(reasonOrValue) {
    var promise = this.promise;
    var handler = this.handler;

    var ret = promise._isBound()
                    ? handler.call(promise._boundTo)
                    : handler();

    if (ret !== void 0) {
        var maybePromise = cast(ret, void 0);
        if (maybePromise instanceof Promise) {
            return promisedFinally(maybePromise, reasonOrValue,
                                    promise.isFulfilled());
        }
    }

    if (promise.isRejected()) {
        NEXT_FILTER.e = reasonOrValue;
        return NEXT_FILTER;
    } else {
        return reasonOrValue;
    }
}

function tapHandler(value) {
    var promise = this.promise;
    var handler = this.handler;

    var ret = promise._isBound()
                    ? handler.call(promise._boundTo, value)
                    : handler(value);

    if (ret !== void 0) {
        var maybePromise = cast(ret, void 0);
        if (maybePromise instanceof Promise) {
            return promisedFinally(maybePromise, value, true);
        }
    }
    return value;
}

Promise.prototype._passThroughHandler =
function Promise$_passThroughHandler(handler, isFinally) {
    if (typeof handler !== "function") return this.then();

    var promiseAndHandler = {
        promise: this,
        handler: handler
    };

    return this._then(
            isFinally ? finallyHandler : tapHandler,
            isFinally ? finallyHandler : void 0, void 0,
            promiseAndHandler, void 0);
};

Promise.prototype.lastly =
Promise.prototype["finally"] = function Promise$finally(handler) {
    return this._passThroughHandler(handler, true);
};

Promise.prototype.tap = function Promise$tap(handler) {
    return this._passThroughHandler(handler, false);
};
};

},{"./util.js":44}],24:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise, apiRejection, INTERNAL, cast) {
var errors = require("./errors.js");
var TypeError = errors.TypeError;
var deprecated = require("./util.js").deprecated;
var util = require("./util.js");
var errorObj = util.errorObj;
var tryCatch1 = util.tryCatch1;
var yieldHandlers = [];

function promiseFromYieldHandler(value, yieldHandlers) {
    var _errorObj = errorObj;
    var _Promise = Promise;
    var len = yieldHandlers.length;
    for (var i = 0; i < len; ++i) {
        var result = tryCatch1(yieldHandlers[i], void 0, value);
        if (result === _errorObj) {
            return _Promise.reject(_errorObj.e);
        }
        var maybePromise = cast(result, promiseFromYieldHandler);
        if (maybePromise instanceof _Promise) return maybePromise;
    }
    return null;
}

function PromiseSpawn(generatorFunction, receiver, yieldHandler) {
    var promise = this._promise = new Promise(INTERNAL);
    promise._setTrace(void 0);
    this._generatorFunction = generatorFunction;
    this._receiver = receiver;
    this._generator = void 0;
    this._yieldHandlers = typeof yieldHandler === "function"
        ? [yieldHandler].concat(yieldHandlers)
        : yieldHandlers;
}

PromiseSpawn.prototype.promise = function PromiseSpawn$promise() {
    return this._promise;
};

PromiseSpawn.prototype._run = function PromiseSpawn$_run() {
    this._generator = this._generatorFunction.call(this._receiver);
    this._receiver =
        this._generatorFunction = void 0;
    this._next(void 0);
};

PromiseSpawn.prototype._continue = function PromiseSpawn$_continue(result) {
    if (result === errorObj) {
        this._generator = void 0;
        var trace = errors.canAttach(result.e)
            ? result.e : new Error(result.e + "");
        this._promise._attachExtraTrace(trace);
        this._promise._reject(result.e, trace);
        return;
    }

    var value = result.value;
    if (result.done === true) {
        this._generator = void 0;
        if (!this._promise._tryFollow(value)) {
            this._promise._fulfill(value);
        }
    } else {
        var maybePromise = cast(value, void 0);
        if (!(maybePromise instanceof Promise)) {
            maybePromise =
                promiseFromYieldHandler(maybePromise, this._yieldHandlers);
            if (maybePromise === null) {
                this._throw(new TypeError("A value was yielded that could not be treated as a promise"));
                return;
            }
        }
        maybePromise._then(
            this._next,
            this._throw,
            void 0,
            this,
            null
       );
    }
};

PromiseSpawn.prototype._throw = function PromiseSpawn$_throw(reason) {
    if (errors.canAttach(reason))
        this._promise._attachExtraTrace(reason);
    this._continue(
        tryCatch1(this._generator["throw"], this._generator, reason)
   );
};

PromiseSpawn.prototype._next = function PromiseSpawn$_next(value) {
    this._continue(
        tryCatch1(this._generator.next, this._generator, value)
   );
};

Promise.coroutine =
function Promise$Coroutine(generatorFunction, options) {
    if (typeof generatorFunction !== "function") {
        throw new TypeError("generatorFunction must be a function");
    }
    var yieldHandler = Object(options).yieldHandler;
    var PromiseSpawn$ = PromiseSpawn;
    return function () {
        var generator = generatorFunction.apply(this, arguments);
        var spawn = new PromiseSpawn$(void 0, void 0, yieldHandler);
        spawn._generator = generator;
        spawn._next(void 0);
        return spawn.promise();
    };
};

Promise.coroutine.addYieldHandler = function(fn) {
    if (typeof fn !== "function") throw new TypeError("fn must be a function");
    yieldHandlers.push(fn);
};

Promise.spawn = function Promise$Spawn(generatorFunction) {
    deprecated("Promise.spawn is deprecated. Use Promise.coroutine instead.");
    if (typeof generatorFunction !== "function") {
        return apiRejection("generatorFunction must be a function");
    }
    var spawn = new PromiseSpawn(generatorFunction, this);
    var ret = spawn.promise();
    spawn._run(Promise.spawn);
    return ret;
};
};

},{"./errors.js":19,"./util.js":44}],25:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports =
function(Promise, PromiseArray, cast, INTERNAL) {
var util = require("./util.js");
var canEvaluate = util.canEvaluate;
var tryCatch1 = util.tryCatch1;
var errorObj = util.errorObj;


if (canEvaluate) {
    var thenCallback = function(i) {
        return new Function("value", "holder", "                             \n\
            'use strict';                                                    \n\
            holder.pIndex = value;                                           \n\
            holder.checkFulfillment(this);                                   \n\
            ".replace(/Index/g, i));
    };

    var caller = function(count) {
        var values = [];
        for (var i = 1; i <= count; ++i) values.push("holder.p" + i);
        return new Function("holder", "                                      \n\
            'use strict';                                                    \n\
            var callback = holder.fn;                                        \n\
            return callback(values);                                         \n\
            ".replace(/values/g, values.join(", ")));
    };
    var thenCallbacks = [];
    var callers = [void 0];
    for (var i = 1; i <= 5; ++i) {
        thenCallbacks.push(thenCallback(i));
        callers.push(caller(i));
    }

    var Holder = function(total, fn) {
        this.p1 = this.p2 = this.p3 = this.p4 = this.p5 = null;
        this.fn = fn;
        this.total = total;
        this.now = 0;
    };

    Holder.prototype.callers = callers;
    Holder.prototype.checkFulfillment = function(promise) {
        var now = this.now;
        now++;
        var total = this.total;
        if (now >= total) {
            var handler = this.callers[total];
            var ret = tryCatch1(handler, void 0, this);
            if (ret === errorObj) {
                promise._rejectUnchecked(ret.e);
            } else if (!promise._tryFollow(ret)) {
                promise._fulfillUnchecked(ret);
            }
        } else {
            this.now = now;
        }
    };
}




Promise.join = function Promise$Join() {
    var last = arguments.length - 1;
    var fn;
    if (last > 0 && typeof arguments[last] === "function") {
        fn = arguments[last];
        if (last < 6 && canEvaluate) {
            var ret = new Promise(INTERNAL);
            ret._setTrace(void 0);
            var holder = new Holder(last, fn);
            var reject = ret._reject;
            var callbacks = thenCallbacks;
            for (var i = 0; i < last; ++i) {
                var maybePromise = cast(arguments[i], void 0);
                if (maybePromise instanceof Promise) {
                    if (maybePromise.isPending()) {
                        maybePromise._then(callbacks[i], reject,
                                           void 0, ret, holder);
                    } else if (maybePromise.isFulfilled()) {
                        callbacks[i].call(ret,
                                          maybePromise._settledValue, holder);
                    } else {
                        ret._reject(maybePromise._settledValue);
                        maybePromise._unsetRejectionIsUnhandled();
                    }
                } else {
                    callbacks[i].call(ret, maybePromise, holder);
                }
            }
            return ret;
        }
    }
    var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];}
    var ret = new PromiseArray(args).promise();
    return fn !== void 0 ? ret.spread(fn) : ret;
};

};

},{"./util.js":44}],26:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise, PromiseArray, apiRejection, cast, INTERNAL) {
var util = require("./util.js");
var tryCatch3 = util.tryCatch3;
var errorObj = util.errorObj;
var PENDING = {};
var EMPTY_ARRAY = [];

function MappingPromiseArray(promises, fn, limit, _filter) {
    this.constructor$(promises);
    this._callback = fn;
    this._preservedValues = _filter === INTERNAL
        ? new Array(this.length())
        : null;
    this._limit = limit;
    this._inFlight = 0;
    this._queue = limit >= 1 ? [] : EMPTY_ARRAY;
    this._init$(void 0, -2);
}
util.inherits(MappingPromiseArray, PromiseArray);

MappingPromiseArray.prototype._init = function MappingPromiseArray$_init() {};

MappingPromiseArray.prototype._promiseFulfilled =
function MappingPromiseArray$_promiseFulfilled(value, index) {
    var values = this._values;
    if (values === null) return;

    var length = this.length();
    var preservedValues = this._preservedValues;
    var limit = this._limit;
    if (values[index] === PENDING) {
        values[index] = value;
        if (limit >= 1) {
            this._inFlight--;
            this._drainQueue();
            if (this._isResolved()) return;
        }
    } else {
        if (limit >= 1 && this._inFlight >= limit) {
            values[index] = value;
            this._queue.push(index);
            return;
        }
        if (preservedValues !== null) preservedValues[index] = value;

        var callback = this._callback;
        var receiver = this._promise._boundTo;
        var ret = tryCatch3(callback, receiver, value, index, length);
        if (ret === errorObj) return this._reject(ret.e);

        var maybePromise = cast(ret, void 0);
        if (maybePromise instanceof Promise) {
            if (maybePromise.isPending()) {
                if (limit >= 1) this._inFlight++;
                values[index] = PENDING;
                return maybePromise._proxyPromiseArray(this, index);
            } else if (maybePromise.isFulfilled()) {
                ret = maybePromise.value();
            } else {
                maybePromise._unsetRejectionIsUnhandled();
                return this._reject(maybePromise.reason());
            }
        }
        values[index] = ret;
    }
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= length) {
        if (preservedValues !== null) {
            this._filter(values, preservedValues);
        } else {
            this._resolve(values);
        }

    }
};

MappingPromiseArray.prototype._drainQueue =
function MappingPromiseArray$_drainQueue() {
    var queue = this._queue;
    var limit = this._limit;
    var values = this._values;
    while (queue.length > 0 && this._inFlight < limit) {
        var index = queue.pop();
        this._promiseFulfilled(values[index], index);
    }
};

MappingPromiseArray.prototype._filter =
function MappingPromiseArray$_filter(booleans, values) {
    var len = values.length;
    var ret = new Array(len);
    var j = 0;
    for (var i = 0; i < len; ++i) {
        if (booleans[i]) ret[j++] = values[i];
    }
    ret.length = j;
    this._resolve(ret);
};

MappingPromiseArray.prototype.preservedValues =
function MappingPromiseArray$preserveValues() {
    return this._preservedValues;
};

function map(promises, fn, options, _filter) {
    var limit = typeof options === "object" && options !== null
        ? options.concurrency
        : 0;
    limit = typeof limit === "number" &&
        isFinite(limit) && limit >= 1 ? limit : 0;
    return new MappingPromiseArray(promises, fn, limit, _filter);
}

Promise.prototype.map = function Promise$map(fn, options) {
    if (typeof fn !== "function") return apiRejection("fn must be a function");

    return map(this, fn, options, null).promise();
};

Promise.map = function Promise$Map(promises, fn, options, _filter) {
    if (typeof fn !== "function") return apiRejection("fn must be a function");
    return map(promises, fn, options, _filter).promise();
};


};

},{"./util.js":44}],27:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise) {
var util = require("./util.js");
var async = require("./async.js");
var tryCatch2 = util.tryCatch2;
var tryCatch1 = util.tryCatch1;
var errorObj = util.errorObj;

function thrower(r) {
    throw r;
}

function Promise$_spreadAdapter(val, receiver) {
    if (!util.isArray(val)) return Promise$_successAdapter(val, receiver);
    var ret = util.tryCatchApply(this, [null].concat(val), receiver);
    if (ret === errorObj) {
        async.invokeLater(thrower, void 0, ret.e);
    }
}

function Promise$_successAdapter(val, receiver) {
    var nodeback = this;
    var ret = val === void 0
        ? tryCatch1(nodeback, receiver, null)
        : tryCatch2(nodeback, receiver, null, val);
    if (ret === errorObj) {
        async.invokeLater(thrower, void 0, ret.e);
    }
}
function Promise$_errorAdapter(reason, receiver) {
    var nodeback = this;
    var ret = tryCatch1(nodeback, receiver, reason);
    if (ret === errorObj) {
        async.invokeLater(thrower, void 0, ret.e);
    }
}

Promise.prototype.nodeify = function Promise$nodeify(nodeback, options) {
    if (typeof nodeback == "function") {
        var adapter = Promise$_successAdapter;
        if (options !== void 0 && Object(options).spread) {
            adapter = Promise$_spreadAdapter;
        }
        this._then(
            adapter,
            Promise$_errorAdapter,
            void 0,
            nodeback,
            this._boundTo
        );
    }
    return this;
};
};

},{"./async.js":11,"./util.js":44}],28:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise, PromiseArray) {
var util = require("./util.js");
var async = require("./async.js");
var errors = require("./errors.js");
var tryCatch1 = util.tryCatch1;
var errorObj = util.errorObj;

Promise.prototype.progressed = function Promise$progressed(handler) {
    return this._then(void 0, void 0, handler, void 0, void 0);
};

Promise.prototype._progress = function Promise$_progress(progressValue) {
    if (this._isFollowingOrFulfilledOrRejected()) return;
    this._progressUnchecked(progressValue);

};

Promise.prototype._clearFirstHandlerData$Base =
Promise.prototype._clearFirstHandlerData;
Promise.prototype._clearFirstHandlerData =
function Promise$_clearFirstHandlerData() {
    this._clearFirstHandlerData$Base();
    this._progressHandler0 = void 0;
};

Promise.prototype._progressHandlerAt =
function Promise$_progressHandlerAt(index) {
    return index === 0
        ? this._progressHandler0
        : this[(index << 2) + index - 5 + 2];
};

Promise.prototype._doProgressWith =
function Promise$_doProgressWith(progression) {
    var progressValue = progression.value;
    var handler = progression.handler;
    var promise = progression.promise;
    var receiver = progression.receiver;

    var ret = tryCatch1(handler, receiver, progressValue);
    if (ret === errorObj) {
        if (ret.e != null &&
            ret.e.name !== "StopProgressPropagation") {
            var trace = errors.canAttach(ret.e)
                ? ret.e : new Error(ret.e + "");
            promise._attachExtraTrace(trace);
            promise._progress(ret.e);
        }
    } else if (ret instanceof Promise) {
        ret._then(promise._progress, null, null, promise, void 0);
    } else {
        promise._progress(ret);
    }
};


Promise.prototype._progressUnchecked =
function Promise$_progressUnchecked(progressValue) {
    if (!this.isPending()) return;
    var len = this._length();
    var progress = this._progress;
    for (var i = 0; i < len; i++) {
        var handler = this._progressHandlerAt(i);
        var promise = this._promiseAt(i);
        if (!(promise instanceof Promise)) {
            var receiver = this._receiverAt(i);
            if (typeof handler === "function") {
                handler.call(receiver, progressValue, promise);
            } else if (receiver instanceof Promise && receiver._isProxied()) {
                receiver._progressUnchecked(progressValue);
            } else if (receiver instanceof PromiseArray) {
                receiver._promiseProgressed(progressValue, promise);
            }
            continue;
        }

        if (typeof handler === "function") {
            async.invoke(this._doProgressWith, this, {
                handler: handler,
                promise: promise,
                receiver: this._receiverAt(i),
                value: progressValue
            });
        } else {
            async.invoke(progress, promise, progressValue);
        }
    }
};
};

},{"./async.js":11,"./errors.js":19,"./util.js":44}],29:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
var old;
if (typeof Promise !== "undefined") old = Promise;
function noConflict(bluebird) {
    try { if (Promise === bluebird) Promise = old; }
    catch (e) {}
    return bluebird;
}
module.exports = function() {
var util = require("./util.js");
var async = require("./async.js");
var errors = require("./errors.js");

var INTERNAL = function(){};
var APPLY = {};
var NEXT_FILTER = {e: null};

var cast = require("./thenables.js")(Promise, INTERNAL);
var PromiseArray = require("./promise_array.js")(Promise, INTERNAL, cast);
var CapturedTrace = require("./captured_trace.js")();
var CatchFilter = require("./catch_filter.js")(NEXT_FILTER);
var PromiseResolver = require("./promise_resolver.js");

var isArray = util.isArray;

var errorObj = util.errorObj;
var tryCatch1 = util.tryCatch1;
var tryCatch2 = util.tryCatch2;
var tryCatchApply = util.tryCatchApply;
var RangeError = errors.RangeError;
var TypeError = errors.TypeError;
var CancellationError = errors.CancellationError;
var TimeoutError = errors.TimeoutError;
var OperationalError = errors.OperationalError;
var originatesFromRejection = errors.originatesFromRejection;
var markAsOriginatingFromRejection = errors.markAsOriginatingFromRejection;
var canAttach = errors.canAttach;
var thrower = util.thrower;
var apiRejection = require("./errors_api_rejection")(Promise);


var makeSelfResolutionError = function Promise$_makeSelfResolutionError() {
    return new TypeError("circular promise resolution chain");
};

function Promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("the promise constructor requires a resolver function");
    }
    if (this.constructor !== Promise) {
        throw new TypeError("the promise constructor cannot be invoked directly");
    }
    this._bitField = 0;
    this._fulfillmentHandler0 = void 0;
    this._rejectionHandler0 = void 0;
    this._promise0 = void 0;
    this._receiver0 = void 0;
    this._settledValue = void 0;
    this._boundTo = void 0;
    if (resolver !== INTERNAL) this._resolveFromResolver(resolver);
}

function returnFirstElement(elements) {
    return elements[0];
}

Promise.prototype.bind = function Promise$bind(thisArg) {
    var maybePromise = cast(thisArg, void 0);
    var ret = new Promise(INTERNAL);
    if (maybePromise instanceof Promise) {
        var binder = maybePromise.then(function(thisArg) {
            ret._setBoundTo(thisArg);
        });
        var p = Promise.all([this, binder]).then(returnFirstElement);
        ret._follow(p);
    } else {
        ret._follow(this);
        ret._setBoundTo(thisArg);
    }
    ret._propagateFrom(this, 2 | 1);
    return ret;
};

Promise.prototype.toString = function Promise$toString() {
    return "[object Promise]";
};

Promise.prototype.caught = Promise.prototype["catch"] =
function Promise$catch(fn) {
    var len = arguments.length;
    if (len > 1) {
        var catchInstances = new Array(len - 1),
            j = 0, i;
        for (i = 0; i < len - 1; ++i) {
            var item = arguments[i];
            if (typeof item === "function") {
                catchInstances[j++] = item;
            } else {
                var catchFilterTypeError =
                    new TypeError(
                        "A catch filter must be an error constructor "
                        + "or a filter function");

                this._attachExtraTrace(catchFilterTypeError);
                async.invoke(this._reject, this, catchFilterTypeError);
                return;
            }
        }
        catchInstances.length = j;
        fn = arguments[i];

        this._resetTrace();
        var catchFilter = new CatchFilter(catchInstances, fn, this);
        return this._then(void 0, catchFilter.doFilter, void 0,
            catchFilter, void 0);
    }
    return this._then(void 0, fn, void 0, void 0, void 0);
};

Promise.prototype.then =
function Promise$then(didFulfill, didReject, didProgress) {
    return this._then(didFulfill, didReject, didProgress,
        void 0, void 0);
};


Promise.prototype.done =
function Promise$done(didFulfill, didReject, didProgress) {
    var promise = this._then(didFulfill, didReject, didProgress,
        void 0, void 0);
    promise._setIsFinal();
};

Promise.prototype.spread = function Promise$spread(didFulfill, didReject) {
    return this._then(didFulfill, didReject, void 0,
        APPLY, void 0);
};

Promise.prototype.isCancellable = function Promise$isCancellable() {
    return !this.isResolved() &&
        this._cancellable();
};

Promise.prototype.toJSON = function Promise$toJSON() {
    var ret = {
        isFulfilled: false,
        isRejected: false,
        fulfillmentValue: void 0,
        rejectionReason: void 0
    };
    if (this.isFulfilled()) {
        ret.fulfillmentValue = this._settledValue;
        ret.isFulfilled = true;
    } else if (this.isRejected()) {
        ret.rejectionReason = this._settledValue;
        ret.isRejected = true;
    }
    return ret;
};

Promise.prototype.all = function Promise$all() {
    return new PromiseArray(this).promise();
};


Promise.is = function Promise$Is(val) {
    return val instanceof Promise;
};

Promise.all = function Promise$All(promises) {
    return new PromiseArray(promises).promise();
};

Promise.prototype.error = function Promise$_error(fn) {
    return this.caught(originatesFromRejection, fn);
};

Promise.prototype._resolveFromSyncValue =
function Promise$_resolveFromSyncValue(value) {
    if (value === errorObj) {
        this._cleanValues();
        this._setRejected();
        this._settledValue = value.e;
        this._ensurePossibleRejectionHandled();
    } else {
        var maybePromise = cast(value, void 0);
        if (maybePromise instanceof Promise) {
            this._follow(maybePromise);
        } else {
            this._cleanValues();
            this._setFulfilled();
            this._settledValue = value;
        }
    }
};

Promise.method = function Promise$_Method(fn) {
    if (typeof fn !== "function") {
        throw new TypeError("fn must be a function");
    }
    return function Promise$_method() {
        var value;
        switch(arguments.length) {
        case 0: value = tryCatch1(fn, this, void 0); break;
        case 1: value = tryCatch1(fn, this, arguments[0]); break;
        case 2: value = tryCatch2(fn, this, arguments[0], arguments[1]); break;
        default:
            var $_len = arguments.length;var args = new Array($_len); for(var $_i = 0; $_i < $_len; ++$_i) {args[$_i] = arguments[$_i];}
            value = tryCatchApply(fn, args, this); break;
        }
        var ret = new Promise(INTERNAL);
        ret._setTrace(void 0);
        ret._resolveFromSyncValue(value);
        return ret;
    };
};

Promise.attempt = Promise["try"] = function Promise$_Try(fn, args, ctx) {
    if (typeof fn !== "function") {
        return apiRejection("fn must be a function");
    }
    var value = isArray(args)
        ? tryCatchApply(fn, args, ctx)
        : tryCatch1(fn, ctx, args);

    var ret = new Promise(INTERNAL);
    ret._setTrace(void 0);
    ret._resolveFromSyncValue(value);
    return ret;
};

Promise.defer = Promise.pending = function Promise$Defer() {
    var promise = new Promise(INTERNAL);
    promise._setTrace(void 0);
    return new PromiseResolver(promise);
};

Promise.bind = function Promise$Bind(thisArg) {
    var maybePromise = cast(thisArg, void 0);
    var ret = new Promise(INTERNAL);
    ret._setTrace(void 0);

    if (maybePromise instanceof Promise) {
        var p = maybePromise.then(function(thisArg) {
            ret._setBoundTo(thisArg);
        });
        ret._follow(p);
    } else {
        ret._setBoundTo(thisArg);
        ret._setFulfilled();
    }
    return ret;
};

Promise.cast = function Promise$_Cast(obj) {
    var ret = cast(obj, void 0);
    if (!(ret instanceof Promise)) {
        var val = ret;
        ret = new Promise(INTERNAL);
        ret._setTrace(void 0);
        ret._setFulfilled();
        ret._cleanValues();
        ret._settledValue = val;
    }
    return ret;
};

Promise.resolve = Promise.fulfilled = Promise.cast;

Promise.reject = Promise.rejected = function Promise$Reject(reason) {
    var ret = new Promise(INTERNAL);
    ret._setTrace(void 0);
    markAsOriginatingFromRejection(reason);
    ret._cleanValues();
    ret._setRejected();
    ret._settledValue = reason;
    if (!canAttach(reason)) {
        var trace = new Error(reason + "");
        ret._setCarriedStackTrace(trace);
    }
    ret._ensurePossibleRejectionHandled();
    return ret;
};

Promise.onPossiblyUnhandledRejection =
function Promise$OnPossiblyUnhandledRejection(fn) {
        CapturedTrace.possiblyUnhandledRejection = typeof fn === "function"
                                                    ? fn : void 0;
};

var unhandledRejectionHandled;
Promise.onUnhandledRejectionHandled =
function Promise$onUnhandledRejectionHandled(fn) {
    unhandledRejectionHandled = typeof fn === "function" ? fn : void 0;
};

var debugging = false || !!(
    typeof process !== "undefined" &&
    typeof process.execPath === "string" &&
    typeof process.env === "object" &&
    (process.env["BLUEBIRD_DEBUG"] ||
        process.env["NODE_ENV"] === "development")
);


Promise.longStackTraces = function Promise$LongStackTraces() {
    if (async.haveItemsQueued() &&
        debugging === false
   ) {
        throw new Error("cannot enable long stack traces after promises have been created");
    }
    debugging = CapturedTrace.isSupported();
};

Promise.hasLongStackTraces = function Promise$HasLongStackTraces() {
    return debugging && CapturedTrace.isSupported();
};

Promise.prototype._then =
function Promise$_then(
    didFulfill,
    didReject,
    didProgress,
    receiver,
    internalData
) {
    var haveInternalData = internalData !== void 0;
    var ret = haveInternalData ? internalData : new Promise(INTERNAL);

    if (!haveInternalData) {
        if (debugging) {
            var haveSameContext = this._peekContext() === this._traceParent;
            ret._traceParent = haveSameContext ? this._traceParent : this;
        }
        ret._propagateFrom(this, 7);
    }

    var callbackIndex =
        this._addCallbacks(didFulfill, didReject, didProgress, ret, receiver);

    if (this.isResolved()) {
        async.invoke(this._queueSettleAt, this, callbackIndex);
    }

    return ret;
};

Promise.prototype._length = function Promise$_length() {
    return this._bitField & 262143;
};

Promise.prototype._isFollowingOrFulfilledOrRejected =
function Promise$_isFollowingOrFulfilledOrRejected() {
    return (this._bitField & 939524096) > 0;
};

Promise.prototype._isFollowing = function Promise$_isFollowing() {
    return (this._bitField & 536870912) === 536870912;
};

Promise.prototype._setLength = function Promise$_setLength(len) {
    this._bitField = (this._bitField & -262144) |
        (len & 262143);
};

Promise.prototype._setFulfilled = function Promise$_setFulfilled() {
    this._bitField = this._bitField | 268435456;
};

Promise.prototype._setRejected = function Promise$_setRejected() {
    this._bitField = this._bitField | 134217728;
};

Promise.prototype._setFollowing = function Promise$_setFollowing() {
    this._bitField = this._bitField | 536870912;
};

Promise.prototype._setIsFinal = function Promise$_setIsFinal() {
    this._bitField = this._bitField | 33554432;
};

Promise.prototype._isFinal = function Promise$_isFinal() {
    return (this._bitField & 33554432) > 0;
};

Promise.prototype._cancellable = function Promise$_cancellable() {
    return (this._bitField & 67108864) > 0;
};

Promise.prototype._setCancellable = function Promise$_setCancellable() {
    this._bitField = this._bitField | 67108864;
};

Promise.prototype._unsetCancellable = function Promise$_unsetCancellable() {
    this._bitField = this._bitField & (~67108864);
};

Promise.prototype._setRejectionIsUnhandled =
function Promise$_setRejectionIsUnhandled() {
    this._bitField = this._bitField | 2097152;
};

Promise.prototype._unsetRejectionIsUnhandled =
function Promise$_unsetRejectionIsUnhandled() {
    this._bitField = this._bitField & (~2097152);
    if (this._isUnhandledRejectionNotified()) {
        this._unsetUnhandledRejectionIsNotified();
        this._notifyUnhandledRejectionIsHandled();
    }
};

Promise.prototype._isRejectionUnhandled =
function Promise$_isRejectionUnhandled() {
    return (this._bitField & 2097152) > 0;
};

Promise.prototype._setUnhandledRejectionIsNotified =
function Promise$_setUnhandledRejectionIsNotified() {
    this._bitField = this._bitField | 524288;
};

Promise.prototype._unsetUnhandledRejectionIsNotified =
function Promise$_unsetUnhandledRejectionIsNotified() {
    this._bitField = this._bitField & (~524288);
};

Promise.prototype._isUnhandledRejectionNotified =
function Promise$_isUnhandledRejectionNotified() {
    return (this._bitField & 524288) > 0;
};

Promise.prototype._setCarriedStackTrace =
function Promise$_setCarriedStackTrace(capturedTrace) {
    this._bitField = this._bitField | 1048576;
    this._fulfillmentHandler0 = capturedTrace;
};

Promise.prototype._unsetCarriedStackTrace =
function Promise$_unsetCarriedStackTrace() {
    this._bitField = this._bitField & (~1048576);
    this._fulfillmentHandler0 = void 0;
};

Promise.prototype._isCarryingStackTrace =
function Promise$_isCarryingStackTrace() {
    return (this._bitField & 1048576) > 0;
};

Promise.prototype._getCarriedStackTrace =
function Promise$_getCarriedStackTrace() {
    return this._isCarryingStackTrace()
        ? this._fulfillmentHandler0
        : void 0;
};

Promise.prototype._receiverAt = function Promise$_receiverAt(index) {
    var ret = index === 0
        ? this._receiver0
        : this[(index << 2) + index - 5 + 4];
    if (this._isBound() && ret === void 0) {
        return this._boundTo;
    }
    return ret;
};

Promise.prototype._promiseAt = function Promise$_promiseAt(index) {
    return index === 0
        ? this._promise0
        : this[(index << 2) + index - 5 + 3];
};

Promise.prototype._fulfillmentHandlerAt =
function Promise$_fulfillmentHandlerAt(index) {
    return index === 0
        ? this._fulfillmentHandler0
        : this[(index << 2) + index - 5 + 0];
};

Promise.prototype._rejectionHandlerAt =
function Promise$_rejectionHandlerAt(index) {
    return index === 0
        ? this._rejectionHandler0
        : this[(index << 2) + index - 5 + 1];
};

Promise.prototype._addCallbacks = function Promise$_addCallbacks(
    fulfill,
    reject,
    progress,
    promise,
    receiver
) {
    var index = this._length();

    if (index >= 262143 - 5) {
        index = 0;
        this._setLength(0);
    }

    if (index === 0) {
        this._promise0 = promise;
        if (receiver !== void 0) this._receiver0 = receiver;
        if (typeof fulfill === "function" && !this._isCarryingStackTrace())
            this._fulfillmentHandler0 = fulfill;
        if (typeof reject === "function") this._rejectionHandler0 = reject;
        if (typeof progress === "function") this._progressHandler0 = progress;
    } else {
        var base = (index << 2) + index - 5;
        this[base + 3] = promise;
        this[base + 4] = receiver;
        this[base + 0] = typeof fulfill === "function"
                                            ? fulfill : void 0;
        this[base + 1] = typeof reject === "function"
                                            ? reject : void 0;
        this[base + 2] = typeof progress === "function"
                                            ? progress : void 0;
    }
    this._setLength(index + 1);
    return index;
};

Promise.prototype._setProxyHandlers =
function Promise$_setProxyHandlers(receiver, promiseSlotValue) {
    var index = this._length();

    if (index >= 262143 - 5) {
        index = 0;
        this._setLength(0);
    }
    if (index === 0) {
        this._promise0 = promiseSlotValue;
        this._receiver0 = receiver;
    } else {
        var base = (index << 2) + index - 5;
        this[base + 3] = promiseSlotValue;
        this[base + 4] = receiver;
        this[base + 0] =
        this[base + 1] =
        this[base + 2] = void 0;
    }
    this._setLength(index + 1);
};

Promise.prototype._proxyPromiseArray =
function Promise$_proxyPromiseArray(promiseArray, index) {
    this._setProxyHandlers(promiseArray, index);
};

Promise.prototype._proxyPromise = function Promise$_proxyPromise(promise) {
    promise._setProxied();
    this._setProxyHandlers(promise, -15);
};

Promise.prototype._setBoundTo = function Promise$_setBoundTo(obj) {
    if (obj !== void 0) {
        this._bitField = this._bitField | 8388608;
        this._boundTo = obj;
    } else {
        this._bitField = this._bitField & (~8388608);
    }
};

Promise.prototype._isBound = function Promise$_isBound() {
    return (this._bitField & 8388608) === 8388608;
};

Promise.prototype._resolveFromResolver =
function Promise$_resolveFromResolver(resolver) {
    var promise = this;
    this._setTrace(void 0);
    this._pushContext();

    function Promise$_resolver(val) {
        if (promise._tryFollow(val)) {
            return;
        }
        promise._fulfill(val);
    }
    function Promise$_rejecter(val) {
        var trace = canAttach(val) ? val : new Error(val + "");
        promise._attachExtraTrace(trace);
        markAsOriginatingFromRejection(val);
        promise._reject(val, trace === val ? void 0 : trace);
    }
    var r = tryCatch2(resolver, void 0, Promise$_resolver, Promise$_rejecter);
    this._popContext();

    if (r !== void 0 && r === errorObj) {
        var e = r.e;
        var trace = canAttach(e) ? e : new Error(e + "");
        promise._reject(e, trace);
    }
};

Promise.prototype._spreadSlowCase =
function Promise$_spreadSlowCase(targetFn, promise, values, boundTo) {
    var promiseForAll = new PromiseArray(values).promise();
    var promise2 = promiseForAll._then(function() {
        return targetFn.apply(boundTo, arguments);
    }, void 0, void 0, APPLY, void 0);
    promise._follow(promise2);
};

Promise.prototype._callSpread =
function Promise$_callSpread(handler, promise, value) {
    var boundTo = this._boundTo;
    if (isArray(value)) {
        for (var i = 0, len = value.length; i < len; ++i) {
            if (cast(value[i], void 0) instanceof Promise) {
                this._spreadSlowCase(handler, promise, value, boundTo);
                return;
            }
        }
    }
    promise._pushContext();
    return tryCatchApply(handler, value, boundTo);
};

Promise.prototype._callHandler =
function Promise$_callHandler(
    handler, receiver, promise, value) {
    var x;
    if (receiver === APPLY && !this.isRejected()) {
        x = this._callSpread(handler, promise, value);
    } else {
        promise._pushContext();
        x = tryCatch1(handler, receiver, value);
    }
    promise._popContext();
    return x;
};

Promise.prototype._settlePromiseFromHandler =
function Promise$_settlePromiseFromHandler(
    handler, receiver, value, promise
) {
    if (!(promise instanceof Promise)) {
        handler.call(receiver, value, promise);
        return;
    }
    var x = this._callHandler(handler, receiver, promise, value);
    if (promise._isFollowing()) return;

    if (x === errorObj || x === promise || x === NEXT_FILTER) {
        var err = x === promise
                    ? makeSelfResolutionError()
                    : x.e;
        var trace = canAttach(err) ? err : new Error(err + "");
        if (x !== NEXT_FILTER) promise._attachExtraTrace(trace);
        promise._rejectUnchecked(err, trace);
    } else {
        var castValue = cast(x, promise);
        if (castValue instanceof Promise) {
            if (castValue.isRejected() &&
                !castValue._isCarryingStackTrace() &&
                !canAttach(castValue._settledValue)) {
                var trace = new Error(castValue._settledValue + "");
                promise._attachExtraTrace(trace);
                castValue._setCarriedStackTrace(trace);
            }
            promise._follow(castValue);
            promise._propagateFrom(castValue, 1);
        } else {
            promise._fulfillUnchecked(x);
        }
    }
};

Promise.prototype._follow =
function Promise$_follow(promise) {
    this._setFollowing();

    if (promise.isPending()) {
        this._propagateFrom(promise, 1);
        promise._proxyPromise(this);
    } else if (promise.isFulfilled()) {
        this._fulfillUnchecked(promise._settledValue);
    } else {
        this._rejectUnchecked(promise._settledValue,
            promise._getCarriedStackTrace());
    }

    if (promise._isRejectionUnhandled()) promise._unsetRejectionIsUnhandled();

    if (debugging &&
        promise._traceParent == null) {
        promise._traceParent = this;
    }
};

Promise.prototype._tryFollow =
function Promise$_tryFollow(value) {
    if (this._isFollowingOrFulfilledOrRejected() ||
        value === this) {
        return false;
    }
    var maybePromise = cast(value, void 0);
    if (!(maybePromise instanceof Promise)) {
        return false;
    }
    this._follow(maybePromise);
    return true;
};

Promise.prototype._resetTrace = function Promise$_resetTrace() {
    if (debugging) {
        this._trace = new CapturedTrace(this._peekContext() === void 0);
    }
};

Promise.prototype._setTrace = function Promise$_setTrace(parent) {
    if (debugging) {
        var context = this._peekContext();
        this._traceParent = context;
        var isTopLevel = context === void 0;
        if (parent !== void 0 &&
            parent._traceParent === context) {
            this._trace = parent._trace;
        } else {
            this._trace = new CapturedTrace(isTopLevel);
        }
    }
    return this;
};

Promise.prototype._attachExtraTrace =
function Promise$_attachExtraTrace(error) {
    if (debugging) {
        var promise = this;
        var stack = error.stack;
        stack = typeof stack === "string" ? stack.split("\n") : [];
        CapturedTrace.protectErrorMessageNewlines(stack);
        var headerLineCount = 1;
        var combinedTraces = 1;
        while(promise != null &&
            promise._trace != null) {
            stack = CapturedTrace.combine(
                stack,
                promise._trace.stack.split("\n")
            );
            promise = promise._traceParent;
            combinedTraces++;
        }

        var stackTraceLimit = Error.stackTraceLimit || 10;
        var max = (stackTraceLimit + headerLineCount) * combinedTraces;
        var len = stack.length;
        if (len > max) {
            stack.length = max;
        }

        if (len > 0)
            stack[0] = stack[0].split("\u0002\u0000\u0001").join("\n");

        if (stack.length <= headerLineCount) {
            error.stack = "(No stack trace)";
        } else {
            error.stack = stack.join("\n");
        }
    }
};

Promise.prototype._cleanValues = function Promise$_cleanValues() {
    if (this._cancellable()) {
        this._cancellationParent = void 0;
    }
};

Promise.prototype._propagateFrom =
function Promise$_propagateFrom(parent, flags) {
    if ((flags & 1) > 0 && parent._cancellable()) {
        this._setCancellable();
        this._cancellationParent = parent;
    }
    if ((flags & 4) > 0) {
        this._setBoundTo(parent._boundTo);
    }
    if ((flags & 2) > 0) {
        this._setTrace(parent);
    }
};

Promise.prototype._fulfill = function Promise$_fulfill(value) {
    if (this._isFollowingOrFulfilledOrRejected()) return;
    this._fulfillUnchecked(value);
};

Promise.prototype._reject =
function Promise$_reject(reason, carriedStackTrace) {
    if (this._isFollowingOrFulfilledOrRejected()) return;
    this._rejectUnchecked(reason, carriedStackTrace);
};

Promise.prototype._settlePromiseAt = function Promise$_settlePromiseAt(index) {
    var handler = this.isFulfilled()
        ? this._fulfillmentHandlerAt(index)
        : this._rejectionHandlerAt(index);

    var value = this._settledValue;
    var receiver = this._receiverAt(index);
    var promise = this._promiseAt(index);

    if (typeof handler === "function") {
        this._settlePromiseFromHandler(handler, receiver, value, promise);
    } else {
        var done = false;
        var isFulfilled = this.isFulfilled();
        if (receiver !== void 0) {
            if (receiver instanceof Promise &&
                receiver._isProxied()) {
                receiver._unsetProxied();

                if (isFulfilled) receiver._fulfillUnchecked(value);
                else receiver._rejectUnchecked(value,
                    this._getCarriedStackTrace());
                done = true;
            } else if (receiver instanceof PromiseArray) {
                if (isFulfilled) receiver._promiseFulfilled(value, promise);
                else receiver._promiseRejected(value, promise);
                done = true;
            }
        }

        if (!done) {
            if (isFulfilled) promise._fulfill(value);
            else promise._reject(value, this._getCarriedStackTrace());
        }
    }

    if (index >= 4) {
        this._queueGC();
    }
};

Promise.prototype._isProxied = function Promise$_isProxied() {
    return (this._bitField & 4194304) === 4194304;
};

Promise.prototype._setProxied = function Promise$_setProxied() {
    this._bitField = this._bitField | 4194304;
};

Promise.prototype._unsetProxied = function Promise$_unsetProxied() {
    this._bitField = this._bitField & (~4194304);
};

Promise.prototype._isGcQueued = function Promise$_isGcQueued() {
    return (this._bitField & -1073741824) === -1073741824;
};

Promise.prototype._setGcQueued = function Promise$_setGcQueued() {
    this._bitField = this._bitField | -1073741824;
};

Promise.prototype._unsetGcQueued = function Promise$_unsetGcQueued() {
    this._bitField = this._bitField & (~-1073741824);
};

Promise.prototype._queueGC = function Promise$_queueGC() {
    if (this._isGcQueued()) return;
    this._setGcQueued();
    async.invokeLater(this._gc, this, void 0);
};

Promise.prototype._gc = function Promise$gc() {
    var len = this._length() * 5 - 5;
    for (var i = 0; i < len; i++) {
        delete this[i];
    }
    this._clearFirstHandlerData();
    this._setLength(0);
    this._unsetGcQueued();
};

Promise.prototype._clearFirstHandlerData =
function Promise$_clearFirstHandlerData() {
    this._fulfillmentHandler0 = void 0;
    this._rejectionHandler0 = void 0;
    this._promise0 = void 0;
    this._receiver0 = void 0;
};

Promise.prototype._queueSettleAt = function Promise$_queueSettleAt(index) {
    if (this._isRejectionUnhandled()) this._unsetRejectionIsUnhandled();
    async.invoke(this._settlePromiseAt, this, index);
};

Promise.prototype._fulfillUnchecked =
function Promise$_fulfillUnchecked(value) {
    if (!this.isPending()) return;
    if (value === this) {
        var err = makeSelfResolutionError();
        this._attachExtraTrace(err);
        return this._rejectUnchecked(err, void 0);
    }
    this._cleanValues();
    this._setFulfilled();
    this._settledValue = value;
    var len = this._length();

    if (len > 0) {
        async.invoke(this._settlePromises, this, len);
    }
};

Promise.prototype._rejectUncheckedCheckError =
function Promise$_rejectUncheckedCheckError(reason) {
    var trace = canAttach(reason) ? reason : new Error(reason + "");
    this._rejectUnchecked(reason, trace === reason ? void 0 : trace);
};

Promise.prototype._rejectUnchecked =
function Promise$_rejectUnchecked(reason, trace) {
    if (!this.isPending()) return;
    if (reason === this) {
        var err = makeSelfResolutionError();
        this._attachExtraTrace(err);
        return this._rejectUnchecked(err);
    }
    this._cleanValues();
    this._setRejected();
    this._settledValue = reason;

    if (this._isFinal()) {
        async.invokeLater(thrower, void 0, trace === void 0 ? reason : trace);
        return;
    }
    var len = this._length();

    if (trace !== void 0) this._setCarriedStackTrace(trace);

    if (len > 0) {
        async.invoke(this._rejectPromises, this, null);
    } else {
        this._ensurePossibleRejectionHandled();
    }
};

Promise.prototype._rejectPromises = function Promise$_rejectPromises() {
    this._settlePromises();
    this._unsetCarriedStackTrace();
};

Promise.prototype._settlePromises = function Promise$_settlePromises() {
    var len = this._length();
    for (var i = 0; i < len; i++) {
        this._settlePromiseAt(i);
    }
};

Promise.prototype._ensurePossibleRejectionHandled =
function Promise$_ensurePossibleRejectionHandled() {
    this._setRejectionIsUnhandled();
    if (CapturedTrace.possiblyUnhandledRejection !== void 0) {
        async.invokeLater(this._notifyUnhandledRejection, this, void 0);
    }
};

Promise.prototype._notifyUnhandledRejectionIsHandled =
function Promise$_notifyUnhandledRejectionIsHandled() {
    if (typeof unhandledRejectionHandled === "function") {
        async.invokeLater(unhandledRejectionHandled, void 0, this);
    }
};

Promise.prototype._notifyUnhandledRejection =
function Promise$_notifyUnhandledRejection() {
    if (this._isRejectionUnhandled()) {
        var reason = this._settledValue;
        var trace = this._getCarriedStackTrace();

        this._setUnhandledRejectionIsNotified();

        if (trace !== void 0) {
            this._unsetCarriedStackTrace();
            reason = trace;
        }
        if (typeof CapturedTrace.possiblyUnhandledRejection === "function") {
            CapturedTrace.possiblyUnhandledRejection(reason, this);
        }
    }
};

var contextStack = [];
Promise.prototype._peekContext = function Promise$_peekContext() {
    var lastIndex = contextStack.length - 1;
    if (lastIndex >= 0) {
        return contextStack[lastIndex];
    }
    return void 0;

};

Promise.prototype._pushContext = function Promise$_pushContext() {
    if (!debugging) return;
    contextStack.push(this);
};

Promise.prototype._popContext = function Promise$_popContext() {
    if (!debugging) return;
    contextStack.pop();
};

Promise.noConflict = function Promise$NoConflict() {
    return noConflict(Promise);
};

Promise.setScheduler = function(fn) {
    if (typeof fn !== "function") throw new TypeError("fn must be a function");
    async._schedule = fn;
};

if (!CapturedTrace.isSupported()) {
    Promise.longStackTraces = function(){};
    debugging = false;
}

Promise._makeSelfResolutionError = makeSelfResolutionError;
require("./finally.js")(Promise, NEXT_FILTER, cast);
require("./direct_resolve.js")(Promise);
require("./synchronous_inspection.js")(Promise);
require("./join.js")(Promise, PromiseArray, cast, INTERNAL);
Promise.RangeError = RangeError;
Promise.CancellationError = CancellationError;
Promise.TimeoutError = TimeoutError;
Promise.TypeError = TypeError;
Promise.OperationalError = OperationalError;
Promise.RejectionError = OperationalError;
Promise.AggregateError = errors.AggregateError;

util.toFastProperties(Promise);
util.toFastProperties(Promise.prototype);
Promise.Promise = Promise;
require('./timers.js')(Promise,INTERNAL,cast);
require('./race.js')(Promise,INTERNAL,cast);
require('./call_get.js')(Promise);
require('./generators.js')(Promise,apiRejection,INTERNAL,cast);
require('./map.js')(Promise,PromiseArray,apiRejection,cast,INTERNAL);
require('./nodeify.js')(Promise);
require('./promisify.js')(Promise,INTERNAL);
require('./props.js')(Promise,PromiseArray,cast);
require('./reduce.js')(Promise,PromiseArray,apiRejection,cast,INTERNAL);
require('./settle.js')(Promise,PromiseArray);
require('./some.js')(Promise,PromiseArray,apiRejection);
require('./progress.js')(Promise,PromiseArray);
require('./cancel.js')(Promise,INTERNAL);
require('./filter.js')(Promise,INTERNAL);
require('./any.js')(Promise,PromiseArray);
require('./each.js')(Promise,INTERNAL);
require('./using.js')(Promise,apiRejection,cast);

Promise.prototype = Promise.prototype;
return Promise;

};

}).call(this,require('_process'))
},{"./any.js":10,"./async.js":11,"./call_get.js":13,"./cancel.js":14,"./captured_trace.js":15,"./catch_filter.js":16,"./direct_resolve.js":17,"./each.js":18,"./errors.js":19,"./errors_api_rejection":20,"./filter.js":22,"./finally.js":23,"./generators.js":24,"./join.js":25,"./map.js":26,"./nodeify.js":27,"./progress.js":28,"./promise_array.js":30,"./promise_resolver.js":31,"./promisify.js":32,"./props.js":33,"./race.js":35,"./reduce.js":36,"./settle.js":38,"./some.js":39,"./synchronous_inspection.js":40,"./thenables.js":41,"./timers.js":42,"./using.js":43,"./util.js":44,"_process":46}],30:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise, INTERNAL, cast) {
var canAttach = require("./errors.js").canAttach;
var util = require("./util.js");
var isArray = util.isArray;

function toResolutionValue(val) {
    switch(val) {
    case -1: return void 0;
    case -2: return [];
    case -3: return {};
    }
}

function PromiseArray(values) {
    var promise = this._promise = new Promise(INTERNAL);
    var parent = void 0;
    if (values instanceof Promise) {
        parent = values;
        promise._propagateFrom(parent, 1 | 4);
    }
    promise._setTrace(parent);
    this._values = values;
    this._length = 0;
    this._totalResolved = 0;
    this._init(void 0, -2);
}
PromiseArray.prototype.length = function PromiseArray$length() {
    return this._length;
};

PromiseArray.prototype.promise = function PromiseArray$promise() {
    return this._promise;
};

PromiseArray.prototype._init =
function PromiseArray$_init(_, resolveValueIfEmpty) {
    var values = cast(this._values, void 0);
    if (values instanceof Promise) {
        this._values = values;
        values._setBoundTo(this._promise._boundTo);
        if (values.isFulfilled()) {
            values = values._settledValue;
            if (!isArray(values)) {
                var err = new Promise.TypeError("expecting an array, a promise or a thenable");
                this.__hardReject__(err);
                return;
            }
        } else if (values.isPending()) {
            values._then(
                PromiseArray$_init,
                this._reject,
                void 0,
                this,
                resolveValueIfEmpty
           );
            return;
        } else {
            values._unsetRejectionIsUnhandled();
            this._reject(values._settledValue);
            return;
        }
    } else if (!isArray(values)) {
        var err = new Promise.TypeError("expecting an array, a promise or a thenable");
        this.__hardReject__(err);
        return;
    }

    if (values.length === 0) {
        if (resolveValueIfEmpty === -5) {
            this._resolveEmptyArray();
        }
        else {
            this._resolve(toResolutionValue(resolveValueIfEmpty));
        }
        return;
    }
    var len = this.getActualLength(values.length);
    var newLen = len;
    var newValues = this.shouldCopyValues() ? new Array(len) : this._values;
    var isDirectScanNeeded = false;
    for (var i = 0; i < len; ++i) {
        var maybePromise = cast(values[i], void 0);
        if (maybePromise instanceof Promise) {
            if (maybePromise.isPending()) {
                maybePromise._proxyPromiseArray(this, i);
            } else {
                maybePromise._unsetRejectionIsUnhandled();
                isDirectScanNeeded = true;
            }
        } else {
            isDirectScanNeeded = true;
        }
        newValues[i] = maybePromise;
    }
    this._values = newValues;
    this._length = newLen;
    if (isDirectScanNeeded) {
        this._scanDirectValues(len);
    }
};

PromiseArray.prototype._settlePromiseAt =
function PromiseArray$_settlePromiseAt(index) {
    var value = this._values[index];
    if (!(value instanceof Promise)) {
        this._promiseFulfilled(value, index);
    } else if (value.isFulfilled()) {
        this._promiseFulfilled(value._settledValue, index);
    } else if (value.isRejected()) {
        this._promiseRejected(value._settledValue, index);
    }
};

PromiseArray.prototype._scanDirectValues =
function PromiseArray$_scanDirectValues(len) {
    for (var i = 0; i < len; ++i) {
        if (this._isResolved()) {
            break;
        }
        this._settlePromiseAt(i);
    }
};

PromiseArray.prototype._isResolved = function PromiseArray$_isResolved() {
    return this._values === null;
};

PromiseArray.prototype._resolve = function PromiseArray$_resolve(value) {
    this._values = null;
    this._promise._fulfill(value);
};

PromiseArray.prototype.__hardReject__ =
PromiseArray.prototype._reject = function PromiseArray$_reject(reason) {
    this._values = null;
    var trace = canAttach(reason) ? reason : new Error(reason + "");
    this._promise._attachExtraTrace(trace);
    this._promise._reject(reason, trace);
};

PromiseArray.prototype._promiseProgressed =
function PromiseArray$_promiseProgressed(progressValue, index) {
    if (this._isResolved()) return;
    this._promise._progress({
        index: index,
        value: progressValue
    });
};


PromiseArray.prototype._promiseFulfilled =
function PromiseArray$_promiseFulfilled(value, index) {
    if (this._isResolved()) return;
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
    }
};

PromiseArray.prototype._promiseRejected =
function PromiseArray$_promiseRejected(reason, index) {
    if (this._isResolved()) return;
    this._totalResolved++;
    this._reject(reason);
};

PromiseArray.prototype.shouldCopyValues =
function PromiseArray$_shouldCopyValues() {
    return true;
};

PromiseArray.prototype.getActualLength =
function PromiseArray$getActualLength(len) {
    return len;
};

return PromiseArray;
};

},{"./errors.js":19,"./util.js":44}],31:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
var util = require("./util.js");
var maybeWrapAsError = util.maybeWrapAsError;
var errors = require("./errors.js");
var TimeoutError = errors.TimeoutError;
var OperationalError = errors.OperationalError;
var async = require("./async.js");
var haveGetters = util.haveGetters;
var es5 = require("./es5.js");

function isUntypedError(obj) {
    return obj instanceof Error &&
        es5.getPrototypeOf(obj) === Error.prototype;
}

function wrapAsOperationalError(obj) {
    var ret;
    if (isUntypedError(obj)) {
        ret = new OperationalError(obj);
    } else {
        ret = obj;
    }
    errors.markAsOriginatingFromRejection(ret);
    return ret;
}

function nodebackForPromise(promise) {
    function PromiseResolver$_callback(err, value) {
        if (promise === null) return;

        if (err) {
            var wrapped = wrapAsOperationalError(maybeWrapAsError(err));
            promise._attachExtraTrace(wrapped);
            promise._reject(wrapped);
        } else if (arguments.length > 2) {
            var $_len = arguments.length;var args = new Array($_len - 1); for(var $_i = 1; $_i < $_len; ++$_i) {args[$_i - 1] = arguments[$_i];}
            promise._fulfill(args);
        } else {
            promise._fulfill(value);
        }

        promise = null;
    }
    return PromiseResolver$_callback;
}


var PromiseResolver;
if (!haveGetters) {
    PromiseResolver = function PromiseResolver(promise) {
        this.promise = promise;
        this.asCallback = nodebackForPromise(promise);
        this.callback = this.asCallback;
    };
}
else {
    PromiseResolver = function PromiseResolver(promise) {
        this.promise = promise;
    };
}
if (haveGetters) {
    var prop = {
        get: function() {
            return nodebackForPromise(this.promise);
        }
    };
    es5.defineProperty(PromiseResolver.prototype, "asCallback", prop);
    es5.defineProperty(PromiseResolver.prototype, "callback", prop);
}

PromiseResolver._nodebackForPromise = nodebackForPromise;

PromiseResolver.prototype.toString = function PromiseResolver$toString() {
    return "[object PromiseResolver]";
};

PromiseResolver.prototype.resolve =
PromiseResolver.prototype.fulfill = function PromiseResolver$resolve(value) {
    if (!(this instanceof PromiseResolver)) {
        throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");
    }

    var promise = this.promise;
    if (promise._tryFollow(value)) {
        return;
    }
    async.invoke(promise._fulfill, promise, value);
};

PromiseResolver.prototype.reject = function PromiseResolver$reject(reason) {
    if (!(this instanceof PromiseResolver)) {
        throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");
    }

    var promise = this.promise;
    errors.markAsOriginatingFromRejection(reason);
    var trace = errors.canAttach(reason) ? reason : new Error(reason + "");
    promise._attachExtraTrace(trace);
    async.invoke(promise._reject, promise, reason);
    if (trace !== reason) {
        async.invoke(this._setCarriedStackTrace, this, trace);
    }
};

PromiseResolver.prototype.progress =
function PromiseResolver$progress(value) {
    if (!(this instanceof PromiseResolver)) {
        throw new TypeError("Illegal invocation, resolver resolve/reject must be called within a resolver context. Consider using the promise constructor instead.");
    }
    async.invoke(this.promise._progress, this.promise, value);
};

PromiseResolver.prototype.cancel = function PromiseResolver$cancel() {
    async.invoke(this.promise.cancel, this.promise, void 0);
};

PromiseResolver.prototype.timeout = function PromiseResolver$timeout() {
    this.reject(new TimeoutError("timeout"));
};

PromiseResolver.prototype.isResolved = function PromiseResolver$isResolved() {
    return this.promise.isResolved();
};

PromiseResolver.prototype.toJSON = function PromiseResolver$toJSON() {
    return this.promise.toJSON();
};

PromiseResolver.prototype._setCarriedStackTrace =
function PromiseResolver$_setCarriedStackTrace(trace) {
    if (this.promise.isRejected()) {
        this.promise._setCarriedStackTrace(trace);
    }
};

module.exports = PromiseResolver;

},{"./async.js":11,"./errors.js":19,"./es5.js":21,"./util.js":44}],32:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise, INTERNAL) {
var THIS = {};
var util = require("./util.js");
var nodebackForPromise = require("./promise_resolver.js")
    ._nodebackForPromise;
var withAppended = util.withAppended;
var maybeWrapAsError = util.maybeWrapAsError;
var canEvaluate = util.canEvaluate;
var TypeError = require("./errors").TypeError;
var defaultSuffix = "Async";
var defaultFilter = function(name, func) {
    return util.isIdentifier(name) &&
        name.charAt(0) !== "_" &&
        !util.isClass(func);
};
var defaultPromisified = {__isPromisified__: true};


function escapeIdentRegex(str) {
    return str.replace(/([$])/, "\\$");
}

function isPromisified(fn) {
    try {
        return fn.__isPromisified__ === true;
    }
    catch (e) {
        return false;
    }
}

function hasPromisified(obj, key, suffix) {
    var val = util.getDataPropertyOrDefault(obj, key + suffix,
                                            defaultPromisified);
    return val ? isPromisified(val) : false;
}
function checkValid(ret, suffix, suffixRegexp) {
    for (var i = 0; i < ret.length; i += 2) {
        var key = ret[i];
        if (suffixRegexp.test(key)) {
            var keyWithoutAsyncSuffix = key.replace(suffixRegexp, "");
            for (var j = 0; j < ret.length; j += 2) {
                if (ret[j] === keyWithoutAsyncSuffix) {
                    throw new TypeError("Cannot promisify an API " +
                        "that has normal methods with '"+suffix+"'-suffix");
                }
            }
        }
    }
}

function promisifiableMethods(obj, suffix, suffixRegexp, filter) {
    var keys = util.inheritedDataKeys(obj);
    var ret = [];
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var value = obj[key];
        if (typeof value === "function" &&
            !isPromisified(value) &&
            !hasPromisified(obj, key, suffix) &&
            filter(key, value, obj)) {
            ret.push(key, value);
        }
    }
    checkValid(ret, suffix, suffixRegexp);
    return ret;
}

function switchCaseArgumentOrder(likelyArgumentCount) {
    var ret = [likelyArgumentCount];
    var min = Math.max(0, likelyArgumentCount - 1 - 5);
    for(var i = likelyArgumentCount - 1; i >= min; --i) {
        if (i === likelyArgumentCount) continue;
        ret.push(i);
    }
    for(var i = likelyArgumentCount + 1; i <= 5; ++i) {
        ret.push(i);
    }
    return ret;
}

function argumentSequence(argumentCount) {
    return util.filledRange(argumentCount, "arguments[", "]");
}

function parameterDeclaration(parameterCount) {
    return util.filledRange(parameterCount, "_arg", "");
}

function parameterCount(fn) {
    if (typeof fn.length === "number") {
        return Math.max(Math.min(fn.length, 1023 + 1), 0);
    }
    return 0;
}

function generatePropertyAccess(key) {
    if (util.isIdentifier(key)) {
        return "." + key;
    }
    else return "['" + key.replace(/(['\\])/g, "\\$1") + "']";
}

function makeNodePromisifiedEval(callback, receiver, originalName, fn, suffix) {
    var newParameterCount = Math.max(0, parameterCount(fn) - 1);
    var argumentOrder = switchCaseArgumentOrder(newParameterCount);
    var callbackName =
        (typeof originalName === "string" && util.isIdentifier(originalName)
            ? originalName + suffix
            : "promisified");

    function generateCallForArgumentCount(count) {
        var args = argumentSequence(count).join(", ");
        var comma = count > 0 ? ", " : "";
        var ret;
        if (typeof callback === "string") {
            ret = "                                                          \n\
                this.method(args, fn);                                       \n\
                break;                                                       \n\
            ".replace(".method", generatePropertyAccess(callback));
        } else if (receiver === THIS) {
            ret =  "                                                         \n\
                callback.call(this, args, fn);                               \n\
                break;                                                       \n\
            ";
        } else if (receiver !== void 0) {
            ret =  "                                                         \n\
                callback.call(receiver, args, fn);                           \n\
                break;                                                       \n\
            ";
        } else {
            ret =  "                                                         \n\
                callback(args, fn);                                          \n\
                break;                                                       \n\
            ";
        }
        return ret.replace("args", args).replace(", ", comma);
    }

    function generateArgumentSwitchCase() {
        var ret = "";
        for(var i = 0; i < argumentOrder.length; ++i) {
            ret += "case " + argumentOrder[i] +":" +
                generateCallForArgumentCount(argumentOrder[i]);
        }
        var codeForCall;
        if (typeof callback === "string") {
            codeForCall = "                                                  \n\
                this.property.apply(this, args);                             \n\
            "
                .replace(".property", generatePropertyAccess(callback));
        } else if (receiver === THIS) {
            codeForCall = "                                                  \n\
                callback.apply(this, args);                                  \n\
            ";
        } else {
            codeForCall = "                                                  \n\
                callback.apply(receiver, args);                              \n\
            ";
        }

        ret += "                                                             \n\
        default:                                                             \n\
            var args = new Array(len + 1);                                   \n\
            var i = 0;                                                       \n\
            for (var i = 0; i < len; ++i) {                                  \n\
               args[i] = arguments[i];                                       \n\
            }                                                                \n\
            args[i] = fn;                                                    \n\
            [CodeForCall]                                                    \n\
            break;                                                           \n\
        ".replace("[CodeForCall]", codeForCall);
        return ret;
    }

    return new Function("Promise",
                        "callback",
                        "receiver",
                        "withAppended",
                        "maybeWrapAsError",
                        "nodebackForPromise",
                        "INTERNAL","                                         \n\
        var ret = function FunctionName(Parameters) {                        \n\
            'use strict';                                                    \n\
            var len = arguments.length;                                      \n\
            var promise = new Promise(INTERNAL);                             \n\
            promise._setTrace(void 0);                                       \n\
            var fn = nodebackForPromise(promise);                            \n\
            try {                                                            \n\
                switch(len) {                                                \n\
                    [CodeForSwitchCase]                                      \n\
                }                                                            \n\
            } catch (e) {                                                    \n\
                var wrapped = maybeWrapAsError(e);                           \n\
                promise._attachExtraTrace(wrapped);                          \n\
                promise._reject(wrapped);                                    \n\
            }                                                                \n\
            return promise;                                                  \n\
        };                                                                   \n\
        ret.__isPromisified__ = true;                                        \n\
        return ret;                                                          \n\
        "
        .replace("FunctionName", callbackName)
        .replace("Parameters", parameterDeclaration(newParameterCount))
        .replace("[CodeForSwitchCase]", generateArgumentSwitchCase()))(
            Promise,
            callback,
            receiver,
            withAppended,
            maybeWrapAsError,
            nodebackForPromise,
            INTERNAL
        );
}

function makeNodePromisifiedClosure(callback, receiver) {
    function promisified() {
        var _receiver = receiver;
        if (receiver === THIS) _receiver = this;
        if (typeof callback === "string") {
            callback = _receiver[callback];
        }
        var promise = new Promise(INTERNAL);
        promise._setTrace(void 0);
        var fn = nodebackForPromise(promise);
        try {
            callback.apply(_receiver, withAppended(arguments, fn));
        } catch(e) {
            var wrapped = maybeWrapAsError(e);
            promise._attachExtraTrace(wrapped);
            promise._reject(wrapped);
        }
        return promise;
    }
    promisified.__isPromisified__ = true;
    return promisified;
}

var makeNodePromisified = canEvaluate
    ? makeNodePromisifiedEval
    : makeNodePromisifiedClosure;

function promisifyAll(obj, suffix, filter, promisifier) {
    var suffixRegexp = new RegExp(escapeIdentRegex(suffix) + "$");
    var methods =
        promisifiableMethods(obj, suffix, suffixRegexp, filter);

    for (var i = 0, len = methods.length; i < len; i+= 2) {
        var key = methods[i];
        var fn = methods[i+1];
        var promisifiedKey = key + suffix;
        obj[promisifiedKey] = promisifier === makeNodePromisified
                ? makeNodePromisified(key, THIS, key, fn, suffix)
                : promisifier(fn);
    }
    util.toFastProperties(obj);
    return obj;
}

function promisify(callback, receiver) {
    return makeNodePromisified(callback, receiver, void 0, callback);
}

Promise.promisify = function Promise$Promisify(fn, receiver) {
    if (typeof fn !== "function") {
        throw new TypeError("fn must be a function");
    }
    if (isPromisified(fn)) {
        return fn;
    }
    return promisify(fn, arguments.length < 2 ? THIS : receiver);
};

Promise.promisifyAll = function Promise$PromisifyAll(target, options) {
    if (typeof target !== "function" && typeof target !== "object") {
        throw new TypeError("the target of promisifyAll must be an object or a function");
    }
    options = Object(options);
    var suffix = options.suffix;
    if (typeof suffix !== "string") suffix = defaultSuffix;
    var filter = options.filter;
    if (typeof filter !== "function") filter = defaultFilter;
    var promisifier = options.promisifier;
    if (typeof promisifier !== "function") promisifier = makeNodePromisified;

    if (!util.isIdentifier(suffix)) {
        throw new RangeError("suffix must be a valid identifier");
    }

    var keys = util.inheritedDataKeys(target, {includeHidden: true});
    for (var i = 0; i < keys.length; ++i) {
        var value = target[keys[i]];
        if (keys[i] !== "constructor" &&
            util.isClass(value)) {
            promisifyAll(value.prototype, suffix, filter, promisifier);
            promisifyAll(value, suffix, filter, promisifier);
        }
    }

    return promisifyAll(target, suffix, filter, promisifier);
};
};


},{"./errors":19,"./promise_resolver.js":31,"./util.js":44}],33:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise, PromiseArray, cast) {
var util = require("./util.js");
var apiRejection = require("./errors_api_rejection")(Promise);
var isObject = util.isObject;
var es5 = require("./es5.js");

function PropertiesPromiseArray(obj) {
    var keys = es5.keys(obj);
    var len = keys.length;
    var values = new Array(len * 2);
    for (var i = 0; i < len; ++i) {
        var key = keys[i];
        values[i] = obj[key];
        values[i + len] = key;
    }
    this.constructor$(values);
}
util.inherits(PropertiesPromiseArray, PromiseArray);

PropertiesPromiseArray.prototype._init =
function PropertiesPromiseArray$_init() {
    this._init$(void 0, -3) ;
};

PropertiesPromiseArray.prototype._promiseFulfilled =
function PropertiesPromiseArray$_promiseFulfilled(value, index) {
    if (this._isResolved()) return;
    this._values[index] = value;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        var val = {};
        var keyOffset = this.length();
        for (var i = 0, len = this.length(); i < len; ++i) {
            val[this._values[i + keyOffset]] = this._values[i];
        }
        this._resolve(val);
    }
};

PropertiesPromiseArray.prototype._promiseProgressed =
function PropertiesPromiseArray$_promiseProgressed(value, index) {
    if (this._isResolved()) return;

    this._promise._progress({
        key: this._values[index + this.length()],
        value: value
    });
};

PropertiesPromiseArray.prototype.shouldCopyValues =
function PropertiesPromiseArray$_shouldCopyValues() {
    return false;
};

PropertiesPromiseArray.prototype.getActualLength =
function PropertiesPromiseArray$getActualLength(len) {
    return len >> 1;
};

function Promise$_Props(promises) {
    var ret;
    var castValue = cast(promises, void 0);

    if (!isObject(castValue)) {
        return apiRejection("cannot await properties of a non-object");
    } else if (castValue instanceof Promise) {
        ret = castValue._then(Promise.props, void 0, void 0, void 0, void 0);
    } else {
        ret = new PropertiesPromiseArray(castValue).promise();
    }

    if (castValue instanceof Promise) {
        ret._propagateFrom(castValue, 4);
    }
    return ret;
}

Promise.prototype.props = function Promise$props() {
    return Promise$_Props(this);
};

Promise.props = function Promise$Props(promises) {
    return Promise$_Props(promises);
};
};

},{"./errors_api_rejection":20,"./es5.js":21,"./util.js":44}],34:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
function arrayCopy(src, srcIndex, dst, dstIndex, len) {
    for (var j = 0; j < len; ++j) {
        dst[j + dstIndex] = src[j + srcIndex];
    }
}

function Queue(capacity) {
    this._capacity = capacity;
    this._length = 0;
    this._front = 0;
    this._makeCapacity();
}

Queue.prototype._willBeOverCapacity =
function Queue$_willBeOverCapacity(size) {
    return this._capacity < size;
};

Queue.prototype._pushOne = function Queue$_pushOne(arg) {
    var length = this.length();
    this._checkCapacity(length + 1);
    var i = (this._front + length) & (this._capacity - 1);
    this[i] = arg;
    this._length = length + 1;
};

Queue.prototype.push = function Queue$push(fn, receiver, arg) {
    var length = this.length() + 3;
    if (this._willBeOverCapacity(length)) {
        this._pushOne(fn);
        this._pushOne(receiver);
        this._pushOne(arg);
        return;
    }
    var j = this._front + length - 3;
    this._checkCapacity(length);
    var wrapMask = this._capacity - 1;
    this[(j + 0) & wrapMask] = fn;
    this[(j + 1) & wrapMask] = receiver;
    this[(j + 2) & wrapMask] = arg;
    this._length = length;
};

Queue.prototype.shift = function Queue$shift() {
    var front = this._front,
        ret = this[front];

    this[front] = void 0;
    this._front = (front + 1) & (this._capacity - 1);
    this._length--;
    return ret;
};

Queue.prototype.length = function Queue$length() {
    return this._length;
};

Queue.prototype._makeCapacity = function Queue$_makeCapacity() {
    var len = this._capacity;
    for (var i = 0; i < len; ++i) {
        this[i] = void 0;
    }
};

Queue.prototype._checkCapacity = function Queue$_checkCapacity(size) {
    if (this._capacity < size) {
        this._resizeTo(this._capacity << 3);
    }
};

Queue.prototype._resizeTo = function Queue$_resizeTo(capacity) {
    var oldFront = this._front;
    var oldCapacity = this._capacity;
    var oldQueue = new Array(oldCapacity);
    var length = this.length();

    arrayCopy(this, 0, oldQueue, 0, oldCapacity);
    this._capacity = capacity;
    this._makeCapacity();
    this._front = 0;
    if (oldFront + length <= oldCapacity) {
        arrayCopy(oldQueue, oldFront, this, 0, length);
    } else {        var lengthBeforeWrapping =
            length - ((oldFront + length) & (oldCapacity - 1));

        arrayCopy(oldQueue, oldFront, this, 0, lengthBeforeWrapping);
        arrayCopy(oldQueue, 0, this, lengthBeforeWrapping,
                    length - lengthBeforeWrapping);
    }
};

module.exports = Queue;

},{}],35:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise, INTERNAL, cast) {
var apiRejection = require("./errors_api_rejection.js")(Promise);
var isArray = require("./util.js").isArray;

var raceLater = function Promise$_raceLater(promise) {
    return promise.then(function(array) {
        return Promise$_Race(array, promise);
    });
};

var hasOwn = {}.hasOwnProperty;
function Promise$_Race(promises, parent) {
    var maybePromise = cast(promises, void 0);

    if (maybePromise instanceof Promise) {
        return raceLater(maybePromise);
    } else if (!isArray(promises)) {
        return apiRejection("expecting an array, a promise or a thenable");
    }

    var ret = new Promise(INTERNAL);
    if (parent !== void 0) {
        ret._propagateFrom(parent, 7);
    } else {
        ret._setTrace(void 0);
    }
    var fulfill = ret._fulfill;
    var reject = ret._reject;
    for (var i = 0, len = promises.length; i < len; ++i) {
        var val = promises[i];

        if (val === void 0 && !(hasOwn.call(promises, i))) {
            continue;
        }

        Promise.cast(val)._then(fulfill, reject, void 0, ret, null);
    }
    return ret;
}

Promise.race = function Promise$Race(promises) {
    return Promise$_Race(promises, void 0);
};

Promise.prototype.race = function Promise$race() {
    return Promise$_Race(this, void 0);
};

};

},{"./errors_api_rejection.js":20,"./util.js":44}],36:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise, PromiseArray, apiRejection, cast, INTERNAL) {
var util = require("./util.js");
var tryCatch4 = util.tryCatch4;
var tryCatch3 = util.tryCatch3;
var errorObj = util.errorObj;
function ReductionPromiseArray(promises, fn, accum, _each) {
    this.constructor$(promises);
    this._preservedValues = _each === INTERNAL ? [] : null;
    this._zerothIsAccum = (accum === void 0);
    this._gotAccum = false;
    this._reducingIndex = (this._zerothIsAccum ? 1 : 0);
    this._valuesPhase = undefined;

    var maybePromise = cast(accum, void 0);
    var rejected = false;
    var isPromise = maybePromise instanceof Promise;
    if (isPromise) {
        if (maybePromise.isPending()) {
            maybePromise._proxyPromiseArray(this, -1);
        } else if (maybePromise.isFulfilled()) {
            accum = maybePromise.value();
            this._gotAccum = true;
        } else {
            maybePromise._unsetRejectionIsUnhandled();
            this._reject(maybePromise.reason());
            rejected = true;
        }
    }
    if (!(isPromise || this._zerothIsAccum)) this._gotAccum = true;
    this._callback = fn;
    this._accum = accum;
    if (!rejected) this._init$(void 0, -5);
}
util.inherits(ReductionPromiseArray, PromiseArray);

ReductionPromiseArray.prototype._init =
function ReductionPromiseArray$_init() {};

ReductionPromiseArray.prototype._resolveEmptyArray =
function ReductionPromiseArray$_resolveEmptyArray() {
    if (this._gotAccum || this._zerothIsAccum) {
        this._resolve(this._preservedValues !== null
                        ? [] : this._accum);
    }
};

ReductionPromiseArray.prototype._promiseFulfilled =
function ReductionPromiseArray$_promiseFulfilled(value, index) {
    var values = this._values;
    if (values === null) return;
    var length = this.length();
    var preservedValues = this._preservedValues;
    var isEach = preservedValues !== null;
    var gotAccum = this._gotAccum;
    var valuesPhase = this._valuesPhase;
    var valuesPhaseIndex;
    if (!valuesPhase) {
        valuesPhase = this._valuesPhase = Array(length);
        for (valuesPhaseIndex=0; valuesPhaseIndex<length; ++valuesPhaseIndex) {
            valuesPhase[valuesPhaseIndex] = 0;
        }
    }
    valuesPhaseIndex = valuesPhase[index];

    if (index === 0 && this._zerothIsAccum) {
        if (!gotAccum) {
            this._accum = value;
            this._gotAccum = gotAccum = true;
        }
        valuesPhase[index] = ((valuesPhaseIndex === 0)
            ? 1 : 2);
    } else if (index === -1) {
        if (!gotAccum) {
            this._accum = value;
            this._gotAccum = gotAccum = true;
        }
    } else {
        if (valuesPhaseIndex === 0) {
            valuesPhase[index] = 1;
        }
        else {
            valuesPhase[index] = 2;
            if (gotAccum) {
                this._accum = value;
            }
        }
    }
    if (!gotAccum) return;

    var callback = this._callback;
    var receiver = this._promise._boundTo;
    var ret;

    for (var i = this._reducingIndex; i < length; ++i) {
        valuesPhaseIndex = valuesPhase[i];
        if (valuesPhaseIndex === 2) {
            this._reducingIndex = i + 1;
            continue;
        }
        if (valuesPhaseIndex !== 1) return;

        value = values[i];
        if (value instanceof Promise) {
            if (value.isFulfilled()) {
                value = value._settledValue;
            } else if (value.isPending()) {
                return;
            } else {
                value._unsetRejectionIsUnhandled();
                return this._reject(value.reason());
            }
        }

        if (isEach) {
            preservedValues.push(value);
            ret = tryCatch3(callback, receiver, value, i, length);
        }
        else {
            ret = tryCatch4(callback, receiver, this._accum, value, i, length);
        }

        if (ret === errorObj) return this._reject(ret.e);

        var maybePromise = cast(ret, void 0);
        if (maybePromise instanceof Promise) {
            if (maybePromise.isPending()) {
                valuesPhase[i] = 4;
                return maybePromise._proxyPromiseArray(this, i);
            } else if (maybePromise.isFulfilled()) {
                ret = maybePromise.value();
            } else {
                maybePromise._unsetRejectionIsUnhandled();
                return this._reject(maybePromise.reason());
            }
        }

        this._reducingIndex = i + 1;
        this._accum = ret;
    }

    if (this._reducingIndex < length) return;
    this._resolve(isEach ? preservedValues : this._accum);
};

function reduce(promises, fn, initialValue, _each) {
    if (typeof fn !== "function") return apiRejection("fn must be a function");
    var array = new ReductionPromiseArray(promises, fn, initialValue, _each);
    return array.promise();
}

Promise.prototype.reduce = function Promise$reduce(fn, initialValue) {
    return reduce(this, fn, initialValue, null);
};

Promise.reduce = function Promise$Reduce(promises, fn, initialValue, _each) {
    return reduce(promises, fn, initialValue, _each);
};
};

},{"./util.js":44}],37:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
var schedule;
var _MutationObserver;
if (typeof process === "object" && typeof process.version === "string") {
    schedule = function Promise$_Scheduler(fn) {
        process.nextTick(fn);
    };
}
else if ((typeof MutationObserver !== "undefined" &&
         (_MutationObserver = MutationObserver)) ||
         (typeof WebKitMutationObserver !== "undefined" &&
         (_MutationObserver = WebKitMutationObserver))) {
    schedule = (function() {
        var div = document.createElement("div");
        var queuedFn = void 0;
        var observer = new _MutationObserver(
            function Promise$_Scheduler() {
                var fn = queuedFn;
                queuedFn = void 0;
                fn();
            }
       );
        observer.observe(div, {
            attributes: true
        });
        return function Promise$_Scheduler(fn) {
            queuedFn = fn;
            div.classList.toggle("foo");
        };

    })();
}
else if (typeof setTimeout !== "undefined") {
    schedule = function Promise$_Scheduler(fn) {
        setTimeout(fn, 0);
    };
}
else throw new Error("no async scheduler available");
module.exports = schedule;

}).call(this,require('_process'))
},{"_process":46}],38:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports =
    function(Promise, PromiseArray) {
var PromiseInspection = Promise.PromiseInspection;
var util = require("./util.js");

function SettledPromiseArray(values) {
    this.constructor$(values);
}
util.inherits(SettledPromiseArray, PromiseArray);

SettledPromiseArray.prototype._promiseResolved =
function SettledPromiseArray$_promiseResolved(index, inspection) {
    this._values[index] = inspection;
    var totalResolved = ++this._totalResolved;
    if (totalResolved >= this._length) {
        this._resolve(this._values);
    }
};

SettledPromiseArray.prototype._promiseFulfilled =
function SettledPromiseArray$_promiseFulfilled(value, index) {
    if (this._isResolved()) return;
    var ret = new PromiseInspection();
    ret._bitField = 268435456;
    ret._settledValue = value;
    this._promiseResolved(index, ret);
};
SettledPromiseArray.prototype._promiseRejected =
function SettledPromiseArray$_promiseRejected(reason, index) {
    if (this._isResolved()) return;
    var ret = new PromiseInspection();
    ret._bitField = 134217728;
    ret._settledValue = reason;
    this._promiseResolved(index, ret);
};

Promise.settle = function Promise$Settle(promises) {
    return new SettledPromiseArray(promises).promise();
};

Promise.prototype.settle = function Promise$settle() {
    return new SettledPromiseArray(this).promise();
};
};

},{"./util.js":44}],39:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports =
function(Promise, PromiseArray, apiRejection) {
var util = require("./util.js");
var RangeError = require("./errors.js").RangeError;
var AggregateError = require("./errors.js").AggregateError;
var isArray = util.isArray;


function SomePromiseArray(values) {
    this.constructor$(values);
    this._howMany = 0;
    this._unwrap = false;
    this._initialized = false;
}
util.inherits(SomePromiseArray, PromiseArray);

SomePromiseArray.prototype._init = function SomePromiseArray$_init() {
    if (!this._initialized) {
        return;
    }
    if (this._howMany === 0) {
        this._resolve([]);
        return;
    }
    this._init$(void 0, -5);
    var isArrayResolved = isArray(this._values);
    if (!this._isResolved() &&
        isArrayResolved &&
        this._howMany > this._canPossiblyFulfill()) {
        this._reject(this._getRangeError(this.length()));
    }
};

SomePromiseArray.prototype.init = function SomePromiseArray$init() {
    this._initialized = true;
    this._init();
};

SomePromiseArray.prototype.setUnwrap = function SomePromiseArray$setUnwrap() {
    this._unwrap = true;
};

SomePromiseArray.prototype.howMany = function SomePromiseArray$howMany() {
    return this._howMany;
};

SomePromiseArray.prototype.setHowMany =
function SomePromiseArray$setHowMany(count) {
    if (this._isResolved()) return;
    this._howMany = count;
};

SomePromiseArray.prototype._promiseFulfilled =
function SomePromiseArray$_promiseFulfilled(value) {
    if (this._isResolved()) return;
    this._addFulfilled(value);
    if (this._fulfilled() === this.howMany()) {
        this._values.length = this.howMany();
        if (this.howMany() === 1 && this._unwrap) {
            this._resolve(this._values[0]);
        } else {
            this._resolve(this._values);
        }
    }

};
SomePromiseArray.prototype._promiseRejected =
function SomePromiseArray$_promiseRejected(reason) {
    if (this._isResolved()) return;
    this._addRejected(reason);
    if (this.howMany() > this._canPossiblyFulfill()) {
        var e = new AggregateError();
        for (var i = this.length(); i < this._values.length; ++i) {
            e.push(this._values[i]);
        }
        this._reject(e);
    }
};

SomePromiseArray.prototype._fulfilled = function SomePromiseArray$_fulfilled() {
    return this._totalResolved;
};

SomePromiseArray.prototype._rejected = function SomePromiseArray$_rejected() {
    return this._values.length - this.length();
};

SomePromiseArray.prototype._addRejected =
function SomePromiseArray$_addRejected(reason) {
    this._values.push(reason);
};

SomePromiseArray.prototype._addFulfilled =
function SomePromiseArray$_addFulfilled(value) {
    this._values[this._totalResolved++] = value;
};

SomePromiseArray.prototype._canPossiblyFulfill =
function SomePromiseArray$_canPossiblyFulfill() {
    return this.length() - this._rejected();
};

SomePromiseArray.prototype._getRangeError =
function SomePromiseArray$_getRangeError(count) {
    var message = "Input array must contain at least " +
            this._howMany + " items but contains only " + count + " items";
    return new RangeError(message);
};

SomePromiseArray.prototype._resolveEmptyArray =
function SomePromiseArray$_resolveEmptyArray() {
    this._reject(this._getRangeError(0));
};

function Promise$_Some(promises, howMany) {
    if ((howMany | 0) !== howMany || howMany < 0) {
        return apiRejection("expecting a positive integer");
    }
    var ret = new SomePromiseArray(promises);
    var promise = ret.promise();
    if (promise.isRejected()) {
        return promise;
    }
    ret.setHowMany(howMany);
    ret.init();
    return promise;
}

Promise.some = function Promise$Some(promises, howMany) {
    return Promise$_Some(promises, howMany);
};

Promise.prototype.some = function Promise$some(howMany) {
    return Promise$_Some(this, howMany);
};

Promise._SomePromiseArray = SomePromiseArray;
};

},{"./errors.js":19,"./util.js":44}],40:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise) {
function PromiseInspection(promise) {
    if (promise !== void 0) {
        this._bitField = promise._bitField;
        this._settledValue = promise.isResolved()
            ? promise._settledValue
            : void 0;
    }
    else {
        this._bitField = 0;
        this._settledValue = void 0;
    }
}

PromiseInspection.prototype.isFulfilled =
Promise.prototype.isFulfilled = function Promise$isFulfilled() {
    return (this._bitField & 268435456) > 0;
};

PromiseInspection.prototype.isRejected =
Promise.prototype.isRejected = function Promise$isRejected() {
    return (this._bitField & 134217728) > 0;
};

PromiseInspection.prototype.isPending =
Promise.prototype.isPending = function Promise$isPending() {
    return (this._bitField & 402653184) === 0;
};

PromiseInspection.prototype.value =
Promise.prototype.value = function Promise$value() {
    if (!this.isFulfilled()) {
        throw new TypeError("cannot get fulfillment value of a non-fulfilled promise");
    }
    return this._settledValue;
};

PromiseInspection.prototype.error =
PromiseInspection.prototype.reason =
Promise.prototype.reason = function Promise$reason() {
    if (!this.isRejected()) {
        throw new TypeError("cannot get rejection reason of a non-rejected promise");
    }
    return this._settledValue;
};

PromiseInspection.prototype.isResolved =
Promise.prototype.isResolved = function Promise$isResolved() {
    return (this._bitField & 402653184) > 0;
};

Promise.PromiseInspection = PromiseInspection;
};

},{}],41:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function(Promise, INTERNAL) {
var util = require("./util.js");
var canAttach = require("./errors.js").canAttach;
var errorObj = util.errorObj;
var isObject = util.isObject;

function getThen(obj) {
    try {
        return obj.then;
    }
    catch(e) {
        errorObj.e = e;
        return errorObj;
    }
}

function Promise$_Cast(obj, originalPromise) {
    if (isObject(obj)) {
        if (obj instanceof Promise) {
            return obj;
        }
        else if (isAnyBluebirdPromise(obj)) {
            var ret = new Promise(INTERNAL);
            ret._setTrace(void 0);
            obj._then(
                ret._fulfillUnchecked,
                ret._rejectUncheckedCheckError,
                ret._progressUnchecked,
                ret,
                null
            );
            ret._setFollowing();
            return ret;
        }
        var then = getThen(obj);
        if (then === errorObj) {
            if (originalPromise !== void 0 && canAttach(then.e)) {
                originalPromise._attachExtraTrace(then.e);
            }
            return Promise.reject(then.e);
        } else if (typeof then === "function") {
            return Promise$_doThenable(obj, then, originalPromise);
        }
    }
    return obj;
}

var hasProp = {}.hasOwnProperty;
function isAnyBluebirdPromise(obj) {
    return hasProp.call(obj, "_promise0");
}

function Promise$_doThenable(x, then, originalPromise) {
    var resolver = Promise.defer();
    var called = false;
    try {
        then.call(
            x,
            Promise$_resolveFromThenable,
            Promise$_rejectFromThenable,
            Promise$_progressFromThenable
        );
    } catch(e) {
        if (!called) {
            called = true;
            var trace = canAttach(e) ? e : new Error(e + "");
            if (originalPromise !== void 0) {
                originalPromise._attachExtraTrace(trace);
            }
            resolver.promise._reject(e, trace);
        }
    }
    return resolver.promise;

    function Promise$_resolveFromThenable(y) {
        if (called) return;
        called = true;

        if (x === y) {
            var e = Promise._makeSelfResolutionError();
            if (originalPromise !== void 0) {
                originalPromise._attachExtraTrace(e);
            }
            resolver.promise._reject(e, void 0);
            return;
        }
        resolver.resolve(y);
    }

    function Promise$_rejectFromThenable(r) {
        if (called) return;
        called = true;
        var trace = canAttach(r) ? r : new Error(r + "");
        if (originalPromise !== void 0) {
            originalPromise._attachExtraTrace(trace);
        }
        resolver.promise._reject(r, trace);
    }

    function Promise$_progressFromThenable(v) {
        if (called) return;
        var promise = resolver.promise;
        if (typeof promise._progress === "function") {
            promise._progress(v);
        }
    }
}

return Promise$_Cast;
};

},{"./errors.js":19,"./util.js":44}],42:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
var _setTimeout = function(fn, ms) {
    var len = arguments.length;
    var arg0 = arguments[2];
    var arg1 = arguments[3];
    var arg2 = len >= 5 ? arguments[4] : void 0;
    setTimeout(function() {
        fn(arg0, arg1, arg2);
    }, ms|0);
};

module.exports = function(Promise, INTERNAL, cast) {
var util = require("./util.js");
var errors = require("./errors.js");
var apiRejection = require("./errors_api_rejection")(Promise);
var TimeoutError = Promise.TimeoutError;

var afterTimeout = function Promise$_afterTimeout(promise, message, ms) {
    if (!promise.isPending()) return;
    if (typeof message !== "string") {
        message = "operation timed out after" + " " + ms + " ms"
    }
    var err = new TimeoutError(message);
    errors.markAsOriginatingFromRejection(err);
    promise._attachExtraTrace(err);
    promise._cancel(err);
};

var afterDelay = function Promise$_afterDelay(value, promise) {
    promise._fulfill(value);
};

var delay = Promise.delay = function Promise$Delay(value, ms) {
    if (ms === void 0) {
        ms = value;
        value = void 0;
    }
    ms = +ms;
    var maybePromise = cast(value, void 0);
    var promise = new Promise(INTERNAL);

    if (maybePromise instanceof Promise) {
        promise._propagateFrom(maybePromise, 7);
        promise._follow(maybePromise);
        return promise.then(function(value) {
            return Promise.delay(value, ms);
        });
    } else {
        promise._setTrace(void 0);
        _setTimeout(afterDelay, ms, value, promise);
    }
    return promise;
};

Promise.prototype.delay = function Promise$delay(ms) {
    return delay(this, ms);
};

Promise.prototype.timeout = function Promise$timeout(ms, message) {
    ms = +ms;

    var ret = new Promise(INTERNAL);
    ret._propagateFrom(this, 7);
    ret._follow(this);
    _setTimeout(afterTimeout, ms, ret, message, ms);
    return ret.cancellable();
};

};

},{"./errors.js":19,"./errors_api_rejection":20,"./util.js":44}],43:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
module.exports = function (Promise, apiRejection, cast) {
    var TypeError = require("./errors.js").TypeError;
    var inherits = require("./util.js").inherits;
    var PromiseInspection = Promise.PromiseInspection;

    function inspectionMapper(inspections) {
        var len = inspections.length;
        for (var i = 0; i < len; ++i) {
            var inspection = inspections[i];
            if (inspection.isRejected()) {
                return Promise.reject(inspection.error());
            }
            inspections[i] = inspection.value();
        }
        return inspections;
    }

    function thrower(e) {
        setTimeout(function(){throw e;}, 0);
    }

    function castPreservingDisposable(thenable) {
        var maybePromise = cast(thenable, void 0);
        if (maybePromise !== thenable &&
            typeof thenable._isDisposable === "function" &&
            typeof thenable._getDisposer === "function" &&
            thenable._isDisposable()) {
            maybePromise._setDisposable(thenable._getDisposer());
        }
        return maybePromise;
    }
    function dispose(resources, inspection) {
        var i = 0;
        var len = resources.length;
        var ret = Promise.defer();
        function iterator() {
            if (i >= len) return ret.resolve();
            var maybePromise = castPreservingDisposable(resources[i++]);
            if (maybePromise instanceof Promise &&
                maybePromise._isDisposable()) {
                try {
                    maybePromise = cast(maybePromise._getDisposer()
                                        .tryDispose(inspection), void 0);
                } catch (e) {
                    return thrower(e);
                }
                if (maybePromise instanceof Promise) {
                    return maybePromise._then(iterator, thrower,
                                              null, null, null);
                }
            }
            iterator();
        }
        iterator();
        return ret.promise;
    }

    function disposerSuccess(value) {
        var inspection = new PromiseInspection();
        inspection._settledValue = value;
        inspection._bitField = 268435456;
        return dispose(this, inspection).thenReturn(value);
    }

    function disposerFail(reason) {
        var inspection = new PromiseInspection();
        inspection._settledValue = reason;
        inspection._bitField = 134217728;
        return dispose(this, inspection).thenThrow(reason);
    }

    function Disposer(data, promise) {
        this._data = data;
        this._promise = promise;
    }

    Disposer.prototype.data = function Disposer$data() {
        return this._data;
    };

    Disposer.prototype.promise = function Disposer$promise() {
        return this._promise;
    };

    Disposer.prototype.resource = function Disposer$resource() {
        if (this.promise().isFulfilled()) {
            return this.promise().value();
        }
        return null;
    };

    Disposer.prototype.tryDispose = function(inspection) {
        var resource = this.resource();
        var ret = resource !== null
            ? this.doDispose(resource, inspection) : null;
        this._promise._unsetDisposable();
        this._data = this._promise = null;
        return ret;
    };

    Disposer.isDisposer = function Disposer$isDisposer(d) {
        return (d != null &&
                typeof d.resource === "function" &&
                typeof d.tryDispose === "function");
    };

    function FunctionDisposer(fn, promise) {
        this.constructor$(fn, promise);
    }
    inherits(FunctionDisposer, Disposer);

    FunctionDisposer.prototype.doDispose = function (resource, inspection) {
        var fn = this.data();
        return fn.call(resource, resource, inspection);
    };

    Promise.using = function Promise$using() {
        var len = arguments.length;
        if (len < 2) return apiRejection(
                        "you must pass at least 2 arguments to Promise.using");
        var fn = arguments[len - 1];
        if (typeof fn !== "function") return apiRejection("fn must be a function");
        len--;
        var resources = new Array(len);
        for (var i = 0; i < len; ++i) {
            var resource = arguments[i];
            if (Disposer.isDisposer(resource)) {
                var disposer = resource;
                resource = resource.promise();
                resource._setDisposable(disposer);
            }
            resources[i] = resource;
        }

        return Promise.settle(resources)
            .then(inspectionMapper)
            .spread(fn)
            ._then(disposerSuccess, disposerFail, void 0, resources, void 0);
    };

    Promise.prototype._setDisposable =
    function Promise$_setDisposable(disposer) {
        this._bitField = this._bitField | 262144;
        this._disposer = disposer;
    };

    Promise.prototype._isDisposable = function Promise$_isDisposable() {
        return (this._bitField & 262144) > 0;
    };

    Promise.prototype._getDisposer = function Promise$_getDisposer() {
        return this._disposer;
    };

    Promise.prototype._unsetDisposable = function Promise$_unsetDisposable() {
        this._bitField = this._bitField & (~262144);
        this._disposer = void 0;
    };

    Promise.prototype.disposer = function Promise$disposer(fn) {
        if (typeof fn === "function") {
            return new FunctionDisposer(fn, this);
        }
        throw new TypeError();
    };

};

},{"./errors.js":19,"./util.js":44}],44:[function(require,module,exports){
/**
 * Copyright (c) 2014 Petka Antonov
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */
"use strict";
var es5 = require("./es5.js");
var haveGetters = (function(){
    try {
        var o = {};
        es5.defineProperty(o, "f", {
            get: function () {
                return 3;
            }
        });
        return o.f === 3;
    }
    catch (e) {
        return false;
    }

})();
var canEvaluate = typeof navigator == "undefined";
var errorObj = {e: {}};
function tryCatch1(fn, receiver, arg) {
    try { return fn.call(receiver, arg); }
    catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

function tryCatch2(fn, receiver, arg, arg2) {
    try { return fn.call(receiver, arg, arg2); }
    catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

function tryCatch3(fn, receiver, arg, arg2, arg3) {
    try { return fn.call(receiver, arg, arg2, arg3); }
    catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

function tryCatch4(fn, receiver, arg, arg2, arg3, arg4) {
    try { return fn.call(receiver, arg, arg2, arg3, arg4); }
    catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

function tryCatchApply(fn, args, receiver) {
    try { return fn.apply(receiver, args); }
    catch (e) {
        errorObj.e = e;
        return errorObj;
    }
}

var inherits = function(Child, Parent) {
    var hasProp = {}.hasOwnProperty;

    function T() {
        this.constructor = Child;
        this.constructor$ = Parent;
        for (var propertyName in Parent.prototype) {
            if (hasProp.call(Parent.prototype, propertyName) &&
                propertyName.charAt(propertyName.length-1) !== "$"
           ) {
                this[propertyName + "$"] = Parent.prototype[propertyName];
            }
        }
    }
    T.prototype = Parent.prototype;
    Child.prototype = new T();
    return Child.prototype;
};

function asString(val) {
    return typeof val === "string" ? val : ("" + val);
}

function isPrimitive(val) {
    return val == null || val === true || val === false ||
        typeof val === "string" || typeof val === "number";

}

function isObject(value) {
    return !isPrimitive(value);
}

function maybeWrapAsError(maybeError) {
    if (!isPrimitive(maybeError)) return maybeError;

    return new Error(asString(maybeError));
}

function withAppended(target, appendee) {
    var len = target.length;
    var ret = new Array(len + 1);
    var i;
    for (i = 0; i < len; ++i) {
        ret[i] = target[i];
    }
    ret[i] = appendee;
    return ret;
}

function getDataPropertyOrDefault(obj, key, defaultValue) {
    if (es5.isES5) {
        var desc = Object.getOwnPropertyDescriptor(obj, key);
        if (desc != null) {
            return desc.get == null && desc.set == null
                    ? desc.value
                    : defaultValue;
        }
    } else {
        return {}.hasOwnProperty.call(obj, key) ? obj[key] : void 0;
    }
}

function notEnumerableProp(obj, name, value) {
    if (isPrimitive(obj)) return obj;
    var descriptor = {
        value: value,
        configurable: true,
        enumerable: false,
        writable: true
    };
    es5.defineProperty(obj, name, descriptor);
    return obj;
}


var wrapsPrimitiveReceiver = (function() {
    return this !== "string";
}).call("string");

function thrower(r) {
    throw r;
}

var inheritedDataKeys = (function() {
    if (es5.isES5) {
        return function(obj, opts) {
            var ret = [];
            var visitedKeys = Object.create(null);
            var getKeys = Object(opts).includeHidden
                ? Object.getOwnPropertyNames
                : Object.keys;
            while (obj != null) {
                var keys;
                try {
                    keys = getKeys(obj);
                } catch (e) {
                    return ret;
                }
                for (var i = 0; i < keys.length; ++i) {
                    var key = keys[i];
                    if (visitedKeys[key]) continue;
                    visitedKeys[key] = true;
                    var desc = Object.getOwnPropertyDescriptor(obj, key);
                    if (desc != null && desc.get == null && desc.set == null) {
                        ret.push(key);
                    }
                }
                obj = es5.getPrototypeOf(obj);
            }
            return ret;
        };
    } else {
        return function(obj) {
            var ret = [];
            /*jshint forin:false */
            for (var key in obj) {
                ret.push(key);
            }
            return ret;
        };
    }

})();

function isClass(fn) {
    try {
        if (typeof fn === "function") {
            var keys = es5.keys(fn.prototype);
            return keys.length > 0 &&
                   !(keys.length === 1 && keys[0] === "constructor");
        }
        return false;
    } catch (e) {
        return false;
    }
}

function toFastProperties(obj) {
    /*jshint -W027*/
    function f() {}
    f.prototype = obj;
    return f;
    eval(obj);
}

var rident = /^[a-z$_][a-z$_0-9]*$/i;
function isIdentifier(str) {
    return rident.test(str);
}

function filledRange(count, prefix, suffix) {
    var ret = new Array(count);
    for(var i = 0; i < count; ++i) {
        ret[i] = prefix + i + suffix;
    }
    return ret;
}

var ret = {
    isClass: isClass,
    isIdentifier: isIdentifier,
    inheritedDataKeys: inheritedDataKeys,
    getDataPropertyOrDefault: getDataPropertyOrDefault,
    thrower: thrower,
    isArray: es5.isArray,
    haveGetters: haveGetters,
    notEnumerableProp: notEnumerableProp,
    isPrimitive: isPrimitive,
    isObject: isObject,
    canEvaluate: canEvaluate,
    errorObj: errorObj,
    tryCatch1: tryCatch1,
    tryCatch2: tryCatch2,
    tryCatch3: tryCatch3,
    tryCatch4: tryCatch4,
    tryCatchApply: tryCatchApply,
    inherits: inherits,
    withAppended: withAppended,
    asString: asString,
    maybeWrapAsError: maybeWrapAsError,
    wrapsPrimitiveReceiver: wrapsPrimitiveReceiver,
    toFastProperties: toFastProperties,
    filledRange: filledRange
};

module.exports = ret;

},{"./es5.js":21}],45:[function(require,module,exports){
(function (process,global){
(function(global) {
  'use strict';
  if (global.$traceurRuntime) {
    return;
  }
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $Object.defineProperties;
  var $defineProperty = $Object.defineProperty;
  var $freeze = $Object.freeze;
  var $getOwnPropertyDescriptor = $Object.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $Object.getOwnPropertyNames;
  var $keys = $Object.keys;
  var $hasOwnProperty = $Object.prototype.hasOwnProperty;
  var $toString = $Object.prototype.toString;
  var $preventExtensions = Object.preventExtensions;
  var $seal = Object.seal;
  var $isExtensible = Object.isExtensible;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var types = {
    void: function voidType() {},
    any: function any() {},
    string: function string() {},
    number: function number() {},
    boolean: function boolean() {}
  };
  var method = nonEnum;
  var counter = 0;
  function newUniqueString() {
    return '__$' + Math.floor(Math.random() * 1e9) + '$' + ++counter + '$__';
  }
  var symbolInternalProperty = newUniqueString();
  var symbolDescriptionProperty = newUniqueString();
  var symbolDataProperty = newUniqueString();
  var symbolValues = $create(null);
  var privateNames = $create(null);
  function createPrivateName() {
    var s = newUniqueString();
    privateNames[s] = true;
    return s;
  }
  function isSymbol(symbol) {
    return typeof symbol === 'object' && symbol instanceof SymbolValue;
  }
  function typeOf(v) {
    if (isSymbol(v))
      return 'symbol';
    return typeof v;
  }
  function Symbol(description) {
    var value = new SymbolValue(description);
    if (!(this instanceof Symbol))
      return value;
    throw new TypeError('Symbol cannot be new\'ed');
  }
  $defineProperty(Symbol.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(Symbol.prototype, 'toString', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    var desc = symbolValue[symbolDescriptionProperty];
    if (desc === undefined)
      desc = '';
    return 'Symbol(' + desc + ')';
  }));
  $defineProperty(Symbol.prototype, 'valueOf', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    return symbolValue;
  }));
  function SymbolValue(description) {
    var key = newUniqueString();
    $defineProperty(this, symbolDataProperty, {value: this});
    $defineProperty(this, symbolInternalProperty, {value: key});
    $defineProperty(this, symbolDescriptionProperty, {value: description});
    freeze(this);
    symbolValues[key] = this;
  }
  $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(SymbolValue.prototype, 'toString', {
    value: Symbol.prototype.toString,
    enumerable: false
  });
  $defineProperty(SymbolValue.prototype, 'valueOf', {
    value: Symbol.prototype.valueOf,
    enumerable: false
  });
  var hashProperty = createPrivateName();
  var hashPropertyDescriptor = {value: undefined};
  var hashObjectProperties = {
    hash: {value: undefined},
    self: {value: undefined}
  };
  var hashCounter = 0;
  function getOwnHashObject(object) {
    var hashObject = object[hashProperty];
    if (hashObject && hashObject.self === object)
      return hashObject;
    if ($isExtensible(object)) {
      hashObjectProperties.hash.value = hashCounter++;
      hashObjectProperties.self.value = object;
      hashPropertyDescriptor.value = $create(null, hashObjectProperties);
      $defineProperty(object, hashProperty, hashPropertyDescriptor);
      return hashPropertyDescriptor.value;
    }
    return undefined;
  }
  function freeze(object) {
    getOwnHashObject(object);
    return $freeze.apply(this, arguments);
  }
  function preventExtensions(object) {
    getOwnHashObject(object);
    return $preventExtensions.apply(this, arguments);
  }
  function seal(object) {
    getOwnHashObject(object);
    return $seal.apply(this, arguments);
  }
  Symbol.iterator = Symbol();
  freeze(SymbolValue.prototype);
  function toProperty(name) {
    if (isSymbol(name))
      return name[symbolInternalProperty];
    return name;
  }
  function getOwnPropertyNames(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (!symbolValues[name] && !privateNames[name])
        rv.push(name);
    }
    return rv;
  }
  function getOwnPropertyDescriptor(object, name) {
    return $getOwnPropertyDescriptor(object, toProperty(name));
  }
  function getOwnPropertySymbols(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var symbol = symbolValues[names[i]];
      if (symbol)
        rv.push(symbol);
    }
    return rv;
  }
  function hasOwnProperty(name) {
    return $hasOwnProperty.call(this, toProperty(name));
  }
  function getOption(name) {
    return global.traceur && global.traceur.options[name];
  }
  function setProperty(object, name, value) {
    var sym,
        desc;
    if (isSymbol(name)) {
      sym = name;
      name = name[symbolInternalProperty];
    }
    object[name] = value;
    if (sym && (desc = $getOwnPropertyDescriptor(object, name)))
      $defineProperty(object, name, {enumerable: false});
    return value;
  }
  function defineProperty(object, name, descriptor) {
    if (isSymbol(name)) {
      if (descriptor.enumerable) {
        descriptor = $create(descriptor, {enumerable: {value: false}});
      }
      name = name[symbolInternalProperty];
    }
    $defineProperty(object, name, descriptor);
    return object;
  }
  function polyfillObject(Object) {
    $defineProperty(Object, 'defineProperty', {value: defineProperty});
    $defineProperty(Object, 'getOwnPropertyNames', {value: getOwnPropertyNames});
    $defineProperty(Object, 'getOwnPropertyDescriptor', {value: getOwnPropertyDescriptor});
    $defineProperty(Object.prototype, 'hasOwnProperty', {value: hasOwnProperty});
    $defineProperty(Object, 'freeze', {value: freeze});
    $defineProperty(Object, 'preventExtensions', {value: preventExtensions});
    $defineProperty(Object, 'seal', {value: seal});
    Object.getOwnPropertySymbols = getOwnPropertySymbols;
  }
  function exportStar(object) {
    for (var i = 1; i < arguments.length; i++) {
      var names = $getOwnPropertyNames(arguments[i]);
      for (var j = 0; j < names.length; j++) {
        var name = names[j];
        if (privateNames[name])
          continue;
        (function(mod, name) {
          $defineProperty(object, name, {
            get: function() {
              return mod[name];
            },
            enumerable: true
          });
        })(arguments[i], names[j]);
      }
    }
    return object;
  }
  function isObject(x) {
    return x != null && (typeof x === 'object' || typeof x === 'function');
  }
  function toObject(x) {
    if (x == null)
      throw $TypeError();
    return $Object(x);
  }
  function checkObjectCoercible(argument) {
    if (argument == null) {
      throw new TypeError('Value cannot be converted to an Object');
    }
    return argument;
  }
  function setupGlobals(global) {
    global.Symbol = Symbol;
    global.Reflect = global.Reflect || {};
    global.Reflect.global = global.Reflect.global || global;
    polyfillObject(global.Object);
  }
  setupGlobals(global);
  global.$traceurRuntime = {
    createPrivateName: createPrivateName,
    exportStar: exportStar,
    getOwnHashObject: getOwnHashObject,
    privateNames: privateNames,
    setProperty: setProperty,
    setupGlobals: setupGlobals,
    toObject: toObject,
    isObject: isObject,
    toProperty: toProperty,
    type: types,
    typeof: typeOf,
    checkObjectCoercible: checkObjectCoercible,
    hasOwnProperty: function(o, p) {
      return hasOwnProperty.call(o, p);
    },
    defineProperties: $defineProperties,
    defineProperty: $defineProperty,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    getOwnPropertyNames: $getOwnPropertyNames,
    keys: $keys
  };
})(typeof global !== 'undefined' ? global : this);
(function() {
  'use strict';
  function spread() {
    var rv = [],
        j = 0,
        iterResult;
    for (var i = 0; i < arguments.length; i++) {
      var valueToSpread = $traceurRuntime.checkObjectCoercible(arguments[i]);
      if (typeof valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)] !== 'function') {
        throw new TypeError('Cannot spread non-iterable object.');
      }
      var iter = valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)]();
      while (!(iterResult = iter.next()).done) {
        rv[j++] = iterResult.value;
      }
    }
    return rv;
  }
  $traceurRuntime.spread = spread;
})();
(function() {
  'use strict';
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $getOwnPropertyDescriptor = $traceurRuntime.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $traceurRuntime.getOwnPropertyNames;
  var $getPrototypeOf = Object.getPrototypeOf;
  function superDescriptor(homeObject, name) {
    var proto = $getPrototypeOf(homeObject);
    do {
      var result = $getOwnPropertyDescriptor(proto, name);
      if (result)
        return result;
      proto = $getPrototypeOf(proto);
    } while (proto);
    return undefined;
  }
  function superCall(self, homeObject, name, args) {
    return superGet(self, homeObject, name).apply(self, args);
  }
  function superGet(self, homeObject, name) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor) {
      if (!descriptor.get)
        return descriptor.value;
      return descriptor.get.call(self);
    }
    return undefined;
  }
  function superSet(self, homeObject, name, value) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor && descriptor.set) {
      descriptor.set.call(self, value);
      return value;
    }
    throw $TypeError("super has no setter '" + name + "'.");
  }
  function getDescriptors(object) {
    var descriptors = {},
        name,
        names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      descriptors[name] = $getOwnPropertyDescriptor(object, name);
    }
    return descriptors;
  }
  function createClass(ctor, object, staticObject, superClass) {
    $defineProperty(object, 'constructor', {
      value: ctor,
      configurable: true,
      enumerable: false,
      writable: true
    });
    if (arguments.length > 3) {
      if (typeof superClass === 'function')
        ctor.__proto__ = superClass;
      ctor.prototype = $create(getProtoParent(superClass), getDescriptors(object));
    } else {
      ctor.prototype = object;
    }
    $defineProperty(ctor, 'prototype', {
      configurable: false,
      writable: false
    });
    return $defineProperties(ctor, getDescriptors(staticObject));
  }
  function getProtoParent(superClass) {
    if (typeof superClass === 'function') {
      var prototype = superClass.prototype;
      if ($Object(prototype) === prototype || prototype === null)
        return superClass.prototype;
      throw new $TypeError('super prototype must be an Object or null');
    }
    if (superClass === null)
      return null;
    throw new $TypeError(("Super expression must either be null or a function, not " + typeof superClass + "."));
  }
  function defaultSuperCall(self, homeObject, args) {
    if ($getPrototypeOf(homeObject) !== null)
      superCall(self, homeObject, 'constructor', args);
  }
  $traceurRuntime.createClass = createClass;
  $traceurRuntime.defaultSuperCall = defaultSuperCall;
  $traceurRuntime.superCall = superCall;
  $traceurRuntime.superGet = superGet;
  $traceurRuntime.superSet = superSet;
})();
(function() {
  'use strict';
  var createPrivateName = $traceurRuntime.createPrivateName;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $create = Object.create;
  var $TypeError = TypeError;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var ST_NEWBORN = 0;
  var ST_EXECUTING = 1;
  var ST_SUSPENDED = 2;
  var ST_CLOSED = 3;
  var END_STATE = -2;
  var RETHROW_STATE = -3;
  function getInternalError(state) {
    return new Error('Traceur compiler bug: invalid state in state machine: ' + state);
  }
  function GeneratorContext() {
    this.state = 0;
    this.GState = ST_NEWBORN;
    this.storedException = undefined;
    this.finallyFallThrough = undefined;
    this.sent_ = undefined;
    this.returnValue = undefined;
    this.tryStack_ = [];
  }
  GeneratorContext.prototype = {
    pushTry: function(catchState, finallyState) {
      if (finallyState !== null) {
        var finallyFallThrough = null;
        for (var i = this.tryStack_.length - 1; i >= 0; i--) {
          if (this.tryStack_[i].catch !== undefined) {
            finallyFallThrough = this.tryStack_[i].catch;
            break;
          }
        }
        if (finallyFallThrough === null)
          finallyFallThrough = RETHROW_STATE;
        this.tryStack_.push({
          finally: finallyState,
          finallyFallThrough: finallyFallThrough
        });
      }
      if (catchState !== null) {
        this.tryStack_.push({catch: catchState});
      }
    },
    popTry: function() {
      this.tryStack_.pop();
    },
    get sent() {
      this.maybeThrow();
      return this.sent_;
    },
    set sent(v) {
      this.sent_ = v;
    },
    get sentIgnoreThrow() {
      return this.sent_;
    },
    maybeThrow: function() {
      if (this.action === 'throw') {
        this.action = 'next';
        throw this.sent_;
      }
    },
    end: function() {
      switch (this.state) {
        case END_STATE:
          return this;
        case RETHROW_STATE:
          throw this.storedException;
        default:
          throw getInternalError(this.state);
      }
    },
    handleException: function(ex) {
      this.GState = ST_CLOSED;
      this.state = END_STATE;
      throw ex;
    }
  };
  function nextOrThrow(ctx, moveNext, action, x) {
    switch (ctx.GState) {
      case ST_EXECUTING:
        throw new Error(("\"" + action + "\" on executing generator"));
      case ST_CLOSED:
        if (action == 'next') {
          return {
            value: undefined,
            done: true
          };
        }
        throw x;
      case ST_NEWBORN:
        if (action === 'throw') {
          ctx.GState = ST_CLOSED;
          throw x;
        }
        if (x !== undefined)
          throw $TypeError('Sent value to newborn generator');
      case ST_SUSPENDED:
        ctx.GState = ST_EXECUTING;
        ctx.action = action;
        ctx.sent = x;
        var value = moveNext(ctx);
        var done = value === ctx;
        if (done)
          value = ctx.returnValue;
        ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
        return {
          value: value,
          done: done
        };
    }
  }
  var ctxName = createPrivateName();
  var moveNextName = createPrivateName();
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  $defineProperty(GeneratorFunctionPrototype, 'constructor', nonEnum(GeneratorFunction));
  GeneratorFunctionPrototype.prototype = {
    constructor: GeneratorFunctionPrototype,
    next: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'next', v);
    },
    throw: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'throw', v);
    }
  };
  $defineProperties(GeneratorFunctionPrototype.prototype, {
    constructor: {enumerable: false},
    next: {enumerable: false},
    throw: {enumerable: false}
  });
  Object.defineProperty(GeneratorFunctionPrototype.prototype, Symbol.iterator, nonEnum(function() {
    return this;
  }));
  function createGeneratorInstance(innerFunction, functionObject, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new GeneratorContext();
    var object = $create(functionObject.prototype);
    object[ctxName] = ctx;
    object[moveNextName] = moveNext;
    return object;
  }
  function initGeneratorFunction(functionObject) {
    functionObject.prototype = $create(GeneratorFunctionPrototype.prototype);
    functionObject.__proto__ = GeneratorFunctionPrototype;
    return functionObject;
  }
  function AsyncFunctionContext() {
    GeneratorContext.call(this);
    this.err = undefined;
    var ctx = this;
    ctx.result = new Promise(function(resolve, reject) {
      ctx.resolve = resolve;
      ctx.reject = reject;
    });
  }
  AsyncFunctionContext.prototype = $create(GeneratorContext.prototype);
  AsyncFunctionContext.prototype.end = function() {
    switch (this.state) {
      case END_STATE:
        this.resolve(this.returnValue);
        break;
      case RETHROW_STATE:
        this.reject(this.storedException);
        break;
      default:
        this.reject(getInternalError(this.state));
    }
  };
  AsyncFunctionContext.prototype.handleException = function() {
    this.state = RETHROW_STATE;
  };
  function asyncWrap(innerFunction, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new AsyncFunctionContext();
    ctx.createCallback = function(newState) {
      return function(value) {
        ctx.state = newState;
        ctx.value = value;
        moveNext(ctx);
      };
    };
    ctx.errback = function(err) {
      handleCatch(ctx, err);
      moveNext(ctx);
    };
    moveNext(ctx);
    return ctx.result;
  }
  function getMoveNext(innerFunction, self) {
    return function(ctx) {
      while (true) {
        try {
          return innerFunction.call(self, ctx);
        } catch (ex) {
          handleCatch(ctx, ex);
        }
      }
    };
  }
  function handleCatch(ctx, ex) {
    ctx.storedException = ex;
    var last = ctx.tryStack_[ctx.tryStack_.length - 1];
    if (!last) {
      ctx.handleException(ex);
      return;
    }
    ctx.state = last.catch !== undefined ? last.catch : last.finally;
    if (last.finallyFallThrough !== undefined)
      ctx.finallyFallThrough = last.finallyFallThrough;
  }
  $traceurRuntime.asyncWrap = asyncWrap;
  $traceurRuntime.initGeneratorFunction = initGeneratorFunction;
  $traceurRuntime.createGeneratorInstance = createGeneratorInstance;
})();
(function() {
  function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
    var out = [];
    if (opt_scheme) {
      out.push(opt_scheme, ':');
    }
    if (opt_domain) {
      out.push('//');
      if (opt_userInfo) {
        out.push(opt_userInfo, '@');
      }
      out.push(opt_domain);
      if (opt_port) {
        out.push(':', opt_port);
      }
    }
    if (opt_path) {
      out.push(opt_path);
    }
    if (opt_queryData) {
      out.push('?', opt_queryData);
    }
    if (opt_fragment) {
      out.push('#', opt_fragment);
    }
    return out.join('');
  }
  ;
  var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
  var ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
  };
  function split(uri) {
    return (uri.match(splitRe));
  }
  function removeDotSegments(path) {
    if (path === '/')
      return '/';
    var leadingSlash = path[0] === '/' ? '/' : '';
    var trailingSlash = path.slice(-1) === '/' ? '/' : '';
    var segments = path.split('/');
    var out = [];
    var up = 0;
    for (var pos = 0; pos < segments.length; pos++) {
      var segment = segments[pos];
      switch (segment) {
        case '':
        case '.':
          break;
        case '..':
          if (out.length)
            out.pop();
          else
            up++;
          break;
        default:
          out.push(segment);
      }
    }
    if (!leadingSlash) {
      while (up-- > 0) {
        out.unshift('..');
      }
      if (out.length === 0)
        out.push('.');
    }
    return leadingSlash + out.join('/') + trailingSlash;
  }
  function joinAndCanonicalizePath(parts) {
    var path = parts[ComponentIndex.PATH] || '';
    path = removeDotSegments(path);
    parts[ComponentIndex.PATH] = path;
    return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]);
  }
  function canonicalizeUrl(url) {
    var parts = split(url);
    return joinAndCanonicalizePath(parts);
  }
  function resolveUrl(base, url) {
    var parts = split(url);
    var baseParts = split(base);
    if (parts[ComponentIndex.SCHEME]) {
      return joinAndCanonicalizePath(parts);
    } else {
      parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
    }
    for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
      if (!parts[i]) {
        parts[i] = baseParts[i];
      }
    }
    if (parts[ComponentIndex.PATH][0] == '/') {
      return joinAndCanonicalizePath(parts);
    }
    var path = baseParts[ComponentIndex.PATH];
    var index = path.lastIndexOf('/');
    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
    parts[ComponentIndex.PATH] = path;
    return joinAndCanonicalizePath(parts);
  }
  function isAbsolute(name) {
    if (!name)
      return false;
    if (name[0] === '/')
      return true;
    var parts = split(name);
    if (parts[ComponentIndex.SCHEME])
      return true;
    return false;
  }
  $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
  $traceurRuntime.isAbsolute = isAbsolute;
  $traceurRuntime.removeDotSegments = removeDotSegments;
  $traceurRuntime.resolveUrl = resolveUrl;
})();
(function(global) {
  'use strict';
  var $__2 = $traceurRuntime,
      canonicalizeUrl = $__2.canonicalizeUrl,
      resolveUrl = $__2.resolveUrl,
      isAbsolute = $__2.isAbsolute;
  var moduleInstantiators = Object.create(null);
  var baseURL;
  if (global.location && global.location.href)
    baseURL = resolveUrl(global.location.href, './');
  else
    baseURL = '';
  var UncoatedModuleEntry = function UncoatedModuleEntry(url, uncoatedModule) {
    this.url = url;
    this.value_ = uncoatedModule;
  };
  ($traceurRuntime.createClass)(UncoatedModuleEntry, {}, {});
  var ModuleEvaluationError = function ModuleEvaluationError(erroneousModuleName, cause) {
    this.message = this.constructor.name + ': ' + this.stripCause(cause) + ' in ' + erroneousModuleName;
    if (!(cause instanceof $ModuleEvaluationError) && cause.stack)
      this.stack = this.stripStack(cause.stack);
    else
      this.stack = '';
  };
  var $ModuleEvaluationError = ModuleEvaluationError;
  ($traceurRuntime.createClass)(ModuleEvaluationError, {
    stripError: function(message) {
      return message.replace(/.*Error:/, this.constructor.name + ':');
    },
    stripCause: function(cause) {
      if (!cause)
        return '';
      if (!cause.message)
        return cause + '';
      return this.stripError(cause.message);
    },
    loadedBy: function(moduleName) {
      this.stack += '\n loaded by ' + moduleName;
    },
    stripStack: function(causeStack) {
      var stack = [];
      causeStack.split('\n').some((function(frame) {
        if (/UncoatedModuleInstantiator/.test(frame))
          return true;
        stack.push(frame);
      }));
      stack[0] = this.stripError(stack[0]);
      return stack.join('\n');
    }
  }, {}, Error);
  var UncoatedModuleInstantiator = function UncoatedModuleInstantiator(url, func) {
    $traceurRuntime.superCall(this, $UncoatedModuleInstantiator.prototype, "constructor", [url, null]);
    this.func = func;
  };
  var $UncoatedModuleInstantiator = UncoatedModuleInstantiator;
  ($traceurRuntime.createClass)(UncoatedModuleInstantiator, {getUncoatedModule: function() {
      if (this.value_)
        return this.value_;
      try {
        return this.value_ = this.func.call(global);
      } catch (ex) {
        if (ex instanceof ModuleEvaluationError) {
          ex.loadedBy(this.url);
          throw ex;
        }
        throw new ModuleEvaluationError(this.url, ex);
      }
    }}, {}, UncoatedModuleEntry);
  function getUncoatedModuleInstantiator(name) {
    if (!name)
      return;
    var url = ModuleStore.normalize(name);
    return moduleInstantiators[url];
  }
  ;
  var moduleInstances = Object.create(null);
  var liveModuleSentinel = {};
  function Module(uncoatedModule) {
    var isLive = arguments[1];
    var coatedModule = Object.create(null);
    Object.getOwnPropertyNames(uncoatedModule).forEach((function(name) {
      var getter,
          value;
      if (isLive === liveModuleSentinel) {
        var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
        if (descr.get)
          getter = descr.get;
      }
      if (!getter) {
        value = uncoatedModule[name];
        getter = function() {
          return value;
        };
      }
      Object.defineProperty(coatedModule, name, {
        get: getter,
        enumerable: true
      });
    }));
    Object.preventExtensions(coatedModule);
    return coatedModule;
  }
  var ModuleStore = {
    normalize: function(name, refererName, refererAddress) {
      if (typeof name !== "string")
        throw new TypeError("module name must be a string, not " + typeof name);
      if (isAbsolute(name))
        return canonicalizeUrl(name);
      if (/[^\.]\/\.\.\//.test(name)) {
        throw new Error('module name embeds /../: ' + name);
      }
      if (name[0] === '.' && refererName)
        return resolveUrl(refererName, name);
      return canonicalizeUrl(name);
    },
    get: function(normalizedName) {
      var m = getUncoatedModuleInstantiator(normalizedName);
      if (!m)
        return undefined;
      var moduleInstance = moduleInstances[m.url];
      if (moduleInstance)
        return moduleInstance;
      moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
      return moduleInstances[m.url] = moduleInstance;
    },
    set: function(normalizedName, module) {
      normalizedName = String(normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, (function() {
        return module;
      }));
      moduleInstances[normalizedName] = module;
    },
    get baseURL() {
      return baseURL;
    },
    set baseURL(v) {
      baseURL = String(v);
    },
    registerModule: function(name, func) {
      var normalizedName = ModuleStore.normalize(name);
      if (moduleInstantiators[normalizedName])
        throw new Error('duplicate module named ' + normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
    },
    bundleStore: Object.create(null),
    register: function(name, deps, func) {
      if (!deps || !deps.length && !func.length) {
        this.registerModule(name, func);
      } else {
        this.bundleStore[name] = {
          deps: deps,
          execute: function() {
            var $__0 = arguments;
            var depMap = {};
            deps.forEach((function(dep, index) {
              return depMap[dep] = $__0[index];
            }));
            var registryEntry = func.call(this, depMap);
            registryEntry.execute.call(this);
            return registryEntry.exports;
          }
        };
      }
    },
    getAnonymousModule: function(func) {
      return new Module(func.call(global), liveModuleSentinel);
    },
    getForTesting: function(name) {
      var $__0 = this;
      if (!this.testingPrefix_) {
        Object.keys(moduleInstances).some((function(key) {
          var m = /(traceur@[^\/]*\/)/.exec(key);
          if (m) {
            $__0.testingPrefix_ = m[1];
            return true;
          }
        }));
      }
      return this.get(this.testingPrefix_ + name);
    }
  };
  ModuleStore.set('@traceur/src/runtime/ModuleStore', new Module({ModuleStore: ModuleStore}));
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
  };
  $traceurRuntime.ModuleStore = ModuleStore;
  global.System = {
    register: ModuleStore.register.bind(ModuleStore),
    get: ModuleStore.get,
    set: ModuleStore.set,
    normalize: ModuleStore.normalize
  };
  $traceurRuntime.getModuleImpl = function(name) {
    var instantiator = getUncoatedModuleInstantiator(name);
    return instantiator && instantiator.getUncoatedModule();
  };
})(typeof global !== 'undefined' ? global : this);
System.register("traceur-runtime@0.0.65/src/runtime/polyfills/utils", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.65/src/runtime/polyfills/utils";
  var $ceil = Math.ceil;
  var $floor = Math.floor;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $pow = Math.pow;
  var $min = Math.min;
  var toObject = $traceurRuntime.toObject;
  function toUint32(x) {
    return x >>> 0;
  }
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function isCallable(x) {
    return typeof x === 'function';
  }
  function isNumber(x) {
    return typeof x === 'number';
  }
  function toInteger(x) {
    x = +x;
    if ($isNaN(x))
      return 0;
    if (x === 0 || !$isFinite(x))
      return x;
    return x > 0 ? $floor(x) : $ceil(x);
  }
  var MAX_SAFE_LENGTH = $pow(2, 53) - 1;
  function toLength(x) {
    var len = toInteger(x);
    return len < 0 ? 0 : $min(len, MAX_SAFE_LENGTH);
  }
  function checkIterable(x) {
    return !isObject(x) ? undefined : x[Symbol.iterator];
  }
  function isConstructor(x) {
    return isCallable(x);
  }
  function createIteratorResultObject(value, done) {
    return {
      value: value,
      done: done
    };
  }
  function maybeDefine(object, name, descr) {
    if (!(name in object)) {
      Object.defineProperty(object, name, descr);
    }
  }
  function maybeDefineMethod(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  function maybeDefineConst(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  function maybeAddFunctions(object, functions) {
    for (var i = 0; i < functions.length; i += 2) {
      var name = functions[i];
      var value = functions[i + 1];
      maybeDefineMethod(object, name, value);
    }
  }
  function maybeAddConsts(object, consts) {
    for (var i = 0; i < consts.length; i += 2) {
      var name = consts[i];
      var value = consts[i + 1];
      maybeDefineConst(object, name, value);
    }
  }
  function maybeAddIterator(object, func, Symbol) {
    if (!Symbol || !Symbol.iterator || object[Symbol.iterator])
      return;
    if (object['@@iterator'])
      func = object['@@iterator'];
    Object.defineProperty(object, Symbol.iterator, {
      value: func,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  var polyfills = [];
  function registerPolyfill(func) {
    polyfills.push(func);
  }
  function polyfillAll(global) {
    polyfills.forEach((function(f) {
      return f(global);
    }));
  }
  return {
    get toObject() {
      return toObject;
    },
    get toUint32() {
      return toUint32;
    },
    get isObject() {
      return isObject;
    },
    get isCallable() {
      return isCallable;
    },
    get isNumber() {
      return isNumber;
    },
    get toInteger() {
      return toInteger;
    },
    get toLength() {
      return toLength;
    },
    get checkIterable() {
      return checkIterable;
    },
    get isConstructor() {
      return isConstructor;
    },
    get createIteratorResultObject() {
      return createIteratorResultObject;
    },
    get maybeDefine() {
      return maybeDefine;
    },
    get maybeDefineMethod() {
      return maybeDefineMethod;
    },
    get maybeDefineConst() {
      return maybeDefineConst;
    },
    get maybeAddFunctions() {
      return maybeAddFunctions;
    },
    get maybeAddConsts() {
      return maybeAddConsts;
    },
    get maybeAddIterator() {
      return maybeAddIterator;
    },
    get registerPolyfill() {
      return registerPolyfill;
    },
    get polyfillAll() {
      return polyfillAll;
    }
  };
});
System.register("traceur-runtime@0.0.65/src/runtime/polyfills/Map", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.65/src/runtime/polyfills/Map";
  var $__3 = System.get("traceur-runtime@0.0.65/src/runtime/polyfills/utils"),
      isObject = $__3.isObject,
      maybeAddIterator = $__3.maybeAddIterator,
      registerPolyfill = $__3.registerPolyfill;
  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  var deletedSentinel = {};
  function lookupIndex(map, key) {
    if (isObject(key)) {
      var hashObject = getOwnHashObject(key);
      return hashObject && map.objectIndex_[hashObject.hash];
    }
    if (typeof key === 'string')
      return map.stringIndex_[key];
    return map.primitiveIndex_[key];
  }
  function initMap(map) {
    map.entries_ = [];
    map.objectIndex_ = Object.create(null);
    map.stringIndex_ = Object.create(null);
    map.primitiveIndex_ = Object.create(null);
    map.deletedCount_ = 0;
  }
  var Map = function Map() {
    var iterable = arguments[0];
    if (!isObject(this))
      throw new TypeError('Map called on incompatible type');
    if ($hasOwnProperty.call(this, 'entries_')) {
      throw new TypeError('Map can not be reentrantly initialised');
    }
    initMap(this);
    if (iterable !== null && iterable !== undefined) {
      for (var $__5 = iterable[Symbol.iterator](),
          $__6; !($__6 = $__5.next()).done; ) {
        var $__7 = $__6.value,
            key = $__7[0],
            value = $__7[1];
        {
          this.set(key, value);
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Map, {
    get size() {
      return this.entries_.length / 2 - this.deletedCount_;
    },
    get: function(key) {
      var index = lookupIndex(this, key);
      if (index !== undefined)
        return this.entries_[index + 1];
    },
    set: function(key, value) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
      var index = lookupIndex(this, key);
      if (index !== undefined) {
        this.entries_[index + 1] = value;
      } else {
        index = this.entries_.length;
        this.entries_[index] = key;
        this.entries_[index + 1] = value;
        if (objectMode) {
          var hashObject = getOwnHashObject(key);
          var hash = hashObject.hash;
          this.objectIndex_[hash] = index;
        } else if (stringMode) {
          this.stringIndex_[key] = index;
        } else {
          this.primitiveIndex_[key] = index;
        }
      }
      return this;
    },
    has: function(key) {
      return lookupIndex(this, key) !== undefined;
    },
    delete: function(key) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
      var index;
      var hash;
      if (objectMode) {
        var hashObject = getOwnHashObject(key);
        if (hashObject) {
          index = this.objectIndex_[hash = hashObject.hash];
          delete this.objectIndex_[hash];
        }
      } else if (stringMode) {
        index = this.stringIndex_[key];
        delete this.stringIndex_[key];
      } else {
        index = this.primitiveIndex_[key];
        delete this.primitiveIndex_[key];
      }
      if (index !== undefined) {
        this.entries_[index] = deletedSentinel;
        this.entries_[index + 1] = undefined;
        this.deletedCount_++;
        return true;
      }
      return false;
    },
    clear: function() {
      initMap(this);
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      for (var i = 0; i < this.entries_.length; i += 2) {
        var key = this.entries_[i];
        var value = this.entries_[i + 1];
        if (key === deletedSentinel)
          continue;
        callbackFn.call(thisArg, value, key, this);
      }
    },
    entries: $traceurRuntime.initGeneratorFunction(function $__8() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return [key, value];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__8, this);
    }),
    keys: $traceurRuntime.initGeneratorFunction(function $__9() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return key;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__9, this);
    }),
    values: $traceurRuntime.initGeneratorFunction(function $__10() {
      var i,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < this.entries_.length) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return value;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__10, this);
    })
  }, {});
  Object.defineProperty(Map.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Map.prototype.entries
  });
  function polyfillMap(global) {
    var $__7 = global,
        Object = $__7.Object,
        Symbol = $__7.Symbol;
    if (!global.Map)
      global.Map = Map;
    var mapPrototype = global.Map.prototype;
    if (mapPrototype.entries) {
      maybeAddIterator(mapPrototype, mapPrototype.entries, Symbol);
      maybeAddIterator(Object.getPrototypeOf(new global.Map().entries()), function() {
        return this;
      }, Symbol);
    }
  }
  registerPolyfill(polyfillMap);
  return {
    get Map() {
      return Map;
    },
    get polyfillMap() {
      return polyfillMap;
    }
  };
});
System.get("traceur-runtime@0.0.65/src/runtime/polyfills/Map" + '');
System.register("traceur-runtime@0.0.65/src/runtime/polyfills/Set", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.65/src/runtime/polyfills/Set";
  var $__11 = System.get("traceur-runtime@0.0.65/src/runtime/polyfills/utils"),
      isObject = $__11.isObject,
      maybeAddIterator = $__11.maybeAddIterator,
      registerPolyfill = $__11.registerPolyfill;
  var Map = System.get("traceur-runtime@0.0.65/src/runtime/polyfills/Map").Map;
  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  function initSet(set) {
    set.map_ = new Map();
  }
  var Set = function Set() {
    var iterable = arguments[0];
    if (!isObject(this))
      throw new TypeError('Set called on incompatible type');
    if ($hasOwnProperty.call(this, 'map_')) {
      throw new TypeError('Set can not be reentrantly initialised');
    }
    initSet(this);
    if (iterable !== null && iterable !== undefined) {
      for (var $__15 = iterable[Symbol.iterator](),
          $__16; !($__16 = $__15.next()).done; ) {
        var item = $__16.value;
        {
          this.add(item);
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Set, {
    get size() {
      return this.map_.size;
    },
    has: function(key) {
      return this.map_.has(key);
    },
    add: function(key) {
      this.map_.set(key, key);
      return this;
    },
    delete: function(key) {
      return this.map_.delete(key);
    },
    clear: function() {
      return this.map_.clear();
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      var $__13 = this;
      return this.map_.forEach((function(value, key) {
        callbackFn.call(thisArg, key, key, $__13);
      }));
    },
    values: $traceurRuntime.initGeneratorFunction(function $__18() {
      var $__19,
          $__20;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__19 = this.map_.keys()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__20 = $__19[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__20.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__20.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__20.value;
            default:
              return $ctx.end();
          }
      }, $__18, this);
    }),
    entries: $traceurRuntime.initGeneratorFunction(function $__21() {
      var $__22,
          $__23;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__22 = this.map_.entries()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__23 = $__22[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__23.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__23.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__23.value;
            default:
              return $ctx.end();
          }
      }, $__21, this);
    })
  }, {});
  Object.defineProperty(Set.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  Object.defineProperty(Set.prototype, 'keys', {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  function polyfillSet(global) {
    var $__17 = global,
        Object = $__17.Object,
        Symbol = $__17.Symbol;
    if (!global.Set)
      global.Set = Set;
    var setPrototype = global.Set.prototype;
    if (setPrototype.values) {
      maybeAddIterator(setPrototype, setPrototype.values, Symbol);
      maybeAddIterator(Object.getPrototypeOf(new global.Set().values()), function() {
        return this;
      }, Symbol);
    }
  }
  registerPolyfill(polyfillSet);
  return {
    get Set() {
      return Set;
    },
    get polyfillSet() {
      return polyfillSet;
    }
  };
});
System.get("traceur-runtime@0.0.65/src/runtime/polyfills/Set" + '');
System.register("traceur-runtime@0.0.65/node_modules/rsvp/lib/rsvp/asap", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.65/node_modules/rsvp/lib/rsvp/asap";
  var len = 0;
  function asap(callback, arg) {
    queue[len] = callback;
    queue[len + 1] = arg;
    len += 2;
    if (len === 2) {
      scheduleFlush();
    }
  }
  var $__default = asap;
  var browserGlobal = (typeof window !== 'undefined') ? window : {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
  function useNextTick() {
    return function() {
      process.nextTick(flush);
    };
  }
  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, {characterData: true});
    return function() {
      node.data = (iterations = ++iterations % 2);
    };
  }
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function() {
      channel.port2.postMessage(0);
    };
  }
  function useSetTimeout() {
    return function() {
      setTimeout(flush, 1);
    };
  }
  var queue = new Array(1000);
  function flush() {
    for (var i = 0; i < len; i += 2) {
      var callback = queue[i];
      var arg = queue[i + 1];
      callback(arg);
      queue[i] = undefined;
      queue[i + 1] = undefined;
    }
    len = 0;
  }
  var scheduleFlush;
  if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush = useMessageChannel();
  } else {
    scheduleFlush = useSetTimeout();
  }
  return {get default() {
      return $__default;
    }};
});
System.register("traceur-runtime@0.0.65/src/runtime/polyfills/Promise", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.65/src/runtime/polyfills/Promise";
  var async = System.get("traceur-runtime@0.0.65/node_modules/rsvp/lib/rsvp/asap").default;
  var registerPolyfill = System.get("traceur-runtime@0.0.65/src/runtime/polyfills/utils").registerPolyfill;
  var promiseRaw = {};
  function isPromise(x) {
    return x && typeof x === 'object' && x.status_ !== undefined;
  }
  function idResolveHandler(x) {
    return x;
  }
  function idRejectHandler(x) {
    throw x;
  }
  function chain(promise) {
    var onResolve = arguments[1] !== (void 0) ? arguments[1] : idResolveHandler;
    var onReject = arguments[2] !== (void 0) ? arguments[2] : idRejectHandler;
    var deferred = getDeferred(promise.constructor);
    switch (promise.status_) {
      case undefined:
        throw TypeError;
      case 0:
        promise.onResolve_.push(onResolve, deferred);
        promise.onReject_.push(onReject, deferred);
        break;
      case +1:
        promiseEnqueue(promise.value_, [onResolve, deferred]);
        break;
      case -1:
        promiseEnqueue(promise.value_, [onReject, deferred]);
        break;
    }
    return deferred.promise;
  }
  function getDeferred(C) {
    if (this === $Promise) {
      var promise = promiseInit(new $Promise(promiseRaw));
      return {
        promise: promise,
        resolve: (function(x) {
          promiseResolve(promise, x);
        }),
        reject: (function(r) {
          promiseReject(promise, r);
        })
      };
    } else {
      var result = {};
      result.promise = new C((function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
      }));
      return result;
    }
  }
  function promiseSet(promise, status, value, onResolve, onReject) {
    promise.status_ = status;
    promise.value_ = value;
    promise.onResolve_ = onResolve;
    promise.onReject_ = onReject;
    return promise;
  }
  function promiseInit(promise) {
    return promiseSet(promise, 0, undefined, [], []);
  }
  var Promise = function Promise(resolver) {
    if (resolver === promiseRaw)
      return;
    if (typeof resolver !== 'function')
      throw new TypeError;
    var promise = promiseInit(this);
    try {
      resolver((function(x) {
        promiseResolve(promise, x);
      }), (function(r) {
        promiseReject(promise, r);
      }));
    } catch (e) {
      promiseReject(promise, e);
    }
  };
  ($traceurRuntime.createClass)(Promise, {
    catch: function(onReject) {
      return this.then(undefined, onReject);
    },
    then: function(onResolve, onReject) {
      if (typeof onResolve !== 'function')
        onResolve = idResolveHandler;
      if (typeof onReject !== 'function')
        onReject = idRejectHandler;
      var that = this;
      var constructor = this.constructor;
      return chain(this, function(x) {
        x = promiseCoerce(constructor, x);
        return x === that ? onReject(new TypeError) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
      }, onReject);
    }
  }, {
    resolve: function(x) {
      if (this === $Promise) {
        if (isPromise(x)) {
          return x;
        }
        return promiseSet(new $Promise(promiseRaw), +1, x);
      } else {
        return new this(function(resolve, reject) {
          resolve(x);
        });
      }
    },
    reject: function(r) {
      if (this === $Promise) {
        return promiseSet(new $Promise(promiseRaw), -1, r);
      } else {
        return new this((function(resolve, reject) {
          reject(r);
        }));
      }
    },
    all: function(values) {
      var deferred = getDeferred(this);
      var resolutions = [];
      try {
        var count = values.length;
        if (count === 0) {
          deferred.resolve(resolutions);
        } else {
          for (var i = 0; i < values.length; i++) {
            this.resolve(values[i]).then(function(i, x) {
              resolutions[i] = x;
              if (--count === 0)
                deferred.resolve(resolutions);
            }.bind(undefined, i), (function(r) {
              deferred.reject(r);
            }));
          }
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    },
    race: function(values) {
      var deferred = getDeferred(this);
      try {
        for (var i = 0; i < values.length; i++) {
          this.resolve(values[i]).then((function(x) {
            deferred.resolve(x);
          }), (function(r) {
            deferred.reject(r);
          }));
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    }
  });
  var $Promise = Promise;
  var $PromiseReject = $Promise.reject;
  function promiseResolve(promise, x) {
    promiseDone(promise, +1, x, promise.onResolve_);
  }
  function promiseReject(promise, r) {
    promiseDone(promise, -1, r, promise.onReject_);
  }
  function promiseDone(promise, status, value, reactions) {
    if (promise.status_ !== 0)
      return;
    promiseEnqueue(value, reactions);
    promiseSet(promise, status, value);
  }
  function promiseEnqueue(value, tasks) {
    async((function() {
      for (var i = 0; i < tasks.length; i += 2) {
        promiseHandle(value, tasks[i], tasks[i + 1]);
      }
    }));
  }
  function promiseHandle(value, handler, deferred) {
    try {
      var result = handler(value);
      if (result === deferred.promise)
        throw new TypeError;
      else if (isPromise(result))
        chain(result, deferred.resolve, deferred.reject);
      else
        deferred.resolve(result);
    } catch (e) {
      try {
        deferred.reject(e);
      } catch (e) {}
    }
  }
  var thenableSymbol = '@@thenable';
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function promiseCoerce(constructor, x) {
    if (!isPromise(x) && isObject(x)) {
      var then;
      try {
        then = x.then;
      } catch (r) {
        var promise = $PromiseReject.call(constructor, r);
        x[thenableSymbol] = promise;
        return promise;
      }
      if (typeof then === 'function') {
        var p = x[thenableSymbol];
        if (p) {
          return p;
        } else {
          var deferred = getDeferred(constructor);
          x[thenableSymbol] = deferred.promise;
          try {
            then.call(x, deferred.resolve, deferred.reject);
          } catch (r) {
            deferred.reject(r);
          }
          return deferred.promise;
        }
      }
    }
    return x;
  }
  function polyfillPromise(global) {
    if (!global.Promise)
      global.Promise = Promise;
  }
  registerPolyfill(polyfillPromise);
  return {
    get Promise() {
      return Promise;
    },
    get polyfillPromise() {
      return polyfillPromise;
    }
  };
});
System.get("traceur-runtime@0.0.65/src/runtime/polyfills/Promise" + '');
System.register("traceur-runtime@0.0.65/src/runtime/polyfills/StringIterator", [], function() {
  "use strict";
  var $__29;
  var __moduleName = "traceur-runtime@0.0.65/src/runtime/polyfills/StringIterator";
  var $__27 = System.get("traceur-runtime@0.0.65/src/runtime/polyfills/utils"),
      createIteratorResultObject = $__27.createIteratorResultObject,
      isObject = $__27.isObject;
  var $__30 = $traceurRuntime,
      hasOwnProperty = $__30.hasOwnProperty,
      toProperty = $__30.toProperty;
  var iteratedString = Symbol('iteratedString');
  var stringIteratorNextIndex = Symbol('stringIteratorNextIndex');
  var StringIterator = function StringIterator() {};
  ($traceurRuntime.createClass)(StringIterator, ($__29 = {}, Object.defineProperty($__29, "next", {
    value: function() {
      var o = this;
      if (!isObject(o) || !hasOwnProperty(o, iteratedString)) {
        throw new TypeError('this must be a StringIterator object');
      }
      var s = o[toProperty(iteratedString)];
      if (s === undefined) {
        return createIteratorResultObject(undefined, true);
      }
      var position = o[toProperty(stringIteratorNextIndex)];
      var len = s.length;
      if (position >= len) {
        o[toProperty(iteratedString)] = undefined;
        return createIteratorResultObject(undefined, true);
      }
      var first = s.charCodeAt(position);
      var resultString;
      if (first < 0xD800 || first > 0xDBFF || position + 1 === len) {
        resultString = String.fromCharCode(first);
      } else {
        var second = s.charCodeAt(position + 1);
        if (second < 0xDC00 || second > 0xDFFF) {
          resultString = String.fromCharCode(first);
        } else {
          resultString = String.fromCharCode(first) + String.fromCharCode(second);
        }
      }
      o[toProperty(stringIteratorNextIndex)] = position + resultString.length;
      return createIteratorResultObject(resultString, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__29, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__29), {});
  function createStringIterator(string) {
    var s = String(string);
    var iterator = Object.create(StringIterator.prototype);
    iterator[toProperty(iteratedString)] = s;
    iterator[toProperty(stringIteratorNextIndex)] = 0;
    return iterator;
  }
  return {get createStringIterator() {
      return createStringIterator;
    }};
});
System.register("traceur-runtime@0.0.65/src/runtime/polyfills/String", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.65/src/runtime/polyfills/String";
  var createStringIterator = System.get("traceur-runtime@0.0.65/src/runtime/polyfills/StringIterator").createStringIterator;
  var $__32 = System.get("traceur-runtime@0.0.65/src/runtime/polyfills/utils"),
      maybeAddFunctions = $__32.maybeAddFunctions,
      maybeAddIterator = $__32.maybeAddIterator,
      registerPolyfill = $__32.registerPolyfill;
  var $toString = Object.prototype.toString;
  var $indexOf = String.prototype.indexOf;
  var $lastIndexOf = String.prototype.lastIndexOf;
  function startsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) == start;
  }
  function endsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var pos = stringLength;
    if (arguments.length > 1) {
      var position = arguments[1];
      if (position !== undefined) {
        pos = position ? Number(position) : 0;
        if (isNaN(pos)) {
          pos = 0;
        }
      }
    }
    var end = Math.min(Math.max(pos, 0), stringLength);
    var start = end - searchLength;
    if (start < 0) {
      return false;
    }
    return $lastIndexOf.call(string, searchString, start) == start;
  }
  function contains(search) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) != -1;
  }
  function repeat(count) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var n = count ? Number(count) : 0;
    if (isNaN(n)) {
      n = 0;
    }
    if (n < 0 || n == Infinity) {
      throw RangeError();
    }
    if (n == 0) {
      return '';
    }
    var result = '';
    while (n--) {
      result += string;
    }
    return result;
  }
  function codePointAt(position) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var size = string.length;
    var index = position ? Number(position) : 0;
    if (isNaN(index)) {
      index = 0;
    }
    if (index < 0 || index >= size) {
      return undefined;
    }
    var first = string.charCodeAt(index);
    var second;
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }
  function raw(callsite) {
    var raw = callsite.raw;
    var len = raw.length >>> 0;
    if (len === 0)
      return '';
    var s = '';
    var i = 0;
    while (true) {
      s += raw[i];
      if (i + 1 === len)
        return s;
      s += arguments[++i];
    }
  }
  function fromCodePoint() {
    var codeUnits = [];
    var floor = Math.floor;
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) {
      return '';
    }
    while (++index < length) {
      var codePoint = Number(arguments[index]);
      if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
      if (codePoint <= 0xFFFF) {
        codeUnits.push(codePoint);
      } else {
        codePoint -= 0x10000;
        highSurrogate = (codePoint >> 10) + 0xD800;
        lowSurrogate = (codePoint % 0x400) + 0xDC00;
        codeUnits.push(highSurrogate, lowSurrogate);
      }
    }
    return String.fromCharCode.apply(null, codeUnits);
  }
  function stringPrototypeIterator() {
    var o = $traceurRuntime.checkObjectCoercible(this);
    var s = String(o);
    return createStringIterator(s);
  }
  function polyfillString(global) {
    var String = global.String;
    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'contains', contains, 'endsWith', endsWith, 'startsWith', startsWith, 'repeat', repeat]);
    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
    maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
  }
  registerPolyfill(polyfillString);
  return {
    get startsWith() {
      return startsWith;
    },
    get endsWith() {
      return endsWith;
    },
    get contains() {
      return contains;
    },
    get repeat() {
      return repeat;
    },
    get codePointAt() {
      return codePointAt;
    },
    get raw() {
      return raw;
    },
    get fromCodePoint() {
      return fromCodePoint;
    },
    get stringPrototypeIterator() {
      return stringPrototypeIterator;
    },
    get polyfillString() {
      return polyfillString;
    }
  };
});
System.get("traceur-runtime@0.0.65/src/runtime/polyfills/String" + '');
System.register("traceur-runtime@0.0.65/src/runtime/polyfills/ArrayIterator", [], function() {
  "use strict";
  var $__36;
  var __moduleName = "traceur-runtime@0.0.65/src/runtime/polyfills/ArrayIterator";
  var $__34 = System.get("traceur-runtime@0.0.65/src/runtime/polyfills/utils"),
      toObject = $__34.toObject,
      toUint32 = $__34.toUint32,
      createIteratorResultObject = $__34.createIteratorResultObject;
  var ARRAY_ITERATOR_KIND_KEYS = 1;
  var ARRAY_ITERATOR_KIND_VALUES = 2;
  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
  var ArrayIterator = function ArrayIterator() {};
  ($traceurRuntime.createClass)(ArrayIterator, ($__36 = {}, Object.defineProperty($__36, "next", {
    value: function() {
      var iterator = toObject(this);
      var array = iterator.iteratorObject_;
      if (!array) {
        throw new TypeError('Object is not an ArrayIterator');
      }
      var index = iterator.arrayIteratorNextIndex_;
      var itemKind = iterator.arrayIterationKind_;
      var length = toUint32(array.length);
      if (index >= length) {
        iterator.arrayIteratorNextIndex_ = Infinity;
        return createIteratorResultObject(undefined, true);
      }
      iterator.arrayIteratorNextIndex_ = index + 1;
      if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
        return createIteratorResultObject(array[index], false);
      if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
        return createIteratorResultObject([index, array[index]], false);
      return createIteratorResultObject(index, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__36, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__36), {});
  function createArrayIterator(array, kind) {
    var object = toObject(array);
    var iterator = new ArrayIterator;
    iterator.iteratorObject_ = object;
    iterator.arrayIteratorNextIndex_ = 0;
    iterator.arrayIterationKind_ = kind;
    return iterator;
  }
  function entries() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
  }
  function keys() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
  }
  function values() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
  }
  return {
    get entries() {
      return entries;
    },
    get keys() {
      return keys;
    },
    get values() {
      return values;
    }
  };
});
System.register("traceur-runtime@0.0.65/src/runtime/polyfills/Array", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.65/src/runtime/polyfills/Array";
  var $__37 = System.get("traceur-runtime@0.0.65/src/runtime/polyfills/ArrayIterator"),
      entries = $__37.entries,
      keys = $__37.keys,
      values = $__37.values;
  var $__38 = System.get("traceur-runtime@0.0.65/src/runtime/polyfills/utils"),
      checkIterable = $__38.checkIterable,
      isCallable = $__38.isCallable,
      isConstructor = $__38.isConstructor,
      maybeAddFunctions = $__38.maybeAddFunctions,
      maybeAddIterator = $__38.maybeAddIterator,
      registerPolyfill = $__38.registerPolyfill,
      toInteger = $__38.toInteger,
      toLength = $__38.toLength,
      toObject = $__38.toObject;
  function from(arrLike) {
    var mapFn = arguments[1];
    var thisArg = arguments[2];
    var C = this;
    var items = toObject(arrLike);
    var mapping = mapFn !== undefined;
    var k = 0;
    var arr,
        len;
    if (mapping && !isCallable(mapFn)) {
      throw TypeError();
    }
    if (checkIterable(items)) {
      arr = isConstructor(C) ? new C() : [];
      for (var $__39 = items[Symbol.iterator](),
          $__40; !($__40 = $__39.next()).done; ) {
        var item = $__40.value;
        {
          if (mapping) {
            arr[k] = mapFn.call(thisArg, item, k);
          } else {
            arr[k] = item;
          }
          k++;
        }
      }
      arr.length = k;
      return arr;
    }
    len = toLength(items.length);
    arr = isConstructor(C) ? new C(len) : new Array(len);
    for (; k < len; k++) {
      if (mapping) {
        arr[k] = typeof thisArg === 'undefined' ? mapFn(items[k], k) : mapFn.call(thisArg, items[k], k);
      } else {
        arr[k] = items[k];
      }
    }
    arr.length = len;
    return arr;
  }
  function of() {
    for (var items = [],
        $__41 = 0; $__41 < arguments.length; $__41++)
      items[$__41] = arguments[$__41];
    var C = this;
    var len = items.length;
    var arr = isConstructor(C) ? new C(len) : new Array(len);
    for (var k = 0; k < len; k++) {
      arr[k] = items[k];
    }
    arr.length = len;
    return arr;
  }
  function fill(value) {
    var start = arguments[1] !== (void 0) ? arguments[1] : 0;
    var end = arguments[2];
    var object = toObject(this);
    var len = toLength(object.length);
    var fillStart = toInteger(start);
    var fillEnd = end !== undefined ? toInteger(end) : len;
    fillStart = fillStart < 0 ? Math.max(len + fillStart, 0) : Math.min(fillStart, len);
    fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);
    while (fillStart < fillEnd) {
      object[fillStart] = value;
      fillStart++;
    }
    return object;
  }
  function find(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg);
  }
  function findIndex(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg, true);
  }
  function findHelper(self, predicate) {
    var thisArg = arguments[2];
    var returnIndex = arguments[3] !== (void 0) ? arguments[3] : false;
    var object = toObject(self);
    var len = toLength(object.length);
    if (!isCallable(predicate)) {
      throw TypeError();
    }
    for (var i = 0; i < len; i++) {
      if (i in object) {
        var value = object[i];
        if (predicate.call(thisArg, value, i, object)) {
          return returnIndex ? i : value;
        }
      }
    }
    return returnIndex ? -1 : undefined;
  }
  function polyfillArray(global) {
    var $__42 = global,
        Array = $__42.Array,
        Object = $__42.Object,
        Symbol = $__42.Symbol;
    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
    maybeAddFunctions(Array, ['from', from, 'of', of]);
    maybeAddIterator(Array.prototype, values, Symbol);
    maybeAddIterator(Object.getPrototypeOf([].values()), function() {
      return this;
    }, Symbol);
  }
  registerPolyfill(polyfillArray);
  return {
    get from() {
      return from;
    },
    get of() {
      return of;
    },
    get fill() {
      return fill;
    },
    get find() {
      return find;
    },
    get findIndex() {
      return findIndex;
    },
    get polyfillArray() {
      return polyfillArray;
    }
  };
});
System.get("traceur-runtime@0.0.65/src/runtime/polyfills/Array" + '');
System.register("traceur-runtime@0.0.65/src/runtime/polyfills/Object", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.65/src/runtime/polyfills/Object";
  var $__43 = System.get("traceur-runtime@0.0.65/src/runtime/polyfills/utils"),
      maybeAddFunctions = $__43.maybeAddFunctions,
      registerPolyfill = $__43.registerPolyfill;
  var $__44 = $traceurRuntime,
      defineProperty = $__44.defineProperty,
      getOwnPropertyDescriptor = $__44.getOwnPropertyDescriptor,
      getOwnPropertyNames = $__44.getOwnPropertyNames,
      keys = $__44.keys,
      privateNames = $__44.privateNames;
  function is(left, right) {
    if (left === right)
      return left !== 0 || 1 / left === 1 / right;
    return left !== left && right !== right;
  }
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      var props = keys(source);
      var p,
          length = props.length;
      for (p = 0; p < length; p++) {
        var name = props[p];
        if (privateNames[name])
          continue;
        target[name] = source[name];
      }
    }
    return target;
  }
  function mixin(target, source) {
    var props = getOwnPropertyNames(source);
    var p,
        descriptor,
        length = props.length;
    for (p = 0; p < length; p++) {
      var name = props[p];
      if (privateNames[name])
        continue;
      descriptor = getOwnPropertyDescriptor(source, props[p]);
      defineProperty(target, props[p], descriptor);
    }
    return target;
  }
  function polyfillObject(global) {
    var Object = global.Object;
    maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
  }
  registerPolyfill(polyfillObject);
  return {
    get is() {
      return is;
    },
    get assign() {
      return assign;
    },
    get mixin() {
      return mixin;
    },
    get polyfillObject() {
      return polyfillObject;
    }
  };
});
System.get("traceur-runtime@0.0.65/src/runtime/polyfills/Object" + '');
System.register("traceur-runtime@0.0.65/src/runtime/polyfills/Number", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.65/src/runtime/polyfills/Number";
  var $__46 = System.get("traceur-runtime@0.0.65/src/runtime/polyfills/utils"),
      isNumber = $__46.isNumber,
      maybeAddConsts = $__46.maybeAddConsts,
      maybeAddFunctions = $__46.maybeAddFunctions,
      registerPolyfill = $__46.registerPolyfill,
      toInteger = $__46.toInteger;
  var $abs = Math.abs;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
  var MIN_SAFE_INTEGER = -Math.pow(2, 53) + 1;
  var EPSILON = Math.pow(2, -52);
  function NumberIsFinite(number) {
    return isNumber(number) && $isFinite(number);
  }
  ;
  function isInteger(number) {
    return NumberIsFinite(number) && toInteger(number) === number;
  }
  function NumberIsNaN(number) {
    return isNumber(number) && $isNaN(number);
  }
  ;
  function isSafeInteger(number) {
    if (NumberIsFinite(number)) {
      var integral = toInteger(number);
      if (integral === number)
        return $abs(integral) <= MAX_SAFE_INTEGER;
    }
    return false;
  }
  function polyfillNumber(global) {
    var Number = global.Number;
    maybeAddConsts(Number, ['MAX_SAFE_INTEGER', MAX_SAFE_INTEGER, 'MIN_SAFE_INTEGER', MIN_SAFE_INTEGER, 'EPSILON', EPSILON]);
    maybeAddFunctions(Number, ['isFinite', NumberIsFinite, 'isInteger', isInteger, 'isNaN', NumberIsNaN, 'isSafeInteger', isSafeInteger]);
  }
  registerPolyfill(polyfillNumber);
  return {
    get MAX_SAFE_INTEGER() {
      return MAX_SAFE_INTEGER;
    },
    get MIN_SAFE_INTEGER() {
      return MIN_SAFE_INTEGER;
    },
    get EPSILON() {
      return EPSILON;
    },
    get isFinite() {
      return NumberIsFinite;
    },
    get isInteger() {
      return isInteger;
    },
    get isNaN() {
      return NumberIsNaN;
    },
    get isSafeInteger() {
      return isSafeInteger;
    },
    get polyfillNumber() {
      return polyfillNumber;
    }
  };
});
System.get("traceur-runtime@0.0.65/src/runtime/polyfills/Number" + '');
System.register("traceur-runtime@0.0.65/src/runtime/polyfills/polyfills", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.65/src/runtime/polyfills/polyfills";
  var polyfillAll = System.get("traceur-runtime@0.0.65/src/runtime/polyfills/utils").polyfillAll;
  polyfillAll(this);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
    polyfillAll(global);
  };
  return {};
});
System.get("traceur-runtime@0.0.65/src/runtime/polyfills/polyfills" + '');

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":46}],46:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],47:[function(require,module,exports){
(function (process,global){
(function(global) {
  'use strict';
  if (global.$traceurRuntime) {
    return;
  }
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $Object.defineProperties;
  var $defineProperty = $Object.defineProperty;
  var $freeze = $Object.freeze;
  var $getOwnPropertyDescriptor = $Object.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $Object.getOwnPropertyNames;
  var $keys = $Object.keys;
  var $hasOwnProperty = $Object.prototype.hasOwnProperty;
  var $toString = $Object.prototype.toString;
  var $preventExtensions = Object.preventExtensions;
  var $seal = Object.seal;
  var $isExtensible = Object.isExtensible;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var types = {
    void: function voidType() {},
    any: function any() {},
    string: function string() {},
    number: function number() {},
    boolean: function boolean() {}
  };
  var method = nonEnum;
  var counter = 0;
  function newUniqueString() {
    return '__$' + Math.floor(Math.random() * 1e9) + '$' + ++counter + '$__';
  }
  var symbolInternalProperty = newUniqueString();
  var symbolDescriptionProperty = newUniqueString();
  var symbolDataProperty = newUniqueString();
  var symbolValues = $create(null);
  var privateNames = $create(null);
  function createPrivateName() {
    var s = newUniqueString();
    privateNames[s] = true;
    return s;
  }
  function isSymbol(symbol) {
    return typeof symbol === 'object' && symbol instanceof SymbolValue;
  }
  function typeOf(v) {
    if (isSymbol(v))
      return 'symbol';
    return typeof v;
  }
  function Symbol(description) {
    var value = new SymbolValue(description);
    if (!(this instanceof Symbol))
      return value;
    throw new TypeError('Symbol cannot be new\'ed');
  }
  $defineProperty(Symbol.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(Symbol.prototype, 'toString', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    var desc = symbolValue[symbolDescriptionProperty];
    if (desc === undefined)
      desc = '';
    return 'Symbol(' + desc + ')';
  }));
  $defineProperty(Symbol.prototype, 'valueOf', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    return symbolValue;
  }));
  function SymbolValue(description) {
    var key = newUniqueString();
    $defineProperty(this, symbolDataProperty, {value: this});
    $defineProperty(this, symbolInternalProperty, {value: key});
    $defineProperty(this, symbolDescriptionProperty, {value: description});
    freeze(this);
    symbolValues[key] = this;
  }
  $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(SymbolValue.prototype, 'toString', {
    value: Symbol.prototype.toString,
    enumerable: false
  });
  $defineProperty(SymbolValue.prototype, 'valueOf', {
    value: Symbol.prototype.valueOf,
    enumerable: false
  });
  var hashProperty = createPrivateName();
  var hashPropertyDescriptor = {value: undefined};
  var hashObjectProperties = {
    hash: {value: undefined},
    self: {value: undefined}
  };
  var hashCounter = 0;
  function getOwnHashObject(object) {
    var hashObject = object[hashProperty];
    if (hashObject && hashObject.self === object)
      return hashObject;
    if ($isExtensible(object)) {
      hashObjectProperties.hash.value = hashCounter++;
      hashObjectProperties.self.value = object;
      hashPropertyDescriptor.value = $create(null, hashObjectProperties);
      $defineProperty(object, hashProperty, hashPropertyDescriptor);
      return hashPropertyDescriptor.value;
    }
    return undefined;
  }
  function freeze(object) {
    getOwnHashObject(object);
    return $freeze.apply(this, arguments);
  }
  function preventExtensions(object) {
    getOwnHashObject(object);
    return $preventExtensions.apply(this, arguments);
  }
  function seal(object) {
    getOwnHashObject(object);
    return $seal.apply(this, arguments);
  }
  Symbol.iterator = Symbol();
  freeze(SymbolValue.prototype);
  function toProperty(name) {
    if (isSymbol(name))
      return name[symbolInternalProperty];
    return name;
  }
  function getOwnPropertyNames(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (!symbolValues[name] && !privateNames[name])
        rv.push(name);
    }
    return rv;
  }
  function getOwnPropertyDescriptor(object, name) {
    return $getOwnPropertyDescriptor(object, toProperty(name));
  }
  function getOwnPropertySymbols(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var symbol = symbolValues[names[i]];
      if (symbol)
        rv.push(symbol);
    }
    return rv;
  }
  function hasOwnProperty(name) {
    return $hasOwnProperty.call(this, toProperty(name));
  }
  function getOption(name) {
    return global.traceur && global.traceur.options[name];
  }
  function setProperty(object, name, value) {
    var sym,
        desc;
    if (isSymbol(name)) {
      sym = name;
      name = name[symbolInternalProperty];
    }
    object[name] = value;
    if (sym && (desc = $getOwnPropertyDescriptor(object, name)))
      $defineProperty(object, name, {enumerable: false});
    return value;
  }
  function defineProperty(object, name, descriptor) {
    if (isSymbol(name)) {
      if (descriptor.enumerable) {
        descriptor = $create(descriptor, {enumerable: {value: false}});
      }
      name = name[symbolInternalProperty];
    }
    $defineProperty(object, name, descriptor);
    return object;
  }
  function polyfillObject(Object) {
    $defineProperty(Object, 'defineProperty', {value: defineProperty});
    $defineProperty(Object, 'getOwnPropertyNames', {value: getOwnPropertyNames});
    $defineProperty(Object, 'getOwnPropertyDescriptor', {value: getOwnPropertyDescriptor});
    $defineProperty(Object.prototype, 'hasOwnProperty', {value: hasOwnProperty});
    $defineProperty(Object, 'freeze', {value: freeze});
    $defineProperty(Object, 'preventExtensions', {value: preventExtensions});
    $defineProperty(Object, 'seal', {value: seal});
    Object.getOwnPropertySymbols = getOwnPropertySymbols;
  }
  function exportStar(object) {
    for (var i = 1; i < arguments.length; i++) {
      var names = $getOwnPropertyNames(arguments[i]);
      for (var j = 0; j < names.length; j++) {
        var name = names[j];
        if (privateNames[name])
          continue;
        (function(mod, name) {
          $defineProperty(object, name, {
            get: function() {
              return mod[name];
            },
            enumerable: true
          });
        })(arguments[i], names[j]);
      }
    }
    return object;
  }
  function isObject(x) {
    return x != null && (typeof x === 'object' || typeof x === 'function');
  }
  function toObject(x) {
    if (x == null)
      throw $TypeError();
    return $Object(x);
  }
  function assertObject(x) {
    if (!isObject(x))
      throw $TypeError(x + ' is not an Object');
    return x;
  }
  function checkObjectCoercible(argument) {
    if (argument == null) {
      throw new TypeError('Value cannot be converted to an Object');
    }
    return argument;
  }
  function setupGlobals(global) {
    global.Symbol = Symbol;
    global.Reflect = global.Reflect || {};
    global.Reflect.global = global.Reflect.global || global;
    polyfillObject(global.Object);
  }
  setupGlobals(global);
  global.$traceurRuntime = {
    assertObject: assertObject,
    createPrivateName: createPrivateName,
    exportStar: exportStar,
    getOwnHashObject: getOwnHashObject,
    privateNames: privateNames,
    setProperty: setProperty,
    setupGlobals: setupGlobals,
    toObject: toObject,
    isObject: isObject,
    toProperty: toProperty,
    type: types,
    typeof: typeOf,
    checkObjectCoercible: checkObjectCoercible,
    hasOwnProperty: function(o, p) {
      return hasOwnProperty.call(o, p);
    },
    defineProperties: $defineProperties,
    defineProperty: $defineProperty,
    getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
    getOwnPropertyNames: $getOwnPropertyNames,
    keys: $keys
  };
})(typeof global !== 'undefined' ? global : this);
(function() {
  'use strict';
  function spread() {
    var rv = [],
        j = 0,
        iterResult;
    for (var i = 0; i < arguments.length; i++) {
      var valueToSpread = $traceurRuntime.checkObjectCoercible(arguments[i]);
      if (typeof valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)] !== 'function') {
        throw new TypeError('Cannot spread non-iterable object.');
      }
      var iter = valueToSpread[$traceurRuntime.toProperty(Symbol.iterator)]();
      while (!(iterResult = iter.next()).done) {
        rv[j++] = iterResult.value;
      }
    }
    return rv;
  }
  $traceurRuntime.spread = spread;
})();
(function() {
  'use strict';
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $getOwnPropertyDescriptor = $traceurRuntime.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $traceurRuntime.getOwnPropertyNames;
  var $getPrototypeOf = Object.getPrototypeOf;
  function superDescriptor(homeObject, name) {
    var proto = $getPrototypeOf(homeObject);
    do {
      var result = $getOwnPropertyDescriptor(proto, name);
      if (result)
        return result;
      proto = $getPrototypeOf(proto);
    } while (proto);
    return undefined;
  }
  function superCall(self, homeObject, name, args) {
    return superGet(self, homeObject, name).apply(self, args);
  }
  function superGet(self, homeObject, name) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor) {
      if (!descriptor.get)
        return descriptor.value;
      return descriptor.get.call(self);
    }
    return undefined;
  }
  function superSet(self, homeObject, name, value) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor && descriptor.set) {
      descriptor.set.call(self, value);
      return value;
    }
    throw $TypeError("super has no setter '" + name + "'.");
  }
  function getDescriptors(object) {
    var descriptors = {},
        name,
        names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      descriptors[name] = $getOwnPropertyDescriptor(object, name);
    }
    return descriptors;
  }
  function createClass(ctor, object, staticObject, superClass) {
    $defineProperty(object, 'constructor', {
      value: ctor,
      configurable: true,
      enumerable: false,
      writable: true
    });
    if (arguments.length > 3) {
      if (typeof superClass === 'function')
        ctor.__proto__ = superClass;
      ctor.prototype = $create(getProtoParent(superClass), getDescriptors(object));
    } else {
      ctor.prototype = object;
    }
    $defineProperty(ctor, 'prototype', {
      configurable: false,
      writable: false
    });
    return $defineProperties(ctor, getDescriptors(staticObject));
  }
  function getProtoParent(superClass) {
    if (typeof superClass === 'function') {
      var prototype = superClass.prototype;
      if ($Object(prototype) === prototype || prototype === null)
        return superClass.prototype;
      throw new $TypeError('super prototype must be an Object or null');
    }
    if (superClass === null)
      return null;
    throw new $TypeError('Super expression must either be null or a function');
  }
  function defaultSuperCall(self, homeObject, args) {
    if ($getPrototypeOf(homeObject) !== null)
      superCall(self, homeObject, 'constructor', args);
  }
  $traceurRuntime.createClass = createClass;
  $traceurRuntime.defaultSuperCall = defaultSuperCall;
  $traceurRuntime.superCall = superCall;
  $traceurRuntime.superGet = superGet;
  $traceurRuntime.superSet = superSet;
})();
(function() {
  'use strict';
  var createPrivateName = $traceurRuntime.createPrivateName;
  var $defineProperties = $traceurRuntime.defineProperties;
  var $defineProperty = $traceurRuntime.defineProperty;
  var $create = Object.create;
  var $TypeError = TypeError;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var ST_NEWBORN = 0;
  var ST_EXECUTING = 1;
  var ST_SUSPENDED = 2;
  var ST_CLOSED = 3;
  var END_STATE = -2;
  var RETHROW_STATE = -3;
  function getInternalError(state) {
    return new Error('Traceur compiler bug: invalid state in state machine: ' + state);
  }
  function GeneratorContext() {
    this.state = 0;
    this.GState = ST_NEWBORN;
    this.storedException = undefined;
    this.finallyFallThrough = undefined;
    this.sent_ = undefined;
    this.returnValue = undefined;
    this.tryStack_ = [];
  }
  GeneratorContext.prototype = {
    pushTry: function(catchState, finallyState) {
      if (finallyState !== null) {
        var finallyFallThrough = null;
        for (var i = this.tryStack_.length - 1; i >= 0; i--) {
          if (this.tryStack_[i].catch !== undefined) {
            finallyFallThrough = this.tryStack_[i].catch;
            break;
          }
        }
        if (finallyFallThrough === null)
          finallyFallThrough = RETHROW_STATE;
        this.tryStack_.push({
          finally: finallyState,
          finallyFallThrough: finallyFallThrough
        });
      }
      if (catchState !== null) {
        this.tryStack_.push({catch: catchState});
      }
    },
    popTry: function() {
      this.tryStack_.pop();
    },
    get sent() {
      this.maybeThrow();
      return this.sent_;
    },
    set sent(v) {
      this.sent_ = v;
    },
    get sentIgnoreThrow() {
      return this.sent_;
    },
    maybeThrow: function() {
      if (this.action === 'throw') {
        this.action = 'next';
        throw this.sent_;
      }
    },
    end: function() {
      switch (this.state) {
        case END_STATE:
          return this;
        case RETHROW_STATE:
          throw this.storedException;
        default:
          throw getInternalError(this.state);
      }
    },
    handleException: function(ex) {
      this.GState = ST_CLOSED;
      this.state = END_STATE;
      throw ex;
    }
  };
  function nextOrThrow(ctx, moveNext, action, x) {
    switch (ctx.GState) {
      case ST_EXECUTING:
        throw new Error(("\"" + action + "\" on executing generator"));
      case ST_CLOSED:
        if (action == 'next') {
          return {
            value: undefined,
            done: true
          };
        }
        throw x;
      case ST_NEWBORN:
        if (action === 'throw') {
          ctx.GState = ST_CLOSED;
          throw x;
        }
        if (x !== undefined)
          throw $TypeError('Sent value to newborn generator');
      case ST_SUSPENDED:
        ctx.GState = ST_EXECUTING;
        ctx.action = action;
        ctx.sent = x;
        var value = moveNext(ctx);
        var done = value === ctx;
        if (done)
          value = ctx.returnValue;
        ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
        return {
          value: value,
          done: done
        };
    }
  }
  var ctxName = createPrivateName();
  var moveNextName = createPrivateName();
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  $defineProperty(GeneratorFunctionPrototype, 'constructor', nonEnum(GeneratorFunction));
  GeneratorFunctionPrototype.prototype = {
    constructor: GeneratorFunctionPrototype,
    next: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'next', v);
    },
    throw: function(v) {
      return nextOrThrow(this[ctxName], this[moveNextName], 'throw', v);
    }
  };
  $defineProperties(GeneratorFunctionPrototype.prototype, {
    constructor: {enumerable: false},
    next: {enumerable: false},
    throw: {enumerable: false}
  });
  Object.defineProperty(GeneratorFunctionPrototype.prototype, Symbol.iterator, nonEnum(function() {
    return this;
  }));
  function createGeneratorInstance(innerFunction, functionObject, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new GeneratorContext();
    var object = $create(functionObject.prototype);
    object[ctxName] = ctx;
    object[moveNextName] = moveNext;
    return object;
  }
  function initGeneratorFunction(functionObject) {
    functionObject.prototype = $create(GeneratorFunctionPrototype.prototype);
    functionObject.__proto__ = GeneratorFunctionPrototype;
    return functionObject;
  }
  function AsyncFunctionContext() {
    GeneratorContext.call(this);
    this.err = undefined;
    var ctx = this;
    ctx.result = new Promise(function(resolve, reject) {
      ctx.resolve = resolve;
      ctx.reject = reject;
    });
  }
  AsyncFunctionContext.prototype = $create(GeneratorContext.prototype);
  AsyncFunctionContext.prototype.end = function() {
    switch (this.state) {
      case END_STATE:
        this.resolve(this.returnValue);
        break;
      case RETHROW_STATE:
        this.reject(this.storedException);
        break;
      default:
        this.reject(getInternalError(this.state));
    }
  };
  AsyncFunctionContext.prototype.handleException = function() {
    this.state = RETHROW_STATE;
  };
  function asyncWrap(innerFunction, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new AsyncFunctionContext();
    ctx.createCallback = function(newState) {
      return function(value) {
        ctx.state = newState;
        ctx.value = value;
        moveNext(ctx);
      };
    };
    ctx.errback = function(err) {
      handleCatch(ctx, err);
      moveNext(ctx);
    };
    moveNext(ctx);
    return ctx.result;
  }
  function getMoveNext(innerFunction, self) {
    return function(ctx) {
      while (true) {
        try {
          return innerFunction.call(self, ctx);
        } catch (ex) {
          handleCatch(ctx, ex);
        }
      }
    };
  }
  function handleCatch(ctx, ex) {
    ctx.storedException = ex;
    var last = ctx.tryStack_[ctx.tryStack_.length - 1];
    if (!last) {
      ctx.handleException(ex);
      return;
    }
    ctx.state = last.catch !== undefined ? last.catch : last.finally;
    if (last.finallyFallThrough !== undefined)
      ctx.finallyFallThrough = last.finallyFallThrough;
  }
  $traceurRuntime.asyncWrap = asyncWrap;
  $traceurRuntime.initGeneratorFunction = initGeneratorFunction;
  $traceurRuntime.createGeneratorInstance = createGeneratorInstance;
})();
(function() {
  function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
    var out = [];
    if (opt_scheme) {
      out.push(opt_scheme, ':');
    }
    if (opt_domain) {
      out.push('//');
      if (opt_userInfo) {
        out.push(opt_userInfo, '@');
      }
      out.push(opt_domain);
      if (opt_port) {
        out.push(':', opt_port);
      }
    }
    if (opt_path) {
      out.push(opt_path);
    }
    if (opt_queryData) {
      out.push('?', opt_queryData);
    }
    if (opt_fragment) {
      out.push('#', opt_fragment);
    }
    return out.join('');
  }
  ;
  var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
  var ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
  };
  function split(uri) {
    return (uri.match(splitRe));
  }
  function removeDotSegments(path) {
    if (path === '/')
      return '/';
    var leadingSlash = path[0] === '/' ? '/' : '';
    var trailingSlash = path.slice(-1) === '/' ? '/' : '';
    var segments = path.split('/');
    var out = [];
    var up = 0;
    for (var pos = 0; pos < segments.length; pos++) {
      var segment = segments[pos];
      switch (segment) {
        case '':
        case '.':
          break;
        case '..':
          if (out.length)
            out.pop();
          else
            up++;
          break;
        default:
          out.push(segment);
      }
    }
    if (!leadingSlash) {
      while (up-- > 0) {
        out.unshift('..');
      }
      if (out.length === 0)
        out.push('.');
    }
    return leadingSlash + out.join('/') + trailingSlash;
  }
  function joinAndCanonicalizePath(parts) {
    var path = parts[ComponentIndex.PATH] || '';
    path = removeDotSegments(path);
    parts[ComponentIndex.PATH] = path;
    return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]);
  }
  function canonicalizeUrl(url) {
    var parts = split(url);
    return joinAndCanonicalizePath(parts);
  }
  function resolveUrl(base, url) {
    var parts = split(url);
    var baseParts = split(base);
    if (parts[ComponentIndex.SCHEME]) {
      return joinAndCanonicalizePath(parts);
    } else {
      parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
    }
    for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
      if (!parts[i]) {
        parts[i] = baseParts[i];
      }
    }
    if (parts[ComponentIndex.PATH][0] == '/') {
      return joinAndCanonicalizePath(parts);
    }
    var path = baseParts[ComponentIndex.PATH];
    var index = path.lastIndexOf('/');
    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
    parts[ComponentIndex.PATH] = path;
    return joinAndCanonicalizePath(parts);
  }
  function isAbsolute(name) {
    if (!name)
      return false;
    if (name[0] === '/')
      return true;
    var parts = split(name);
    if (parts[ComponentIndex.SCHEME])
      return true;
    return false;
  }
  $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
  $traceurRuntime.isAbsolute = isAbsolute;
  $traceurRuntime.removeDotSegments = removeDotSegments;
  $traceurRuntime.resolveUrl = resolveUrl;
})();
(function(global) {
  'use strict';
  var $__2 = $traceurRuntime.assertObject($traceurRuntime),
      canonicalizeUrl = $__2.canonicalizeUrl,
      resolveUrl = $__2.resolveUrl,
      isAbsolute = $__2.isAbsolute;
  var moduleInstantiators = Object.create(null);
  var baseURL;
  if (global.location && global.location.href)
    baseURL = resolveUrl(global.location.href, './');
  else
    baseURL = '';
  var UncoatedModuleEntry = function UncoatedModuleEntry(url, uncoatedModule) {
    this.url = url;
    this.value_ = uncoatedModule;
  };
  ($traceurRuntime.createClass)(UncoatedModuleEntry, {}, {});
  var ModuleEvaluationError = function ModuleEvaluationError(erroneousModuleName, cause) {
    this.message = this.constructor.name + (cause ? ': \'' + cause + '\'' : '') + ' in ' + erroneousModuleName;
  };
  ($traceurRuntime.createClass)(ModuleEvaluationError, {loadedBy: function(moduleName) {
      this.message += '\n loaded by ' + moduleName;
    }}, {}, Error);
  var UncoatedModuleInstantiator = function UncoatedModuleInstantiator(url, func) {
    $traceurRuntime.superCall(this, $UncoatedModuleInstantiator.prototype, "constructor", [url, null]);
    this.func = func;
  };
  var $UncoatedModuleInstantiator = UncoatedModuleInstantiator;
  ($traceurRuntime.createClass)(UncoatedModuleInstantiator, {getUncoatedModule: function() {
      if (this.value_)
        return this.value_;
      try {
        return this.value_ = this.func.call(global);
      } catch (ex) {
        if (ex instanceof ModuleEvaluationError) {
          ex.loadedBy(this.url);
          throw ex;
        }
        throw new ModuleEvaluationError(this.url, ex);
      }
    }}, {}, UncoatedModuleEntry);
  function getUncoatedModuleInstantiator(name) {
    if (!name)
      return;
    var url = ModuleStore.normalize(name);
    return moduleInstantiators[url];
  }
  ;
  var moduleInstances = Object.create(null);
  var liveModuleSentinel = {};
  function Module(uncoatedModule) {
    var isLive = arguments[1];
    var coatedModule = Object.create(null);
    Object.getOwnPropertyNames(uncoatedModule).forEach((function(name) {
      var getter,
          value;
      if (isLive === liveModuleSentinel) {
        var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
        if (descr.get)
          getter = descr.get;
      }
      if (!getter) {
        value = uncoatedModule[name];
        getter = function() {
          return value;
        };
      }
      Object.defineProperty(coatedModule, name, {
        get: getter,
        enumerable: true
      });
    }));
    Object.preventExtensions(coatedModule);
    return coatedModule;
  }
  var ModuleStore = {
    normalize: function(name, refererName, refererAddress) {
      if (typeof name !== "string")
        throw new TypeError("module name must be a string, not " + typeof name);
      if (isAbsolute(name))
        return canonicalizeUrl(name);
      if (/[^\.]\/\.\.\//.test(name)) {
        throw new Error('module name embeds /../: ' + name);
      }
      if (name[0] === '.' && refererName)
        return resolveUrl(refererName, name);
      return canonicalizeUrl(name);
    },
    get: function(normalizedName) {
      var m = getUncoatedModuleInstantiator(normalizedName);
      if (!m)
        return undefined;
      var moduleInstance = moduleInstances[m.url];
      if (moduleInstance)
        return moduleInstance;
      moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
      return moduleInstances[m.url] = moduleInstance;
    },
    set: function(normalizedName, module) {
      normalizedName = String(normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, (function() {
        return module;
      }));
      moduleInstances[normalizedName] = module;
    },
    get baseURL() {
      return baseURL;
    },
    set baseURL(v) {
      baseURL = String(v);
    },
    registerModule: function(name, func) {
      var normalizedName = ModuleStore.normalize(name);
      if (moduleInstantiators[normalizedName])
        throw new Error('duplicate module named ' + normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
    },
    bundleStore: Object.create(null),
    register: function(name, deps, func) {
      if (!deps || !deps.length && !func.length) {
        this.registerModule(name, func);
      } else {
        this.bundleStore[name] = {
          deps: deps,
          execute: function() {
            var $__0 = arguments;
            var depMap = {};
            deps.forEach((function(dep, index) {
              return depMap[dep] = $__0[index];
            }));
            var registryEntry = func.call(this, depMap);
            registryEntry.execute.call(this);
            return registryEntry.exports;
          }
        };
      }
    },
    getAnonymousModule: function(func) {
      return new Module(func.call(global), liveModuleSentinel);
    },
    getForTesting: function(name) {
      var $__0 = this;
      if (!this.testingPrefix_) {
        Object.keys(moduleInstances).some((function(key) {
          var m = /(traceur@[^\/]*\/)/.exec(key);
          if (m) {
            $__0.testingPrefix_ = m[1];
            return true;
          }
        }));
      }
      return this.get(this.testingPrefix_ + name);
    }
  };
  ModuleStore.set('@traceur/src/runtime/ModuleStore', new Module({ModuleStore: ModuleStore}));
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
  };
  $traceurRuntime.ModuleStore = ModuleStore;
  global.System = {
    register: ModuleStore.register.bind(ModuleStore),
    get: ModuleStore.get,
    set: ModuleStore.set,
    normalize: ModuleStore.normalize
  };
  $traceurRuntime.getModuleImpl = function(name) {
    var instantiator = getUncoatedModuleInstantiator(name);
    return instantiator && instantiator.getUncoatedModule();
  };
})(typeof global !== 'undefined' ? global : this);
System.register("traceur-runtime@0.0.55/src/runtime/polyfills/utils", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/utils";
  var $ceil = Math.ceil;
  var $floor = Math.floor;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var $pow = Math.pow;
  var $min = Math.min;
  var toObject = $traceurRuntime.toObject;
  function toUint32(x) {
    return x >>> 0;
  }
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function isCallable(x) {
    return typeof x === 'function';
  }
  function isNumber(x) {
    return typeof x === 'number';
  }
  function toInteger(x) {
    x = +x;
    if ($isNaN(x))
      return 0;
    if (x === 0 || !$isFinite(x))
      return x;
    return x > 0 ? $floor(x) : $ceil(x);
  }
  var MAX_SAFE_LENGTH = $pow(2, 53) - 1;
  function toLength(x) {
    var len = toInteger(x);
    return len < 0 ? 0 : $min(len, MAX_SAFE_LENGTH);
  }
  function checkIterable(x) {
    return !isObject(x) ? undefined : x[Symbol.iterator];
  }
  function isConstructor(x) {
    return isCallable(x);
  }
  function createIteratorResultObject(value, done) {
    return {
      value: value,
      done: done
    };
  }
  return {
    get toObject() {
      return toObject;
    },
    get toUint32() {
      return toUint32;
    },
    get isObject() {
      return isObject;
    },
    get isCallable() {
      return isCallable;
    },
    get isNumber() {
      return isNumber;
    },
    get toInteger() {
      return toInteger;
    },
    get toLength() {
      return toLength;
    },
    get checkIterable() {
      return checkIterable;
    },
    get isConstructor() {
      return isConstructor;
    },
    get createIteratorResultObject() {
      return createIteratorResultObject;
    }
  };
});
System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Array", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/Array";
  var $__3 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"),
      isCallable = $__3.isCallable,
      isConstructor = $__3.isConstructor,
      checkIterable = $__3.checkIterable,
      toInteger = $__3.toInteger,
      toLength = $__3.toLength,
      toObject = $__3.toObject;
  function from(arrLike) {
    var mapFn = arguments[1];
    var thisArg = arguments[2];
    var C = this;
    var items = toObject(arrLike);
    var mapping = mapFn !== undefined;
    var k = 0;
    var arr,
        len;
    if (mapping && !isCallable(mapFn)) {
      throw TypeError();
    }
    if (checkIterable(items)) {
      arr = isConstructor(C) ? new C() : [];
      for (var $__4 = items[Symbol.iterator](),
          $__5; !($__5 = $__4.next()).done; ) {
        var item = $__5.value;
        {
          if (mapping) {
            arr[k] = mapFn.call(thisArg, item, k);
          } else {
            arr[k] = item;
          }
          k++;
        }
      }
      arr.length = k;
      return arr;
    }
    len = toLength(items.length);
    arr = isConstructor(C) ? new C(len) : new Array(len);
    for (; k < len; k++) {
      if (mapping) {
        arr[k] = typeof thisArg === 'undefined' ? mapFn(items[k], k) : mapFn.call(thisArg, items[k], k);
      } else {
        arr[k] = items[k];
      }
    }
    arr.length = len;
    return arr;
  }
  function fill(value) {
    var start = arguments[1] !== (void 0) ? arguments[1] : 0;
    var end = arguments[2];
    var object = toObject(this);
    var len = toLength(object.length);
    var fillStart = toInteger(start);
    var fillEnd = end !== undefined ? toInteger(end) : len;
    fillStart = fillStart < 0 ? Math.max(len + fillStart, 0) : Math.min(fillStart, len);
    fillEnd = fillEnd < 0 ? Math.max(len + fillEnd, 0) : Math.min(fillEnd, len);
    while (fillStart < fillEnd) {
      object[fillStart] = value;
      fillStart++;
    }
    return object;
  }
  function find(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg);
  }
  function findIndex(predicate) {
    var thisArg = arguments[1];
    return findHelper(this, predicate, thisArg, true);
  }
  function findHelper(self, predicate) {
    var thisArg = arguments[2];
    var returnIndex = arguments[3] !== (void 0) ? arguments[3] : false;
    var object = toObject(self);
    var len = toLength(object.length);
    if (!isCallable(predicate)) {
      throw TypeError();
    }
    for (var i = 0; i < len; i++) {
      if (i in object) {
        var value = object[i];
        if (predicate.call(thisArg, value, i, object)) {
          return returnIndex ? i : value;
        }
      }
    }
    return returnIndex ? -1 : undefined;
  }
  return {
    get from() {
      return from;
    },
    get fill() {
      return fill;
    },
    get find() {
      return find;
    },
    get findIndex() {
      return findIndex;
    }
  };
});
System.register("traceur-runtime@0.0.55/src/runtime/polyfills/ArrayIterator", [], function() {
  "use strict";
  var $__8;
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/ArrayIterator";
  var $__6 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"),
      toObject = $__6.toObject,
      toUint32 = $__6.toUint32,
      createIteratorResultObject = $__6.createIteratorResultObject;
  var ARRAY_ITERATOR_KIND_KEYS = 1;
  var ARRAY_ITERATOR_KIND_VALUES = 2;
  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
  var ArrayIterator = function ArrayIterator() {};
  ($traceurRuntime.createClass)(ArrayIterator, ($__8 = {}, Object.defineProperty($__8, "next", {
    value: function() {
      var iterator = toObject(this);
      var array = iterator.iteratorObject_;
      if (!array) {
        throw new TypeError('Object is not an ArrayIterator');
      }
      var index = iterator.arrayIteratorNextIndex_;
      var itemKind = iterator.arrayIterationKind_;
      var length = toUint32(array.length);
      if (index >= length) {
        iterator.arrayIteratorNextIndex_ = Infinity;
        return createIteratorResultObject(undefined, true);
      }
      iterator.arrayIteratorNextIndex_ = index + 1;
      if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
        return createIteratorResultObject(array[index], false);
      if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
        return createIteratorResultObject([index, array[index]], false);
      return createIteratorResultObject(index, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__8, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__8), {});
  function createArrayIterator(array, kind) {
    var object = toObject(array);
    var iterator = new ArrayIterator;
    iterator.iteratorObject_ = object;
    iterator.arrayIteratorNextIndex_ = 0;
    iterator.arrayIterationKind_ = kind;
    return iterator;
  }
  function entries() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
  }
  function keys() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
  }
  function values() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
  }
  return {
    get entries() {
      return entries;
    },
    get keys() {
      return keys;
    },
    get values() {
      return values;
    }
  };
});
System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Map", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/Map";
  var isObject = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils").isObject;
  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  var deletedSentinel = {};
  function lookupIndex(map, key) {
    if (isObject(key)) {
      var hashObject = getOwnHashObject(key);
      return hashObject && map.objectIndex_[hashObject.hash];
    }
    if (typeof key === 'string')
      return map.stringIndex_[key];
    return map.primitiveIndex_[key];
  }
  function initMap(map) {
    map.entries_ = [];
    map.objectIndex_ = Object.create(null);
    map.stringIndex_ = Object.create(null);
    map.primitiveIndex_ = Object.create(null);
    map.deletedCount_ = 0;
  }
  var Map = function Map() {
    var iterable = arguments[0];
    if (!isObject(this))
      throw new TypeError('Map called on incompatible type');
    if ($hasOwnProperty.call(this, 'entries_')) {
      throw new TypeError('Map can not be reentrantly initialised');
    }
    initMap(this);
    if (iterable !== null && iterable !== undefined) {
      for (var $__11 = iterable[Symbol.iterator](),
          $__12; !($__12 = $__11.next()).done; ) {
        var $__13 = $traceurRuntime.assertObject($__12.value),
            key = $__13[0],
            value = $__13[1];
        {
          this.set(key, value);
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Map, {
    get size() {
      return this.entries_.length / 2 - this.deletedCount_;
    },
    get: function(key) {
      var index = lookupIndex(this, key);
      if (index !== undefined)
        return this.entries_[index + 1];
    },
    set: function(key, value) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
      var index = lookupIndex(this, key);
      if (index !== undefined) {
        this.entries_[index + 1] = value;
      } else {
        index = this.entries_.length;
        this.entries_[index] = key;
        this.entries_[index + 1] = value;
        if (objectMode) {
          var hashObject = getOwnHashObject(key);
          var hash = hashObject.hash;
          this.objectIndex_[hash] = index;
        } else if (stringMode) {
          this.stringIndex_[key] = index;
        } else {
          this.primitiveIndex_[key] = index;
        }
      }
      return this;
    },
    has: function(key) {
      return lookupIndex(this, key) !== undefined;
    },
    delete: function(key) {
      var objectMode = isObject(key);
      var stringMode = typeof key === 'string';
      var index;
      var hash;
      if (objectMode) {
        var hashObject = getOwnHashObject(key);
        if (hashObject) {
          index = this.objectIndex_[hash = hashObject.hash];
          delete this.objectIndex_[hash];
        }
      } else if (stringMode) {
        index = this.stringIndex_[key];
        delete this.stringIndex_[key];
      } else {
        index = this.primitiveIndex_[key];
        delete this.primitiveIndex_[key];
      }
      if (index !== undefined) {
        this.entries_[index] = deletedSentinel;
        this.entries_[index + 1] = undefined;
        this.deletedCount_++;
      }
    },
    clear: function() {
      initMap(this);
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      for (var i = 0,
          len = this.entries_.length; i < len; i += 2) {
        var key = this.entries_[i];
        var value = this.entries_[i + 1];
        if (key === deletedSentinel)
          continue;
        callbackFn.call(thisArg, value, key, this);
      }
    },
    entries: $traceurRuntime.initGeneratorFunction(function $__14() {
      var i,
          len,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0, len = this.entries_.length;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < len) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return [key, value];
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__14, this);
    }),
    keys: $traceurRuntime.initGeneratorFunction(function $__15() {
      var i,
          len,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0, len = this.entries_.length;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < len) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return key;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__15, this);
    }),
    values: $traceurRuntime.initGeneratorFunction(function $__16() {
      var i,
          len,
          key,
          value;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              i = 0, len = this.entries_.length;
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = (i < len) ? 8 : -2;
              break;
            case 4:
              i += 2;
              $ctx.state = 12;
              break;
            case 8:
              key = this.entries_[i];
              value = this.entries_[i + 1];
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = (key === deletedSentinel) ? 4 : 6;
              break;
            case 6:
              $ctx.state = 2;
              return value;
            case 2:
              $ctx.maybeThrow();
              $ctx.state = 4;
              break;
            default:
              return $ctx.end();
          }
      }, $__16, this);
    })
  }, {});
  Object.defineProperty(Map.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Map.prototype.entries
  });
  return {get Map() {
      return Map;
    }};
});
System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Number", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/Number";
  var $__17 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"),
      isNumber = $__17.isNumber,
      toInteger = $__17.toInteger;
  var $abs = Math.abs;
  var $isFinite = isFinite;
  var $isNaN = isNaN;
  var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;
  var MIN_SAFE_INTEGER = -Math.pow(2, 53) + 1;
  var EPSILON = Math.pow(2, -52);
  function NumberIsFinite(number) {
    return isNumber(number) && $isFinite(number);
  }
  ;
  function isInteger(number) {
    return NumberIsFinite(number) && toInteger(number) === number;
  }
  function NumberIsNaN(number) {
    return isNumber(number) && $isNaN(number);
  }
  ;
  function isSafeInteger(number) {
    if (NumberIsFinite(number)) {
      var integral = toInteger(number);
      if (integral === number)
        return $abs(integral) <= MAX_SAFE_INTEGER;
    }
    return false;
  }
  return {
    get MAX_SAFE_INTEGER() {
      return MAX_SAFE_INTEGER;
    },
    get MIN_SAFE_INTEGER() {
      return MIN_SAFE_INTEGER;
    },
    get EPSILON() {
      return EPSILON;
    },
    get isFinite() {
      return NumberIsFinite;
    },
    get isInteger() {
      return isInteger;
    },
    get isNaN() {
      return NumberIsNaN;
    },
    get isSafeInteger() {
      return isSafeInteger;
    }
  };
});
System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Object", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/Object";
  var $__18 = $traceurRuntime.assertObject($traceurRuntime),
      defineProperty = $__18.defineProperty,
      getOwnPropertyDescriptor = $__18.getOwnPropertyDescriptor,
      getOwnPropertyNames = $__18.getOwnPropertyNames,
      keys = $__18.keys,
      privateNames = $__18.privateNames;
  function is(left, right) {
    if (left === right)
      return left !== 0 || 1 / left === 1 / right;
    return left !== left && right !== right;
  }
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      var props = keys(source);
      var p,
          length = props.length;
      for (p = 0; p < length; p++) {
        var name = props[p];
        if (privateNames[name])
          continue;
        target[name] = source[name];
      }
    }
    return target;
  }
  function mixin(target, source) {
    var props = getOwnPropertyNames(source);
    var p,
        descriptor,
        length = props.length;
    for (p = 0; p < length; p++) {
      var name = props[p];
      if (privateNames[name])
        continue;
      descriptor = getOwnPropertyDescriptor(source, props[p]);
      defineProperty(target, props[p], descriptor);
    }
    return target;
  }
  return {
    get is() {
      return is;
    },
    get assign() {
      return assign;
    },
    get mixin() {
      return mixin;
    }
  };
});
System.register("traceur-runtime@0.0.55/node_modules/rsvp/lib/rsvp/asap", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.55/node_modules/rsvp/lib/rsvp/asap";
  var length = 0;
  function asap(callback, arg) {
    queue[length] = callback;
    queue[length + 1] = arg;
    length += 2;
    if (length === 2) {
      scheduleFlush();
    }
  }
  var $__default = asap;
  var browserGlobal = (typeof window !== 'undefined') ? window : {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
  function useNextTick() {
    return function() {
      process.nextTick(flush);
    };
  }
  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, {characterData: true});
    return function() {
      node.data = (iterations = ++iterations % 2);
    };
  }
  function useMessageChannel() {
    var channel = new MessageChannel();
    channel.port1.onmessage = flush;
    return function() {
      channel.port2.postMessage(0);
    };
  }
  function useSetTimeout() {
    return function() {
      setTimeout(flush, 1);
    };
  }
  var queue = new Array(1000);
  function flush() {
    for (var i = 0; i < length; i += 2) {
      var callback = queue[i];
      var arg = queue[i + 1];
      callback(arg);
      queue[i] = undefined;
      queue[i + 1] = undefined;
    }
    length = 0;
  }
  var scheduleFlush;
  if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else if (isWorker) {
    scheduleFlush = useMessageChannel();
  } else {
    scheduleFlush = useSetTimeout();
  }
  return {get default() {
      return $__default;
    }};
});
System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Promise", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/Promise";
  var async = System.get("traceur-runtime@0.0.55/node_modules/rsvp/lib/rsvp/asap").default;
  var promiseRaw = {};
  function isPromise(x) {
    return x && typeof x === 'object' && x.status_ !== undefined;
  }
  function idResolveHandler(x) {
    return x;
  }
  function idRejectHandler(x) {
    throw x;
  }
  function chain(promise) {
    var onResolve = arguments[1] !== (void 0) ? arguments[1] : idResolveHandler;
    var onReject = arguments[2] !== (void 0) ? arguments[2] : idRejectHandler;
    var deferred = getDeferred(promise.constructor);
    switch (promise.status_) {
      case undefined:
        throw TypeError;
      case 0:
        promise.onResolve_.push(onResolve, deferred);
        promise.onReject_.push(onReject, deferred);
        break;
      case +1:
        promiseEnqueue(promise.value_, [onResolve, deferred]);
        break;
      case -1:
        promiseEnqueue(promise.value_, [onReject, deferred]);
        break;
    }
    return deferred.promise;
  }
  function getDeferred(C) {
    if (this === $Promise) {
      var promise = promiseInit(new $Promise(promiseRaw));
      return {
        promise: promise,
        resolve: (function(x) {
          promiseResolve(promise, x);
        }),
        reject: (function(r) {
          promiseReject(promise, r);
        })
      };
    } else {
      var result = {};
      result.promise = new C((function(resolve, reject) {
        result.resolve = resolve;
        result.reject = reject;
      }));
      return result;
    }
  }
  function promiseSet(promise, status, value, onResolve, onReject) {
    promise.status_ = status;
    promise.value_ = value;
    promise.onResolve_ = onResolve;
    promise.onReject_ = onReject;
    return promise;
  }
  function promiseInit(promise) {
    return promiseSet(promise, 0, undefined, [], []);
  }
  var Promise = function Promise(resolver) {
    if (resolver === promiseRaw)
      return;
    if (typeof resolver !== 'function')
      throw new TypeError;
    var promise = promiseInit(this);
    try {
      resolver((function(x) {
        promiseResolve(promise, x);
      }), (function(r) {
        promiseReject(promise, r);
      }));
    } catch (e) {
      promiseReject(promise, e);
    }
  };
  ($traceurRuntime.createClass)(Promise, {
    catch: function(onReject) {
      return this.then(undefined, onReject);
    },
    then: function(onResolve, onReject) {
      if (typeof onResolve !== 'function')
        onResolve = idResolveHandler;
      if (typeof onReject !== 'function')
        onReject = idRejectHandler;
      var that = this;
      var constructor = this.constructor;
      return chain(this, function(x) {
        x = promiseCoerce(constructor, x);
        return x === that ? onReject(new TypeError) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
      }, onReject);
    }
  }, {
    resolve: function(x) {
      if (this === $Promise) {
        return promiseSet(new $Promise(promiseRaw), +1, x);
      } else {
        return new this(function(resolve, reject) {
          resolve(x);
        });
      }
    },
    reject: function(r) {
      if (this === $Promise) {
        return promiseSet(new $Promise(promiseRaw), -1, r);
      } else {
        return new this((function(resolve, reject) {
          reject(r);
        }));
      }
    },
    cast: function(x) {
      if (x instanceof this)
        return x;
      if (isPromise(x)) {
        var result = getDeferred(this);
        chain(x, result.resolve, result.reject);
        return result.promise;
      }
      return this.resolve(x);
    },
    all: function(values) {
      var deferred = getDeferred(this);
      var resolutions = [];
      try {
        var count = values.length;
        if (count === 0) {
          deferred.resolve(resolutions);
        } else {
          for (var i = 0; i < values.length; i++) {
            this.resolve(values[i]).then(function(i, x) {
              resolutions[i] = x;
              if (--count === 0)
                deferred.resolve(resolutions);
            }.bind(undefined, i), (function(r) {
              deferred.reject(r);
            }));
          }
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    },
    race: function(values) {
      var deferred = getDeferred(this);
      try {
        for (var i = 0; i < values.length; i++) {
          this.resolve(values[i]).then((function(x) {
            deferred.resolve(x);
          }), (function(r) {
            deferred.reject(r);
          }));
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    }
  });
  var $Promise = Promise;
  var $PromiseReject = $Promise.reject;
  function promiseResolve(promise, x) {
    promiseDone(promise, +1, x, promise.onResolve_);
  }
  function promiseReject(promise, r) {
    promiseDone(promise, -1, r, promise.onReject_);
  }
  function promiseDone(promise, status, value, reactions) {
    if (promise.status_ !== 0)
      return;
    promiseEnqueue(value, reactions);
    promiseSet(promise, status, value);
  }
  function promiseEnqueue(value, tasks) {
    async((function() {
      for (var i = 0; i < tasks.length; i += 2) {
        promiseHandle(value, tasks[i], tasks[i + 1]);
      }
    }));
  }
  function promiseHandle(value, handler, deferred) {
    try {
      var result = handler(value);
      if (result === deferred.promise)
        throw new TypeError;
      else if (isPromise(result))
        chain(result, deferred.resolve, deferred.reject);
      else
        deferred.resolve(result);
    } catch (e) {
      try {
        deferred.reject(e);
      } catch (e) {}
    }
  }
  var thenableSymbol = '@@thenable';
  function isObject(x) {
    return x && (typeof x === 'object' || typeof x === 'function');
  }
  function promiseCoerce(constructor, x) {
    if (!isPromise(x) && isObject(x)) {
      var then;
      try {
        then = x.then;
      } catch (r) {
        var promise = $PromiseReject.call(constructor, r);
        x[thenableSymbol] = promise;
        return promise;
      }
      if (typeof then === 'function') {
        var p = x[thenableSymbol];
        if (p) {
          return p;
        } else {
          var deferred = getDeferred(constructor);
          x[thenableSymbol] = deferred.promise;
          try {
            then.call(x, deferred.resolve, deferred.reject);
          } catch (r) {
            deferred.reject(r);
          }
          return deferred.promise;
        }
      }
    }
    return x;
  }
  return {get Promise() {
      return Promise;
    }};
});
System.register("traceur-runtime@0.0.55/src/runtime/polyfills/Set", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/Set";
  var isObject = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils").isObject;
  var Map = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Map").Map;
  var getOwnHashObject = $traceurRuntime.getOwnHashObject;
  var $hasOwnProperty = Object.prototype.hasOwnProperty;
  function initSet(set) {
    set.map_ = new Map();
  }
  var Set = function Set() {
    var iterable = arguments[0];
    if (!isObject(this))
      throw new TypeError('Set called on incompatible type');
    if ($hasOwnProperty.call(this, 'map_')) {
      throw new TypeError('Set can not be reentrantly initialised');
    }
    initSet(this);
    if (iterable !== null && iterable !== undefined) {
      for (var $__25 = iterable[Symbol.iterator](),
          $__26; !($__26 = $__25.next()).done; ) {
        var item = $__26.value;
        {
          this.add(item);
        }
      }
    }
  };
  ($traceurRuntime.createClass)(Set, {
    get size() {
      return this.map_.size;
    },
    has: function(key) {
      return this.map_.has(key);
    },
    add: function(key) {
      return this.map_.set(key, key);
    },
    delete: function(key) {
      return this.map_.delete(key);
    },
    clear: function() {
      return this.map_.clear();
    },
    forEach: function(callbackFn) {
      var thisArg = arguments[1];
      var $__23 = this;
      return this.map_.forEach((function(value, key) {
        callbackFn.call(thisArg, key, key, $__23);
      }));
    },
    values: $traceurRuntime.initGeneratorFunction(function $__27() {
      var $__28,
          $__29;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__28 = this.map_.keys()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__29 = $__28[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__29.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__29.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__29.value;
            default:
              return $ctx.end();
          }
      }, $__27, this);
    }),
    entries: $traceurRuntime.initGeneratorFunction(function $__30() {
      var $__31,
          $__32;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__31 = this.map_.entries()[Symbol.iterator]();
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__32 = $__31[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__32.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__32.value;
              $ctx.state = -2;
              break;
            case 2:
              $ctx.state = 12;
              return $__32.value;
            default:
              return $ctx.end();
          }
      }, $__30, this);
    })
  }, {});
  Object.defineProperty(Set.prototype, Symbol.iterator, {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  Object.defineProperty(Set.prototype, 'keys', {
    configurable: true,
    writable: true,
    value: Set.prototype.values
  });
  return {get Set() {
      return Set;
    }};
});
System.register("traceur-runtime@0.0.55/src/runtime/polyfills/StringIterator", [], function() {
  "use strict";
  var $__35;
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/StringIterator";
  var $__33 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/utils"),
      createIteratorResultObject = $__33.createIteratorResultObject,
      isObject = $__33.isObject;
  var $__36 = $traceurRuntime.assertObject($traceurRuntime),
      hasOwnProperty = $__36.hasOwnProperty,
      toProperty = $__36.toProperty;
  var iteratedString = Symbol('iteratedString');
  var stringIteratorNextIndex = Symbol('stringIteratorNextIndex');
  var StringIterator = function StringIterator() {};
  ($traceurRuntime.createClass)(StringIterator, ($__35 = {}, Object.defineProperty($__35, "next", {
    value: function() {
      var o = this;
      if (!isObject(o) || !hasOwnProperty(o, iteratedString)) {
        throw new TypeError('this must be a StringIterator object');
      }
      var s = o[toProperty(iteratedString)];
      if (s === undefined) {
        return createIteratorResultObject(undefined, true);
      }
      var position = o[toProperty(stringIteratorNextIndex)];
      var len = s.length;
      if (position >= len) {
        o[toProperty(iteratedString)] = undefined;
        return createIteratorResultObject(undefined, true);
      }
      var first = s.charCodeAt(position);
      var resultString;
      if (first < 0xD800 || first > 0xDBFF || position + 1 === len) {
        resultString = String.fromCharCode(first);
      } else {
        var second = s.charCodeAt(position + 1);
        if (second < 0xDC00 || second > 0xDFFF) {
          resultString = String.fromCharCode(first);
        } else {
          resultString = String.fromCharCode(first) + String.fromCharCode(second);
        }
      }
      o[toProperty(stringIteratorNextIndex)] = position + resultString.length;
      return createIteratorResultObject(resultString, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__35, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__35), {});
  function createStringIterator(string) {
    var s = String(string);
    var iterator = Object.create(StringIterator.prototype);
    iterator[toProperty(iteratedString)] = s;
    iterator[toProperty(stringIteratorNextIndex)] = 0;
    return iterator;
  }
  return {get createStringIterator() {
      return createStringIterator;
    }};
});
System.register("traceur-runtime@0.0.55/src/runtime/polyfills/String", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/String";
  var createStringIterator = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/StringIterator").createStringIterator;
  var $toString = Object.prototype.toString;
  var $indexOf = String.prototype.indexOf;
  var $lastIndexOf = String.prototype.lastIndexOf;
  function startsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) == start;
  }
  function endsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var pos = stringLength;
    if (arguments.length > 1) {
      var position = arguments[1];
      if (position !== undefined) {
        pos = position ? Number(position) : 0;
        if (isNaN(pos)) {
          pos = 0;
        }
      }
    }
    var end = Math.min(Math.max(pos, 0), stringLength);
    var start = end - searchLength;
    if (start < 0) {
      return false;
    }
    return $lastIndexOf.call(string, searchString, start) == start;
  }
  function contains(search) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) != -1;
  }
  function repeat(count) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var n = count ? Number(count) : 0;
    if (isNaN(n)) {
      n = 0;
    }
    if (n < 0 || n == Infinity) {
      throw RangeError();
    }
    if (n == 0) {
      return '';
    }
    var result = '';
    while (n--) {
      result += string;
    }
    return result;
  }
  function codePointAt(position) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var size = string.length;
    var index = position ? Number(position) : 0;
    if (isNaN(index)) {
      index = 0;
    }
    if (index < 0 || index >= size) {
      return undefined;
    }
    var first = string.charCodeAt(index);
    var second;
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }
  function raw(callsite) {
    var raw = callsite.raw;
    var len = raw.length >>> 0;
    if (len === 0)
      return '';
    var s = '';
    var i = 0;
    while (true) {
      s += raw[i];
      if (i + 1 === len)
        return s;
      s += arguments[++i];
    }
  }
  function fromCodePoint() {
    var codeUnits = [];
    var floor = Math.floor;
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) {
      return '';
    }
    while (++index < length) {
      var codePoint = Number(arguments[index]);
      if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
      if (codePoint <= 0xFFFF) {
        codeUnits.push(codePoint);
      } else {
        codePoint -= 0x10000;
        highSurrogate = (codePoint >> 10) + 0xD800;
        lowSurrogate = (codePoint % 0x400) + 0xDC00;
        codeUnits.push(highSurrogate, lowSurrogate);
      }
    }
    return String.fromCharCode.apply(null, codeUnits);
  }
  function stringPrototypeIterator() {
    var o = $traceurRuntime.checkObjectCoercible(this);
    var s = String(o);
    return createStringIterator(s);
  }
  return {
    get startsWith() {
      return startsWith;
    },
    get endsWith() {
      return endsWith;
    },
    get contains() {
      return contains;
    },
    get repeat() {
      return repeat;
    },
    get codePointAt() {
      return codePointAt;
    },
    get raw() {
      return raw;
    },
    get fromCodePoint() {
      return fromCodePoint;
    },
    get stringPrototypeIterator() {
      return stringPrototypeIterator;
    }
  };
});
System.register("traceur-runtime@0.0.55/src/runtime/polyfills/polyfills", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfills/polyfills";
  var Map = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Map").Map;
  var Set = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Set").Set;
  var Promise = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Promise").Promise;
  var $__41 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/String"),
      codePointAt = $__41.codePointAt,
      contains = $__41.contains,
      endsWith = $__41.endsWith,
      fromCodePoint = $__41.fromCodePoint,
      repeat = $__41.repeat,
      raw = $__41.raw,
      startsWith = $__41.startsWith,
      stringPrototypeIterator = $__41.stringPrototypeIterator;
  var $__42 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Array"),
      fill = $__42.fill,
      find = $__42.find,
      findIndex = $__42.findIndex,
      from = $__42.from;
  var $__43 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/ArrayIterator"),
      entries = $__43.entries,
      keys = $__43.keys,
      values = $__43.values;
  var $__44 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Object"),
      assign = $__44.assign,
      is = $__44.is,
      mixin = $__44.mixin;
  var $__45 = System.get("traceur-runtime@0.0.55/src/runtime/polyfills/Number"),
      MAX_SAFE_INTEGER = $__45.MAX_SAFE_INTEGER,
      MIN_SAFE_INTEGER = $__45.MIN_SAFE_INTEGER,
      EPSILON = $__45.EPSILON,
      isFinite = $__45.isFinite,
      isInteger = $__45.isInteger,
      isNaN = $__45.isNaN,
      isSafeInteger = $__45.isSafeInteger;
  var getPrototypeOf = $traceurRuntime.assertObject(Object).getPrototypeOf;
  function maybeDefine(object, name, descr) {
    if (!(name in object)) {
      Object.defineProperty(object, name, descr);
    }
  }
  function maybeDefineMethod(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  function maybeDefineConst(object, name, value) {
    maybeDefine(object, name, {
      value: value,
      configurable: false,
      enumerable: false,
      writable: false
    });
  }
  function maybeAddFunctions(object, functions) {
    for (var i = 0; i < functions.length; i += 2) {
      var name = functions[i];
      var value = functions[i + 1];
      maybeDefineMethod(object, name, value);
    }
  }
  function maybeAddConsts(object, consts) {
    for (var i = 0; i < consts.length; i += 2) {
      var name = consts[i];
      var value = consts[i + 1];
      maybeDefineConst(object, name, value);
    }
  }
  function maybeAddIterator(object, func, Symbol) {
    if (!Symbol || !Symbol.iterator || object[Symbol.iterator])
      return;
    if (object['@@iterator'])
      func = object['@@iterator'];
    Object.defineProperty(object, Symbol.iterator, {
      value: func,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  function polyfillPromise(global) {
    if (!global.Promise)
      global.Promise = Promise;
  }
  function polyfillCollections(global, Symbol) {
    if (!global.Map)
      global.Map = Map;
    var mapPrototype = global.Map.prototype;
    if (mapPrototype.entries) {
      maybeAddIterator(mapPrototype, mapPrototype.entries, Symbol);
      maybeAddIterator(getPrototypeOf(new global.Map().entries()), function() {
        return this;
      }, Symbol);
    }
    if (!global.Set)
      global.Set = Set;
    var setPrototype = global.Set.prototype;
    if (setPrototype.values) {
      maybeAddIterator(setPrototype, setPrototype.values, Symbol);
      maybeAddIterator(getPrototypeOf(new global.Set().values()), function() {
        return this;
      }, Symbol);
    }
  }
  function polyfillString(String) {
    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'contains', contains, 'endsWith', endsWith, 'startsWith', startsWith, 'repeat', repeat]);
    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
    maybeAddIterator(String.prototype, stringPrototypeIterator, Symbol);
  }
  function polyfillArray(Array, Symbol) {
    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values, 'fill', fill, 'find', find, 'findIndex', findIndex]);
    maybeAddFunctions(Array, ['from', from]);
    maybeAddIterator(Array.prototype, values, Symbol);
    maybeAddIterator(getPrototypeOf([].values()), function() {
      return this;
    }, Symbol);
  }
  function polyfillObject(Object) {
    maybeAddFunctions(Object, ['assign', assign, 'is', is, 'mixin', mixin]);
  }
  function polyfillNumber(Number) {
    maybeAddConsts(Number, ['MAX_SAFE_INTEGER', MAX_SAFE_INTEGER, 'MIN_SAFE_INTEGER', MIN_SAFE_INTEGER, 'EPSILON', EPSILON]);
    maybeAddFunctions(Number, ['isFinite', isFinite, 'isInteger', isInteger, 'isNaN', isNaN, 'isSafeInteger', isSafeInteger]);
  }
  function polyfill(global) {
    polyfillPromise(global);
    polyfillCollections(global, global.Symbol);
    polyfillString(global.String);
    polyfillArray(global.Array, global.Symbol);
    polyfillObject(global.Object);
    polyfillNumber(global.Number);
  }
  polyfill(this);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
    polyfill(global);
  };
  return {};
});
System.register("traceur-runtime@0.0.55/src/runtime/polyfill-import", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.55/src/runtime/polyfill-import";
  System.get("traceur-runtime@0.0.55/src/runtime/polyfills/polyfills");
  return {};
});
System.get("traceur-runtime@0.0.55/src/runtime/polyfill-import" + '');

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":46}],48:[function(require,module,exports){
"use strict";
var Highlight = function() {
  function escape(value) {
    return value.replace(/&/gm, '&amp;').replace(/</gm, '&lt;').replace(/>/gm, '&gt;');
  }
  function tag(node) {
    return node.nodeName.toLowerCase();
  }
  function testRe(re, lexeme) {
    var match = re && re.exec(lexeme);
    return match && match.index == 0;
  }
  function blockLanguage(block) {
    var classes = (block.className + ' ' + (block.parentNode ? block.parentNode.className : '')).split(/\s+/);
    classes = classes.map(function(c) {
      return c.replace(/^lang(uage)?-/, '');
    });
    return classes.filter(function(c) {
      return getLanguage(c) || /no(-?)highlight/.test(c);
    })[0];
  }
  function inherit(parent, obj) {
    var result = {};
    for (var key in parent)
      result[key] = parent[key];
    if (obj)
      for (var key in obj)
        result[key] = obj[key];
    return result;
  }
  ;
  function nodeStream(node) {
    var result = [];
    (function _nodeStream(node, offset) {
      for (var child = node.firstChild; child; child = child.nextSibling) {
        if (child.nodeType == 3)
          offset += child.nodeValue.length;
        else if (child.nodeType == 1) {
          result.push({
            event: 'start',
            offset: offset,
            node: child
          });
          offset = _nodeStream(child, offset);
          if (!tag(child).match(/br|hr|img|input/)) {
            result.push({
              event: 'stop',
              offset: offset,
              node: child
            });
          }
        }
      }
      return offset;
    })(node, 0);
    return result;
  }
  function mergeStreams(original, highlighted, value) {
    var processed = 0;
    var result = '';
    var nodeStack = [];
    function selectStream() {
      if (!original.length || !highlighted.length) {
        return original.length ? original : highlighted;
      }
      if (original[0].offset != highlighted[0].offset) {
        return (original[0].offset < highlighted[0].offset) ? original : highlighted;
      }
      return highlighted[0].event == 'start' ? original : highlighted;
    }
    function open(node) {
      function attr_str(a) {
        return ' ' + a.nodeName + '="' + escape(a.value) + '"';
      }
      result += '<' + tag(node) + Array.prototype.map.call(node.attributes, attr_str).join('') + '>';
    }
    function close(node) {
      result += '</' + tag(node) + '>';
    }
    function render(event) {
      (event.event == 'start' ? open : close)(event.node);
    }
    while (original.length || highlighted.length) {
      var stream = selectStream();
      result += escape(value.substr(processed, stream[0].offset - processed));
      processed = stream[0].offset;
      if (stream == original) {
        nodeStack.reverse().forEach(close);
        do {
          render(stream.splice(0, 1)[0]);
          stream = selectStream();
        } while (stream == original && stream.length && stream[0].offset == processed);
        nodeStack.reverse().forEach(open);
      } else {
        if (stream[0].event == 'start') {
          nodeStack.push(stream[0].node);
        } else {
          nodeStack.pop();
        }
        render(stream.splice(0, 1)[0]);
      }
    }
    return result + escape(value.substr(processed));
  }
  function compileLanguage(language) {
    function reStr(re) {
      return (re && re.source) || re;
    }
    function langRe(value, global) {
      return RegExp(reStr(value), 'm' + (language.case_insensitive ? 'i' : '') + (global ? 'g' : ''));
    }
    function compileMode(mode, parent) {
      if (mode.compiled)
        return;
      mode.compiled = true;
      mode.keywords = mode.keywords || mode.beginKeywords;
      if (mode.keywords) {
        var compiled_keywords = {};
        var flatten = function(className, str) {
          if (language.case_insensitive) {
            str = str.toLowerCase();
          }
          str.split(' ').forEach(function(kw) {
            var pair = kw.split('|');
            compiled_keywords[pair[0]] = [className, pair[1] ? Number(pair[1]) : 1];
          });
        };
        if (typeof mode.keywords == 'string') {
          flatten('keyword', mode.keywords);
        } else {
          Object.keys(mode.keywords).forEach(function(className) {
            flatten(className, mode.keywords[className]);
          });
        }
        mode.keywords = compiled_keywords;
      }
      mode.lexemesRe = langRe(mode.lexemes || /\b[A-Za-z0-9_]+\b/, true);
      if (parent) {
        if (mode.beginKeywords) {
          mode.begin = '\\b(' + mode.beginKeywords.split(' ').join('|') + ')\\b';
        }
        if (!mode.begin)
          mode.begin = /\B|\b/;
        mode.beginRe = langRe(mode.begin);
        if (!mode.end && !mode.endsWithParent)
          mode.end = /\B|\b/;
        if (mode.end)
          mode.endRe = langRe(mode.end);
        mode.terminator_end = reStr(mode.end) || '';
        if (mode.endsWithParent && parent.terminator_end)
          mode.terminator_end += (mode.end ? '|' : '') + parent.terminator_end;
      }
      if (mode.illegal)
        mode.illegalRe = langRe(mode.illegal);
      if (mode.relevance === undefined)
        mode.relevance = 1;
      if (!mode.contains) {
        mode.contains = [];
      }
      var expanded_contains = [];
      mode.contains.forEach(function(c) {
        if (c.variants) {
          c.variants.forEach(function(v) {
            expanded_contains.push(inherit(c, v));
          });
        } else {
          expanded_contains.push(c == 'self' ? mode : c);
        }
      });
      mode.contains = expanded_contains;
      mode.contains.forEach(function(c) {
        compileMode(c, mode);
      });
      if (mode.starts) {
        compileMode(mode.starts, parent);
      }
      var terminators = mode.contains.map(function(c) {
        return c.beginKeywords ? '\\.?(' + c.begin + ')\\.?' : c.begin;
      }).concat([mode.terminator_end, mode.illegal]).map(reStr).filter(Boolean);
      mode.terminators = terminators.length ? langRe(terminators.join('|'), true) : {exec: function(s) {
          return null;
        }};
    }
    compileMode(language);
  }
  function highlight(name, value, ignore_illegals, continuation) {
    function subMode(lexeme, mode) {
      for (var i = 0; i < mode.contains.length; i++) {
        if (testRe(mode.contains[i].beginRe, lexeme)) {
          return mode.contains[i];
        }
      }
    }
    function endOfMode(mode, lexeme) {
      if (testRe(mode.endRe, lexeme)) {
        return mode;
      }
      if (mode.endsWithParent) {
        return endOfMode(mode.parent, lexeme);
      }
    }
    function isIllegal(lexeme, mode) {
      return !ignore_illegals && testRe(mode.illegalRe, lexeme);
    }
    function keywordMatch(mode, match) {
      var match_str = language.case_insensitive ? match[0].toLowerCase() : match[0];
      return mode.keywords.hasOwnProperty(match_str) && mode.keywords[match_str];
    }
    function buildSpan(classname, insideSpan, leaveOpen, noPrefix) {
      var classPrefix = noPrefix ? '' : options.classPrefix,
          openSpan = '<span class="' + classPrefix,
          closeSpan = leaveOpen ? '' : '</span>';
      openSpan += classname + '">';
      return openSpan + insideSpan + closeSpan;
    }
    function processKeywords() {
      if (!top.keywords)
        return escape(mode_buffer);
      var result = '';
      var last_index = 0;
      top.lexemesRe.lastIndex = 0;
      var match = top.lexemesRe.exec(mode_buffer);
      while (match) {
        result += escape(mode_buffer.substr(last_index, match.index - last_index));
        var keyword_match = keywordMatch(top, match);
        if (keyword_match) {
          relevance += keyword_match[1];
          result += buildSpan(keyword_match[0], escape(match[0]));
        } else {
          result += escape(match[0]);
        }
        last_index = top.lexemesRe.lastIndex;
        match = top.lexemesRe.exec(mode_buffer);
      }
      return result + escape(mode_buffer.substr(last_index));
    }
    function processSubLanguage() {
      if (top.subLanguage && !languages[top.subLanguage]) {
        return escape(mode_buffer);
      }
      var result = top.subLanguage ? highlight(top.subLanguage, mode_buffer, true, subLanguageTop) : highlightAuto(mode_buffer);
      if (top.relevance > 0) {
        relevance += result.relevance;
      }
      if (top.subLanguageMode == 'continuous') {
        subLanguageTop = result.top;
      }
      return buildSpan(result.language, result.value, false, true);
    }
    function processBuffer() {
      return top.subLanguage !== undefined ? processSubLanguage() : processKeywords();
    }
    function startNewMode(mode, lexeme) {
      var markup = mode.className ? buildSpan(mode.className, '', true) : '';
      if (mode.returnBegin) {
        result += markup;
        mode_buffer = '';
      } else if (mode.excludeBegin) {
        result += escape(lexeme) + markup;
        mode_buffer = '';
      } else {
        result += markup;
        mode_buffer = lexeme;
      }
      top = Object.create(mode, {parent: {value: top}});
    }
    function processLexeme(buffer, lexeme) {
      mode_buffer += buffer;
      if (lexeme === undefined) {
        result += processBuffer();
        return 0;
      }
      var new_mode = subMode(lexeme, top);
      if (new_mode) {
        result += processBuffer();
        startNewMode(new_mode, lexeme);
        return new_mode.returnBegin ? 0 : lexeme.length;
      }
      var end_mode = endOfMode(top, lexeme);
      if (end_mode) {
        var origin = top;
        if (!(origin.returnEnd || origin.excludeEnd)) {
          mode_buffer += lexeme;
        }
        result += processBuffer();
        do {
          if (top.className) {
            result += '</span>';
          }
          relevance += top.relevance;
          top = top.parent;
        } while (top != end_mode.parent);
        if (origin.excludeEnd) {
          result += escape(lexeme);
        }
        mode_buffer = '';
        if (end_mode.starts) {
          startNewMode(end_mode.starts, '');
        }
        return origin.returnEnd ? 0 : lexeme.length;
      }
      if (isIllegal(lexeme, top))
        throw new Error('Illegal lexeme "' + lexeme + '" for mode "' + (top.className || '<unnamed>') + '"');
      mode_buffer += lexeme;
      return lexeme.length || 1;
    }
    var language = getLanguage(name);
    if (!language) {
      throw new Error('Unknown language: "' + name + '"');
    }
    compileLanguage(language);
    var top = continuation || language;
    var subLanguageTop;
    var result = '';
    for (var current = top; current != language; current = current.parent) {
      if (current.className) {
        result = buildSpan(current.className, '', true) + result;
      }
    }
    var mode_buffer = '';
    var relevance = 0;
    try {
      var match,
          count,
          index = 0;
      while (true) {
        top.terminators.lastIndex = index;
        match = top.terminators.exec(value);
        if (!match)
          break;
        count = processLexeme(value.substr(index, match.index - index), match[0]);
        index = match.index + count;
      }
      processLexeme(value.substr(index));
      for (var current = top; current.parent; current = current.parent) {
        if (current.className) {
          result += '</span>';
        }
      }
      ;
      return {
        relevance: relevance,
        value: result,
        language: name,
        top: top
      };
    } catch (e) {
      if (e.message.indexOf('Illegal') != -1) {
        return {
          relevance: 0,
          value: escape(value)
        };
      } else {
        throw e;
      }
    }
  }
  function highlightAuto(text, languageSubset) {
    languageSubset = languageSubset || options.languages || Object.keys(languages);
    var result = {
      relevance: 0,
      value: escape(text)
    };
    var second_best = result;
    languageSubset.forEach(function(name) {
      if (!getLanguage(name)) {
        return;
      }
      var current = highlight(name, text, false);
      current.language = name;
      if (current.relevance > second_best.relevance) {
        second_best = current;
      }
      if (current.relevance > result.relevance) {
        second_best = result;
        result = current;
      }
    });
    if (second_best.language) {
      result.second_best = second_best;
    }
    return result;
  }
  function fixMarkup(value) {
    if (options.tabReplace) {
      value = value.replace(/^((<[^>]+>|\t)+)/gm, function(match, p1, offset, s) {
        return p1.replace(/\t/g, options.tabReplace);
      });
    }
    if (options.useBR) {
      value = value.replace(/\n/g, '<br>');
    }
    return value;
  }
  function highlightBlock(block) {
    var language = blockLanguage(block);
    if (/no(-?)highlight/.test(language))
      return;
    var node;
    if (options.useBR) {
      node = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      node.innerHTML = block.innerHTML.replace(/\n/g, '').replace(/<br[ \/]*>/g, '\n');
    } else {
      node = block;
    }
    var text = node.textContent;
    var result = language ? highlight(language, text, true) : highlightAuto(text);
    var originalStream = nodeStream(node);
    if (originalStream.length) {
      var resultNode = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
      resultNode.innerHTML = result.value;
      result.value = mergeStreams(originalStream, nodeStream(resultNode), text);
    }
    result.value = fixMarkup(result.value);
    block.innerHTML = result.value;
    block.className += ' hljs ' + (!language && result.language || '');
    block.result = {
      language: result.language,
      re: result.relevance
    };
    if (result.second_best) {
      block.second_best = {
        language: result.second_best.language,
        re: result.second_best.relevance
      };
    }
  }
  var options = {
    classPrefix: 'hljs-',
    tabReplace: null,
    useBR: false,
    languages: undefined
  };
  function configure(user_options) {
    options = inherit(options, user_options);
  }
  function initHighlighting() {
    if (initHighlighting.called)
      return;
    initHighlighting.called = true;
    var blocks = document.querySelectorAll('pre code');
    Array.prototype.forEach.call(blocks, highlightBlock);
  }
  function initHighlightingOnLoad() {
    addEventListener('DOMContentLoaded', initHighlighting, false);
    addEventListener('load', initHighlighting, false);
  }
  var languages = {};
  var aliases = {};
  function registerLanguage(name, language) {
    var lang = languages[name] = language(this);
    if (lang.aliases) {
      lang.aliases.forEach(function(alias) {
        aliases[alias] = name;
      });
    }
  }
  function listLanguages() {
    return Object.keys(languages);
  }
  function getLanguage(name) {
    return languages[name] || languages[aliases[name]];
  }
  this.highlight = highlight;
  this.highlightAuto = highlightAuto;
  this.fixMarkup = fixMarkup;
  this.highlightBlock = highlightBlock;
  this.configure = configure;
  this.initHighlighting = initHighlighting;
  this.initHighlightingOnLoad = initHighlightingOnLoad;
  this.registerLanguage = registerLanguage;
  this.listLanguages = listLanguages;
  this.getLanguage = getLanguage;
  this.inherit = inherit;
  this.IDENT_RE = '[a-zA-Z][a-zA-Z0-9_]*';
  this.UNDERSCORE_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*';
  this.NUMBER_RE = '\\b\\d+(\\.\\d+)?';
  this.C_NUMBER_RE = '(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)';
  this.BINARY_NUMBER_RE = '\\b(0b[01]+)';
  this.RE_STARTERS_RE = '!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~';
  this.BACKSLASH_ESCAPE = {
    begin: '\\\\[\\s\\S]',
    relevance: 0
  };
  this.APOS_STRING_MODE = {
    className: 'string',
    begin: '\'',
    end: '\'',
    illegal: '\\n',
    contains: [this.BACKSLASH_ESCAPE]
  };
  this.QUOTE_STRING_MODE = {
    className: 'string',
    begin: '"',
    end: '"',
    illegal: '\\n',
    contains: [this.BACKSLASH_ESCAPE]
  };
  this.PHRASAL_WORDS_MODE = {begin: /\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such)\b/};
  this.C_LINE_COMMENT_MODE = {
    className: 'comment',
    begin: '//',
    end: '$',
    contains: [this.PHRASAL_WORDS_MODE]
  };
  this.C_BLOCK_COMMENT_MODE = {
    className: 'comment',
    begin: '/\\*',
    end: '\\*/',
    contains: [this.PHRASAL_WORDS_MODE]
  };
  this.HASH_COMMENT_MODE = {
    className: 'comment',
    begin: '#',
    end: '$',
    contains: [this.PHRASAL_WORDS_MODE]
  };
  this.NUMBER_MODE = {
    className: 'number',
    begin: this.NUMBER_RE,
    relevance: 0
  };
  this.C_NUMBER_MODE = {
    className: 'number',
    begin: this.C_NUMBER_RE,
    relevance: 0
  };
  this.BINARY_NUMBER_MODE = {
    className: 'number',
    begin: this.BINARY_NUMBER_RE,
    relevance: 0
  };
  this.CSS_NUMBER_MODE = {
    className: 'number',
    begin: this.NUMBER_RE + '(' + '%|em|ex|ch|rem' + '|vw|vh|vmin|vmax' + '|cm|mm|in|pt|pc|px' + '|deg|grad|rad|turn' + '|s|ms' + '|Hz|kHz' + '|dpi|dpcm|dppx' + ')?',
    relevance: 0
  };
  this.REGEXP_MODE = {
    className: 'regexp',
    begin: /\//,
    end: /\/[gim]*/,
    illegal: /\n/,
    contains: [this.BACKSLASH_ESCAPE, {
      begin: /\[/,
      end: /\]/,
      relevance: 0,
      contains: [this.BACKSLASH_ESCAPE]
    }]
  };
  this.TITLE_MODE = {
    className: 'title',
    begin: this.IDENT_RE,
    relevance: 0
  };
  this.UNDERSCORE_TITLE_MODE = {
    className: 'title',
    begin: this.UNDERSCORE_IDENT_RE,
    relevance: 0
  };
};
module.exports = Highlight;


},{}],49:[function(require,module,exports){
"use strict";
var Highlight = require('./highlight');
var hljs = new Highlight();
hljs.registerLanguage('xml', require('./languages/xml.js'));
hljs.registerLanguage('asciidoc', require('./languages/asciidoc.js'));
hljs.registerLanguage('rsl', require('./languages/rsl.js'));
hljs.registerLanguage('autohotkey', require('./languages/autohotkey.js'));
hljs.registerLanguage('elixir', require('./languages/elixir.js'));
hljs.registerLanguage('django', require('./languages/django.js'));
hljs.registerLanguage('vhdl', require('./languages/vhdl.js'));
hljs.registerLanguage('haxe', require('./languages/haxe.js'));
hljs.registerLanguage('coffeescript', require('./languages/coffeescript.js'));
hljs.registerLanguage('mel', require('./languages/mel.js'));
hljs.registerLanguage('nginx', require('./languages/nginx.js'));
hljs.registerLanguage('oxygene', require('./languages/oxygene.js'));
hljs.registerLanguage('livecodeserver', require('./languages/livecodeserver.js'));
hljs.registerLanguage('monkey', require('./languages/monkey.js'));
hljs.registerLanguage('dust', require('./languages/dust.js'));
hljs.registerLanguage('go', require('./languages/go.js'));
hljs.registerLanguage('json', require('./languages/json.js'));
hljs.registerLanguage('cmake', require('./languages/cmake.js'));
hljs.registerLanguage('clojure', require('./languages/clojure.js'));
hljs.registerLanguage('scheme', require('./languages/scheme.js'));
hljs.registerLanguage('lasso', require('./languages/lasso.js'));
hljs.registerLanguage('http', require('./languages/http.js'));
hljs.registerLanguage('javascript', require('./languages/javascript.js'));
hljs.registerLanguage('mizar', require('./languages/mizar.js'));
hljs.registerLanguage('markdown', require('./languages/markdown.js'));
hljs.registerLanguage('dart', require('./languages/dart.js'));
hljs.registerLanguage('glsl', require('./languages/glsl.js'));
hljs.registerLanguage('swift', require('./languages/swift.js'));
hljs.registerLanguage('sql', require('./languages/sql.js'));
hljs.registerLanguage('handlebars', require('./languages/handlebars.js'));
hljs.registerLanguage('gherkin', require('./languages/gherkin.js'));
hljs.registerLanguage('php', require('./languages/php.js'));
hljs.registerLanguage('applescript', require('./languages/applescript.js'));
hljs.registerLanguage('profile', require('./languages/profile.js'));
hljs.registerLanguage('brainfuck', require('./languages/brainfuck.js'));
hljs.registerLanguage('makefile', require('./languages/makefile.js'));
hljs.registerLanguage('vbnet', require('./languages/vbnet.js'));
hljs.registerLanguage('vala', require('./languages/vala.js'));
hljs.registerLanguage('vbscript', require('./languages/vbscript.js'));
hljs.registerLanguage('bash', require('./languages/bash.js'));
hljs.registerLanguage('gcode', require('./languages/gcode.js'));
hljs.registerLanguage('nimrod', require('./languages/nimrod.js'));
hljs.registerLanguage('vim', require('./languages/vim.js'));
hljs.registerLanguage('scss', require('./languages/scss.js'));
hljs.registerLanguage('gradle', require('./languages/gradle.js'));
hljs.registerLanguage('delphi', require('./languages/delphi.js'));
hljs.registerLanguage('cpp', require('./languages/cpp.js'));
hljs.registerLanguage('perl', require('./languages/perl.js'));
hljs.registerLanguage('haskell', require('./languages/haskell.js'));
hljs.registerLanguage('smalltalk', require('./languages/smalltalk.js'));
hljs.registerLanguage('ini', require('./languages/ini.js'));
hljs.registerLanguage('rib', require('./languages/rib.js'));
hljs.registerLanguage('d', require('./languages/d.js'));
hljs.registerLanguage('apache', require('./languages/apache.js'));
hljs.registerLanguage('ruleslanguage', require('./languages/ruleslanguage.js'));
hljs.registerLanguage('mathematica', require('./languages/mathematica.js'));
hljs.registerLanguage('scala', require('./languages/scala.js'));
hljs.registerLanguage('tex', require('./languages/tex.js'));
hljs.registerLanguage('java', require('./languages/java.js'));
hljs.registerLanguage('r', require('./languages/r.js'));
hljs.registerLanguage('axapta', require('./languages/axapta.js'));
hljs.registerLanguage('actionscript', require('./languages/actionscript.js'));
hljs.registerLanguage('nix', require('./languages/nix.js'));
hljs.registerLanguage('q', require('./languages/q.js'));
hljs.registerLanguage('lisp', require('./languages/lisp.js'));
hljs.registerLanguage('ruby', require('./languages/ruby.js'));
hljs.registerLanguage('haml', require('./languages/haml.js'));
hljs.registerLanguage('avrasm', require('./languages/avrasm.js'));
hljs.registerLanguage('dos', require('./languages/dos.js'));
hljs.registerLanguage('erlang', require('./languages/erlang.js'));
hljs.registerLanguage('1c', require('./languages/1c.js'));
hljs.registerLanguage('cs', require('./languages/cs.js'));
hljs.registerLanguage('protobuf', require('./languages/protobuf.js'));
hljs.registerLanguage('rust', require('./languages/rust.js'));
hljs.registerLanguage('fsharp', require('./languages/fsharp.js'));
hljs.registerLanguage('lua', require('./languages/lua.js'));
hljs.registerLanguage('fix', require('./languages/fix.js'));
hljs.registerLanguage('parser3', require('./languages/parser3.js'));
hljs.registerLanguage('scilab', require('./languages/scilab.js'));
hljs.registerLanguage('diff', require('./languages/diff.js'));
hljs.registerLanguage('typescript', require('./languages/typescript.js'));
hljs.registerLanguage('ocaml', require('./languages/ocaml.js'));
hljs.registerLanguage('groovy', require('./languages/groovy.js'));
hljs.registerLanguage('objectivec', require('./languages/objectivec.js'));
hljs.registerLanguage('css', require('./languages/css.js'));
hljs.registerLanguage('thrift', require('./languages/thrift.js'));
hljs.registerLanguage('capnproto', require('./languages/capnproto.js'));
hljs.registerLanguage('erlang-repl', require('./languages/erlang-repl.js'));
hljs.registerLanguage('python', require('./languages/python.js'));
hljs.registerLanguage('x86asm', require('./languages/x86asm.js'));
hljs.registerLanguage('matlab', require('./languages/matlab.js'));
hljs.registerLanguage('nsis', require('./languages/nsis.js'));
module.exports = hljs;


},{"./highlight":48,"./languages/1c.js":50,"./languages/actionscript.js":51,"./languages/apache.js":52,"./languages/applescript.js":53,"./languages/asciidoc.js":54,"./languages/autohotkey.js":55,"./languages/avrasm.js":56,"./languages/axapta.js":57,"./languages/bash.js":58,"./languages/brainfuck.js":59,"./languages/capnproto.js":60,"./languages/clojure.js":61,"./languages/cmake.js":62,"./languages/coffeescript.js":63,"./languages/cpp.js":64,"./languages/cs.js":65,"./languages/css.js":66,"./languages/d.js":67,"./languages/dart.js":68,"./languages/delphi.js":69,"./languages/diff.js":70,"./languages/django.js":71,"./languages/dos.js":72,"./languages/dust.js":73,"./languages/elixir.js":74,"./languages/erlang-repl.js":75,"./languages/erlang.js":76,"./languages/fix.js":77,"./languages/fsharp.js":78,"./languages/gcode.js":79,"./languages/gherkin.js":80,"./languages/glsl.js":81,"./languages/go.js":82,"./languages/gradle.js":83,"./languages/groovy.js":84,"./languages/haml.js":85,"./languages/handlebars.js":86,"./languages/haskell.js":87,"./languages/haxe.js":88,"./languages/http.js":89,"./languages/ini.js":90,"./languages/java.js":91,"./languages/javascript.js":92,"./languages/json.js":93,"./languages/lasso.js":94,"./languages/lisp.js":95,"./languages/livecodeserver.js":96,"./languages/lua.js":97,"./languages/makefile.js":98,"./languages/markdown.js":99,"./languages/mathematica.js":100,"./languages/matlab.js":101,"./languages/mel.js":102,"./languages/mizar.js":103,"./languages/monkey.js":104,"./languages/nginx.js":105,"./languages/nimrod.js":106,"./languages/nix.js":107,"./languages/nsis.js":108,"./languages/objectivec.js":109,"./languages/ocaml.js":110,"./languages/oxygene.js":111,"./languages/parser3.js":112,"./languages/perl.js":113,"./languages/php.js":114,"./languages/profile.js":115,"./languages/protobuf.js":116,"./languages/python.js":117,"./languages/q.js":118,"./languages/r.js":119,"./languages/rib.js":120,"./languages/rsl.js":121,"./languages/ruby.js":122,"./languages/ruleslanguage.js":123,"./languages/rust.js":124,"./languages/scala.js":125,"./languages/scheme.js":126,"./languages/scilab.js":127,"./languages/scss.js":128,"./languages/smalltalk.js":129,"./languages/sql.js":130,"./languages/swift.js":131,"./languages/tex.js":132,"./languages/thrift.js":133,"./languages/typescript.js":134,"./languages/vala.js":135,"./languages/vbnet.js":136,"./languages/vbscript.js":137,"./languages/vhdl.js":138,"./languages/vim.js":139,"./languages/x86asm.js":140,"./languages/xml.js":141}],50:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var IDENT_RE_RU = '[a-zA-Zа-яА-Я][a-zA-Z0-9_а-яА-Я]*';
  var OneS_KEYWORDS = 'возврат дата для если и или иначе иначеесли исключение конецесли ' + 'конецпопытки конецпроцедуры конецфункции конеццикла константа не перейти перем ' + 'перечисление по пока попытка прервать продолжить процедура строка тогда фс функция цикл ' + 'число экспорт';
  var OneS_BUILT_IN = 'ansitooem oemtoansi ввестивидсубконто ввестидату ввестизначение ' + 'ввестиперечисление ввестипериод ввестиплансчетов ввестистроку ввестичисло вопрос ' + 'восстановитьзначение врег выбранныйплансчетов вызватьисключение датагод датамесяц ' + 'датачисло добавитьмесяц завершитьработусистемы заголовоксистемы записьжурналарегистрации ' + 'запуститьприложение зафиксироватьтранзакцию значениевстроку значениевстрокувнутр ' + 'значениевфайл значениеизстроки значениеизстрокивнутр значениеизфайла имякомпьютера ' + 'имяпользователя каталогвременныхфайлов каталогиб каталогпользователя каталогпрограммы ' + 'кодсимв командасистемы конгода конецпериодаби конецрассчитанногопериодаби ' + 'конецстандартногоинтервала конквартала конмесяца коннедели лев лог лог10 макс ' + 'максимальноеколичествосубконто мин монопольныйрежим названиеинтерфейса названиенабораправ ' + 'назначитьвид назначитьсчет найти найтипомеченныенаудаление найтиссылки началопериодаби ' + 'началостандартногоинтервала начатьтранзакцию начгода начквартала начмесяца начнедели ' + 'номерднягода номерднянедели номернеделигода нрег обработкаожидания окр описаниеошибки ' + 'основнойжурналрасчетов основнойплансчетов основнойязык открытьформу открытьформумодально ' + 'отменитьтранзакцию очиститьокносообщений периодстр полноеимяпользователя получитьвремята ' + 'получитьдатута получитьдокументта получитьзначенияотбора получитьпозициюта ' + 'получитьпустоезначение получитьта прав праводоступа предупреждение префиксавтонумерации ' + 'пустаястрока пустоезначение рабочаядаттьпустоезначение рабочаядата разделительстраниц ' + 'разделительстрок разм разобратьпозициюдокумента рассчитатьрегистрына ' + 'рассчитатьрегистрыпо сигнал симв символтабуляции создатьобъект сокрл сокрлп сокрп ' + 'сообщить состояние сохранитьзначение сред статусвозврата стрдлина стрзаменить ' + 'стрколичествострок стрполучитьстроку  стрчисловхождений сформироватьпозициюдокумента ' + 'счетпокоду текущаядата текущеевремя типзначения типзначениястр удалитьобъекты ' + 'установитьтана установитьтапо фиксшаблон формат цел шаблон';
  var DQUOTE = {
    className: 'dquote',
    begin: '""'
  };
  var STR_START = {
    className: 'string',
    begin: '"',
    end: '"|$',
    contains: [DQUOTE]
  };
  var STR_CONT = {
    className: 'string',
    begin: '\\|',
    end: '"|$',
    contains: [DQUOTE]
  };
  return {
    case_insensitive: true,
    lexemes: IDENT_RE_RU,
    keywords: {
      keyword: OneS_KEYWORDS,
      built_in: OneS_BUILT_IN
    },
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.NUMBER_MODE, STR_START, STR_CONT, {
      className: 'function',
      begin: '(процедура|функция)',
      end: '$',
      lexemes: IDENT_RE_RU,
      keywords: 'процедура функция',
      contains: [hljs.inherit(hljs.TITLE_MODE, {begin: IDENT_RE_RU}), {
        className: 'tail',
        endsWithParent: true,
        contains: [{
          className: 'params',
          begin: '\\(',
          end: '\\)',
          lexemes: IDENT_RE_RU,
          keywords: 'знач',
          contains: [STR_START, STR_CONT]
        }, {
          className: 'export',
          begin: 'экспорт',
          endsWithParent: true,
          lexemes: IDENT_RE_RU,
          keywords: 'экспорт',
          contains: [hljs.C_LINE_COMMENT_MODE]
        }]
      }, hljs.C_LINE_COMMENT_MODE]
    }, {
      className: 'preprocessor',
      begin: '#',
      end: '$'
    }, {
      className: 'date',
      begin: '\'\\d{2}\\.\\d{2}\\.(\\d{2}|\\d{4})\''
    }]
  };
};


},{}],51:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var IDENT_RE = '[a-zA-Z_$][a-zA-Z0-9_$]*';
  var IDENT_FUNC_RETURN_TYPE_RE = '([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)';
  var AS3_REST_ARG_MODE = {
    className: 'rest_arg',
    begin: '[.]{3}',
    end: IDENT_RE,
    relevance: 10
  };
  return {
    aliases: ['as'],
    keywords: {
      keyword: 'as break case catch class const continue default delete do dynamic each ' + 'else extends final finally for function get if implements import in include ' + 'instanceof interface internal is namespace native new override package private ' + 'protected public return set static super switch this throw try typeof use var void ' + 'while with',
      literal: 'true false null undefined'
    },
    contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.C_NUMBER_MODE, {
      className: 'package',
      beginKeywords: 'package',
      end: '{',
      contains: [hljs.TITLE_MODE]
    }, {
      className: 'class',
      beginKeywords: 'class interface',
      end: '{',
      excludeEnd: true,
      contains: [{beginKeywords: 'extends implements'}, hljs.TITLE_MODE]
    }, {
      className: 'preprocessor',
      beginKeywords: 'import include',
      end: ';'
    }, {
      className: 'function',
      beginKeywords: 'function',
      end: '[{;]',
      excludeEnd: true,
      illegal: '\\S',
      contains: [hljs.TITLE_MODE, {
        className: 'params',
        begin: '\\(',
        end: '\\)',
        contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, AS3_REST_ARG_MODE]
      }, {
        className: 'type',
        begin: ':',
        end: IDENT_FUNC_RETURN_TYPE_RE,
        relevance: 10
      }]
    }]
  };
};


},{}],52:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var NUMBER = {
    className: 'number',
    begin: '[\\$%]\\d+'
  };
  return {
    aliases: ['apacheconf'],
    case_insensitive: true,
    contains: [hljs.HASH_COMMENT_MODE, {
      className: 'tag',
      begin: '</?',
      end: '>'
    }, {
      className: 'keyword',
      begin: /\w+/,
      relevance: 0,
      keywords: {common: 'order deny allow setenv rewriterule rewriteengine rewritecond documentroot ' + 'sethandler errordocument loadmodule options header listen serverroot ' + 'servername'},
      starts: {
        end: /$/,
        relevance: 0,
        keywords: {literal: 'on off all'},
        contains: [{
          className: 'sqbracket',
          begin: '\\s\\[',
          end: '\\]$'
        }, {
          className: 'cbracket',
          begin: '[\\$%]\\{',
          end: '\\}',
          contains: ['self', NUMBER]
        }, NUMBER, hljs.QUOTE_STRING_MODE]
      }
    }],
    illegal: /\S/
  };
};


},{}],53:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: ''});
  var PARAMS = {
    className: 'params',
    begin: '\\(',
    end: '\\)',
    contains: ['self', hljs.C_NUMBER_MODE, STRING]
  };
  var COMMENTS = [{
    className: 'comment',
    begin: '--',
    end: '$'
  }, {
    className: 'comment',
    begin: '\\(\\*',
    end: '\\*\\)',
    contains: ['self', {
      begin: '--',
      end: '$'
    }]
  }, hljs.HASH_COMMENT_MODE];
  return {
    aliases: ['osascript'],
    keywords: {
      keyword: 'about above after against and around as at back before beginning ' + 'behind below beneath beside between but by considering ' + 'contain contains continue copy div does eighth else end equal ' + 'equals error every exit fifth first for fourth from front ' + 'get given global if ignoring in into is it its last local me ' + 'middle mod my ninth not of on onto or over prop property put ref ' + 'reference repeat returning script second set seventh since ' + 'sixth some tell tenth that the|0 then third through thru ' + 'timeout times to transaction try until where while whose with ' + 'without',
      constant: 'AppleScript false linefeed return pi quote result space tab true',
      type: 'alias application boolean class constant date file integer list ' + 'number real record string text',
      command: 'activate beep count delay launch log offset read round ' + 'run say summarize write',
      property: 'character characters contents day frontmost id item length ' + 'month name paragraph paragraphs rest reverse running time version ' + 'weekday word words year'
    },
    contains: [STRING, hljs.C_NUMBER_MODE, {
      className: 'type',
      begin: '\\bPOSIX file\\b'
    }, {
      className: 'command',
      begin: '\\b(clipboard info|the clipboard|info for|list (disks|folder)|' + 'mount volume|path to|(close|open for) access|(get|set) eof|' + 'current date|do shell script|get volume settings|random number|' + 'set volume|system attribute|system info|time to GMT|' + '(load|run|store) script|scripting components|' + 'ASCII (character|number)|localized string|' + 'choose (application|color|file|file name|' + 'folder|from list|remote application|URL)|' + 'display (alert|dialog))\\b|^\\s*return\\b'
    }, {
      className: 'constant',
      begin: '\\b(text item delimiters|current application|missing value)\\b'
    }, {
      className: 'keyword',
      begin: '\\b(apart from|aside from|instead of|out of|greater than|' + "isn't|(doesn't|does not) (equal|come before|come after|contain)|" + '(greater|less) than( or equal)?|(starts?|ends|begins?) with|' + 'contained by|comes (before|after)|a (ref|reference))\\b'
    }, {
      className: 'property',
      begin: '\\b(POSIX path|(date|time) string|quoted form)\\b'
    }, {
      className: 'function_start',
      beginKeywords: 'on',
      illegal: '[${=;\\n]',
      contains: [hljs.UNDERSCORE_TITLE_MODE, PARAMS]
    }].concat(COMMENTS),
    illegal: '//'
  };
};


},{}],54:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {contains: [{
      className: 'comment',
      begin: '^/{4,}\\n',
      end: '\\n/{4,}$',
      relevance: 10
    }, {
      className: 'comment',
      begin: '^//',
      end: '$',
      relevance: 0
    }, {
      className: 'title',
      begin: '^\\.\\w.*$'
    }, {
      begin: '^[=\\*]{4,}\\n',
      end: '\\n^[=\\*]{4,}$',
      relevance: 10
    }, {
      className: 'header',
      begin: '^(={1,5}) .+?( \\1)?$',
      relevance: 10
    }, {
      className: 'header',
      begin: '^[^\\[\\]\\n]+?\\n[=\\-~\\^\\+]{2,}$',
      relevance: 10
    }, {
      className: 'attribute',
      begin: '^:.+?:',
      end: '\\s',
      excludeEnd: true,
      relevance: 10
    }, {
      className: 'attribute',
      begin: '^\\[.+?\\]$',
      relevance: 0
    }, {
      className: 'blockquote',
      begin: '^_{4,}\\n',
      end: '\\n_{4,}$',
      relevance: 10
    }, {
      className: 'code',
      begin: '^[\\-\\.]{4,}\\n',
      end: '\\n[\\-\\.]{4,}$',
      relevance: 10
    }, {
      begin: '^\\+{4,}\\n',
      end: '\\n\\+{4,}$',
      contains: [{
        begin: '<',
        end: '>',
        subLanguage: 'xml',
        relevance: 0
      }],
      relevance: 10
    }, {
      className: 'bullet',
      begin: '^(\\*+|\\-+|\\.+|[^\\n]+?::)\\s+'
    }, {
      className: 'label',
      begin: '^(NOTE|TIP|IMPORTANT|WARNING|CAUTION):\\s+',
      relevance: 10
    }, {
      className: 'strong',
      begin: '\\B\\*(?![\\*\\s])',
      end: '(\\n{2}|\\*)',
      contains: [{
        begin: '\\\\*\\w',
        relevance: 0
      }]
    }, {
      className: 'emphasis',
      begin: '\\B\'(?![\'\\s])',
      end: '(\\n{2}|\')',
      contains: [{
        begin: '\\\\\'\\w',
        relevance: 0
      }],
      relevance: 0
    }, {
      className: 'emphasis',
      begin: '_(?![_\\s])',
      end: '(\\n{2}|_)',
      relevance: 0
    }, {
      className: 'smartquote',
      begin: "``.+?''",
      relevance: 10
    }, {
      className: 'smartquote',
      begin: "`.+?'",
      relevance: 10
    }, {
      className: 'code',
      begin: '(`.+?`|\\+.+?\\+)',
      relevance: 0
    }, {
      className: 'code',
      begin: '^[ \\t]',
      end: '$',
      relevance: 0
    }, {
      className: 'horizontal_rule',
      begin: '^\'{3,}[ \\t]*$',
      relevance: 10
    }, {
      begin: '(link:)?(http|https|ftp|file|irc|image:?):\\S+\\[.*?\\]',
      returnBegin: true,
      contains: [{
        begin: '(link|image:?):',
        relevance: 0
      }, {
        className: 'link_url',
        begin: '\\w',
        end: '[^\\[]+',
        relevance: 0
      }, {
        className: 'link_label',
        begin: '\\[',
        end: '\\]',
        excludeBegin: true,
        excludeEnd: true,
        relevance: 0
      }],
      relevance: 10
    }]};
};


},{}],55:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var BACKTICK_ESCAPE = {
    className: 'escape',
    begin: '`[\\s\\S]'
  };
  var COMMENTS = {
    className: 'comment',
    begin: ';',
    end: '$',
    relevance: 0
  };
  var BUILT_IN = [{
    className: 'built_in',
    begin: 'A_[a-zA-Z0-9]+'
  }, {
    className: 'built_in',
    beginKeywords: 'ComSpec Clipboard ClipboardAll ErrorLevel'
  }];
  return {
    case_insensitive: true,
    keywords: {
      keyword: 'Break Continue Else Gosub If Loop Return While',
      literal: 'A true false NOT AND OR'
    },
    contains: BUILT_IN.concat([BACKTICK_ESCAPE, hljs.inherit(hljs.QUOTE_STRING_MODE, {contains: [BACKTICK_ESCAPE]}), COMMENTS, {
      className: 'number',
      begin: hljs.NUMBER_RE,
      relevance: 0
    }, {
      className: 'var_expand',
      begin: '%',
      end: '%',
      illegal: '\\n',
      contains: [BACKTICK_ESCAPE]
    }, {
      className: 'label',
      contains: [BACKTICK_ESCAPE],
      variants: [{begin: '^[^\\n";]+::(?!=)'}, {
        begin: '^[^\\n";]+:(?!=)',
        relevance: 0
      }]
    }, {
      begin: ',\\s*,',
      relevance: 10
    }])
  };
};


},{}],56:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    case_insensitive: true,
    lexemes: '\\.?' + hljs.IDENT_RE,
    keywords: {
      keyword: 'adc add adiw and andi asr bclr bld brbc brbs brcc brcs break breq brge brhc brhs ' + 'brid brie brlo brlt brmi brne brpl brsh brtc brts brvc brvs bset bst call cbi cbr ' + 'clc clh cli cln clr cls clt clv clz com cp cpc cpi cpse dec eicall eijmp elpm eor ' + 'fmul fmuls fmulsu icall ijmp in inc jmp ld ldd ldi lds lpm lsl lsr mov movw mul ' + 'muls mulsu neg nop or ori out pop push rcall ret reti rjmp rol ror sbc sbr sbrc sbrs ' + 'sec seh sbi sbci sbic sbis sbiw sei sen ser ses set sev sez sleep spm st std sts sub ' + 'subi swap tst wdr',
      built_in: 'r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 r16 r17 r18 r19 r20 r21 r22 ' + 'r23 r24 r25 r26 r27 r28 r29 r30 r31 x|0 xh xl y|0 yh yl z|0 zh zl ' + 'ucsr1c udr1 ucsr1a ucsr1b ubrr1l ubrr1h ucsr0c ubrr0h tccr3c tccr3a tccr3b tcnt3h ' + 'tcnt3l ocr3ah ocr3al ocr3bh ocr3bl ocr3ch ocr3cl icr3h icr3l etimsk etifr tccr1c ' + 'ocr1ch ocr1cl twcr twdr twar twsr twbr osccal xmcra xmcrb eicra spmcsr spmcr portg ' + 'ddrg ping portf ddrf sreg sph spl xdiv rampz eicrb eimsk gimsk gicr eifr gifr timsk ' + 'tifr mcucr mcucsr tccr0 tcnt0 ocr0 assr tccr1a tccr1b tcnt1h tcnt1l ocr1ah ocr1al ' + 'ocr1bh ocr1bl icr1h icr1l tccr2 tcnt2 ocr2 ocdr wdtcr sfior eearh eearl eedr eecr ' + 'porta ddra pina portb ddrb pinb portc ddrc pinc portd ddrd pind spdr spsr spcr udr0 ' + 'ucsr0a ucsr0b ubrr0l acsr admux adcsr adch adcl porte ddre pine pinf',
      preprocessor: '.byte .cseg .db .def .device .dseg .dw .endmacro .equ .eseg .exit .include .list ' + '.listmac .macro .nolist .org .set'
    },
    contains: [hljs.C_BLOCK_COMMENT_MODE, {
      className: 'comment',
      begin: ';',
      end: '$',
      relevance: 0
    }, hljs.C_NUMBER_MODE, hljs.BINARY_NUMBER_MODE, {
      className: 'number',
      begin: '\\b(\\$[a-zA-Z0-9]+|0o[0-7]+)'
    }, hljs.QUOTE_STRING_MODE, {
      className: 'string',
      begin: '\'',
      end: '[^\\\\]\'',
      illegal: '[^\\\\][^\']'
    }, {
      className: 'label',
      begin: '^[A-Za-z0-9_.$]+:'
    }, {
      className: 'preprocessor',
      begin: '#',
      end: '$'
    }, {
      className: 'localvars',
      begin: '@[0-9]+'
    }]
  };
};


},{}],57:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    keywords: 'false int abstract private char boolean static null if for true ' + 'while long throw finally protected final return void enum else ' + 'break new catch byte super case short default double public try this switch ' + 'continue reverse firstfast firstonly forupdate nofetch sum avg minof maxof count ' + 'order group by asc desc index hint like dispaly edit client server ttsbegin ' + 'ttscommit str real date container anytype common div mod',
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.C_NUMBER_MODE, {
      className: 'preprocessor',
      begin: '#',
      end: '$'
    }, {
      className: 'class',
      beginKeywords: 'class interface',
      end: '{',
      excludeEnd: true,
      illegal: ':',
      contains: [{beginKeywords: 'extends implements'}, hljs.UNDERSCORE_TITLE_MODE]
    }]
  };
};


},{}],58:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var VAR = {
    className: 'variable',
    variants: [{begin: /\$[\w\d#@][\w\d_]*/}, {begin: /\$\{(.*?)\}/}]
  };
  var QUOTE_STRING = {
    className: 'string',
    begin: /"/,
    end: /"/,
    contains: [hljs.BACKSLASH_ESCAPE, VAR, {
      className: 'variable',
      begin: /\$\(/,
      end: /\)/,
      contains: [hljs.BACKSLASH_ESCAPE]
    }]
  };
  var APOS_STRING = {
    className: 'string',
    begin: /'/,
    end: /'/
  };
  return {
    aliases: ['sh', 'zsh'],
    lexemes: /-?[a-z\.]+/,
    keywords: {
      keyword: 'if then else elif fi for break continue while in do done exit return set ' + 'declare case esac export exec',
      literal: 'true false',
      built_in: 'printf echo read cd pwd pushd popd dirs let eval unset typeset readonly ' + 'getopts source shopt caller type hash bind help sudo',
      operator: '-ne -eq -lt -gt -f -d -e -s -l -a'
    },
    contains: [{
      className: 'shebang',
      begin: /^#![^\n]+sh\s*$/,
      relevance: 10
    }, {
      className: 'function',
      begin: /\w[\w\d_]*\s*\(\s*\)\s*\{/,
      returnBegin: true,
      contains: [hljs.inherit(hljs.TITLE_MODE, {begin: /\w[\w\d_]*/})],
      relevance: 0
    }, hljs.HASH_COMMENT_MODE, hljs.NUMBER_MODE, QUOTE_STRING, APOS_STRING, VAR]
  };
};


},{}],59:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var LITERAL = {
    className: 'literal',
    begin: '[\\+\\-]',
    relevance: 0
  };
  return {
    aliases: ['bf'],
    contains: [{
      className: 'comment',
      begin: '[^\\[\\]\\.,\\+\\-<> \r\n]',
      returnEnd: true,
      end: '[\\[\\]\\.,\\+\\-<> \r\n]',
      relevance: 0
    }, {
      className: 'title',
      begin: '[\\[\\]]',
      relevance: 0
    }, {
      className: 'string',
      begin: '[\\.,]',
      relevance: 0
    }, {
      begin: /\+\+|\-\-/,
      returnBegin: true,
      contains: [LITERAL]
    }, LITERAL]
  };
};


},{}],60:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    aliases: ['capnp'],
    keywords: {
      keyword: 'struct enum interface union group import using const annotation extends in of on as with from fixed',
      built_in: 'Void Bool Int8 Int16 Int32 Int64 UInt8 UInt16 UInt32 UInt64 Float32 Float64 ' + 'Text Data AnyPointer AnyStruct Capability List',
      literal: 'true false'
    },
    contains: [hljs.QUOTE_STRING_MODE, hljs.NUMBER_MODE, hljs.HASH_COMMENT_MODE, {
      className: 'shebang',
      begin: /@0x[\w\d]{16};/,
      illegal: /\n/
    }, {
      className: 'number',
      begin: /@\d+\b/
    }, {
      className: 'class',
      beginKeywords: 'struct enum',
      end: /\{/,
      illegal: /\n/,
      contains: [hljs.inherit(hljs.TITLE_MODE, {starts: {
          endsWithParent: true,
          excludeEnd: true
        }})]
    }, {
      className: 'class',
      beginKeywords: 'interface',
      end: /\{/,
      illegal: /\n/,
      contains: [hljs.inherit(hljs.TITLE_MODE, {starts: {
          endsWithParent: true,
          excludeEnd: true
        }})]
    }]
  };
};


},{}],61:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var keywords = {built_in: 'def cond apply if-not if-let if not not= = < > <= >= == + / * - rem ' + 'quot neg? pos? delay? symbol? keyword? true? false? integer? empty? coll? list? ' + 'set? ifn? fn? associative? sequential? sorted? counted? reversible? number? decimal? ' + 'class? distinct? isa? float? rational? reduced? ratio? odd? even? char? seq? vector? ' + 'string? map? nil? contains? zero? instance? not-every? not-any? libspec? -> ->> .. . ' + 'inc compare do dotimes mapcat take remove take-while drop letfn drop-last take-last ' + 'drop-while while intern condp case reduced cycle split-at split-with repeat replicate ' + 'iterate range merge zipmap declare line-seq sort comparator sort-by dorun doall nthnext ' + 'nthrest partition eval doseq await await-for let agent atom send send-off release-pending-sends ' + 'add-watch mapv filterv remove-watch agent-error restart-agent set-error-handler error-handler ' + 'set-error-mode! error-mode shutdown-agents quote var fn loop recur throw try monitor-enter ' + 'monitor-exit defmacro defn defn- macroexpand macroexpand-1 for dosync and or ' + 'when when-not when-let comp juxt partial sequence memoize constantly complement identity assert ' + 'peek pop doto proxy defstruct first rest cons defprotocol cast coll deftype defrecord last butlast ' + 'sigs reify second ffirst fnext nfirst nnext defmulti defmethod meta with-meta ns in-ns create-ns import ' + 'refer keys select-keys vals key val rseq name namespace promise into transient persistent! conj! ' + 'assoc! dissoc! pop! disj! use class type num float double short byte boolean bigint biginteger ' + 'bigdec print-method print-dup throw-if printf format load compile get-in update-in pr pr-on newline ' + 'flush read slurp read-line subvec with-open memfn time re-find re-groups rand-int rand mod locking ' + 'assert-valid-fdecl alias resolve ref deref refset swap! reset! set-validator! compare-and-set! alter-meta! ' + 'reset-meta! commute get-validator alter ref-set ref-history-count ref-min-history ref-max-history ensure sync io! ' + 'new next conj set! to-array future future-call into-array aset gen-class reduce map filter find empty ' + 'hash-map hash-set sorted-map sorted-map-by sorted-set sorted-set-by vec vector seq flatten reverse assoc dissoc list ' + 'disj get union difference intersection extend extend-type extend-protocol int nth delay count concat chunk chunk-buffer ' + 'chunk-append chunk-first chunk-rest max min dec unchecked-inc-int unchecked-inc unchecked-dec-inc unchecked-dec unchecked-negate ' + 'unchecked-add-int unchecked-add unchecked-subtract-int unchecked-subtract chunk-next chunk-cons chunked-seq? prn vary-meta ' + 'lazy-seq spread list* str find-keyword keyword symbol gensym force rationalize'};
  var CLJ_IDENT_RE = '[a-zA-Z_0-9\\!\\.\\?\\-\\+\\*\\/\\<\\=\\>\\&\\#\\$\';]+';
  var SIMPLE_NUMBER_RE = '[\\s:\\(\\{]+\\d+(\\.\\d+)?';
  var NUMBER = {
    className: 'number',
    begin: SIMPLE_NUMBER_RE,
    relevance: 0
  };
  var STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null});
  var COMMENT = {
    className: 'comment',
    begin: ';',
    end: '$',
    relevance: 0
  };
  var COLLECTION = {
    className: 'collection',
    begin: '[\\[\\{]',
    end: '[\\]\\}]'
  };
  var HINT = {
    className: 'comment',
    begin: '\\^' + CLJ_IDENT_RE
  };
  var HINT_COL = {
    className: 'comment',
    begin: '\\^\\{',
    end: '\\}'
  };
  var KEY = {
    className: 'attribute',
    begin: '[:]' + CLJ_IDENT_RE
  };
  var LIST = {
    className: 'list',
    begin: '\\(',
    end: '\\)'
  };
  var BODY = {
    endsWithParent: true,
    keywords: {literal: 'true false nil'},
    relevance: 0
  };
  var NAME = {
    keywords: keywords,
    lexemes: CLJ_IDENT_RE,
    className: 'keyword',
    begin: CLJ_IDENT_RE,
    starts: BODY
  };
  LIST.contains = [{
    className: 'comment',
    begin: 'comment'
  }, NAME, BODY];
  BODY.contains = [LIST, STRING, HINT, HINT_COL, COMMENT, KEY, COLLECTION, NUMBER];
  COLLECTION.contains = [LIST, STRING, HINT, COMMENT, KEY, COLLECTION, NUMBER];
  return {
    aliases: ['clj'],
    illegal: /\S/,
    contains: [COMMENT, LIST, {
      className: 'prompt',
      begin: /^=> /,
      starts: {end: /\n\n|\Z/}
    }]
  };
};


},{}],62:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    aliases: ['cmake.in'],
    case_insensitive: true,
    keywords: {
      keyword: 'add_custom_command add_custom_target add_definitions add_dependencies ' + 'add_executable add_library add_subdirectory add_test aux_source_directory ' + 'break build_command cmake_minimum_required cmake_policy configure_file ' + 'create_test_sourcelist define_property else elseif enable_language enable_testing ' + 'endforeach endfunction endif endmacro endwhile execute_process export find_file ' + 'find_library find_package find_path find_program fltk_wrap_ui foreach function ' + 'get_cmake_property get_directory_property get_filename_component get_property ' + 'get_source_file_property get_target_property get_test_property if include ' + 'include_directories include_external_msproject include_regular_expression install ' + 'link_directories load_cache load_command macro mark_as_advanced message option ' + 'output_required_files project qt_wrap_cpp qt_wrap_ui remove_definitions return ' + 'separate_arguments set set_directory_properties set_property ' + 'set_source_files_properties set_target_properties set_tests_properties site_name ' + 'source_group string target_link_libraries try_compile try_run unset variable_watch ' + 'while build_name exec_program export_library_dependencies install_files ' + 'install_programs install_targets link_libraries make_directory remove subdir_depends ' + 'subdirs use_mangled_mesa utility_source variable_requires write_file ' + 'qt5_use_modules qt5_use_package qt5_wrap_cpp on off true false and or',
      operator: 'equal less greater strless strgreater strequal matches'
    },
    contains: [{
      className: 'envvar',
      begin: '\\${',
      end: '}'
    }, hljs.HASH_COMMENT_MODE, hljs.QUOTE_STRING_MODE, hljs.NUMBER_MODE]
  };
};


},{}],63:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var KEYWORDS = {
    keyword: 'in if for while finally new do return else break catch instanceof throw try this ' + 'switch continue typeof delete debugger super ' + 'then unless until loop of by when and or is isnt not',
    literal: 'true false null undefined ' + 'yes no on off',
    reserved: 'case default function var void with const let enum export import native ' + '__hasProp __extends __slice __bind __indexOf',
    built_in: 'npm require console print module global window document'
  };
  var JS_IDENT_RE = '[A-Za-z$_][0-9A-Za-z$_]*';
  var TITLE = hljs.inherit(hljs.TITLE_MODE, {begin: JS_IDENT_RE});
  var SUBST = {
    className: 'subst',
    begin: /#\{/,
    end: /}/,
    keywords: KEYWORDS
  };
  var EXPRESSIONS = [hljs.BINARY_NUMBER_MODE, hljs.inherit(hljs.C_NUMBER_MODE, {starts: {
      end: '(\\s*/)?',
      relevance: 0
    }}), {
    className: 'string',
    variants: [{
      begin: /'''/,
      end: /'''/,
      contains: [hljs.BACKSLASH_ESCAPE]
    }, {
      begin: /'/,
      end: /'/,
      contains: [hljs.BACKSLASH_ESCAPE]
    }, {
      begin: /"""/,
      end: /"""/,
      contains: [hljs.BACKSLASH_ESCAPE, SUBST]
    }, {
      begin: /"/,
      end: /"/,
      contains: [hljs.BACKSLASH_ESCAPE, SUBST]
    }]
  }, {
    className: 'regexp',
    variants: [{
      begin: '///',
      end: '///',
      contains: [SUBST, hljs.HASH_COMMENT_MODE]
    }, {
      begin: '//[gim]*',
      relevance: 0
    }, {begin: /\/(?![ *])(\\\/|.)*?\/[gim]*(?=\W|$)/}]
  }, {
    className: 'property',
    begin: '@' + JS_IDENT_RE
  }, {
    begin: '`',
    end: '`',
    excludeBegin: true,
    excludeEnd: true,
    subLanguage: 'javascript'
  }];
  SUBST.contains = EXPRESSIONS;
  return {
    aliases: ['coffee', 'cson', 'iced'],
    keywords: KEYWORDS,
    illegal: /\/\*/,
    contains: EXPRESSIONS.concat([{
      className: 'comment',
      begin: '###',
      end: '###'
    }, hljs.HASH_COMMENT_MODE, {
      className: 'function',
      begin: '(^\\s*|\\B)(' + JS_IDENT_RE + '\\s*=\\s*)?(\\(.*\\))?\\s*\\B[-=]>',
      end: '[-=]>',
      returnBegin: true,
      contains: [TITLE, {
        className: 'params',
        begin: '\\([^\\(]',
        returnBegin: true,
        contains: [{
          begin: /\(/,
          end: /\)/,
          keywords: KEYWORDS,
          contains: ['self'].concat(EXPRESSIONS)
        }]
      }]
    }, {
      className: 'class',
      beginKeywords: 'class',
      end: '$',
      illegal: /[:="\[\]]/,
      contains: [{
        beginKeywords: 'extends',
        endsWithParent: true,
        illegal: /[:="\[\]]/,
        contains: [TITLE]
      }, TITLE]
    }, {
      className: 'attribute',
      begin: JS_IDENT_RE + ':',
      end: ':',
      returnBegin: true,
      excludeEnd: true,
      relevance: 0
    }])
  };
};


},{}],64:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var CPP_KEYWORDS = {
    keyword: 'false int float while private char catch export virtual operator sizeof ' + 'dynamic_cast|10 typedef const_cast|10 const struct for static_cast|10 union namespace ' + 'unsigned long throw volatile static protected bool template mutable if public friend ' + 'do return goto auto void enum else break new extern using true class asm case typeid ' + 'short reinterpret_cast|10 default double register explicit signed typename try this ' + 'switch continue wchar_t inline delete alignof char16_t char32_t constexpr decltype ' + 'noexcept nullptr static_assert thread_local restrict _Bool complex _Complex _Imaginary',
    built_in: 'std string cin cout cerr clog stringstream istringstream ostringstream ' + 'auto_ptr deque list queue stack vector map set bitset multiset multimap unordered_set ' + 'unordered_map unordered_multiset unordered_multimap array shared_ptr abort abs acos ' + 'asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp ' + 'fscanf isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper ' + 'isxdigit tolower toupper labs ldexp log10 log malloc memchr memcmp memcpy memset modf pow ' + 'printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp ' + 'strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan ' + 'vfprintf vprintf vsprintf'
  };
  return {
    aliases: ['c', 'h', 'c++', 'h++'],
    keywords: CPP_KEYWORDS,
    illegal: '</',
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.QUOTE_STRING_MODE, {
      className: 'string',
      begin: '\'\\\\?.',
      end: '\'',
      illegal: '.'
    }, {
      className: 'number',
      begin: '\\b(\\d+(\\.\\d*)?|\\.\\d+)(u|U|l|L|ul|UL|f|F)'
    }, hljs.C_NUMBER_MODE, {
      className: 'preprocessor',
      begin: '#',
      end: '$',
      keywords: 'if else elif endif define undef warning error line pragma',
      contains: [{
        begin: 'include\\s*[<"]',
        end: '[>"]',
        keywords: 'include',
        illegal: '\\n'
      }, hljs.C_LINE_COMMENT_MODE]
    }, {
      className: 'stl_container',
      begin: '\\b(deque|list|queue|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<',
      end: '>',
      keywords: CPP_KEYWORDS,
      contains: ['self']
    }, {begin: hljs.IDENT_RE + '::'}]
  };
};


},{}],65:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var KEYWORDS = 'abstract as base bool break byte case catch char checked const continue decimal ' + 'default delegate do double else enum event explicit extern false finally fixed float ' + 'for foreach goto if implicit in int interface internal is lock long new null ' + 'object operator out override params private protected public readonly ref return sbyte ' + 'sealed short sizeof stackalloc static string struct switch this throw true try typeof ' + 'uint ulong unchecked unsafe ushort using virtual volatile void while async await ' + 'protected public private internal ' + 'ascending descending from get group into join let orderby partial select set value var ' + 'where yield';
  var GENERIC_IDENT_RE = hljs.IDENT_RE + '(<' + hljs.IDENT_RE + '>)?';
  return {
    aliases: ['csharp'],
    keywords: KEYWORDS,
    illegal: /::/,
    contains: [{
      className: 'comment',
      begin: '///',
      end: '$',
      returnBegin: true,
      contains: [{
        className: 'xmlDocTag',
        variants: [{
          begin: '///',
          relevance: 0
        }, {begin: '<!--|-->'}, {
          begin: '</?',
          end: '>'
        }]
      }]
    }, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, {
      className: 'preprocessor',
      begin: '#',
      end: '$',
      keywords: 'if else elif endif define undef warning error line region endregion pragma checksum'
    }, {
      className: 'string',
      begin: '@"',
      end: '"',
      contains: [{begin: '""'}]
    }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.C_NUMBER_MODE, {
      beginKeywords: 'class namespace interface',
      end: /[{;=]/,
      illegal: /[^\s:]/,
      contains: [hljs.TITLE_MODE, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE]
    }, {
      beginKeywords: 'new',
      end: /\s/,
      relevance: 0
    }, {
      className: 'function',
      begin: '(' + GENERIC_IDENT_RE + '\\s+)+' + hljs.IDENT_RE + '\\s*\\(',
      returnBegin: true,
      end: /[{;=]/,
      excludeEnd: true,
      keywords: KEYWORDS,
      contains: [{
        begin: hljs.IDENT_RE + '\\s*\\(',
        returnBegin: true,
        contains: [hljs.TITLE_MODE]
      }, {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.C_NUMBER_MODE, hljs.C_BLOCK_COMMENT_MODE]
      }, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE]
    }]
  };
};


},{}],66:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var FUNCTION = {
    className: 'function',
    begin: IDENT_RE + '\\(',
    returnBegin: true,
    excludeEnd: true,
    end: '\\('
  };
  return {
    case_insensitive: true,
    illegal: '[=/|\']',
    contains: [hljs.C_BLOCK_COMMENT_MODE, {
      className: 'id',
      begin: '\\#[A-Za-z0-9_-]+'
    }, {
      className: 'class',
      begin: '\\.[A-Za-z0-9_-]+',
      relevance: 0
    }, {
      className: 'attr_selector',
      begin: '\\[',
      end: '\\]',
      illegal: '$'
    }, {
      className: 'pseudo',
      begin: ':(:)?[a-zA-Z0-9\\_\\-\\+\\(\\)\\"\\\']+'
    }, {
      className: 'at_rule',
      begin: '@(font-face|page)',
      lexemes: '[a-z-]+',
      keywords: 'font-face page'
    }, {
      className: 'at_rule',
      begin: '@',
      end: '[{;]',
      contains: [{
        className: 'keyword',
        begin: /\S+/
      }, {
        begin: /\s/,
        endsWithParent: true,
        excludeEnd: true,
        relevance: 0,
        contains: [FUNCTION, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.CSS_NUMBER_MODE]
      }]
    }, {
      className: 'tag',
      begin: IDENT_RE,
      relevance: 0
    }, {
      className: 'rules',
      begin: '{',
      end: '}',
      illegal: '[^\\s]',
      relevance: 0,
      contains: [hljs.C_BLOCK_COMMENT_MODE, {
        className: 'rule',
        begin: '[^\\s]',
        returnBegin: true,
        end: ';',
        endsWithParent: true,
        contains: [{
          className: 'attribute',
          begin: '[A-Z\\_\\.\\-]+',
          end: ':',
          excludeEnd: true,
          illegal: '[^\\s]',
          starts: {
            className: 'value',
            endsWithParent: true,
            excludeEnd: true,
            contains: [FUNCTION, hljs.CSS_NUMBER_MODE, hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, hljs.C_BLOCK_COMMENT_MODE, {
              className: 'hexcolor',
              begin: '#[0-9A-Fa-f]+'
            }, {
              className: 'important',
              begin: '!important'
            }]
          }
        }]
      }]
    }]
  };
};


},{}],67:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var D_KEYWORDS = {
    keyword: 'abstract alias align asm assert auto body break byte case cast catch class ' + 'const continue debug default delete deprecated do else enum export extern final ' + 'finally for foreach foreach_reverse|10 goto if immutable import in inout int ' + 'interface invariant is lazy macro mixin module new nothrow out override package ' + 'pragma private protected public pure ref return scope shared static struct ' + 'super switch synchronized template this throw try typedef typeid typeof union ' + 'unittest version void volatile while with __FILE__ __LINE__ __gshared|10 ' + '__thread __traits __DATE__ __EOF__ __TIME__ __TIMESTAMP__ __VENDOR__ __VERSION__',
    built_in: 'bool cdouble cent cfloat char creal dchar delegate double dstring float function ' + 'idouble ifloat ireal long real short string ubyte ucent uint ulong ushort wchar ' + 'wstring',
    literal: 'false null true'
  };
  var decimal_integer_re = '(0|[1-9][\\d_]*)',
      decimal_integer_nosus_re = '(0|[1-9][\\d_]*|\\d[\\d_]*|[\\d_]+?\\d)',
      binary_integer_re = '0[bB][01_]+',
      hexadecimal_digits_re = '([\\da-fA-F][\\da-fA-F_]*|_[\\da-fA-F][\\da-fA-F_]*)',
      hexadecimal_integer_re = '0[xX]' + hexadecimal_digits_re,
      decimal_exponent_re = '([eE][+-]?' + decimal_integer_nosus_re + ')',
      decimal_float_re = '(' + decimal_integer_nosus_re + '(\\.\\d*|' + decimal_exponent_re + ')|' + '\\d+\\.' + decimal_integer_nosus_re + decimal_integer_nosus_re + '|' + '\\.' + decimal_integer_re + decimal_exponent_re + '?' + ')',
      hexadecimal_float_re = '(0[xX](' + hexadecimal_digits_re + '\\.' + hexadecimal_digits_re + '|' + '\\.?' + hexadecimal_digits_re + ')[pP][+-]?' + decimal_integer_nosus_re + ')',
      integer_re = '(' + decimal_integer_re + '|' + binary_integer_re + '|' + hexadecimal_integer_re + ')',
      float_re = '(' + hexadecimal_float_re + '|' + decimal_float_re + ')';
  var escape_sequence_re = '\\\\(' + '[\'"\\?\\\\abfnrtv]|' + 'u[\\dA-Fa-f]{4}|' + '[0-7]{1,3}|' + 'x[\\dA-Fa-f]{2}|' + 'U[\\dA-Fa-f]{8}' + ')|' + '&[a-zA-Z\\d]{2,};';
  var D_INTEGER_MODE = {
    className: 'number',
    begin: '\\b' + integer_re + '(L|u|U|Lu|LU|uL|UL)?',
    relevance: 0
  };
  var D_FLOAT_MODE = {
    className: 'number',
    begin: '\\b(' + float_re + '([fF]|L|i|[fF]i|Li)?|' + integer_re + '(i|[fF]i|Li)' + ')',
    relevance: 0
  };
  var D_CHARACTER_MODE = {
    className: 'string',
    begin: '\'(' + escape_sequence_re + '|.)',
    end: '\'',
    illegal: '.'
  };
  var D_ESCAPE_SEQUENCE = {
    begin: escape_sequence_re,
    relevance: 0
  };
  var D_STRING_MODE = {
    className: 'string',
    begin: '"',
    contains: [D_ESCAPE_SEQUENCE],
    end: '"[cwd]?'
  };
  var D_WYSIWYG_DELIMITED_STRING_MODE = {
    className: 'string',
    begin: '[rq]"',
    end: '"[cwd]?',
    relevance: 5
  };
  var D_ALTERNATE_WYSIWYG_STRING_MODE = {
    className: 'string',
    begin: '`',
    end: '`[cwd]?'
  };
  var D_HEX_STRING_MODE = {
    className: 'string',
    begin: 'x"[\\da-fA-F\\s\\n\\r]*"[cwd]?',
    relevance: 10
  };
  var D_TOKEN_STRING_MODE = {
    className: 'string',
    begin: 'q"\\{',
    end: '\\}"'
  };
  var D_HASHBANG_MODE = {
    className: 'shebang',
    begin: '^#!',
    end: '$',
    relevance: 5
  };
  var D_SPECIAL_TOKEN_SEQUENCE_MODE = {
    className: 'preprocessor',
    begin: '#(line)',
    end: '$',
    relevance: 5
  };
  var D_ATTRIBUTE_MODE = {
    className: 'keyword',
    begin: '@[a-zA-Z_][a-zA-Z_\\d]*'
  };
  var D_NESTING_COMMENT_MODE = {
    className: 'comment',
    begin: '\\/\\+',
    contains: ['self'],
    end: '\\+\\/',
    relevance: 10
  };
  return {
    lexemes: hljs.UNDERSCORE_IDENT_RE,
    keywords: D_KEYWORDS,
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, D_NESTING_COMMENT_MODE, D_HEX_STRING_MODE, D_STRING_MODE, D_WYSIWYG_DELIMITED_STRING_MODE, D_ALTERNATE_WYSIWYG_STRING_MODE, D_TOKEN_STRING_MODE, D_FLOAT_MODE, D_INTEGER_MODE, D_CHARACTER_MODE, D_HASHBANG_MODE, D_SPECIAL_TOKEN_SEQUENCE_MODE, D_ATTRIBUTE_MODE]
  };
};


},{}],68:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var SUBST = {
    className: 'subst',
    begin: '\\$\\{',
    end: '}',
    keywords: 'true false null this is new super'
  };
  var STRING = {
    className: 'string',
    variants: [{
      begin: 'r\'\'\'',
      end: '\'\'\''
    }, {
      begin: 'r"""',
      end: '"""'
    }, {
      begin: 'r\'',
      end: '\'',
      illegal: '\\n'
    }, {
      begin: 'r"',
      end: '"',
      illegal: '\\n'
    }, {
      begin: '\'\'\'',
      end: '\'\'\'',
      contains: [hljs.BACKSLASH_ESCAPE, SUBST]
    }, {
      begin: '"""',
      end: '"""',
      contains: [hljs.BACKSLASH_ESCAPE, SUBST]
    }, {
      begin: '\'',
      end: '\'',
      illegal: '\\n',
      contains: [hljs.BACKSLASH_ESCAPE, SUBST]
    }, {
      begin: '"',
      end: '"',
      illegal: '\\n',
      contains: [hljs.BACKSLASH_ESCAPE, SUBST]
    }]
  };
  SUBST.contains = [hljs.C_NUMBER_MODE, STRING];
  var KEYWORDS = {
    keyword: 'assert break case catch class const continue default do else enum extends false final finally for if ' + 'in is new null rethrow return super switch this throw true try var void while with',
    literal: 'abstract as dynamic export external factory get implements import library operator part set static typedef',
    built_in: 'print Comparable DateTime Duration Function Iterable Iterator List Map Match Null Object Pattern RegExp Set ' + 'Stopwatch String StringBuffer StringSink Symbol Type Uri bool double int num ' + 'document window querySelector querySelectorAll Element ElementList'
  };
  return {
    keywords: KEYWORDS,
    contains: [STRING, {
      className: 'dartdoc',
      begin: '/\\*\\*',
      end: '\\*/',
      subLanguage: 'markdown',
      subLanguageMode: 'continuous'
    }, {
      className: 'dartdoc',
      begin: '///',
      end: '$',
      subLanguage: 'markdown',
      subLanguageMode: 'continuous'
    }, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, {
      className: 'class',
      beginKeywords: 'class interface',
      end: '{',
      excludeEnd: true,
      contains: [{beginKeywords: 'extends implements'}, hljs.UNDERSCORE_TITLE_MODE]
    }, hljs.C_NUMBER_MODE, {
      className: 'annotation',
      begin: '@[A-Za-z]+'
    }, {begin: '=>'}]
  };
};


},{}],69:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var KEYWORDS = 'exports register file shl array record property for mod while set ally label uses raise not ' + 'stored class safecall var interface or private static exit index inherited to else stdcall ' + 'override shr asm far resourcestring finalization packed virtual out and protected library do ' + 'xorwrite goto near function end div overload object unit begin string on inline repeat until ' + 'destructor write message program with read initialization except default nil if case cdecl in ' + 'downto threadvar of try pascal const external constructor type public then implementation ' + 'finally published procedure';
  var COMMENT = {
    className: 'comment',
    variants: [{
      begin: /\{/,
      end: /\}/,
      relevance: 0
    }, {
      begin: /\(\*/,
      end: /\*\)/,
      relevance: 10
    }]
  };
  var STRING = {
    className: 'string',
    begin: /'/,
    end: /'/,
    contains: [{begin: /''/}]
  };
  var CHAR_STRING = {
    className: 'string',
    begin: /(#\d+)+/
  };
  var CLASS = {
    begin: hljs.IDENT_RE + '\\s*=\\s*class\\s*\\(',
    returnBegin: true,
    contains: [hljs.TITLE_MODE]
  };
  var FUNCTION = {
    className: 'function',
    beginKeywords: 'function constructor destructor procedure',
    end: /[:;]/,
    keywords: 'function constructor|10 destructor|10 procedure|10',
    contains: [hljs.TITLE_MODE, {
      className: 'params',
      begin: /\(/,
      end: /\)/,
      keywords: KEYWORDS,
      contains: [STRING, CHAR_STRING]
    }, COMMENT]
  };
  return {
    case_insensitive: true,
    keywords: KEYWORDS,
    illegal: /("|\$[G-Zg-z]|\/\*|<\/)/,
    contains: [COMMENT, hljs.C_LINE_COMMENT_MODE, STRING, CHAR_STRING, hljs.NUMBER_MODE, CLASS, FUNCTION]
  };
};


},{}],70:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    aliases: ['patch'],
    contains: [{
      className: 'chunk',
      relevance: 10,
      variants: [{begin: /^\@\@ +\-\d+,\d+ +\+\d+,\d+ +\@\@$/}, {begin: /^\*\*\* +\d+,\d+ +\*\*\*\*$/}, {begin: /^\-\-\- +\d+,\d+ +\-\-\-\-$/}]
    }, {
      className: 'header',
      variants: [{
        begin: /Index: /,
        end: /$/
      }, {
        begin: /=====/,
        end: /=====$/
      }, {
        begin: /^\-\-\-/,
        end: /$/
      }, {
        begin: /^\*{3} /,
        end: /$/
      }, {
        begin: /^\+\+\+/,
        end: /$/
      }, {
        begin: /\*{5}/,
        end: /\*{5}$/
      }]
    }, {
      className: 'addition',
      begin: '^\\+',
      end: '$'
    }, {
      className: 'deletion',
      begin: '^\\-',
      end: '$'
    }, {
      className: 'change',
      begin: '^\\!',
      end: '$'
    }]
  };
};


},{}],71:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var FILTER = {
    className: 'filter',
    begin: /\|[A-Za-z]+\:?/,
    keywords: 'truncatewords removetags linebreaksbr yesno get_digit timesince random striptags ' + 'filesizeformat escape linebreaks length_is ljust rjust cut urlize fix_ampersands ' + 'title floatformat capfirst pprint divisibleby add make_list unordered_list urlencode ' + 'timeuntil urlizetrunc wordcount stringformat linenumbers slice date dictsort ' + 'dictsortreversed default_if_none pluralize lower join center default ' + 'truncatewords_html upper length phone2numeric wordwrap time addslashes slugify first ' + 'escapejs force_escape iriencode last safe safeseq truncatechars localize unlocalize ' + 'localtime utc timezone',
    contains: [{
      className: 'argument',
      begin: /"/,
      end: /"/
    }, {
      className: 'argument',
      begin: /'/,
      end: /'/
    }]
  };
  return {
    aliases: ['jinja'],
    case_insensitive: true,
    subLanguage: 'xml',
    subLanguageMode: 'continuous',
    contains: [{
      className: 'template_comment',
      begin: /\{%\s*comment\s*%}/,
      end: /\{%\s*endcomment\s*%}/
    }, {
      className: 'template_comment',
      begin: /\{#/,
      end: /#}/
    }, {
      className: 'template_tag',
      begin: /\{%/,
      end: /%}/,
      keywords: 'comment endcomment load templatetag ifchanged endifchanged if endif firstof for ' + 'endfor in ifnotequal endifnotequal widthratio extends include spaceless ' + 'endspaceless regroup by as ifequal endifequal ssi now with cycle url filter ' + 'endfilter debug block endblock else autoescape endautoescape csrf_token empty elif ' + 'endwith static trans blocktrans endblocktrans get_static_prefix get_media_prefix ' + 'plural get_current_language language get_available_languages ' + 'get_current_language_bidi get_language_info get_language_info_list localize ' + 'endlocalize localtime endlocaltime timezone endtimezone get_current_timezone ' + 'verbatim',
      contains: [FILTER]
    }, {
      className: 'variable',
      begin: /\{\{/,
      end: /}}/,
      contains: [FILTER]
    }]
  };
};


},{}],72:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var COMMENT = {
    className: 'comment',
    begin: /@?rem\b/,
    end: /$/,
    relevance: 10
  };
  var LABEL = {
    className: 'label',
    begin: '^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)',
    relevance: 0
  };
  return {
    aliases: ['bat', 'cmd'],
    case_insensitive: true,
    keywords: {
      flow: 'if else goto for in do call exit not exist errorlevel defined',
      operator: 'equ neq lss leq gtr geq',
      keyword: 'shift cd dir echo setlocal endlocal set pause copy',
      stream: 'prn nul lpt3 lpt2 lpt1 con com4 com3 com2 com1 aux',
      winutils: 'ping net ipconfig taskkill xcopy ren del',
      built_in: 'append assoc at attrib break cacls cd chcp chdir chkdsk chkntfs cls cmd color ' + 'comp compact convert date dir diskcomp diskcopy doskey erase fs ' + 'find findstr format ftype graftabl help keyb label md mkdir mode more move path ' + 'pause print popd pushd promt rd recover rem rename replace restore rmdir shift' + 'sort start subst time title tree type ver verify vol'
    },
    contains: [{
      className: 'envvar',
      begin: /%%[^ ]|%[^ ]+?%|![^ ]+?!/
    }, {
      className: 'function',
      begin: LABEL.begin,
      end: 'goto:eof',
      contains: [hljs.inherit(hljs.TITLE_MODE, {begin: '([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*'}), COMMENT]
    }, {
      className: 'number',
      begin: '\\b\\d+',
      relevance: 0
    }, COMMENT]
  };
};


},{}],73:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var EXPRESSION_KEYWORDS = 'if eq ne lt lte gt gte select default math sep';
  return {
    aliases: ['dst'],
    case_insensitive: true,
    subLanguage: 'xml',
    subLanguageMode: 'continuous',
    contains: [{
      className: 'expression',
      begin: '{',
      end: '}',
      relevance: 0,
      contains: [{
        className: 'begin-block',
        begin: '\#[a-zA-Z\-\ \.]+',
        keywords: EXPRESSION_KEYWORDS
      }, {
        className: 'string',
        begin: '"',
        end: '"'
      }, {
        className: 'end-block',
        begin: '\\\/[a-zA-Z\-\ \.]+',
        keywords: EXPRESSION_KEYWORDS
      }, {
        className: 'variable',
        begin: '[a-zA-Z\-\.]+',
        keywords: EXPRESSION_KEYWORDS,
        relevance: 0
      }]
    }]
  };
};


},{}],74:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var ELIXIR_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_]*(\\!|\\?)?';
  var ELIXIR_METHOD_RE = '[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?';
  var ELIXIR_KEYWORDS = 'and false then defined module in return redo retry end for true self when ' + 'next until do begin unless nil break not case cond alias while ensure or ' + 'include use alias fn quote';
  var SUBST = {
    className: 'subst',
    begin: '#\\{',
    end: '}',
    lexemes: ELIXIR_IDENT_RE,
    keywords: ELIXIR_KEYWORDS
  };
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
    variants: [{
      begin: /'/,
      end: /'/
    }, {
      begin: /"/,
      end: /"/
    }]
  };
  var PARAMS = {
    endsWithParent: true,
    returnEnd: true,
    lexemes: ELIXIR_IDENT_RE,
    keywords: ELIXIR_KEYWORDS,
    relevance: 0
  };
  var FUNCTION = {
    className: 'function',
    beginKeywords: 'def defmacro',
    end: /\bdo\b/,
    contains: [hljs.inherit(hljs.TITLE_MODE, {
      begin: ELIXIR_METHOD_RE,
      starts: PARAMS
    })]
  };
  var CLASS = hljs.inherit(FUNCTION, {
    className: 'class',
    beginKeywords: 'defmodule defrecord',
    end: /\bdo\b|$|;/
  });
  var ELIXIR_DEFAULT_CONTAINS = [STRING, hljs.HASH_COMMENT_MODE, CLASS, FUNCTION, {
    className: 'constant',
    begin: '(\\b[A-Z_]\\w*(.)?)+',
    relevance: 0
  }, {
    className: 'symbol',
    begin: ':',
    contains: [STRING, {begin: ELIXIR_METHOD_RE}],
    relevance: 0
  }, {
    className: 'symbol',
    begin: ELIXIR_IDENT_RE + ':',
    relevance: 0
  }, {
    className: 'number',
    begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
    relevance: 0
  }, {
    className: 'variable',
    begin: '(\\$\\W)|((\\$|\\@\\@?)(\\w+))'
  }, {begin: '->'}, {
    begin: '(' + hljs.RE_STARTERS_RE + ')\\s*',
    contains: [hljs.HASH_COMMENT_MODE, {
      className: 'regexp',
      illegal: '\\n',
      contains: [hljs.BACKSLASH_ESCAPE, SUBST],
      variants: [{
        begin: '/',
        end: '/[a-z]*'
      }, {
        begin: '%r\\[',
        end: '\\][a-z]*'
      }]
    }],
    relevance: 0
  }];
  SUBST.contains = ELIXIR_DEFAULT_CONTAINS;
  PARAMS.contains = ELIXIR_DEFAULT_CONTAINS;
  return {
    lexemes: ELIXIR_IDENT_RE,
    keywords: ELIXIR_KEYWORDS,
    contains: ELIXIR_DEFAULT_CONTAINS
  };
};


},{}],75:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    keywords: {
      special_functions: 'spawn spawn_link self',
      reserved: 'after and andalso|10 band begin bnot bor bsl bsr bxor case catch cond div end fun if ' + 'let not of or orelse|10 query receive rem try when xor'
    },
    contains: [{
      className: 'prompt',
      begin: '^[0-9]+> ',
      relevance: 10
    }, {
      className: 'comment',
      begin: '%',
      end: '$'
    }, {
      className: 'number',
      begin: '\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)',
      relevance: 0
    }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, {
      className: 'constant',
      begin: '\\?(::)?([A-Z]\\w*(::)?)+'
    }, {
      className: 'arrow',
      begin: '->'
    }, {
      className: 'ok',
      begin: 'ok'
    }, {
      className: 'exclamation_mark',
      begin: '!'
    }, {
      className: 'function_or_atom',
      begin: '(\\b[a-z\'][a-zA-Z0-9_\']*:[a-z\'][a-zA-Z0-9_\']*)|(\\b[a-z\'][a-zA-Z0-9_\']*)',
      relevance: 0
    }, {
      className: 'variable',
      begin: '[A-Z][a-zA-Z0-9_\']*',
      relevance: 0
    }]
  };
};


},{}],76:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var BASIC_ATOM_RE = '[a-z\'][a-zA-Z0-9_\']*';
  var FUNCTION_NAME_RE = '(' + BASIC_ATOM_RE + ':' + BASIC_ATOM_RE + '|' + BASIC_ATOM_RE + ')';
  var ERLANG_RESERVED = {
    keyword: 'after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun if ' + 'let not of orelse|10 query receive rem try when xor',
    literal: 'false true'
  };
  var COMMENT = {
    className: 'comment',
    begin: '%',
    end: '$'
  };
  var NUMBER = {
    className: 'number',
    begin: '\\b(\\d+#[a-fA-F0-9]+|\\d+(\\.\\d+)?([eE][-+]?\\d+)?)',
    relevance: 0
  };
  var NAMED_FUN = {begin: 'fun\\s+' + BASIC_ATOM_RE + '/\\d+'};
  var FUNCTION_CALL = {
    begin: FUNCTION_NAME_RE + '\\(',
    end: '\\)',
    returnBegin: true,
    relevance: 0,
    contains: [{
      className: 'function_name',
      begin: FUNCTION_NAME_RE,
      relevance: 0
    }, {
      begin: '\\(',
      end: '\\)',
      endsWithParent: true,
      returnEnd: true,
      relevance: 0
    }]
  };
  var TUPLE = {
    className: 'tuple',
    begin: '{',
    end: '}',
    relevance: 0
  };
  var VAR1 = {
    className: 'variable',
    begin: '\\b_([A-Z][A-Za-z0-9_]*)?',
    relevance: 0
  };
  var VAR2 = {
    className: 'variable',
    begin: '[A-Z][a-zA-Z0-9_]*',
    relevance: 0
  };
  var RECORD_ACCESS = {
    begin: '#' + hljs.UNDERSCORE_IDENT_RE,
    relevance: 0,
    returnBegin: true,
    contains: [{
      className: 'record_name',
      begin: '#' + hljs.UNDERSCORE_IDENT_RE,
      relevance: 0
    }, {
      begin: '{',
      end: '}',
      relevance: 0
    }]
  };
  var BLOCK_STATEMENTS = {
    beginKeywords: 'fun receive if try case',
    end: 'end',
    keywords: ERLANG_RESERVED
  };
  BLOCK_STATEMENTS.contains = [COMMENT, NAMED_FUN, hljs.inherit(hljs.APOS_STRING_MODE, {className: ''}), BLOCK_STATEMENTS, FUNCTION_CALL, hljs.QUOTE_STRING_MODE, NUMBER, TUPLE, VAR1, VAR2, RECORD_ACCESS];
  var BASIC_MODES = [COMMENT, NAMED_FUN, BLOCK_STATEMENTS, FUNCTION_CALL, hljs.QUOTE_STRING_MODE, NUMBER, TUPLE, VAR1, VAR2, RECORD_ACCESS];
  FUNCTION_CALL.contains[1].contains = BASIC_MODES;
  TUPLE.contains = BASIC_MODES;
  RECORD_ACCESS.contains[1].contains = BASIC_MODES;
  var PARAMS = {
    className: 'params',
    begin: '\\(',
    end: '\\)',
    contains: BASIC_MODES
  };
  return {
    aliases: ['erl'],
    keywords: ERLANG_RESERVED,
    illegal: '(</|\\*=|\\+=|-=|/\\*|\\*/|\\(\\*|\\*\\))',
    contains: [{
      className: 'function',
      begin: '^' + BASIC_ATOM_RE + '\\s*\\(',
      end: '->',
      returnBegin: true,
      illegal: '\\(|#|//|/\\*|\\\\|:|;',
      contains: [PARAMS, hljs.inherit(hljs.TITLE_MODE, {begin: BASIC_ATOM_RE})],
      starts: {
        end: ';|\\.',
        keywords: ERLANG_RESERVED,
        contains: BASIC_MODES
      }
    }, COMMENT, {
      className: 'pp',
      begin: '^-',
      end: '\\.',
      relevance: 0,
      excludeEnd: true,
      returnBegin: true,
      lexemes: '-' + hljs.IDENT_RE,
      keywords: '-module -record -undef -export -ifdef -ifndef -author -copyright -doc -vsn ' + '-import -include -include_lib -compile -define -else -endif -file -behaviour ' + '-behavior -spec',
      contains: [PARAMS]
    }, NUMBER, hljs.QUOTE_STRING_MODE, RECORD_ACCESS, VAR1, VAR2, TUPLE, {begin: /\.$/}]
  };
};


},{}],77:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    contains: [{
      begin: /[^\u2401\u0001]+/,
      end: /[\u2401\u0001]/,
      excludeEnd: true,
      returnBegin: true,
      returnEnd: false,
      contains: [{
        begin: /([^\u2401\u0001=]+)/,
        end: /=([^\u2401\u0001=]+)/,
        returnEnd: true,
        returnBegin: false,
        className: 'attribute'
      }, {
        begin: /=/,
        end: /([\u2401\u0001])/,
        excludeEnd: true,
        excludeBegin: true,
        className: 'string'
      }]
    }],
    case_insensitive: true
  };
};


},{}],78:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var TYPEPARAM = {
    begin: '<',
    end: '>',
    contains: [hljs.inherit(hljs.TITLE_MODE, {begin: /'[a-zA-Z0-9_]+/})]
  };
  return {
    aliases: ['fs'],
    keywords: 'yield! return! let! do!' + 'abstract and as assert base begin class default delegate do done ' + 'downcast downto elif else end exception extern false finally for ' + 'fun function global if in inherit inline interface internal lazy let ' + 'match member module mutable namespace new null of open or ' + 'override private public rec return sig static struct then to ' + 'true try type upcast use val void when while with yield',
    contains: [{
      className: 'string',
      begin: '@"',
      end: '"',
      contains: [{begin: '""'}]
    }, {
      className: 'string',
      begin: '"""',
      end: '"""'
    }, {
      className: 'comment',
      begin: '\\(\\*',
      end: '\\*\\)'
    }, {
      className: 'class',
      beginKeywords: 'type',
      end: '\\(|=|$',
      excludeEnd: true,
      contains: [hljs.UNDERSCORE_TITLE_MODE, TYPEPARAM]
    }, {
      className: 'annotation',
      begin: '\\[<',
      end: '>\\]',
      relevance: 10
    }, {
      className: 'attribute',
      begin: '\\B(\'[A-Za-z])\\b',
      contains: [hljs.BACKSLASH_ESCAPE]
    }, hljs.C_LINE_COMMENT_MODE, hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}), hljs.C_NUMBER_MODE]
  };
};


},{}],79:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var GCODE_IDENT_RE = '[A-Z_][A-Z0-9_.]*';
  var GCODE_CLOSE_RE = '\\%';
  var GCODE_KEYWORDS = {
    literal: '',
    built_in: '',
    keyword: 'IF DO WHILE ENDWHILE CALL ENDIF SUB ENDSUB GOTO REPEAT ENDREPEAT ' + 'EQ LT GT NE GE LE OR XOR'
  };
  var GCODE_START = {
    className: 'preprocessor',
    begin: '([O])([0-9]+)'
  };
  var GCODE_CODE = [hljs.C_LINE_COMMENT_MODE, {
    className: 'comment',
    begin: /\(/,
    end: /\)/,
    contains: [hljs.PHRASAL_WORDS_MODE]
  }, hljs.C_BLOCK_COMMENT_MODE, hljs.inherit(hljs.C_NUMBER_MODE, {begin: '([-+]?([0-9]*\\.?[0-9]+\\.?))|' + hljs.C_NUMBER_RE}), hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}), hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}), {
    className: 'keyword',
    begin: '([G])([0-9]+\\.?[0-9]?)'
  }, {
    className: 'title',
    begin: '([M])([0-9]+\\.?[0-9]?)'
  }, {
    className: 'title',
    begin: '(VC|VS|#)',
    end: '(\\d+)'
  }, {
    className: 'title',
    begin: '(VZOFX|VZOFY|VZOFZ)'
  }, {
    className: 'built_in',
    begin: '(ATAN|ABS|ACOS|ASIN|SIN|COS|EXP|FIX|FUP|ROUND|LN|TAN)(\\[)',
    end: '([-+]?([0-9]*\\.?[0-9]+\\.?))(\\])'
  }, {
    className: 'label',
    variants: [{
      begin: 'N',
      end: '\\d+',
      illegal: '\\W'
    }]
  }];
  return {
    aliases: ['nc'],
    case_insensitive: true,
    lexemes: GCODE_IDENT_RE,
    keywords: GCODE_KEYWORDS,
    contains: [{
      className: 'preprocessor',
      begin: GCODE_CLOSE_RE
    }, GCODE_START].concat(GCODE_CODE)
  };
};


},{}],80:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    aliases: ['feature'],
    keywords: 'Feature Background Ability Business\ Need Scenario Scenarios Scenario\ Outline Scenario\ Template Examples Given And Then But When',
    contains: [{
      className: 'keyword',
      begin: '\\*'
    }, {
      className: 'comment',
      begin: '@[^@\r\n\t ]+',
      end: '$'
    }, {
      className: 'string',
      begin: '\\|',
      end: '\\$'
    }, {
      className: 'variable',
      begin: '<',
      end: '>'
    }, hljs.HASH_COMMENT_MODE, {
      className: 'string',
      begin: '"""',
      end: '"""'
    }, hljs.QUOTE_STRING_MODE]
  };
};


},{}],81:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    keywords: {
      keyword: 'atomic_uint attribute bool break bvec2 bvec3 bvec4 case centroid coherent const continue default ' + 'discard dmat2 dmat2x2 dmat2x3 dmat2x4 dmat3 dmat3x2 dmat3x3 dmat3x4 dmat4 dmat4x2 dmat4x3 ' + 'dmat4x4 do double dvec2 dvec3 dvec4 else flat float for highp if iimage1D iimage1DArray ' + 'iimage2D iimage2DArray iimage2DMS iimage2DMSArray iimage2DRect iimage3D iimageBuffer iimageCube ' + 'iimageCubeArray image1D image1DArray image2D image2DArray image2DMS image2DMSArray image2DRect ' + 'image3D imageBuffer imageCube imageCubeArray in inout int invariant isampler1D isampler1DArray ' + 'isampler2D isampler2DArray isampler2DMS isampler2DMSArray isampler2DRect isampler3D isamplerBuffer ' + 'isamplerCube isamplerCubeArray ivec2 ivec3 ivec4 layout lowp mat2 mat2x2 mat2x3 mat2x4 mat3 mat3x2 ' + 'mat3x3 mat3x4 mat4 mat4x2 mat4x3 mat4x4 mediump noperspective out patch precision readonly restrict ' + 'return sample sampler1D sampler1DArray sampler1DArrayShadow sampler1DShadow sampler2D sampler2DArray ' + 'sampler2DArrayShadow sampler2DMS sampler2DMSArray sampler2DRect sampler2DRectShadow sampler2DShadow ' + 'sampler3D samplerBuffer samplerCube samplerCubeArray samplerCubeArrayShadow samplerCubeShadow smooth ' + 'struct subroutine switch uimage1D uimage1DArray uimage2D uimage2DArray uimage2DMS uimage2DMSArray ' + 'uimage2DRect uimage3D uimageBuffer uimageCube uimageCubeArray uint uniform usampler1D usampler1DArray ' + 'usampler2D usampler2DArray usampler2DMS usampler2DMSArray usampler2DRect usampler3D usamplerBuffer ' + 'usamplerCube usamplerCubeArray uvec2 uvec3 uvec4 varying vec2 vec3 vec4 void volatile while writeonly',
      built_in: 'gl_BackColor gl_BackLightModelProduct gl_BackLightProduct gl_BackMaterial ' + 'gl_BackSecondaryColor gl_ClipDistance gl_ClipPlane gl_ClipVertex gl_Color ' + 'gl_DepthRange gl_EyePlaneQ gl_EyePlaneR gl_EyePlaneS gl_EyePlaneT gl_Fog gl_FogCoord ' + 'gl_FogFragCoord gl_FragColor gl_FragCoord gl_FragData gl_FragDepth gl_FrontColor ' + 'gl_FrontFacing gl_FrontLightModelProduct gl_FrontLightProduct gl_FrontMaterial ' + 'gl_FrontSecondaryColor gl_InstanceID gl_InvocationID gl_Layer gl_LightModel ' + 'gl_LightSource gl_MaxAtomicCounterBindings gl_MaxAtomicCounterBufferSize ' + 'gl_MaxClipDistances gl_MaxClipPlanes gl_MaxCombinedAtomicCounterBuffers ' + 'gl_MaxCombinedAtomicCounters gl_MaxCombinedImageUniforms gl_MaxCombinedImageUnitsAndFragmentOutputs ' + 'gl_MaxCombinedTextureImageUnits gl_MaxDrawBuffers gl_MaxFragmentAtomicCounterBuffers ' + 'gl_MaxFragmentAtomicCounters gl_MaxFragmentImageUniforms gl_MaxFragmentInputComponents ' + 'gl_MaxFragmentUniformComponents gl_MaxFragmentUniformVectors gl_MaxGeometryAtomicCounterBuffers ' + 'gl_MaxGeometryAtomicCounters gl_MaxGeometryImageUniforms gl_MaxGeometryInputComponents ' + 'gl_MaxGeometryOutputComponents gl_MaxGeometryOutputVertices gl_MaxGeometryTextureImageUnits ' + 'gl_MaxGeometryTotalOutputComponents gl_MaxGeometryUniformComponents gl_MaxGeometryVaryingComponents ' + 'gl_MaxImageSamples gl_MaxImageUnits gl_MaxLights gl_MaxPatchVertices gl_MaxProgramTexelOffset ' + 'gl_MaxTessControlAtomicCounterBuffers gl_MaxTessControlAtomicCounters gl_MaxTessControlImageUniforms ' + 'gl_MaxTessControlInputComponents gl_MaxTessControlOutputComponents gl_MaxTessControlTextureImageUnits ' + 'gl_MaxTessControlTotalOutputComponents gl_MaxTessControlUniformComponents ' + 'gl_MaxTessEvaluationAtomicCounterBuffers gl_MaxTessEvaluationAtomicCounters ' + 'gl_MaxTessEvaluationImageUniforms gl_MaxTessEvaluationInputComponents gl_MaxTessEvaluationOutputComponents ' + 'gl_MaxTessEvaluationTextureImageUnits gl_MaxTessEvaluationUniformComponents ' + 'gl_MaxTessGenLevel gl_MaxTessPatchComponents gl_MaxTextureCoords gl_MaxTextureImageUnits ' + 'gl_MaxTextureUnits gl_MaxVaryingComponents gl_MaxVaryingFloats gl_MaxVaryingVectors ' + 'gl_MaxVertexAtomicCounterBuffers gl_MaxVertexAtomicCounters gl_MaxVertexAttribs ' + 'gl_MaxVertexImageUniforms gl_MaxVertexOutputComponents gl_MaxVertexTextureImageUnits ' + 'gl_MaxVertexUniformComponents gl_MaxVertexUniformVectors gl_MaxViewports gl_MinProgramTexelOffset' + 'gl_ModelViewMatrix gl_ModelViewMatrixInverse gl_ModelViewMatrixInverseTranspose ' + 'gl_ModelViewMatrixTranspose gl_ModelViewProjectionMatrix gl_ModelViewProjectionMatrixInverse ' + 'gl_ModelViewProjectionMatrixInverseTranspose gl_ModelViewProjectionMatrixTranspose ' + 'gl_MultiTexCoord0 gl_MultiTexCoord1 gl_MultiTexCoord2 gl_MultiTexCoord3 gl_MultiTexCoord4 ' + 'gl_MultiTexCoord5 gl_MultiTexCoord6 gl_MultiTexCoord7 gl_Normal gl_NormalMatrix ' + 'gl_NormalScale gl_ObjectPlaneQ gl_ObjectPlaneR gl_ObjectPlaneS gl_ObjectPlaneT gl_PatchVerticesIn ' + 'gl_PerVertex gl_Point gl_PointCoord gl_PointSize gl_Position gl_PrimitiveID gl_PrimitiveIDIn ' + 'gl_ProjectionMatrix gl_ProjectionMatrixInverse gl_ProjectionMatrixInverseTranspose ' + 'gl_ProjectionMatrixTranspose gl_SampleID gl_SampleMask gl_SampleMaskIn gl_SamplePosition ' + 'gl_SecondaryColor gl_TessCoord gl_TessLevelInner gl_TessLevelOuter gl_TexCoord gl_TextureEnvColor ' + 'gl_TextureMatrixInverseTranspose gl_TextureMatrixTranspose gl_Vertex gl_VertexID ' + 'gl_ViewportIndex gl_in gl_out EmitStreamVertex EmitVertex EndPrimitive EndStreamPrimitive ' + 'abs acos acosh all any asin asinh atan atanh atomicCounter atomicCounterDecrement ' + 'atomicCounterIncrement barrier bitCount bitfieldExtract bitfieldInsert bitfieldReverse ' + 'ceil clamp cos cosh cross dFdx dFdy degrees determinant distance dot equal exp exp2 faceforward ' + 'findLSB findMSB floatBitsToInt floatBitsToUint floor fma fract frexp ftransform fwidth greaterThan ' + 'greaterThanEqual imageAtomicAdd imageAtomicAnd imageAtomicCompSwap imageAtomicExchange ' + 'imageAtomicMax imageAtomicMin imageAtomicOr imageAtomicXor imageLoad imageStore imulExtended ' + 'intBitsToFloat interpolateAtCentroid interpolateAtOffset interpolateAtSample inverse inversesqrt ' + 'isinf isnan ldexp length lessThan lessThanEqual log log2 matrixCompMult max memoryBarrier ' + 'min mix mod modf noise1 noise2 noise3 noise4 normalize not notEqual outerProduct packDouble2x32 ' + 'packHalf2x16 packSnorm2x16 packSnorm4x8 packUnorm2x16 packUnorm4x8 pow radians reflect refract ' + 'round roundEven shadow1D shadow1DLod shadow1DProj shadow1DProjLod shadow2D shadow2DLod shadow2DProj ' + 'shadow2DProjLod sign sin sinh smoothstep sqrt step tan tanh texelFetch texelFetchOffset texture ' + 'texture1D texture1DLod texture1DProj texture1DProjLod texture2D texture2DLod texture2DProj ' + 'texture2DProjLod texture3D texture3DLod texture3DProj texture3DProjLod textureCube textureCubeLod ' + 'textureGather textureGatherOffset textureGatherOffsets textureGrad textureGradOffset textureLod ' + 'textureLodOffset textureOffset textureProj textureProjGrad textureProjGradOffset textureProjLod ' + 'textureProjLodOffset textureProjOffset textureQueryLod textureSize transpose trunc uaddCarry ' + 'uintBitsToFloat umulExtended unpackDouble2x32 unpackHalf2x16 unpackSnorm2x16 unpackSnorm4x8 ' + 'unpackUnorm2x16 unpackUnorm4x8 usubBorrow gl_TextureMatrix gl_TextureMatrixInverse',
      literal: 'true false'
    },
    illegal: '"',
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.C_NUMBER_MODE, {
      className: 'preprocessor',
      begin: '#',
      end: '$'
    }]
  };
};


},{}],82:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var GO_KEYWORDS = {
    keyword: 'break default func interface select case map struct chan else goto package switch ' + 'const fallthrough if range type continue for import return var go defer',
    constant: 'true false iota nil',
    typename: 'bool byte complex64 complex128 float32 float64 int8 int16 int32 int64 string uint8 ' + 'uint16 uint32 uint64 int uint uintptr rune',
    built_in: 'append cap close complex copy imag len make new panic print println real recover delete'
  };
  return {
    aliases: ["golang"],
    keywords: GO_KEYWORDS,
    illegal: '</',
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.QUOTE_STRING_MODE, {
      className: 'string',
      begin: '\'',
      end: '[^\\\\]\''
    }, {
      className: 'string',
      begin: '`',
      end: '`'
    }, {
      className: 'number',
      begin: '[^a-zA-Z_0-9](\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?',
      relevance: 0
    }, hljs.C_NUMBER_MODE]
  };
};


},{}],83:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    case_insensitive: true,
    keywords: {keyword: 'task project allprojects subprojects artifacts buildscript configurations ' + 'dependencies repositories sourceSets description delete from into include ' + 'exclude source classpath destinationDir includes options sourceCompatibility ' + 'targetCompatibility group flatDir doLast doFirst flatten todir fromdir ant ' + 'def abstract break case catch continue default do else extends final finally ' + 'for if implements instanceof native new private protected public return static ' + 'switch synchronized throw throws transient try volatile while strictfp package ' + 'import false null super this true antlrtask checkstyle codenarc copy boolean ' + 'byte char class double float int interface long short void compile runTime ' + 'file fileTree abs any append asList asWritable call collect compareTo count ' + 'div dump each eachByte eachFile eachLine every find findAll flatten getAt ' + 'getErr getIn getOut getText grep immutable inject inspect intersect invokeMethods ' + 'isCase join leftShift minus multiply newInputStream newOutputStream newPrintWriter ' + 'newReader newWriter next plus pop power previous print println push putAt read ' + 'readBytes readLines reverse reverseEach round size sort splitEachLine step subMap ' + 'times toInteger toList tokenize upto waitForOrKill withPrintWriter withReader ' + 'withStream withWriter withWriterAppend write writeLine'},
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.NUMBER_MODE, hljs.REGEXP_MODE]
  };
};


},{}],84:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    keywords: {
      typename: 'byte short char int long boolean float double void',
      literal: 'true false null',
      keyword: 'def as in assert trait ' + 'super this abstract static volatile transient public private protected synchronized final ' + 'class interface enum if else for while switch case break default continue ' + 'throw throws try catch finally implements extends new import package return instanceof'
    },
    contains: [hljs.C_LINE_COMMENT_MODE, {
      className: 'javadoc',
      begin: '/\\*\\*',
      end: '\\*//*',
      contains: [{
        className: 'javadoctag',
        begin: '@[A-Za-z]+'
      }]
    }, hljs.C_BLOCK_COMMENT_MODE, {
      className: 'string',
      begin: '"""',
      end: '"""'
    }, {
      className: 'string',
      begin: "'''",
      end: "'''"
    }, {
      className: 'string',
      begin: "\\$/",
      end: "/\\$",
      relevance: 10
    }, hljs.APOS_STRING_MODE, {
      className: 'regexp',
      begin: /~?\/[^\/\n]+\//,
      contains: [hljs.BACKSLASH_ESCAPE]
    }, hljs.QUOTE_STRING_MODE, {
      className: 'shebang',
      begin: "^#!/usr/bin/env",
      end: '$',
      illegal: '\n'
    }, hljs.BINARY_NUMBER_MODE, {
      className: 'class',
      beginKeywords: 'class interface trait enum',
      end: '{',
      illegal: ':',
      contains: [{beginKeywords: 'extends implements'}, hljs.UNDERSCORE_TITLE_MODE]
    }, hljs.C_NUMBER_MODE, {
      className: 'annotation',
      begin: '@[A-Za-z]+'
    }, {
      className: 'string',
      begin: /[^\?]{0}[A-Za-z0-9_$]+ *:/
    }, {
      begin: /\?/,
      end: /\:/
    }, {
      className: 'label',
      begin: '^\\s*[A-Za-z0-9_$]+:'
    }]
  };
};


},{}],85:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    case_insensitive: true,
    contains: [{
      className: 'doctype',
      begin: '^!!!( (5|1\\.1|Strict|Frameset|Basic|Mobile|RDFa|XML\\b.*))?$',
      relevance: 10
    }, {
      className: 'comment',
      begin: '^\\s*(!=#|=#|-#|/).*$',
      relevance: 0
    }, {
      begin: '^\\s*(-|=|!=)(?!#)',
      starts: {
        end: '\\n',
        subLanguage: 'ruby'
      }
    }, {
      className: 'tag',
      begin: '^\\s*%',
      contains: [{
        className: 'title',
        begin: '\\w+'
      }, {
        className: 'value',
        begin: '[#\\.]\\w+'
      }, {
        begin: '{\\s*',
        end: '\\s*}',
        excludeEnd: true,
        contains: [{
          begin: ':\\w+\\s*=>',
          end: ',\\s+',
          returnBegin: true,
          endsWithParent: true,
          contains: [{
            className: 'symbol',
            begin: ':\\w+'
          }, {
            className: 'string',
            begin: '"',
            end: '"'
          }, {
            className: 'string',
            begin: '\'',
            end: '\''
          }, {
            begin: '\\w+',
            relevance: 0
          }]
        }]
      }, {
        begin: '\\(\\s*',
        end: '\\s*\\)',
        excludeEnd: true,
        contains: [{
          begin: '\\w+\\s*=',
          end: '\\s+',
          returnBegin: true,
          endsWithParent: true,
          contains: [{
            className: 'attribute',
            begin: '\\w+',
            relevance: 0
          }, {
            className: 'string',
            begin: '"',
            end: '"'
          }, {
            className: 'string',
            begin: '\'',
            end: '\''
          }, {
            begin: '\\w+',
            relevance: 0
          }]
        }]
      }]
    }, {
      className: 'bullet',
      begin: '^\\s*[=~]\\s*',
      relevance: 0
    }, {
      begin: '#{',
      starts: {
        end: '}',
        subLanguage: 'ruby'
      }
    }]
  };
};


},{}],86:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var EXPRESSION_KEYWORDS = 'each in with if else unless bindattr action collection debugger log outlet template unbound view yield';
  return {
    aliases: ['hbs', 'html.hbs', 'html.handlebars'],
    case_insensitive: true,
    subLanguage: 'xml',
    subLanguageMode: 'continuous',
    contains: [{
      className: 'expression',
      begin: '{{',
      end: '}}',
      contains: [{
        className: 'begin-block',
        begin: '\#[a-zA-Z\-\ \.]+',
        keywords: EXPRESSION_KEYWORDS
      }, {
        className: 'string',
        begin: '"',
        end: '"'
      }, {
        className: 'end-block',
        begin: '\\\/[a-zA-Z\-\ \.]+',
        keywords: EXPRESSION_KEYWORDS
      }, {
        className: 'variable',
        begin: '[a-zA-Z\-\.]+',
        keywords: EXPRESSION_KEYWORDS
      }]
    }]
  };
};


},{}],87:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var COMMENT = {
    className: 'comment',
    variants: [{
      begin: '--',
      end: '$'
    }, {
      begin: '{-',
      end: '-}',
      contains: ['self']
    }]
  };
  var PRAGMA = {
    className: 'pragma',
    begin: '{-#',
    end: '#-}'
  };
  var PREPROCESSOR = {
    className: 'preprocessor',
    begin: '^#',
    end: '$'
  };
  var CONSTRUCTOR = {
    className: 'type',
    begin: '\\b[A-Z][\\w\']*',
    relevance: 0
  };
  var LIST = {
    className: 'container',
    begin: '\\(',
    end: '\\)',
    illegal: '"',
    contains: [PRAGMA, COMMENT, PREPROCESSOR, {
      className: 'type',
      begin: '\\b[A-Z][\\w]*(\\((\\.\\.|,|\\w+)\\))?'
    }, hljs.inherit(hljs.TITLE_MODE, {begin: '[_a-z][\\w\']*'})]
  };
  var RECORD = {
    className: 'container',
    begin: '{',
    end: '}',
    contains: LIST.contains
  };
  return {
    aliases: ['hs'],
    keywords: 'let in if then else case of where do module import hiding ' + 'qualified type data newtype deriving class instance as default ' + 'infix infixl infixr foreign export ccall stdcall cplusplus ' + 'jvm dotnet safe unsafe family forall mdo proc rec',
    contains: [{
      className: 'module',
      begin: '\\bmodule\\b',
      end: 'where',
      keywords: 'module where',
      contains: [LIST, COMMENT],
      illegal: '\\W\\.|;'
    }, {
      className: 'import',
      begin: '\\bimport\\b',
      end: '$',
      keywords: 'import|0 qualified as hiding',
      contains: [LIST, COMMENT],
      illegal: '\\W\\.|;'
    }, {
      className: 'class',
      begin: '^(\\s*)?(class|instance)\\b',
      end: 'where',
      keywords: 'class family instance where',
      contains: [CONSTRUCTOR, LIST, COMMENT]
    }, {
      className: 'typedef',
      begin: '\\b(data|(new)?type)\\b',
      end: '$',
      keywords: 'data family type newtype deriving',
      contains: [PRAGMA, COMMENT, CONSTRUCTOR, LIST, RECORD]
    }, {
      className: 'default',
      beginKeywords: 'default',
      end: '$',
      contains: [CONSTRUCTOR, LIST, COMMENT]
    }, {
      className: 'infix',
      beginKeywords: 'infix infixl infixr',
      end: '$',
      contains: [hljs.C_NUMBER_MODE, COMMENT]
    }, {
      className: 'foreign',
      begin: '\\bforeign\\b',
      end: '$',
      keywords: 'foreign import export ccall stdcall cplusplus jvm ' + 'dotnet safe unsafe',
      contains: [CONSTRUCTOR, hljs.QUOTE_STRING_MODE, COMMENT]
    }, {
      className: 'shebang',
      begin: '#!\\/usr\\/bin\\/env\ runhaskell',
      end: '$'
    }, PRAGMA, COMMENT, PREPROCESSOR, hljs.QUOTE_STRING_MODE, hljs.C_NUMBER_MODE, CONSTRUCTOR, hljs.inherit(hljs.TITLE_MODE, {begin: '^[_a-z][\\w\']*'}), {begin: '->|<-'}]
  };
};


},{}],88:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var IDENT_RE = '[a-zA-Z_$][a-zA-Z0-9_$]*';
  var IDENT_FUNC_RETURN_TYPE_RE = '([*]|[a-zA-Z_$][a-zA-Z0-9_$]*)';
  return {
    aliases: ['hx'],
    keywords: {
      keyword: 'break callback case cast catch class continue default do dynamic else enum extends extern ' + 'for function here if implements import in inline interface never new override package private ' + 'public return static super switch this throw trace try typedef untyped using var while',
      literal: 'true false null'
    },
    contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.C_NUMBER_MODE, {
      className: 'class',
      beginKeywords: 'class interface',
      end: '{',
      excludeEnd: true,
      contains: [{beginKeywords: 'extends implements'}, hljs.TITLE_MODE]
    }, {
      className: 'preprocessor',
      begin: '#',
      end: '$',
      keywords: 'if else elseif end error'
    }, {
      className: 'function',
      beginKeywords: 'function',
      end: '[{;]',
      excludeEnd: true,
      illegal: '\\S',
      contains: [hljs.TITLE_MODE, {
        className: 'params',
        begin: '\\(',
        end: '\\)',
        contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE]
      }, {
        className: 'type',
        begin: ':',
        end: IDENT_FUNC_RETURN_TYPE_RE,
        relevance: 10
      }]
    }]
  };
};


},{}],89:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    illegal: '\\S',
    contains: [{
      className: 'status',
      begin: '^HTTP/[0-9\\.]+',
      end: '$',
      contains: [{
        className: 'number',
        begin: '\\b\\d{3}\\b'
      }]
    }, {
      className: 'request',
      begin: '^[A-Z]+ (.*?) HTTP/[0-9\\.]+$',
      returnBegin: true,
      end: '$',
      contains: [{
        className: 'string',
        begin: ' ',
        end: ' ',
        excludeBegin: true,
        excludeEnd: true
      }]
    }, {
      className: 'attribute',
      begin: '^\\w',
      end: ': ',
      excludeEnd: true,
      illegal: '\\n|\\s|=',
      starts: {
        className: 'string',
        end: '$'
      }
    }, {
      begin: '\\n\\n',
      starts: {
        subLanguage: '',
        endsWithParent: true
      }
    }]
  };
};


},{}],90:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    case_insensitive: true,
    illegal: /\S/,
    contains: [{
      className: 'comment',
      begin: ';',
      end: '$'
    }, {
      className: 'title',
      begin: '^\\[',
      end: '\\]'
    }, {
      className: 'setting',
      begin: '^[a-z0-9\\[\\]_-]+[ \\t]*=[ \\t]*',
      end: '$',
      contains: [{
        className: 'value',
        endsWithParent: true,
        keywords: 'on off true false yes no',
        contains: [hljs.QUOTE_STRING_MODE, hljs.NUMBER_MODE],
        relevance: 0
      }]
    }]
  };
};


},{}],91:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var GENERIC_IDENT_RE = hljs.UNDERSCORE_IDENT_RE + '(<' + hljs.UNDERSCORE_IDENT_RE + '>)?';
  var KEYWORDS = 'false synchronized int abstract float private char boolean static null if const ' + 'for true while long throw strictfp finally protected import native final return void ' + 'enum else break transient new catch instanceof byte super volatile case assert short ' + 'package default double public try this switch continue throws protected public private';
  return {
    aliases: ['jsp'],
    keywords: KEYWORDS,
    illegal: /<\//,
    contains: [{
      className: 'javadoc',
      begin: '/\\*\\*',
      end: '\\*/',
      relevance: 0,
      contains: [{
        className: 'javadoctag',
        begin: '(^|\\s)@[A-Za-z]+'
      }]
    }, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, {
      className: 'class',
      beginKeywords: 'class interface',
      end: /[{;=]/,
      excludeEnd: true,
      keywords: 'class interface',
      illegal: /[:"\[\]]/,
      contains: [{beginKeywords: 'extends implements'}, hljs.UNDERSCORE_TITLE_MODE]
    }, {
      beginKeywords: 'new',
      end: /\s/,
      relevance: 0
    }, {
      className: 'function',
      begin: '(' + GENERIC_IDENT_RE + '\\s+)+' + hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
      returnBegin: true,
      end: /[{;=]/,
      excludeEnd: true,
      keywords: KEYWORDS,
      contains: [{
        begin: hljs.UNDERSCORE_IDENT_RE + '\\s*\\(',
        returnBegin: true,
        contains: [hljs.UNDERSCORE_TITLE_MODE]
      }, {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        keywords: KEYWORDS,
        contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.C_NUMBER_MODE, hljs.C_BLOCK_COMMENT_MODE]
      }, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE]
    }, hljs.C_NUMBER_MODE, {
      className: 'annotation',
      begin: '@[A-Za-z]+'
    }]
  };
};


},{}],92:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    aliases: ['js'],
    keywords: {
      keyword: 'in if for while finally var new function do return void else break catch ' + 'instanceof with throw case default try this switch continue typeof delete ' + 'let yield const class',
      literal: 'true false null undefined NaN Infinity',
      built_in: 'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' + 'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' + 'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' + 'TypeError URIError Number Math Date String RegExp Array Float32Array ' + 'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' + 'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' + 'module console window document'
    },
    contains: [{
      className: 'pi',
      begin: /^\s*('|")use strict('|")/,
      relevance: 10
    }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.C_NUMBER_MODE, {
      begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
      keywords: 'return throw case',
      contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.REGEXP_MODE, {
        begin: /</,
        end: />;/,
        relevance: 0,
        subLanguage: 'xml'
      }],
      relevance: 0
    }, {
      className: 'function',
      beginKeywords: 'function',
      end: /\{/,
      excludeEnd: true,
      contains: [hljs.inherit(hljs.TITLE_MODE, {begin: /[A-Za-z$_][0-9A-Za-z$_]*/}), {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE],
        illegal: /["'\(]/
      }],
      illegal: /\[|%/
    }, {begin: /\$[(.]/}, {
      begin: '\\.' + hljs.IDENT_RE,
      relevance: 0
    }]
  };
};


},{}],93:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var LITERALS = {literal: 'true false null'};
  var TYPES = [hljs.QUOTE_STRING_MODE, hljs.C_NUMBER_MODE];
  var VALUE_CONTAINER = {
    className: 'value',
    end: ',',
    endsWithParent: true,
    excludeEnd: true,
    contains: TYPES,
    keywords: LITERALS
  };
  var OBJECT = {
    begin: '{',
    end: '}',
    contains: [{
      className: 'attribute',
      begin: '\\s*"',
      end: '"\\s*:\\s*',
      excludeBegin: true,
      excludeEnd: true,
      contains: [hljs.BACKSLASH_ESCAPE],
      illegal: '\\n',
      starts: VALUE_CONTAINER
    }],
    illegal: '\\S'
  };
  var ARRAY = {
    begin: '\\[',
    end: '\\]',
    contains: [hljs.inherit(VALUE_CONTAINER, {className: null})],
    illegal: '\\S'
  };
  TYPES.splice(TYPES.length, 0, OBJECT, ARRAY);
  return {
    contains: TYPES,
    keywords: LITERALS,
    illegal: '\\S'
  };
};


},{}],94:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var LASSO_IDENT_RE = '[a-zA-Z_][a-zA-Z0-9_.]*';
  var LASSO_ANGLE_RE = '<\\?(lasso(script)?|=)';
  var LASSO_CLOSE_RE = '\\]|\\?>';
  var LASSO_KEYWORDS = {
    literal: 'true false none minimal full all void and or not ' + 'bw nbw ew new cn ncn lt lte gt gte eq neq rx nrx ft',
    built_in: 'array date decimal duration integer map pair string tag xml null ' + 'bytes list queue set stack staticarray tie local var variable ' + 'global data self inherited',
    keyword: 'error_code error_msg error_pop error_push error_reset cache ' + 'database_names database_schemanames database_tablenames define_tag ' + 'define_type email_batch encode_set html_comment handle handle_error ' + 'header if inline iterate ljax_target link link_currentaction ' + 'link_currentgroup link_currentrecord link_detail link_firstgroup ' + 'link_firstrecord link_lastgroup link_lastrecord link_nextgroup ' + 'link_nextrecord link_prevgroup link_prevrecord log loop ' + 'namespace_using output_none portal private protect records referer ' + 'referrer repeating resultset rows search_args search_arguments ' + 'select sort_args sort_arguments thread_atomic value_list while ' + 'abort case else if_empty if_false if_null if_true loop_abort ' + 'loop_continue loop_count params params_up return return_value ' + 'run_children soap_definetag soap_lastrequest soap_lastresponse ' + 'tag_name ascending average by define descending do equals ' + 'frozen group handle_failure import in into join let match max ' + 'min on order parent protected provide public require returnhome ' + 'skip split_thread sum take thread to trait type where with ' + 'yield yieldhome'
  };
  var HTML_COMMENT = {
    className: 'comment',
    begin: '<!--',
    end: '-->',
    relevance: 0
  };
  var LASSO_NOPROCESS = {
    className: 'preprocessor',
    begin: '\\[noprocess\\]',
    starts: {
      className: 'markup',
      end: '\\[/noprocess\\]',
      returnEnd: true,
      contains: [HTML_COMMENT]
    }
  };
  var LASSO_START = {
    className: 'preprocessor',
    begin: '\\[/noprocess|' + LASSO_ANGLE_RE
  };
  var LASSO_DATAMEMBER = {
    className: 'variable',
    begin: '\'' + LASSO_IDENT_RE + '\''
  };
  var LASSO_CODE = [hljs.C_LINE_COMMENT_MODE, {
    className: 'javadoc',
    begin: '/\\*\\*!',
    end: '\\*/',
    contains: [hljs.PHRASAL_WORDS_MODE]
  }, hljs.C_BLOCK_COMMENT_MODE, hljs.inherit(hljs.C_NUMBER_MODE, {begin: hljs.C_NUMBER_RE + '|-?(infinity|nan)\\b'}), hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}), hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}), {
    className: 'string',
    begin: '`',
    end: '`'
  }, {
    className: 'variable',
    variants: [{begin: '[#$]' + LASSO_IDENT_RE}, {
      begin: '#',
      end: '\\d+',
      illegal: '\\W'
    }]
  }, {
    className: 'tag',
    begin: '::\\s*',
    end: LASSO_IDENT_RE,
    illegal: '\\W'
  }, {
    className: 'attribute',
    variants: [{
      begin: '-' + hljs.UNDERSCORE_IDENT_RE,
      relevance: 0
    }, {begin: '(\\.\\.\\.)'}]
  }, {
    className: 'subst',
    variants: [{
      begin: '->\\s*',
      contains: [LASSO_DATAMEMBER]
    }, {
      begin: ':=|/(?!\\w)=?|[-+*%=<>&|!?\\\\]+',
      relevance: 0
    }]
  }, {
    className: 'built_in',
    begin: '\\.\\.?',
    relevance: 0,
    contains: [LASSO_DATAMEMBER]
  }, {
    className: 'class',
    beginKeywords: 'define',
    returnEnd: true,
    end: '\\(|=>',
    contains: [hljs.inherit(hljs.TITLE_MODE, {begin: hljs.UNDERSCORE_IDENT_RE + '(=(?!>))?'})]
  }];
  return {
    aliases: ['ls', 'lassoscript'],
    case_insensitive: true,
    lexemes: LASSO_IDENT_RE + '|&[lg]t;',
    keywords: LASSO_KEYWORDS,
    contains: [{
      className: 'preprocessor',
      begin: LASSO_CLOSE_RE,
      relevance: 0,
      starts: {
        className: 'markup',
        end: '\\[|' + LASSO_ANGLE_RE,
        returnEnd: true,
        relevance: 0,
        contains: [HTML_COMMENT]
      }
    }, LASSO_NOPROCESS, LASSO_START, {
      className: 'preprocessor',
      begin: '\\[no_square_brackets',
      starts: {
        end: '\\[/no_square_brackets\\]',
        lexemes: LASSO_IDENT_RE + '|&[lg]t;',
        keywords: LASSO_KEYWORDS,
        contains: [{
          className: 'preprocessor',
          begin: LASSO_CLOSE_RE,
          relevance: 0,
          starts: {
            className: 'markup',
            end: LASSO_ANGLE_RE,
            returnEnd: true,
            contains: [HTML_COMMENT]
          }
        }, LASSO_NOPROCESS, LASSO_START].concat(LASSO_CODE)
      }
    }, {
      className: 'preprocessor',
      begin: '\\[',
      relevance: 0
    }, {
      className: 'shebang',
      begin: '^#!.+lasso9\\b',
      relevance: 10
    }].concat(LASSO_CODE)
  };
};


},{}],95:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var LISP_IDENT_RE = '[a-zA-Z_\\-\\+\\*\\/\\<\\=\\>\\&\\#][a-zA-Z0-9_\\-\\+\\*\\/\\<\\=\\>\\&\\#!]*';
  var LISP_SIMPLE_NUMBER_RE = '(\\-|\\+)?\\d+(\\.\\d+|\\/\\d+)?((d|e|f|l|s)(\\+|\\-)?\\d+)?';
  var SHEBANG = {
    className: 'shebang',
    begin: '^#!',
    end: '$'
  };
  var LITERAL = {
    className: 'literal',
    begin: '\\b(t{1}|nil)\\b'
  };
  var NUMBER = {
    className: 'number',
    variants: [{
      begin: LISP_SIMPLE_NUMBER_RE,
      relevance: 0
    }, {begin: '#b[0-1]+(/[0-1]+)?'}, {begin: '#o[0-7]+(/[0-7]+)?'}, {begin: '#x[0-9a-f]+(/[0-9a-f]+)?'}, {
      begin: '#c\\(' + LISP_SIMPLE_NUMBER_RE + ' +' + LISP_SIMPLE_NUMBER_RE,
      end: '\\)'
    }]
  };
  var STRING = hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null});
  var COMMENT = {
    className: 'comment',
    begin: ';',
    end: '$',
    relevance: 0
  };
  var VARIABLE = {
    className: 'variable',
    begin: '\\*',
    end: '\\*'
  };
  var KEYWORD = {
    className: 'keyword',
    begin: '[:&]' + LISP_IDENT_RE
  };
  var QUOTED_LIST = {
    begin: '\\(',
    end: '\\)',
    contains: ['self', LITERAL, STRING, NUMBER]
  };
  var QUOTED = {
    className: 'quoted',
    contains: [NUMBER, STRING, VARIABLE, KEYWORD, QUOTED_LIST],
    variants: [{
      begin: '[\'`]\\(',
      end: '\\)'
    }, {
      begin: '\\(quote ',
      end: '\\)',
      keywords: 'quote'
    }]
  };
  var QUOTED_ATOM = {
    className: 'quoted',
    begin: '\'' + LISP_IDENT_RE
  };
  var LIST = {
    className: 'list',
    begin: '\\(',
    end: '\\)'
  };
  var BODY = {
    endsWithParent: true,
    relevance: 0
  };
  LIST.contains = [{
    className: 'keyword',
    begin: LISP_IDENT_RE
  }, BODY];
  BODY.contains = [QUOTED, QUOTED_ATOM, LIST, LITERAL, NUMBER, STRING, COMMENT, VARIABLE, KEYWORD];
  return {
    illegal: /\S/,
    contains: [NUMBER, SHEBANG, LITERAL, STRING, COMMENT, QUOTED, QUOTED_ATOM, LIST]
  };
};


},{}],96:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var VARIABLE = {
    className: 'variable',
    begin: '\\b[gtps][A-Z]+[A-Za-z0-9_\\-]*\\b|\\$_[A-Z]+',
    relevance: 0
  };
  var COMMENT = {
    className: 'comment',
    end: '$',
    variants: [hljs.C_BLOCK_COMMENT_MODE, hljs.HASH_COMMENT_MODE, {begin: '--'}, {begin: '[^:]//'}]
  };
  var TITLE1 = hljs.inherit(hljs.TITLE_MODE, {variants: [{begin: '\\b_*rig[A-Z]+[A-Za-z0-9_\\-]*'}, {begin: '\\b_[a-z0-9\\-]+'}]});
  var TITLE2 = hljs.inherit(hljs.TITLE_MODE, {begin: '\\b([A-Za-z0-9_\\-]+)\\b'});
  return {
    case_insensitive: false,
    keywords: {
      keyword: 'after byte bytes english the until http forever descending using line real8 with seventh ' + 'for stdout finally element word fourth before black ninth sixth characters chars stderr ' + 'uInt1 uInt1s uInt2 uInt2s stdin string lines relative rel any fifth items from middle mid ' + 'at else of catch then third it file milliseconds seconds second secs sec int1 int1s int4 ' + 'int4s internet int2 int2s normal text item last long detailed effective uInt4 uInt4s repeat ' + 'end repeat URL in try into switch to words https token binfile each tenth as ticks tick ' + 'system real4 by dateItems without char character ascending eighth whole dateTime numeric short ' + 'first ftp integer abbreviated abbr abbrev private case while if',
      constant: 'SIX TEN FORMFEED NINE ZERO NONE SPACE FOUR FALSE COLON CRLF PI COMMA ENDOFFILE EOF EIGHT FIVE ' + 'QUOTE EMPTY ONE TRUE RETURN CR LINEFEED RIGHT BACKSLASH NULL SEVEN TAB THREE TWO ' + 'six ten formfeed nine zero none space four false colon crlf pi comma endoffile eof eight five ' + 'quote empty one true return cr linefeed right backslash null seven tab three two ' + 'RIVERSION RISTATE FILE_READ_MODE FILE_WRITE_MODE FILE_WRITE_MODE DIR_WRITE_MODE FILE_READ_UMASK ' + 'FILE_WRITE_UMASK DIR_READ_UMASK DIR_WRITE_UMASK',
      operator: 'div mod wrap and or bitAnd bitNot bitOr bitXor among not in a an within ' + 'contains ends with begins the keys of keys',
      built_in: 'put abs acos aliasReference annuity arrayDecode arrayEncode asin atan atan2 average avg base64Decode ' + 'base64Encode baseConvert binaryDecode binaryEncode byteToNum cachedURL cachedURLs charToNum ' + 'cipherNames commandNames compound compress constantNames cos date dateFormat decompress directories ' + 'diskSpace DNSServers exp exp1 exp2 exp10 extents files flushEvents folders format functionNames global ' + 'globals hasMemory hostAddress hostAddressToName hostName hostNameToAddress isNumber ISOToMac itemOffset ' + 'keys len length libURLErrorData libUrlFormData libURLftpCommand libURLLastHTTPHeaders libURLLastRHHeaders ' + 'libUrlMultipartFormAddPart libUrlMultipartFormData libURLVersion lineOffset ln ln1 localNames log log2 log10 ' + 'longFilePath lower macToISO matchChunk matchText matrixMultiply max md5Digest median merge millisec ' + 'millisecs millisecond milliseconds min monthNames num number numToByte numToChar offset open openfiles ' + 'openProcesses openProcessIDs openSockets paramCount param params peerAddress pendingMessages platform ' + 'processID random randomBytes replaceText result revCreateXMLTree revCreateXMLTreeFromFile revCurrentRecord ' + 'revCurrentRecordIsFirst revCurrentRecordIsLast revDatabaseColumnCount revDatabaseColumnIsNull ' + 'revDatabaseColumnLengths revDatabaseColumnNames revDatabaseColumnNamed revDatabaseColumnNumbered ' + 'revDatabaseColumnTypes revDatabaseConnectResult revDatabaseCursors revDatabaseID revDatabaseTableNames ' + 'revDatabaseType revDataFromQuery revdb_closeCursor revdb_columnbynumber revdb_columncount revdb_columnisnull ' + 'revdb_columnlengths revdb_columnnames revdb_columntypes revdb_commit revdb_connect revdb_connections ' + 'revdb_connectionerr revdb_currentrecord revdb_cursorconnection revdb_cursorerr revdb_cursors revdb_dbtype ' + 'revdb_disconnect revdb_execute revdb_iseof revdb_isbof revdb_movefirst revdb_movelast revdb_movenext ' + 'revdb_moveprev revdb_query revdb_querylist revdb_recordcount revdb_rollback revdb_tablenames ' + 'revGetDatabaseDriverPath revNumberOfRecords revOpenDatabase revOpenDatabases revQueryDatabase ' + 'revQueryDatabaseBlob revQueryResult revQueryIsAtStart revQueryIsAtEnd revUnixFromMacPath ' + 'revXMLAttribute revXMLAttributes revXMLAttributeValues revXMLChildContents revXMLChildNames ' + 'revXMLFirstChild revXMLMatchingNode revXMLNextSibling revXMLNodeContents revXMLNumberOfChildren ' + 'revXMLParent revXMLPreviousSibling revXMLRootNode revXMLRPC_CreateRequest revXMLRPC_Documents ' + 'revXMLRPC_Error revXMLRPC_Execute revXMLRPC_GetHost revXMLRPC_GetMethod revXMLRPC_GetParam revXMLText ' + 'revXMLRPC_GetParamCount revXMLRPC_GetParamNode revXMLRPC_GetParamType revXMLRPC_GetPath revXMLRPC_GetPort ' + 'revXMLRPC_GetProtocol revXMLRPC_GetRequest revXMLRPC_GetResponse revXMLRPC_GetSocket revXMLTree ' + 'revXMLTrees revXMLValidateDTD revZipDescribeItem revZipEnumerateItems revZipOpenArchives round ' + 'sec secs seconds sha1Digest shell shortFilePath sin specialFolderPath sqrt standardDeviation statRound ' + 'stdDev sum sysError systemVersion tan tempName tick ticks time to toLower toUpper transpose trunc ' + 'uniDecode uniEncode upper URLDecode URLEncode URLStatus value variableNames version waitDepth weekdayNames wordOffset ' + 'add breakpoint cancel clear local variable file word line folder directory URL close socket process ' + 'combine constant convert create new alias folder directory decrypt delete variable word line folder ' + 'directory URL dispatch divide do encrypt filter get include intersect kill libURLDownloadToFile ' + 'libURLFollowHttpRedirects libURLftpUpload libURLftpUploadFile libURLresetAll libUrlSetAuthCallback ' + 'libURLSetCustomHTTPHeaders libUrlSetExpect100 libURLSetFTPListCommand libURLSetFTPMode libURLSetFTPStopTime ' + 'libURLSetStatusCallback load multiply socket process post seek rel relative read from process rename ' + 'replace require resetAll revAddXMLNode revAppendXML revCloseCursor revCloseDatabase revCommitDatabase ' + 'revCopyFile revCopyFolder revCopyXMLNode revDeleteFolder revDeleteXMLNode revDeleteAllXMLTrees ' + 'revDeleteXMLTree revExecuteSQL revGoURL revInsertXMLNode revMoveFolder revMoveToFirstRecord revMoveToLastRecord ' + 'revMoveToNextRecord revMoveToPreviousRecord revMoveToRecord revMoveXMLNode revPutIntoXMLNode revRollBackDatabase ' + 'revSetDatabaseDriverPath revSetXMLAttribute revXMLRPC_AddParam revXMLRPC_DeleteAllDocuments revXMLAddDTD ' + 'revXMLRPC_Free revXMLRPC_FreeAll revXMLRPC_DeleteDocument revXMLRPC_DeleteParam revXMLRPC_SetHost ' + 'revXMLRPC_SetMethod revXMLRPC_SetPort revXMLRPC_SetProtocol revXMLRPC_SetSocket revZipAddItemWithData ' + 'revZipAddItemWithFile revZipAddUncompressedItemWithData revZipAddUncompressedItemWithFile revZipCancel ' + 'revZipCloseArchive revZipDeleteItem revZipExtractItemToFile revZipExtractItemToVariable revZipSetProgressCallback ' + 'revZipRenameItem revZipReplaceItemWithData revZipReplaceItemWithFile revZipOpenArchive send set sort split ' + 'subtract union unload wait write'
    },
    contains: [VARIABLE, {
      className: 'keyword',
      begin: '\\bend\\sif\\b'
    }, {
      className: 'function',
      beginKeywords: 'function',
      end: '$',
      contains: [VARIABLE, TITLE2, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE, TITLE1]
    }, {
      className: 'function',
      beginKeywords: 'end',
      end: '$',
      contains: [TITLE2, TITLE1]
    }, {
      className: 'command',
      beginKeywords: 'command on',
      end: '$',
      contains: [VARIABLE, TITLE2, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE, TITLE1]
    }, {
      className: 'command',
      beginKeywords: 'end',
      end: '$',
      contains: [TITLE2, TITLE1]
    }, {
      className: 'preprocessor',
      begin: '<\\?rev|<\\?lc|<\\?livecode',
      relevance: 10
    }, {
      className: 'preprocessor',
      begin: '<\\?'
    }, {
      className: 'preprocessor',
      begin: '\\?>'
    }, COMMENT, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE, TITLE1],
    illegal: ';$|^\\[|^='
  };
};


},{}],97:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var OPENING_LONG_BRACKET = '\\[=*\\[';
  var CLOSING_LONG_BRACKET = '\\]=*\\]';
  var LONG_BRACKETS = {
    begin: OPENING_LONG_BRACKET,
    end: CLOSING_LONG_BRACKET,
    contains: ['self']
  };
  var COMMENTS = [{
    className: 'comment',
    begin: '--(?!' + OPENING_LONG_BRACKET + ')',
    end: '$'
  }, {
    className: 'comment',
    begin: '--' + OPENING_LONG_BRACKET,
    end: CLOSING_LONG_BRACKET,
    contains: [LONG_BRACKETS],
    relevance: 10
  }];
  return {
    lexemes: hljs.UNDERSCORE_IDENT_RE,
    keywords: {
      keyword: 'and break do else elseif end false for if in local nil not or repeat return then ' + 'true until while',
      built_in: '_G _VERSION assert collectgarbage dofile error getfenv getmetatable ipairs load ' + 'loadfile loadstring module next pairs pcall print rawequal rawget rawset require ' + 'select setfenv setmetatable tonumber tostring type unpack xpcall coroutine debug ' + 'io math os package string table'
    },
    contains: COMMENTS.concat([{
      className: 'function',
      beginKeywords: 'function',
      end: '\\)',
      contains: [hljs.inherit(hljs.TITLE_MODE, {begin: '([_a-zA-Z]\\w*\\.)*([_a-zA-Z]\\w*:)?[_a-zA-Z]\\w*'}), {
        className: 'params',
        begin: '\\(',
        endsWithParent: true,
        contains: COMMENTS
      }].concat(COMMENTS)
    }, hljs.C_NUMBER_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, {
      className: 'string',
      begin: OPENING_LONG_BRACKET,
      end: CLOSING_LONG_BRACKET,
      contains: [LONG_BRACKETS],
      relevance: 5
    }])
  };
};


},{}],98:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var VARIABLE = {
    className: 'variable',
    begin: /\$\(/,
    end: /\)/,
    contains: [hljs.BACKSLASH_ESCAPE]
  };
  return {
    aliases: ['mk', 'mak'],
    contains: [hljs.HASH_COMMENT_MODE, {
      begin: /^\w+\s*\W*=/,
      returnBegin: true,
      relevance: 0,
      starts: {
        className: 'constant',
        end: /\s*\W*=/,
        excludeEnd: true,
        starts: {
          end: /$/,
          relevance: 0,
          contains: [VARIABLE]
        }
      }
    }, {
      className: 'title',
      begin: /^[\w]+:\s*$/
    }, {
      className: 'phony',
      begin: /^\.PHONY:/,
      end: /$/,
      keywords: '.PHONY',
      lexemes: /[\.\w]+/
    }, {
      begin: /^\t+/,
      end: /$/,
      relevance: 0,
      contains: [hljs.QUOTE_STRING_MODE, VARIABLE]
    }]
  };
};


},{}],99:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    aliases: ['md', 'mkdown', 'mkd'],
    contains: [{
      className: 'header',
      variants: [{
        begin: '^#{1,6}',
        end: '$'
      }, {begin: '^.+?\\n[=-]{2,}$'}]
    }, {
      begin: '<',
      end: '>',
      subLanguage: 'xml',
      relevance: 0
    }, {
      className: 'bullet',
      begin: '^([*+-]|(\\d+\\.))\\s+'
    }, {
      className: 'strong',
      begin: '[*_]{2}.+?[*_]{2}'
    }, {
      className: 'emphasis',
      variants: [{begin: '\\*.+?\\*'}, {
        begin: '_.+?_',
        relevance: 0
      }]
    }, {
      className: 'blockquote',
      begin: '^>\\s+',
      end: '$'
    }, {
      className: 'code',
      variants: [{begin: '`.+?`'}, {
        begin: '^( {4}|\t)',
        end: '$',
        relevance: 0
      }]
    }, {
      className: 'horizontal_rule',
      begin: '^[-\\*]{3,}',
      end: '$'
    }, {
      begin: '\\[.+?\\][\\(\\[].*?[\\)\\]]',
      returnBegin: true,
      contains: [{
        className: 'link_label',
        begin: '\\[',
        end: '\\]',
        excludeBegin: true,
        returnEnd: true,
        relevance: 0
      }, {
        className: 'link_url',
        begin: '\\]\\(',
        end: '\\)',
        excludeBegin: true,
        excludeEnd: true
      }, {
        className: 'link_reference',
        begin: '\\]\\[',
        end: '\\]',
        excludeBegin: true,
        excludeEnd: true
      }],
      relevance: 10
    }, {
      begin: '^\\[\.+\\]:',
      returnBegin: true,
      contains: [{
        className: 'link_reference',
        begin: '\\[',
        end: '\\]:',
        excludeBegin: true,
        excludeEnd: true,
        starts: {
          className: 'link_url',
          end: '$'
        }
      }]
    }]
  };
};


},{}],100:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    aliases: ['mma'],
    lexemes: '(\\$|\\b)' + hljs.IDENT_RE + '\\b',
    keywords: 'AbelianGroup Abort AbortKernels AbortProtect Above Abs Absolute AbsoluteCorrelation AbsoluteCorrelationFunction AbsoluteCurrentValue AbsoluteDashing AbsoluteFileName AbsoluteOptions AbsolutePointSize AbsoluteThickness AbsoluteTime AbsoluteTiming AccountingForm Accumulate Accuracy AccuracyGoal ActionDelay ActionMenu ActionMenuBox ActionMenuBoxOptions Active ActiveItem ActiveStyle AcyclicGraphQ AddOnHelpPath AddTo AdjacencyGraph AdjacencyList AdjacencyMatrix AdjustmentBox AdjustmentBoxOptions AdjustTimeSeriesForecast AffineTransform After AiryAi AiryAiPrime AiryAiZero AiryBi AiryBiPrime AiryBiZero AlgebraicIntegerQ AlgebraicNumber AlgebraicNumberDenominator AlgebraicNumberNorm AlgebraicNumberPolynomial AlgebraicNumberTrace AlgebraicRules AlgebraicRulesData Algebraics AlgebraicUnitQ Alignment AlignmentMarker AlignmentPoint All AllowedDimensions AllowGroupClose AllowInlineCells AllowKernelInitialization AllowReverseGroupClose AllowScriptLevelChange AlphaChannel AlternatingGroup AlternativeHypothesis Alternatives AmbientLight Analytic AnchoredSearch And AndersonDarlingTest AngerJ AngleBracket AngularGauge Animate AnimationCycleOffset AnimationCycleRepetitions AnimationDirection AnimationDisplayTime AnimationRate AnimationRepetitions AnimationRunning Animator AnimatorBox AnimatorBoxOptions AnimatorElements Annotation Annuity AnnuityDue Antialiasing Antisymmetric Apart ApartSquareFree Appearance AppearanceElements AppellF1 Append AppendTo Apply ArcCos ArcCosh ArcCot ArcCoth ArcCsc ArcCsch ArcSec ArcSech ArcSin ArcSinDistribution ArcSinh ArcTan ArcTanh Arg ArgMax ArgMin ArgumentCountQ ARIMAProcess ArithmeticGeometricMean ARMAProcess ARProcess Array ArrayComponents ArrayDepth ArrayFlatten ArrayPad ArrayPlot ArrayQ ArrayReshape ArrayRules Arrays Arrow Arrow3DBox ArrowBox Arrowheads AspectRatio AspectRatioFixed Assert Assuming Assumptions AstronomicalData Asynchronous AsynchronousTaskObject AsynchronousTasks AtomQ Attributes AugmentedSymmetricPolynomial AutoAction AutoDelete AutoEvaluateEvents AutoGeneratedPackage AutoIndent AutoIndentSpacings AutoItalicWords AutoloadPath AutoMatch Automatic AutomaticImageSize AutoMultiplicationSymbol AutoNumberFormatting AutoOpenNotebooks AutoOpenPalettes AutorunSequencing AutoScaling AutoScroll AutoSpacing AutoStyleOptions AutoStyleWords Axes AxesEdge AxesLabel AxesOrigin AxesStyle Axis ' + 'BabyMonsterGroupB Back Background BackgroundTasksSettings Backslash Backsubstitution Backward Band BandpassFilter BandstopFilter BarabasiAlbertGraphDistribution BarChart BarChart3D BarLegend BarlowProschanImportance BarnesG BarOrigin BarSpacing BartlettHannWindow BartlettWindow BaseForm Baseline BaselinePosition BaseStyle BatesDistribution BattleLemarieWavelet Because BeckmannDistribution Beep Before Begin BeginDialogPacket BeginFrontEndInteractionPacket BeginPackage BellB BellY Below BenfordDistribution BeniniDistribution BenktanderGibratDistribution BenktanderWeibullDistribution BernoulliB BernoulliDistribution BernoulliGraphDistribution BernoulliProcess BernsteinBasis BesselFilterModel BesselI BesselJ BesselJZero BesselK BesselY BesselYZero Beta BetaBinomialDistribution BetaDistribution BetaNegativeBinomialDistribution BetaPrimeDistribution BetaRegularized BetweennessCentrality BezierCurve BezierCurve3DBox BezierCurve3DBoxOptions BezierCurveBox BezierCurveBoxOptions BezierFunction BilateralFilter Binarize BinaryFormat BinaryImageQ BinaryRead BinaryReadList BinaryWrite BinCounts BinLists Binomial BinomialDistribution BinomialProcess BinormalDistribution BiorthogonalSplineWavelet BipartiteGraphQ BirnbaumImportance BirnbaumSaundersDistribution BitAnd BitClear BitGet BitLength BitNot BitOr BitSet BitShiftLeft BitShiftRight BitXor Black BlackmanHarrisWindow BlackmanNuttallWindow BlackmanWindow Blank BlankForm BlankNullSequence BlankSequence Blend Block BlockRandom BlomqvistBeta BlomqvistBetaTest Blue Blur BodePlot BohmanWindow Bold Bookmarks Boole BooleanConsecutiveFunction BooleanConvert BooleanCountingFunction BooleanFunction BooleanGraph BooleanMaxterms BooleanMinimize BooleanMinterms Booleans BooleanTable BooleanVariables BorderDimensions BorelTannerDistribution Bottom BottomHatTransform BoundaryStyle Bounds Box BoxBaselineShift BoxData BoxDimensions Boxed Boxes BoxForm BoxFormFormatTypes BoxFrame BoxID BoxMargins BoxMatrix BoxRatios BoxRotation BoxRotationPoint BoxStyle BoxWhiskerChart Bra BracketingBar BraKet BrayCurtisDistance BreadthFirstScan Break Brown BrownForsytheTest BrownianBridgeProcess BrowserCategory BSplineBasis BSplineCurve BSplineCurve3DBox BSplineCurveBox BSplineCurveBoxOptions BSplineFunction BSplineSurface BSplineSurface3DBox BubbleChart BubbleChart3D BubbleScale BubbleSizes BulletGauge BusinessDayQ ButterflyGraph ButterworthFilterModel Button ButtonBar ButtonBox ButtonBoxOptions ButtonCell ButtonContents ButtonData ButtonEvaluator ButtonExpandable ButtonFrame ButtonFunction ButtonMargins ButtonMinHeight ButtonNote ButtonNotebook ButtonSource ButtonStyle ButtonStyleMenuListing Byte ByteCount ByteOrdering ' + 'C CachedValue CacheGraphics CalendarData CalendarType CallPacket CanberraDistance Cancel CancelButton CandlestickChart Cap CapForm CapitalDifferentialD CardinalBSplineBasis CarmichaelLambda Cases Cashflow Casoratian Catalan CatalanNumber Catch CauchyDistribution CauchyWindow CayleyGraph CDF CDFDeploy CDFInformation CDFWavelet Ceiling Cell CellAutoOverwrite CellBaseline CellBoundingBox CellBracketOptions CellChangeTimes CellContents CellContext CellDingbat CellDynamicExpression CellEditDuplicate CellElementsBoundingBox CellElementSpacings CellEpilog CellEvaluationDuplicate CellEvaluationFunction CellEventActions CellFrame CellFrameColor CellFrameLabelMargins CellFrameLabels CellFrameMargins CellGroup CellGroupData CellGrouping CellGroupingRules CellHorizontalScrolling CellID CellLabel CellLabelAutoDelete CellLabelMargins CellLabelPositioning CellMargins CellObject CellOpen CellPrint CellProlog Cells CellSize CellStyle CellTags CellularAutomaton CensoredDistribution Censoring Center CenterDot CentralMoment CentralMomentGeneratingFunction CForm ChampernowneNumber ChanVeseBinarize Character CharacterEncoding CharacterEncodingsPath CharacteristicFunction CharacteristicPolynomial CharacterRange Characters ChartBaseStyle ChartElementData ChartElementDataFunction ChartElementFunction ChartElements ChartLabels ChartLayout ChartLegends ChartStyle Chebyshev1FilterModel Chebyshev2FilterModel ChebyshevDistance ChebyshevT ChebyshevU Check CheckAbort CheckAll Checkbox CheckboxBar CheckboxBox CheckboxBoxOptions ChemicalData ChessboardDistance ChiDistribution ChineseRemainder ChiSquareDistribution ChoiceButtons ChoiceDialog CholeskyDecomposition Chop Circle CircleBox CircleDot CircleMinus CirclePlus CircleTimes CirculantGraph CityData Clear ClearAll ClearAttributes ClearSystemCache ClebschGordan ClickPane Clip ClipboardNotebook ClipFill ClippingStyle ClipPlanes ClipRange Clock ClockGauge ClockwiseContourIntegral Close Closed CloseKernels ClosenessCentrality Closing ClosingAutoSave ClosingEvent ClusteringComponents CMYKColor Coarse Coefficient CoefficientArrays CoefficientDomain CoefficientList CoefficientRules CoifletWavelet Collect Colon ColonForm ColorCombine ColorConvert ColorData ColorDataFunction ColorFunction ColorFunctionScaling Colorize ColorNegate ColorOutput ColorProfileData ColorQuantize ColorReplace ColorRules ColorSelectorSettings ColorSeparate ColorSetter ColorSetterBox ColorSetterBoxOptions ColorSlider ColorSpace Column ColumnAlignments ColumnBackgrounds ColumnForm ColumnLines ColumnsEqual ColumnSpacings ColumnWidths CommonDefaultFormatTypes Commonest CommonestFilter CommonUnits CommunityBoundaryStyle CommunityGraphPlot CommunityLabels CommunityRegionStyle CompatibleUnitQ CompilationOptions CompilationTarget Compile Compiled CompiledFunction Complement CompleteGraph CompleteGraphQ CompleteKaryTree CompletionsListPacket Complex Complexes ComplexExpand ComplexInfinity ComplexityFunction ComponentMeasurements ' + 'ComponentwiseContextMenu Compose ComposeList ComposeSeries Composition CompoundExpression CompoundPoissonDistribution CompoundPoissonProcess CompoundRenewalProcess Compress CompressedData Condition ConditionalExpression Conditioned Cone ConeBox ConfidenceLevel ConfidenceRange ConfidenceTransform ConfigurationPath Congruent Conjugate ConjugateTranspose Conjunction Connect ConnectedComponents ConnectedGraphQ ConnesWindow ConoverTest ConsoleMessage ConsoleMessagePacket ConsolePrint Constant ConstantArray Constants ConstrainedMax ConstrainedMin ContentPadding ContentsBoundingBox ContentSelectable ContentSize Context ContextMenu Contexts ContextToFilename ContextToFileName Continuation Continue ContinuedFraction ContinuedFractionK ContinuousAction ContinuousMarkovProcess ContinuousTimeModelQ ContinuousWaveletData ContinuousWaveletTransform ContourDetect ContourGraphics ContourIntegral ContourLabels ContourLines ContourPlot ContourPlot3D Contours ContourShading ContourSmoothing ContourStyle ContraharmonicMean Control ControlActive ControlAlignment ControllabilityGramian ControllabilityMatrix ControllableDecomposition ControllableModelQ ControllerDuration ControllerInformation ControllerInformationData ControllerLinking ControllerManipulate ControllerMethod ControllerPath ControllerState ControlPlacement ControlsRendering ControlType Convergents ConversionOptions ConversionRules ConvertToBitmapPacket ConvertToPostScript ConvertToPostScriptPacket Convolve ConwayGroupCo1 ConwayGroupCo2 ConwayGroupCo3 CoordinateChartData CoordinatesToolOptions CoordinateTransform CoordinateTransformData CoprimeQ Coproduct CopulaDistribution Copyable CopyDirectory CopyFile CopyTag CopyToClipboard CornerFilter CornerNeighbors Correlation CorrelationDistance CorrelationFunction CorrelationTest Cos Cosh CoshIntegral CosineDistance CosineWindow CosIntegral Cot Coth Count CounterAssignments CounterBox CounterBoxOptions CounterClockwiseContourIntegral CounterEvaluator CounterFunction CounterIncrements CounterStyle CounterStyleMenuListing CountRoots CountryData Covariance CovarianceEstimatorFunction CovarianceFunction CoxianDistribution CoxIngersollRossProcess CoxModel CoxModelFit CramerVonMisesTest CreateArchive CreateDialog CreateDirectory CreateDocument CreateIntermediateDirectories CreatePalette CreatePalettePacket CreateScheduledTask CreateTemporary CreateWindow CriticalityFailureImportance CriticalitySuccessImportance CriticalSection Cross CrossingDetect CrossMatrix Csc Csch CubeRoot Cubics Cuboid CuboidBox Cumulant CumulantGeneratingFunction Cup CupCap Curl CurlyDoubleQuote CurlyQuote CurrentImage CurrentlySpeakingPacket CurrentValue CurvatureFlowFilter CurveClosed Cyan CycleGraph CycleIndexPolynomial Cycles CyclicGroup Cyclotomic Cylinder CylinderBox CylindricalDecomposition ' + 'D DagumDistribution DamerauLevenshteinDistance DampingFactor Darker Dashed Dashing DataCompression DataDistribution DataRange DataReversed Date DateDelimiters DateDifference DateFunction DateList DateListLogPlot DateListPlot DatePattern DatePlus DateRange DateString DateTicksFormat DaubechiesWavelet DavisDistribution DawsonF DayCount DayCountConvention DayMatchQ DayName DayPlus DayRange DayRound DeBruijnGraph Debug DebugTag Decimal DeclareKnownSymbols DeclarePackage Decompose Decrement DedekindEta Default DefaultAxesStyle DefaultBaseStyle DefaultBoxStyle DefaultButton DefaultColor DefaultControlPlacement DefaultDuplicateCellStyle DefaultDuration DefaultElement DefaultFaceGridsStyle DefaultFieldHintStyle DefaultFont DefaultFontProperties DefaultFormatType DefaultFormatTypeForStyle DefaultFrameStyle DefaultFrameTicksStyle DefaultGridLinesStyle DefaultInlineFormatType DefaultInputFormatType DefaultLabelStyle DefaultMenuStyle DefaultNaturalLanguage DefaultNewCellStyle DefaultNewInlineCellStyle DefaultNotebook DefaultOptions DefaultOutputFormatType DefaultStyle DefaultStyleDefinitions DefaultTextFormatType DefaultTextInlineFormatType DefaultTicksStyle DefaultTooltipStyle DefaultValues Defer DefineExternal DefineInputStreamMethod DefineOutputStreamMethod Definition Degree DegreeCentrality DegreeGraphDistribution DegreeLexicographic DegreeReverseLexicographic Deinitialization Del Deletable Delete DeleteBorderComponents DeleteCases DeleteContents DeleteDirectory DeleteDuplicates DeleteFile DeleteSmallComponents DeleteWithContents DeletionWarning Delimiter DelimiterFlashTime DelimiterMatching Delimiters Denominator DensityGraphics DensityHistogram DensityPlot DependentVariables Deploy Deployed Depth DepthFirstScan Derivative DerivativeFilter DescriptorStateSpace DesignMatrix Det DGaussianWavelet DiacriticalPositioning Diagonal DiagonalMatrix Dialog DialogIndent DialogInput DialogLevel DialogNotebook DialogProlog DialogReturn DialogSymbols Diamond DiamondMatrix DiceDissimilarity DictionaryLookup DifferenceDelta DifferenceOrder DifferenceRoot DifferenceRootReduce Differences DifferentialD DifferentialRoot DifferentialRootReduce DifferentiatorFilter DigitBlock DigitBlockMinimum DigitCharacter DigitCount DigitQ DihedralGroup Dilation Dimensions DiracComb DiracDelta DirectedEdge DirectedEdges DirectedGraph DirectedGraphQ DirectedInfinity Direction Directive Directory DirectoryName DirectoryQ DirectoryStack DirichletCharacter DirichletConvolve DirichletDistribution DirichletL DirichletTransform DirichletWindow DisableConsolePrintPacket DiscreteChirpZTransform DiscreteConvolve DiscreteDelta DiscreteHadamardTransform DiscreteIndicator DiscreteLQEstimatorGains DiscreteLQRegulatorGains DiscreteLyapunovSolve DiscreteMarkovProcess DiscretePlot DiscretePlot3D DiscreteRatio DiscreteRiccatiSolve DiscreteShift DiscreteTimeModelQ DiscreteUniformDistribution DiscreteVariables DiscreteWaveletData DiscreteWaveletPacketTransform ' + 'DiscreteWaveletTransform Discriminant Disjunction Disk DiskBox DiskMatrix Dispatch DispersionEstimatorFunction Display DisplayAllSteps DisplayEndPacket DisplayFlushImagePacket DisplayForm DisplayFunction DisplayPacket DisplayRules DisplaySetSizePacket DisplayString DisplayTemporary DisplayWith DisplayWithRef DisplayWithVariable DistanceFunction DistanceTransform Distribute Distributed DistributedContexts DistributeDefinitions DistributionChart DistributionDomain DistributionFitTest DistributionParameterAssumptions DistributionParameterQ Dithering Div Divergence Divide DivideBy Dividers Divisible Divisors DivisorSigma DivisorSum DMSList DMSString Do DockedCells DocumentNotebook DominantColors DOSTextFormat Dot DotDashed DotEqual Dotted DoubleBracketingBar DoubleContourIntegral DoubleDownArrow DoubleLeftArrow DoubleLeftRightArrow DoubleLeftTee DoubleLongLeftArrow DoubleLongLeftRightArrow DoubleLongRightArrow DoubleRightArrow DoubleRightTee DoubleUpArrow DoubleUpDownArrow DoubleVerticalBar DoublyInfinite Down DownArrow DownArrowBar DownArrowUpArrow DownLeftRightVector DownLeftTeeVector DownLeftVector DownLeftVectorBar DownRightTeeVector DownRightVector DownRightVectorBar Downsample DownTee DownTeeArrow DownValues DragAndDrop DrawEdges DrawFrontFaces DrawHighlighted Drop DSolve Dt DualLinearProgramming DualSystemsModel DumpGet DumpSave DuplicateFreeQ Dynamic DynamicBox DynamicBoxOptions DynamicEvaluationTimeout DynamicLocation DynamicModule DynamicModuleBox DynamicModuleBoxOptions DynamicModuleParent DynamicModuleValues DynamicName DynamicNamespace DynamicReference DynamicSetting DynamicUpdating DynamicWrapper DynamicWrapperBox DynamicWrapperBoxOptions ' + 'E EccentricityCentrality EdgeAdd EdgeBetweennessCentrality EdgeCapacity EdgeCapForm EdgeColor EdgeConnectivity EdgeCost EdgeCount EdgeCoverQ EdgeDashing EdgeDelete EdgeDetect EdgeForm EdgeIndex EdgeJoinForm EdgeLabeling EdgeLabels EdgeLabelStyle EdgeList EdgeOpacity EdgeQ EdgeRenderingFunction EdgeRules EdgeShapeFunction EdgeStyle EdgeThickness EdgeWeight Editable EditButtonSettings EditCellTagsSettings EditDistance EffectiveInterest Eigensystem Eigenvalues EigenvectorCentrality Eigenvectors Element ElementData Eliminate EliminationOrder EllipticE EllipticExp EllipticExpPrime EllipticF EllipticFilterModel EllipticK EllipticLog EllipticNomeQ EllipticPi EllipticReducedHalfPeriods EllipticTheta EllipticThetaPrime EmitSound EmphasizeSyntaxErrors EmpiricalDistribution Empty EmptyGraphQ EnableConsolePrintPacket Enabled Encode End EndAdd EndDialogPacket EndFrontEndInteractionPacket EndOfFile EndOfLine EndOfString EndPackage EngineeringForm Enter EnterExpressionPacket EnterTextPacket Entropy EntropyFilter Environment Epilog Equal EqualColumns EqualRows EqualTilde EquatedTo Equilibrium EquirippleFilterKernel Equivalent Erf Erfc Erfi ErlangB ErlangC ErlangDistribution Erosion ErrorBox ErrorBoxOptions ErrorNorm ErrorPacket ErrorsDialogSettings EstimatedDistribution EstimatedProcess EstimatorGains EstimatorRegulator EuclideanDistance EulerE EulerGamma EulerianGraphQ EulerPhi Evaluatable Evaluate Evaluated EvaluatePacket EvaluationCell EvaluationCompletionAction EvaluationElements EvaluationMode EvaluationMonitor EvaluationNotebook EvaluationObject EvaluationOrder Evaluator EvaluatorNames EvenQ EventData EventEvaluator EventHandler EventHandlerTag EventLabels ExactBlackmanWindow ExactNumberQ ExactRootIsolation ExampleData Except ExcludedForms ExcludePods Exclusions ExclusionsStyle Exists Exit ExitDialog Exp Expand ExpandAll ExpandDenominator ExpandFileName ExpandNumerator Expectation ExpectationE ExpectedValue ExpGammaDistribution ExpIntegralE ExpIntegralEi Exponent ExponentFunction ExponentialDistribution ExponentialFamily ExponentialGeneratingFunction ExponentialMovingAverage ExponentialPowerDistribution ExponentPosition ExponentStep Export ExportAutoReplacements ExportPacket ExportString Expression ExpressionCell ExpressionPacket ExpToTrig ExtendedGCD Extension ExtentElementFunction ExtentMarkers ExtentSize ExternalCall ExternalDataCharacterEncoding Extract ExtractArchive ExtremeValueDistribution ' + 'FaceForm FaceGrids FaceGridsStyle Factor FactorComplete Factorial Factorial2 FactorialMoment FactorialMomentGeneratingFunction FactorialPower FactorInteger FactorList FactorSquareFree FactorSquareFreeList FactorTerms FactorTermsList Fail FailureDistribution False FARIMAProcess FEDisableConsolePrintPacket FeedbackSector FeedbackSectorStyle FeedbackType FEEnableConsolePrintPacket Fibonacci FieldHint FieldHintStyle FieldMasked FieldSize File FileBaseName FileByteCount FileDate FileExistsQ FileExtension FileFormat FileHash FileInformation FileName FileNameDepth FileNameDialogSettings FileNameDrop FileNameJoin FileNames FileNameSetter FileNameSplit FileNameTake FilePrint FileType FilledCurve FilledCurveBox Filling FillingStyle FillingTransform FilterRules FinancialBond FinancialData FinancialDerivative FinancialIndicator Find FindArgMax FindArgMin FindClique FindClusters FindCurvePath FindDistributionParameters FindDivisions FindEdgeCover FindEdgeCut FindEulerianCycle FindFaces FindFile FindFit FindGeneratingFunction FindGeoLocation FindGeometricTransform FindGraphCommunities FindGraphIsomorphism FindGraphPartition FindHamiltonianCycle FindIndependentEdgeSet FindIndependentVertexSet FindInstance FindIntegerNullVector FindKClan FindKClique FindKClub FindKPlex FindLibrary FindLinearRecurrence FindList FindMaximum FindMaximumFlow FindMaxValue FindMinimum FindMinimumCostFlow FindMinimumCut FindMinValue FindPermutation FindPostmanTour FindProcessParameters FindRoot FindSequenceFunction FindSettings FindShortestPath FindShortestTour FindThreshold FindVertexCover FindVertexCut Fine FinishDynamic FiniteAbelianGroupCount FiniteGroupCount FiniteGroupData First FirstPassageTimeDistribution FischerGroupFi22 FischerGroupFi23 FischerGroupFi24Prime FisherHypergeometricDistribution FisherRatioTest FisherZDistribution Fit FitAll FittedModel FixedPoint FixedPointList FlashSelection Flat Flatten FlattenAt FlatTopWindow FlipView Floor FlushPrintOutputPacket Fold FoldList Font FontColor FontFamily FontForm FontName FontOpacity FontPostScriptName FontProperties FontReencoding FontSize FontSlant FontSubstitutions FontTracking FontVariations FontWeight For ForAll Format FormatRules FormatType FormatTypeAutoConvert FormatValues FormBox FormBoxOptions FortranForm Forward ForwardBackward Fourier FourierCoefficient FourierCosCoefficient FourierCosSeries FourierCosTransform FourierDCT FourierDCTFilter FourierDCTMatrix FourierDST FourierDSTMatrix FourierMatrix FourierParameters FourierSequenceTransform FourierSeries FourierSinCoefficient FourierSinSeries FourierSinTransform FourierTransform FourierTrigSeries FractionalBrownianMotionProcess FractionalPart FractionBox FractionBoxOptions FractionLine Frame FrameBox FrameBoxOptions Framed FrameInset FrameLabel Frameless FrameMargins FrameStyle FrameTicks FrameTicksStyle FRatioDistribution FrechetDistribution FreeQ FrequencySamplingFilterKernel FresnelC FresnelS Friday FrobeniusNumber FrobeniusSolve ' + 'FromCharacterCode FromCoefficientRules FromContinuedFraction FromDate FromDigits FromDMS Front FrontEndDynamicExpression FrontEndEventActions FrontEndExecute FrontEndObject FrontEndResource FrontEndResourceString FrontEndStackSize FrontEndToken FrontEndTokenExecute FrontEndValueCache FrontEndVersion FrontFaceColor FrontFaceOpacity Full FullAxes FullDefinition FullForm FullGraphics FullOptions FullSimplify Function FunctionExpand FunctionInterpolation FunctionSpace FussellVeselyImportance ' + 'GaborFilter GaborMatrix GaborWavelet GainMargins GainPhaseMargins Gamma GammaDistribution GammaRegularized GapPenalty Gather GatherBy GaugeFaceElementFunction GaugeFaceStyle GaugeFrameElementFunction GaugeFrameSize GaugeFrameStyle GaugeLabels GaugeMarkers GaugeStyle GaussianFilter GaussianIntegers GaussianMatrix GaussianWindow GCD GegenbauerC General GeneralizedLinearModelFit GenerateConditions GeneratedCell GeneratedParameters GeneratingFunction Generic GenericCylindricalDecomposition GenomeData GenomeLookup GeodesicClosing GeodesicDilation GeodesicErosion GeodesicOpening GeoDestination GeodesyData GeoDirection GeoDistance GeoGridPosition GeometricBrownianMotionProcess GeometricDistribution GeometricMean GeometricMeanFilter GeometricTransformation GeometricTransformation3DBox GeometricTransformation3DBoxOptions GeometricTransformationBox GeometricTransformationBoxOptions GeoPosition GeoPositionENU GeoPositionXYZ GeoProjectionData GestureHandler GestureHandlerTag Get GetBoundingBoxSizePacket GetContext GetEnvironment GetFileName GetFrontEndOptionsDataPacket GetLinebreakInformationPacket GetMenusPacket GetPageBreakInformationPacket Glaisher GlobalClusteringCoefficient GlobalPreferences GlobalSession Glow GoldenRatio GompertzMakehamDistribution GoodmanKruskalGamma GoodmanKruskalGammaTest Goto Grad Gradient GradientFilter GradientOrientationFilter Graph GraphAssortativity GraphCenter GraphComplement GraphData GraphDensity GraphDiameter GraphDifference GraphDisjointUnion ' + 'GraphDistance GraphDistanceMatrix GraphElementData GraphEmbedding GraphHighlight GraphHighlightStyle GraphHub Graphics Graphics3D Graphics3DBox Graphics3DBoxOptions GraphicsArray GraphicsBaseline GraphicsBox GraphicsBoxOptions GraphicsColor GraphicsColumn GraphicsComplex GraphicsComplex3DBox GraphicsComplex3DBoxOptions GraphicsComplexBox GraphicsComplexBoxOptions GraphicsContents GraphicsData GraphicsGrid GraphicsGridBox GraphicsGroup GraphicsGroup3DBox GraphicsGroup3DBoxOptions GraphicsGroupBox GraphicsGroupBoxOptions GraphicsGrouping GraphicsHighlightColor GraphicsRow GraphicsSpacing GraphicsStyle GraphIntersection GraphLayout GraphLinkEfficiency GraphPeriphery GraphPlot GraphPlot3D GraphPower GraphPropertyDistribution GraphQ GraphRadius GraphReciprocity GraphRoot GraphStyle GraphUnion Gray GrayLevel GreatCircleDistance Greater GreaterEqual GreaterEqualLess GreaterFullEqual GreaterGreater GreaterLess GreaterSlantEqual GreaterTilde Green Grid GridBaseline GridBox GridBoxAlignment GridBoxBackground GridBoxDividers GridBoxFrame GridBoxItemSize GridBoxItemStyle GridBoxOptions GridBoxSpacings GridCreationSettings GridDefaultElement GridElementStyleOptions GridFrame GridFrameMargins GridGraph GridLines GridLinesStyle GroebnerBasis GroupActionBase GroupCentralizer GroupElementFromWord GroupElementPosition GroupElementQ GroupElements GroupElementToWord GroupGenerators GroupMultiplicationTable GroupOrbits GroupOrder GroupPageBreakWithin GroupSetwiseStabilizer GroupStabilizer GroupStabilizerChain Gudermannian GumbelDistribution ' + 'HaarWavelet HadamardMatrix HalfNormalDistribution HamiltonianGraphQ HammingDistance HammingWindow HankelH1 HankelH2 HankelMatrix HannPoissonWindow HannWindow HaradaNortonGroupHN HararyGraph HarmonicMean HarmonicMeanFilter HarmonicNumber Hash HashTable Haversine HazardFunction Head HeadCompose Heads HeavisideLambda HeavisidePi HeavisideTheta HeldGroupHe HeldPart HelpBrowserLookup HelpBrowserNotebook HelpBrowserSettings HermiteDecomposition HermiteH HermitianMatrixQ HessenbergDecomposition Hessian HexadecimalCharacter Hexahedron HexahedronBox HexahedronBoxOptions HiddenSurface HighlightGraph HighlightImage HighpassFilter HigmanSimsGroupHS HilbertFilter HilbertMatrix Histogram Histogram3D HistogramDistribution HistogramList HistogramTransform HistogramTransformInterpolation HitMissTransform HITSCentrality HodgeDual HoeffdingD HoeffdingDTest Hold HoldAll HoldAllComplete HoldComplete HoldFirst HoldForm HoldPattern HoldRest HolidayCalendar HomeDirectory HomePage Horizontal HorizontalForm HorizontalGauge HorizontalScrollPosition HornerForm HotellingTSquareDistribution HoytDistribution HTMLSave Hue HumpDownHump HumpEqual HurwitzLerchPhi HurwitzZeta HyperbolicDistribution HypercubeGraph HyperexponentialDistribution Hyperfactorial Hypergeometric0F1 Hypergeometric0F1Regularized Hypergeometric1F1 Hypergeometric1F1Regularized Hypergeometric2F1 Hypergeometric2F1Regularized HypergeometricDistribution HypergeometricPFQ HypergeometricPFQRegularized HypergeometricU Hyperlink HyperlinkCreationSettings Hyphenation HyphenationOptions HypoexponentialDistribution HypothesisTestData ' + 'I Identity IdentityMatrix If IgnoreCase Im Image Image3D Image3DSlices ImageAccumulate ImageAdd ImageAdjust ImageAlign ImageApply ImageAspectRatio ImageAssemble ImageCache ImageCacheValid ImageCapture ImageChannels ImageClip ImageColorSpace ImageCompose ImageConvolve ImageCooccurrence ImageCorners ImageCorrelate ImageCorrespondingPoints ImageCrop ImageData ImageDataPacket ImageDeconvolve ImageDemosaic ImageDifference ImageDimensions ImageDistance ImageEffect ImageFeatureTrack ImageFileApply ImageFileFilter ImageFileScan ImageFilter ImageForestingComponents ImageForwardTransformation ImageHistogram ImageKeypoints ImageLevels ImageLines ImageMargins ImageMarkers ImageMeasurements ImageMultiply ImageOffset ImagePad ImagePadding ImagePartition ImagePeriodogram ImagePerspectiveTransformation ImageQ ImageRangeCache ImageReflect ImageRegion ImageResize ImageResolution ImageRotate ImageRotated ImageScaled ImageScan ImageSize ImageSizeAction ImageSizeCache ImageSizeMultipliers ImageSizeRaw ImageSubtract ImageTake ImageTransformation ImageTrim ImageType ImageValue ImageValuePositions Implies Import ImportAutoReplacements ImportString ImprovementImportance In IncidenceGraph IncidenceList IncidenceMatrix IncludeConstantBasis IncludeFileExtension IncludePods IncludeSingularTerm Increment Indent IndentingNewlineSpacings IndentMaxFraction IndependenceTest IndependentEdgeSetQ IndependentUnit IndependentVertexSetQ Indeterminate IndexCreationOptions Indexed IndexGraph IndexTag Inequality InexactNumberQ InexactNumbers Infinity Infix Information Inherited InheritScope Initialization InitializationCell InitializationCellEvaluation InitializationCellWarning InlineCounterAssignments InlineCounterIncrements InlineRules Inner Inpaint Input InputAliases InputAssumptions InputAutoReplacements InputField InputFieldBox InputFieldBoxOptions InputForm InputGrouping InputNamePacket InputNotebook InputPacket InputSettings InputStream InputString InputStringPacket InputToBoxFormPacket Insert InsertionPointObject InsertResults Inset Inset3DBox Inset3DBoxOptions InsetBox InsetBoxOptions Install InstallService InString Integer IntegerDigits IntegerExponent IntegerLength IntegerPart IntegerPartitions IntegerQ Integers IntegerString Integral Integrate Interactive InteractiveTradingChart Interlaced Interleaving InternallyBalancedDecomposition InterpolatingFunction InterpolatingPolynomial Interpolation InterpolationOrder InterpolationPoints InterpolationPrecision Interpretation InterpretationBox InterpretationBoxOptions InterpretationFunction ' + 'InterpretTemplate InterquartileRange Interrupt InterruptSettings Intersection Interval IntervalIntersection IntervalMemberQ IntervalUnion Inverse InverseBetaRegularized InverseCDF InverseChiSquareDistribution InverseContinuousWaveletTransform InverseDistanceTransform InverseEllipticNomeQ InverseErf InverseErfc InverseFourier InverseFourierCosTransform InverseFourierSequenceTransform InverseFourierSinTransform InverseFourierTransform InverseFunction InverseFunctions InverseGammaDistribution InverseGammaRegularized InverseGaussianDistribution InverseGudermannian InverseHaversine InverseJacobiCD InverseJacobiCN InverseJacobiCS InverseJacobiDC InverseJacobiDN InverseJacobiDS InverseJacobiNC InverseJacobiND InverseJacobiNS InverseJacobiSC InverseJacobiSD InverseJacobiSN InverseLaplaceTransform InversePermutation InverseRadon InverseSeries InverseSurvivalFunction InverseWaveletTransform InverseWeierstrassP InverseZTransform Invisible InvisibleApplication InvisibleTimes IrreduciblePolynomialQ IsolatingInterval IsomorphicGraphQ IsotopeData Italic Item ItemBox ItemBoxOptions ItemSize ItemStyle ItoProcess ' + 'JaccardDissimilarity JacobiAmplitude Jacobian JacobiCD JacobiCN JacobiCS JacobiDC JacobiDN JacobiDS JacobiNC JacobiND JacobiNS JacobiP JacobiSC JacobiSD JacobiSN JacobiSymbol JacobiZeta JankoGroupJ1 JankoGroupJ2 JankoGroupJ3 JankoGroupJ4 JarqueBeraALMTest JohnsonDistribution Join Joined JoinedCurve JoinedCurveBox JoinForm JordanDecomposition JordanModelDecomposition ' + 'K KagiChart KaiserBesselWindow KaiserWindow KalmanEstimator KalmanFilter KarhunenLoeveDecomposition KaryTree KatzCentrality KCoreComponents KDistribution KelvinBei KelvinBer KelvinKei KelvinKer KendallTau KendallTauTest KernelExecute KernelMixtureDistribution KernelObject Kernels Ket Khinchin KirchhoffGraph KirchhoffMatrix KleinInvariantJ KnightTourGraph KnotData KnownUnitQ KolmogorovSmirnovTest KroneckerDelta KroneckerModelDecomposition KroneckerProduct KroneckerSymbol KuiperTest KumaraswamyDistribution Kurtosis KuwaharaFilter ' + 'Label Labeled LabeledSlider LabelingFunction LabelStyle LaguerreL LambdaComponents LambertW LanczosWindow LandauDistribution Language LanguageCategory LaplaceDistribution LaplaceTransform Laplacian LaplacianFilter LaplacianGaussianFilter Large Larger Last Latitude LatitudeLongitude LatticeData LatticeReduce Launch LaunchKernels LayeredGraphPlot LayerSizeFunction LayoutInformation LCM LeafCount LeapYearQ LeastSquares LeastSquaresFilterKernel Left LeftArrow LeftArrowBar LeftArrowRightArrow LeftDownTeeVector LeftDownVector LeftDownVectorBar LeftRightArrow LeftRightVector LeftTee LeftTeeArrow LeftTeeVector LeftTriangle LeftTriangleBar LeftTriangleEqual LeftUpDownVector LeftUpTeeVector LeftUpVector LeftUpVectorBar LeftVector LeftVectorBar LegendAppearance Legended LegendFunction LegendLabel LegendLayout LegendMargins LegendMarkers LegendMarkerSize LegendreP LegendreQ LegendreType Length LengthWhile LerchPhi Less LessEqual LessEqualGreater LessFullEqual LessGreater LessLess LessSlantEqual LessTilde LetterCharacter LetterQ Level LeveneTest LeviCivitaTensor LevyDistribution Lexicographic LibraryFunction LibraryFunctionError LibraryFunctionInformation LibraryFunctionLoad LibraryFunctionUnload LibraryLoad LibraryUnload LicenseID LiftingFilterData LiftingWaveletTransform LightBlue LightBrown LightCyan Lighter LightGray LightGreen Lighting LightingAngle LightMagenta LightOrange LightPink LightPurple LightRed LightSources LightYellow Likelihood Limit LimitsPositioning LimitsPositioningTokens LindleyDistribution Line Line3DBox LinearFilter LinearFractionalTransform LinearModelFit LinearOffsetFunction LinearProgramming LinearRecurrence LinearSolve LinearSolveFunction LineBox LineBreak LinebreakAdjustments LineBreakChart LineBreakWithin LineColor LineForm LineGraph LineIndent LineIndentMaxFraction LineIntegralConvolutionPlot LineIntegralConvolutionScale LineLegend LineOpacity LineSpacing LineWrapParts LinkActivate LinkClose LinkConnect LinkConnectedQ LinkCreate LinkError LinkFlush LinkFunction LinkHost LinkInterrupt LinkLaunch LinkMode LinkObject LinkOpen LinkOptions LinkPatterns LinkProtocol LinkRead LinkReadHeld LinkReadyQ Links LinkWrite LinkWriteHeld LiouvilleLambda List Listable ListAnimate ListContourPlot ListContourPlot3D ListConvolve ListCorrelate ListCurvePathPlot ListDeconvolve ListDensityPlot Listen ListFourierSequenceTransform ListInterpolation ListLineIntegralConvolutionPlot ListLinePlot ListLogLinearPlot ListLogLogPlot ListLogPlot ListPicker ListPickerBox ListPickerBoxBackground ListPickerBoxOptions ListPlay ListPlot ListPlot3D ListPointPlot3D ListPolarPlot ListQ ListStreamDensityPlot ListStreamPlot ListSurfacePlot3D ListVectorDensityPlot ListVectorPlot ListVectorPlot3D ListZTransform Literal LiteralSearch LocalClusteringCoefficient LocalizeVariables LocationEquivalenceTest LocationTest Locator LocatorAutoCreate LocatorBox LocatorBoxOptions LocatorCentering LocatorPane LocatorPaneBox LocatorPaneBoxOptions ' + 'LocatorRegion Locked Log Log10 Log2 LogBarnesG LogGamma LogGammaDistribution LogicalExpand LogIntegral LogisticDistribution LogitModelFit LogLikelihood LogLinearPlot LogLogisticDistribution LogLogPlot LogMultinormalDistribution LogNormalDistribution LogPlot LogRankTest LogSeriesDistribution LongEqual Longest LongestAscendingSequence LongestCommonSequence LongestCommonSequencePositions LongestCommonSubsequence LongestCommonSubsequencePositions LongestMatch LongForm Longitude LongLeftArrow LongLeftRightArrow LongRightArrow Loopback LoopFreeGraphQ LowerCaseQ LowerLeftArrow LowerRightArrow LowerTriangularize LowpassFilter LQEstimatorGains LQGRegulator LQOutputRegulatorGains LQRegulatorGains LUBackSubstitution LucasL LuccioSamiComponents LUDecomposition LyapunovSolve LyonsGroupLy ' + 'MachineID MachineName MachineNumberQ MachinePrecision MacintoshSystemPageSetup Magenta Magnification Magnify MainSolve MaintainDynamicCaches Majority MakeBoxes MakeExpression MakeRules MangoldtLambda ManhattanDistance Manipulate Manipulator MannWhitneyTest MantissaExponent Manual Map MapAll MapAt MapIndexed MAProcess MapThread MarcumQ MardiaCombinedTest MardiaKurtosisTest MardiaSkewnessTest MarginalDistribution MarkovProcessProperties Masking MatchingDissimilarity MatchLocalNameQ MatchLocalNames MatchQ Material MathematicaNotation MathieuC MathieuCharacteristicA MathieuCharacteristicB MathieuCharacteristicExponent MathieuCPrime MathieuGroupM11 MathieuGroupM12 MathieuGroupM22 MathieuGroupM23 MathieuGroupM24 MathieuS MathieuSPrime MathMLForm MathMLText Matrices MatrixExp MatrixForm MatrixFunction MatrixLog MatrixPlot MatrixPower MatrixQ MatrixRank Max MaxBend MaxDetect MaxExtraBandwidths MaxExtraConditions MaxFeatures MaxFilter Maximize MaxIterations MaxMemoryUsed MaxMixtureKernels MaxPlotPoints MaxPoints MaxRecursion MaxStableDistribution MaxStepFraction MaxSteps MaxStepSize MaxValue MaxwellDistribution McLaughlinGroupMcL Mean MeanClusteringCoefficient MeanDegreeConnectivity MeanDeviation MeanFilter MeanGraphDistance MeanNeighborDegree MeanShift MeanShiftFilter Median MedianDeviation MedianFilter Medium MeijerG MeixnerDistribution MemberQ MemoryConstrained MemoryInUse Menu MenuAppearance MenuCommandKey MenuEvaluator MenuItem MenuPacket MenuSortingValue MenuStyle MenuView MergeDifferences Mesh MeshFunctions MeshRange MeshShading MeshStyle Message MessageDialog MessageList MessageName MessageOptions MessagePacket Messages MessagesNotebook MetaCharacters MetaInformation Method MethodOptions MexicanHatWavelet MeyerWavelet Min MinDetect MinFilter MinimalPolynomial MinimalStateSpaceModel Minimize Minors MinRecursion MinSize MinStableDistribution Minus MinusPlus MinValue Missing MissingDataMethod MittagLefflerE MixedRadix MixedRadixQuantity MixtureDistribution Mod Modal Mode Modular ModularLambda Module Modulus MoebiusMu Moment Momentary MomentConvert MomentEvaluate MomentGeneratingFunction Monday Monitor MonomialList MonomialOrder MonsterGroupM MorletWavelet MorphologicalBinarize MorphologicalBranchPoints MorphologicalComponents MorphologicalEulerNumber MorphologicalGraph MorphologicalPerimeter MorphologicalTransform Most MouseAnnotation MouseAppearance MouseAppearanceTag MouseButtons Mouseover MousePointerNote MousePosition MovingAverage MovingMedian MoyalDistribution MultiedgeStyle MultilaunchWarning MultiLetterItalics MultiLetterStyle MultilineFunction Multinomial MultinomialDistribution MultinormalDistribution MultiplicativeOrder Multiplicity Multiselection MultivariateHypergeometricDistribution MultivariatePoissonDistribution MultivariateTDistribution ' + 'N NakagamiDistribution NameQ Names NamespaceBox Nand NArgMax NArgMin NBernoulliB NCache NDSolve NDSolveValue Nearest NearestFunction NeedCurrentFrontEndPackagePacket NeedCurrentFrontEndSymbolsPacket NeedlemanWunschSimilarity Needs Negative NegativeBinomialDistribution NegativeMultinomialDistribution NeighborhoodGraph Nest NestedGreaterGreater NestedLessLess NestedScriptRules NestList NestWhile NestWhileList NevilleThetaC NevilleThetaD NevilleThetaN NevilleThetaS NewPrimitiveStyle NExpectation Next NextPrime NHoldAll NHoldFirst NHoldRest NicholsGridLines NicholsPlot NIntegrate NMaximize NMaxValue NMinimize NMinValue NominalVariables NonAssociative NoncentralBetaDistribution NoncentralChiSquareDistribution NoncentralFRatioDistribution NoncentralStudentTDistribution NonCommutativeMultiply NonConstants None NonlinearModelFit NonlocalMeansFilter NonNegative NonPositive Nor NorlundB Norm Normal NormalDistribution NormalGrouping Normalize NormalizedSquaredEuclideanDistance NormalsFunction NormFunction Not NotCongruent NotCupCap NotDoubleVerticalBar Notebook NotebookApply NotebookAutoSave NotebookClose NotebookConvertSettings NotebookCreate NotebookCreateReturnObject NotebookDefault NotebookDelete NotebookDirectory NotebookDynamicExpression NotebookEvaluate NotebookEventActions NotebookFileName NotebookFind NotebookFindReturnObject NotebookGet NotebookGetLayoutInformationPacket NotebookGetMisspellingsPacket NotebookInformation NotebookInterfaceObject NotebookLocate NotebookObject NotebookOpen NotebookOpenReturnObject NotebookPath NotebookPrint NotebookPut NotebookPutReturnObject NotebookRead NotebookResetGeneratedCells Notebooks NotebookSave NotebookSaveAs NotebookSelection NotebookSetupLayoutInformationPacket NotebooksMenu NotebookWrite NotElement NotEqualTilde NotExists NotGreater NotGreaterEqual NotGreaterFullEqual NotGreaterGreater NotGreaterLess NotGreaterSlantEqual NotGreaterTilde NotHumpDownHump NotHumpEqual NotLeftTriangle NotLeftTriangleBar NotLeftTriangleEqual NotLess NotLessEqual NotLessFullEqual NotLessGreater NotLessLess NotLessSlantEqual NotLessTilde NotNestedGreaterGreater NotNestedLessLess NotPrecedes NotPrecedesEqual NotPrecedesSlantEqual NotPrecedesTilde NotReverseElement NotRightTriangle NotRightTriangleBar NotRightTriangleEqual NotSquareSubset NotSquareSubsetEqual NotSquareSuperset NotSquareSupersetEqual NotSubset NotSubsetEqual NotSucceeds NotSucceedsEqual NotSucceedsSlantEqual NotSucceedsTilde NotSuperset NotSupersetEqual NotTilde NotTildeEqual NotTildeFullEqual NotTildeTilde NotVerticalBar NProbability NProduct NProductFactors NRoots NSolve NSum NSumTerms Null NullRecords NullSpace NullWords Number NumberFieldClassNumber NumberFieldDiscriminant NumberFieldFundamentalUnits NumberFieldIntegralBasis NumberFieldNormRepresentatives NumberFieldRegulator NumberFieldRootsOfUnity NumberFieldSignature NumberForm NumberFormat NumberMarks NumberMultiplier NumberPadding NumberPoint NumberQ NumberSeparator ' + 'NumberSigns NumberString Numerator NumericFunction NumericQ NuttallWindow NValues NyquistGridLines NyquistPlot ' + 'O ObservabilityGramian ObservabilityMatrix ObservableDecomposition ObservableModelQ OddQ Off Offset OLEData On ONanGroupON OneIdentity Opacity Open OpenAppend Opener OpenerBox OpenerBoxOptions OpenerView OpenFunctionInspectorPacket Opening OpenRead OpenSpecialOptions OpenTemporary OpenWrite Operate OperatingSystem OptimumFlowData Optional OptionInspectorSettings OptionQ Options OptionsPacket OptionsPattern OptionValue OptionValueBox OptionValueBoxOptions Or Orange Order OrderDistribution OrderedQ Ordering Orderless OrnsteinUhlenbeckProcess Orthogonalize Out Outer OutputAutoOverwrite OutputControllabilityMatrix OutputControllableModelQ OutputForm OutputFormData OutputGrouping OutputMathEditExpression OutputNamePacket OutputResponse OutputSizeLimit OutputStream Over OverBar OverDot Overflow OverHat Overlaps Overlay OverlayBox OverlayBoxOptions Overscript OverscriptBox OverscriptBoxOptions OverTilde OverVector OwenT OwnValues ' + 'PackingMethod PaddedForm Padding PadeApproximant PadLeft PadRight PageBreakAbove PageBreakBelow PageBreakWithin PageFooterLines PageFooters PageHeaderLines PageHeaders PageHeight PageRankCentrality PageWidth PairedBarChart PairedHistogram PairedSmoothHistogram PairedTTest PairedZTest PaletteNotebook PalettePath Pane PaneBox PaneBoxOptions Panel PanelBox PanelBoxOptions Paneled PaneSelector PaneSelectorBox PaneSelectorBoxOptions PaperWidth ParabolicCylinderD ParagraphIndent ParagraphSpacing ParallelArray ParallelCombine ParallelDo ParallelEvaluate Parallelization Parallelize ParallelMap ParallelNeeds ParallelProduct ParallelSubmit ParallelSum ParallelTable ParallelTry Parameter ParameterEstimator ParameterMixtureDistribution ParameterVariables ParametricFunction ParametricNDSolve ParametricNDSolveValue ParametricPlot ParametricPlot3D ParentConnect ParentDirectory ParentForm Parenthesize ParentList ParetoDistribution Part PartialCorrelationFunction PartialD ParticleData Partition PartitionsP PartitionsQ ParzenWindow PascalDistribution PassEventsDown PassEventsUp Paste PasteBoxFormInlineCells PasteButton Path PathGraph PathGraphQ Pattern PatternSequence PatternTest PauliMatrix PaulWavelet Pause PausedTime PDF PearsonChiSquareTest PearsonCorrelationTest PearsonDistribution PerformanceGoal PeriodicInterpolation Periodogram PeriodogramArray PermutationCycles PermutationCyclesQ PermutationGroup PermutationLength PermutationList PermutationListQ PermutationMax PermutationMin PermutationOrder PermutationPower PermutationProduct PermutationReplace Permutations PermutationSupport Permute PeronaMalikFilter Perpendicular PERTDistribution PetersenGraph PhaseMargins Pi Pick PIDData PIDDerivativeFilter PIDFeedforward PIDTune Piecewise PiecewiseExpand PieChart PieChart3D PillaiTrace PillaiTraceTest Pink Pivoting PixelConstrained PixelValue PixelValuePositions Placed Placeholder PlaceholderReplace Plain PlanarGraphQ Play PlayRange Plot Plot3D Plot3Matrix PlotDivision PlotJoined PlotLabel PlotLayout PlotLegends PlotMarkers PlotPoints PlotRange PlotRangeClipping PlotRangePadding PlotRegion PlotStyle Plus PlusMinus Pochhammer PodStates PodWidth Point Point3DBox PointBox PointFigureChart PointForm PointLegend PointSize PoissonConsulDistribution PoissonDistribution PoissonProcess PoissonWindow PolarAxes PolarAxesOrigin PolarGridLines PolarPlot PolarTicks PoleZeroMarkers PolyaAeppliDistribution PolyGamma Polygon Polygon3DBox Polygon3DBoxOptions PolygonBox PolygonBoxOptions PolygonHoleScale PolygonIntersections PolygonScale PolyhedronData PolyLog PolynomialExtendedGCD PolynomialForm PolynomialGCD PolynomialLCM PolynomialMod PolynomialQ PolynomialQuotient PolynomialQuotientRemainder PolynomialReduce PolynomialRemainder Polynomials PopupMenu PopupMenuBox PopupMenuBoxOptions PopupView PopupWindow Position Positive PositiveDefiniteMatrixQ PossibleZeroQ Postfix PostScript Power PowerDistribution PowerExpand PowerMod PowerModList ' + 'PowerSpectralDensity PowersRepresentations PowerSymmetricPolynomial Precedence PrecedenceForm Precedes PrecedesEqual PrecedesSlantEqual PrecedesTilde Precision PrecisionGoal PreDecrement PredictionRoot PreemptProtect PreferencesPath Prefix PreIncrement Prepend PrependTo PreserveImageOptions Previous PriceGraphDistribution PrimaryPlaceholder Prime PrimeNu PrimeOmega PrimePi PrimePowerQ PrimeQ Primes PrimeZetaP PrimitiveRoot PrincipalComponents PrincipalValue Print PrintAction PrintForm PrintingCopies PrintingOptions PrintingPageRange PrintingStartingPageNumber PrintingStyleEnvironment PrintPrecision PrintTemporary Prism PrismBox PrismBoxOptions PrivateCellOptions PrivateEvaluationOptions PrivateFontOptions PrivateFrontEndOptions PrivateNotebookOptions PrivatePaths Probability ProbabilityDistribution ProbabilityPlot ProbabilityPr ProbabilityScalePlot ProbitModelFit ProcessEstimator ProcessParameterAssumptions ProcessParameterQ ProcessStateDomain ProcessTimeDomain Product ProductDistribution ProductLog ProgressIndicator ProgressIndicatorBox ProgressIndicatorBoxOptions Projection Prolog PromptForm Properties Property PropertyList PropertyValue Proportion Proportional Protect Protected ProteinData Pruning PseudoInverse Purple Put PutAppend Pyramid PyramidBox PyramidBoxOptions ' + 'QBinomial QFactorial QGamma QHypergeometricPFQ QPochhammer QPolyGamma QRDecomposition QuadraticIrrationalQ Quantile QuantilePlot Quantity QuantityForm QuantityMagnitude QuantityQ QuantityUnit Quartics QuartileDeviation Quartiles QuartileSkewness QueueingNetworkProcess QueueingProcess QueueProperties Quiet Quit Quotient QuotientRemainder ' + 'RadialityCentrality RadicalBox RadicalBoxOptions RadioButton RadioButtonBar RadioButtonBox RadioButtonBoxOptions Radon RamanujanTau RamanujanTauL RamanujanTauTheta RamanujanTauZ Random RandomChoice RandomComplex RandomFunction RandomGraph RandomImage RandomInteger RandomPermutation RandomPrime RandomReal RandomSample RandomSeed RandomVariate RandomWalkProcess Range RangeFilter RangeSpecification RankedMax RankedMin Raster Raster3D Raster3DBox Raster3DBoxOptions RasterArray RasterBox RasterBoxOptions Rasterize RasterSize Rational RationalFunctions Rationalize Rationals Ratios Raw RawArray RawBoxes RawData RawMedium RayleighDistribution Re Read ReadList ReadProtected Real RealBlockDiagonalForm RealDigits RealExponent Reals Reap Record RecordLists RecordSeparators Rectangle RectangleBox RectangleBoxOptions RectangleChart RectangleChart3D RecurrenceFilter RecurrenceTable RecurringDigitsForm Red Reduce RefBox ReferenceLineStyle ReferenceMarkers ReferenceMarkerStyle Refine ReflectionMatrix ReflectionTransform Refresh RefreshRate RegionBinarize RegionFunction RegionPlot RegionPlot3D RegularExpression Regularization Reinstall Release ReleaseHold ReliabilityDistribution ReliefImage ReliefPlot Remove RemoveAlphaChannel RemoveAsynchronousTask Removed RemoveInputStreamMethod RemoveOutputStreamMethod RemoveProperty RemoveScheduledTask RenameDirectory RenameFile RenderAll RenderingOptions RenewalProcess RenkoChart Repeated RepeatedNull RepeatedString Replace ReplaceAll ReplaceHeldPart ReplaceImageValue ReplaceList ReplacePart ReplacePixelValue ReplaceRepeated Resampling Rescale RescalingTransform ResetDirectory ResetMenusPacket ResetScheduledTask Residue Resolve Rest Resultant ResumePacket Return ReturnExpressionPacket ReturnInputFormPacket ReturnPacket ReturnTextPacket Reverse ReverseBiorthogonalSplineWavelet ReverseElement ReverseEquilibrium ReverseGraph ReverseUpEquilibrium RevolutionAxis RevolutionPlot3D RGBColor RiccatiSolve RiceDistribution RidgeFilter RiemannR RiemannSiegelTheta RiemannSiegelZ Riffle Right RightArrow RightArrowBar RightArrowLeftArrow RightCosetRepresentative RightDownTeeVector RightDownVector RightDownVectorBar RightTee RightTeeArrow RightTeeVector RightTriangle RightTriangleBar RightTriangleEqual RightUpDownVector RightUpTeeVector RightUpVector RightUpVectorBar RightVector RightVectorBar RiskAchievementImportance RiskReductionImportance RogersTanimotoDissimilarity Root RootApproximant RootIntervals RootLocusPlot RootMeanSquare RootOfUnityQ RootReduce Roots RootSum Rotate RotateLabel RotateLeft RotateRight RotationAction RotationBox RotationBoxOptions RotationMatrix RotationTransform Round RoundImplies RoundingRadius Row RowAlignments RowBackgrounds RowBox RowHeights RowLines RowMinHeight RowReduce RowsEqual RowSpacings RSolve RudvalisGroupRu Rule RuleCondition RuleDelayed RuleForm RulerUnits Run RunScheduledTask RunThrough RuntimeAttributes RuntimeOptions RussellRaoDissimilarity ' + 'SameQ SameTest SampleDepth SampledSoundFunction SampledSoundList SampleRate SamplingPeriod SARIMAProcess SARMAProcess SatisfiabilityCount SatisfiabilityInstances SatisfiableQ Saturday Save Saveable SaveAutoDelete SaveDefinitions SawtoothWave Scale Scaled ScaleDivisions ScaledMousePosition ScaleOrigin ScalePadding ScaleRanges ScaleRangeStyle ScalingFunctions ScalingMatrix ScalingTransform Scan ScheduledTaskActiveQ ScheduledTaskData ScheduledTaskObject ScheduledTasks SchurDecomposition ScientificForm ScreenRectangle ScreenStyleEnvironment ScriptBaselineShifts ScriptLevel ScriptMinSize ScriptRules ScriptSizeMultipliers Scrollbars ScrollingOptions ScrollPosition Sec Sech SechDistribution SectionGrouping SectorChart SectorChart3D SectorOrigin SectorSpacing SeedRandom Select Selectable SelectComponents SelectedCells SelectedNotebook Selection SelectionAnimate SelectionCell SelectionCellCreateCell SelectionCellDefaultStyle SelectionCellParentStyle SelectionCreateCell SelectionDebuggerTag SelectionDuplicateCell SelectionEvaluate SelectionEvaluateCreateCell SelectionMove SelectionPlaceholder SelectionSetStyle SelectWithContents SelfLoops SelfLoopStyle SemialgebraicComponentInstances SendMail Sequence SequenceAlignment SequenceForm SequenceHold SequenceLimit Series SeriesCoefficient SeriesData SessionTime Set SetAccuracy SetAlphaChannel SetAttributes Setbacks SetBoxFormNamesPacket SetDelayed SetDirectory SetEnvironment SetEvaluationNotebook SetFileDate SetFileLoadingContext SetNotebookStatusLine SetOptions SetOptionsPacket SetPrecision SetProperty SetSelectedNotebook SetSharedFunction SetSharedVariable SetSpeechParametersPacket SetStreamPosition SetSystemOptions Setter SetterBar SetterBox SetterBoxOptions Setting SetValue Shading Shallow ShannonWavelet ShapiroWilkTest Share Sharpen ShearingMatrix ShearingTransform ShenCastanMatrix Short ShortDownArrow Shortest ShortestMatch ShortestPathFunction ShortLeftArrow ShortRightArrow ShortUpArrow Show ShowAutoStyles ShowCellBracket ShowCellLabel ShowCellTags ShowClosedCellArea ShowContents ShowControls ShowCursorTracker ShowGroupOpenCloseIcon ShowGroupOpener ShowInvisibleCharacters ShowPageBreaks ShowPredictiveInterface ShowSelection ShowShortBoxForm ShowSpecialCharacters ShowStringCharacters ShowSyntaxStyles ShrinkingDelay ShrinkWrapBoundingBox SiegelTheta SiegelTukeyTest Sign Signature SignedRankTest SignificanceLevel SignPadding SignTest SimilarityRules SimpleGraph SimpleGraphQ Simplify Sin Sinc SinghMaddalaDistribution SingleEvaluation SingleLetterItalics SingleLetterStyle SingularValueDecomposition SingularValueList SingularValuePlot SingularValues Sinh SinhIntegral SinIntegral SixJSymbol Skeleton SkeletonTransform SkellamDistribution Skewness SkewNormalDistribution Skip SliceDistribution Slider Slider2D Slider2DBox Slider2DBoxOptions SliderBox SliderBoxOptions SlideView Slot SlotSequence Small SmallCircle Smaller SmithDelayCompensator SmithWatermanSimilarity ' + 'SmoothDensityHistogram SmoothHistogram SmoothHistogram3D SmoothKernelDistribution SocialMediaData Socket SokalSneathDissimilarity Solve SolveAlways SolveDelayed Sort SortBy Sound SoundAndGraphics SoundNote SoundVolume Sow Space SpaceForm Spacer Spacings Span SpanAdjustments SpanCharacterRounding SpanFromAbove SpanFromBoth SpanFromLeft SpanLineThickness SpanMaxSize SpanMinSize SpanningCharacters SpanSymmetric SparseArray SpatialGraphDistribution Speak SpeakTextPacket SpearmanRankTest SpearmanRho Spectrogram SpectrogramArray Specularity SpellingCorrection SpellingDictionaries SpellingDictionariesPath SpellingOptions SpellingSuggestionsPacket Sphere SphereBox SphericalBesselJ SphericalBesselY SphericalHankelH1 SphericalHankelH2 SphericalHarmonicY SphericalPlot3D SphericalRegion SpheroidalEigenvalue SpheroidalJoiningFactor SpheroidalPS SpheroidalPSPrime SpheroidalQS SpheroidalQSPrime SpheroidalRadialFactor SpheroidalS1 SpheroidalS1Prime SpheroidalS2 SpheroidalS2Prime Splice SplicedDistribution SplineClosed SplineDegree SplineKnots SplineWeights Split SplitBy SpokenString Sqrt SqrtBox SqrtBoxOptions Square SquaredEuclideanDistance SquareFreeQ SquareIntersection SquaresR SquareSubset SquareSubsetEqual SquareSuperset SquareSupersetEqual SquareUnion SquareWave StabilityMargins StabilityMarginsStyle StableDistribution Stack StackBegin StackComplete StackInhibit StandardDeviation StandardDeviationFilter StandardForm Standardize StandbyDistribution Star StarGraph StartAsynchronousTask StartingStepSize StartOfLine StartOfString StartScheduledTask StartupSound StateDimensions StateFeedbackGains StateOutputEstimator StateResponse StateSpaceModel StateSpaceRealization StateSpaceTransform StationaryDistribution StationaryWaveletPacketTransform StationaryWaveletTransform StatusArea StatusCentrality StepMonitor StieltjesGamma StirlingS1 StirlingS2 StopAsynchronousTask StopScheduledTask StrataVariables StratonovichProcess StreamColorFunction StreamColorFunctionScaling StreamDensityPlot StreamPlot StreamPoints StreamPosition Streams StreamScale StreamStyle String StringBreak StringByteCount StringCases StringCount StringDrop StringExpression StringForm StringFormat StringFreeQ StringInsert StringJoin StringLength StringMatchQ StringPosition StringQ StringReplace StringReplaceList StringReplacePart StringReverse StringRotateLeft StringRotateRight StringSkeleton StringSplit StringTake StringToStream StringTrim StripBoxes StripOnInput StripWrapperBoxes StrokeForm StructuralImportance StructuredArray StructuredSelection StruveH StruveL Stub StudentTDistribution Style StyleBox StyleBoxAutoDelete StyleBoxOptions StyleData StyleDefinitions StyleForm StyleKeyMapping StyleMenuListing StyleNameDialogSettings StyleNames StylePrint StyleSheetPath Subfactorial Subgraph SubMinus SubPlus SubresultantPolynomialRemainders ' + 'SubresultantPolynomials Subresultants Subscript SubscriptBox SubscriptBoxOptions Subscripted Subset SubsetEqual Subsets SubStar Subsuperscript SubsuperscriptBox SubsuperscriptBoxOptions Subtract SubtractFrom SubValues Succeeds SucceedsEqual SucceedsSlantEqual SucceedsTilde SuchThat Sum SumConvergence Sunday SuperDagger SuperMinus SuperPlus Superscript SuperscriptBox SuperscriptBoxOptions Superset SupersetEqual SuperStar Surd SurdForm SurfaceColor SurfaceGraphics SurvivalDistribution SurvivalFunction SurvivalModel SurvivalModelFit SuspendPacket SuzukiDistribution SuzukiGroupSuz SwatchLegend Switch Symbol SymbolName SymletWavelet Symmetric SymmetricGroup SymmetricMatrixQ SymmetricPolynomial SymmetricReduction Symmetrize SymmetrizedArray SymmetrizedArrayRules SymmetrizedDependentComponents SymmetrizedIndependentComponents SymmetrizedReplacePart SynchronousInitialization SynchronousUpdating Syntax SyntaxForm SyntaxInformation SyntaxLength SyntaxPacket SyntaxQ SystemDialogInput SystemException SystemHelpPath SystemInformation SystemInformationData SystemOpen SystemOptions SystemsModelDelay SystemsModelDelayApproximate SystemsModelDelete SystemsModelDimensions SystemsModelExtract SystemsModelFeedbackConnect SystemsModelLabels SystemsModelOrder SystemsModelParallelConnect SystemsModelSeriesConnect SystemsModelStateFeedbackConnect SystemStub ' + 'Tab TabFilling Table TableAlignments TableDepth TableDirections TableForm TableHeadings TableSpacing TableView TableViewBox TabSpacings TabView TabViewBox TabViewBoxOptions TagBox TagBoxNote TagBoxOptions TaggingRules TagSet TagSetDelayed TagStyle TagUnset Take TakeWhile Tally Tan Tanh TargetFunctions TargetUnits TautologyQ TelegraphProcess TemplateBox TemplateBoxOptions TemplateSlotSequence TemporalData Temporary TemporaryVariable TensorContract TensorDimensions TensorExpand TensorProduct TensorQ TensorRank TensorReduce TensorSymmetry TensorTranspose TensorWedge Tetrahedron TetrahedronBox TetrahedronBoxOptions TeXForm TeXSave Text Text3DBox Text3DBoxOptions TextAlignment TextBand TextBoundingBox TextBox TextCell TextClipboardType TextData TextForm TextJustification TextLine TextPacket TextParagraph TextRecognize TextRendering TextStyle Texture TextureCoordinateFunction TextureCoordinateScaling Therefore ThermometerGauge Thick Thickness Thin Thinning ThisLink ThompsonGroupTh Thread ThreeJSymbol Threshold Through Throw Thumbnail Thursday Ticks TicksStyle Tilde TildeEqual TildeFullEqual TildeTilde TimeConstrained TimeConstraint Times TimesBy TimeSeriesForecast TimeSeriesInvertibility TimeUsed TimeValue TimeZone Timing Tiny TitleGrouping TitsGroupT ToBoxes ToCharacterCode ToColor ToContinuousTimeModel ToDate ToDiscreteTimeModel ToeplitzMatrix ToExpression ToFileName Together Toggle ToggleFalse Toggler TogglerBar TogglerBox TogglerBoxOptions ToHeldExpression ToInvertibleTimeSeries TokenWords Tolerance ToLowerCase ToNumberField TooBig Tooltip TooltipBox TooltipBoxOptions TooltipDelay TooltipStyle Top TopHatTransform TopologicalSort ToRadicals ToRules ToString Total TotalHeight TotalVariationFilter TotalWidth TouchscreenAutoZoom TouchscreenControlPlacement ToUpperCase Tr Trace TraceAbove TraceAction TraceBackward TraceDepth TraceDialog TraceForward TraceInternal TraceLevel TraceOff TraceOn TraceOriginal TracePrint TraceScan TrackedSymbols TradingChart TraditionalForm TraditionalFunctionNotation TraditionalNotation TraditionalOrder TransferFunctionCancel TransferFunctionExpand TransferFunctionFactor TransferFunctionModel TransferFunctionPoles TransferFunctionTransform TransferFunctionZeros TransformationFunction TransformationFunctions TransformationMatrix TransformedDistribution TransformedField Translate TranslationTransform TransparentColor Transpose TreeForm TreeGraph TreeGraphQ TreePlot TrendStyle TriangleWave TriangularDistribution Trig TrigExpand TrigFactor TrigFactorList Trigger TrigReduce TrigToExp TrimmedMean True TrueQ TruncatedDistribution TsallisQExponentialDistribution TsallisQGaussianDistribution TTest Tube TubeBezierCurveBox TubeBezierCurveBoxOptions TubeBox TubeBSplineCurveBox TubeBSplineCurveBoxOptions Tuesday TukeyLambdaDistribution TukeyWindow Tuples TuranGraph TuringMachine ' + 'Transparent ' + 'UnateQ Uncompress Undefined UnderBar Underflow Underlined Underoverscript UnderoverscriptBox UnderoverscriptBoxOptions Underscript UnderscriptBox UnderscriptBoxOptions UndirectedEdge UndirectedGraph UndirectedGraphQ UndocumentedTestFEParserPacket UndocumentedTestGetSelectionPacket Unequal Unevaluated UniformDistribution UniformGraphDistribution UniformSumDistribution Uninstall Union UnionPlus Unique UnitBox UnitConvert UnitDimensions Unitize UnitRootTest UnitSimplify UnitStep UnitTriangle UnitVector Unprotect UnsameQ UnsavedVariables Unset UnsetShared UntrackedVariables Up UpArrow UpArrowBar UpArrowDownArrow Update UpdateDynamicObjects UpdateDynamicObjectsSynchronous UpdateInterval UpDownArrow UpEquilibrium UpperCaseQ UpperLeftArrow UpperRightArrow UpperTriangularize Upsample UpSet UpSetDelayed UpTee UpTeeArrow UpValues URL URLFetch URLFetchAsynchronous URLSave URLSaveAsynchronous UseGraphicsRange Using UsingFrontEnd ' + 'V2Get ValidationLength Value ValueBox ValueBoxOptions ValueForm ValueQ ValuesData Variables Variance VarianceEquivalenceTest VarianceEstimatorFunction VarianceGammaDistribution VarianceTest VectorAngle VectorColorFunction VectorColorFunctionScaling VectorDensityPlot VectorGlyphData VectorPlot VectorPlot3D VectorPoints VectorQ Vectors VectorScale VectorStyle Vee Verbatim Verbose VerboseConvertToPostScriptPacket VerifyConvergence VerifySolutions VerifyTestAssumptions Version VersionNumber VertexAdd VertexCapacity VertexColors VertexComponent VertexConnectivity VertexCoordinateRules VertexCoordinates VertexCorrelationSimilarity VertexCosineSimilarity VertexCount VertexCoverQ VertexDataCoordinates VertexDegree VertexDelete VertexDiceSimilarity VertexEccentricity VertexInComponent VertexInDegree VertexIndex VertexJaccardSimilarity VertexLabeling VertexLabels VertexLabelStyle VertexList VertexNormals VertexOutComponent VertexOutDegree VertexQ VertexRenderingFunction VertexReplace VertexShape VertexShapeFunction VertexSize VertexStyle VertexTextureCoordinates VertexWeight Vertical VerticalBar VerticalForm VerticalGauge VerticalSeparator VerticalSlider VerticalTilde ViewAngle ViewCenter ViewMatrix ViewPoint ViewPointSelectorSettings ViewPort ViewRange ViewVector ViewVertical VirtualGroupData Visible VisibleCell VoigtDistribution VonMisesDistribution ' + 'WaitAll WaitAsynchronousTask WaitNext WaitUntil WakebyDistribution WalleniusHypergeometricDistribution WaringYuleDistribution WatershedComponents WatsonUSquareTest WattsStrogatzGraphDistribution WaveletBestBasis WaveletFilterCoefficients WaveletImagePlot WaveletListPlot WaveletMapIndexed WaveletMatrixPlot WaveletPhi WaveletPsi WaveletScale WaveletScalogram WaveletThreshold WeaklyConnectedComponents WeaklyConnectedGraphQ WeakStationarity WeatherData WeberE Wedge Wednesday WeibullDistribution WeierstrassHalfPeriods WeierstrassInvariants WeierstrassP WeierstrassPPrime WeierstrassSigma WeierstrassZeta WeightedAdjacencyGraph WeightedAdjacencyMatrix WeightedData WeightedGraphQ Weights WelchWindow WheelGraph WhenEvent Which While White Whitespace WhitespaceCharacter WhittakerM WhittakerW WienerFilter WienerProcess WignerD WignerSemicircleDistribution WilksW WilksWTest WindowClickSelect WindowElements WindowFloating WindowFrame WindowFrameElements WindowMargins WindowMovable WindowOpacity WindowSelected WindowSize WindowStatusArea WindowTitle WindowToolbars WindowWidth With WolframAlpha WolframAlphaDate WolframAlphaQuantity WolframAlphaResult Word WordBoundary WordCharacter WordData WordSearch WordSeparators WorkingPrecision Write WriteString Wronskian ' + 'XMLElement XMLObject Xnor Xor ' + 'Yellow YuleDissimilarity ' + 'ZernikeR ZeroSymmetric ZeroTest ZeroWidthTimes Zeta ZetaZero ZipfDistribution ZTest ZTransform ' + '$Aborted $ActivationGroupID $ActivationKey $ActivationUserRegistered $AddOnsDirectory $AssertFunction $Assumptions $AsynchronousTask $BaseDirectory $BatchInput $BatchOutput $BoxForms $ByteOrdering $Canceled $CharacterEncoding $CharacterEncodings $CommandLine $CompilationTarget $ConditionHold $ConfiguredKernels $Context $ContextPath $ControlActiveSetting $CreationDate $CurrentLink $DateStringFormat $DefaultFont $DefaultFrontEnd $DefaultImagingDevice $DefaultPath $Display $DisplayFunction $DistributedContexts $DynamicEvaluation $Echo $Epilog $ExportFormats $Failed $FinancialDataSource $FormatType $FrontEnd $FrontEndSession $GeoLocation $HistoryLength $HomeDirectory $HTTPCookies $IgnoreEOF $ImagingDevices $ImportFormats $InitialDirectory $Input $InputFileName $InputStreamMethods $Inspector $InstallationDate $InstallationDirectory $InterfaceEnvironment $IterationLimit $KernelCount $KernelID $Language $LaunchDirectory $LibraryPath $LicenseExpirationDate $LicenseID $LicenseProcesses $LicenseServer $LicenseSubprocesses $LicenseType $Line $Linked $LinkSupported $LoadedFiles $MachineAddresses $MachineDomain $MachineDomains $MachineEpsilon $MachineID $MachineName $MachinePrecision $MachineType $MaxExtraPrecision $MaxLicenseProcesses $MaxLicenseSubprocesses $MaxMachineNumber $MaxNumber $MaxPiecewiseCases $MaxPrecision $MaxRootDegree $MessageGroups $MessageList $MessagePrePrint $Messages $MinMachineNumber $MinNumber $MinorReleaseNumber $MinPrecision $ModuleNumber $NetworkLicense $NewMessage $NewSymbol $Notebooks $NumberMarks $Off $OperatingSystem $Output $OutputForms $OutputSizeLimit $OutputStreamMethods $Packages $ParentLink $ParentProcessID $PasswordFile $PatchLevelID $Path $PathnameSeparator $PerformanceGoal $PipeSupported $Post $Pre $PreferencesDirectory $PrePrint $PreRead $PrintForms $PrintLiteral $ProcessID $ProcessorCount $ProcessorType $ProductInformation $ProgramName $RandomState $RecursionLimit $ReleaseNumber $RootDirectory $ScheduledTask $ScriptCommandLine $SessionID $SetParentLink $SharedFunctions $SharedVariables $SoundDisplay $SoundDisplayFunction $SuppressInputFormHeads $SynchronousEvaluation $SyntaxHandler $System $SystemCharacterEncoding $SystemID $SystemWordLength $TemporaryDirectory $TemporaryPrefix $TextStyle $TimedOut $TimeUnit $TimeZone $TopDirectory $TraceOff $TraceOn $TracePattern $TracePostAction $TracePreAction $Urgent $UserAddOnsDirectory $UserBaseDirectory $UserDocumentsDirectory $UserName $Version $VersionNumber',
    contains: [{
      className: "comment",
      begin: /\(\*/,
      end: /\*\)/
    }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.C_NUMBER_MODE, {
      className: 'list',
      begin: /\{/,
      end: /\}/,
      illegal: /:/
    }]
  };
};


},{}],101:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var COMMON_CONTAINS = [hljs.C_NUMBER_MODE, {
    className: 'string',
    begin: '\'',
    end: '\'',
    contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}]
  }];
  return {
    keywords: {
      keyword: 'break case catch classdef continue else elseif end enumerated events for function ' + 'global if methods otherwise parfor persistent properties return spmd switch try while',
      built_in: 'sin sind sinh asin asind asinh cos cosd cosh acos acosd acosh tan tand tanh atan ' + 'atand atan2 atanh sec secd sech asec asecd asech csc cscd csch acsc acscd acsch cot ' + 'cotd coth acot acotd acoth hypot exp expm1 log log1p log10 log2 pow2 realpow reallog ' + 'realsqrt sqrt nthroot nextpow2 abs angle complex conj imag real unwrap isreal ' + 'cplxpair fix floor ceil round mod rem sign airy besselj bessely besselh besseli ' + 'besselk beta betainc betaln ellipj ellipke erf erfc erfcx erfinv expint gamma ' + 'gammainc gammaln psi legendre cross dot factor isprime primes gcd lcm rat rats perms ' + 'nchoosek factorial cart2sph cart2pol pol2cart sph2cart hsv2rgb rgb2hsv zeros ones ' + 'eye repmat rand randn linspace logspace freqspace meshgrid accumarray size length ' + 'ndims numel disp isempty isequal isequalwithequalnans cat reshape diag blkdiag tril ' + 'triu fliplr flipud flipdim rot90 find sub2ind ind2sub bsxfun ndgrid permute ipermute ' + 'shiftdim circshift squeeze isscalar isvector ans eps realmax realmin pi i inf nan ' + 'isnan isinf isfinite j why compan gallery hadamard hankel hilb invhilb magic pascal ' + 'rosser toeplitz vander wilkinson'
    },
    illegal: '(//|"|#|/\\*|\\s+/\\w+)',
    contains: [{
      className: 'function',
      beginKeywords: 'function',
      end: '$',
      contains: [hljs.UNDERSCORE_TITLE_MODE, {
        className: 'params',
        begin: '\\(',
        end: '\\)'
      }, {
        className: 'params',
        begin: '\\[',
        end: '\\]'
      }]
    }, {
      className: 'transposed_variable',
      begin: '[a-zA-Z_][a-zA-Z_0-9]*(\'+[\\.\']*|[\\.\']+)',
      end: '',
      relevance: 0
    }, {
      className: 'matrix',
      begin: '\\[',
      end: '\\]\'*[\\.\']*',
      contains: COMMON_CONTAINS,
      relevance: 0
    }, {
      className: 'cell',
      begin: '\\{',
      contains: COMMON_CONTAINS,
      illegal: /:/,
      variants: [{end: /\}'[\.']*/}, {
        end: /\}/,
        relevance: 0
      }]
    }, {
      className: 'comment',
      begin: '\\%',
      end: '$'
    }].concat(COMMON_CONTAINS)
  };
};


},{}],102:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    keywords: 'int float string vector matrix if else switch case default while do for in break ' + 'continue global proc return about abs addAttr addAttributeEditorNodeHelp addDynamic ' + 'addNewShelfTab addPP addPanelCategory addPrefixToName advanceToNextDrivenKey ' + 'affectedNet affects aimConstraint air alias aliasAttr align alignCtx alignCurve ' + 'alignSurface allViewFit ambientLight angle angleBetween animCone animCurveEditor ' + 'animDisplay animView annotate appendStringArray applicationName applyAttrPreset ' + 'applyTake arcLenDimContext arcLengthDimension arclen arrayMapper art3dPaintCtx ' + 'artAttrCtx artAttrPaintVertexCtx artAttrSkinPaintCtx artAttrTool artBuildPaintMenu ' + 'artFluidAttrCtx artPuttyCtx artSelectCtx artSetPaintCtx artUserPaintCtx assignCommand ' + 'assignInputDevice assignViewportFactories attachCurve attachDeviceAttr attachSurface ' + 'attrColorSliderGrp attrCompatibility attrControlGrp attrEnumOptionMenu ' + 'attrEnumOptionMenuGrp attrFieldGrp attrFieldSliderGrp attrNavigationControlGrp ' + 'attrPresetEditWin attributeExists attributeInfo attributeMenu attributeQuery ' + 'autoKeyframe autoPlace bakeClip bakeFluidShading bakePartialHistory bakeResults ' + 'bakeSimulation basename basenameEx batchRender bessel bevel bevelPlus binMembership ' + 'bindSkin blend2 blendShape blendShapeEditor blendShapePanel blendTwoAttr blindDataType ' + 'boneLattice boundary boxDollyCtx boxZoomCtx bufferCurve buildBookmarkMenu ' + 'buildKeyframeMenu button buttonManip CBG cacheFile cacheFileCombine cacheFileMerge ' + 'cacheFileTrack camera cameraView canCreateManip canvas capitalizeString catch ' + 'catchQuiet ceil changeSubdivComponentDisplayLevel changeSubdivRegion channelBox ' + 'character characterMap characterOutlineEditor characterize chdir checkBox checkBoxGrp ' + 'checkDefaultRenderGlobals choice circle circularFillet clamp clear clearCache clip ' + 'clipEditor clipEditorCurrentTimeCtx clipSchedule clipSchedulerOutliner clipTrimBefore ' + 'closeCurve closeSurface cluster cmdFileOutput cmdScrollFieldExecuter ' + 'cmdScrollFieldReporter cmdShell coarsenSubdivSelectionList collision color ' + 'colorAtPoint colorEditor colorIndex colorIndexSliderGrp colorSliderButtonGrp ' + 'colorSliderGrp columnLayout commandEcho commandLine commandPort compactHairSystem ' + 'componentEditor compositingInterop computePolysetVolume condition cone confirmDialog ' + 'connectAttr connectControl connectDynamic connectJoint connectionInfo constrain ' + 'constrainValue constructionHistory container containsMultibyte contextInfo control ' + 'convertFromOldLayers convertIffToPsd convertLightmap convertSolidTx convertTessellation ' + 'convertUnit copyArray copyFlexor copyKey copySkinWeights cos cpButton cpCache ' + 'cpClothSet cpCollision cpConstraint cpConvClothToMesh cpForces cpGetSolverAttr cpPanel ' + 'cpProperty cpRigidCollisionFilter cpSeam cpSetEdit cpSetSolverAttr cpSolver ' + 'cpSolverTypes cpTool cpUpdateClothUVs createDisplayLayer createDrawCtx createEditor ' + 'createLayeredPsdFile createMotionField createNewShelf createNode createRenderLayer ' + 'createSubdivRegion cross crossProduct ctxAbort ctxCompletion ctxEditMode ctxTraverse ' + 'currentCtx currentTime currentTimeCtx currentUnit curve curveAddPtCtx ' + 'curveCVCtx curveEPCtx curveEditorCtx curveIntersect curveMoveEPCtx curveOnSurface ' + 'curveSketchCtx cutKey cycleCheck cylinder dagPose date defaultLightListCheckBox ' + 'defaultNavigation defineDataServer defineVirtualDevice deformer deg_to_rad delete ' + 'deleteAttr deleteShadingGroupsAndMaterials deleteShelfTab deleteUI deleteUnusedBrushes ' + 'delrandstr detachCurve detachDeviceAttr detachSurface deviceEditor devicePanel dgInfo ' + 'dgdirty dgeval dgtimer dimWhen directKeyCtx directionalLight dirmap dirname disable ' + 'disconnectAttr disconnectJoint diskCache displacementToPoly displayAffected ' + 'displayColor displayCull displayLevelOfDetail displayPref displayRGBColor ' + 'displaySmoothness displayStats displayString displaySurface distanceDimContext ' + 'distanceDimension doBlur dolly dollyCtx dopeSheetEditor dot dotProduct ' + 'doubleProfileBirailSurface drag dragAttrContext draggerContext dropoffLocator ' + 'duplicate duplicateCurve duplicateSurface dynCache dynControl dynExport dynExpression ' + 'dynGlobals dynPaintEditor dynParticleCtx dynPref dynRelEdPanel dynRelEditor ' + 'dynamicLoad editAttrLimits editDisplayLayerGlobals editDisplayLayerMembers ' + 'editRenderLayerAdjustment editRenderLayerGlobals editRenderLayerMembers editor ' + 'editorTemplate effector emit emitter enableDevice encodeString endString endsWith env ' + 'equivalent equivalentTol erf error eval evalDeferred evalEcho event ' + 'exactWorldBoundingBox exclusiveLightCheckBox exec executeForEachObject exists exp ' + 'expression expressionEditorListen extendCurve extendSurface extrude fcheck fclose feof ' + 'fflush fgetline fgetword file fileBrowserDialog fileDialog fileExtension fileInfo ' + 'filetest filletCurve filter filterCurve filterExpand filterStudioImport ' + 'findAllIntersections findAnimCurves findKeyframe findMenuItem findRelatedSkinCluster ' + 'finder firstParentOf fitBspline flexor floatEq floatField floatFieldGrp floatScrollBar ' + 'floatSlider floatSlider2 floatSliderButtonGrp floatSliderGrp floor flow fluidCacheInfo ' + 'fluidEmitter fluidVoxelInfo flushUndo fmod fontDialog fopen formLayout format fprint ' + 'frameLayout fread freeFormFillet frewind fromNativePath fwrite gamma gauss ' + 'geometryConstraint getApplicationVersionAsFloat getAttr getClassification ' + 'getDefaultBrush getFileList getFluidAttr getInputDeviceRange getMayaPanelTypes ' + 'getModifiers getPanel getParticleAttr getPluginResource getenv getpid glRender ' + 'glRenderEditor globalStitch gmatch goal gotoBindPose grabColor gradientControl ' + 'gradientControlNoAttr graphDollyCtx graphSelectContext graphTrackCtx gravity grid ' + 'gridLayout group groupObjectsByName HfAddAttractorToAS HfAssignAS HfBuildEqualMap ' + 'HfBuildFurFiles HfBuildFurImages HfCancelAFR HfConnectASToHF HfCreateAttractor ' + 'HfDeleteAS HfEditAS HfPerformCreateAS HfRemoveAttractorFromAS HfSelectAttached ' + 'HfSelectAttractors HfUnAssignAS hardenPointCurve hardware hardwareRenderPanel ' + 'headsUpDisplay headsUpMessage help helpLine hermite hide hilite hitTest hotBox hotkey ' + 'hotkeyCheck hsv_to_rgb hudButton hudSlider hudSliderButton hwReflectionMap hwRender ' + 'hwRenderLoad hyperGraph hyperPanel hyperShade hypot iconTextButton iconTextCheckBox ' + 'iconTextRadioButton iconTextRadioCollection iconTextScrollList iconTextStaticLabel ' + 'ikHandle ikHandleCtx ikHandleDisplayScale ikSolver ikSplineHandleCtx ikSystem ' + 'ikSystemInfo ikfkDisplayMethod illustratorCurves image imfPlugins inheritTransform ' + 'insertJoint insertJointCtx insertKeyCtx insertKnotCurve insertKnotSurface instance ' + 'instanceable instancer intField intFieldGrp intScrollBar intSlider intSliderGrp ' + 'interToUI internalVar intersect iprEngine isAnimCurve isConnected isDirty isParentOf ' + 'isSameObject isTrue isValidObjectName isValidString isValidUiName isolateSelect ' + 'itemFilter itemFilterAttr itemFilterRender itemFilterType joint jointCluster jointCtx ' + 'jointDisplayScale jointLattice keyTangent keyframe keyframeOutliner ' + 'keyframeRegionCurrentTimeCtx keyframeRegionDirectKeyCtx keyframeRegionDollyCtx ' + 'keyframeRegionInsertKeyCtx keyframeRegionMoveKeyCtx keyframeRegionScaleKeyCtx ' + 'keyframeRegionSelectKeyCtx keyframeRegionSetKeyCtx keyframeRegionTrackCtx ' + 'keyframeStats lassoContext lattice latticeDeformKeyCtx launch launchImageEditor ' + 'layerButton layeredShaderPort layeredTexturePort layout layoutDialog lightList ' + 'lightListEditor lightListPanel lightlink lineIntersection linearPrecision linstep ' + 'listAnimatable listAttr listCameras listConnections listDeviceAttachments listHistory ' + 'listInputDeviceAxes listInputDeviceButtons listInputDevices listMenuAnnotation ' + 'listNodeTypes listPanelCategories listRelatives listSets listTransforms ' + 'listUnselected listerEditor loadFluid loadNewShelf loadPlugin ' + 'loadPluginLanguageResources loadPrefObjects localizedPanelLabel lockNode loft log ' + 'longNameOf lookThru ls lsThroughFilter lsType lsUI Mayatomr mag makeIdentity makeLive ' + 'makePaintable makeRoll makeSingleSurface makeTubeOn makebot manipMoveContext ' + 'manipMoveLimitsCtx manipOptions manipRotateContext manipRotateLimitsCtx ' + 'manipScaleContext manipScaleLimitsCtx marker match max memory menu menuBarLayout ' + 'menuEditor menuItem menuItemToShelf menuSet menuSetPref messageLine min minimizeApp ' + 'mirrorJoint modelCurrentTimeCtx modelEditor modelPanel mouse movIn movOut move ' + 'moveIKtoFK moveKeyCtx moveVertexAlongDirection multiProfileBirailSurface mute ' + 'nParticle nameCommand nameField namespace namespaceInfo newPanelItems newton nodeCast ' + 'nodeIconButton nodeOutliner nodePreset nodeType noise nonLinear normalConstraint ' + 'normalize nurbsBoolean nurbsCopyUVSet nurbsCube nurbsEditUV nurbsPlane nurbsSelect ' + 'nurbsSquare nurbsToPoly nurbsToPolygonsPref nurbsToSubdiv nurbsToSubdivPref ' + 'nurbsUVSet nurbsViewDirectionVector objExists objectCenter objectLayer objectType ' + 'objectTypeUI obsoleteProc oceanNurbsPreviewPlane offsetCurve offsetCurveOnSurface ' + 'offsetSurface openGLExtension openMayaPref optionMenu optionMenuGrp optionVar orbit ' + 'orbitCtx orientConstraint outlinerEditor outlinerPanel overrideModifier ' + 'paintEffectsDisplay pairBlend palettePort paneLayout panel panelConfiguration ' + 'panelHistory paramDimContext paramDimension paramLocator parent parentConstraint ' + 'particle particleExists particleInstancer particleRenderInfo partition pasteKey ' + 'pathAnimation pause pclose percent performanceOptions pfxstrokes pickWalk picture ' + 'pixelMove planarSrf plane play playbackOptions playblast plugAttr plugNode pluginInfo ' + 'pluginResourceUtil pointConstraint pointCurveConstraint pointLight pointMatrixMult ' + 'pointOnCurve pointOnSurface pointPosition poleVectorConstraint polyAppend ' + 'polyAppendFacetCtx polyAppendVertex polyAutoProjection polyAverageNormal ' + 'polyAverageVertex polyBevel polyBlendColor polyBlindData polyBoolOp polyBridgeEdge ' + 'polyCacheMonitor polyCheck polyChipOff polyClipboard polyCloseBorder polyCollapseEdge ' + 'polyCollapseFacet polyColorBlindData polyColorDel polyColorPerVertex polyColorSet ' + 'polyCompare polyCone polyCopyUV polyCrease polyCreaseCtx polyCreateFacet ' + 'polyCreateFacetCtx polyCube polyCut polyCutCtx polyCylinder polyCylindricalProjection ' + 'polyDelEdge polyDelFacet polyDelVertex polyDuplicateAndConnect polyDuplicateEdge ' + 'polyEditUV polyEditUVShell polyEvaluate polyExtrudeEdge polyExtrudeFacet ' + 'polyExtrudeVertex polyFlipEdge polyFlipUV polyForceUV polyGeoSampler polyHelix ' + 'polyInfo polyInstallAction polyLayoutUV polyListComponentConversion polyMapCut ' + 'polyMapDel polyMapSew polyMapSewMove polyMergeEdge polyMergeEdgeCtx polyMergeFacet ' + 'polyMergeFacetCtx polyMergeUV polyMergeVertex polyMirrorFace polyMoveEdge ' + 'polyMoveFacet polyMoveFacetUV polyMoveUV polyMoveVertex polyNormal polyNormalPerVertex ' + 'polyNormalizeUV polyOptUvs polyOptions polyOutput polyPipe polyPlanarProjection ' + 'polyPlane polyPlatonicSolid polyPoke polyPrimitive polyPrism polyProjection ' + 'polyPyramid polyQuad polyQueryBlindData polyReduce polySelect polySelectConstraint ' + 'polySelectConstraintMonitor polySelectCtx polySelectEditCtx polySeparate ' + 'polySetToFaceNormal polySewEdge polyShortestPathCtx polySmooth polySoftEdge ' + 'polySphere polySphericalProjection polySplit polySplitCtx polySplitEdge polySplitRing ' + 'polySplitVertex polyStraightenUVBorder polySubdivideEdge polySubdivideFacet ' + 'polyToSubdiv polyTorus polyTransfer polyTriangulate polyUVSet polyUnite polyWedgeFace ' + 'popen popupMenu pose pow preloadRefEd print progressBar progressWindow projFileViewer ' + 'projectCurve projectTangent projectionContext projectionManip promptDialog propModCtx ' + 'propMove psdChannelOutliner psdEditTextureFile psdExport psdTextureFile putenv pwd ' + 'python querySubdiv quit rad_to_deg radial radioButton radioButtonGrp radioCollection ' + 'radioMenuItemCollection rampColorPort rand randomizeFollicles randstate rangeControl ' + 'readTake rebuildCurve rebuildSurface recordAttr recordDevice redo reference ' + 'referenceEdit referenceQuery refineSubdivSelectionList refresh refreshAE ' + 'registerPluginResource rehash reloadImage removeJoint removeMultiInstance ' + 'removePanelCategory rename renameAttr renameSelectionList renameUI render ' + 'renderGlobalsNode renderInfo renderLayerButton renderLayerParent ' + 'renderLayerPostProcess renderLayerUnparent renderManip renderPartition ' + 'renderQualityNode renderSettings renderThumbnailUpdate renderWindowEditor ' + 'renderWindowSelectContext renderer reorder reorderDeformers requires reroot ' + 'resampleFluid resetAE resetPfxToPolyCamera resetTool resolutionNode retarget ' + 'reverseCurve reverseSurface revolve rgb_to_hsv rigidBody rigidSolver roll rollCtx ' + 'rootOf rot rotate rotationInterpolation roundConstantRadius rowColumnLayout rowLayout ' + 'runTimeCommand runup sampleImage saveAllShelves saveAttrPreset saveFluid saveImage ' + 'saveInitialState saveMenu savePrefObjects savePrefs saveShelf saveToolSettings scale ' + 'scaleBrushBrightness scaleComponents scaleConstraint scaleKey scaleKeyCtx sceneEditor ' + 'sceneUIReplacement scmh scriptCtx scriptEditorInfo scriptJob scriptNode scriptTable ' + 'scriptToShelf scriptedPanel scriptedPanelType scrollField scrollLayout sculpt ' + 'searchPathArray seed selLoadSettings select selectContext selectCurveCV selectKey ' + 'selectKeyCtx selectKeyframeRegionCtx selectMode selectPref selectPriority selectType ' + 'selectedNodes selectionConnection separator setAttr setAttrEnumResource ' + 'setAttrMapping setAttrNiceNameResource setConstraintRestPosition ' + 'setDefaultShadingGroup setDrivenKeyframe setDynamic setEditCtx setEditor setFluidAttr ' + 'setFocus setInfinity setInputDeviceMapping setKeyCtx setKeyPath setKeyframe ' + 'setKeyframeBlendshapeTargetWts setMenuMode setNodeNiceNameResource setNodeTypeFlag ' + 'setParent setParticleAttr setPfxToPolyCamera setPluginResource setProject ' + 'setStampDensity setStartupMessage setState setToolTo setUITemplate setXformManip sets ' + 'shadingConnection shadingGeometryRelCtx shadingLightRelCtx shadingNetworkCompare ' + 'shadingNode shapeCompare shelfButton shelfLayout shelfTabLayout shellField ' + 'shortNameOf showHelp showHidden showManipCtx showSelectionInTitle ' + 'showShadingGroupAttrEditor showWindow sign simplify sin singleProfileBirailSurface ' + 'size sizeBytes skinCluster skinPercent smoothCurve smoothTangentSurface smoothstep ' + 'snap2to2 snapKey snapMode snapTogetherCtx snapshot soft softMod softModCtx sort sound ' + 'soundControl source spaceLocator sphere sphrand spotLight spotLightPreviewPort ' + 'spreadSheetEditor spring sqrt squareSurface srtContext stackTrace startString ' + 'startsWith stitchAndExplodeShell stitchSurface stitchSurfacePoints strcmp ' + 'stringArrayCatenate stringArrayContains stringArrayCount stringArrayInsertAtIndex ' + 'stringArrayIntersector stringArrayRemove stringArrayRemoveAtIndex ' + 'stringArrayRemoveDuplicates stringArrayRemoveExact stringArrayToString ' + 'stringToStringArray strip stripPrefixFromName stroke subdAutoProjection ' + 'subdCleanTopology subdCollapse subdDuplicateAndConnect subdEditUV ' + 'subdListComponentConversion subdMapCut subdMapSewMove subdMatchTopology subdMirror ' + 'subdToBlind subdToPoly subdTransferUVsToCache subdiv subdivCrease ' + 'subdivDisplaySmoothness substitute substituteAllString substituteGeometry substring ' + 'surface surfaceSampler surfaceShaderList swatchDisplayPort switchTable symbolButton ' + 'symbolCheckBox sysFile system tabLayout tan tangentConstraint texLatticeDeformContext ' + 'texManipContext texMoveContext texMoveUVShellContext texRotateContext texScaleContext ' + 'texSelectContext texSelectShortestPathCtx texSmudgeUVContext texWinToolCtx text ' + 'textCurves textField textFieldButtonGrp textFieldGrp textManip textScrollList ' + 'textToShelf textureDisplacePlane textureHairColor texturePlacementContext ' + 'textureWindow threadCount threePointArcCtx timeControl timePort timerX toNativePath ' + 'toggle toggleAxis toggleWindowVisibility tokenize tokenizeList tolerance tolower ' + 'toolButton toolCollection toolDropped toolHasOptions toolPropertyWindow torus toupper ' + 'trace track trackCtx transferAttributes transformCompare transformLimits translator ' + 'trim trunc truncateFluidCache truncateHairCache tumble tumbleCtx turbulence ' + 'twoPointArcCtx uiRes uiTemplate unassignInputDevice undo undoInfo ungroup uniform unit ' + 'unloadPlugin untangleUV untitledFileName untrim upAxis updateAE userCtx uvLink ' + 'uvSnapshot validateShelfName vectorize view2dToolCtx viewCamera viewClipPlane ' + 'viewFit viewHeadOn viewLookAt viewManip viewPlace viewSet visor volumeAxis vortex ' + 'waitCursor warning webBrowser webBrowserPrefs whatIs window windowPref wire ' + 'wireContext workspace wrinkle wrinkleContext writeTake xbmLangPathList xform',
    illegal: '</',
    contains: [hljs.C_NUMBER_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, {
      className: 'string',
      begin: '`',
      end: '`',
      contains: [hljs.BACKSLASH_ESCAPE]
    }, {
      className: 'variable',
      variants: [{begin: '\\$\\d'}, {begin: '[\\$\\%\\@](\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)'}, {
        begin: '\\*(\\^\\w\\b|#\\w+|[^\\s\\w{]|{\\w+}|\\w+)',
        relevance: 0
      }]
    }, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE]
  };
};


},{}],103:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    keywords: ["environ vocabularies notations constructors definitions registrations theorems schemes requirements", "begin end definition registration cluster existence pred func defpred deffunc theorem proof", "let take assume then thus hence ex for st holds consider reconsider such that and in provided of as from", "be being by means equals implies iff redefine define now not or attr is mode suppose per cases set", "thesis contradiction scheme reserve struct", "correctness compatibility coherence symmetry assymetry reflexivity irreflexivity", "connectedness uniqueness commutativity idempotence involutiveness projectivity"].join(" "),
    contains: [{
      className: "comment",
      begin: "::",
      end: "$"
    }]
  };
};


},{}],104:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var NUMBER = {variants: [{
      className: 'number',
      begin: '[$][a-fA-F0-9]+'
    }, hljs.NUMBER_MODE]};
  return {
    case_insensitive: true,
    keywords: {
      keyword: 'public private property continue exit extern new try catch ' + 'eachin not abstract final select case default const local global field ' + 'end if then else elseif endif while wend repeat until forever for to step next return module inline throw',
      built_in: 'DebugLog DebugStop Error Print ACos ACosr ASin ASinr ATan ATan2 ATan2r ATanr Abs Abs Ceil ' + 'Clamp Clamp Cos Cosr Exp Floor Log Max Max Min Min Pow Sgn Sgn Sin Sinr Sqrt Tan Tanr Seed PI HALFPI TWOPI',
      literal: 'true false null and or shl shr mod'
    },
    contains: [{
      className: 'comment',
      begin: '#rem',
      end: '#end'
    }, {
      className: 'comment',
      begin: "'",
      end: '$',
      relevance: 0
    }, {
      className: 'function',
      beginKeywords: 'function method',
      end: '[(=:]|$',
      illegal: /\n/,
      contains: [hljs.UNDERSCORE_TITLE_MODE]
    }, {
      className: 'class',
      beginKeywords: 'class interface',
      end: '$',
      contains: [{beginKeywords: 'extends implements'}, hljs.UNDERSCORE_TITLE_MODE]
    }, {
      className: 'variable',
      begin: '\\b(self|super)\\b'
    }, {
      className: 'preprocessor',
      beginKeywords: 'import',
      end: '$'
    }, {
      className: 'preprocessor',
      begin: '\\s*#',
      end: '$',
      keywords: 'if else elseif endif end then'
    }, {
      className: 'pi',
      begin: '^\\s*strict\\b'
    }, {
      beginKeywords: 'alias',
      end: '=',
      contains: [hljs.UNDERSCORE_TITLE_MODE]
    }, hljs.QUOTE_STRING_MODE, NUMBER]
  };
};


},{}],105:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var VAR = {
    className: 'variable',
    variants: [{begin: /\$\d+/}, {
      begin: /\$\{/,
      end: /}/
    }, {begin: '[\\$\\@]' + hljs.UNDERSCORE_IDENT_RE}]
  };
  var DEFAULT = {
    endsWithParent: true,
    lexemes: '[a-z/_]+',
    keywords: {built_in: 'on off yes no true false none blocked debug info notice warn error crit ' + 'select break last permanent redirect kqueue rtsig epoll poll /dev/poll'},
    relevance: 0,
    illegal: '=>',
    contains: [hljs.HASH_COMMENT_MODE, {
      className: 'string',
      contains: [hljs.BACKSLASH_ESCAPE, VAR],
      variants: [{
        begin: /"/,
        end: /"/
      }, {
        begin: /'/,
        end: /'/
      }]
    }, {
      className: 'url',
      begin: '([a-z]+):/',
      end: '\\s',
      endsWithParent: true,
      excludeEnd: true,
      contains: [VAR]
    }, {
      className: 'regexp',
      contains: [hljs.BACKSLASH_ESCAPE, VAR],
      variants: [{
        begin: "\\s\\^",
        end: "\\s|{|;",
        returnEnd: true
      }, {
        begin: "~\\*?\\s+",
        end: "\\s|{|;",
        returnEnd: true
      }, {begin: "\\*(\\.[a-z\\-]+)+"}, {begin: "([a-z\\-]+\\.)+\\*"}]
    }, {
      className: 'number',
      begin: '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}(:\\d{1,5})?\\b'
    }, {
      className: 'number',
      begin: '\\b\\d+[kKmMgGdshdwy]*\\b',
      relevance: 0
    }, VAR]
  };
  return {
    aliases: ['nginxconf'],
    contains: [hljs.HASH_COMMENT_MODE, {
      begin: hljs.UNDERSCORE_IDENT_RE + '\\s',
      end: ';|{',
      returnBegin: true,
      contains: [{
        className: 'title',
        begin: hljs.UNDERSCORE_IDENT_RE,
        starts: DEFAULT
      }],
      relevance: 0
    }],
    illegal: '[^\\s\\}]'
  };
};


},{}],106:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    keywords: {
      keyword: 'addr and as asm bind block break|0 case|0 cast const|0 continue|0 converter discard distinct|10 div do elif else|0 end|0 enum|0 except export finally for from generic if|0 import|0 in include|0 interface is isnot|10 iterator|10 let|0 macro method|10 mixin mod nil not notin|10 object|0 of or out proc|10 ptr raise ref|10 return shl shr static template|10 try|0 tuple type|0 using|0 var|0 when while|0 with without xor yield',
      literal: 'shared guarded stdin stdout stderr result|10 true false'
    },
    contains: [{
      className: 'decorator',
      begin: /{\./,
      end: /\.}/,
      relevance: 10
    }, {
      className: 'string',
      begin: /[a-zA-Z]\w*"/,
      end: /"/,
      contains: [{begin: /""/}]
    }, {
      className: 'string',
      begin: /([a-zA-Z]\w*)?"""/,
      end: /"""/
    }, {
      className: 'string',
      begin: /"/,
      end: /"/,
      illegal: /\n/,
      contains: [{begin: /\\./}]
    }, {
      className: 'type',
      begin: /\b[A-Z]\w+\b/,
      relevance: 0
    }, {
      className: 'type',
      begin: /\b(int|int8|int16|int32|int64|uint|uint8|uint16|uint32|uint64|float|float32|float64|bool|char|string|cstring|pointer|expr|stmt|void|auto|any|range|array|openarray|varargs|seq|set|clong|culong|cchar|cschar|cshort|cint|csize|clonglong|cfloat|cdouble|clongdouble|cuchar|cushort|cuint|culonglong|cstringarray|semistatic)\b/
    }, {
      className: 'number',
      begin: /\b(0[xX][0-9a-fA-F][_0-9a-fA-F]*)('?[iIuU](8|16|32|64))?/,
      relevance: 0
    }, {
      className: 'number',
      begin: /\b(0o[0-7][_0-7]*)('?[iIuUfF](8|16|32|64))?/,
      relevance: 0
    }, {
      className: 'number',
      begin: /\b(0(b|B)[01][_01]*)('?[iIuUfF](8|16|32|64))?/,
      relevance: 0
    }, {
      className: 'number',
      begin: /\b(\d[_\d]*)('?[iIuUfF](8|16|32|64))?/,
      relevance: 0
    }, hljs.HASH_COMMENT_MODE]
  };
};


},{}],107:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var NIX_KEYWORDS = {
    keyword: 'rec with let in inherit assert if else then',
    constant: 'true false or and null',
    built_in: 'import abort baseNameOf dirOf isNull builtins map removeAttrs throw toString derivation'
  };
  var ANTIQUOTE = {
    className: 'subst',
    begin: /\$\{/,
    end: /\}/,
    keywords: NIX_KEYWORDS
  };
  var ATTRS = {
    className: 'variable',
    begin: /[a-zA-Z0-9-_]+(\s*=)/
  };
  var SINGLE_QUOTE = {
    className: 'string',
    begin: "''",
    end: "''",
    contains: [ANTIQUOTE]
  };
  var DOUBLE_QUOTE = {
    className: 'string',
    begin: '"',
    end: '"',
    contains: [ANTIQUOTE]
  };
  var EXPRESSIONS = [hljs.NUMBER_MODE, hljs.HASH_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, SINGLE_QUOTE, DOUBLE_QUOTE, ATTRS];
  ANTIQUOTE.contains = EXPRESSIONS;
  return {
    aliases: ["nixos"],
    keywords: NIX_KEYWORDS,
    contains: EXPRESSIONS
  };
};


},{}],108:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var CONSTANTS = {
    className: 'symbol',
    begin: '\\$(ADMINTOOLS|APPDATA|CDBURN_AREA|CMDLINE|COMMONFILES32|COMMONFILES64|COMMONFILES|COOKIES|DESKTOP|DOCUMENTS|EXEDIR|EXEFILE|EXEPATH|FAVORITES|FONTS|HISTORY|HWNDPARENT|INSTDIR|INTERNET_CACHE|LANGUAGE|LOCALAPPDATA|MUSIC|NETHOOD|OUTDIR|PICTURES|PLUGINSDIR|PRINTHOOD|PROFILE|PROGRAMFILES32|PROGRAMFILES64|PROGRAMFILES|QUICKLAUNCH|RECENT|RESOURCES_LOCALIZED|RESOURCES|SENDTO|SMPROGRAMS|SMSTARTUP|STARTMENU|SYSDIR|TEMP|TEMPLATES|VIDEOS|WINDIR)'
  };
  var DEFINES = {
    className: 'constant',
    begin: '\\$+{[a-zA-Z0-9_]+}'
  };
  var VARIABLES = {
    className: 'variable',
    begin: '\\$+[a-zA-Z0-9_]+',
    illegal: '\\(\\){}'
  };
  var LANGUAGES = {
    className: 'constant',
    begin: '\\$+\\([a-zA-Z0-9_]+\\)'
  };
  var PARAMETERS = {
    className: 'params',
    begin: '(ARCHIVE|FILE_ATTRIBUTE_ARCHIVE|FILE_ATTRIBUTE_NORMAL|FILE_ATTRIBUTE_OFFLINE|FILE_ATTRIBUTE_READONLY|FILE_ATTRIBUTE_SYSTEM|FILE_ATTRIBUTE_TEMPORARY|HKCR|HKCU|HKDD|HKEY_CLASSES_ROOT|HKEY_CURRENT_CONFIG|HKEY_CURRENT_USER|HKEY_DYN_DATA|HKEY_LOCAL_MACHINE|HKEY_PERFORMANCE_DATA|HKEY_USERS|HKLM|HKPD|HKU|IDABORT|IDCANCEL|IDIGNORE|IDNO|IDOK|IDRETRY|IDYES|MB_ABORTRETRYIGNORE|MB_DEFBUTTON1|MB_DEFBUTTON2|MB_DEFBUTTON3|MB_DEFBUTTON4|MB_ICONEXCLAMATION|MB_ICONINFORMATION|MB_ICONQUESTION|MB_ICONSTOP|MB_OK|MB_OKCANCEL|MB_RETRYCANCEL|MB_RIGHT|MB_RTLREADING|MB_SETFOREGROUND|MB_TOPMOST|MB_USERICON|MB_YESNO|NORMAL|OFFLINE|READONLY|SHCTX|SHELL_CONTEXT|SYSTEM|TEMPORARY)'
  };
  var COMPILER = {
    className: 'constant',
    begin: '\\!(addincludedir|addplugindir|appendfile|cd|define|delfile|echo|else|endif|error|execute|finalize|getdllversionsystem|ifdef|ifmacrodef|ifmacrondef|ifndef|if|include|insertmacro|macroend|macro|packhdr|searchparse|searchreplace|tempfile|undef|verbose|warning)'
  };
  return {
    case_insensitive: false,
    keywords: {
      keyword: 'Abort AddBrandingImage AddSize AllowRootDirInstall AllowSkipFiles AutoCloseWindow BGFont BGGradient BrandingText BringToFront Call CallInstDLL Caption ChangeUI CheckBitmap ClearErrors CompletedText ComponentText CopyFiles CRCCheck CreateDirectory CreateFont CreateShortCut Delete DeleteINISec DeleteINIStr DeleteRegKey DeleteRegValue DetailPrint DetailsButtonText DirText DirVar DirVerify EnableWindow EnumRegKey EnumRegValue Exch Exec ExecShell ExecWait ExpandEnvStrings File FileBufSize FileClose FileErrorText FileOpen FileRead FileReadByte FileReadUTF16LE FileReadWord FileSeek FileWrite FileWriteByte FileWriteUTF16LE FileWriteWord FindClose FindFirst FindNext FindWindow FlushINI FunctionEnd GetCurInstType GetCurrentAddress GetDlgItem GetDLLVersion GetDLLVersionLocal GetErrorLevel GetFileTime GetFileTimeLocal GetFullPathName GetFunctionAddress GetInstDirError GetLabelAddress GetTempFileName Goto HideWindow Icon IfAbort IfErrors IfFileExists IfRebootFlag IfSilent InitPluginsDir InstallButtonText InstallColors InstallDir InstallDirRegKey InstProgressFlags InstType InstTypeGetText InstTypeSetText IntCmp IntCmpU IntFmt IntOp IsWindow LangString LicenseBkColor LicenseData LicenseForceSelection LicenseLangString LicenseText LoadLanguageFile LockWindow LogSet LogText ManifestDPIAware ManifestSupportedOS MessageBox MiscButtonText Name Nop OutFile Page PageCallbacks PageExEnd Pop Push Quit ReadEnvStr ReadINIStr ReadRegDWORD ReadRegStr Reboot RegDLL Rename RequestExecutionLevel ReserveFile Return RMDir SearchPath SectionEnd SectionGetFlags SectionGetInstTypes SectionGetSize SectionGetText SectionGroupEnd SectionIn SectionSetFlags SectionSetInstTypes SectionSetSize SectionSetText SendMessage SetAutoClose SetBrandingImage SetCompress SetCompressor SetCompressorDictSize SetCtlColors SetCurInstType SetDatablockOptimize SetDateSave SetDetailsPrint SetDetailsView SetErrorLevel SetErrors SetFileAttributes SetFont SetOutPath SetOverwrite SetPluginUnload SetRebootFlag SetRegView SetShellVarContext SetSilent ShowInstDetails ShowUninstDetails ShowWindow SilentInstall SilentUnInstall Sleep SpaceTexts StrCmp StrCmpS StrCpy StrLen SubCaption SubSectionEnd Unicode UninstallButtonText UninstallCaption UninstallIcon UninstallSubCaption UninstallText UninstPage UnRegDLL Var VIAddVersionKey VIFileVersion VIProductVersion WindowIcon WriteINIStr WriteRegBin WriteRegDWORD WriteRegExpandStr WriteRegStr WriteUninstaller XPStyle',
      literal: 'admin all auto both colored current false force hide highest lastused leave listonly none normal notset off on open print show silent silentlog smooth textonly true user '
    },
    contains: [hljs.HASH_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, {
      className: 'string',
      begin: '"',
      end: '"',
      illegal: '\\n',
      contains: [{
        className: 'symbol',
        begin: '\\$(\\\\(n|r|t)|\\$)'
      }, CONSTANTS, DEFINES, VARIABLES, LANGUAGES]
    }, {
      className: 'comment',
      begin: ';',
      end: '$',
      relevance: 0
    }, {
      className: 'function',
      beginKeywords: 'Function PageEx Section SectionGroup SubSection',
      end: '$'
    }, COMPILER, DEFINES, VARIABLES, LANGUAGES, PARAMETERS, hljs.NUMBER_MODE, {
      className: 'literal',
      begin: hljs.IDENT_RE + '::' + hljs.IDENT_RE
    }]
  };
};


},{}],109:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var OBJC_KEYWORDS = {
    keyword: 'int float while char export sizeof typedef const struct for union ' + 'unsigned long volatile static bool mutable if do return goto void ' + 'enum else break extern asm case short default double register explicit ' + 'signed typename this switch continue wchar_t inline readonly assign ' + 'readwrite self @synchronized id typeof ' + 'nonatomic super unichar IBOutlet IBAction strong weak copy ' + 'in out inout bycopy byref oneway __strong __weak __block __autoreleasing ' + '@private @protected @public @try @property @end @throw @catch @finally ' + '@autoreleasepool @synthesize @dynamic @selector @optional @required',
    literal: 'false true FALSE TRUE nil YES NO NULL',
    built_in: 'NSString NSData NSDictionary CGRect CGPoint UIButton UILabel UITextView UIWebView MKMapView ' + 'NSView NSViewController NSWindow NSWindowController NSSet NSUUID NSIndexSet ' + 'UISegmentedControl NSObject UITableViewDelegate UITableViewDataSource NSThread ' + 'UIActivityIndicator UITabbar UIToolBar UIBarButtonItem UIImageView NSAutoreleasePool ' + 'UITableView BOOL NSInteger CGFloat NSException NSLog NSMutableString NSMutableArray ' + 'NSMutableDictionary NSURL NSIndexPath CGSize UITableViewCell UIView UIViewController ' + 'UINavigationBar UINavigationController UITabBarController UIPopoverController ' + 'UIPopoverControllerDelegate UIImage NSNumber UISearchBar NSFetchedResultsController ' + 'NSFetchedResultsChangeType UIScrollView UIScrollViewDelegate UIEdgeInsets UIColor ' + 'UIFont UIApplication NSNotFound NSNotificationCenter NSNotification ' + 'UILocalNotification NSBundle NSFileManager NSTimeInterval NSDate NSCalendar ' + 'NSUserDefaults UIWindow NSRange NSArray NSError NSURLRequest NSURLConnection ' + 'NSURLSession NSURLSessionDataTask NSURLSessionDownloadTask NSURLSessionUploadTask NSURLResponse' + 'UIInterfaceOrientation MPMoviePlayerController dispatch_once_t ' + 'dispatch_queue_t dispatch_sync dispatch_async dispatch_once'
  };
  var LEXEMES = /[a-zA-Z@][a-zA-Z0-9_]*/;
  var CLASS_KEYWORDS = '@interface @class @protocol @implementation';
  return {
    aliases: ['m', 'mm', 'objc', 'obj-c'],
    keywords: OBJC_KEYWORDS,
    lexemes: LEXEMES,
    illegal: '</',
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.C_NUMBER_MODE, hljs.QUOTE_STRING_MODE, {
      className: 'string',
      variants: [{
        begin: '@"',
        end: '"',
        illegal: '\\n',
        contains: [hljs.BACKSLASH_ESCAPE]
      }, {
        begin: '\'',
        end: '[^\\\\]\'',
        illegal: '[^\\\\][^\']'
      }]
    }, {
      className: 'preprocessor',
      begin: '#',
      end: '$',
      contains: [{
        className: 'title',
        variants: [{
          begin: '\"',
          end: '\"'
        }, {
          begin: '<',
          end: '>'
        }]
      }]
    }, {
      className: 'class',
      begin: '(' + CLASS_KEYWORDS.split(' ').join('|') + ')\\b',
      end: '({|$)',
      excludeEnd: true,
      keywords: CLASS_KEYWORDS,
      lexemes: LEXEMES,
      contains: [hljs.UNDERSCORE_TITLE_MODE]
    }, {
      className: 'variable',
      begin: '\\.' + hljs.UNDERSCORE_IDENT_RE,
      relevance: 0
    }]
  };
};


},{}],110:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    aliases: ['ml'],
    keywords: {
      keyword: 'and as assert asr begin class constraint do done downto else end ' + 'exception external false for fun function functor if in include ' + 'inherit initializer land lazy let lor lsl lsr lxor match method ' + 'mod module mutable new object of open or private rec ref sig struct ' + 'then to true try type val virtual when while with parser value',
      built_in: 'bool char float int list unit array exn option int32 int64 nativeint ' + 'format4 format6 lazy_t in_channel out_channel string'
    },
    illegal: /\/\//,
    contains: [{
      className: 'string',
      begin: '"""',
      end: '"""'
    }, {
      className: 'comment',
      begin: '\\(\\*',
      end: '\\*\\)',
      contains: ['self']
    }, {
      className: 'class',
      beginKeywords: 'type',
      end: '\\(|=|$',
      excludeEnd: true,
      contains: [hljs.UNDERSCORE_TITLE_MODE]
    }, {
      className: 'annotation',
      begin: '\\[<',
      end: '>\\]'
    }, hljs.C_BLOCK_COMMENT_MODE, hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}), hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}), hljs.C_NUMBER_MODE]
  };
};


},{}],111:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var OXYGENE_KEYWORDS = 'abstract add and array as asc aspect assembly async begin break block by case class concat const copy constructor continue ' + 'create default delegate desc distinct div do downto dynamic each else empty end ensure enum equals event except exit extension external false ' + 'final finalize finalizer finally flags for forward from function future global group has if implementation implements implies in index inherited ' + 'inline interface into invariants is iterator join locked locking loop matching method mod module namespace nested new nil not notify nullable of ' + 'old on operator or order out override parallel params partial pinned private procedure property protected public queryable raise read readonly ' + 'record reintroduce remove repeat require result reverse sealed select self sequence set shl shr skip static step soft take then to true try tuple ' + 'type union unit unsafe until uses using var virtual raises volatile where while with write xor yield await mapped deprecated stdcall cdecl pascal ' + 'register safecall overload library platform reference packed strict published autoreleasepool selector strong weak unretained';
  var CURLY_COMMENT = {
    className: 'comment',
    begin: '{',
    end: '}',
    relevance: 0
  };
  var PAREN_COMMENT = {
    className: 'comment',
    begin: '\\(\\*',
    end: '\\*\\)',
    relevance: 10
  };
  var STRING = {
    className: 'string',
    begin: '\'',
    end: '\'',
    contains: [{begin: '\'\''}]
  };
  var CHAR_STRING = {
    className: 'string',
    begin: '(#\\d+)+'
  };
  var FUNCTION = {
    className: 'function',
    beginKeywords: 'function constructor destructor procedure method',
    end: '[:;]',
    keywords: 'function constructor|10 destructor|10 procedure|10 method|10',
    contains: [hljs.TITLE_MODE, {
      className: 'params',
      begin: '\\(',
      end: '\\)',
      keywords: OXYGENE_KEYWORDS,
      contains: [STRING, CHAR_STRING]
    }, CURLY_COMMENT, PAREN_COMMENT]
  };
  return {
    case_insensitive: true,
    keywords: OXYGENE_KEYWORDS,
    illegal: '("|\\$[G-Zg-z]|\\/\\*|</)',
    contains: [CURLY_COMMENT, PAREN_COMMENT, hljs.C_LINE_COMMENT_MODE, STRING, CHAR_STRING, hljs.NUMBER_MODE, FUNCTION, {
      className: 'class',
      begin: '=\\bclass\\b',
      end: 'end;',
      keywords: OXYGENE_KEYWORDS,
      contains: [STRING, CHAR_STRING, CURLY_COMMENT, PAREN_COMMENT, hljs.C_LINE_COMMENT_MODE, FUNCTION]
    }]
  };
};


},{}],112:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    subLanguage: 'xml',
    relevance: 0,
    contains: [{
      className: 'comment',
      begin: '^#',
      end: '$'
    }, {
      className: 'comment',
      begin: '\\^rem{',
      end: '}',
      relevance: 10,
      contains: [{
        begin: '{',
        end: '}',
        contains: ['self']
      }]
    }, {
      className: 'preprocessor',
      begin: '^@(?:BASE|USE|CLASS|OPTIONS)$',
      relevance: 10
    }, {
      className: 'title',
      begin: '@[\\w\\-]+\\[[\\w^;\\-]*\\](?:\\[[\\w^;\\-]*\\])?(?:.*)$'
    }, {
      className: 'variable',
      begin: '\\$\\{?[\\w\\-\\.\\:]+\\}?'
    }, {
      className: 'keyword',
      begin: '\\^[\\w\\-\\.\\:]+'
    }, {
      className: 'number',
      begin: '\\^#[0-9a-fA-F]+'
    }, hljs.C_NUMBER_MODE]
  };
};


},{}],113:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var PERL_KEYWORDS = 'getpwent getservent quotemeta msgrcv scalar kill dbmclose undef lc ' + 'ma syswrite tr send umask sysopen shmwrite vec qx utime local oct semctl localtime ' + 'readpipe do return format read sprintf dbmopen pop getpgrp not getpwnam rewinddir qq' + 'fileno qw endprotoent wait sethostent bless s|0 opendir continue each sleep endgrent ' + 'shutdown dump chomp connect getsockname die socketpair close flock exists index shmget' + 'sub for endpwent redo lstat msgctl setpgrp abs exit select print ref gethostbyaddr ' + 'unshift fcntl syscall goto getnetbyaddr join gmtime symlink semget splice x|0 ' + 'getpeername recv log setsockopt cos last reverse gethostbyname getgrnam study formline ' + 'endhostent times chop length gethostent getnetent pack getprotoent getservbyname rand ' + 'mkdir pos chmod y|0 substr endnetent printf next open msgsnd readdir use unlink ' + 'getsockopt getpriority rindex wantarray hex system getservbyport endservent int chr ' + 'untie rmdir prototype tell listen fork shmread ucfirst setprotoent else sysseek link ' + 'getgrgid shmctl waitpid unpack getnetbyname reset chdir grep split require caller ' + 'lcfirst until warn while values shift telldir getpwuid my getprotobynumber delete and ' + 'sort uc defined srand accept package seekdir getprotobyname semop our rename seek if q|0 ' + 'chroot sysread setpwent no crypt getc chown sqrt write setnetent setpriority foreach ' + 'tie sin msgget map stat getlogin unless elsif truncate exec keys glob tied closedir' + 'ioctl socket readlink eval xor readline binmode setservent eof ord bind alarm pipe ' + 'atan2 getgrent exp time push setgrent gt lt or ne m|0 break given say state when';
  var SUBST = {
    className: 'subst',
    begin: '[$@]\\{',
    end: '\\}',
    keywords: PERL_KEYWORDS
  };
  var METHOD = {
    begin: '->{',
    end: '}'
  };
  var VAR = {
    className: 'variable',
    variants: [{begin: /\$\d/}, {begin: /[\$\%\@](\^\w\b|#\w+(\:\:\w+)*|{\w+}|\w+(\:\:\w*)*)/}, {
      begin: /[\$\%\@][^\s\w{]/,
      relevance: 0
    }]
  };
  var COMMENT = {
    className: 'comment',
    begin: '^(__END__|__DATA__)',
    end: '\\n$',
    relevance: 5
  };
  var STRING_CONTAINS = [hljs.BACKSLASH_ESCAPE, SUBST, VAR];
  var PERL_DEFAULT_CONTAINS = [VAR, hljs.HASH_COMMENT_MODE, COMMENT, {
    className: 'comment',
    begin: '^\\=\\w',
    end: '\\=cut',
    endsWithParent: true
  }, METHOD, {
    className: 'string',
    contains: STRING_CONTAINS,
    variants: [{
      begin: 'q[qwxr]?\\s*\\(',
      end: '\\)',
      relevance: 5
    }, {
      begin: 'q[qwxr]?\\s*\\[',
      end: '\\]',
      relevance: 5
    }, {
      begin: 'q[qwxr]?\\s*\\{',
      end: '\\}',
      relevance: 5
    }, {
      begin: 'q[qwxr]?\\s*\\|',
      end: '\\|',
      relevance: 5
    }, {
      begin: 'q[qwxr]?\\s*\\<',
      end: '\\>',
      relevance: 5
    }, {
      begin: 'qw\\s+q',
      end: 'q',
      relevance: 5
    }, {
      begin: '\'',
      end: '\'',
      contains: [hljs.BACKSLASH_ESCAPE]
    }, {
      begin: '"',
      end: '"'
    }, {
      begin: '`',
      end: '`',
      contains: [hljs.BACKSLASH_ESCAPE]
    }, {
      begin: '{\\w+}',
      contains: [],
      relevance: 0
    }, {
      begin: '\-?\\w+\\s*\\=\\>',
      contains: [],
      relevance: 0
    }]
  }, {
    className: 'number',
    begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
    relevance: 0
  }, {
    begin: '(\\/\\/|' + hljs.RE_STARTERS_RE + '|\\b(split|return|print|reverse|grep)\\b)\\s*',
    keywords: 'split return print reverse grep',
    relevance: 0,
    contains: [hljs.HASH_COMMENT_MODE, COMMENT, {
      className: 'regexp',
      begin: '(s|tr|y)/(\\\\.|[^/])*/(\\\\.|[^/])*/[a-z]*',
      relevance: 10
    }, {
      className: 'regexp',
      begin: '(m|qr)?/',
      end: '/[a-z]*',
      contains: [hljs.BACKSLASH_ESCAPE],
      relevance: 0
    }]
  }, {
    className: 'sub',
    beginKeywords: 'sub',
    end: '(\\s*\\(.*?\\))?[;{]',
    relevance: 5
  }, {
    className: 'operator',
    begin: '-\\w\\b',
    relevance: 0
  }];
  SUBST.contains = PERL_DEFAULT_CONTAINS;
  METHOD.contains = PERL_DEFAULT_CONTAINS;
  return {
    aliases: ['pl'],
    keywords: PERL_KEYWORDS,
    contains: PERL_DEFAULT_CONTAINS
  };
};


},{}],114:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var VARIABLE = {
    className: 'variable',
    begin: '(\\$|->)+[a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*'
  };
  var PREPROCESSOR = {
    className: 'preprocessor',
    begin: /<\?(php)?|\?>/
  };
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, PREPROCESSOR],
    variants: [{
      begin: 'b"',
      end: '"'
    }, {
      begin: 'b\'',
      end: '\''
    }, hljs.inherit(hljs.APOS_STRING_MODE, {illegal: null}), hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null})]
  };
  var NUMBER = {variants: [hljs.BINARY_NUMBER_MODE, hljs.C_NUMBER_MODE]};
  return {
    aliases: ['php3', 'php4', 'php5', 'php6'],
    case_insensitive: true,
    keywords: 'and include_once list abstract global private echo interface as static endswitch ' + 'array null if endwhile or const for endforeach self var while isset public ' + 'protected exit foreach throw elseif include __FILE__ empty require_once do xor ' + 'return parent clone use __CLASS__ __LINE__ else break print eval new ' + 'catch __METHOD__ case exception default die require __FUNCTION__ ' + 'enddeclare final try switch continue endfor endif declare unset true false ' + 'trait goto instanceof insteadof __DIR__ __NAMESPACE__ ' + 'yield finally',
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.HASH_COMMENT_MODE, {
      className: 'comment',
      begin: '/\\*',
      end: '\\*/',
      contains: [{
        className: 'phpdoc',
        begin: '\\s@[A-Za-z]+'
      }, PREPROCESSOR]
    }, {
      className: 'comment',
      begin: '__halt_compiler.+?;',
      endsWithParent: true,
      keywords: '__halt_compiler',
      lexemes: hljs.UNDERSCORE_IDENT_RE
    }, {
      className: 'string',
      begin: '<<<[\'"]?\\w+[\'"]?$',
      end: '^\\w+;',
      contains: [hljs.BACKSLASH_ESCAPE]
    }, PREPROCESSOR, VARIABLE, {
      className: 'function',
      beginKeywords: 'function',
      end: /[;{]/,
      excludeEnd: true,
      illegal: '\\$|\\[|%',
      contains: [hljs.UNDERSCORE_TITLE_MODE, {
        className: 'params',
        begin: '\\(',
        end: '\\)',
        contains: ['self', VARIABLE, hljs.C_BLOCK_COMMENT_MODE, STRING, NUMBER]
      }]
    }, {
      className: 'class',
      beginKeywords: 'class interface',
      end: '{',
      excludeEnd: true,
      illegal: /[:\(\$"]/,
      contains: [{beginKeywords: 'extends implements'}, hljs.UNDERSCORE_TITLE_MODE]
    }, {
      beginKeywords: 'namespace',
      end: ';',
      illegal: /[\.']/,
      contains: [hljs.UNDERSCORE_TITLE_MODE]
    }, {
      beginKeywords: 'use',
      end: ';',
      contains: [hljs.UNDERSCORE_TITLE_MODE]
    }, {begin: '=>'}, STRING, NUMBER]
  };
};


},{}],115:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {contains: [hljs.C_NUMBER_MODE, {
      className: 'built_in',
      begin: '{',
      end: '}$',
      excludeBegin: true,
      excludeEnd: true,
      contains: [hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE],
      relevance: 0
    }, {
      className: 'filename',
      begin: '[a-zA-Z_][\\da-zA-Z_]+\\.[\\da-zA-Z_]{1,3}',
      end: ':',
      excludeEnd: true
    }, {
      className: 'header',
      begin: '(ncalls|tottime|cumtime)',
      end: '$',
      keywords: 'ncalls tottime|10 cumtime|10 filename',
      relevance: 10
    }, {
      className: 'summary',
      begin: 'function calls',
      end: '$',
      contains: [hljs.C_NUMBER_MODE],
      relevance: 10
    }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, {
      className: 'function',
      begin: '\\(',
      end: '\\)$',
      contains: [hljs.UNDERSCORE_TITLE_MODE],
      relevance: 0
    }]};
};


},{}],116:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    keywords: {
      keyword: 'package import option optional required repeated group',
      built_in: 'double float int32 int64 uint32 uint64 sint32 sint64 ' + 'fixed32 fixed64 sfixed32 sfixed64 bool string bytes',
      literal: 'true false'
    },
    contains: [hljs.QUOTE_STRING_MODE, hljs.NUMBER_MODE, hljs.C_LINE_COMMENT_MODE, {
      className: 'class',
      beginKeywords: 'message enum service',
      end: /\{/,
      illegal: /\n/,
      contains: [hljs.inherit(hljs.TITLE_MODE, {starts: {
          endsWithParent: true,
          excludeEnd: true
        }})]
    }, {
      className: 'function',
      beginKeywords: 'rpc',
      end: /;/,
      excludeEnd: true,
      keywords: 'rpc returns'
    }, {
      className: 'constant',
      begin: /^\s*[A-Z_]+/,
      end: /\s*=/,
      excludeEnd: true
    }]
  };
};


},{}],117:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var PROMPT = {
    className: 'prompt',
    begin: /^(>>>|\.\.\.) /
  };
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE],
    variants: [{
      begin: /(u|b)?r?'''/,
      end: /'''/,
      contains: [PROMPT],
      relevance: 10
    }, {
      begin: /(u|b)?r?"""/,
      end: /"""/,
      contains: [PROMPT],
      relevance: 10
    }, {
      begin: /(u|r|ur)'/,
      end: /'/,
      relevance: 10
    }, {
      begin: /(u|r|ur)"/,
      end: /"/,
      relevance: 10
    }, {
      begin: /(b|br)'/,
      end: /'/
    }, {
      begin: /(b|br)"/,
      end: /"/
    }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
  };
  var NUMBER = {
    className: 'number',
    relevance: 0,
    variants: [{begin: hljs.BINARY_NUMBER_RE + '[lLjJ]?'}, {begin: '\\b(0o[0-7]+)[lLjJ]?'}, {begin: hljs.C_NUMBER_RE + '[lLjJ]?'}]
  };
  var PARAMS = {
    className: 'params',
    begin: /\(/,
    end: /\)/,
    contains: ['self', PROMPT, NUMBER, STRING]
  };
  var FUNC_CLASS_PROTO = {
    end: /:/,
    illegal: /[${=;\n]/,
    contains: [hljs.UNDERSCORE_TITLE_MODE, PARAMS]
  };
  return {
    aliases: ['py', 'gyp'],
    keywords: {
      keyword: 'and elif is global as in if from raise for except finally print import pass return ' + 'exec else break not with class assert yield try while continue del or def lambda ' + 'nonlocal|10 None True False',
      built_in: 'Ellipsis NotImplemented'
    },
    illegal: /(<\/|->|\?)/,
    contains: [PROMPT, NUMBER, STRING, hljs.HASH_COMMENT_MODE, hljs.inherit(FUNC_CLASS_PROTO, {
      className: 'function',
      beginKeywords: 'def',
      relevance: 10
    }), hljs.inherit(FUNC_CLASS_PROTO, {
      className: 'class',
      beginKeywords: 'class'
    }), {
      className: 'decorator',
      begin: /@/,
      end: /$/
    }, {begin: /\b(print|exec)\(/}]
  };
};


},{}],118:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var Q_KEYWORDS = {
    keyword: 'do while select delete by update from',
    constant: '0b 1b',
    built_in: 'neg not null string reciprocal floor ceiling signum mod xbar xlog and or each scan over prior mmu lsq inv md5 ltime gtime count first var dev med cov cor all any rand sums prds mins maxs fills deltas ratios avgs differ prev next rank reverse iasc idesc asc desc msum mcount mavg mdev xrank mmin mmax xprev rotate distinct group where flip type key til get value attr cut set upsert raze union inter except cross sv vs sublist enlist read0 read1 hopen hclose hdel hsym hcount peach system ltrim rtrim trim lower upper ssr view tables views cols xcols keys xkey xcol xasc xdesc fkeys meta lj aj aj0 ij pj asof uj ww wj wj1 fby xgroup ungroup ej save load rsave rload show csv parse eval min max avg wavg wsum sin cos tan sum',
    typename: '`float `double int `timestamp `timespan `datetime `time `boolean `symbol `char `byte `short `long `real `month `date `minute `second `guid'
  };
  return {
    aliases: ['k', 'kdb'],
    keywords: Q_KEYWORDS,
    lexemes: /\b(`?)[A-Za-z0-9_]+\b/,
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.QUOTE_STRING_MODE, hljs.C_NUMBER_MODE]
  };
};


},{}],119:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var IDENT_RE = '([a-zA-Z]|\\.[a-zA-Z.])[a-zA-Z0-9._]*';
  return {contains: [hljs.HASH_COMMENT_MODE, {
      begin: IDENT_RE,
      lexemes: IDENT_RE,
      keywords: {
        keyword: 'function if in break next repeat else for return switch while try tryCatch|10 ' + 'stop warning require library attach detach source setMethod setGeneric ' + 'setGroupGeneric setClass ...|10',
        literal: 'NULL NA TRUE FALSE T F Inf NaN NA_integer_|10 NA_real_|10 NA_character_|10 ' + 'NA_complex_|10'
      },
      relevance: 0
    }, {
      className: 'number',
      begin: "0[xX][0-9a-fA-F]+[Li]?\\b",
      relevance: 0
    }, {
      className: 'number',
      begin: "\\d+(?:[eE][+\\-]?\\d*)?L\\b",
      relevance: 0
    }, {
      className: 'number',
      begin: "\\d+\\.(?!\\d)(?:i\\b)?",
      relevance: 0
    }, {
      className: 'number',
      begin: "\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d*)?i?\\b",
      relevance: 0
    }, {
      className: 'number',
      begin: "\\.\\d+(?:[eE][+\\-]?\\d*)?i?\\b",
      relevance: 0
    }, {
      begin: '`',
      end: '`',
      relevance: 0
    }, {
      className: 'string',
      contains: [hljs.BACKSLASH_ESCAPE],
      variants: [{
        begin: '"',
        end: '"'
      }, {
        begin: "'",
        end: "'"
      }]
    }]};
};


},{}],120:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    keywords: 'ArchiveRecord AreaLightSource Atmosphere Attribute AttributeBegin AttributeEnd Basis ' + 'Begin Blobby Bound Clipping ClippingPlane Color ColorSamples ConcatTransform Cone ' + 'CoordinateSystem CoordSysTransform CropWindow Curves Cylinder DepthOfField Detail ' + 'DetailRange Disk Displacement Display End ErrorHandler Exposure Exterior Format ' + 'FrameAspectRatio FrameBegin FrameEnd GeneralPolygon GeometricApproximation Geometry ' + 'Hider Hyperboloid Identity Illuminate Imager Interior LightSource ' + 'MakeCubeFaceEnvironment MakeLatLongEnvironment MakeShadow MakeTexture Matte ' + 'MotionBegin MotionEnd NuPatch ObjectBegin ObjectEnd ObjectInstance Opacity Option ' + 'Orientation Paraboloid Patch PatchMesh Perspective PixelFilter PixelSamples ' + 'PixelVariance Points PointsGeneralPolygons PointsPolygons Polygon Procedural Projection ' + 'Quantize ReadArchive RelativeDetail ReverseOrientation Rotate Scale ScreenWindow ' + 'ShadingInterpolation ShadingRate Shutter Sides Skew SolidBegin SolidEnd Sphere ' + 'SubdivisionMesh Surface TextureCoordinates Torus Transform TransformBegin TransformEnd ' + 'TransformPoints Translate TrimCurve WorldBegin WorldEnd',
    illegal: '</',
    contains: [hljs.HASH_COMMENT_MODE, hljs.C_NUMBER_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE]
  };
};


},{}],121:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    keywords: {
      keyword: 'float color point normal vector matrix while for if do return else break extern continue',
      built_in: 'abs acos ambient area asin atan atmosphere attribute calculatenormal ceil cellnoise ' + 'clamp comp concat cos degrees depth Deriv diffuse distance Du Dv environment exp ' + 'faceforward filterstep floor format fresnel incident length lightsource log match ' + 'max min mod noise normalize ntransform opposite option phong pnoise pow printf ' + 'ptlined radians random reflect refract renderinfo round setcomp setxcomp setycomp ' + 'setzcomp shadow sign sin smoothstep specular specularbrdf spline sqrt step tan ' + 'texture textureinfo trace transform vtransform xcomp ycomp zcomp'
    },
    illegal: '</',
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, hljs.C_NUMBER_MODE, {
      className: 'preprocessor',
      begin: '#',
      end: '$'
    }, {
      className: 'shader',
      beginKeywords: 'surface displacement light volume imager',
      end: '\\('
    }, {
      className: 'shading',
      beginKeywords: 'illuminate illuminance gather',
      end: '\\('
    }]
  };
};


},{}],122:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var RUBY_METHOD_RE = '[a-zA-Z_]\\w*[!?=]?|[-+~]\\@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?';
  var RUBY_KEYWORDS = 'and false then defined module in return redo if BEGIN retry end for true self when ' + 'next until do begin unless END rescue nil else break undef not super class case ' + 'require yield alias while ensure elsif or include attr_reader attr_writer attr_accessor';
  var YARDOCTAG = {
    className: 'yardoctag',
    begin: '@[A-Za-z]+'
  };
  var IRB_OBJECT = {
    className: 'value',
    begin: '#<',
    end: '>'
  };
  var COMMENT = {
    className: 'comment',
    variants: [{
      begin: '#',
      end: '$',
      contains: [YARDOCTAG]
    }, {
      begin: '^\\=begin',
      end: '^\\=end',
      contains: [YARDOCTAG],
      relevance: 10
    }, {
      begin: '^__END__',
      end: '\\n$'
    }]
  };
  var SUBST = {
    className: 'subst',
    begin: '#\\{',
    end: '}',
    keywords: RUBY_KEYWORDS
  };
  var STRING = {
    className: 'string',
    contains: [hljs.BACKSLASH_ESCAPE, SUBST],
    variants: [{
      begin: /'/,
      end: /'/
    }, {
      begin: /"/,
      end: /"/
    }, {
      begin: '%[qw]?\\(',
      end: '\\)'
    }, {
      begin: '%[qw]?\\[',
      end: '\\]'
    }, {
      begin: '%[qw]?{',
      end: '}'
    }, {
      begin: '%[qw]?<',
      end: '>'
    }, {
      begin: '%[qw]?/',
      end: '/'
    }, {
      begin: '%[qw]?%',
      end: '%'
    }, {
      begin: '%[qw]?-',
      end: '-'
    }, {
      begin: '%[qw]?\\|',
      end: '\\|'
    }, {begin: /\B\?(\\\d{1,3}|\\x[A-Fa-f0-9]{1,2}|\\u[A-Fa-f0-9]{4}|\\?\S)\b/}]
  };
  var PARAMS = {
    className: 'params',
    begin: '\\(',
    end: '\\)',
    keywords: RUBY_KEYWORDS
  };
  var RUBY_DEFAULT_CONTAINS = [STRING, IRB_OBJECT, COMMENT, {
    className: 'class',
    beginKeywords: 'class module',
    end: '$|;',
    illegal: /=/,
    contains: [hljs.inherit(hljs.TITLE_MODE, {begin: '[A-Za-z_]\\w*(::\\w+)*(\\?|\\!)?'}), {
      className: 'inheritance',
      begin: '<\\s*',
      contains: [{
        className: 'parent',
        begin: '(' + hljs.IDENT_RE + '::)?' + hljs.IDENT_RE
      }]
    }, COMMENT]
  }, {
    className: 'function',
    beginKeywords: 'def',
    end: ' |$|;',
    relevance: 0,
    contains: [hljs.inherit(hljs.TITLE_MODE, {begin: RUBY_METHOD_RE}), PARAMS, COMMENT]
  }, {
    className: 'constant',
    begin: '(::)?(\\b[A-Z]\\w*(::)?)+',
    relevance: 0
  }, {
    className: 'symbol',
    begin: hljs.UNDERSCORE_IDENT_RE + '(\\!|\\?)?:',
    relevance: 0
  }, {
    className: 'symbol',
    begin: ':',
    contains: [STRING, {begin: RUBY_METHOD_RE}],
    relevance: 0
  }, {
    className: 'number',
    begin: '(\\b0[0-7_]+)|(\\b0x[0-9a-fA-F_]+)|(\\b[1-9][0-9_]*(\\.[0-9_]+)?)|[0_]\\b',
    relevance: 0
  }, {
    className: 'variable',
    begin: '(\\$\\W)|((\\$|\\@\\@?)(\\w+))'
  }, {
    begin: '(' + hljs.RE_STARTERS_RE + ')\\s*',
    contains: [IRB_OBJECT, COMMENT, {
      className: 'regexp',
      contains: [hljs.BACKSLASH_ESCAPE, SUBST],
      illegal: /\n/,
      variants: [{
        begin: '/',
        end: '/[a-z]*'
      }, {
        begin: '%r{',
        end: '}[a-z]*'
      }, {
        begin: '%r\\(',
        end: '\\)[a-z]*'
      }, {
        begin: '%r!',
        end: '![a-z]*'
      }, {
        begin: '%r\\[',
        end: '\\][a-z]*'
      }]
    }],
    relevance: 0
  }];
  SUBST.contains = RUBY_DEFAULT_CONTAINS;
  PARAMS.contains = RUBY_DEFAULT_CONTAINS;
  var IRB_DEFAULT = [{
    begin: /^\s*=>/,
    className: 'status',
    starts: {
      end: '$',
      contains: RUBY_DEFAULT_CONTAINS
    }
  }, {
    className: 'prompt',
    begin: /^\S[^=>\n]*>+/,
    starts: {
      end: '$',
      contains: RUBY_DEFAULT_CONTAINS
    }
  }];
  return {
    aliases: ['rb', 'gemspec', 'podspec', 'thor', 'irb'],
    keywords: RUBY_KEYWORDS,
    contains: [COMMENT].concat(IRB_DEFAULT).concat(RUBY_DEFAULT_CONTAINS)
  };
};


},{}],123:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    keywords: {
      keyword: 'BILL_PERIOD BILL_START BILL_STOP RS_EFFECTIVE_START RS_EFFECTIVE_STOP RS_JURIS_CODE RS_OPCO_CODE ' + 'INTDADDATTRIBUTE|5 INTDADDVMSG|5 INTDBLOCKOP|5 INTDBLOCKOPNA|5 INTDCLOSE|5 INTDCOUNT|5 ' + 'INTDCOUNTSTATUSCODE|5 INTDCREATEMASK|5 INTDCREATEDAYMASK|5 INTDCREATEFACTORMASK|5 ' + 'INTDCREATEHANDLE|5 INTDCREATEOVERRIDEDAYMASK|5 INTDCREATEOVERRIDEMASK|5 ' + 'INTDCREATESTATUSCODEMASK|5 INTDCREATETOUPERIOD|5 INTDDELETE|5 INTDDIPTEST|5 INTDEXPORT|5 ' + 'INTDGETERRORCODE|5 INTDGETERRORMESSAGE|5 INTDISEQUAL|5 INTDJOIN|5 INTDLOAD|5 INTDLOADACTUALCUT|5 ' + 'INTDLOADDATES|5 INTDLOADHIST|5 INTDLOADLIST|5 INTDLOADLISTDATES|5 INTDLOADLISTENERGY|5 ' + 'INTDLOADLISTHIST|5 INTDLOADRELATEDCHANNEL|5 INTDLOADSP|5 INTDLOADSTAGING|5 INTDLOADUOM|5 ' + 'INTDLOADUOMDATES|5 INTDLOADUOMHIST|5 INTDLOADVERSION|5 INTDOPEN|5 INTDREADFIRST|5 INTDREADNEXT|5 ' + 'INTDRECCOUNT|5 INTDRELEASE|5 INTDREPLACE|5 INTDROLLAVG|5 INTDROLLPEAK|5 INTDSCALAROP|5 INTDSCALE|5 ' + 'INTDSETATTRIBUTE|5 INTDSETDSTPARTICIPANT|5 INTDSETSTRING|5 INTDSETVALUE|5 INTDSETVALUESTATUS|5 ' + 'INTDSHIFTSTARTTIME|5 INTDSMOOTH|5 INTDSORT|5 INTDSPIKETEST|5 INTDSUBSET|5 INTDTOU|5 ' + 'INTDTOURELEASE|5 INTDTOUVALUE|5 INTDUPDATESTATS|5 INTDVALUE|5 STDEV INTDDELETEEX|5 ' + 'INTDLOADEXACTUAL|5 INTDLOADEXCUT|5 INTDLOADEXDATES|5 INTDLOADEX|5 INTDLOADEXRELATEDCHANNEL|5 ' + 'INTDSAVEEX|5 MVLOAD|5 MVLOADACCT|5 MVLOADACCTDATES|5 MVLOADACCTHIST|5 MVLOADDATES|5 MVLOADHIST|5 ' + 'MVLOADLIST|5 MVLOADLISTDATES|5 MVLOADLISTHIST|5 IF FOR NEXT DONE SELECT END CALL ABORT CLEAR CHANNEL FACTOR LIST NUMBER ' + 'OVERRIDE SET WEEK DISTRIBUTIONNODE ELSE WHEN THEN OTHERWISE IENUM CSV INCLUDE LEAVE RIDER SAVE DELETE ' + 'NOVALUE SECTION WARN SAVE_UPDATE DETERMINANT LABEL REPORT REVENUE EACH ' + 'IN FROM TOTAL CHARGE BLOCK AND OR CSV_FILE RATE_CODE AUXILIARY_DEMAND ' + 'UIDACCOUNT RS BILL_PERIOD_SELECT HOURS_PER_MONTH INTD_ERROR_STOP SEASON_SCHEDULE_NAME ' + 'ACCOUNTFACTOR ARRAYUPPERBOUND CALLSTOREDPROC GETADOCONNECTION GETCONNECT GETDATASOURCE ' + 'GETQUALIFIER GETUSERID HASVALUE LISTCOUNT LISTOP LISTUPDATE LISTVALUE PRORATEFACTOR RSPRORATE ' + 'SETBINPATH SETDBMONITOR WQ_OPEN BILLINGHOURS DATE DATEFROMFLOAT DATETIMEFROMSTRING ' + 'DATETIMETOSTRING DATETOFLOAT DAY DAYDIFF DAYNAME DBDATETIME HOUR MINUTE MONTH MONTHDIFF ' + 'MONTHHOURS MONTHNAME ROUNDDATE SAMEWEEKDAYLASTYEAR SECOND WEEKDAY WEEKDIFF YEAR YEARDAY ' + 'YEARSTR COMPSUM HISTCOUNT HISTMAX HISTMIN HISTMINNZ HISTVALUE MAXNRANGE MAXRANGE MINRANGE ' + 'COMPIKVA COMPKVA COMPKVARFROMKQKW COMPLF IDATTR FLAG LF2KW LF2KWH MAXKW POWERFACTOR ' + 'READING2USAGE AVGSEASON MAXSEASON MONTHLYMERGE SEASONVALUE SUMSEASON ACCTREADDATES ' + 'ACCTTABLELOAD CONFIGADD CONFIGGET CREATEOBJECT CREATEREPORT EMAILCLIENT EXPBLKMDMUSAGE ' + 'EXPMDMUSAGE EXPORT_USAGE FACTORINEFFECT GETUSERSPECIFIEDSTOP INEFFECT ISHOLIDAY RUNRATE ' + 'SAVE_PROFILE SETREPORTTITLE USEREXIT WATFORRUNRATE TO TABLE ACOS ASIN ATAN ATAN2 BITAND CEIL ' + 'COS COSECANT COSH COTANGENT DIVQUOT DIVREM EXP FABS FLOOR FMOD FREPM FREXPN LOG LOG10 MAX MAXN ' + 'MIN MINNZ MODF POW ROUND ROUND2VALUE ROUNDINT SECANT SIN SINH SQROOT TAN TANH FLOAT2STRING ' + 'FLOAT2STRINGNC INSTR LEFT LEN LTRIM MID RIGHT RTRIM STRING STRINGNC TOLOWER TOUPPER TRIM ' + 'NUMDAYS READ_DATE STAGING',
      built_in: 'IDENTIFIER OPTIONS XML_ELEMENT XML_OP XML_ELEMENT_OF DOMDOCCREATE DOMDOCLOADFILE DOMDOCLOADXML ' + 'DOMDOCSAVEFILE DOMDOCGETROOT DOMDOCADDPI DOMNODEGETNAME DOMNODEGETTYPE DOMNODEGETVALUE DOMNODEGETCHILDCT ' + 'DOMNODEGETFIRSTCHILD DOMNODEGETSIBLING DOMNODECREATECHILDELEMENT DOMNODESETATTRIBUTE ' + 'DOMNODEGETCHILDELEMENTCT DOMNODEGETFIRSTCHILDELEMENT DOMNODEGETSIBLINGELEMENT DOMNODEGETATTRIBUTECT ' + 'DOMNODEGETATTRIBUTEI DOMNODEGETATTRIBUTEBYNAME DOMNODEGETBYNAME'
    },
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.C_NUMBER_MODE, {
      className: 'array',
      begin: '\#[a-zA-Z\ \.]+'
    }]
  };
};


},{}],124:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    aliases: ['rs'],
    keywords: {
      keyword: 'alignof as be box break const continue crate do else enum extern ' + 'false fn for if impl in let loop match mod mut offsetof once priv ' + 'proc pub pure ref return self sizeof static struct super trait true ' + 'type typeof unsafe unsized use virtual while yield ' + 'int i8 i16 i32 i64 ' + 'uint u8 u32 u64 ' + 'float f32 f64 ' + 'str char bool',
      built_in: 'assert! assert_eq! bitflags! bytes! cfg! col! concat! concat_idents! ' + 'debug_assert! debug_assert_eq! env! fail! file! format! format_args! ' + 'include_bin! include_str! line! local_data_key! module_path! ' + 'option_env! print! println! select! stringify! try! unimplemented! ' + 'unreachable! vec! write! writeln!'
    },
    lexemes: hljs.IDENT_RE + '!?',
    illegal: '</',
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.inherit(hljs.QUOTE_STRING_MODE, {illegal: null}), {
      className: 'string',
      begin: /r(#*)".*?"\1(?!#)/
    }, {
      className: 'string',
      begin: /'\\?(x\w{2}|u\w{4}|U\w{8}|.)'/
    }, {begin: /'[a-zA-Z_][a-zA-Z0-9_]*/}, {
      className: 'number',
      begin: '\\b(0[xb][A-Za-z0-9_]+|[0-9_]+(\\.[0-9_]+)?([uif](8|16|32|64)?)?)',
      relevance: 0
    }, {
      className: 'function',
      beginKeywords: 'fn',
      end: '(\\(|<)',
      excludeEnd: true,
      contains: [hljs.UNDERSCORE_TITLE_MODE]
    }, {
      className: 'preprocessor',
      begin: '#\\[',
      end: '\\]'
    }, {
      beginKeywords: 'type',
      end: '(=|<)',
      contains: [hljs.UNDERSCORE_TITLE_MODE],
      illegal: '\\S'
    }, {
      beginKeywords: 'trait enum',
      end: '({|<)',
      contains: [hljs.UNDERSCORE_TITLE_MODE],
      illegal: '\\S'
    }, {begin: hljs.IDENT_RE + '::'}, {begin: '->'}]
  };
};


},{}],125:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var ANNOTATION = {
    className: 'annotation',
    begin: '@[A-Za-z]+'
  };
  var STRING = {
    className: 'string',
    begin: 'u?r?"""',
    end: '"""',
    relevance: 10
  };
  var SYMBOL = {
    className: 'symbol',
    begin: '\'\\w[\\w\\d_]*(?!\')'
  };
  var TYPE = {
    className: 'type',
    begin: '\\b[A-Z][A-Za-z0-9_]*',
    relevance: 0
  };
  var NAME = {
    className: 'title',
    begin: /[^0-9\n\t "'(),.`{}\[\]:;][^\n\t "'(),.`{}\[\]:;]+|[^0-9\n\t "'(),.`{}\[\]:;=]/,
    relevance: 0
  };
  var CLASS = {
    className: 'class',
    beginKeywords: 'class object trait type',
    end: /[:={\[(\n;]/,
    contains: [{
      className: 'keyword',
      beginKeywords: 'extends with',
      relevance: 10
    }, NAME]
  };
  var METHOD = {
    className: 'function',
    beginKeywords: 'def val',
    end: /[:={\[(\n;]/,
    contains: [NAME]
  };
  var JAVADOC = {
    className: 'javadoc',
    begin: '/\\*\\*',
    end: '\\*/',
    contains: [{
      className: 'javadoctag',
      begin: '@[A-Za-z]+'
    }],
    relevance: 10
  };
  return {
    keywords: {
      literal: 'true false null',
      keyword: 'type yield lazy override def with val var sealed abstract private trait object if forSome for while throw finally protected extends import final return else break new catch super class case package default try this match continue throws implicit'
    },
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, STRING, hljs.QUOTE_STRING_MODE, SYMBOL, TYPE, METHOD, CLASS, hljs.C_NUMBER_MODE, ANNOTATION]
  };
};


},{}],126:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var SCHEME_IDENT_RE = '[^\\(\\)\\[\\]\\{\\}",\'`;#|\\\\\\s]+';
  var SCHEME_SIMPLE_NUMBER_RE = '(\\-|\\+)?\\d+([./]\\d+)?';
  var SCHEME_COMPLEX_NUMBER_RE = SCHEME_SIMPLE_NUMBER_RE + '[+\\-]' + SCHEME_SIMPLE_NUMBER_RE + 'i';
  var BUILTINS = {built_in: 'case-lambda call/cc class define-class exit-handler field import ' + 'inherit init-field interface let*-values let-values let/ec mixin ' + 'opt-lambda override protect provide public rename require ' + 'require-for-syntax syntax syntax-case syntax-error unit/sig unless ' + 'when with-syntax and begin call-with-current-continuation ' + 'call-with-input-file call-with-output-file case cond define ' + 'define-syntax delay do dynamic-wind else for-each if lambda let let* ' + 'let-syntax letrec letrec-syntax map or syntax-rules \' * + , ,@ - ... / ' + '; < <= = => > >= ` abs acos angle append apply asin assoc assq assv atan ' + 'boolean? caar cadr call-with-input-file call-with-output-file ' + 'call-with-values car cdddar cddddr cdr ceiling char->integer ' + 'char-alphabetic? char-ci<=? char-ci<? char-ci=? char-ci>=? char-ci>? ' + 'char-downcase char-lower-case? char-numeric? char-ready? char-upcase ' + 'char-upper-case? char-whitespace? char<=? char<? char=? char>=? char>? ' + 'char? close-input-port close-output-port complex? cons cos ' + 'current-input-port current-output-port denominator display eof-object? ' + 'eq? equal? eqv? eval even? exact->inexact exact? exp expt floor ' + 'force gcd imag-part inexact->exact inexact? input-port? integer->char ' + 'integer? interaction-environment lcm length list list->string ' + 'list->vector list-ref list-tail list? load log magnitude make-polar ' + 'make-rectangular make-string make-vector max member memq memv min ' + 'modulo negative? newline not null-environment null? number->string ' + 'number? numerator odd? open-input-file open-output-file output-port? ' + 'pair? peek-char port? positive? procedure? quasiquote quote quotient ' + 'rational? rationalize read read-char real-part real? remainder reverse ' + 'round scheme-report-environment set! set-car! set-cdr! sin sqrt string ' + 'string->list string->number string->symbol string-append string-ci<=? ' + 'string-ci<? string-ci=? string-ci>=? string-ci>? string-copy ' + 'string-fill! string-length string-ref string-set! string<=? string<? ' + 'string=? string>=? string>? string? substring symbol->string symbol? ' + 'tan transcript-off transcript-on truncate values vector ' + 'vector->list vector-fill! vector-length vector-ref vector-set! ' + 'with-input-from-file with-output-to-file write write-char zero?'};
  var SHEBANG = {
    className: 'shebang',
    begin: '^#!',
    end: '$'
  };
  var LITERAL = {
    className: 'literal',
    begin: '(#t|#f|#\\\\' + SCHEME_IDENT_RE + '|#\\\\.)'
  };
  var NUMBER = {
    className: 'number',
    variants: [{
      begin: SCHEME_SIMPLE_NUMBER_RE,
      relevance: 0
    }, {
      begin: SCHEME_COMPLEX_NUMBER_RE,
      relevance: 0
    }, {begin: '#b[0-1]+(/[0-1]+)?'}, {begin: '#o[0-7]+(/[0-7]+)?'}, {begin: '#x[0-9a-f]+(/[0-9a-f]+)?'}]
  };
  var STRING = hljs.QUOTE_STRING_MODE;
  var REGULAR_EXPRESSION = {
    className: 'regexp',
    begin: '#[pr]x"',
    end: '[^\\\\]"'
  };
  var COMMENT = {
    className: 'comment',
    variants: [{
      begin: ';',
      end: '$',
      relevance: 0
    }, {
      begin: '#\\|',
      end: '\\|#'
    }]
  };
  var IDENT = {
    begin: SCHEME_IDENT_RE,
    relevance: 0
  };
  var QUOTED_IDENT = {
    className: 'variable',
    begin: '\'' + SCHEME_IDENT_RE
  };
  var BODY = {
    endsWithParent: true,
    relevance: 0
  };
  var LIST = {
    className: 'list',
    variants: [{
      begin: '\\(',
      end: '\\)'
    }, {
      begin: '\\[',
      end: '\\]'
    }],
    contains: [{
      className: 'keyword',
      begin: SCHEME_IDENT_RE,
      lexemes: SCHEME_IDENT_RE,
      keywords: BUILTINS
    }, BODY]
  };
  BODY.contains = [LITERAL, NUMBER, STRING, COMMENT, IDENT, QUOTED_IDENT, LIST];
  return {
    illegal: /\S/,
    contains: [SHEBANG, NUMBER, STRING, COMMENT, QUOTED_IDENT, LIST]
  };
};


},{}],127:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var COMMON_CONTAINS = [hljs.C_NUMBER_MODE, {
    className: 'string',
    begin: '\'|\"',
    end: '\'|\"',
    contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}]
  }];
  return {
    aliases: ['sci'],
    keywords: {
      keyword: 'abort break case clear catch continue do elseif else endfunction end for function' + 'global if pause return resume select try then while' + '%f %F %t %T %pi %eps %inf %nan %e %i %z %s',
      built_in: 'abs and acos asin atan ceil cd chdir clearglobal cosh cos cumprod deff disp error' + 'exec execstr exists exp eye gettext floor fprintf fread fsolve imag isdef isempty' + 'isinfisnan isvector lasterror length load linspace list listfiles log10 log2 log' + 'max min msprintf mclose mopen ones or pathconvert poly printf prod pwd rand real' + 'round sinh sin size gsort sprintf sqrt strcat strcmps tring sum system tanh tan' + 'type typename warning zeros matrix'
    },
    illegal: '("|#|/\\*|\\s+/\\w+)',
    contains: [{
      className: 'function',
      beginKeywords: 'function endfunction',
      end: '$',
      keywords: 'function endfunction|10',
      contains: [hljs.UNDERSCORE_TITLE_MODE, {
        className: 'params',
        begin: '\\(',
        end: '\\)'
      }]
    }, {
      className: 'transposed_variable',
      begin: '[a-zA-Z_][a-zA-Z_0-9]*(\'+[\\.\']*|[\\.\']+)',
      end: '',
      relevance: 0
    }, {
      className: 'matrix',
      begin: '\\[',
      end: '\\]\'*[\\.\']*',
      relevance: 0,
      contains: COMMON_CONTAINS
    }, {
      className: 'comment',
      begin: '//',
      end: '$'
    }].concat(COMMON_CONTAINS)
  };
};


},{}],128:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var IDENT_RE = '[a-zA-Z-][a-zA-Z0-9_-]*';
  var VARIABLE = {
    className: 'variable',
    begin: '(\\$' + IDENT_RE + ')\\b'
  };
  var FUNCTION = {
    className: 'function',
    begin: IDENT_RE + '\\(',
    returnBegin: true,
    excludeEnd: true,
    end: '\\('
  };
  var HEXCOLOR = {
    className: 'hexcolor',
    begin: '#[0-9A-Fa-f]+'
  };
  var DEF_INTERNALS = {
    className: 'attribute',
    begin: '[A-Z\\_\\.\\-]+',
    end: ':',
    excludeEnd: true,
    illegal: '[^\\s]',
    starts: {
      className: 'value',
      endsWithParent: true,
      excludeEnd: true,
      contains: [FUNCTION, HEXCOLOR, hljs.CSS_NUMBER_MODE, hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, hljs.C_BLOCK_COMMENT_MODE, {
        className: 'important',
        begin: '!important'
      }]
    }
  };
  return {
    case_insensitive: true,
    illegal: '[=/|\']',
    contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, FUNCTION, {
      className: 'id',
      begin: '\\#[A-Za-z0-9_-]+',
      relevance: 0
    }, {
      className: 'class',
      begin: '\\.[A-Za-z0-9_-]+',
      relevance: 0
    }, {
      className: 'attr_selector',
      begin: '\\[',
      end: '\\]',
      illegal: '$'
    }, {
      className: 'tag',
      begin: '\\b(a|abbr|acronym|address|area|article|aside|audio|b|base|big|blockquote|body|br|button|canvas|caption|cite|code|col|colgroup|command|datalist|dd|del|details|dfn|div|dl|dt|em|embed|fieldset|figcaption|figure|footer|form|frame|frameset|(h[1-6])|head|header|hgroup|hr|html|i|iframe|img|input|ins|kbd|keygen|label|legend|li|link|map|mark|meta|meter|nav|noframes|noscript|object|ol|optgroup|option|output|p|param|pre|progress|q|rp|rt|ruby|samp|script|section|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|time|title|tr|tt|ul|var|video)\\b',
      relevance: 0
    }, {
      className: 'pseudo',
      begin: ':(visited|valid|root|right|required|read-write|read-only|out-range|optional|only-of-type|only-child|nth-of-type|nth-last-of-type|nth-last-child|nth-child|not|link|left|last-of-type|last-child|lang|invalid|indeterminate|in-range|hover|focus|first-of-type|first-line|first-letter|first-child|first|enabled|empty|disabled|default|checked|before|after|active)'
    }, {
      className: 'pseudo',
      begin: '::(after|before|choices|first-letter|first-line|repeat-index|repeat-item|selection|value)'
    }, VARIABLE, {
      className: 'attribute',
      begin: '\\b(z-index|word-wrap|word-spacing|word-break|width|widows|white-space|visibility|vertical-align|unicode-bidi|transition-timing-function|transition-property|transition-duration|transition-delay|transition|transform-style|transform-origin|transform|top|text-underline-position|text-transform|text-shadow|text-rendering|text-overflow|text-indent|text-decoration-style|text-decoration-line|text-decoration-color|text-decoration|text-align-last|text-align|tab-size|table-layout|right|resize|quotes|position|pointer-events|perspective-origin|perspective|page-break-inside|page-break-before|page-break-after|padding-top|padding-right|padding-left|padding-bottom|padding|overflow-y|overflow-x|overflow-wrap|overflow|outline-width|outline-style|outline-offset|outline-color|outline|orphans|order|opacity|object-position|object-fit|normal|none|nav-up|nav-right|nav-left|nav-index|nav-down|min-width|min-height|max-width|max-height|mask|marks|margin-top|margin-right|margin-left|margin-bottom|margin|list-style-type|list-style-position|list-style-image|list-style|line-height|letter-spacing|left|justify-content|initial|inherit|ime-mode|image-orientation|image-resolution|image-rendering|icon|hyphens|height|font-weight|font-variant-ligatures|font-variant|font-style|font-stretch|font-size-adjust|font-size|font-language-override|font-kerning|font-feature-settings|font-family|font|float|flex-wrap|flex-shrink|flex-grow|flex-flow|flex-direction|flex-basis|flex|filter|empty-cells|display|direction|cursor|counter-reset|counter-increment|content|column-width|column-span|column-rule-width|column-rule-style|column-rule-color|column-rule|column-gap|column-fill|column-count|columns|color|clip-path|clip|clear|caption-side|break-inside|break-before|break-after|box-sizing|box-shadow|box-decoration-break|bottom|border-width|border-top-width|border-top-style|border-top-right-radius|border-top-left-radius|border-top-color|border-top|border-style|border-spacing|border-right-width|border-right-style|border-right-color|border-right|border-radius|border-left-width|border-left-style|border-left-color|border-left|border-image-width|border-image-source|border-image-slice|border-image-repeat|border-image-outset|border-image|border-color|border-collapse|border-bottom-width|border-bottom-style|border-bottom-right-radius|border-bottom-left-radius|border-bottom-color|border-bottom|border|background-size|background-repeat|background-position|background-origin|background-image|background-color|background-clip|background-attachment|background|backface-visibility|auto|animation-timing-function|animation-play-state|animation-name|animation-iteration-count|animation-fill-mode|animation-duration|animation-direction|animation-delay|animation|align-self|align-items|align-content)\\b',
      illegal: '[^\\s]'
    }, {
      className: 'value',
      begin: '\\b(whitespace|wait|w-resize|visible|vertical-text|vertical-ideographic|uppercase|upper-roman|upper-alpha|underline|transparent|top|thin|thick|text|text-top|text-bottom|tb-rl|table-header-group|table-footer-group|sw-resize|super|strict|static|square|solid|small-caps|separate|se-resize|scroll|s-resize|rtl|row-resize|ridge|right|repeat|repeat-y|repeat-x|relative|progress|pointer|overline|outside|outset|oblique|nowrap|not-allowed|normal|none|nw-resize|no-repeat|no-drop|newspaper|ne-resize|n-resize|move|middle|medium|ltr|lr-tb|lowercase|lower-roman|lower-alpha|loose|list-item|line|line-through|line-edge|lighter|left|keep-all|justify|italic|inter-word|inter-ideograph|inside|inset|inline|inline-block|inherit|inactive|ideograph-space|ideograph-parenthesis|ideograph-numeric|ideograph-alpha|horizontal|hidden|help|hand|groove|fixed|ellipsis|e-resize|double|dotted|distribute|distribute-space|distribute-letter|distribute-all-lines|disc|disabled|default|decimal|dashed|crosshair|collapse|col-resize|circle|char|center|capitalize|break-word|break-all|bottom|both|bolder|bold|block|bidi-override|below|baseline|auto|always|all-scroll|absolute|table|table-cell)\\b'
    }, {
      className: 'value',
      begin: ':',
      end: ';',
      contains: [FUNCTION, VARIABLE, HEXCOLOR, hljs.CSS_NUMBER_MODE, hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, {
        className: 'important',
        begin: '!important'
      }]
    }, {
      className: 'at_rule',
      begin: '@',
      end: '[{;]',
      keywords: 'mixin include extend for if else each while charset import debug media page content font-face namespace warn',
      contains: [FUNCTION, VARIABLE, hljs.QUOTE_STRING_MODE, hljs.APOS_STRING_MODE, HEXCOLOR, hljs.CSS_NUMBER_MODE, {
        className: 'preprocessor',
        begin: '\\s[A-Za-z0-9_.-]+',
        relevance: 0
      }]
    }]
  };
};


},{}],129:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var VAR_IDENT_RE = '[a-z][a-zA-Z0-9_]*';
  var CHAR = {
    className: 'char',
    begin: '\\$.{1}'
  };
  var SYMBOL = {
    className: 'symbol',
    begin: '#' + hljs.UNDERSCORE_IDENT_RE
  };
  return {
    aliases: ['st'],
    keywords: 'self super nil true false thisContext',
    contains: [{
      className: 'comment',
      begin: '"',
      end: '"'
    }, hljs.APOS_STRING_MODE, {
      className: 'class',
      begin: '\\b[A-Z][A-Za-z0-9_]*',
      relevance: 0
    }, {
      className: 'method',
      begin: VAR_IDENT_RE + ':',
      relevance: 0
    }, hljs.C_NUMBER_MODE, SYMBOL, CHAR, {
      className: 'localvars',
      begin: '\\|[ ]*' + VAR_IDENT_RE + '([ ]+' + VAR_IDENT_RE + ')*[ ]*\\|',
      returnBegin: true,
      end: /\|/,
      illegal: /\S/,
      contains: [{begin: '(\\|[ ]*)?' + VAR_IDENT_RE}]
    }, {
      className: 'array',
      begin: '\\#\\(',
      end: '\\)',
      contains: [hljs.APOS_STRING_MODE, CHAR, hljs.C_NUMBER_MODE, SYMBOL]
    }]
  };
};


},{}],130:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var COMMENT_MODE = {
    className: 'comment',
    begin: '--',
    end: '$'
  };
  return {
    case_insensitive: true,
    illegal: /[<>]/,
    contains: [{
      className: 'operator',
      beginKeywords: 'begin end start commit rollback savepoint lock alter create drop rename call ' + 'delete do handler insert load replace select truncate update set show pragma grant ' + 'merge describe use explain help declare prepare execute deallocate savepoint release ' + 'unlock purge reset change stop analyze cache flush optimize repair kill ' + 'install uninstall checksum restore check backup',
      end: /;/,
      endsWithParent: true,
      keywords: {
        keyword: 'abs absolute acos action add adddate addtime aes_decrypt aes_encrypt after aggregate all allocate alter ' + 'analyze and any are as asc ascii asin assertion at atan atan2 atn2 authorization authors avg backup ' + 'before begin benchmark between bin binlog bit_and bit_count bit_length bit_or bit_xor both by ' + 'cache call cascade cascaded case cast catalog ceil ceiling chain change changed char_length ' + 'character_length charindex charset check checksum checksum_agg choose close coalesce ' + 'coercibility collate collation collationproperty column columns columns_updated commit compress concat ' + 'concat_ws concurrent connect connection connection_id consistent constraint constraints continue ' + 'contributors conv convert convert_tz corresponding cos cot count count_big crc32 create cross cume_dist ' + 'curdate current current_date current_time current_timestamp current_user cursor curtime data database ' + 'databases datalength date_add date_format date_sub dateadd datediff datefromparts datename ' + 'datepart datetime2fromparts datetimeoffsetfromparts day dayname dayofmonth dayofweek dayofyear ' + 'deallocate declare decode default deferrable deferred degrees delayed delete des_decrypt ' + 'des_encrypt des_key_file desc describe descriptor diagnostics difference disconnect distinct ' + 'distinctrow div do domain double drop dumpfile each else elt enclosed encode encrypt end end-exec ' + 'engine engines eomonth errors escape escaped event eventdata events except exception exec execute ' + 'exists exp explain export_set extended external extract fast fetch field fields find_in_set ' + 'first first_value floor flush for force foreign format found found_rows from from_base64 ' + 'from_days from_unixtime full function get get_format get_lock getdate getutcdate global go goto grant ' + 'grants greatest group group_concat grouping grouping_id gtid_subset gtid_subtract handler having help ' + 'hex high_priority hosts hour ident_current ident_incr ident_seed identified identity if ifnull ignore ' + 'iif ilike immediate in index indicator inet6_aton inet6_ntoa inet_aton inet_ntoa infile initially inner ' + 'innodb input insert install instr intersect into is is_free_lock is_ipv4 ' + 'is_ipv4_compat is_ipv4_mapped is_not is_not_null is_used_lock isdate isnull isolation join key kill ' + 'language last last_day last_insert_id last_value lcase lead leading least leaves left len lenght level ' + 'like limit lines ln load load_file local localtime localtimestamp locate lock log log10 log2 logfile ' + 'logs low_priority lower lpad ltrim make_set makedate maketime master master_pos_wait match matched max ' + 'md5 medium merge microsecond mid min minute mod mode module month monthname mutex name_const names ' + 'national natural nchar next no no_write_to_binlog not now nullif nvarchar oct ' + 'octet_length of old_password on only open optimize option optionally or ord order outer outfile output ' + 'pad parse partial partition password patindex percent_rank percentile_cont percentile_disc period_add ' + 'period_diff pi plugin position pow power pragma precision prepare preserve primary prior privileges ' + 'procedure procedure_analyze processlist profile profiles public publishingservername purge quarter ' + 'query quick quote quotename radians rand read references regexp relative relaylog release ' + 'release_lock rename repair repeat replace replicate reset restore restrict return returns reverse ' + 'revoke right rlike rollback rollup round row row_count rows rpad rtrim savepoint schema scroll ' + 'sec_to_time second section select serializable server session session_user set sha sha1 sha2 share ' + 'show sign sin size slave sleep smalldatetimefromparts snapshot some soname soundex ' + 'sounds_like space sql sql_big_result sql_buffer_result sql_cache sql_calc_found_rows sql_no_cache ' + 'sql_small_result sql_variant_property sqlstate sqrt square start starting status std ' + 'stddev stddev_pop stddev_samp stdev stdevp stop str str_to_date straight_join strcmp string stuff ' + 'subdate substr substring subtime subtring_index sum switchoffset sysdate sysdatetime sysdatetimeoffset ' + 'system_user sysutcdatetime table tables tablespace tan temporary terminated tertiary_weights then time ' + 'time_format time_to_sec timediff timefromparts timestamp timestampadd timestampdiff timezone_hour ' + 'timezone_minute to to_base64 to_days to_seconds todatetimeoffset trailing transaction translation ' + 'trigger trigger_nestlevel triggers trim truncate try_cast try_convert try_parse ucase uncompress ' + 'uncompressed_length unhex unicode uninstall union unique unix_timestamp unknown unlock update upgrade ' + 'upped upper usage use user user_resources using utc_date utc_time utc_timestamp uuid uuid_short ' + 'validate_password_strength value values var var_pop var_samp variables variance varp ' + 'version view warnings week weekday weekofyear weight_string when whenever where with work write xml ' + 'xor year yearweek zon',
        literal: 'true false null',
        built_in: 'array bigint binary bit blob boolean char character date dec decimal float int integer interval number ' + 'numeric real serial smallint varchar varying int8 serial8 text'
      },
      contains: [{
        className: 'string',
        begin: '\'',
        end: '\'',
        contains: [hljs.BACKSLASH_ESCAPE, {begin: '\'\''}]
      }, {
        className: 'string',
        begin: '"',
        end: '"',
        contains: [hljs.BACKSLASH_ESCAPE, {begin: '""'}]
      }, {
        className: 'string',
        begin: '`',
        end: '`',
        contains: [hljs.BACKSLASH_ESCAPE]
      }, hljs.C_NUMBER_MODE, hljs.C_BLOCK_COMMENT_MODE, COMMENT_MODE]
    }, hljs.C_BLOCK_COMMENT_MODE, COMMENT_MODE]
  };
};


},{}],131:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var SWIFT_KEYWORDS = {
    keyword: 'class deinit enum extension func import init let protocol static ' + 'struct subscript typealias var break case continue default do ' + 'else fallthrough if in for return switch where while as dynamicType ' + 'is new super self Self Type __COLUMN__ __FILE__ __FUNCTION__ ' + '__LINE__ associativity didSet get infix inout left mutating none ' + 'nonmutating operator override postfix precedence prefix right set ' + 'unowned unowned safe unsafe weak willSet',
    literal: 'true false nil',
    built_in: 'abs advance alignof alignofValue assert bridgeFromObjectiveC ' + 'bridgeFromObjectiveCUnconditional bridgeToObjectiveC ' + 'bridgeToObjectiveCUnconditional c contains count countElements ' + 'countLeadingZeros debugPrint debugPrintln distance dropFirst dropLast dump ' + 'encodeBitsAsWords enumerate equal false filter find getBridgedObjectiveCType ' + 'getVaList indices insertionSort isBridgedToObjectiveC ' + 'isBridgedVerbatimToObjectiveC isUniquelyReferenced join ' + 'lexicographicalCompare map max maxElement min minElement nil numericCast ' + 'partition posix print println quickSort reduce reflect reinterpretCast ' + 'reverse roundUpToAlignment sizeof sizeofValue sort split startsWith strideof ' + 'strideofValue swap swift toString transcode true underestimateCount ' + 'unsafeReflect withExtendedLifetime withObjectAtPlusZero withUnsafePointer ' + 'withUnsafePointerToObject withUnsafePointers withVaList'
  };
  var TYPE = {
    className: 'type',
    begin: '\\b[A-Z][\\w\']*',
    relevance: 0
  };
  var BLOCK_COMMENT = {
    className: 'comment',
    begin: '/\\*',
    end: '\\*/',
    contains: [hljs.PHRASAL_WORDS_MODE, 'self']
  };
  var SUBST = {
    className: 'subst',
    begin: /\\\(/,
    end: '\\)',
    keywords: SWIFT_KEYWORDS,
    contains: []
  };
  var NUMBERS = {
    className: 'number',
    begin: '\\b([\\d_]+(\\.[\\deE_]+)?|0x[a-fA-F0-9_]+(\\.[a-fA-F0-9p_]+)?|0b[01_]+|0o[0-7_]+)\\b',
    relevance: 0
  };
  var QUOTE_STRING_MODE = hljs.inherit(hljs.QUOTE_STRING_MODE, {contains: [SUBST, hljs.BACKSLASH_ESCAPE]});
  SUBST.contains = [NUMBERS];
  return {
    keywords: SWIFT_KEYWORDS,
    contains: [QUOTE_STRING_MODE, hljs.C_LINE_COMMENT_MODE, BLOCK_COMMENT, TYPE, NUMBERS, {
      className: 'func',
      beginKeywords: 'func',
      end: '{',
      excludeEnd: true,
      contains: [hljs.inherit(hljs.TITLE_MODE, {
        begin: /[A-Za-z$_][0-9A-Za-z$_]*/,
        illegal: /\(/
      }), {
        className: 'generics',
        begin: /\</,
        end: /\>/,
        illegal: /\>/
      }, {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        keywords: SWIFT_KEYWORDS,
        contains: ['self', NUMBERS, QUOTE_STRING_MODE, hljs.C_BLOCK_COMMENT_MODE, {begin: ':'}],
        illegal: /["']/
      }],
      illegal: /\[|%/
    }, {
      className: 'class',
      keywords: 'struct protocol class extension enum',
      begin: '(struct|protocol|class(?! (func|var))|extension|enum)',
      end: '\\{',
      excludeEnd: true,
      contains: [hljs.inherit(hljs.TITLE_MODE, {begin: /[A-Za-z$_][0-9A-Za-z$_]*/})]
    }, {
      className: 'preprocessor',
      begin: '(@assignment|@class_protocol|@exported|@final|@lazy|@noreturn|' + '@NSCopying|@NSManaged|@objc|@optional|@required|@auto_closure|' + '@noreturn|@IBAction|@IBDesignable|@IBInspectable|@IBOutlet|' + '@infix|@prefix|@postfix)'
    }]
  };
};


},{}],132:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var COMMAND1 = {
    className: 'command',
    begin: '\\\\[a-zA-Zа-яА-я]+[\\*]?'
  };
  var COMMAND2 = {
    className: 'command',
    begin: '\\\\[^a-zA-Zа-яА-я0-9]'
  };
  var SPECIAL = {
    className: 'special',
    begin: '[{}\\[\\]\\&#~]',
    relevance: 0
  };
  return {contains: [{
      begin: '\\\\[a-zA-Zа-яА-я]+[\\*]? *= *-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?',
      returnBegin: true,
      contains: [COMMAND1, COMMAND2, {
        className: 'number',
        begin: ' *=',
        end: '-?\\d*\\.?\\d+(pt|pc|mm|cm|in|dd|cc|ex|em)?',
        excludeBegin: true
      }],
      relevance: 10
    }, COMMAND1, COMMAND2, SPECIAL, {
      className: 'formula',
      begin: '\\$\\$',
      end: '\\$\\$',
      contains: [COMMAND1, COMMAND2, SPECIAL],
      relevance: 0
    }, {
      className: 'formula',
      begin: '\\$',
      end: '\\$',
      contains: [COMMAND1, COMMAND2, SPECIAL],
      relevance: 0
    }, {
      className: 'comment',
      begin: '%',
      end: '$',
      relevance: 0
    }]};
};


},{}],133:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var BUILT_IN_TYPES = 'bool byte i16 i32 i64 double string binary';
  return {
    keywords: {
      keyword: 'namespace const typedef struct enum service exception void oneway set list map required optional',
      built_in: BUILT_IN_TYPES,
      literal: 'true false'
    },
    contains: [hljs.QUOTE_STRING_MODE, hljs.NUMBER_MODE, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, {
      className: 'class',
      beginKeywords: 'struct enum service exception',
      end: /\{/,
      illegal: /\n/,
      contains: [hljs.inherit(hljs.TITLE_MODE, {starts: {
          endsWithParent: true,
          excludeEnd: true
        }})]
    }, {
      className: 'stl_container',
      begin: '\\b(set|list|map)\\s*<',
      end: '>',
      keywords: BUILT_IN_TYPES,
      contains: ['self']
    }]
  };
};


},{}],134:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    aliases: ['ts'],
    keywords: {
      keyword: 'in if for while finally var new function|0 do return void else break catch ' + 'instanceof with throw case default try this switch continue typeof delete ' + 'let yield const class public private get set super interface extends' + 'static constructor implements enum export import declare',
      literal: 'true false null undefined NaN Infinity',
      built_in: 'eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent ' + 'encodeURI encodeURIComponent escape unescape Object Function Boolean Error ' + 'EvalError InternalError RangeError ReferenceError StopIteration SyntaxError ' + 'TypeError URIError Number Math Date String RegExp Array Float32Array ' + 'Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array ' + 'Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require ' + 'module console window document any number boolean string void'
    },
    contains: [{
      className: 'pi',
      begin: /^\s*('|")use strict('|")/,
      relevance: 0
    }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.C_NUMBER_MODE, {
      begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
      keywords: 'return throw case',
      contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, hljs.REGEXP_MODE, {
        begin: /</,
        end: />;/,
        relevance: 0,
        subLanguage: 'xml'
      }],
      relevance: 0
    }, {
      className: 'function',
      beginKeywords: 'function',
      end: /\{/,
      excludeEnd: true,
      contains: [hljs.inherit(hljs.TITLE_MODE, {begin: /[A-Za-z$_][0-9A-Za-z$_]*/}), {
        className: 'params',
        begin: /\(/,
        end: /\)/,
        contains: [hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE],
        illegal: /["'\(]/
      }],
      illegal: /\[|%/,
      relevance: 0
    }, {
      className: 'constructor',
      beginKeywords: 'constructor',
      end: /\{/,
      excludeEnd: true,
      relevance: 10
    }, {
      className: 'module',
      beginKeywords: 'module',
      end: /\{/,
      excludeEnd: true
    }, {
      className: 'interface',
      beginKeywords: 'interface',
      end: /\{/,
      excludeEnd: true
    }, {begin: /\$[(.]/}, {
      begin: '\\.' + hljs.IDENT_RE,
      relevance: 0
    }]
  };
};


},{}],135:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    keywords: {
      keyword: 'char uchar unichar int uint long ulong short ushort int8 int16 int32 int64 uint8 ' + 'uint16 uint32 uint64 float double bool struct enum string void ' + 'weak unowned owned ' + 'async signal static abstract interface override ' + 'while do for foreach else switch case break default return try catch ' + 'public private protected internal ' + 'using new this get set const stdout stdin stderr var',
      built_in: 'DBus GLib CCode Gee Object',
      literal: 'false true null'
    },
    contains: [{
      className: 'class',
      beginKeywords: 'class interface delegate namespace',
      end: '{',
      excludeEnd: true,
      illegal: '[^,:\\n\\s\\.]',
      contains: [hljs.UNDERSCORE_TITLE_MODE]
    }, hljs.C_LINE_COMMENT_MODE, hljs.C_BLOCK_COMMENT_MODE, {
      className: 'string',
      begin: '"""',
      end: '"""',
      relevance: 5
    }, hljs.APOS_STRING_MODE, hljs.QUOTE_STRING_MODE, hljs.C_NUMBER_MODE, {
      className: 'preprocessor',
      begin: '^#',
      end: '$',
      relevance: 2
    }, {
      className: 'constant',
      begin: ' [A-Z_]+ ',
      relevance: 0
    }]
  };
};


},{}],136:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    aliases: ['vb'],
    case_insensitive: true,
    keywords: {
      keyword: 'addhandler addressof alias and andalso aggregate ansi as assembly auto binary by byref byval ' + 'call case catch class compare const continue custom declare default delegate dim distinct do ' + 'each equals else elseif end enum erase error event exit explicit finally for friend from function ' + 'get global goto group handles if implements imports in inherits interface into is isfalse isnot istrue ' + 'join key let lib like loop me mid mod module mustinherit mustoverride mybase myclass ' + 'namespace narrowing new next not notinheritable notoverridable ' + 'of off on operator option optional or order orelse overloads overridable overrides ' + 'paramarray partial preserve private property protected public ' + 'raiseevent readonly redim rem removehandler resume return ' + 'select set shadows shared skip static step stop structure strict sub synclock ' + 'take text then throw to try unicode until using when where while widening with withevents writeonly xor',
      built_in: 'boolean byte cbool cbyte cchar cdate cdec cdbl char cint clng cobj csbyte cshort csng cstr ctype ' + 'date decimal directcast double gettype getxmlnamespace iif integer long object ' + 'sbyte short single string trycast typeof uinteger ulong ushort',
      literal: 'true false nothing'
    },
    illegal: '//|{|}|endif|gosub|variant|wend',
    contains: [hljs.inherit(hljs.QUOTE_STRING_MODE, {contains: [{begin: '""'}]}), {
      className: 'comment',
      begin: '\'',
      end: '$',
      returnBegin: true,
      contains: [{
        className: 'xmlDocTag',
        begin: '\'\'\'|<!--|-->'
      }, {
        className: 'xmlDocTag',
        begin: '</?',
        end: '>'
      }]
    }, hljs.C_NUMBER_MODE, {
      className: 'preprocessor',
      begin: '#',
      end: '$',
      keywords: 'if else elseif end region externalsource'
    }]
  };
};


},{}],137:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    aliases: ['vbs'],
    case_insensitive: true,
    keywords: {
      keyword: 'call class const dim do loop erase execute executeglobal exit for each next function ' + 'if then else on error option explicit new private property let get public randomize ' + 'redim rem select case set stop sub while wend with end to elseif is or xor and not ' + 'class_initialize class_terminate default preserve in me byval byref step resume goto',
      built_in: 'lcase month vartype instrrev ubound setlocale getobject rgb getref string ' + 'weekdayname rnd dateadd monthname now day minute isarray cbool round formatcurrency ' + 'conversions csng timevalue second year space abs clng timeserial fixs len asc ' + 'isempty maths dateserial atn timer isobject filter weekday datevalue ccur isdate ' + 'instr datediff formatdatetime replace isnull right sgn array snumeric log cdbl hex ' + 'chr lbound msgbox ucase getlocale cos cdate cbyte rtrim join hour oct typename trim ' + 'strcomp int createobject loadpicture tan formatnumber mid scriptenginebuildversion ' + 'scriptengine split scriptengineminorversion cint sin datepart ltrim sqr ' + 'scriptenginemajorversion time derived eval date formatpercent exp inputbox left ascw ' + 'chrw regexp server response request cstr err',
      literal: 'true false null nothing empty'
    },
    illegal: '//',
    contains: [hljs.inherit(hljs.QUOTE_STRING_MODE, {contains: [{begin: '""'}]}), {
      className: 'comment',
      begin: /'/,
      end: /$/,
      relevance: 0
    }, hljs.C_NUMBER_MODE]
  };
};


},{}],138:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    case_insensitive: true,
    keywords: {
      keyword: 'abs access after alias all and architecture array assert attribute begin block ' + 'body buffer bus case component configuration constant context cover disconnect ' + 'downto default else elsif end entity exit fairness file for force function generate ' + 'generic group guarded if impure in inertial inout is label library linkage literal ' + 'loop map mod nand new next nor not null of on open or others out package port ' + 'postponed procedure process property protected pure range record register reject ' + 'release rem report restrict restrict_guarantee return rol ror select sequence ' + 'severity shared signal sla sll sra srl strong subtype then to transport type ' + 'unaffected units until use variable vmode vprop vunit wait when while with xnor xor',
      typename: 'boolean bit character severity_level integer time delay_length natural positive ' + 'string bit_vector file_open_kind file_open_status std_ulogic std_ulogic_vector ' + 'std_logic std_logic_vector unsigned signed boolean_vector integer_vector ' + 'real_vector time_vector'
    },
    illegal: '{',
    contains: [hljs.C_BLOCK_COMMENT_MODE, {
      className: 'comment',
      begin: '--',
      end: '$'
    }, hljs.QUOTE_STRING_MODE, hljs.C_NUMBER_MODE, {
      className: 'literal',
      begin: '\'(U|X|0|1|Z|W|L|H|-)\'',
      contains: [hljs.BACKSLASH_ESCAPE]
    }, {
      className: 'attribute',
      begin: '\'[A-Za-z](_?[A-Za-z0-9])*',
      contains: [hljs.BACKSLASH_ESCAPE]
    }]
  };
};


},{}],139:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    lexemes: /[!#@\w]+/,
    keywords: {
      keyword: 'N|0 P|0 X|0 a|0 ab abc abo al am an|0 ar arga argd arge argdo argg argl argu as au aug aun b|0 bN ba bad bd be bel bf bl bm bn bo bp br brea breaka breakd breakl bro bufdo buffers bun bw c|0 cN cNf ca cabc caddb cad caddf cal cat cb cc ccl cd ce cex cf cfir cgetb cgete cg changes chd che checkt cl cla clo cm cmapc cme cn cnew cnf cno cnorea cnoreme co col colo com comc comp con conf cope ' + 'cp cpf cq cr cs cst cu cuna cunme cw d|0 delm deb debugg delc delf dif diffg diffo diffp diffpu diffs diffthis dig di dl dell dj dli do doautoa dp dr ds dsp e|0 ea ec echoe echoh echom echon el elsei em en endfo endf endt endw ene ex exe exi exu f|0 files filet fin fina fini fir fix fo foldc foldd folddoc foldo for fu g|0 go gr grepa gu gv ha h|0 helpf helpg helpt hi hid his i|0 ia iabc if ij il im imapc ' + 'ime ino inorea inoreme int is isp iu iuna iunme j|0 ju k|0 keepa kee keepj lN lNf l|0 lad laddb laddf la lan lat lb lc lch lcl lcs le lefta let lex lf lfir lgetb lgete lg lgr lgrepa lh ll lla lli lmak lm lmapc lne lnew lnf ln loadk lo loc lockv lol lope lp lpf lr ls lt lu lua luad luaf lv lvimgrepa lw m|0 ma mak map mapc marks mat me menut mes mk mks mksp mkv mkvie mod mz mzf nbc nb nbs n|0 new nm nmapc nme nn nnoreme noa no noh norea noreme norm nu nun nunme ol o|0 om omapc ome on ono onoreme opt ou ounme ow p|0 ' + 'profd prof pro promptr pc ped pe perld po popu pp pre prev ps pt ptN ptf ptj ptl ptn ptp ptr pts pu pw py3 python3 py3d py3f py pyd pyf q|0 quita qa r|0 rec red redi redr redraws reg res ret retu rew ri rightb rub rubyd rubyf rund ru rv s|0 sN san sa sal sav sb sbN sba sbf sbl sbm sbn sbp sbr scrip scripte scs se setf setg setl sf sfir sh sim sig sil sl sla sm smap smapc sme sn sni sno snor snoreme sor ' + 'so spelld spe spelli spellr spellu spellw sp spr sre st sta startg startr star stopi stj sts sun sunm sunme sus sv sw sy synti sync t|0 tN tabN tabc tabdo tabe tabf tabfir tabl tabm tabnew ' + 'tabn tabo tabp tabr tabs tab ta tags tc tcld tclf te tf th tj tl tm tn to tp tr try ts tu u|0 undoj undol una unh unl unlo unm unme uns up v|0 ve verb vert vim vimgrepa vi viu vie vm vmapc vme vne vn vnoreme vs vu vunme windo w|0 wN wa wh wi winc winp wn wp wq wqa ws wu wv x|0 xa xmapc xm xme xn xnoreme xu xunme y|0 z|0 ~ ' + 'Next Print append abbreviate abclear aboveleft all amenu anoremenu args argadd argdelete argedit argglobal arglocal argument ascii autocmd augroup aunmenu buffer bNext ball badd bdelete behave belowright bfirst blast bmodified bnext botright bprevious brewind break breakadd breakdel breaklist browse bunload ' + 'bwipeout change cNext cNfile cabbrev cabclear caddbuffer caddexpr caddfile call catch cbuffer cclose center cexpr cfile cfirst cgetbuffer cgetexpr cgetfile chdir checkpath checktime clist clast close cmap cmapclear cmenu cnext cnewer cnfile cnoremap cnoreabbrev cnoremenu copy colder colorscheme command comclear compiler continue confirm copen cprevious cpfile cquit crewind cscope cstag cunmap ' + 'cunabbrev cunmenu cwindow delete delmarks debug debuggreedy delcommand delfunction diffupdate diffget diffoff diffpatch diffput diffsplit digraphs display deletel djump dlist doautocmd doautoall deletep drop dsearch dsplit edit earlier echo echoerr echohl echomsg else elseif emenu endif endfor ' + 'endfunction endtry endwhile enew execute exit exusage file filetype find finally finish first fixdel fold foldclose folddoopen folddoclosed foldopen function global goto grep grepadd gui gvim hardcopy help helpfind helpgrep helptags highlight hide history insert iabbrev iabclear ijump ilist imap ' + 'imapclear imenu inoremap inoreabbrev inoremenu intro isearch isplit iunmap iunabbrev iunmenu join jumps keepalt keepmarks keepjumps lNext lNfile list laddexpr laddbuffer laddfile last language later lbuffer lcd lchdir lclose lcscope left leftabove lexpr lfile lfirst lgetbuffer lgetexpr lgetfile lgrep lgrepadd lhelpgrep llast llist lmake lmap lmapclear lnext lnewer lnfile lnoremap loadkeymap loadview ' + 'lockmarks lockvar lolder lopen lprevious lpfile lrewind ltag lunmap luado luafile lvimgrep lvimgrepadd lwindow move mark make mapclear match menu menutranslate messages mkexrc mksession mkspell mkvimrc mkview mode mzscheme mzfile nbclose nbkey nbsart next nmap nmapclear nmenu nnoremap ' + 'nnoremenu noautocmd noremap nohlsearch noreabbrev noremenu normal number nunmap nunmenu oldfiles open omap omapclear omenu only onoremap onoremenu options ounmap ounmenu ownsyntax print profdel profile promptfind promptrepl pclose pedit perl perldo pop popup ppop preserve previous psearch ptag ptNext ' + 'ptfirst ptjump ptlast ptnext ptprevious ptrewind ptselect put pwd py3do py3file python pydo pyfile quit quitall qall read recover redo redir redraw redrawstatus registers resize retab return rewind right rightbelow ruby rubydo rubyfile rundo runtime rviminfo substitute sNext sandbox sargument sall saveas sbuffer sbNext sball sbfirst sblast sbmodified sbnext sbprevious sbrewind scriptnames scriptencoding ' + 'scscope set setfiletype setglobal setlocal sfind sfirst shell simalt sign silent sleep slast smagic smapclear smenu snext sniff snomagic snoremap snoremenu sort source spelldump spellgood spellinfo spellrepall spellundo spellwrong split sprevious srewind stop stag startgreplace startreplace ' + 'startinsert stopinsert stjump stselect sunhide sunmap sunmenu suspend sview swapname syntax syntime syncbind tNext tabNext tabclose tabedit tabfind tabfirst tablast tabmove tabnext tabonly tabprevious tabrewind tag tcl tcldo tclfile tearoff tfirst throw tjump tlast tmenu tnext topleft tprevious ' + 'trewind tselect tunmenu undo undojoin undolist unabbreviate unhide unlet unlockvar unmap unmenu unsilent update vglobal version verbose vertical vimgrep vimgrepadd visual viusage view vmap vmapclear vmenu vnew ' + 'vnoremap vnoremenu vsplit vunmap vunmenu write wNext wall while winsize wincmd winpos wnext wprevious wqall wsverb wundo wviminfo xit xall xmapclear xmap xmenu xnoremap xnoremenu xunmap xunmenu yank',
      built_in: 'abs acos add and append argc argidx argv asin atan atan2 browse browsedir bufexists buflisted bufloaded bufname bufnr bufwinnr byte2line byteidx call ceil changenr char2nr cindent clearmatches col complete complete_add complete_check confirm copy cos cosh count cscope_connection cursor ' + 'deepcopy delete did_filetype diff_filler diff_hlID empty escape eval eventhandler executable exists exp expand extend feedkeys filereadable filewritable filter finddir findfile float2nr floor fmod fnameescape fnamemodify foldclosed foldclosedend foldlevel foldtext foldtextresult foreground function ' + 'garbagecollect get getbufline getbufvar getchar getcharmod getcmdline getcmdpos getcmdtype getcwd getfontname getfperm getfsize getftime getftype getline getloclist getmatches getpid getpos getqflist getreg getregtype gettabvar gettabwinvar getwinposx getwinposy getwinvar glob globpath has has_key ' + 'haslocaldir hasmapto histadd histdel histget histnr hlexists hlID hostname iconv indent index input inputdialog inputlist inputrestore inputsave inputsecret insert invert isdirectory islocked items join keys len libcall libcallnr line line2byte lispindent localtime log log10 luaeval map maparg mapcheck ' + 'match matchadd matcharg matchdelete matchend matchlist matchstr max min mkdir mode mzeval nextnonblank nr2char or pathshorten pow prevnonblank printf pumvisible py3eval pyeval range readfile reltime reltimestr remote_expr remote_foreground remote_peek remote_read remote_send remove rename repeat ' + 'resolve reverse round screenattr screenchar screencol screenrow search searchdecl searchpair searchpairpos searchpos server2client serverlist setbufvar setcmdpos setline setloclist setmatches setpos setqflist setreg settabvar settabwinvar setwinvar sha256 shellescape shiftwidth simplify sin ' + 'sinh sort soundfold spellbadword spellsuggest split sqrt str2float str2nr strchars strdisplaywidth strftime stridx string strlen strpart strridx strtrans strwidth submatch substitute synconcealed synID synIDattr ' + 'synIDtrans synstack system tabpagebuflist tabpagenr tabpagewinnr tagfiles taglist tan tanh tempname tolower toupper tr trunc type undofile undotree values virtcol visualmode wildmenumode winbufnr wincol winheight winline winnr winrestcmd winrestview winsaveview winwidth writefile xor'
    },
    illegal: /[{:]/,
    contains: [hljs.NUMBER_MODE, hljs.APOS_STRING_MODE, {
      className: 'string',
      begin: /"((\\")|[^"\n])*("|\n)/
    }, {
      className: 'variable',
      begin: /[bwtglsav]:[\w\d_]*/
    }, {
      className: 'function',
      beginKeywords: 'function function!',
      end: '$',
      relevance: 0,
      contains: [hljs.TITLE_MODE, {
        className: 'params',
        begin: '\\(',
        end: '\\)'
      }]
    }]
  };
};


},{}],140:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  return {
    case_insensitive: true,
    lexemes: '\\.?' + hljs.IDENT_RE,
    keywords: {
      keyword: 'lock rep repe repz repne repnz xaquire xrelease bnd nobnd ' + 'aaa aad aam aas adc add and arpl bb0_reset bb1_reset bound bsf bsr bswap bt btc btr bts call cbw cdq cdqe clc cld cli clts cmc cmp cmpsb cmpsd cmpsq cmpsw cmpxchg cmpxchg486 cmpxchg8b cmpxchg16b cpuid cpu_read cpu_write cqo cwd cwde daa das dec div dmint emms enter equ f2xm1 fabs fadd faddp fbld fbstp fchs fclex fcmovb fcmovbe fcmove fcmovnb fcmovnbe fcmovne fcmovnu fcmovu fcom fcomi fcomip fcomp fcompp fcos fdecstp fdisi fdiv fdivp fdivr fdivrp femms feni ffree ffreep fiadd ficom ficomp fidiv fidivr fild fimul fincstp finit fist fistp fisttp fisub fisubr fld fld1 fldcw fldenv fldl2e fldl2t fldlg2 fldln2 fldpi fldz fmul fmulp fnclex fndisi fneni fninit fnop fnsave fnstcw fnstenv fnstsw fpatan fprem fprem1 fptan frndint frstor fsave fscale fsetpm fsin fsincos fsqrt fst fstcw fstenv fstp fstsw fsub fsubp fsubr fsubrp ftst fucom fucomi fucomip fucomp fucompp fxam fxch fxtract fyl2x fyl2xp1 hlt ibts icebp idiv imul in inc incbin insb insd insw int int01 int1 int03 int3 into invd invpcid invlpg invlpga iret iretd iretq iretw jcxz jecxz jrcxz jmp jmpe lahf lar lds lea leave les lfence lfs lgdt lgs lidt lldt lmsw loadall loadall286 lodsb lodsd lodsq lodsw loop loope loopne loopnz loopz lsl lss ltr mfence monitor mov movd movq movsb movsd movsq movsw movsx movsxd movzx mul mwait neg nop not or out outsb outsd outsw packssdw packsswb packuswb paddb paddd paddsb paddsiw paddsw paddusb paddusw paddw pand pandn pause paveb pavgusb pcmpeqb pcmpeqd pcmpeqw pcmpgtb pcmpgtd pcmpgtw pdistib pf2id pfacc pfadd pfcmpeq pfcmpge pfcmpgt pfmax pfmin pfmul pfrcp pfrcpit1 pfrcpit2 pfrsqit1 pfrsqrt pfsub pfsubr pi2fd pmachriw pmaddwd pmagw pmulhriw pmulhrwa pmulhrwc pmulhw pmullw pmvgezb pmvlzb pmvnzb pmvzb pop popa popad popaw popf popfd popfq popfw por prefetch prefetchw pslld psllq psllw psrad psraw psrld psrlq psrlw psubb psubd psubsb psubsiw psubsw psubusb psubusw psubw punpckhbw punpckhdq punpckhwd punpcklbw punpckldq punpcklwd push pusha pushad pushaw pushf pushfd pushfq pushfw pxor rcl rcr rdshr rdmsr rdpmc rdtsc rdtscp ret retf retn rol ror rdm rsdc rsldt rsm rsts sahf sal salc sar sbb scasb scasd scasq scasw sfence sgdt shl shld shr shrd sidt sldt skinit smi smint smintold smsw stc std sti stosb stosd stosq stosw str sub svdc svldt svts swapgs syscall sysenter sysexit sysret test ud0 ud1 ud2b ud2 ud2a umov verr verw fwait wbinvd wrshr wrmsr xadd xbts xchg xlatb xlat xor cmove cmovz cmovne cmovnz cmova cmovnbe cmovae cmovnb cmovb cmovnae cmovbe cmovna cmovg cmovnle cmovge cmovnl cmovl cmovnge cmovle cmovng cmovc cmovnc cmovo cmovno cmovs cmovns cmovp cmovpe cmovnp cmovpo je jz jne jnz ja jnbe jae jnb jb jnae jbe jna jg jnle jge jnl jl jnge jle jng jc jnc jo jno js jns jpo jnp jpe jp sete setz setne setnz seta setnbe setae setnb setnc setb setnae setcset setbe setna setg setnle setge setnl setl setnge setle setng sets setns seto setno setpe setp setpo setnp addps addss andnps andps cmpeqps cmpeqss cmpleps cmpless cmpltps cmpltss cmpneqps cmpneqss cmpnleps cmpnless cmpnltps cmpnltss cmpordps cmpordss cmpunordps cmpunordss cmpps cmpss comiss cvtpi2ps cvtps2pi cvtsi2ss cvtss2si cvttps2pi cvttss2si divps divss ldmxcsr maxps maxss minps minss movaps movhps movlhps movlps movhlps movmskps movntps movss movups mulps mulss orps rcpps rcpss rsqrtps rsqrtss shufps sqrtps sqrtss stmxcsr subps subss ucomiss unpckhps unpcklps xorps fxrstor fxrstor64 fxsave fxsave64 xgetbv xsetbv xsave xsave64 xsaveopt xsaveopt64 xrstor xrstor64 prefetchnta prefetcht0 prefetcht1 prefetcht2 maskmovq movntq pavgb pavgw pextrw pinsrw pmaxsw pmaxub pminsw pminub pmovmskb pmulhuw psadbw pshufw pf2iw pfnacc pfpnacc pi2fw pswapd maskmovdqu clflush movntdq movnti movntpd movdqa movdqu movdq2q movq2dq paddq pmuludq pshufd pshufhw pshuflw pslldq psrldq psubq punpckhqdq punpcklqdq addpd addsd andnpd andpd cmpeqpd cmpeqsd cmplepd cmplesd cmpltpd cmpltsd cmpneqpd cmpneqsd cmpnlepd cmpnlesd cmpnltpd cmpnltsd cmpordpd cmpordsd cmpunordpd cmpunordsd cmppd comisd cvtdq2pd cvtdq2ps cvtpd2dq cvtpd2pi cvtpd2ps cvtpi2pd cvtps2dq cvtps2pd cvtsd2si cvtsd2ss cvtsi2sd cvtss2sd cvttpd2pi cvttpd2dq cvttps2dq cvttsd2si divpd divsd maxpd maxsd minpd minsd movapd movhpd movlpd movmskpd movupd mulpd mulsd orpd shufpd sqrtpd sqrtsd subpd subsd ucomisd unpckhpd unpcklpd xorpd addsubpd addsubps haddpd haddps hsubpd hsubps lddqu movddup movshdup movsldup clgi stgi vmcall vmclear vmfunc vmlaunch vmload vmmcall vmptrld vmptrst vmread vmresume vmrun vmsave vmwrite vmxoff vmxon invept invvpid pabsb pabsw pabsd palignr phaddw phaddd phaddsw phsubw phsubd phsubsw pmaddubsw pmulhrsw pshufb psignb psignw psignd extrq insertq movntsd movntss lzcnt blendpd blendps blendvpd blendvps dppd dpps extractps insertps movntdqa mpsadbw packusdw pblendvb pblendw pcmpeqq pextrb pextrd pextrq phminposuw pinsrb pinsrd pinsrq pmaxsb pmaxsd pmaxud pmaxuw pminsb pminsd pminud pminuw pmovsxbw pmovsxbd pmovsxbq pmovsxwd pmovsxwq pmovsxdq pmovzxbw pmovzxbd pmovzxbq pmovzxwd pmovzxwq pmovzxdq pmuldq pmulld ptest roundpd roundps roundsd roundss crc32 pcmpestri pcmpestrm pcmpistri pcmpistrm pcmpgtq popcnt getsec pfrcpv pfrsqrtv movbe aesenc aesenclast aesdec aesdeclast aesimc aeskeygenassist vaesenc vaesenclast vaesdec vaesdeclast vaesimc vaeskeygenassist vaddpd vaddps vaddsd vaddss vaddsubpd vaddsubps vandpd vandps vandnpd vandnps vblendpd vblendps vblendvpd vblendvps vbroadcastss vbroadcastsd vbroadcastf128 vcmpeq_ospd vcmpeqpd vcmplt_ospd vcmpltpd vcmple_ospd vcmplepd vcmpunord_qpd vcmpunordpd vcmpneq_uqpd vcmpneqpd vcmpnlt_uspd vcmpnltpd vcmpnle_uspd vcmpnlepd vcmpord_qpd vcmpordpd vcmpeq_uqpd vcmpnge_uspd vcmpngepd vcmpngt_uspd vcmpngtpd vcmpfalse_oqpd vcmpfalsepd vcmpneq_oqpd vcmpge_ospd vcmpgepd vcmpgt_ospd vcmpgtpd vcmptrue_uqpd vcmptruepd vcmplt_oqpd vcmple_oqpd vcmpunord_spd vcmpneq_uspd vcmpnlt_uqpd vcmpnle_uqpd vcmpord_spd vcmpeq_uspd vcmpnge_uqpd vcmpngt_uqpd vcmpfalse_ospd vcmpneq_ospd vcmpge_oqpd vcmpgt_oqpd vcmptrue_uspd vcmppd vcmpeq_osps vcmpeqps vcmplt_osps vcmpltps vcmple_osps vcmpleps vcmpunord_qps vcmpunordps vcmpneq_uqps vcmpneqps vcmpnlt_usps vcmpnltps vcmpnle_usps vcmpnleps vcmpord_qps vcmpordps vcmpeq_uqps vcmpnge_usps vcmpngeps vcmpngt_usps vcmpngtps vcmpfalse_oqps vcmpfalseps vcmpneq_oqps vcmpge_osps vcmpgeps vcmpgt_osps vcmpgtps vcmptrue_uqps vcmptrueps vcmplt_oqps vcmple_oqps vcmpunord_sps vcmpneq_usps vcmpnlt_uqps vcmpnle_uqps vcmpord_sps vcmpeq_usps vcmpnge_uqps vcmpngt_uqps vcmpfalse_osps vcmpneq_osps vcmpge_oqps vcmpgt_oqps vcmptrue_usps vcmpps vcmpeq_ossd vcmpeqsd vcmplt_ossd vcmpltsd vcmple_ossd vcmplesd vcmpunord_qsd vcmpunordsd vcmpneq_uqsd vcmpneqsd vcmpnlt_ussd vcmpnltsd vcmpnle_ussd vcmpnlesd vcmpord_qsd vcmpordsd vcmpeq_uqsd vcmpnge_ussd vcmpngesd vcmpngt_ussd vcmpngtsd vcmpfalse_oqsd vcmpfalsesd vcmpneq_oqsd vcmpge_ossd vcmpgesd vcmpgt_ossd vcmpgtsd vcmptrue_uqsd vcmptruesd vcmplt_oqsd vcmple_oqsd vcmpunord_ssd vcmpneq_ussd vcmpnlt_uqsd vcmpnle_uqsd vcmpord_ssd vcmpeq_ussd vcmpnge_uqsd vcmpngt_uqsd vcmpfalse_ossd vcmpneq_ossd vcmpge_oqsd vcmpgt_oqsd vcmptrue_ussd vcmpsd vcmpeq_osss vcmpeqss vcmplt_osss vcmpltss vcmple_osss vcmpless vcmpunord_qss vcmpunordss vcmpneq_uqss vcmpneqss vcmpnlt_usss vcmpnltss vcmpnle_usss vcmpnless vcmpord_qss vcmpordss vcmpeq_uqss vcmpnge_usss vcmpngess vcmpngt_usss vcmpngtss vcmpfalse_oqss vcmpfalsess vcmpneq_oqss vcmpge_osss vcmpgess vcmpgt_osss vcmpgtss vcmptrue_uqss vcmptruess vcmplt_oqss vcmple_oqss vcmpunord_sss vcmpneq_usss vcmpnlt_uqss vcmpnle_uqss vcmpord_sss vcmpeq_usss vcmpnge_uqss vcmpngt_uqss vcmpfalse_osss vcmpneq_osss vcmpge_oqss vcmpgt_oqss vcmptrue_usss vcmpss vcomisd vcomiss vcvtdq2pd vcvtdq2ps vcvtpd2dq vcvtpd2ps vcvtps2dq vcvtps2pd vcvtsd2si vcvtsd2ss vcvtsi2sd vcvtsi2ss vcvtss2sd vcvtss2si vcvttpd2dq vcvttps2dq vcvttsd2si vcvttss2si vdivpd vdivps vdivsd vdivss vdppd vdpps vextractf128 vextractps vhaddpd vhaddps vhsubpd vhsubps vinsertf128 vinsertps vlddqu vldqqu vldmxcsr vmaskmovdqu vmaskmovps vmaskmovpd vmaxpd vmaxps vmaxsd vmaxss vminpd vminps vminsd vminss vmovapd vmovaps vmovd vmovq vmovddup vmovdqa vmovqqa vmovdqu vmovqqu vmovhlps vmovhpd vmovhps vmovlhps vmovlpd vmovlps vmovmskpd vmovmskps vmovntdq vmovntqq vmovntdqa vmovntpd vmovntps vmovsd vmovshdup vmovsldup vmovss vmovupd vmovups vmpsadbw vmulpd vmulps vmulsd vmulss vorpd vorps vpabsb vpabsw vpabsd vpacksswb vpackssdw vpackuswb vpackusdw vpaddb vpaddw vpaddd vpaddq vpaddsb vpaddsw vpaddusb vpaddusw vpalignr vpand vpandn vpavgb vpavgw vpblendvb vpblendw vpcmpestri vpcmpestrm vpcmpistri vpcmpistrm vpcmpeqb vpcmpeqw vpcmpeqd vpcmpeqq vpcmpgtb vpcmpgtw vpcmpgtd vpcmpgtq vpermilpd vpermilps vperm2f128 vpextrb vpextrw vpextrd vpextrq vphaddw vphaddd vphaddsw vphminposuw vphsubw vphsubd vphsubsw vpinsrb vpinsrw vpinsrd vpinsrq vpmaddwd vpmaddubsw vpmaxsb vpmaxsw vpmaxsd vpmaxub vpmaxuw vpmaxud vpminsb vpminsw vpminsd vpminub vpminuw vpminud vpmovmskb vpmovsxbw vpmovsxbd vpmovsxbq vpmovsxwd vpmovsxwq vpmovsxdq vpmovzxbw vpmovzxbd vpmovzxbq vpmovzxwd vpmovzxwq vpmovzxdq vpmulhuw vpmulhrsw vpmulhw vpmullw vpmulld vpmuludq vpmuldq vpor vpsadbw vpshufb vpshufd vpshufhw vpshuflw vpsignb vpsignw vpsignd vpslldq vpsrldq vpsllw vpslld vpsllq vpsraw vpsrad vpsrlw vpsrld vpsrlq vptest vpsubb vpsubw vpsubd vpsubq vpsubsb vpsubsw vpsubusb vpsubusw vpunpckhbw vpunpckhwd vpunpckhdq vpunpckhqdq vpunpcklbw vpunpcklwd vpunpckldq vpunpcklqdq vpxor vrcpps vrcpss vrsqrtps vrsqrtss vroundpd vroundps vroundsd vroundss vshufpd vshufps vsqrtpd vsqrtps vsqrtsd vsqrtss vstmxcsr vsubpd vsubps vsubsd vsubss vtestps vtestpd vucomisd vucomiss vunpckhpd vunpckhps vunpcklpd vunpcklps vxorpd vxorps vzeroall vzeroupper pclmullqlqdq pclmulhqlqdq pclmullqhqdq pclmulhqhqdq pclmulqdq vpclmullqlqdq vpclmulhqlqdq vpclmullqhqdq vpclmulhqhqdq vpclmulqdq vfmadd132ps vfmadd132pd vfmadd312ps vfmadd312pd vfmadd213ps vfmadd213pd vfmadd123ps vfmadd123pd vfmadd231ps vfmadd231pd vfmadd321ps vfmadd321pd vfmaddsub132ps vfmaddsub132pd vfmaddsub312ps vfmaddsub312pd vfmaddsub213ps vfmaddsub213pd vfmaddsub123ps vfmaddsub123pd vfmaddsub231ps vfmaddsub231pd vfmaddsub321ps vfmaddsub321pd vfmsub132ps vfmsub132pd vfmsub312ps vfmsub312pd vfmsub213ps vfmsub213pd vfmsub123ps vfmsub123pd vfmsub231ps vfmsub231pd vfmsub321ps vfmsub321pd vfmsubadd132ps vfmsubadd132pd vfmsubadd312ps vfmsubadd312pd vfmsubadd213ps vfmsubadd213pd vfmsubadd123ps vfmsubadd123pd vfmsubadd231ps vfmsubadd231pd vfmsubadd321ps vfmsubadd321pd vfnmadd132ps vfnmadd132pd vfnmadd312ps vfnmadd312pd vfnmadd213ps vfnmadd213pd vfnmadd123ps vfnmadd123pd vfnmadd231ps vfnmadd231pd vfnmadd321ps vfnmadd321pd vfnmsub132ps vfnmsub132pd vfnmsub312ps vfnmsub312pd vfnmsub213ps vfnmsub213pd vfnmsub123ps vfnmsub123pd vfnmsub231ps vfnmsub231pd vfnmsub321ps vfnmsub321pd vfmadd132ss vfmadd132sd vfmadd312ss vfmadd312sd vfmadd213ss vfmadd213sd vfmadd123ss vfmadd123sd vfmadd231ss vfmadd231sd vfmadd321ss vfmadd321sd vfmsub132ss vfmsub132sd vfmsub312ss vfmsub312sd vfmsub213ss vfmsub213sd vfmsub123ss vfmsub123sd vfmsub231ss vfmsub231sd vfmsub321ss vfmsub321sd vfnmadd132ss vfnmadd132sd vfnmadd312ss vfnmadd312sd vfnmadd213ss vfnmadd213sd vfnmadd123ss vfnmadd123sd vfnmadd231ss vfnmadd231sd vfnmadd321ss vfnmadd321sd vfnmsub132ss vfnmsub132sd vfnmsub312ss vfnmsub312sd vfnmsub213ss vfnmsub213sd vfnmsub123ss vfnmsub123sd vfnmsub231ss vfnmsub231sd vfnmsub321ss vfnmsub321sd rdfsbase rdgsbase rdrand wrfsbase wrgsbase vcvtph2ps vcvtps2ph adcx adox rdseed clac stac xstore xcryptecb xcryptcbc xcryptctr xcryptcfb xcryptofb montmul xsha1 xsha256 llwpcb slwpcb lwpval lwpins vfmaddpd vfmaddps vfmaddsd vfmaddss vfmaddsubpd vfmaddsubps vfmsubaddpd vfmsubaddps vfmsubpd vfmsubps vfmsubsd vfmsubss vfnmaddpd vfnmaddps vfnmaddsd vfnmaddss vfnmsubpd vfnmsubps vfnmsubsd vfnmsubss vfrczpd vfrczps vfrczsd vfrczss vpcmov vpcomb vpcomd vpcomq vpcomub vpcomud vpcomuq vpcomuw vpcomw vphaddbd vphaddbq vphaddbw vphadddq vphaddubd vphaddubq vphaddubw vphaddudq vphadduwd vphadduwq vphaddwd vphaddwq vphsubbw vphsubdq vphsubwd vpmacsdd vpmacsdqh vpmacsdql vpmacssdd vpmacssdqh vpmacssdql vpmacsswd vpmacssww vpmacswd vpmacsww vpmadcsswd vpmadcswd vpperm vprotb vprotd vprotq vprotw vpshab vpshad vpshaq vpshaw vpshlb vpshld vpshlq vpshlw vbroadcasti128 vpblendd vpbroadcastb vpbroadcastw vpbroadcastd vpbroadcastq vpermd vpermpd vpermps vpermq vperm2i128 vextracti128 vinserti128 vpmaskmovd vpmaskmovq vpsllvd vpsllvq vpsravd vpsrlvd vpsrlvq vgatherdpd vgatherqpd vgatherdps vgatherqps vpgatherdd vpgatherqd vpgatherdq vpgatherqq xabort xbegin xend xtest andn bextr blci blcic blsi blsic blcfill blsfill blcmsk blsmsk blsr blcs bzhi mulx pdep pext rorx sarx shlx shrx tzcnt tzmsk t1mskc valignd valignq vblendmpd vblendmps vbroadcastf32x4 vbroadcastf64x4 vbroadcasti32x4 vbroadcasti64x4 vcompresspd vcompressps vcvtpd2udq vcvtps2udq vcvtsd2usi vcvtss2usi vcvttpd2udq vcvttps2udq vcvttsd2usi vcvttss2usi vcvtudq2pd vcvtudq2ps vcvtusi2sd vcvtusi2ss vexpandpd vexpandps vextractf32x4 vextractf64x4 vextracti32x4 vextracti64x4 vfixupimmpd vfixupimmps vfixupimmsd vfixupimmss vgetexppd vgetexpps vgetexpsd vgetexpss vgetmantpd vgetmantps vgetmantsd vgetmantss vinsertf32x4 vinsertf64x4 vinserti32x4 vinserti64x4 vmovdqa32 vmovdqa64 vmovdqu32 vmovdqu64 vpabsq vpandd vpandnd vpandnq vpandq vpblendmd vpblendmq vpcmpltd vpcmpled vpcmpneqd vpcmpnltd vpcmpnled vpcmpd vpcmpltq vpcmpleq vpcmpneqq vpcmpnltq vpcmpnleq vpcmpq vpcmpequd vpcmpltud vpcmpleud vpcmpnequd vpcmpnltud vpcmpnleud vpcmpud vpcmpequq vpcmpltuq vpcmpleuq vpcmpnequq vpcmpnltuq vpcmpnleuq vpcmpuq vpcompressd vpcompressq vpermi2d vpermi2pd vpermi2ps vpermi2q vpermt2d vpermt2pd vpermt2ps vpermt2q vpexpandd vpexpandq vpmaxsq vpmaxuq vpminsq vpminuq vpmovdb vpmovdw vpmovqb vpmovqd vpmovqw vpmovsdb vpmovsdw vpmovsqb vpmovsqd vpmovsqw vpmovusdb vpmovusdw vpmovusqb vpmovusqd vpmovusqw vpord vporq vprold vprolq vprolvd vprolvq vprord vprorq vprorvd vprorvq vpscatterdd vpscatterdq vpscatterqd vpscatterqq vpsraq vpsravq vpternlogd vpternlogq vptestmd vptestmq vptestnmd vptestnmq vpxord vpxorq vrcp14pd vrcp14ps vrcp14sd vrcp14ss vrndscalepd vrndscaleps vrndscalesd vrndscaless vrsqrt14pd vrsqrt14ps vrsqrt14sd vrsqrt14ss vscalefpd vscalefps vscalefsd vscalefss vscatterdpd vscatterdps vscatterqpd vscatterqps vshuff32x4 vshuff64x2 vshufi32x4 vshufi64x2 kandnw kandw kmovw knotw kortestw korw kshiftlw kshiftrw kunpckbw kxnorw kxorw vpbroadcastmb2q vpbroadcastmw2d vpconflictd vpconflictq vplzcntd vplzcntq vexp2pd vexp2ps vrcp28pd vrcp28ps vrcp28sd vrcp28ss vrsqrt28pd vrsqrt28ps vrsqrt28sd vrsqrt28ss vgatherpf0dpd vgatherpf0dps vgatherpf0qpd vgatherpf0qps vgatherpf1dpd vgatherpf1dps vgatherpf1qpd vgatherpf1qps vscatterpf0dpd vscatterpf0dps vscatterpf0qpd vscatterpf0qps vscatterpf1dpd vscatterpf1dps vscatterpf1qpd vscatterpf1qps prefetchwt1 bndmk bndcl bndcu bndcn bndmov bndldx bndstx sha1rnds4 sha1nexte sha1msg1 sha1msg2 sha256rnds2 sha256msg1 sha256msg2 hint_nop0 hint_nop1 hint_nop2 hint_nop3 hint_nop4 hint_nop5 hint_nop6 hint_nop7 hint_nop8 hint_nop9 hint_nop10 hint_nop11 hint_nop12 hint_nop13 hint_nop14 hint_nop15 hint_nop16 hint_nop17 hint_nop18 hint_nop19 hint_nop20 hint_nop21 hint_nop22 hint_nop23 hint_nop24 hint_nop25 hint_nop26 hint_nop27 hint_nop28 hint_nop29 hint_nop30 hint_nop31 hint_nop32 hint_nop33 hint_nop34 hint_nop35 hint_nop36 hint_nop37 hint_nop38 hint_nop39 hint_nop40 hint_nop41 hint_nop42 hint_nop43 hint_nop44 hint_nop45 hint_nop46 hint_nop47 hint_nop48 hint_nop49 hint_nop50 hint_nop51 hint_nop52 hint_nop53 hint_nop54 hint_nop55 hint_nop56 hint_nop57 hint_nop58 hint_nop59 hint_nop60 hint_nop61 hint_nop62 hint_nop63',
      literal: 'ip eip rip ' + 'al ah bl bh cl ch dl dh sil dil bpl spl r8b r9b r10b r11b r12b r13b r14b r15b ' + 'ax bx cx dx si di bp sp r8w r9w r10w r11w r12w r13w r14w r15w ' + 'eax ebx ecx edx esi edi ebp esp eip r8d r9d r10d r11d r12d r13d r14d r15d ' + 'rax rbx rcx rdx rsi rdi rbp rsp r8 r9 r10 r11 r12 r13 r14 r15 ' + 'cs ds es fs gs ss ' + 'st st0 st1 st2 st3 st4 st5 st6 st7 ' + 'mm0 mm1 mm2 mm3 mm4 mm5 mm6 mm7 ' + 'xmm0  xmm1  xmm2  xmm3  xmm4  xmm5  xmm6  xmm7  xmm8  xmm9 xmm10  xmm11 xmm12 xmm13 xmm14 xmm15 ' + 'xmm16 xmm17 xmm18 xmm19 xmm20 xmm21 xmm22 xmm23 xmm24 xmm25 xmm26 xmm27 xmm28 xmm29 xmm30 xmm31 ' + 'ymm0  ymm1  ymm2  ymm3  ymm4  ymm5  ymm6  ymm7  ymm8  ymm9 ymm10  ymm11 ymm12 ymm13 ymm14 ymm15 ' + 'ymm16 ymm17 ymm18 ymm19 ymm20 ymm21 ymm22 ymm23 ymm24 ymm25 ymm26 ymm27 ymm28 ymm29 ymm30 ymm31 ' + 'zmm0  zmm1  zmm2  zmm3  zmm4  zmm5  zmm6  zmm7  zmm8  zmm9 zmm10  zmm11 zmm12 zmm13 zmm14 zmm15 ' + 'zmm16 zmm17 zmm18 zmm19 zmm20 zmm21 zmm22 zmm23 zmm24 zmm25 zmm26 zmm27 zmm28 zmm29 zmm30 zmm31 ' + 'k0 k1 k2 k3 k4 k5 k6 k7 ' + 'bnd0 bnd1 bnd2 bnd3 ' + 'cr0 cr1 cr2 cr3 cr4 cr8 dr0 dr1 dr2 dr3 dr8 tr3 tr4 tr5 tr6 tr7 ' + 'r0 r1 r2 r3 r4 r5 r6 r7 r0b r1b r2b r3b r4b r5b r6b r7b ' + 'r0w r1w r2w r3w r4w r5w r6w r7w r0d r1d r2d r3d r4d r5d r6d r7d ' + 'r0h r1h r2h r3h ' + 'r0l r1l r2l r3l r4l r5l r6l r7l r8l r9l r10l r11l r12l r13l r14l r15l',
      pseudo: 'db dw dd dq dt ddq do dy dz ' + 'resb resw resd resq rest resdq reso resy resz ' + 'incbin equ times',
      preprocessor: '%define %xdefine %+ %undef %defstr %deftok %assign %strcat %strlen %substr %rotate %elif %else %endif ' + '%ifmacro %ifctx %ifidn %ifidni %ifid %ifnum %ifstr %iftoken %ifempty %ifenv %error %warning %fatal %rep ' + '%endrep %include %push %pop %repl %pathsearch %depend %use %arg %stacksize %local %line %comment %endcomment ' + '.nolist ' + 'byte word dword qword nosplit rel abs seg wrt strict near far a32 ptr ' + '__FILE__ __LINE__ __SECT__  __BITS__ __OUTPUT_FORMAT__ __DATE__ __TIME__ __DATE_NUM__ __TIME_NUM__ ' + '__UTC_DATE__ __UTC_TIME__ __UTC_DATE_NUM__ __UTC_TIME_NUM__  __PASS__ struc endstruc istruc at iend ' + 'align alignb sectalign daz nodaz up down zero default option assume public ',
      built_in: 'bits use16 use32 use64 default section segment absolute extern global common cpu float ' + '__utf16__ __utf16le__ __utf16be__ __utf32__ __utf32le__ __utf32be__ ' + '__float8__ __float16__ __float32__ __float64__ __float80m__ __float80e__ __float128l__ __float128h__ ' + '__Infinity__ __QNaN__ __SNaN__ Inf NaN QNaN SNaN float8 float16 float32 float64 float80m float80e ' + 'float128l float128h __FLOAT_DAZ__ __FLOAT_ROUND__ __FLOAT__'
    },
    contains: [{
      className: 'comment',
      begin: ';',
      end: '$',
      relevance: 0
    }, {
      className: 'number',
      begin: '\\b(?:([0-9][0-9_]*)?\\.[0-9_]*(?:[eE][+-]?[0-9_]+)?|(0[Xx])?[0-9][0-9_]*\\.?[0-9_]*(?:[pP](?:[+-]?[0-9_]+)?)?)\\b',
      relevance: 0
    }, {
      className: 'number',
      begin: '\\$[0-9][0-9A-Fa-f]*',
      relevance: 0
    }, {
      className: 'number',
      begin: '\\b(?:[0-9A-Fa-f][0-9A-Fa-f_]*[HhXx]|[0-9][0-9_]*[DdTt]?|[0-7][0-7_]*[QqOo]|[0-1][0-1_]*[BbYy])\\b'
    }, {
      className: 'number',
      begin: '\\b(?:0[HhXx][0-9A-Fa-f_]+|0[DdTt][0-9_]+|0[QqOo][0-7_]+|0[BbYy][0-1_]+)\\b'
    }, hljs.QUOTE_STRING_MODE, {
      className: 'string',
      begin: '\'',
      end: '[^\\\\]\'',
      relevance: 0
    }, {
      className: 'string',
      begin: '`',
      end: '[^\\\\]`',
      relevance: 0
    }, {
      className: 'string',
      begin: '\\.[A-Za-z0-9]+',
      relevance: 0
    }, {
      className: 'label',
      begin: '^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)',
      relevance: 0
    }, {
      className: 'label',
      begin: '^\\s*%%[A-Za-z0-9_$#@~.?]*:',
      relevance: 0
    }, {
      className: 'argument',
      begin: '%[0-9]+',
      relevance: 0
    }, {
      className: 'built_in',
      begin: '%!\S+',
      relevance: 0
    }]
  };
};


},{}],141:[function(require,module,exports){
"use strict";
module.exports = function(hljs) {
  var XML_IDENT_RE = '[A-Za-z0-9\\._:-]+';
  var PHP = {
    begin: /<\?(php)?(?!\w)/,
    end: /\?>/,
    subLanguage: 'php',
    subLanguageMode: 'continuous'
  };
  var TAG_INTERNALS = {
    endsWithParent: true,
    illegal: /</,
    relevance: 0,
    contains: [PHP, {
      className: 'attribute',
      begin: XML_IDENT_RE,
      relevance: 0
    }, {
      begin: '=',
      relevance: 0,
      contains: [{
        className: 'value',
        variants: [{
          begin: /"/,
          end: /"/
        }, {
          begin: /'/,
          end: /'/
        }, {begin: /[^\s\/>]+/}]
      }]
    }]
  };
  return {
    aliases: ['html', 'xhtml', 'rss', 'atom', 'xsl', 'plist'],
    case_insensitive: true,
    contains: [{
      className: 'doctype',
      begin: '<!DOCTYPE',
      end: '>',
      relevance: 10,
      contains: [{
        begin: '\\[',
        end: '\\]'
      }]
    }, {
      className: 'comment',
      begin: '<!--',
      end: '-->',
      relevance: 10
    }, {
      className: 'cdata',
      begin: '<\\!\\[CDATA\\[',
      end: '\\]\\]>',
      relevance: 10
    }, {
      className: 'tag',
      begin: '<style(?=\\s|>|$)',
      end: '>',
      keywords: {title: 'style'},
      contains: [TAG_INTERNALS],
      starts: {
        end: '</style>',
        returnEnd: true,
        subLanguage: 'css'
      }
    }, {
      className: 'tag',
      begin: '<script(?=\\s|>|$)',
      end: '>',
      keywords: {title: 'script'},
      contains: [TAG_INTERNALS],
      starts: {
        end: '</script>',
        returnEnd: true,
        subLanguage: 'javascript'
      }
    }, {
      begin: '<%',
      end: '%>',
      subLanguage: 'vbscript'
    }, PHP, {
      className: 'pi',
      begin: /<\?\w+/,
      end: /\?>/,
      relevance: 10
    }, {
      className: 'tag',
      begin: '</?',
      end: '/?>',
      contains: [{
        className: 'title',
        begin: /[^ \/><\n\t]+/,
        relevance: 0
      }, TAG_INTERNALS]
    }]
  };
};


},{}],142:[function(require,module,exports){
"use strict";
module.exports = {
  Timeline: require('./lib/Timeline'),
  Util: require('./lib/Util'),
  Bezier: require('./lib/Bezier'),
  Easie: require('./lib/Easie'),
  Invoke: require('./lib/Invoke'),
  Repeat: require('./lib/Repeat'),
  Together: require('./lib/Together'),
  Tween: require('./lib/Tween'),
  Wait: require('./lib/Wait')
};


},{"./lib/Bezier":144,"./lib/Easie":145,"./lib/Invoke":146,"./lib/Repeat":147,"./lib/Timeline":148,"./lib/Together":149,"./lib/Tween":150,"./lib/Util":151,"./lib/Wait":152}],143:[function(require,module,exports){
"use strict";
var Accessor,
    U;
U = require('./Util');
Accessor = (function() {
  function Accessor(obj, propertyPath) {
    this.obj = obj;
    this.paths = propertyPath.split(".");
  }
  Accessor.prototype.get = function() {
    var obj,
        path,
        _i,
        _len,
        _ref;
    obj = this.obj;
    _ref = this.paths;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      path = _ref[_i];
      obj = obj[path];
    }
    return obj;
  };
  Accessor.prototype.set = function(value) {
    var i,
        obj,
        _i,
        _name,
        _ref;
    obj = this.obj;
    for (i = _i = 0, _ref = this.paths.length - 1; _i < _ref; i = _i += 1) {
      if (obj[_name = this.paths[i]] == null) {
        obj[_name] = {};
      }
      obj = obj[this.paths[i]];
    }
    return obj[U.last(this.paths)] = value;
  };
  return Accessor;
})();
module.exports = Accessor;


},{"./Util":151}],144:[function(require,module,exports){
"use strict";
var Bezier,
    U;
U = require('./Util');
Bezier = (function() {
  function Bezier(config) {
    U.extend(this, config);
    this.reset();
  }
  Bezier.prototype.reset = function() {
    this._elapsed = 0;
    this.done = this._elapsed >= this.duration;
    return this._targetsInitted = false;
  };
  Bezier.prototype.reverse = function() {
    return new Bezier({
      targets: this.targets,
      points: this._reversePoints(this.points),
      duration: this.duration
    });
  };
  Bezier.prototype._reversePoints = function(points) {
    points = U.clone(points);
    this._swap(points, 0, 3);
    this._swap(points, 1, 2);
    return points;
  };
  Bezier.prototype._swap = function(array, a, b) {
    var temp;
    temp = array[a];
    array[a] = array[b];
    return array[b] = temp;
  };
  Bezier.prototype._initTargets = function() {
    var target,
        _i,
        _len,
        _ref;
    _ref = this.targets;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      target = _ref[_i];
      target.x = this.points[0].x;
      target.y = this.points[0].y;
    }
    return this._targetsInitted = true;
  };
  Bezier.prototype.update = function(delta) {
    var target,
        _i,
        _len,
        _ref,
        _results;
    if (this.done || this.disabled) {
      return;
    }
    if (!this._targetsInitted) {
      this._initTargets();
    }
    this._elapsed += delta;
    if (this._elapsed > this.duration) {
      this._elapsed = this.duration;
      return this.done = true;
    } else {
      _ref = this.targets;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        target = _ref[_i];
        _results.push(this._move(target));
      }
      return _results;
    }
  };
  Bezier.prototype._move = function(target) {
    var percent,
        x,
        y,
        _ref;
    percent = this._elapsed / this.duration;
    _ref = this._computeBezier(0, percent), x = _ref.x, y = _ref.y;
    target.x = x;
    return target.y = y;
  };
  Bezier.prototype._computeBezier = function(index, time) {
    var oneMinusT,
        oneMinusTCubed,
        p1,
        p2,
        p3,
        p4,
        t,
        tCubed,
        x,
        x1,
        x2,
        x3,
        x4,
        y,
        y1,
        y2,
        y3,
        y4;
    t = time;
    p1 = this.points[index];
    p2 = this.points[index + 1];
    p3 = this.points[index + 2];
    p4 = this.points[index + 3];
    oneMinusT = 1 - t;
    oneMinusTCubed = oneMinusT * oneMinusT * oneMinusT;
    tCubed = t * t * t;
    x1 = oneMinusTCubed * p1.x;
    x2 = 3 * t * oneMinusT * oneMinusT * p2.x;
    x3 = 3 * t * t * oneMinusT * p3.x;
    x4 = tCubed * p4.x;
    x = x1 + x2 + x3 + x4;
    y1 = oneMinusTCubed * p1.y;
    y2 = 3 * t * oneMinusT * oneMinusT * p2.y;
    y3 = 3 * t * t * oneMinusT * p3.y;
    y4 = tCubed * p4.y;
    y = y1 + y2 + y3 + y4;
    return {
      x: x,
      y: y
    };
  };
  return Bezier;
})();
module.exports = Bezier;


},{"./Util":151}],145:[function(require,module,exports){
"use strict";
var Easie,
    U;
U = require('./Util');
Easie = (function() {
  function Easie() {}
  Easie.reverse = function(easing) {
    if (!U.isString(easing)) {
      return easing;
    }
    if (easing.indexOf('InOut') > -1) {
      return easing;
    }
    if (easing.indexOf('In') > -1) {
      return easing.replace(/In/, 'Out');
    }
    return easing.replace(/Out/, 'In');
  };
  Easie.backIn = function(time, begin, change, duration, overshoot) {
    if (overshoot == null) {
      overshoot = 1.70158;
    }
    return change * (time /= duration) * time * ((overshoot + 1) * time - overshoot) + begin;
  };
  Easie.backOut = function(time, begin, change, duration, overshoot) {
    if (overshoot == null) {
      overshoot = 1.70158;
    }
    return change * ((time = time / duration - 1) * time * ((overshoot + 1) * time + overshoot) + 1) + begin;
  };
  Easie.backInOut = function(time, begin, change, duration, overshoot) {
    if (overshoot == null) {
      overshoot = 1.70158;
    }
    if ((time = time / (duration / 2)) < 1) {
      return change / 2 * (time * time * (((overshoot *= 1.525) + 1) * time - overshoot)) + begin;
    } else {
      return change / 2 * ((time -= 2) * time * (((overshoot *= 1.525) + 1) * time + overshoot) + 2) + begin;
    }
  };
  Easie.bounceOut = function(time, begin, change, duration) {
    if ((time /= duration) < 1 / 2.75) {
      return change * (7.5625 * time * time) + begin;
    } else if (time < 2 / 2.75) {
      return change * (7.5625 * (time -= 1.5 / 2.75) * time + 0.75) + begin;
    } else if (time < 2.5 / 2.75) {
      return change * (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375) + begin;
    } else {
      return change * (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375) + begin;
    }
  };
  Easie.bounceIn = function(time, begin, change, duration) {
    return change - Easie.bounceOut(duration - time, 0, change, duration) + begin;
  };
  Easie.bounceInOut = function(time, begin, change, duration) {
    if (time < duration / 2) {
      return Easie.bounceIn(time * 2, 0, change, duration) * 0.5 + begin;
    } else {
      return Easie.bounceOut(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + begin;
    }
  };
  Easie.circIn = function(time, begin, change, duration) {
    return -change * (Math.sqrt(1 - (time = time / duration) * time) - 1) + begin;
  };
  Easie.circOut = function(time, begin, change, duration) {
    return change * Math.sqrt(1 - (time = time / duration - 1) * time) + begin;
  };
  Easie.circInOut = function(time, begin, change, duration) {
    if ((time = time / (duration / 2)) < 1) {
      return -change / 2 * (Math.sqrt(1 - time * time) - 1) + begin;
    } else {
      return change / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + begin;
    }
  };
  Easie.cubicIn = function(time, begin, change, duration) {
    return change * (time /= duration) * time * time + begin;
  };
  Easie.cubicOut = function(time, begin, change, duration) {
    return change * ((time = time / duration - 1) * time * time + 1) + begin;
  };
  Easie.cubicInOut = function(time, begin, change, duration) {
    if ((time = time / (duration / 2)) < 1) {
      return change / 2 * time * time * time + begin;
    } else {
      return change / 2 * ((time -= 2) * time * time + 2) + begin;
    }
  };
  Easie.elasticOut = function(time, begin, change, duration, amplitude, period) {
    var overshoot;
    if (amplitude == null) {
      amplitude = null;
    }
    if (period == null) {
      period = null;
    }
    if (time === 0) {
      return begin;
    } else if ((time = time / duration) === 1) {
      return begin + change;
    } else {
      if (period == null) {
        period = duration * 0.3;
      }
      if ((amplitude == null) || amplitude < Math.abs(change)) {
        amplitude = change;
        overshoot = period / 4;
      } else {
        overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
      }
      return (amplitude * Math.pow(2, -10 * time)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + change + begin;
    }
  };
  Easie.elasticIn = function(time, begin, change, duration, amplitude, period) {
    var overshoot;
    if (amplitude == null) {
      amplitude = null;
    }
    if (period == null) {
      period = null;
    }
    if (time === 0) {
      return begin;
    } else if ((time = time / duration) === 1) {
      return begin + change;
    } else {
      if (period == null) {
        period = duration * 0.3;
      }
      if ((amplitude == null) || amplitude < Math.abs(change)) {
        amplitude = change;
        overshoot = period / 4;
      } else {
        overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
      }
      time -= 1;
      return -(amplitude * Math.pow(2, 10 * time)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + begin;
    }
  };
  Easie.elasticInOut = function(time, begin, change, duration, amplitude, period) {
    var overshoot;
    if (amplitude == null) {
      amplitude = null;
    }
    if (period == null) {
      period = null;
    }
    if (time === 0) {
      return begin;
    } else if ((time = time / (duration / 2)) === 2) {
      return begin + change;
    } else {
      if (period == null) {
        period = duration * (0.3 * 1.5);
      }
      if ((amplitude == null) || amplitude < Math.abs(change)) {
        amplitude = change;
        overshoot = period / 4;
      } else {
        overshoot = period / (2 * Math.PI) * Math.asin(change / amplitude);
      }
      if (time < 1) {
        return -0.5 * (amplitude * Math.pow(2, 10 * (time -= 1))) * Math.sin((time * duration - overshoot) * ((2 * Math.PI) / period)) + begin;
      } else {
        return amplitude * Math.pow(2, -10 * (time -= 1)) * Math.sin((time * duration - overshoot) * (2 * Math.PI) / period) + change + begin;
      }
    }
  };
  Easie.expoIn = function(time, begin, change, duration) {
    if (time === 0) {
      return begin;
    }
    return change * Math.pow(2, 10 * (time / duration - 1)) + begin;
  };
  Easie.expoOut = function(time, begin, change, duration) {
    if (time === duration) {
      return begin + change;
    }
    return change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
  };
  Easie.expoInOut = function(time, begin, change, duration) {
    if (time === 0) {
      return begin;
    } else if (time === duration) {
      return begin + change;
    } else if ((time = time / (duration / 2)) < 1) {
      return change / 2 * Math.pow(2, 10 * (time - 1)) + begin;
    } else {
      return change / 2 * (-Math.pow(2, -10 * (time - 1)) + 2) + begin;
    }
  };
  Easie.linearNone = function(time, begin, change, duration) {
    return change * time / duration + begin;
  };
  Easie.linearIn = function(time, begin, change, duration) {
    return Easie.linearNone(time, begin, change, duration);
  };
  Easie.linearOut = function(time, begin, change, duration) {
    return Easie.linearNone(time, begin, change, duration);
  };
  Easie.linearInOut = function(time, begin, change, duration) {
    return Easie.linearNone(time, begin, change, duration);
  };
  Easie.linear = function(time, begin, change, duration) {
    return Easie.linearNone(time, begin, change, duration);
  };
  Easie.quadIn = function(time, begin, change, duration) {
    return change * (time = time / duration) * time + begin;
  };
  Easie.quadOut = function(time, begin, change, duration) {
    return -change * (time = time / duration) * (time - 2) + begin;
  };
  Easie.quadInOut = function(time, begin, change, duration) {
    if ((time = time / (duration / 2)) < 1) {
      return change / 2 * time * time + begin;
    } else {
      return -change / 2 * ((time -= 1) * (time - 2) - 1) + begin;
    }
  };
  Easie.quartIn = function(time, begin, change, duration) {
    return change * (time = time / duration) * time * time * time + begin;
  };
  Easie.quartOut = function(time, begin, change, duration) {
    return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
  };
  Easie.quartInOut = function(time, begin, change, duration) {
    if ((time = time / (duration / 2)) < 1) {
      return change / 2 * time * time * time * time + begin;
    } else {
      return -change / 2 * ((time -= 2) * time * time * time - 2) + begin;
    }
  };
  Easie.quintIn = function(time, begin, change, duration) {
    return change * (time = time / duration) * time * time * time * time + begin;
  };
  Easie.quintOut = function(time, begin, change, duration) {
    return change * ((time = time / duration - 1) * time * time * time * time + 1) + begin;
  };
  Easie.quintInOut = function(time, begin, change, duration) {
    if ((time = time / (duration / 2)) < 1) {
      return change / 2 * time * time * time * time * time + begin;
    } else {
      return change / 2 * ((time -= 2) * time * time * time * time + 2) + begin;
    }
  };
  Easie.sineIn = function(time, begin, change, duration) {
    return -change * Math.cos(time / duration * (Math.PI / 2)) + change + begin;
  };
  Easie.sineOut = function(time, begin, change, duration) {
    return change * Math.sin(time / duration * (Math.PI / 2)) + begin;
  };
  Easie.sineInOut = function(time, begin, change, duration) {
    return -change / 2 * (Math.cos(Math.PI * time / duration) - 1) + begin;
  };
  return Easie;
})();
module.exports = Easie;


},{"./Util":151}],146:[function(require,module,exports){
"use strict";
var Invoke,
    U;
U = require('./Util');
Invoke = (function() {
  function Invoke(config) {
    U.extend(this, config);
    this.reset();
  }
  Invoke.prototype.reset = function() {
    return this.done = false;
  };
  Invoke.prototype.reverse = function() {
    return new Invoke({
      func: this.func,
      context: this.context
    });
  };
  Invoke.prototype.update = function() {
    if (this.done) {
      return;
    }
    this.func.call(this.context);
    return this.done = true;
  };
  return Invoke;
})();
module.exports = Invoke;


},{"./Util":151}],147:[function(require,module,exports){
"use strict";
var Repeat,
    U,
    __slice = [].slice;
U = require('./Util');
Repeat = (function() {
  function Repeat(count, children) {
    this.count = count;
    this.children = children != null ? children : [];
    this._currentChild = 0;
    this._curCount = 0;
  }
  Repeat.prototype.reset = function() {
    var child,
        _i,
        _len,
        _ref,
        _results;
    this.done = false;
    this._currentChild = 0;
    this._curCount = 0;
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(child.reset());
    }
    return _results;
  };
  Repeat.prototype.reverse = function() {
    var child,
        reversedChildren;
    reversedChildren = (function() {
      var _i,
          _len,
          _ref,
          _results;
      _ref = this.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(child.reverse());
      }
      return _results;
    }).call(this);
    return new Repeat(this.count, reversedChildren.reverse());
  };
  Repeat.prototype.update = function() {
    var args,
        child,
        curChild,
        _i,
        _len,
        _ref,
        _results;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    this.done = this._curCount >= this.count;
    if (this.done) {
      return;
    }
    curChild = this.children[this._currentChild];
    curChild.update.apply(curChild, args);
    if (curChild.done) {
      ++this._currentChild;
      if (this._currentChild >= this.children.length) {
        this._currentChild = 0;
        ++this._curCount;
        this.done = this._curCount >= this.count;
        if (!this.done) {
          _ref = this.children;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            child = _ref[_i];
            _results.push(child.reset());
          }
          return _results;
        }
      }
    }
  };
  return Repeat;
})();
module.exports = Repeat;


},{"./Util":151}],148:[function(require,module,exports){
"use strict";
var Bezier,
    Invoke,
    Repeat,
    Timeline,
    Together,
    Tween,
    U,
    Wait;
U = require('./Util');
Bezier = require('./Bezier');
Tween = require('./Tween');
Wait = require('./Wait');
Repeat = require('./Repeat');
Together = require('./Together');
Invoke = require('./Invoke');
Timeline = (function() {
  function Timeline(owner) {
    this.owner = owner;
    if (!this.owner) {
      throw new Error("Timeline requires an owner");
    }
    this._buildStack = [];
    this._childConfigStack = [];
  }
  Timeline.prototype._getTargets = function(targetOptions) {
    var targets,
        _ref;
    targets = (_ref = targetOptions.target) != null ? _ref : this.owner;
    return U.toArray(targets);
  };
  Timeline.prototype._mergeConfig = function(config) {
    if (U.any(this._childConfigStack)) {
      return U.extend(U.clone(U.last(this._childConfigStack)), config);
    } else {
      return config;
    }
  };
  Timeline.prototype._addParentAnimation = function(childConfigOrBuilder, builderOrUndefined, AniConstructor, consArg) {
    var builder,
        childConfig,
        parentAni;
    if (U.isFunction(childConfigOrBuilder)) {
      builder = childConfigOrBuilder;
    } else {
      childConfig = childConfigOrBuilder;
      builder = builderOrUndefined;
    }
    parentAni = new AniConstructor(consArg);
    if (childConfig) {
      this._childConfigStack.push(childConfig);
    }
    this._buildStack.push(parentAni);
    builder(this);
    this._buildStack.pop();
    if (childConfig) {
      this._childConfigStack.pop();
    }
    return this._pushAnimation(parentAni);
  };
  Timeline.prototype._addAnimation = function(AniConstructor, config) {
    var ani;
    ani = new AniConstructor(this._mergeConfig(config));
    ani.targets = this._getTargets(ani);
    return this._pushAnimation(ani);
  };
  Timeline.prototype._pushAnimation = function(ani) {
    if (this._buildStack.length === 0) {
      this.owner.addPlunderAnimation(ani);
    } else {
      this._buildStack[this._buildStack.length - 1].children.push(ani);
    }
    return ani;
  };
  Timeline.prototype._fade = function(config, from, to) {
    if (U.isNumber(config)) {
      config = {duration: config};
    }
    config.property = "alpha";
    config.from = from;
    config.to = to;
    return this._addAnimation(Tween, config);
  };
  Timeline.prototype.reverse = function(ani) {
    return this._pushAnimation(ani.reverse());
  };
  Timeline.prototype.setProperty = function(config) {
    if (config == null) {
      config = {};
    }
    config.duration = 0;
    config.from = config.to = config.value;
    return this.tween(config);
  };
  Timeline.prototype.bezier = function(config) {
    if (config == null) {
      config = {};
    }
    return this._addAnimation(Bezier, config);
  };
  Timeline.prototype.tween = function(config) {
    if (config == null) {
      config = {};
    }
    return this._addAnimation(Tween, config);
  };
  Timeline.prototype.fadeIn = function(config) {
    if (config == null) {
      config = {};
    }
    return this._fade(config, 0, 1);
  };
  Timeline.prototype.fadeOut = function(config) {
    if (config == null) {
      config = {};
    }
    return this._fade(config, 1, 0);
  };
  Timeline.prototype.scale = function(config) {
    if (config == null) {
      config = {};
    }
    config.property = 'scale';
    return this.tween(config);
  };
  Timeline.prototype.color = function(config) {
    if (config == null) {
      config = {};
    }
    config.property = 'color';
    return this.tween(config);
  };
  Timeline.prototype.rotate = function(config) {
    if (config == null) {
      config = {};
    }
    config.property = 'angle';
    return this.tween(config);
  };
  Timeline.prototype.move = function(config) {
    var xconfig,
        yconfig,
        _ref,
        _ref1;
    xconfig = U.clone(config);
    xconfig.easing = (_ref = config.easingX) != null ? _ref : config.easing;
    xconfig.from = config.from.x;
    xconfig.to = config.to.x;
    xconfig.property = 'x';
    yconfig = U.clone(config);
    yconfig.easing = (_ref1 = config.easingY) != null ? _ref1 : config.easing;
    yconfig.from = config.from.y;
    yconfig.to = config.to.y;
    yconfig.property = 'y';
    return this.together(function(tl) {
      tl.tween(xconfig);
      return tl.tween(yconfig);
    });
  };
  Timeline.prototype.together = function(childConfigOrBuilder, builderOrUndefined) {
    return this._addParentAnimation(childConfigOrBuilder, builderOrUndefined, Together);
  };
  Timeline.prototype.sequence = function(childConfigOrBuilder, builderOrUndefined) {
    return this.repeat(1, childConfigOrBuilder, builderOrUndefined);
  };
  Timeline.prototype.forever = function(childConfigOrBuilder, builderOrUndefined) {
    return this.repeat(Infinity, childConfigOrBuilder, builderOrUndefined);
  };
  Timeline.prototype.repeat = function(count, childConfigOrBuilder, builderOrUndefined) {
    return this._addParentAnimation(childConfigOrBuilder, builderOrUndefined, Repeat, count);
  };
  Timeline.prototype.wait = function(duration) {
    return this.waitBetween(duration, duration);
  };
  Timeline.prototype.waitBetween = function(min, max) {
    return this._addAnimation(Wait, {
      min: min,
      max: max
    });
  };
  Timeline.prototype.invoke = function(func, context) {
    return this._addAnimation(Invoke, {
      func: func,
      context: context
    });
  };
  Timeline.prototype.stop = function() {
    return this.owner.clearPlunderAnimations();
  };
  return Timeline;
})();
module.exports = Timeline;


},{"./Bezier":144,"./Invoke":146,"./Repeat":147,"./Together":149,"./Tween":150,"./Util":151,"./Wait":152}],149:[function(require,module,exports){
"use strict";
var Together,
    __slice = [].slice;
Together = (function() {
  function Together(children) {
    this.children = children != null ? children : [];
  }
  Together.prototype.reset = function() {
    var child,
        _i,
        _len,
        _ref,
        _results;
    this.done = false;
    _ref = this.children;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      _results.push(child.reset());
    }
    return _results;
  };
  Together.prototype.reverse = function() {
    var child,
        reversedChildren;
    reversedChildren = (function() {
      var _i,
          _len,
          _ref,
          _results;
      _ref = this.children;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        _results.push(child.reverse());
      }
      return _results;
    }).call(this);
    return new Together(reversedChildren);
  };
  Together.prototype.update = function() {
    var args,
        child,
        childNotDone,
        _i,
        _len,
        _ref;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (this.done) {
      return;
    }
    childNotDone = false;
    _ref = this.children;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      child = _ref[_i];
      child.update.apply(child, args);
      if (!child.done) {
        childNotDone = true;
      }
    }
    return this.done = !childNotDone;
  };
  return Together;
})();
module.exports = Together;


},{}],150:[function(require,module,exports){
"use strict";
var Accessor,
    Easie,
    Tween,
    U,
    _idCounter;
U = require('./Util');
Easie = require('./Easie');
Accessor = require('./Accessor');
_idCounter = 0;
Tween = (function() {
  function Tween(config) {
    this.id = _idCounter++;
    U.extend(this, config);
    this._saveProperty = "_plunder_tween_save_" + this.id;
    this._accessorProp = "__accessorProp" + this.id;
    this.easeFunc = Easie[this.easing || "linear"] || Easie.linear;
    this.reset();
  }
  Tween.prototype.reset = function() {
    this._elapsed = 0;
    this.done = this._elapsed >= this.duration;
    return this._targetsInitted = false;
  };
  Tween.prototype.reverse = function() {
    return new Tween({
      property: this.property,
      targets: this.targets,
      from: this.to,
      to: this.from,
      easing: Easie.reverse(this.easing),
      duration: this.duration
    });
  };
  Tween.prototype.update = function(delta) {
    var target,
        _i,
        _len,
        _ref;
    if (this.done || this.disabled) {
      return;
    }
    if (!this._targetsInitted) {
      this._initTargets();
    }
    this._elapsed += delta;
    if (this._elapsed >= this.duration) {
      this._elapsed = this.duration;
      this.done = true;
    } else {
      _ref = this.targets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        target = _ref[_i];
        this._tween(target);
      }
    }
    if (this.done) {
      return this._finish();
    }
  };
  Tween.prototype._initTargets = function() {
    var curValue,
        target,
        value,
        _i,
        _len,
        _ref,
        _ref1;
    _ref = this.targets;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      target = _ref[_i];
      target[this._accessorProp] = new Accessor(target, this.property);
      curValue = this._get(target);
      target[this._saveProperty] = U.isArray(curValue) ? curValue.slice(0) : curValue;
      value = (_ref1 = this.from) != null ? _ref1 : curValue;
      if ((curValue != null) && (!U.areSameTypes(value, curValue) || !U.areSameTypes(value, this.to))) {
        throw new Error("Tween: mismatched types between from/to and targets current value");
      }
      if (U.isArray(value)) {
        value = value.slice(0);
      }
      this._set(target, value);
    }
    return this._targetsInitted = true;
  };
  Tween.prototype._finish = function() {
    var finalValue,
        target,
        _i,
        _len,
        _ref,
        _results;
    _ref = this.targets;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      target = _ref[_i];
      finalValue = this.restoreAfter ? target[this._saveProperty] : this.to;
      this._set(target, finalValue);
      _results.push(this._del(target));
    }
    return _results;
  };
  Tween.prototype._tween = function(target) {
    var cell,
        curValue,
        from,
        i,
        tweenedValue,
        _i,
        _len,
        _ref,
        _results;
    curValue = this._get(target);
    from = (_ref = this.from) != null ? _ref : target[this._saveProperty];
    if (U.isArray(curValue)) {
      _results = [];
      for (i = _i = 0, _len = curValue.length; _i < _len; i = ++_i) {
        cell = curValue[i];
        _results.push(curValue[i] = this._tweenValue(this._elapsed, from[i], this.to[i], this.duration));
      }
      return _results;
    } else if (U.isNumber(curValue)) {
      tweenedValue = this._tweenValue(this._elapsed, from, this.to, this.duration);
      return this._set(target, tweenedValue);
    } else {
      throw new Error("Tween can only operate on numbers or arrays of numbers");
    }
  };
  Tween.prototype._tweenValue = function(elapsed, from, to, duration) {
    return this.easeFunc(elapsed, from, to - from, duration);
  };
  Tween.prototype._get = function(target) {
    return target[this._accessorProp].get();
  };
  Tween.prototype._set = function(target, value) {
    return target[this._accessorProp].set(value);
  };
  Tween.prototype._del = function(target) {
    delete target[this._saveProperty];
    return delete target[this._accessorProp];
  };
  return Tween;
})();
module.exports = Tween;


},{"./Accessor":143,"./Easie":145,"./Util":151}],151:[function(require,module,exports){
"use strict";
var Util,
    buildIsType,
    type,
    _i,
    _isInteger,
    _len,
    _ref,
    __hasProp = {}.hasOwnProperty;
_isInteger = function(num) {
  return num === (num | 0);
};
Util = {
  rand: function(minOrMax, maxOrUndefined, dontFloor) {
    var max,
        min,
        range,
        result,
        shouldFloor;
    if (dontFloor == null) {
      dontFloor = false;
    }
    shouldFloor = !dontFloor;
    min = Util.isNumber(maxOrUndefined) ? minOrMax : 0;
    max = Util.isNumber(maxOrUndefined) ? maxOrUndefined : minOrMax;
    range = max - min;
    result = Math.random() * range + min;
    if (_isInteger(min) && _isInteger(max) && shouldFloor) {
      return Math.floor(result);
    } else {
      return result;
    }
  },
  coin: function() {
    return this.rand(0, 2) === 0;
  },
  degreesToRadians: function(degrees) {
    return degrees * Math.PI / 180;
  },
  radiansToDegrees: function(radians) {
    return radians * 180 / Math.PI;
  },
  isUndefined: function(o) {
    return typeof o === 'undefined';
  },
  isPrimitive: function(o) {
    return o === true || o === false || this.isString(o) || this.isNumber(o);
  },
  areSameTypes: function(a, b) {
    if (this.isArray(a)) {
      return this.isArray(b);
    }
    if (this.isArray(b)) {
      return false;
    }
    return typeof a === typeof b;
  },
  extend: function(target, incoming) {
    var key,
        value;
    if (target != null) {
      for (key in incoming) {
        if (!__hasProp.call(incoming, key))
          continue;
        value = incoming[key];
        target[key] = value;
      }
    }
    return target;
  },
  clone: function(obj) {
    if (!obj || this.isPrimitive(obj)) {
      return obj;
    }
    if (this.isArray(obj)) {
      return obj.slice(0);
    }
    return this.extend({}, obj);
  },
  toArray: function(obj) {
    if (obj == null) {
      return [];
    }
    if (this.isArray(obj)) {
      return obj;
    } else {
      return [obj];
    }
  },
  last: function(array) {
    return array && array[array.length - 1];
  },
  first: function(array) {
    return array && array[0];
  },
  isEmpty: function(array) {
    return array && array.length === 0;
  },
  any: function(array) {
    return array && array.length > 0;
  }
};
Util.isArray = Array.isArray || function(obj) {
  return Object.prototype.toString.call(obj) === "[object Array]";
};
buildIsType = function(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === ("[object " + type + "]");
  };
};
_ref = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'];
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  type = _ref[_i];
  Util["is" + type] = buildIsType(type);
}
module.exports = Util;


},{}],152:[function(require,module,exports){
"use strict";
var U,
    Wait;
U = require('./Util');
Wait = (function() {
  function Wait(config) {
    U.extend(this, config);
    if ((this.min != null) && (this.max != null) && this.min > this.max) {
      throw new Error("Wait: min must be less than max");
    }
    this._specifiedDuration = this.duration;
    this.reset();
  }
  Wait.prototype.reverse = function() {
    return new Wait({duration: this.duration});
  };
  Wait.prototype.reset = function() {
    this.duration = this._specifiedDuration || U.rand(this.min, this.max);
    this._elapsed = 0;
    return this.done = this._elapsed >= this.duration;
  };
  Wait.prototype.update = function(delta) {
    if (this.done) {
      return;
    }
    this._elapsed += delta;
    return this.done = this._elapsed >= this.duration;
  };
  return Wait;
})();
module.exports = Wait;


},{"./Util":151}],153:[function(require,module,exports){
"use strict";
Object.defineProperties(exports, {
  default: {get: function() {
      return $__default;
    }},
  __esModule: {value: true}
});
var Plunder = require('plunder');
var Baby = require('baby-engine');
var Timeline = Plunder.Timeline;
var Engine = Baby.Engine;
var RectEntity = Baby.RectEntity;
function runExample(canvasId) {
  var engine = new Engine('canvas');
  function standard(tl) {
    tl.forever((function() {
      var group = tl.together({duration: 2000}, (function() {
        tl.rotate({
          from: 0,
          to: 360
        });
        tl.color({
          from: [255, 0, 0, 1],
          to: [255, 255, 0, 0.2]
        });
        tl.scale({
          from: 1,
          to: 10
        });
        tl.move({
          from: {
            x: 10,
            y: 10
          },
          to: {
            x: 250,
            y: 100
          }
        });
      }));
      tl.wait(500);
      tl.reverse(group);
    }));
  }
  var entity = new RectEntity(10, 10, 10, 10);
  entity.color = [255, 0, 0];
  var timeline = new Timeline(entity);
  standard(timeline);
  var playing = true;
  var button = document.getElementById('play-main-example');
  button.addEventListener('click', (function() {
    engine.togglePause();
    if (engine.paused) {
      button.innerHTML = "Play";
    } else {
      button.innerHTML = "Pause";
    }
  }));
  engine.add(entity);
  engine.start();
}
var $__default = runExample;


},{"baby-engine":2,"plunder":142}]},{},[47,1]);