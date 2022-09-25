import { sveltekit } from '@sveltejs/kit/vite'
import houdini from 'houdini/vite'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		houdini(),
		sveltekit()
	],

	ssr: {
		noExternal: [
			// /node_modules/.pnpm/echarts@5.3.2/node_modules/echarts/core.js:20
			// export * from './lib/export/core.js';
			// ^^^^^^
			// SyntaxError: Unexpected token 'export'
			'echarts',
		]
	},
}

export default config
