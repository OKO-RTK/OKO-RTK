import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
	server: {
		host: '0.0.0.0', // Слушать на всех интерфейсах
		port: 5173, // Порт, на котором будет работать сервер
	},
	build: {
		outDir: 'dist', // Папка, куда будет выводиться сборка
	},
})
