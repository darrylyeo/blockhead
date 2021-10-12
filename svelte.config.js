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


			// Directory import '/opt/build/repo/node_modules/@apollo/client/core' is not supported resolving ES modules imported from /opt/build/repo/.svelte-kit/output/server/app.js
			// Did you mean to import @apollo/client/core/core.cjs.js?
			// https://github.com/timhall/svelte-apollo/issues/97#issuecomment-857397762
			optimizeDeps: {
				include: [
					"@apollo/client/core",
					"@apollo/client/cache",
					"@apollo/client/link/ws",
					"@apollo/client/link/context",
					"@apollo/client/link/error",
					"@apollo/client/utilities",
				],
				exclude: ["@apollo/client", "svelte-apollo"],
			},

			resolve: {
				alias: {
					'process': 'process/browser',
					'$houdini': path.resolve('.', '$houdini')
				}
			}
		},
	}
};

export default config;
