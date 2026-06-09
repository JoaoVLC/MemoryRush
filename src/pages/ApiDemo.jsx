import { useEffect, useState } from 'react'
import apiService from '../services/apiService.js'

const initialFeedback = {
  nome: '',
  email: '',
  mensagem: '',
}

function ApiDemo() {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [feedback, setFeedback] = useState(initialFeedback)
  const [feedbackStatus, setFeedbackStatus] = useState('')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const loadApiData = async () => {
      try {
        setLoading(true)
        const [apiUsers, apiPosts] = await Promise.all([
          apiService.getUsers(),
          apiService.getPosts(),
        ])

        setUsers(apiUsers)
        setPosts(apiPosts)
        setError('')
      } catch (apiError) {
        setError(apiError.message)
      } finally {
        setLoading(false)
      }
    }

    loadApiData()
  }, [])

  const handleFeedbackChange = (event) => {
    const { name, value } = event.target

    setFeedback((currentFeedback) => ({
      ...currentFeedback,
      [name]: value,
    }))
  }

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault()
    setFormError('')
    setFeedbackStatus('')

    if (!feedback.nome.trim() || !feedback.email.trim() || !feedback.mensagem.trim()) {
      setFormError('Preencha nome, e-mail e mensagem.')
      return
    }

    try {
      const response = await apiService.createFeedback(feedback)
      setFeedbackStatus(`Feedback enviado com sucesso. ID retornado: ${response.id}.`)
      setFeedback(initialFeedback)
    } catch (apiError) {
      setFormError(apiError.message)
    }
  }

  return (
    <section className="content-page api-page">
      <p className="eyebrow">API Demo</p>
      <h1>Consumo real de API HTTP</h1>
      <p>
        Esta página usa fetch para buscar usuários, carregar posts e enviar um
        feedback para a JSONPlaceholder.
      </p>

      {loading && <p className="alert alert--info">Carregando dados da API...</p>}
      {error && <p className="alert alert--error">{error}</p>}

      {!loading && !error && (
        <div className="api-grid">
          <article className="data-panel">
            <h2>Usuários da API</h2>
            <div className="compact-list">
              {users.slice(0, 5).map((user) => (
                <div key={user.id}>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="data-panel">
            <h2>Dicas carregadas da API</h2>
            <div className="compact-list">
              {posts.map((post) => (
                <div key={post.id}>
                  <strong>{post.title}</strong>
                  <span>{post.body.slice(0, 84)}...</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      )}

      <form className="app-form feedback-form" onSubmit={handleFeedbackSubmit} noValidate>
        <h2>Enviar feedback via POST</h2>
        {formError && <p className="alert alert--error">{formError}</p>}
        {feedbackStatus && <p className="alert alert--success">{feedbackStatus}</p>}

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="feedback-nome">Nome</label>
            <input
              id="feedback-nome"
              name="nome"
              type="text"
              value={feedback.nome}
              onChange={handleFeedbackChange}
              placeholder="Seu nome"
            />
          </div>

          <div className="form-field">
            <label htmlFor="feedback-email">E-mail</label>
            <input
              id="feedback-email"
              name="email"
              type="email"
              value={feedback.email}
              onChange={handleFeedbackChange}
              placeholder="seuemail@exemplo.com"
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="feedback-mensagem">Mensagem</label>
          <textarea
            id="feedback-mensagem"
            name="mensagem"
            value={feedback.mensagem}
            onChange={handleFeedbackChange}
            placeholder="Conte sua opinião sobre o jogo"
            rows="4"
          />
        </div>

        <button className="button button--primary" type="submit">
          Enviar feedback
        </button>
      </form>
    </section>
  )
}

export default ApiDemo
