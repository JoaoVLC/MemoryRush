import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import Home from '../pages/Home.jsx'
import Instrucoes from '../pages/Instrucoes.jsx'
import Jogo from '../pages/Jogo.jsx'
import Sobre from '../pages/Sobre.jsx'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/jogo" element={<Jogo />} />
          <Route path="/instrucoes" element={<Instrucoes />} />
          <Route path="/sobre" element={<Sobre />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
//define as páginas
