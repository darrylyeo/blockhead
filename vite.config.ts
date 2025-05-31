import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'

import { parseGraphQLSchema } from '@magidoc/rollup-plugin-gql-schema'

export default defineConfig({
	plugins: [
		sveltekit(),
		parseGraphQLSchema({
			paths: ['./src/state/graphql/schema.graphql'],
			target: './src/state/graphql/schema.json',
			format: 'introspection',
		}),
	],
})
