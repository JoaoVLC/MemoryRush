import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import InfoBox from '../components/InfoBox.jsx'
import Saudacao from '../components/Saudacao.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import rankingService from '../services/rankingService.js'
import validationService from '../services/validationService.js'

function Perfil() {
  const { currentUser, logout, updateAvatar } = useAuth()
  const [imageError, setImageError] = useState('')
  const [imageSuccess, setImageSuccess] = useState('')
  const [pendingAvatar, setPendingAvatar] = useState('')
  const [pendingAvatarName, setPendingAvatarName] = useState('')
  const [codigoTeste, setCodigoTeste] = useState('')
  const [codigoErro, setCodigoErro] = useState('')
  const [temaEscuro, setTemaEscuro] = useState(false)
  const [estaLogado, setEstaLogado] = useState(true)
  const [conteudoVisivel, setConteudoVisivel] = useState(false)
  const [mostrarAjuda, setMostrarAjuda] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    console.log('O perfil do jogador foi carregado!')
  }, [])

  const userScores = useMemo(() => {
    if (!currentUser?.email) {
      return []
    }

    return rankingService.getScores().filter((score) => score.email === currentUser.email)
  }, [currentUser])

  const bestScore = userScores[0] || null
  const totalPoints = userScores.reduce((total, score) => total + score.pontos, 0)
  const averageScore = userScores.length > 0 ? Math.round(totalPoints / userScores.length) : 0
  const avatarPreview = pendingAvatar || currentUser?.avatar

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    setImageError('')
    setImageSuccess('')

    if (!file) {
      setPendingAvatar('')
      setPendingAvatarName('')
      return
    }

    if (!file.type.startsWith('image/')) {
      setImageError('Selecione apenas arquivos de imagem.')
      setPendingAvatar('')
      setPendingAvatarName('')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setPendingAvatar(reader.result)
      setPendingAvatarName(file.name)
    }

    reader.onerror = () => {
      setImageError('Não foi possível carregar a imagem.')
    }

    reader.readAsDataURL(file)
  }

  const handleSaveImage = (event) => {
    event.preventDefault()
    setImageError('')
    setImageSuccess('')

    if (!pendingAvatar) {
      setImageError('Selecione uma imagem antes de salvar.')
      return
    }

    updateAvatar(pendingAvatar)
    setPendingAvatar('')
    setPendingAvatarName('')
    setImageSuccess('Imagem de perfil salva com sucesso.')
  }

  const handleValidateCode = () => {
    const error = validationService.validateRequiredText(codigoTeste)
    setCodigoErro(error)
  }

  const handleToggleTheme = () => {
    setTemaEscuro((currentTheme) => {
      const nextTheme = !currentTheme
      console.log(`O tema atual é: ${nextTheme ? 'Escuro' : 'Claro'}`)
      return nextTheme
    })
  }

  return (
    <section className={`content-page profile-page ${temaEscuro ? 'profile-page--dark' : ''}`}>
      <p className="eyebrow">Perfil</p>
      <h1>Área do jogador</h1>
      <p>Gerencie seus dados, acompanhe sua evolução e ajuste recursos do Memory Rush.</p>

      <div className="profile-grid">
        <article className="profile-card">
          <h2>Dados do usuário</h2>
          <div className="avatar-preview">
            {avatarPreview ? (
              <img src={avatarPreview} alt={`Foto de ${currentUser.nome}`} />
            ) : (
              <span>{currentUser?.nome?.charAt(0) || 'M'}</span>
            )}
          </div>

          <Saudacao nome={currentUser?.nome} />
          <p>{currentUser?.email}</p>
          {currentUser?.token && <p className="token-preview">Token: {currentUser.token}</p>}

          <form className="avatar-form" onSubmit={handleSaveImage}>
            <div className="form-field">
              <label htmlFor="avatar">Imagem de perfil</label>
              <input id="avatar" type="file" accept="image/*" onChange={handleImageChange} />
              {pendingAvatarName && (
                <span className="form-success">Arquivo selecionado: {pendingAvatarName}</span>
              )}
            </div>
            {imageError && <span className="form-error">{imageError}</span>}
            {imageSuccess && <span className="form-success">{imageSuccess}</span>}

            <button className="button button--secondary" type="submit" disabled={!pendingAvatar}>
              Salvar imagem
            </button>
          </form>

          <button className="button button--danger" type="button" onClick={handleLogout}>
            Sair
          </button>
        </article>

        <article className="profile-card">
          <h2>Melhor pontuação</h2>
          {bestScore ? (
            <>
              <strong className="best-score">{bestScore.pontos} pts</strong>
              <p>Dificuldade: {bestScore.dificuldade}</p>
              <p>Jogador: {bestScore.nome}</p>
            </>
          ) : (
            <p>Você ainda não possui pontuação salva no ranking.</p>
          )}
        </article>
      </div>

      <div className="profile-grid">
        <article className="profile-card">
          <h2>Estatísticas</h2>
          <div className="stats-grid">
            <div>
              <strong>{userScores.length}</strong>
              <span>partidas salvas</span>
            </div>
            <div>
              <strong>{totalPoints}</strong>
              <span>pontos no total</span>
            </div>
            <div>
              <strong>{averageScore}</strong>
              <span>média de pontos</span>
            </div>
          </div>
        </article>

        <article className="profile-card">
          <h2>Configurações</h2>
          <p className="inline-feedback">
            {estaLogado ? 'Bem-vindo(a), Usuário(a)!' : 'Por favor, faça login'}
          </p>
          <div className="button-row">
            <button className="button button--secondary" type="button" onClick={handleToggleTheme}>
              Alternar Tema
            </button>
            <button
              className="button button--secondary"
              type="button"
              onClick={() => setEstaLogado((currentState) => !currentState)}
            >
              Alternar status
            </button>
          </div>
        </article>
      </div>

      <article className="profile-card tools-card">
        <h2>Ferramentas</h2>
        <p>
          Recursos rápidos para explorar dicas, validar informações e ajustar a experiência do jogo.
        </p>

        <div className="info-grid">
          <InfoBox
            titulo="Central de Desafios"
            descricao="Acesse novidades, eventos e sugestões da comunidade Memory Rush."
          />
          <InfoBox
            titulo="Validação rápida"
            descricao="Use o campo abaixo para testar uma informação antes de salvar."
          />
        </div>

        <div className="button-row">
          <Link className="button button--primary" to="/central-de-desafios">
            Abrir Central de Desafios
          </Link>
          <button
            className="button button--secondary"
            type="button"
            onClick={() => setConteudoVisivel((currentState) => !currentState)}
          >
            {conteudoVisivel ? 'Esconder Conteúdo' : 'Mostrar Conteúdo'}
          </button>
          <button
            className="button button--secondary"
            type="button"
            onClick={() => setMostrarAjuda((currentState) => !currentState)}
          >
            Ajuda
          </button>
        </div>

        {conteudoVisivel && (
          <p className="alert alert--info">
            Conteúdo extra: use as ferramentas para treinar sua memória e acompanhar novidades.
          </p>
        )}

        {mostrarAjuda && (
          <p className="alert alert--success">Dica: preencha todos os campos corretamente!</p>
        )}

        <div className="form-field">
          <label htmlFor="codigo-teste">Código de teste</label>
          <input
            id="codigo-teste"
            type="text"
            value={codigoTeste}
            onChange={(event) => setCodigoTeste(event.target.value)}
            placeholder="Digite uma anotação ou código rápido"
          />
          {codigoErro && <span className="form-error">{codigoErro}</span>}
        </div>

        <button className="button button--primary" type="button" onClick={handleValidateCode}>
          Validar código
        </button>
      </article>
    </section>
  )
}

export default Perfil
