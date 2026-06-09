import { Link } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import p5 from 'p5'
import PlayerForm from '../components/PlayerForm.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import sketch from '../game/sketch.js'
import rankingService from '../services/rankingService.js'

const difficultyLabels = {
  facil: 'Fácil',
  medio: 'Médio',
  dificil: 'Difícil',
}

function Jogo() {
  const canvasContainerRef = useRef(null)
  const { currentUser } = useAuth()
  // CHAVE useState: guarda jogador e pontuação para a tela reagir às mudanças.
  const [player, setPlayer] = useState(null)
  const [lastScore, setLastScore] = useState(null)

  const handleStartGame = (playerData) => {
    setPlayer(playerData)
    setLastScore(null)
  }

  const handleGameOver = useCallback(
    (score) => {
      if (!player) {
        return
      }

      // CHAVE callback: o p5.js chama essa função quando o jogo termina.
      const savedScore = rankingService.saveScore({
        nome: player.nome,
        email: currentUser?.email || '',
        pontos: score,
        dificuldade: player.dificuldade,
      })

      setLastScore(savedScore)
    },
    [currentUser, player],
  )

  // CHAVE useEffect: executa quando o jogador muda para criar/remover o jogo p5.js.
  useEffect(() => {
    const container = canvasContainerRef.current
    let game = null

    if (!container || !player) {
      return undefined
    }

    container.innerHTML = ''
    // CHAVE React + p5.js: React monta o canvas e passa dificuldade/callback ao jogo.
    game = new p5(
      (p) =>
        sketch(p, {
          dificuldade: player.dificuldade,
          onGameOver: handleGameOver,
        }),
      container,
    )

    return () => {
      // CHAVE cleanup: remove o canvas antigo para evitar jogo duplicado na tela.
      game?.remove()
      container.innerHTML = ''
    }
  }, [handleGameOver, player])

  return (
    <section className="game-page">
      <div className="section-heading">
        <p className="eyebrow">Jogo</p>
        <h1>Memory Rush</h1>
        <p>
          Cadastre o jogador, escolha a dificuldade e repita a sequência dos blocos.
        </p>
      </div>

      {!player ? (
        <div className="game-setup">
          {/* CHAVE formulário: o jogo só aparece depois do cadastro do jogador. */}
          <PlayerForm onSubmit={handleStartGame} />
        </div>
      ) : (
        <>
          <div className="game-status">
            <div>
              <span>Jogador</span>
              <strong>{player.nome}</strong>
            </div>
            <div>
              <span>Dificuldade</span>
              <strong>{difficultyLabels[player.dificuldade]}</strong>
            </div>
            <button
              className="button button--secondary"
              type="button"
              onClick={() => setPlayer(null)}
            >
              Trocar jogador
            </button>
          </div>

          {lastScore && (
            <div className="score-feedback" role="status">
              Pontuação salva: <strong>{lastScore.pontos} pts</strong>.
              <Link to="/ranking"> Ver ranking</Link>
            </div>
          )}

          <div className="game-panel">
            <div ref={canvasContainerRef} className="game-canvas" />
          </div>
        </>
      )}
    </section>
  )
}

export default Jogo
