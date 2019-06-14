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
  }
  getBezier() {
    const pts = this.controls
    return t => {
      for (var a = pts; a.length > 1; a = b) {
        for (var i = 0, b = [], j; i < a.length - 1; i++) {
          for (b[i] = [], j = 0; j < a[i].length; j++) {
            b[i][j] = a[i][j] * (1 - t) + a[i+1][j] * t;
          }
        }
      }
      return a[0];
    }
  }
}
function deviateFrom(point) {
  return [
    point[0] + Math.round(Math.random() * 80)-40,
    point[1] + Math.round(Math.random() * 80)-40,
  ]
}