(function() {
  var Entity, Timeline, U, context, entity, lastTimestamp, update;

  Timeline = Plunder.Timeline;

  U = Plunder.Util;

  window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame;

  Entity = (function() {
    function Entity() {
      this.timeline = new Timeline(this);
      this.anis = [];
      this.x = 10;
      this.y = 10;
      this.alpha = 1;
      this.color = [255, 0, 0, 1];
    }

    Entity.prototype.standard = function() {
      var tl;
      tl = this.timeline;
      return tl.forever(function() {
        var group;
        group = tl.together({
          duration: 2000
        }, function() {
          tl.rotate({
            from: 0,
            to: 720
          });
          tl.color({
            from: [255, 0, 0, 1],
            to: [255, 255, 0, 0.2]
          });
          tl.scale({
            from: 1,
            to: 10
          });
          return tl.move({
            from: {
              x: 10,
              y: 10
            },
            to: {
              x: 250,
              y: 100
            }
          });
        });
        tl.wait(500);
        return tl.reverse(group);
      });
    };

    Entity.prototype.addPlunderAnimation = function(ani) {
      return this.anis.push(ani);
    };

    Entity.prototype.clearPlunderAnimations = function() {
      return this.anis = [];
    };

    Entity.prototype.update = function(delta) {
      var ani, _i, _len, _ref, _results;
      _ref = this.anis;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        ani = _ref[_i];
        _results.push(ani.update(delta));
      }
      return _results;
    };

    Entity.prototype.draw = function(context) {
      context.save();
      context.fillStyle = "rgba(" + (this.color[0] | 0) + ", " + (this.color[1] | 0) + ", " + (this.color[2] | 0) + ", " + this.color[3] + ")";
      context.translate(this.x, this.y);
      if (this.scale) {
        context.scale(this.scale, this.scale);
      }
      if (this.angle) {
        context.rotate(U.degreesToRadians(this.angle));
      }
      context.fillRect(-5, -5, 10, 10);
      return context.restore();
    };

    return Entity;

  })();

  entity = new Entity();

  entity.standard();

  context = document.getElementById('canvas').getContext('2d');

  lastTimestamp = null;

  update = function(ts) {
    var delta;
    if (!lastTimestamp) {
      lastTimestamp = ts;
    }
    delta = ts - lastTimestamp;
    lastTimestamp = ts;
    entity.update(delta);
    context.fillStyle = 'black';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    entity.draw(context);
    return window.requestAnimationFrame(update);
  };

  update(0);

}).call(this);
