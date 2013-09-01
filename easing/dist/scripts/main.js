(function() {
  var __hasProp = {}.hasOwnProperty;

  require.config({
    paths: {
      plunder: '../plunder/dist/plunder'
    }
  });

  require(['plunder', 'easingVis', 'domReady'], function(Plunder, EasingVis, domReady) {
    'use strict';
    var createContainer;
    createContainer = function(key) {
      var canvas, div, h;
      div = document.createElement('div');
      div.style.display = 'inline-block';
      div.style.width = '300px';
      div.style.marginLeft = '5px';
      div.style.marginRight = '5px';
      h = document.createElement('h3');
      h.innerHTML = key;
      div.appendChild(h);
      canvas = document.createElement('canvas');
      canvas.width = 300;
      canvas.height = 200;
      canvas.id = "canvas-" + key;
      div.appendChild(canvas);
      document.body.appendChild(div);
      return canvas.id;
    };
    return domReady(function() {
      var canvasId, key, value, _ref, _results;
      canvasId = createContainer('linear');
      new EasingVis(canvasId, 'linear').go();
      _ref = Plunder.Easie;
      _results = [];
      for (key in _ref) {
        if (!__hasProp.call(_ref, key)) continue;
        value = _ref[key];
        if (typeof value === 'function' && key.indexOf('linear') < 0) {
          canvasId = createContainer(key);
          _results.push(new EasingVis(canvasId, key).go());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    });
  });

}).call(this);
