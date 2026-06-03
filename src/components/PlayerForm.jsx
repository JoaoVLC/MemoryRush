import { useState } from 'react'

const initialFormData = {
  nome: '',
  dificuldade: '',
}

function PlayerForm({ onSubmit }) {
  const [formData, setFormData] = useState(initialFormData)
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const nextErrors = {}
    const trimmedName = formData.nome.trim()

    if (!trimmedName) {
      nextErrors.nome = 'Informe o nome do jogador.'
    } else if (trimmedName.length < 2) {
      nextErrors.nome = 'O nome deve ter pelo menos 2 caracteres.'
    }

    if (!formData.dificuldade) {
      nextErrors.dificuldade = 'Selecione uma dificuldade.'
    }

    return nextErrors
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = validateForm()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    onSubmit({
      nome: formData.nome.trim(),
      dificuldade: formData.dificuldade,
    })
  }

  return (
    <form className="player-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label htmlFor="nome">Nome do jogador</label>
        <input
          id="nome"
          name="nome"
          type="text"
          value={formData.nome}
          onChange={handleChange}
          placeholder="Digite seu nome"
          aria-describedby={errors.nome ? 'nome-error' : undefined}
        />
        {errors.nome && (
          <span className="form-error" id="nome-error">
            {errors.nome}
          </span>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="dificuldade">Dificuldade</label>
        <select
          id="dificuldade"
          name="dificuldade"
          value={formData.dificuldade}
          onChange={handleChange}
          aria-describedby={errors.dificuldade ? 'dificuldade-error' : undefined}
        >
          <option value="">Selecione</option>
          <option value="facil">Fácil</option>
          <option value="medio">Médio</option>
          <option value="dificil">Difícil</option>
        </select>
        {errors.dificuldade && (
          <span className="form-error" id="dificuldade-error">
            {errors.dificuldade}
          </span>
        )}
      </div>

      <button className="button button--primary" type="submit">
        Salvar e iniciar
      </button>
    </form>
  )
}

export default PlayerForm
