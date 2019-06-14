const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')
const {width, height} = canvas
const rect = canvas.getBoundingClientRect()
const scaleX = width / rect.width
const scaleY = height / rect.height  


// prepare
context.lineWidth=2
context.fillStyle='transparent'
// ---
const curvas = [
  new Curva([width/2, height/2])
] // buffer
let currentCurve = 0

let currentX, currentY
let startX, startY
canvas.addEventListener('mousedown', e => {
  const found = findControlPoint(currentX, currentY)
  if (!found) return;

  startX = currentX
  startY = currentY
  canvas.onmousemove = move.bind(found.control)
})
canvas.addEventListener('mouseup', () => {
  canvas.onmousemove=null
  update()
})
function move(e) {
  const deltaX = currentX - startX
  const deltaY = currentY - startY

  this[0] += deltaX
  this[1] += deltaY

  startX = currentX
  startY = currentY

  update()
}
document.body.onmousemove=e=> {
  currentX = (e.clientX - rect.left) * scaleX
  currentY = (e.clientY - rect.top) * scaleY
}
document.body.addEventListener('keyup', e => {
  if (e.keyCode === 73) { // i
    if (curvas[currentCurve]) {
      curvas[currentCurve].addControl(currentX, currentY)
      update()
    }
  }
  if (e.keyCode === 8 || e.keyCode === 46) { // del ou backspace
    if (curvas[currentCurve]) {
      curvas[currentCurve].removeControl()
      update()
    }
  }
})

function findControlPoint(x, y) {
  if (!S_PONT) return null
  for (const [i,c] of curvas.entries()) {
    for (const p of c.controls) {
      if (Math.abs(p[0]-x) < 6 && Math.abs(p[1]-y) < 6) {
        c.iControl = p
        currentCurve = i
        return {curva: c, control: p}
      }
    }
  }
  return null
}

function update() {
  context.clearRect(0, 0, width, height)
  for (const [i,c] of curvas.entries()) {
    c.draw(context, i === currentCurve)
  }
}
update()