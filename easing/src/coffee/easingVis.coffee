define ['plunder', 'raf'], (Plunder) ->
  class EasingVis
    constructor: (canvasId, easingFn, @duration=8000) ->
      @canvas = document.getElementById canvasId
      @context = @canvas.getContext('2d')
      @w = @canvas.width
      @h = @canvas.height
      @easingFn = Plunder.Easie[easingFn]
      @linear = Plunder.Easie.linear
      @_updateBound = @_update.bind(this)
      @_elapsed = 0;
      @_lastTimestamp = null

      @_pathBuffer = @_createPathBuffer(@w, @h, @duration)
      
    go: ->
      @_updateBound(0)

    _update: (ts) ->
      @_lastTimestamp ?= ts
      delta = ts - @_lastTimestamp
      @_lastTimestamp = ts

      @context.drawImage(@_pathBuffer, 0, 0)
      @_drawNode(delta, 10, @easingFn, 'rgb(200, 120, 40)')
      @_drawNode(delta, 30, Plunder.Easie.linear, 'rgb(255, 0, 0)')
      window.requestAnimationFrame(@_updateBound)

    _drawNode: (delta, x, easingFn, color) ->
      @_elapsed += delta
      if @_elapsed >= @duration
        @_elapsed -= @duration

      y = easingFn(@_elapsed, 0, @h, @duration)

      @context.fillStyle = color
      @context.fillRect(x-3, y-3, 6, 6)

    _createPathBuffer: (w, h, d) ->
      canvas = document.createElement 'canvas'
      canvas.width = w
      canvas.height = h
      context = canvas.getContext '2d'

      context.fillStyle = 'black'
      context.fillRect(0, 0, w, h)

      context.fillStyle = 'rgb(200, 200, 200)'

      for i in [0..d] by 0.1
        x = @linear(i, 0, w, d)
        y = @easingFn(i, 0, h, d)
        context.fillRect(x-0.5, y-0.5, 1, 1)

      return canvas

        




