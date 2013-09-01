(function() {
  require.config({
    paths: {
      plunder: '../app/bower_components/plunder/dist/plunder',
      easingVis: '../easing/dist/scripts/easingVis',
      domReady: '../easing/dist/scripts/domReady',
      raf: '../easing/dist/scripts/raf'
    }
  });

  require(['easingDoc'], function(easingDoc) {
    'use strict';
    return easingDoc('easing_toc_section', 'easing_demo_container');
  });

}).call(this);
