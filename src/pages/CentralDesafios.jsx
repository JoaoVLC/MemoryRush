import { useEffect, useState } from 'react'
import apiService from '../services/apiService.js'

const initialChallenge = {
  nome: '',
  email: '',
  mensagem: '',
}

function CentralDesafios() {
  const [players, setPlayers] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [challenge, setChallenge] = useState(initialChallenge)
  const [challengeStatus, setChallengeStatus] = useState('')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    const loadCommunityData = async () => {
      try {
        setLoading(true)
        const [apiUsers, apiPosts] = await Promise.all([
          apiService.getUsers(),
          apiService.getPosts(),
        ])

        setPlayers(apiUsers)
        setEvents(apiPosts)
        setError('')
      } catch (apiError) {
        setError(apiError.message)
      } finally {
        setLoading(false)
      }
    }

    loadCommunityData()
  }, [])

  const handleChallengeChange = (event) => {
    const { name, value } = event.target

    setChallenge((currentChallenge) => ({
      ...currentChallenge,
      [name]: value,
    }))
  }

  const handleChallengeSubmit = async (event) => {
    event.preventDefault()
    setFormError('')
    setChallengeStatus('')

    if (!challenge.nome.trim() || !challenge.email.trim() || !challenge.mensagem.trim()) {
      setFormError('Preencha nome, e-mail e sugestão de desafio.')
      return
    }

    try {
      const response = await apiService.createFeedback(challenge)
      setChallengeStatus(`Desafio enviado para a comunidade. Protocolo: ${response.id}.`)
      setChallenge(initialChallenge)
    } catch (apiError) {
      setFormError(apiError.message)
    }
  }

  return (
    <section className="content-page community-page">
      <p className="eyebrow">Central de Desafios</p>
      <h1>Novidades da comunidade Memory Rush</h1>
      <p>
        Acompanhe jogadores, eventos e sugestões de desafios carregados por uma
        integração HTTP real com fetch.
      </p>

      {loading && <p className="alert alert--info">Carregando novidades da comunidade...</p>}
      {error && <p className="alert alert--error">{error}</p>}

      {!loading && !error && (
        <div className="api-grid">
          <article className="data-panel">
            <h2>Jogadores em destaque</h2>
            <div className="compact-list">
              {players.slice(0, 5).map((player) => (
                <div key={player.id}>
                  <strong>{player.name}</strong>
                  <span>{player.email}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="data-panel">
            <h2>Eventos e dicas</h2>
            <div className="compact-list">
              {events.map((event) => (
                <div key={event.id}>
                  <strong>{event.title}</strong>
                  <span>{event.body.slice(0, 84)}...</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      )}

      <form className="app-form feedback-form" onSubmit={handleChallengeSubmit} noValidate>
        <h2>Sugerir desafio para a comunidade</h2>
        {formError && <p className="alert alert--error">{formError}</p>}
        {challengeStatus && <p className="alert alert--success">{challengeStatus}</p>}

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="challenge-nome">Nome</label>
            <input
              id="challenge-nome"
              name="nome"
              type="text"
              value={challenge.nome}
              onChange={handleChallengeChange}
              placeholder="Seu nome"
            />
          </div>

          <div className="form-field">
            <label htmlFor="challenge-email">E-mail</label>
            <input
              id="challenge-email"
              name="email"
              type="email"
              value={challenge.email}
              onChange={handleChallengeChange}
              placeholder="seuemail@exemplo.com"
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="challenge-mensagem">Sugestão</label>
          <textarea
            id="challenge-mensagem"
            name="mensagem"
            value={challenge.mensagem}
            onChange={handleChallengeChange}
            placeholder="Crie uma ideia de desafio para outros jogadores"
            rows="4"
          />
        </div>

        <button className="button button--primary" type="submit">
          Enviar desafio
        </button>
      </form>
    </section>
  )
}

export default CentralDesafios
