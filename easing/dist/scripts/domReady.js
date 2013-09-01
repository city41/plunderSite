(function() {
  define(function() {
    var callReady, doc, domReady, isBrowser, isPageLoaded, isTop, pageLoaded, readyCalls, runCallbacks, scrollIntervalId, testDiv;
    isPageLoaded = false;
    readyCalls = [];
    runCallbacks = function(callbacks) {
      var i, _results;
      i = void 0;
      i = 0;
      _results = [];
      while (i < callbacks.length) {
        callbacks[i](doc);
        _results.push(i += 1);
      }
      return _results;
    };
    callReady = function() {
      var callbacks;
      callbacks = readyCalls;
      if (isPageLoaded) {
        if (callbacks.length) {
          readyCalls = [];
          return runCallbacks(callbacks);
        }
      }
    };
    /*
    Sets the page as loaded.
    */

    pageLoaded = function() {
      if (!isPageLoaded) {
        isPageLoaded = true;
        if (scrollIntervalId) {
          clearInterval(scrollIntervalId);
        }
        return callReady();
      }
    };
    /*
    START OF PUBLIC API *
    */

    /*
    Registers a callback for DOM ready. If DOM is already ready, the
    callback is called immediately.
    @param {Function} callback
    */

    domReady = function(callback) {
      if (isPageLoaded) {
        callback(doc);
      } else {
        readyCalls.push(callback);
      }
      return domReady;
    };
    "use strict";
    isTop = void 0;
    testDiv = void 0;
    scrollIntervalId = void 0;
    isBrowser = typeof window !== "undefined" && window.document;
    isPageLoaded = !isBrowser;
    doc = (isBrowser ? document : null);
    readyCalls = [];
    if (isBrowser) {
      if (document.addEventListener) {
        document.addEventListener("DOMContentLoaded", pageLoaded, false);
        window.addEventListener("load", pageLoaded, false);
      } else if (window.attachEvent) {
        window.attachEvent("onload", pageLoaded);
        testDiv = document.createElement("div");
        try {
          isTop = window.frameElement === null;
        } catch (_error) {}
        if (testDiv.doScroll && isTop && window.external) {
          scrollIntervalId = setInterval(function() {
            try {
              testDiv.doScroll();
              return pageLoaded();
            } catch (_error) {}
          }, 30);
        }
      }
      if (document.readyState === "complete") {
        pageLoaded();
      }
    }
    domReady.version = "2.0.1";
    /*
    Loader Plugin API method
    */

    domReady.load = function(name, req, onLoad, config) {
      if (config.isBuild) {
        return onLoad(null);
      } else {
        return domReady(onLoad);
      }
    };
    /*
    END OF PUBLIC API *
    */

    return domReady;
  });

}).call(this);
