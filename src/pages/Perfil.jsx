import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'
import rankingService from '../services/rankingService.js'

function Perfil() {
  const { currentUser, logout, updateAvatar } = useAuth()
  const [imageError, setImageError] = useState('')
  const [imageSuccess, setImageSuccess] = useState('')
  const navigate = useNavigate()

  const bestScore = useMemo(() => {
    if (!currentUser?.email) {
      return null
    }

    return rankingService.getBestScoreByEmail(currentUser.email)
  }, [currentUser])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    setImageError('')
    setImageSuccess('')

    if (!file) {
      return
    }

    if (!file.type.startsWith('image/')) {
      setImageError('Selecione apenas arquivos de imagem.')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      updateAvatar(reader.result)
      setImageSuccess('Imagem de perfil atualizada.')
    }

    reader.onerror = () => {
      setImageError('Não foi possível carregar a imagem.')
    }

    reader.readAsDataURL(file)
  }

  return (
    <section className="content-page profile-page">
      <p className="eyebrow">Perfil</p>
      <h1>Área do jogador</h1>
      <p>Perfil protegido com autenticação simulada e dados salvos localmente.</p>

      <div className="profile-grid">
        <article className="profile-card">
          <div className="avatar-preview">
            {currentUser?.avatar ? (
              <img src={currentUser.avatar} alt={`Foto de ${currentUser.nome}`} />
            ) : (
              <span>{currentUser?.nome?.charAt(0) || 'M'}</span>
            )}
          </div>

          <h2>{currentUser?.nome}</h2>
          <p>{currentUser?.email}</p>

          <div className="form-field">
            <label htmlFor="avatar">Imagem de perfil</label>
            <input id="avatar" type="file" accept="image/*" onChange={handleImageChange} />
            {imageError && <span className="form-error">{imageError}</span>}
            {imageSuccess && <span className="form-success">{imageSuccess}</span>}
          </div>

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
    </section>
  )
}

export default Perfil
