var Plunder = require('plunder');
require('request-animation-frame');

class EasingVis {
  constructor(canvasId, easingFn, duration) {
    this.duration = duration || 12000;

    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.easingFn = Plunder.Easie[easingFn];
    this.linear = Plunder.Easie.linear;
    this._updateBound = this._update.bind(this);
    this._elapsed = 0;
    this._lastTimestamp = null;

    this.offset = 40;
    this._pathBuffer = this._createPathBuffer(this.w, this.h, this.duration, this.offset);
  }

  go() {
    this._updateBound(0);
  }

  _update(ts) {
    if (!this._lastTimestamp) {
      this._lastTimestamp = ts
    }

    var delta = ts - this._lastTimestamp;
    this._lastTimestamp = ts;

    this.context.drawImage(this._pathBuffer, 0, 0);
    this._drawNode(delta, this.offset/4, Plunder.Easie.linear, 'rgb(140, 140, 140)');
    this._drawNode(delta, this.offset - 4, this.easingFn, 'rgb(222, 147, 95)', this.offset);
    window.requestAnimationFrame(this._updateBound);
  }

  _drawNode(delta, x, easingFn, color, xExpandOffset=null) {
    this._elapsed += delta;
    if (this._elapsed >= this.duration) {
      this._elapsed -= this.duration
    }

    var y = easingFn(this._elapsed, 0, this.h, this.duration);

    if (xExpandOffset) {
      this.context.fillStyle = 'rgba(180, 180, 180, 0.5)';
      var ex = this.linear(this._elapsed, xExpandOffset, this.w-xExpandOffset, this.duration);
      this.context.fillRect(x, y-1.5, ex-x-1.5, 2);
    }

    this.context.fillStyle = color;
    this.context.fillRect(x-4, y-4, 8, 8);
  }

  _createPathBuffer(w, h, d, offset) {
    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    var context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, w, h);

    context.fillStyle = 'rgb(200, 200, 200)';

    for (var i = 0; i < d; i += 4) {
      var x = this.linear(i, offset, w-offset, d);
      var y = this.easingFn(i, 0, h, d);
      context.fillRect(x-1.5, y-1.5, 3, 3);
    }

    context.fillStyle = 'rgb(80,80,80)';
    context.fillRect(0, 0, offset, h);

    return canvas;
  }
}

export default EasingVis;
