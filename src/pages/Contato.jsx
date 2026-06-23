import { useState } from 'react'

const initialFormData = {
  nome: '',
  email: '',
  mensagem: '',
}

function Contato() {
  const [formData, setFormData] = useState(initialFormData)
  const [status, setStatus] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('Mensagem registrada de forma simulada.')
    setFormData(initialFormData)
  }

  return (
    <section className="content-page">
      <p className="eyebrow">Contato</p>
      <h1>Fale com a equipe</h1>
      <p>
        Use este formulário para simular o envio de uma mensagem sobre o projeto
        Memory Rush.
      </p>

      <form className="app-form" onSubmit={handleSubmit}>
        {status && <p className="alert alert--success">{status}</p>}

        <div className="form-field">
          <label htmlFor="contato-nome">Nome</label>
          <input
            id="contato-nome"
            name="nome"
            type="text"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Seu nome"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="contato-email">E-mail</label>
          <input
            id="contato-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seuemail@exemplo.com"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="contato-mensagem">Mensagem</label>
          <textarea
            id="contato-mensagem"
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            placeholder="Escreva sua mensagem"
            rows="4"
            required
          />
        </div>

        <button className="button button--primary" type="submit">
          Enviar mensagem
        </button>
      </form>
    </section>
  )
}

export default Contato
