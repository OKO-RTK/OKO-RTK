import AuthFull from './pages/authorization/AuthFull'
import Sidebar from './components/sidebar/Sidebar'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { PublicRoute } from '@/components/PublicRoute'
import Dashboard from './pages/dashboard/Dashboard'
import DevicesMap from './pages/map/DevicesMap'
import Settings from './pages/settings/Settings'
import './App.css'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom'
import DevicesAndGroups from './pages/devices/DevicesAndGroups'

const App: React.FC = () => {
	return (
		<Router>
			<MainContent />
		</Router>
	)
}
const MainContent: React.FC = () => {
	const location = useLocation()

	return (
		<Routes>
			<Route
				path='/auth'
				element={
					<PublicRoute>
						<AuthFull />
					</PublicRoute>
				}
			/>
			<Route
				path='/'
				element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/devices_map'
				element={
					<ProtectedRoute>
						<DevicesMap />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/devices'
				element={
					<ProtectedRoute>
						<DevicesAndGroups />
					</ProtectedRoute>
				}
			/>
			<Route
				path='/settings'
				element={
					<ProtectedRoute>
						<Settings />
					</ProtectedRoute>
				}
			/>
		</Routes>
	)
}

export default App
