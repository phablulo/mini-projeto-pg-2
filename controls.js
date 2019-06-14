N_AVAL  = 6
S_PONT = true
S_POLI = true
S_CURV = true

document.querySelector('#naval').addEventListener('input', e => {
  const n = parseInt(e.target.value)
  if (!isNaN(n)) {
    N_AVAL = n
    update()
  }
})
function ccheck(query, cb) {
  document.querySelector(query).addEventListener('change', e => {
    return cb(e.target.checked)
  })
}
ccheck('#spont', x => {
  S_PONT = x
  update()
})
ccheck('#spoli', x => {
  S_POLI = x
  update()
})
ccheck('#scurv', x => {
  S_CURV = x
  update()
})
document.querySelector('#novo').addEventListener('click', () => {
  const len = curvas.push(new Curva([width/2, height/2]))
  currentCurve = len-1
  update()
})
document.querySelector('#remove').addEventListener('click', () => {
  if (curvas[currentCurve]) {
    curvas.splice(currentCurve, 1)
  }
  if (currentCurve >= curvas.length) {
    --currentCurve
  }
  update()
})
document.querySelector('#next').addEventListener('click', () => {
  currentCurve = ((currentCurve || 0) + 1) % curvas.length
  update()
})