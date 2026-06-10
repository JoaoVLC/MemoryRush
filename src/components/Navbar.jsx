import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

function Navbar() {
  const { isLoggedIn, logout } = useAuth()
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
          {isLoggedIn ? (
            <>
              <NavLink to="/jogo">Jogo</NavLink>
              <NavLink to="/ranking">Ranking</NavLink>
              <NavLink to="/perfil">Perfil</NavLink>
              <NavLink to="/sobre">Sobre</NavLink>
              <button className="nav-button" type="button" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <NavLink to="/sobre">Sobre</NavLink>
              <NavLink to="/login">Login</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
