/** @type {import('houdini').ConfigFile} */
const config = {
	module: 'esm',
	framework: 'kit',
	apiUrl: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
	include: './src/**/*.{svelte,ts,js}', // don't look for .graphql files to avoid parsing the schema at schemaPath
	schemaPath: './src/data/ens/ens-subgraph.graphql',
	client: './src/data/ens/client.ts',
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
	schemaPollInterval: null
}

export default config
