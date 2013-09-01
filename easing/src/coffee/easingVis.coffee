define ['plunder', 'raf'], (Plunder) ->
  class EasingVis
    constructor: (canvasId, @easingFn) ->
      @canvas = document.getElementById canvasId
      @context = @canvas.getContext('2d')
      @w = @canvas.width
      @h = @canvas.height
      
    go: ->
      @_update(0)

    _update: (delta) ->
      @context.clearRect(0, 0, @w, @h)
      


