import AuthFull from './pages/authorization/AuthFull'

import './App.css'
import TabsDemo from "./features/auth/auth"

function App() {

  return (
		<>
			<div className='flex flex-col border-2 border-red-500 w-screen'>
				<AuthFull/>
			</div>
		</>
	)
}

export default App