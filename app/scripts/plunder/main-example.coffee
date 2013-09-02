Timeline = Plunder.Timeline
U = Plunder.Util

window.requestAnimationFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame

class Entity
  constructor: ->
    @timeline = new Timeline(this)
    @anis = []
    @x = 10
    @y = 10
    @alpha = 1
    @color = [255, 0, 0, 1]

  standard: ->
    tl = @timeline
    tl.forever ->
      group = tl.together duration: 2000, ->
        tl.rotate
          from: 0
          to: 720
        tl.color
          from: [255, 0, 0, 1],
          to: [255, 255, 0, 0.2]
        tl.scale
          from: 1
          to: 10
        tl.move
          from: x: 10, y: 10
          to: x: 250, y: 100
      tl.wait 500
      tl.reverse(group)

  addPlunderAnimation: (ani) ->
    @anis.push(ani)

  clearPlunderAnimations: ->
    @anis = []

  update: (delta) ->
    for ani in @anis
      ani.update(delta)

  # how to draw the entity
  draw: (context) ->
    context.save()

    context.fillStyle = "rgba(#{@color[0] | 0}, #{@color[1] | 0}, #{@color[2] | 0}, #{@color[3]})"

    context.translate(@x, @y)
    context.scale(@scale, @scale) if @scale
    context.rotate(U.degreesToRadians(@angle)) if @angle
    context.fillRect(-5, -5, 10, 10)

    context.restore()


entity = new Entity()

entity.standard()


context = document.getElementById('canvas').getContext('2d')

lastTimestamp = null

update = (ts) ->
  if !lastTimestamp
    lastTimestamp = ts

  delta = ts - lastTimestamp
  lastTimestamp = ts

  entity.update(delta)

  context.fillStyle = 'black'
  context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  entity.draw(context)
  window.requestAnimationFrame(update)

update(0)


