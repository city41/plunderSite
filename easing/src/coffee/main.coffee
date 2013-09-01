require.config
  paths:
    plunder: '../plunder/dist/plunder',

require ['plunder', 'easingVis', 'domReady'], (Plunder, EasingVis, domReady) ->
  'use strict'

  createContainer = (key) ->
    div = document.createElement 'div'
    div.style.display = 'inline-block'
    div.style.width = '300px'
    div.style.marginLeft = '5px'
    div.style.marginRight = '5px'
    h = document.createElement 'h3'
    h.innerHTML = key
    div.appendChild h

    canvas = document.createElement 'canvas'
    canvas.width = 300
    canvas.height = 200
    canvas.id = "canvas-#{key}"
    div.appendChild canvas
    document.body.appendChild div
    return canvas.id


  domReady ->
    canvasId = createContainer('linear')
    new EasingVis(canvasId, 'linear').go()

    for own key,value of Plunder.Easie
      if typeof value == 'function' and key.indexOf('linear') < 0
        canvasId = createContainer(key)
        new EasingVis(canvasId, key).go()


