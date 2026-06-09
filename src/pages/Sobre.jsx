function Sobre() {
  return (
    <section className="content-page">
      <p className="eyebrow">Sobre</p>
      <h1>Projeto integrado</h1>
      <p>
        Memory Rush é um projeto acadêmico desenvolvido para integrar duas
        disciplinas: Web Development: Framework, com React, e Web Development:
        HTML5 Canvas & Games, com p5.js.
      </p>
      <p>
        A aplicação usa React para organizar páginas, rotas, componentes e layout.
        A página do jogo renderiza um canvas controlado pelo p5.js, mantendo a
        lógica do game separada em um arquivo próprio.
      </p>
      <p>
        Na evolução do projeto, foram adicionados cadastro de jogador, escolha
        de dificuldade, gerenciamento de estado, ranking, autenticação simulada,
        rotas protegidas e consumo real de API HTTP com fetch.
      </p>
      <p>
        Esta versão não possui backend próprio nem banco de dados real. A
        persistência local usa localStorage, e a integração HTTP é demonstrada
        com a API pública JSONPlaceholder.
      </p>
    </section>
  )
}

export default Sobre
