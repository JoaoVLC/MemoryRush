function Instrucoes() {
  return (
    <section className="content-page">
      <p className="eyebrow">Instruções</p>
      <h1>Como jogar</h1>

      <div className="instructions-list">
        <article>
          <span>1</span>
          <p>Entre na página Jogo e pressione a tecla espaço para começar.</p>
        </article>
        <article>
          <span>2</span>
          <p>Observe a sequência de blocos coloridos que acende na tela.</p>
        </article>
        <article>
          <span>3</span>
          <p>Quando for sua vez, clique nos blocos repetindo a mesma ordem.</p>
        </article>
        <article>
          <span>4</span>
          <p>A cada rodada correta, sua pontuação aumenta e a sequência fica maior.</p>
        </article>
        <article>
          <span>5</span>
          <p>Se errar, o jogo termina. Pressione R para reiniciar.</p>
        </article>
      </div>
    </section>
  )
}

export default Instrucoes
