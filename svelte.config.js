import preprocess from 'svelte-preprocess'
import adapterStatic from '@sveltejs/adapter-static'


import houdini from 'houdini-preprocess'
import path from 'path'


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess(),
		houdini()
	],

	kit: {
		// hydrate the <div id='svelte'> element in src/app.html
		target: '#svelte',

		adapter: adapterStatic({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		}),

		vite: {
			ssr: {
				noExternal: [
					// /node_modules/.pnpm/echarts@5.1.2/node_modules/echarts/core.js:20
					// export * from './lib/export/core';
					// ^^^^^^
					// SyntaxError: Unexpected token 'export'
					'echarts',
				]
			},

			resolve: {
				alias: {
					'process': 'process/browser',
					'$houdini': path.resolve('.', '$houdini')
				}
			},

			// The request url "$houdini/index.js" is outside of Vite serving allow list.
			server: {
				fs: {
					allow: [
						'..'
					],
				}
			}
		},
	}
};

export default config;
