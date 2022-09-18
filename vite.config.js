import { sveltekit } from '@sveltejs/kit/vite'
import path from 'path'

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],

	ssr: {
		noExternal: [
			// /node_modules/.pnpm/echarts@5.3.2/node_modules/echarts/core.js:20
			// export * from './lib/export/core.js';
			// ^^^^^^
			// SyntaxError: Unexpected token 'export'
			'echarts',
		]
	},

	resolve: {
		// Houdini
		alias: {
			'$houdini': path.resolve('.', '$houdini')
		}
	},

	server: {
		// Houdini
		fs: {
			allow: ['.']
		}
	}
}

export default config
