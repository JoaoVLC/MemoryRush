const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

const requestJson = async (endpoint, options = {}) => {
  try {
    // CHAVE fetch: faz requisição HTTP real para a API externa JSONPlaceholder.
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options)

    if (!response.ok) {
      throw new Error('Não foi possível carregar os dados da API.')
    }

    return await response.json()
  } catch (error) {
    throw new Error(error.message || 'Erro ao conectar com a API.')
  }
}

export const getUsers = async () => {
  return requestJson('/users')
}

export const getPosts = async () => {
  const posts = await requestJson('/posts')
  return posts.slice(0, 6)
}

export const createFeedback = async (feedback) => {
  return requestJson('/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title: `Feedback de ${feedback.nome}`,
      body: feedback.mensagem,
      email: feedback.email,
      userId: 1,
    }),
  })
}

export default {
  getUsers,
  getPosts,
  createFeedback,
}
