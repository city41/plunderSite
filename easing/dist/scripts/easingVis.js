(function() {
  define(['plunder', 'raf'], function(Plunder) {
    var EasingVis;
    return EasingVis = (function() {
      function EasingVis(canvasId, easingFn) {
        this.easingFn = easingFn;
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
        this.w = this.canvas.width;
        this.h = this.canvas.height;
      }

      EasingVis.prototype.go = function() {
        return this._update(0);
      };

      EasingVis.prototype._update = function(delta) {
        return this.context.clearRect(0, 0, this.w, this.h);
      };

      return EasingVis;

    })();
  });

}).call(this);
