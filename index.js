const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')
const {width, height} = canvas
const rect = canvas.getBoundingClientRect()
const scaleX = width / rect.width
const scaleY = height / rect.height  


// prepara o estilo global do canvas
context.lineWidth=2 // 2 pixels de linha
context.fillStyle='transparent' // o fundo dos círculos é transparente
// cria um array para guardar a lista de curvas da cena
const curvas = []
// insere uma curva na lista. Dessa forma, sempre vai haver uma quando a pessoa abrir o index.html
// o construtor da curva recebe um ponto. Ela aparecerá num local aleatório próximo ao pondo dado.
// Nesse caso, o ponto é o centro do canvas
curvas.push(new Curva([width/2, height/2]))
// variável que guarda qual curva está selecionada no momento. Nesse caso, a primeira.
let currentCurve = 0

// as duas próximas variáveis guardam a posição do mouse do usuário
// isso é necessário aqui porque eu preciso saber a posição a inserir
// um novo controle quando o usuário aperta I, e não é possível obter
// a posição do mouse a partir dum input do teclado.
let currentX, currentY
// e o método a seguir simplesmente mantém as duas variáveis anteriores
// atualizadas quando o usuário movimenta o mouse
document.body.onmousemove = e => {
  currentX = (e.clientX - rect.left) * scaleX
  currentY = (e.clientY - rect.top) * scaleY
}

// essas duas variáves são pra calcular deltaX e deltaY
// quando o usuário está movendo um controle. Elas indicam
// onde o movimento começou.
let startX, startY

// quando a pessoa aperta o botão do mouse sobre o canvas
// essa função é chamada
canvas.addEventListener('mousedown', () => {
  // se a pessoa apertou num ponto de controle
  // essa função retorna um objeto contendo as propriedades
  // "curva" e "control". "control" é o objeto que representa o
  // ponto de controle.
  const found = findControlPoint(currentX, currentY)
  if (!found) return;

  // atualizo o início do movimento
  startX = currentX
  startY = currentY
  // e digo ao canvas para chamar found.control sempre que o
  // usuário mover o mouse sobre o canvas
  // o bind serve pra eu poder usar "found.control" dentro da função "move"
  // sendo que em vez de me referir a ele como "found.control", eu uso "this".
  // Ou seja, dentro de "move", "this" = "found.control"
  canvas.onmousemove = move.bind(found.control)
})
// função chamada quando a pessoa está arrastando
// o ponto de controle
function move(e) {
  // calcula a diferença de movimento
  const deltaX = currentX - startX
  const deltaY = currentY - startY

  // aplica a mesma diferença no ponto de controle
  // Lembre-se: this = found.control, por causa da linha 56
  this[0] += deltaX
  this[1] += deltaY

  // atualiza o início do movimento
  startX = currentX
  startY = currentY

  // redesenha as curvas
  update()
}

// quando a pessoa levanta o botão do mouse essa função é chamada
canvas.addEventListener('mouseup', () => {
  // não há mais necessidade de ficar "escutando"
  // quando o usuário mover o mouse sobre o canvas
  canvas.onmousemove=null
  // redesenha as curvas
  update()
})

// quando a pessoa apertar alguma tecla do teclado...
document.body.addEventListener('keyup', e => {
  if (e.keyCode === 73) { // se é a tecla I
    if (curvas[currentCurve]) { // e se tem uma curva selecionada
      // adiciona um controle nessa curva, na posição atual do mouse
      curvas[currentCurve].addControl(currentX, currentY)
      // redesenha
      update()
    }
  }
  if (e.keyCode === 8 || e.keyCode === 46) { // se são as teclas del ou backspace
    if (curvas[currentCurve]) { // e se existe uma curva selecionada
      // remove o controle selecionad dessa curva.
      // A curva sabe qual é o controle selecionado
      curvas[currentCurve].removeControl()
      update()
    }
  }
})

// encontra o ponto de controle clicado
function findControlPoint(x, y) {
  if (!S_PONT) return null
  for (const [i,c] of curvas.entries()) {
    for (const p of c.controls) {
      // 6 é um raio de erro.
      // Se o ca posição [x, y] está numa distância < 6px de distância
      // do ponto de controle
      if (Math.abs(p[0]-x) < 6 && Math.abs(p[1]-y) < 6) {
        c.iControl = p // indica pra curva qual foi o controle selecionado (sim, iControl é um nome péssimo)
        currentCurve = i // indica qual é a curva selecionada
        return {curva: c, control: p}
      }
    }
  }
  return null
}

function update() {
  // apaga tudo no canvas
  context.clearRect(0, 0, width, height)
  for (const [i,c] of curvas.entries()) {
    // redesenha a curva c
    // o segundo parâmetro indica se ela é a selecionada
    // porque daí ela fica de outra cor.
    c.draw(context, i === currentCurve)
  }
}
update()