import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import PrivateRoute from './components/PrivateRoute'
import Home from './pages/Home'
import About from './pages/About'
import Contacto from './pages/Contacto'
import Producto from './pages/Producto'
import Login from './pages/Login'
import Inventario from './pages/Inventario'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas */}
      <Route path="/" element={
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="inventario" element={<Inventario />} />
        <Route path="producto/:id" element={<Producto />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  )
}

export default App