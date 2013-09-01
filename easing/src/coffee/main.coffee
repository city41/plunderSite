require.config
  paths:
    plunder: '../plunder/dist/plunder',

require ['plunder', 'easingVis', 'domReady'], (Plunder, EasingVis, domReady) ->
  'use strict'

  domReady ->
    new EasingVis('canvas', 'cubicInOut').go()
    new EasingVis('canvas2', 'bounceIn').go()
    new EasingVis('canvas3', 'quadOut').go()


