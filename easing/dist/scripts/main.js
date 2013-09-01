(function() {
  require.config({
    paths: {
      plunder: '../plunder/dist/plunder'
    }
  });

  require(['plunder', 'easingVis', 'domReady'], function(Plunder, EasingVis, domReady) {
    'use strict';
    return domReady(function() {
      var e;
      e = new EasingVis('#canvas', 'cubicInOut');
      return e.go();
    });
  });

}).call(this);
