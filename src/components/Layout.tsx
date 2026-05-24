import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Layout.css'

function Layout() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()

  const manejarLogout = () => {
    logout()
    navigate('/login')
  } 

  return (
    <>
      <nav className="navbar">
        <span className="nav-logo">Mi Negocio</span>
        <div className="nav-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Inicio
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Acerca de
          </NavLink>
          <NavLink to="/contacto" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Contacto
          </NavLink>
        </div>
       <div className="nav-usuario">
          <span>👤 {usuario?.nombre}</span>
          <button className="boton-logout" onClick={manejarLogout}>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>

      <footer className="footer">
        <p>Mi Negocio © 2025</p>
      </footer>
    </>
  )
}

export default Layout