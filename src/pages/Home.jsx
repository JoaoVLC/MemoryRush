import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <h1>Memory Rush</h1>
          <p>
            Um jogo de memória interativo em que você observa uma sequência de
            blocos coloridos, cadastra seu jogador e tenta entrar no ranking.
          </p>

          <div className="hero__actions">
            <Link className="button button--primary" to="/jogo">
              Jogar agora
            </Link>
            <Link className="button button--secondary" to="/ranking">
              Ver ranking
            </Link>
            <Link className="button button--secondary" to="/instrucoes">
              Como jogar
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Jogo de memória</p>
          <h2>Observe, memorize e repita a sequência</h2>
          <p>
            Memory Rush desafia sua atenção a cada rodada. A sequência fica maior,
            o ritmo aumenta e cada acerto deixa a partida mais intensa.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <h3>Sequência de cores</h3>
            <p>
              Observe os blocos acendendo e repita tudo na mesma ordem para pontuar.
            </p>
          </article>
          <article className="feature-card">
            <h3>Escolha sua dificuldade</h3>
            <p>
              Jogue no modo fácil, médio ou difícil e teste sua memória em ritmos diferentes.
            </p>
          </article>
          <article className="feature-card">
            <h3>Dispute o ranking</h3>
            <p>
              Tente superar sua melhor pontuação e compare seu resultado com outros jogadores.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}

export default Home
