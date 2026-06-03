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
          <p className="eyebrow">Evolução RA2</p>
          <h2>Agora com formulário, dificuldade e ranking</h2>
          <p>
            A versão RA2 mantém o jogo em p5.js e adiciona interatividade com
            React, estado, componentes com props e dados persistidos localmente.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <h3>Cadastro de jogador</h3>
            <p>
              Antes de jogar, informe o nome e escolha a dificuldade da partida.
            </p>
          </article>
          <article className="feature-card">
            <h3>Estado e interação</h3>
            <p>
              A página controla o jogador ativo, inicia o canvas e salva a pontuação final.
            </p>
          </article>
          <article className="feature-card">
            <h3>Ranking local</h3>
            <p>
              As pontuações são ordenadas da maior para a menor e salvas no localStorage.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}

export default Home
