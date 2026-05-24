import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ReactElement } from 'react'

function PrivateRoute({ children }: { children: ReactElement }) {
  const { usuario } = useAuth()
  return usuario ? children : <Navigate to="/login" replace />
}

export default PrivateRoute