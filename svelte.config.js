import preprocess from 'svelte-preprocess'

import adapterAuto from '@sveltejs/adapter-auto'
import adapterStatic from '@sveltejs/adapter-static'

const isStatic = !!process.env.SVELTE_BUILD_STATIC

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter:
			isStatic
				? adapterStatic({
					fallback: 'index.html',
					// precompress: true,
				})
				: adapterAuto(),

		trailingSlash: isStatic ? 'always' : 'never',

		alias: {
			$houdini: './$houdini',
		},
	}
};

export default config;
