// Cores do jogo (cada bloco)
const colors = [
  { name: 'Vermelho', base: '#e94560', active: '#ff6b81' },
  { name: 'Azul', base: '#247ba0', active: '#4cc9f0' },
  { name: 'Amarelo', base: '#f9c74f', active: '#ffe066' },
  { name: 'Verde', base: '#43aa8b', active: '#80ed99' },
]

// Função principal do p5.js (controla todo o jogo)
function sketch(p) {
  // Estados do jogo
  let sequence = []        // sequência de cores
  let playerIndex = 0      // posição do jogador
  let score = 0            // pontuação
  let gameState = 'start'  // estado atual

  let activeBlock = null
  let showIndex = 0
  let flashEndsAt = 0
  let nextFlashAt = 0
  let roundDelayUntil = 0
  let blockAreas = []      // áreas clicáveis

  // Define tamanho do canvas (responsivo)
  const getCanvasSize = () => {
    const parentWidth = p.canvas?.parentElement?.clientWidth || 720
    const width = Math.min(680, Math.max(300, parentWidth))
    const height = Math.max(520, Math.round(width * 0.82))

    return { width, height }
  }

  // Reinicia o jogo
  const resetGame = () => {
    sequence = []
    playerIndex = 0
    score = 0
    startNextRound()
  }

  // Inicia uma nova rodada
  const startNextRound = () => {
    sequence.push(Math.floor(p.random(colors.length))) // adiciona cor
    playerIndex = 0
    showIndex = 0
    activeBlock = null
    gameState = 'showing' // mostrando sequência
    nextFlashAt = p.millis() + 700
  }

  // Mostra a sequência na tela
  const updateSequencePreview = () => {
    const now = p.millis()
    const flashDuration = Math.max(260, 620 - score * 18)
    const pauseDuration = Math.max(150, 260 - score * 8)

    if (activeBlock === null && showIndex >= sequence.length) {
      gameState = 'player' // vez do jogador
      playerIndex = 0
      return
    }

    if (activeBlock === null && now >= nextFlashAt) {
      activeBlock = sequence[showIndex]
      flashEndsAt = now + flashDuration
      return
    }

    if (activeBlock !== null && now >= flashEndsAt) {
      activeBlock = null
      showIndex += 1
      nextFlashAt = now + pauseDuration
    }
  }

  // Avança para próxima rodada após acerto
  const updateRoundSuccess = () => {
    if (p.millis() >= roundDelayUntil) {
      startNextRound()
    }
  }

  // Detecta qual bloco foi clicado
  const getClickedBlock = () => {
    return blockAreas.findIndex((area) => {
      return (
        p.mouseX >= area.x &&
        p.mouseX <= area.x + area.size &&
        p.mouseY >= area.y &&
        p.mouseY <= area.y + area.size
      )
    })
  }

  // Verifica se o jogador acertou ou errou
  const handlePlayerChoice = (choice) => {
    activeBlock = choice
    flashEndsAt = p.millis() + 180

    if (choice !== sequence[playerIndex]) {
      gameState = 'gameover' // erro → fim do jogo
      return
    }

    playerIndex += 1

    if (playerIndex === sequence.length) {
      score += 1 // aumenta pontuação
      gameState = 'success'
      roundDelayUntil = p.millis() + 700
    }
  }

  // Desenha o fundo
  const drawBackground = () => {
    p.background('#101624')

    p.noStroke()
    p.fill('#172033')
    p.rect(18, 18, p.width - 36, p.height - 36, 18)
  }

  // Desenha título e pontuação
  const drawHeader = () => {
    p.fill('#ffffff')
    p.textAlign(p.LEFT, p.TOP)
    p.textSize(20)
    p.textStyle(p.BOLD)
    p.text('Memory Rush', 34, 30)

    p.textAlign(p.RIGHT, p.TOP)
    p.textSize(16)
    p.textStyle(p.NORMAL)
    p.fill('#f9c74f')
    p.text(`Pontuação: ${score}`, p.width - 34, 34)
  }

  // Desenha os blocos do jogo
  const drawBlocks = () => {
    const topLimit = 106
    const bottomLimit = p.height - 122
    const availableWidth = Math.min(p.width - 70, 420)
    const availableHeight = Math.max(260, bottomLimit - topLimit)
    const gridSize = Math.min(availableWidth, availableHeight)
    const gap = Math.max(14, gridSize * 0.05)
    const size = (gridSize - gap) / 2
    const startX = (p.width - gridSize) / 2
    const startY = topLimit + (bottomLimit - topLimit - gridSize) / 2

    blockAreas = [
      { x: startX, y: startY, size },
      { x: startX + size + gap, y: startY, size },
      { x: startX, y: startY + size + gap, size },
      { x: startX + size + gap, y: startY + size + gap, size },
    ]

    blockAreas.forEach((area, index) => {
      const isActive = activeBlock === index && p.millis() < flashEndsAt
      const color = colors[index]

      p.drawingContext.shadowBlur = isActive ? 24 : 0
      p.drawingContext.shadowColor = color.active
      p.fill(isActive ? color.active : color.base)
      p.stroke(isActive ? '#ffffff' : '#253047')
      p.strokeWeight(isActive ? 5 : 3)
      p.rect(area.x, area.y, area.size, area.size, 18)

      p.drawingContext.shadowBlur = 0
      p.noStroke()
      p.fill(isActive ? '#101624' : '#ffffff')
      p.textAlign(p.CENTER, p.CENTER)
      p.textSize(18)
      p.textStyle(p.BOLD)
      p.text(color.name, area.x + area.size / 2, area.y + area.size / 2)
    })
  }

  // Mostra mensagens do jogo
  const drawMessage = () => {
    const messages = {
      start: 'Pressione espaço para começar',
      showing: 'Observe a sequência',
      player: 'Sua vez: clique nos blocos',
      success: 'Muito bem! Próxima rodada...',
      gameover: `Fim de jogo! Pontuação final: ${score}`,
    }

    p.noStroke()
    p.fill('#ffffff')
    p.textAlign(p.CENTER, p.CENTER)
    p.textSize(gameState === 'start' ? 24 : 18)
    p.textStyle(p.BOLD)
    p.text(messages[gameState], p.width / 2, p.height - 72)

    if (gameState === 'gameover') {
      p.textSize(16)
      p.textStyle(p.NORMAL)
      p.fill('#f9c74f')
      p.text('Pressione R para reiniciar', p.width / 2, p.height - 42)
    }
  }

  // Executa uma vez (setup do canvas)
  p.setup = () => {
    const { width, height } = getCanvasSize()
    p.createCanvas(width, height)
    p.textFont('Arial')
  }

  // Loop principal do jogo
  p.draw = () => {
    if (gameState === 'showing') {
      updateSequencePreview()
    }

    if (gameState === 'success') {
      updateRoundSuccess()
    }

    drawBackground()
    drawHeader()
    drawBlocks()
    drawMessage()
  }

  // Clique do mouse
  p.mousePressed = () => {
    if (gameState !== 'player') {
      return
    }

    const clickedBlock = getClickedBlock()

    if (clickedBlock >= 0) {
      handlePlayerChoice(clickedBlock)
    }
  }

  // Controle de teclado (start e restart)
  p.keyPressed = () => {
    if (gameState === 'start' && p.keyCode === 32) {
      resetGame()
    }

    if (gameState === 'gameover' && p.key.toLowerCase() === 'r') {
      resetGame()
    }
  }

  // Ajusta o canvas ao redimensionar a tela
  p.windowResized = () => {
    const { width, height } = getCanvasSize()
    p.resizeCanvas(width, height)
  }
}

export default sketch
