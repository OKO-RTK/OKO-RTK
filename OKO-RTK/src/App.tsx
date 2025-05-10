import AuthFull from './pages/authorization/AuthFull'
import Sidebar from './components/sidebar/Sidebar'
import Dashboard from './pages/dashboard/Dashboard'
import DevicesMap from './pages/map/DevicesMap'
import Devices from './pages/devices/Devices'
import Settings from './pages/settings/Settings'
import './App.css'
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from 'react-router-dom'

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
		/* 		<div className='w-screen h-full overflow-x-hidden bg-[#F4F4F5]'>
			<AuthFull />
		</div> */
		<Routes>
			<Route path='/auth' element={<AuthFull />}></Route>
			<Route path='/' element={<Dashboard />}></Route>
			<Route path='/devices_map' element={<DevicesMap />}></Route>
			<Route path='/devices' element={<Devices />}></Route>
			<Route path='/settings' element={<Settings />}></Route>
		</Routes>
	)
}

export default App
