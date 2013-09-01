(function() {
  var __hasProp = {}.hasOwnProperty;

  define(['plunder', 'easingVis', 'domReady'], function(Plunder, EasingVis, domReady) {
    var addDemoEntry, addTocEntry, createContainer, easingDoc;
    addTocEntry = function(tocId, id) {
      var li, toc;
      toc = document.getElementById(tocId);
      li = document.createElement('li');
      li.innerHTML = "- <a href='#" + id + "'>" + id + "</a>";
      return toc.appendChild(li);
    };
    createContainer = function(containerId, key) {
      var canvas, div, h, width;
      width = 500;
      div = document.createElement('div');
      div.style.display = 'inline-block';
      div.style.width = "" + width + "px";
      div.style.marginLeft = '5px';
      div.style.marginRight = '5px';
      div.id = key;
      h = document.createElement('h3');
      h.innerHTML = key;
      div.appendChild(h);
      canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = 200;
      canvas.id = "canvas-" + key;
      div.appendChild(canvas);
      document.getElementById(containerId).appendChild(div);
      return canvas.id;
    };
    addDemoEntry = function(containerId, easingFn) {
      var canvasId;
      canvasId = createContainer(containerId, easingFn);
      return new EasingVis(canvasId, easingFn).go();
    };
    easingDoc = function(tocId, demoContainerId) {
      return domReady(function() {
        var key, value, _ref, _results;
        _ref = Plunder.Easie;
        _results = [];
        for (key in _ref) {
          if (!__hasProp.call(_ref, key)) continue;
          value = _ref[key];
          addTocEntry(tocId, key);
          _results.push(addDemoEntry(demoContainerId, key));
        }
        return _results;
      });
    };
    return easingDoc;
  });

}).call(this);
