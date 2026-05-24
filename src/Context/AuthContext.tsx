import { createContext, useContext, useState, ReactNode } from 'react'

interface Usuario {
  nombre: string
  usuario: string
  rol: number
}

interface AuthContextType {
  usuario: Usuario | null
  login: (usuario: Usuario) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    // Al iniciar, intenta recuperar la sesión guardada
    const guardado = localStorage.getItem('usuario')
    return guardado ? JSON.parse(guardado) : null
  })

  const login = (datos: Usuario) => {
    localStorage.setItem('usuario', JSON.stringify(datos))
    setUsuario(datos)
  }

  const logout = () => {
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return context
}