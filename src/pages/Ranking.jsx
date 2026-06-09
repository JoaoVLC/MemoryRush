import { useEffect, useState } from 'react'
import ScoreCard from '../components/ScoreCard.jsx'
import rankingService from '../services/rankingService.js'

function Ranking() {
  const [scores, setScores] = useState([])

  // CHAVE useEffect: executa uma vez ao abrir o Ranking para buscar os dados salvos.
  useEffect(() => {
    // CHAVE ranking: carrega as pontuações salvas quando a página abre.
    setScores(rankingService.getScores())
  }, [])

  const handleClearRanking = () => {
    // CHAVE service: a página pede ao rankingService para limpar os dados.
    rankingService.clearScores()
    setScores([])
  }

  return (
    <section className="content-page ranking-page">
      <p className="eyebrow">Ranking</p>
      <h1>Pontuações dos jogadores</h1>
      <p>
        As melhores pontuações ficam salvas localmente no navegador, simulando
        um serviço de dados sem usar backend real.
      </p>

      <div className="ranking-actions">
        <button
          className="button button--secondary button--danger"
          type="button"
          onClick={handleClearRanking}
          disabled={scores.length === 0}
        >
          Limpar ranking
        </button>
      </div>

      {scores.length > 0 ? (
        <div className="score-list">
          {scores.map((score) => (
            <ScoreCard
              key={score.id}
              nome={score.nome}
              email={score.email}
              pontos={score.pontos}
              dificuldade={score.dificuldade}
              data={score.data}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Nenhuma pontuação salva</h2>
          <p>Jogue uma partida para aparecer no ranking.</p>
        </div>
      )}
    </section>
  )
}

export default Ranking
