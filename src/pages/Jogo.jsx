import { useEffect, useRef } from 'react'
import p5 from 'p5'
import sketch from '../game/sketch.js'

function Jogo() {
  const canvasContainerRef = useRef(null)

  useEffect(() => {
    const container = canvasContainerRef.current
    let game = null

    if (!container) {
      return undefined
    }

    container.innerHTML = ''
    game = new p5(sketch, container)

    return () => {
      game?.remove()
      container.innerHTML = ''
    }
  }, [])

  return (
    <section className="game-page">
      <div className="section-heading">
        <p className="eyebrow">Jogo</p>
        <h1>Memory Rush</h1>
        <p>
          Observe a sequência, espere sua vez e clique nos blocos na mesma ordem.
        </p>
      </div>

      <div className="game-panel">
        <div ref={canvasContainerRef} className="game-canvas" />
      </div>
    </section>
  )
}

export default Jogo
