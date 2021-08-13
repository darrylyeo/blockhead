import preprocess from 'svelte-preprocess'
import adapterStatic from '@sveltejs/adapter-static'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		// hydrate the <div id='svelte'> element in src/app.html
		target: '#svelte',

		adapter: adapterStatic({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		ssr: false,

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
					process: 'process/browser',
				}
			}
		},
	}
};

export default config;
