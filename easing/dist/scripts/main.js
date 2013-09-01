(function() {
  require.config({
    paths: {
      plunder: '../plunder/dist/plunder'
    }
  });

  require(['plunder', 'easingVis', 'domReady'], function(Plunder, EasingVis, domReady) {
    'use strict';
    return domReady(function() {
      new EasingVis('canvas', 'cubicInOut').go();
      new EasingVis('canvas2', 'bounceIn').go();
      return new EasingVis('canvas3', 'quadOut').go();
    });
  });

}).call(this);
