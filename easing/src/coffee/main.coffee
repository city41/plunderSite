require.config
  paths:
    plunder: '../plunder/dist/plunder',

require ['plunder', 'easingVis', 'domReady'], (Plunder, EasingVis, domReady) ->
  'use strict'

  domReady ->
    e = new EasingVis('#canvas', 'cubicInOut')
    e.go()


