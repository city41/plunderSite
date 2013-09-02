define ['plunder', '../raf'], (Plunder) ->
  class EasingVis
    constructor: (canvasId, easingFn, @duration=12000) ->
      @canvas = document.getElementById canvasId
      @context = @canvas.getContext('2d')
      @w = @canvas.width
      @h = @canvas.height
      @easingFn = Plunder.Easie[easingFn]
      @linear = Plunder.Easie.linear
      @_updateBound = @_update.bind(this)
      @_elapsed = 0;
      @_lastTimestamp = null

      @offset = 40
      @_pathBuffer = @_createPathBuffer(@w, @h, @duration, @offset)
      
    go: ->
      @_updateBound(0)

    _update: (ts) ->
      if !@_lastTimestamp
        @_lastTimestamp = ts

      delta = ts - @_lastTimestamp
      @_lastTimestamp = ts

      @context.drawImage(@_pathBuffer, 0, 0)
      @_drawNode(delta, @offset/4, Plunder.Easie.linear, 'rgb(140, 140, 140)')
      @_drawNode(delta, @offset - 4, @easingFn, 'rgb(222, 147, 95)', @offset)
      window.requestAnimationFrame(@_updateBound)

    _drawNode: (delta, x, easingFn, color, xExpandOffset=null) ->
      @_elapsed += delta
      if @_elapsed >= @duration
        @_elapsed -= @duration

      y = easingFn(@_elapsed, 0, @h, @duration)

      if xExpandOffset
        @context.fillStyle = 'rgba(180, 180, 180, 0.5)'
        ex = @linear(@_elapsed, xExpandOffset, @w-xExpandOffset, @duration)
        @context.fillRect(x, y-1.5, ex-x-1.5, 2)

      @context.fillStyle = color
      @context.fillRect(x-4, y-4, 8, 8)

    _createPathBuffer: (w, h, d, offset) ->
      canvas = document.createElement 'canvas'
      canvas.width = w
      canvas.height = h
      context = canvas.getContext '2d'

      context.fillStyle = 'black'
      context.fillRect(0, 0, w, h)

      context.fillStyle = 'rgb(200, 200, 200)'

      for i in [0..d] by 4
        x = @linear(i, offset, w-offset, d)
        y = @easingFn(i, 0, h, d)
        context.fillRect(x-1.5, y-1.5, 3, 3)

      context.fillStyle = 'rgb(80,80,80)'
      context.fillRect(0, 0, offset, h)

      return canvas

        




