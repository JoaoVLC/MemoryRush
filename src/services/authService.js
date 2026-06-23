const USERS_KEY = 'memoryRushUsers'
const CURRENT_USER_KEY = 'memoryRushCurrentUser'
const TOKEN_KEY = 'memoryRushToken'
const FAKE_TOKEN = 'fake-token-memory-rush'

const readUsers = () => {
  const storedUsers = localStorage.getItem(USERS_KEY)

  if (!storedUsers) {
    return []
  }

  try {
    const users = JSON.parse(storedUsers)
    return Array.isArray(users) ? users : []
  } catch {
    return []
  }
}

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

const createUserId = () => {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

const normalizeEmail = (email) => email.trim().toLowerCase()

const createSessionUser = (user) => ({
  id: user.id,
  nome: user.nome,
  email: user.email,
  avatar: user.avatar || '',
  token: FAKE_TOKEN,
})

const saveSession = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  localStorage.setItem(TOKEN_KEY, FAKE_TOKEN)
}

const validateAuthFields = ({ nome, email, senha }, requireName = false) => {
  const errors = {}

  if (requireName && !nome?.trim()) {
    errors.nome = 'Informe o nome.'
  }

  if (!email?.trim()) {
    errors.email = 'Informe o e-mail.'
  } else if (!email.includes('@')) {
    errors.email = 'Informe um e-mail válido.'
  }

  if (!senha?.trim()) {
    errors.senha = 'Informe a senha.'
  } else if (senha.length < 4) {
    errors.senha = 'A senha deve ter pelo menos 4 caracteres.'
  }

  return errors
}

export const registerUser = ({ nome, email, senha }) => {
  const errors = validateAuthFields({ nome, email, senha }, true)

  if (Object.keys(errors).length > 0) {
    throw { type: 'validation', errors }
  }

  const users = readUsers()
  const normalizedEmail = normalizeEmail(email)
  const emailAlreadyExists = users.some((user) => user.email === normalizedEmail)

  if (emailAlreadyExists) {
    throw {
      type: 'validation',
      errors: {
        email: 'Este e-mail já está cadastrado.',
      },
    }
  }

  const newUser = {
    id: createUserId(),
    nome: nome.trim(),
    email: normalizedEmail,
    // CHAVE segurança: em produção a senha deve ser hash no backend, nunca salva assim.
    senha,
    avatar: '',
    createdAt: new Date().toISOString(),
  }

  saveUsers([...users, newUser])

  const sessionUser = createSessionUser(newUser)
  saveSession(sessionUser)

  return sessionUser
}

export const loginUser = ({ email, senha }) => {
  const errors = validateAuthFields({ email, senha })

  if (Object.keys(errors).length > 0) {
    throw { type: 'validation', errors }
  }

  const normalizedEmail = normalizeEmail(email)
  const user = readUsers().find((currentUser) => {
    return currentUser.email === normalizedEmail && currentUser.senha === senha
  })

  if (!user) {
    throw {
      type: 'validation',
      errors: {
        general: 'E-mail ou senha inválidos.',
      },
    }
  }

  const sessionUser = createSessionUser(user)

  saveSession(sessionUser)

  return sessionUser
}

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY)
  localStorage.removeItem(TOKEN_KEY)
}

export const getCurrentUser = () => {
  const storedUser = localStorage.getItem(CURRENT_USER_KEY)

  if (!storedUser) {
    return null
  }

  try {
    const storedToken = localStorage.getItem(TOKEN_KEY)
    const user = JSON.parse(storedUser)

    if (!storedToken) {
      return null
    }

    return {
      ...user,
      token: storedToken,
    }
  } catch {
    return null
  }
}

export const isAuthenticated = () => {
  return Boolean(getCurrentUser())
}

export const updateProfileImage = (email, avatar) => {
  const normalizedEmail = normalizeEmail(email)
  const users = readUsers()
  const updatedUsers = users.map((user) => {
    if (user.email !== normalizedEmail) {
      return user
    }

    return {
      ...user,
      avatar,
    }
  })

  saveUsers(updatedUsers)

  const currentUser = getCurrentUser()

  if (currentUser?.email === normalizedEmail) {
    const updatedCurrentUser = {
      ...currentUser,
      avatar,
      token: localStorage.getItem(TOKEN_KEY) || FAKE_TOKEN,
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedCurrentUser))
    return updatedCurrentUser
  }

  return null
}

export default {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  isAuthenticated,
  updateProfileImage,
}

export { CURRENT_USER_KEY, FAKE_TOKEN, TOKEN_KEY, USERS_KEY }
