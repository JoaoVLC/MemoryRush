// CHAVE service: centraliza as regras do ranking fora das páginas React.
const STORAGE_KEY = 'memoryRushRanking'

const readRanking = () => {
  // CHAVE localStorage: busca o ranking salvo no navegador.
  const storedRanking = localStorage.getItem(STORAGE_KEY)

  if (!storedRanking) {
    return []
  }

  try {
    const parsedRanking = JSON.parse(storedRanking)
    return Array.isArray(parsedRanking) ? parsedRanking : []
  } catch {
    return []
  }
}

const sortScores = (scores) => {
  return [...scores].sort((firstScore, secondScore) => {
    return secondScore.pontos - firstScore.pontos
  })
}

const createScoreId = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export const getScores = () => {
  return sortScores(readRanking())
}

export const getBestScoreByEmail = (email) => {
  if (!email) {
    return null
  }

  const normalizedEmail = email.trim().toLowerCase()
  return getScores().find((score) => score.email === normalizedEmail) || null
}

export const saveScore = ({ nome, email = '', pontos, dificuldade }) => {
  // CHAVE ranking: cria uma nova pontuação com nome, pontos, dificuldade e data.
  const newScore = {
    id: createScoreId(),
    nome,
    email: email.trim().toLowerCase(),
    pontos,
    dificuldade,
    data: new Date().toISOString(),
  }

  const updatedRanking = sortScores([...readRanking(), newScore])
  // CHAVE localStorage: salva o ranking atualizado no navegador.
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRanking))

  return newScore
}

export const clearScores = () => {
  // CHAVE localStorage: remove todas as pontuações salvas.
  localStorage.removeItem(STORAGE_KEY)
}

export default {
  getScores,
  getBestScoreByEmail,
  saveScore,
  clearScores,
}
