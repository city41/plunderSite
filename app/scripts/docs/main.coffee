require.config
  paths:
    plunder: '../../bower_components/plunder/dist/plunder',

require ['../easing/easingDoc'], (easingDoc) ->
  'use strict'
  easingDoc('easing_toc_section', 'easing_demo_container')

