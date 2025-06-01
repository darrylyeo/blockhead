import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
import { kitRoutes } from 'vite-plugin-kit-routes'

import { parseGraphQLSchema } from '@magidoc/rollup-plugin-gql-schema'

export default defineConfig({
	plugins: [
		sveltekit(),
		kitRoutes({
			generated_file_path: './src/ROUTES.ts',
		}),
		parseGraphQLSchema({
			paths: ['./src/state/graphql/schema.graphql'],
			target: './src/state/graphql/schema.json',
			format: 'introspection',
		}),
	],
})
