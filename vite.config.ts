import type { UserConfig } from 'vite'

import { sveltekit } from '@sveltejs/kit/vite'
import houdini from 'houdini/vite'

const config: UserConfig = {
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
		],

		// Transform into ESModules
		// For CommonJS errors
		// The requested module '/node_modules/__' does not provide an export named 'default'
		optimizeDeps: {
			include: [
				// Directory import '/opt/build/repo/node_modules/@apollo/client/core' is not supported resolving ES modules imported from /opt/build/repo/.svelte-kit/output/server/app.js
				// Did you mean to import @apollo/client/core/core.cjs.js?
				// https://github.com/timhall/svelte-apollo/issues/97#issuecomment-857397762
				"@apollo/client/core",
				"@apollo/client/cache",
				"@apollo/client/link/ws",
				"@apollo/client/link/context",
				"@apollo/client/link/error",
				"@apollo/client/utilities",

				'@3id/connect',

				// import { addEventListener, normalizeEvent } from "zrender/lib/core/event.js";
				//          ^^^^^^^^^^^^^^^^
				// SyntaxError: Named export 'addEventListener' not found. The requested module 'zrender/lib/core/event.js' is a CommonJS module, which may not support all module.exports as named exports.
				// CommonJS modules can always be imported via the default export, for example using:
				// import pkg from 'zrender/lib/core/event.js';
				'zrender',
			],
			exclude: ["@apollo/client", "svelte-apollo"],
		},
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
