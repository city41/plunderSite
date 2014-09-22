var Plunder = require('plunder');
var Baby = require('baby-engine');

var Timeline = Plunder.Timeline;
var Engine = Baby.Engine;
var RectEntity = Baby.RectEntity;

function runExample(canvasId) {
  var engine = new Engine('canvas');

  function standard(tl) {
    tl.forever(() => {
      var group = tl.together({duration: 2000}, () => {
        tl.rotate({
          from: 0,
          to: 360
        });
        tl.color({
          from: [255, 0, 0, 1],
          to: [255, 255, 0, 0.2]
        });
        tl.scale({
          from: 1,
          to: 10
        });
        tl.move({
          from: { x: 10, y: 10 },
          to: { x: 250, y: 100 }
        });
      });

      tl.wait(500);
      tl.reverse(group);
    });
  }

  var entity = new RectEntity(10, 10, 10, 10);
  entity.color = [255, 0, 0];

  var timeline = new Timeline(entity);
  standard(timeline);

  var playing = true
  var button = document.getElementById('play-main-example');

  button.addEventListener('click', () => {
    engine.togglePause();

    if (engine.paused) {
      button.innerHTML = "Play";
    } else {
      button.innerHTML = "Pause";
    }
  });

  engine.add(entity);
  engine.start();
}

export default runExample;
