import { useEffect } from 'react'

function Saudacao({ nome }) {
  useEffect(() => {
    if (!nome) {
      console.warn('Componente Saudacao recebeu nome vazio.')
    }
  }, [nome])

  return <p className="inline-feedback">Olá, {nome || 'visitante'}!</p>
}

export default Saudacao
