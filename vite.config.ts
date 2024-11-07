import type { UserConfig } from 'vite'

import { sveltekit } from '@sveltejs/kit/vite'

const config: UserConfig = {
	plugins: [
		sveltekit()
	],

	ssr: {
		noExternal: [
			// /node_modules/.pnpm/echarts@5.3.2/node_modules/echarts/core.js:20
			// export * from './lib/export/core.js';
			// ^^^^^^
			// SyntaxError: Unexpected token 'export'
			// 'echarts',

			'vis-timeline',
		],

		// Transform into ESModules
		// For CommonJS errors
		// The requested module '/node_modules/__' does not provide an export named 'default'
		optimizeDeps: {
			include: [
				// import { addEventListener, normalizeEvent } from "zrender/lib/core/event.js";
				//          ^^^^^^^^^^^^^^^^
				// SyntaxError: Named export 'addEventListener' not found. The requested module 'zrender/lib/core/event.js' is a CommonJS module, which may not support all module.exports as named exports.
				// CommonJS modules can always be imported via the default export, for example using:
				// import pkg from 'zrender/lib/core/event.js';
				'zrender',

				'detect-content-type',
			],
			exclude: [
				'@liquality/wallet-sdk',
				'@resvg/resvg-js',
			],
		},
	},

	// Node globals
	define: {
		'process.env': {}
	},

	// Node polyfills
	resolve: {
		alias: {
			stream: 'rollup-plugin-node-polyfills/polyfills/stream',
			'node:buffer': 'buffer',
		}
	},

	// ECMAScript shims
	build: {
		rollupOptions: {
			external: [
				'array.prototype.group',
				'array.prototype.grouptomap',
			]
		}
	},

	// (WalletConnect 2.0)
	// [vite] failed to connect to websocket.
	// Check out your Vite / network configuration and https://vitejs.dev/config/server-options.html#server-hmr .
	server: {
		hmr: {
			overlay: false
		}
	}
}

export default config
