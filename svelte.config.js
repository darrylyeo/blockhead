// import adapter from '@sveltejs/adapter-auto';
import adapterStatic from '@sveltejs/adapter-static'
import preprocess from 'svelte-preprocess';


// Houdini
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
		// adapter: adapter(),
		adapter: adapterStatic(/*{
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		}*/),

        vite: {
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
	}
};

export default config;
