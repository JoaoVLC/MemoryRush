function Contato() {
  return (
    <section className="content-page">
      <p className="eyebrow">Contato</p>
      <h1>Fale com o HQMania</h1>
      <p>Formulario visual criado apenas para compor a interface inicial do projeto.</p>

      <form className="contact-form">
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" type="text" placeholder="Digite seu nome" />

        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="email" placeholder="seuemail@exemplo.com" />

        <label htmlFor="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" rows="5" placeholder="Escreva sua mensagem" />

        <button type="button">Enviar</button>
      </form>
    </section>
  )
}

export default Contato
