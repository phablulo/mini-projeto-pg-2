const PI_2 = 2*Math.PI
class Curva {
  constructor(center) {
    this.controls = [
      deviateFrom(center),
      deviateFrom(center),
      deviateFrom(center),
    ]
  }
  draw(context) {
    if (S_PONT) {
      for (const p of this.controls) {
        context.beginPath()
        context.arc(p[0], p[1], 5, 0, PI_2, false)
        context.stroke()
      }
    }
    if (S_CURV && N_AVAL > 0) {
      context.beginPath()
      const n = 1 / N_AVAL
      let previous = this._bezier(0)
      context.moveTo(previous[0], previous[1])
      for (let i = 1; i <= N_AVAL; ++i) {
        const point = this._bezier(i*n)
        context.lineTo(point[0], point[1])
      }
      context.stroke()
    }
  }
  _bezier(t) {
    for (var a = this.controls; a.length > 1; a = b) {
      for (var i = 0, b = [], j; i < a.length - 1; i++) {
        for (b[i] = [], j = 0; j < a[i].length; j++) {
          b[i][j] = a[i][j] * (1 - t) + a[i+1][j] * t;
        }
      }
    }
    return a[0];
  }
}
function deviateFrom(point) {
  return [
    point[0] + Math.round(Math.random() * 80)-40,
    point[1] + Math.round(Math.random() * 80)-40,
  ]
}