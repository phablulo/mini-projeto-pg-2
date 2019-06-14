const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')
const {width, height} = canvas
const rect = canvas.getBoundingClientRect()
const scaleX = width / rect.width
const scaleY = height / rect.height  


// prepare
context.lineWidth=2
context.strokeStyle='#FF000'
context.fillStyle='transparent'
// ---
const curvas = [
  new Curva([width/2, height/2])
] // buffer


let startX, startY
canvas.addEventListener('mousedown', e => {
  const x = (e.clientX - rect.left) * scaleX
  const y = (e.clientY - rect.top) * scaleY
  const found = findControlPoint(x, y)
  if (!found) return;

  startX = x
  startY = y
  canvas.onmousemove = move.bind(found.control)
})
canvas.addEventListener('mouseup', () => {
  canvas.onmousemove=null
})

function move(e) {
  const x = (e.clientX - rect.left) * scaleX
  const y = (e.clientY - rect.top) * scaleY
  const deltaX = x - startX
  const deltaY = y - startY

  this[0] += deltaX
  this[1] += deltaY

  startX = x
  startY = y

  update()
}
function findControlPoint(x, y) {
  if (!S_PONT) return null
  for (const c of curvas) {
    for (const p of c.controls) {
      if (Math.abs(p[0]-x) < 6 && Math.abs(p[1]-y) < 6) {
        return {curva: c, control: p}
      }
    }
  }
  return null
}

function update() {
  context.clearRect(0, 0, width, height)
  for (const c of curvas) {
    c.draw(context)
  }
}
update()