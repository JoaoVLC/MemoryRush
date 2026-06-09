import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'

const initialFormData = {
  nome: '',
  email: '',
  senha: '',
}

function Cadastro() {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})
  const { register } = useAuth()
  const navigate = useNavigate()

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
      register(formData)
      navigate('/perfil')
    } catch (error) {
      setErrors(error.errors || { general: 'Não foi possível criar o cadastro.' })
    }
  }

  return (
    <section className="content-page auth-page">
      <p className="eyebrow">Cadastro</p>
      <h1>Criar conta</h1>
      <p>Crie uma conta local para proteger o jogo, ranking e perfil.</p>

      <form className="app-form" onSubmit={handleSubmit} noValidate>
        {errors.general && <p className="alert alert--error">{errors.general}</p>}

        <div className="form-field">
          <label htmlFor="cadastro-nome">Nome</label>
          <input
            id="cadastro-nome"
            name="nome"
            type="text"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Seu nome"
          />
          {errors.nome && <span className="form-error">{errors.nome}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="cadastro-email">E-mail</label>
          <input
            id="cadastro-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="seuemail@exemplo.com"
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="cadastro-senha">Senha</label>
          <input
            id="cadastro-senha"
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
            placeholder="Mínimo de 4 caracteres"
          />
          {errors.senha && <span className="form-error">{errors.senha}</span>}
        </div>

        <button className="button button--primary" type="submit">
          Cadastrar
        </button>
      </form>

      <p className="auth-switch">
        Já tem conta? <Link to="/login">Entrar</Link>
      </p>
    </section>
  )
}

export default Cadastro
