/// <references types="houdini-svelte">

/** @type {import('houdini').ConfigFile} */
const config = {
	watchSchema: {
		url: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
		// interval: null
	},
	// include: './src/**/*.{svelte,ts,js}', // don't look for .graphql files to avoid parsing the schema at schemaPath
	schemaPath: './src/api/ens/ens-subgraph.graphql',
	plugins: {
		'houdini-svelte': {
			client: './src/api/ens/client.ts',
		}
	},

	scalars: {
		'BigDecimal': {
			type: 'string',
			unmarshal: value => value?.toString(),
			marshal: value => value,
		},
		'BigInt': {
			type: 'string',
			unmarshal: value => value?.toString(),
			marshal: value => value,
		},
		'Bytes': {
			type: 'string',
			unmarshal: value => value?.toString(),
			marshal: value => value,
		}
	},
}

export default config
