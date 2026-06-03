const STORAGE_KEY = 'memoryRushRanking'

const readRanking = () => {
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

export const saveScore = ({ nome, pontos, dificuldade }) => {
  const newScore = {
    id: createScoreId(),
    nome,
    pontos,
    dificuldade,
    data: new Date().toISOString(),
  }

  const updatedRanking = sortScores([...readRanking(), newScore])
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRanking))

  return newScore
}

export const clearScores = () => {
  localStorage.removeItem(STORAGE_KEY)
}

export default {
  getScores,
  saveScore,
  clearScores,
}
