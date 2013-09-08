Timeline = Plunder.Timeline
U = Plunder.Util
Engine = Baby.Engine
ImageEntity = Baby.ImageEntity

engine = new Engine('canvas')

ball = new ImageEntity(200, 260, 'resources/ball.png')
handle = new ImageEntity(70, 190, 'resources/handle.png')
base = new ImageEntity(70, 240, 'resources/base.png')

engine.add(ball)
engine.add(base)
engine.add(handle)


ballGroup = null
pumpUp = null

t = new Timeline(ball)

t.forever ->
  t.sequence ->
    t.together duration: 6000, ->
      ballGroup = t.together ->
        t.scale
          from: 1
          to: 3
          easing: 'bounceOut'
        t.rotate
          from: 0
          to: 30
      pumpUp = t.move
        target: handle
        from: x: 70, y: 190
        to: x: 70, y: 240
        easing: 'circOut'
    t.wait 3000
    t.together ->
      t.reverse ballGroup
      t.reverse pumpUp, easing: 'linear'
    t.wait 2000
      
engine.start()

