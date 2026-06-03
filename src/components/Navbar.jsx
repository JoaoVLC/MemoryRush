import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        <NavLink to="/" className="logo" aria-label="Ir para a pagina inicial">
          Memory<span>Rush</span>
        </NavLink>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/jogo">Jogo</NavLink>
          <NavLink to="/instrucoes">Instruções</NavLink>
          <NavLink to="/ranking">Ranking</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
