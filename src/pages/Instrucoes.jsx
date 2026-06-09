function Instrucoes() {
  return (
    <section className="content-page">
      <p className="eyebrow">Instruções</p>
      <h1>Como jogar</h1>

      <div className="instructions-list">
        <article>
          <span>1</span>
          <p>Faça login ou crie uma conta para liberar a página Jogo.</p>
        </article>
        <article>
          <span>2</span>
          <p>Entre na página Jogo, informe seu nome e escolha uma dificuldade.</p>
        </article>
        <article>
          <span>3</span>
          <p>Pressione a tecla espaço para começar a partida no canvas.</p>
        </article>
        <article>
          <span>4</span>
          <p>Observe a sequência e clique nos blocos repetindo a mesma ordem.</p>
        </article>
        <article>
          <span>5</span>
          <p>Se errar, a pontuação final é salva no ranking local.</p>
        </article>
      </div>
    </section>
  )
}

export default Instrucoes
