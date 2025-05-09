// tailwind.config.ts
import { type Config } from 'tailwindcss'

const config: Config = {
	content: [
		'./index.html',
		'./src/**/*.{js,ts,jsx,tsx}',
		// при использовании shadcn/ui:
		'./src/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		fontFamily: {
			rtk: ['RostelecomBasis', 'sans-serif'],
		},
		extend: {},
	},
	plugins: [],
}

export default config
