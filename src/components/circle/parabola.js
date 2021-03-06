class Parabola {
  constructor(opts) {
    opts = opts || {};
    // required `startPos`, `endPos` params in opts
    if (!opts.startPos) {
      throw new Error('`startPos` is required in init options');
    }

    if (!opts.endPos) {
      throw new Error('`endPos` is required in init options');
    }
    // opts.curvature = opts.curvature || 0.003;
    opts.duration = opts.duration || 2000;

    this.opts = opts;

    this.calCurvature();
  }
  calCurvature() {
    this.opts.driftX = this.opts.endPos.left - this.opts.startPos.left;
    this.opts.driftY = this.opts.endPos.top - this.opts.startPos.top;

    // 在不超出屏幕范围的前提下，尽量抛得更高，计算合适的曲率 (a)
    var yMin = -this.opts.yMinParams * this.opts.startPos.top;

    var a = this.power(this.opts.driftX, 4);
    var b = (4 * yMin - 2 * this.opts.driftY) * this.power(this.opts.driftX, 2);
    var c = this.power(this.opts.driftY, 2);

    this.opts.curvature = (-1 * b + Math.sqrt((this.power(b, 2) - 4 * a * c))) / (2 * a);

    this.opts.b = (this.opts.driftY - this.opts.curvature * this.opts.driftX * this.opts.driftX) / this.opts.driftX;

  }
  power(v, n) {
    if (n === 1) {
      return v;
    } else {
      return v * this.power(v, (n - 1));
    }
  }
  calPosition(progress) {
    // 当前进度下的X轴的位置
    const x = this.opts.driftX * progress;
    // 当前进度下的Y轴的位置
    // y = a*x*x + b*x + c,  c = 0
    const y = this.opts.curvature * x * x + this.opts.b * x;

    return {
      left: Math.round(x + this.opts.startPos.left),
      top: Math.round(y + this.opts.startPos.top)
    }
  }
  start() {
    var opts = this.opts;
    var me = this;
    var startTimeStamp = +new Date();
    var animationFrame = window.requestAnimationFrame  ||
      window.webkitRequestAnimationFrame  ||
      window.mozRequestAnimationFrame     ||
      window.oRequestAnimationFrame       ||
      window.msRequestAnimationFrame      ||
      function (callback) { window.setTimeout(callback, 1000 / 60); };

    function step () {
      var currentTimeStamp = +new Date();

      var progress = Math.min((currentTimeStamp - startTimeStamp) / opts.duration, 1);
      if (progress === 1) {
        // 动画结束
        return false;
      } else {
        var position = me.calPosition(progress);
        opts.onStep && opts.onStep(position, progress);

        return true;
      }
    }

    function progress () {
      if (step()) {
        animationFrame(progress);
      } else {
        if (typeof opts.onFinish === 'function') {
          opts.onFinish(opts.endPos);
        }
      }
    }

    animationFrame(progress);
  }
}

export default Parabola
