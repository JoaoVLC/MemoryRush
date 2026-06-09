import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

const initialFormData = {
  email: '',
  senha: '',
}

function Login() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setErrors({})

    try {
      login(formData)
      navigate(location.state?.from || '/perfil')
    } catch (error) {
      setErrors(error.errors || { general: 'Não foi possível entrar.' })
    }
  }

  return (
    <section className="content-page auth-page">
      <p className="eyebrow">Login</p>
      <h1>Entrar no Memory Rush</h1>
      <p>Entre para jogar, salvar sua pontuação e acessar seu perfil.</p>

      <form className="app-form" onSubmit={handleSubmit} noValidate>
        {errors.general && <p className="alert alert--error">{errors.general}</p>}

        <div className="form-field">
          <label htmlFor="login-email">E-mail</label>
          <input
            id="login-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seuemail@exemplo.com"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="login-senha">Senha</label>
          <input
            id="login-senha"
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
          />
          {errors.senha && <span className="form-error">{errors.senha}</span>}
        </div>

        <button className="button button--primary" type="submit">
          Entrar
        </button>
      </form>

      <p className="auth-switch">
        Ainda não tem conta? <Link to="/cadastro">Criar cadastro</Link>
      </p>
    </section>
  )
}

export default Login
