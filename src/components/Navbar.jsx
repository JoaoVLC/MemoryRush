import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        <NavLink to="/" className="logo" aria-label="Ir para a pagina inicial">
          HQ<span>Mania</span>
        </NavLink>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/catalogo">Catalogo</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
          <NavLink to="/contato">Contato</NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
