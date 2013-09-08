Timeline = Plunder.Timeline
U = Plunder.Util
Engine = Baby.Engine
RectEntity = Baby.RectEntity


standard = (tl) ->
  tl.forever ->
    group = tl.together duration: 2000, ->
      tl.rotate
        from: 0
        to: 360
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



entity = new RectEntity(10, 10, 10, 10)
entity.color = [255, 0, 0]
timeline = new Timeline(entity)
standard(timeline)

playing = true
button = document.getElementById('play-main-example');

button.addEventListener 'click', ->
  playing = !playing

  if playing
    button.innerHTML = "Pause";
  else 
    button.innerHTML = "Play";

engine = new Engine('canvas')
engine.add(entity)
engine.start()

