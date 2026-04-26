import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'

function Layout() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>HQMania - Biblioteca digital de HQs</p>
      </footer>
    </div>
  )
}

export default Layout
