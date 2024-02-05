import preprocess from 'svelte-preprocess'

import adapterAuto from '@sveltejs/adapter-auto'
import adapterStatic from '@sveltejs/adapter-static'
import adapterNetlify from '@sveltejs/adapter-netlify'
import adapterVercel from '@sveltejs/adapter-vercel'

const isStatic = !!process.env.SVELTE_BUILD_STATIC
const isNetlify = !!process.env.NETLIFY
const isVercel = !!process.env.VERCEL

console.log({isStatic, isNetlify, isVercel})

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter:
			isStatic ?
				adapterStatic({
					fallback: 'index.html',
					// precompress: true,
				})
			: isNetlify ?
				adapterNetlify()
			: isVercel ?
				adapterVercel()
			:
				adapterAuto(),

		alias: {
			'$': './src',
			'$houdini': './$houdini',
		},
	}
}

export default config
