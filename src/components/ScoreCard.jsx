const difficultyLabels = {
  facil: 'Fácil',
  medio: 'Médio',
  dificil: 'Difícil',
}

// CHAVE props: ScoreCard recebe dados do Ranking e apenas exibe a pontuação.
function ScoreCard({ nome, email, pontos, dificuldade, data }) {
  const difficultyLabel = difficultyLabels[dificuldade] || dificuldade
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(data))

  return (
    <article className="score-card">
      <div>
        <h3>{nome}</h3>
        {email && <p>{email}</p>}
        <p>{formattedDate}</p>
      </div>

      <div className="score-card__details">
        <span>{difficultyLabel}</span>
        <strong>{pontos} pts</strong>
      </div>
    </article>
  )
}

export default ScoreCard
