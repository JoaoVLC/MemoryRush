import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

function Navbar() {
  const { currentUser, isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className="header">
      <nav className="navbar">
        <NavLink to="/" className="logo" aria-label="Ir para a pagina inicial">
          Memory<span>Rush</span>
        </NavLink>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/jogo">Jogo</NavLink>
          <NavLink to="/ranking">Ranking</NavLink>
          <NavLink to="/api-demo">API Demo</NavLink>
          <NavLink to="/perfil">Perfil</NavLink>
          <NavLink to="/defesa">Defesa</NavLink>
          <NavLink to="/instrucoes">Instruções</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
          {isLoggedIn ? (
            <>
              <span className="nav-user">Olá, {currentUser.nome}</span>
              <button className="nav-button" type="button" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/cadastro">Cadastro</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
