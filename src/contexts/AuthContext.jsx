import { createContext, useContext, useMemo, useState } from 'react'
import authService from '../services/authService.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // CHAVE AuthContext: guarda o usuário logado para qualquer página acessar.
  const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser())

  const register = (userData) => {
    const user = authService.registerUser(userData)
    setCurrentUser(user)
    localStorage.setItem('memoryRushCurrentUser', JSON.stringify(user))
    return user
  }

  const login = (credentials) => {
    const user = authService.loginUser(credentials)
    setCurrentUser(user)
    return user
  }

  const logout = () => {
    authService.logoutUser()
    setCurrentUser(null)
  }

  const updateAvatar = (avatar) => {
    if (!currentUser) {
      return null
    }

    const updatedUser = authService.updateProfileImage(currentUser.email, avatar)
    setCurrentUser(updatedUser)
    return updatedUser
  }

  const value = useMemo(
    () => ({
      currentUser,
      login,
      register,
      logout,
      updateAvatar,
      isLoggedIn: Boolean(currentUser),
    }),
    [currentUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  // CHAVE useContext: permite ler login, logout e usuário logado nos componentes.
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.')
  }

  return context
}
