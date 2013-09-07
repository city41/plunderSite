
class Entity
  constructor: (@img, @pos) ->
    @anis = []
    @angle = 0
    @scale = 1
    @timeline = new Timeline(this)

  addPlunderAnimation: (ani) ->
    @anis.push ani

  clearPlunderAnimations: ->
    @anis = []

  update: (delta) ->
    for ani in @anis
      ani.update delta
    return undefined

  draw: (ctx) ->
    ctx.save()
    ctx.rotate @angle if @angle
    ctx.scale @scale if @scale
    ctx.drawImage(@pos.x, @pos.y)
    ctx.restore()


# 
# t = new Timeline(ball)
# 
# t.forever ->
#   t.sequence ->
#     t.together duration: 2000, ->
#       ballGroup = t.together ->
#         t.scale
#           from: 1
#           to: 10
#           easing: 'bounceOut'
#         t.rotate
#           from: 0
#           to: 30
#       pumpUp = t.move
#         target: handle
#         from: x: 10, y: 100
#         to: x: 10, y: 150
#         easing: 'circOut'
#     t.wait 500
    # t.together ->
    #   t.reverse ballGroup
    #   t.reverse pumpUp, easing: 'linear'
