import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contacto from './pages/contacto'
import Producto from './pages/Producto' 
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contacto" element={<Contacto />} />
        <Route path="producto/:id" element={<Producto />} />
      </Route>
    </Routes>
  )
}

export default App