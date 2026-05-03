import { Link } from 'react-router-dom'

function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__content">
          <h1>Memory Rush</h1>
          <p>
            Um jogo de memória interativo em que você observa uma sequência de
            blocos coloridos e tenta repetir tudo na ordem correta.
          </p>

          <div className="hero__actions">
            <Link className="button button--primary" to="/jogo">
              Jogar agora
            </Link>
            <Link className="button button--secondary" to="/instrucoes">
              Como jogar
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Jogo interativo</p>
          <h2>Memory Rush: desafie sua memória</h2>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <h3>Desafio de memória</h3>
            <p>
              Observe a sequência de cores e repita corretamente para avançar nas rodadas.
            </p>
          </article>
          <article className="feature-card">
            <h3>Interação em tempo real</h3>
            <p>
              Clique nos blocos coloridos e teste sua atenção e rapidez a cada jogada.
            </p>
          </article>
          <article className="feature-card">
            <h3>Dificuldade progressiva</h3>
            <p>
              A sequência aumenta a cada acerto, tornando o jogo cada vez mais desafiador.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}

export default Home
