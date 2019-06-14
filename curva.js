const PI_2 = 2*Math.PI
class Curva {
  constructor(center) {
    // cria três pontos aleatórios ao redor do centro
    // pra ser os controls
    this.controls = [
      deviateFrom(center),
      deviateFrom(center),
      deviateFrom(center),
    ]
  }
  draw(context, selected) {
    // se não tem controles, não tem como desenhar a curva
    if (!this.controls.length) return;
    // S_PONT = Show pontos
    if (S_PONT) {
      // retorna uma cor bonita dependendo de se está selecionado ou não
      const color = !selected ? ()=> '#656595' : p => {
        return (p===this.iControl)?'#24EF24':'#2265AA'
      }
      // para cada controle
      for (const p of this.controls) {
        context.beginPath()
        // desena uma bolinha no local
        context.arc(p[0], p[1], 5, 0, PI_2, false)
        context.strokeStyle=color(p)
        context.stroke()
      }
    }
    // S_CURV = show curves
    // N_AVAL = número de avaliações
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
    // S_POLI = show poligonais
    if (S_POLI) {
      const layers = this.controls.length
      recursiveLines(this.controls, layers, layers)
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
  // o De Casteljuoaooauoauuao
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
function recursiveLines(points, layer, layers) {
  const len = points.length
  context.beginPath()
  context.moveTo(...points[0])
  for (let i = 1; i < len; ++i) {
    context.lineTo(...points[i])
  }
  context.strokeStyle = gcolor(layer/layers)
  context.stroke()
  // calcula as interpolações e continua
  const l = len - 1
  if (l < 2) return; // exceto se for pouco demais
  const medios = Array(l)
  for (let i = 1; i < len; ++i) {
    const p0 = points[i-1]
    const p1 = points[i]
    medios[i-1] = [
      0.5*p0[0] + 0.5*p1[0],
      0.5*p0[1] + 0.5*p1[1]
    ]
  }
  return recursiveLines(medios, --layer, layers)
}
function gcolor(n) {
  const r = 40
  const g = 40 + Math.round(n * 200)
  const b = 40 + Math.round(n * 150)
  return 'rgb('+r+','+g+','+b+')'
}