const PI_2 = 2*Math.PI
class Curva {
  constructor(center) {
    this.controls = [
      deviateFrom(center),
      deviateFrom(center),
      deviateFrom(center),
    ]
  }
  draw(context, selected) {
    if (S_PONT) {
      for (const p of this.controls) {
        context.beginPath()
        context.arc(p[0], p[1], 5, 0, PI_2, false)
        context.strokeStyle=(p===this.iControl)?'#24EF24':'#2265AA'
        context.stroke()
      }
    }
    if (S_CURV && N_AVAL > 0) {
      context.beginPath()
      const m = N_AVAL - 1
      const n = 1 / m
      let previous = this._bezier(0)
      context.moveTo(previous[0], previous[1])
      for (let i = 1; i <= m; ++i) {
        const point = this._bezier(i*n)
        context.lineTo(point[0], point[1])
      }
      context.strokeStyle= selected?'#FC2280':'#000'
      context.stroke()
    }
  }
  addControl(x, y) {
    const p = [x, y]
    const index = this._nextControlIndex()
    this.iControl = p
    this.controls.splice(index, 0, p)
  }
  removeControl() {
    const index = this.controls.findIndex(x => x === this.iControl)
    if (index > -1) {
      this.controls.splice(index, 1)
    }
  }
  _nextControlIndex() {
    if (!this.iControl) {
      return this.controls.length
    }
    const index = this.controls.findIndex(x => x === this.iControl)
    if (index === -1) {
      return this.controls.length
    }
    return index+1
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