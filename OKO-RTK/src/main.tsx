import { Provider } from '@/components/ui/provider'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider>
			<App />
		</Provider>
	</React.StrictMode>
)
