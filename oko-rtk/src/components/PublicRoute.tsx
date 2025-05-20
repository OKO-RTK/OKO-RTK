import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useAuth()
	return isAuthenticated ? <Navigate to='/' replace /> : <>{children}</>
}
