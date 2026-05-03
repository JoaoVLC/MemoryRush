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
        Esta versão não possui backend, banco de dados, autenticação ou CRUD. O foco
        é apresentar uma aplicação funcional, organizada e pronta para demonstração.
      </p>
    </section>
  )
}

export default Sobre
