(function() {
  define(['plunder', 'raf'], function(Plunder) {
    var EasingVis;
    return EasingVis = (function() {
      function EasingVis(canvasId, easingFn, duration) {
        this.duration = duration != null ? duration : 8000;
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.w = this.canvas.width;
        this.h = this.canvas.height;
        this.easingFn = Plunder.Easie[easingFn];
        this.linear = Plunder.Easie.linear;
        this._updateBound = this._update.bind(this);
        this._elapsed = 0;
        this._lastTimestamp = null;
        this._pathBuffer = this._createPathBuffer(this.w, this.h, this.duration);
      }

      EasingVis.prototype.go = function() {
        return this._updateBound(0);
      };

      EasingVis.prototype._update = function(ts) {
        var delta;
        if (this._lastTimestamp == null) {
          this._lastTimestamp = ts;
        }
        delta = ts - this._lastTimestamp;
        this._lastTimestamp = ts;
        this.context.drawImage(this._pathBuffer, 0, 0);
        this._drawNode(delta, 10, this.easingFn, 'rgb(200, 120, 40)');
        this._drawNode(delta, 30, Plunder.Easie.linear, 'rgb(255, 0, 0)');
        return window.requestAnimationFrame(this._updateBound);
      };

      EasingVis.prototype._drawNode = function(delta, x, easingFn, color) {
        var y;
        this._elapsed += delta;
        if (this._elapsed >= this.duration) {
          this._elapsed -= this.duration;
        }
        y = easingFn(this._elapsed, 0, this.h, this.duration);
        this.context.fillStyle = color;
        return this.context.fillRect(x - 3, y - 3, 6, 6);
      };

      EasingVis.prototype._createPathBuffer = function(w, h, d) {
        var canvas, context, i, x, y, _i;
        canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        context = canvas.getContext('2d');
        context.fillStyle = 'black';
        context.fillRect(0, 0, w, h);
        context.fillStyle = 'rgb(200, 200, 200)';
        for (i = _i = 0; 0.1 > 0 ? _i <= d : _i >= d; i = _i += 0.1) {
          x = this.linear(i, 0, w, d);
          y = this.easingFn(i, 0, h, d);
          context.fillRect(x - 0.5, y - 0.5, 1, 1);
        }
        return canvas;
      };

      return EasingVis;

    })();
  });

}).call(this);
