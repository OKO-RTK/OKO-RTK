import AuthBody from './pages/authorization/AuthBody'
import AuthFooter from './pages/authorization/AuthFooter'
import AuthHeader from './pages/authorization/AuthHeader'

import './App.css'
import TabsDemo from "./features/auth/auth"

function App() {

  return (
		<>
			<div className='flex flex-col border-2 border-red-500 w-screen'>
				<AuthHeader />
			</div>
			<div>
				<TabsDemo />
			</div>
			<AuthBody />
			<AuthFooter></AuthFooter>
		</>
	)
}

export default App