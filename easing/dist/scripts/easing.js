(function() {
  define(['plunder', 'raf'], function(Plunder) {
    var Easing;
    return Easing = (function() {
      function Easing(canvasId, easingFn) {
        this.easingFn = easingFn;
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext('2d');
      }

      Easing.prototype.go = function() {
        return this._update(0);
      };

      Easing.prototype._update = function(delta) {};

      return Easing;

    })();
  });

}).call(this);
