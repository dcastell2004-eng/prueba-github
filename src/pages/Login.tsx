import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import '../styles/Login.css'

// Usuarios simulados (después esto vendrá del backend)
const usuariosSimulados = [
  { usuario: 'admin', contrasena: '1234', nombre: 'Administrador', rol: 1 },
  { usuario: 'bodega', contrasena: '1234', nombre: 'Bodeguero', rol: 2 },
]

function Login() {
  const [usuario, setUsuario] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const manejarLogin = () => {
    const encontrado = usuariosSimulados.find(
      (u) => u.usuario === usuario && u.contrasena === contrasena
    )

    if (encontrado) {
      login({ nombre: encontrado.nombre, usuario: encontrado.usuario, rol: encontrado.rol })
      navigate('/')
    } else {
      setError('Usuario o contraseña incorrectos')
    }
  }

  return (
    <div className="login-fondo">
      <div className="login-caja">
        <h1 className="login-titulo">Soluciones Integrales</h1>
        <p className="login-subtitulo">Control de Inventario</p>

        <div className="login-campo">
          <label>Usuario</label>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Ingresa tu usuario"
          />
        </div>

        <div className="login-campo">
          <label>Contraseña</label>
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Ingresa tu contraseña"
          />
        </div>

        {error && <p className="login-error">{error}</p>}

        <button className="login-boton" onClick={manejarLogin}>
          Ingresar
        </button>
      </div>
    </div>
  )
}

export default Login