import { useEffect, useState } from 'react'
import InfoBox from '../components/InfoBox.jsx'
import Saudacao from '../components/Saudacao.jsx'
import validationService from '../services/validationService.js'

function Defesa() {
  const [codigoTeste, setCodigoTeste] = useState('')
  const [codigoErro, setCodigoErro] = useState('')
  const [temaEscuro, setTemaEscuro] = useState(false)
  const [estaLogado, setEstaLogado] = useState(false)
  const [conteudoVisivel, setConteudoVisivel] = useState(false)
  const [mostrarAjuda, setMostrarAjuda] = useState(false)

  useEffect(() => {
    console.log('O componente foi montado na tela!')
  }, [])

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
    <section className={`content-page defense-page ${temaEscuro ? 'defense-page--dark' : ''}`}>
      <p className="eyebrow">Defesa</p>
      <h1>Demonstração de autoria</h1>
      <p>
        Esta página foi criada para demonstrar domínio técnico e treinar possíveis
        solicitações feitas durante a defesa do projeto.
      </p>

      <div className="info-grid">
        <InfoBox
          titulo="Componente reutilizado"
          descricao="InfoBox recebe titulo e descricao por props e pode aparecer várias vezes."
        />
        <InfoBox
          titulo="Service de validação"
          descricao="validationService centraliza a regra do campo obrigatório."
        />
      </div>

      <div className="defense-panel">
        <h2>Input validado por service</h2>
        <div className="form-field">
          <label htmlFor="codigo-teste">Código de teste</label>
          <input
            id="codigo-teste"
            type="text"
            value={codigoTeste}
            onChange={(event) => setCodigoTeste(event.target.value)}
            placeholder="Digite qualquer texto"
          />
          {codigoErro && <span className="form-error">{codigoErro}</span>}
        </div>
        <button className="button button--primary" type="button" onClick={handleValidateCode}>
          Validar código
        </button>
      </div>

      <div className="defense-panel">
        <h2>Estados para auditoria</h2>
        <div className="button-row">
          <button className="button button--secondary" type="button" onClick={handleToggleTheme}>
            Alternar Tema
          </button>
          <button
            className="button button--secondary"
            type="button"
            onClick={() => setEstaLogado((currentState) => !currentState)}
          >
            Alternar Login
          </button>
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

        <p className="inline-feedback">
          {estaLogado ? 'Bem-vindo(a), Usuário(a)!' : 'Por favor, faça login'}
        </p>

        {conteudoVisivel && (
          <p className="alert alert--info">Conteúdo extra exibido por estado booleano.</p>
        )}

        {mostrarAjuda && (
          <p className="alert alert--success">Dica: preencha todos os campos corretamente!</p>
        )}

        <Saudacao nome="Jogador(a)" />
        <Saudacao />
      </div>
    </section>
  )
}

export default Defesa
