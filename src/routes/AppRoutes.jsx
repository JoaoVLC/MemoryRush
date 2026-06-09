import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import ApiDemo from '../pages/ApiDemo.jsx'
import Cadastro from '../pages/Cadastro.jsx'
import Defesa from '../pages/Defesa.jsx'
import Home from '../pages/Home.jsx'
import Instrucoes from '../pages/Instrucoes.jsx'
import Jogo from '../pages/Jogo.jsx'
import Login from '../pages/Login.jsx'
import Perfil from '../pages/Perfil.jsx'
import Ranking from '../pages/Ranking.jsx'
import Sobre from '../pages/Sobre.jsx'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* CHAVE React Router: define as páginas da SPA sem recarregar o site. */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/jogo"
            element={
              <ProtectedRoute>
                <Jogo />
              </ProtectedRoute>
            }
          />
          <Route path="/instrucoes" element={<Instrucoes />} />
          <Route
            path="/ranking"
            element={
              <ProtectedRoute>
                <Ranking />
              </ProtectedRoute>
            }
          />
          <Route path="/api-demo" element={<ApiDemo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            }
          />
          <Route path="/defesa" element={<Defesa />} />
          <Route path="/sobre" element={<Sobre />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
