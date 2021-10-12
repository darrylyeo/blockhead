/** @type {import('houdini').ConfigFile} */
const config = {
	schemaPath: './src/data/ens/ens-subgraph.graphql',
	sourceGlob: 'src/**/*.svelte',
	module: 'esm',
	framework: 'kit',
	static: true,
	apiUrl: 'https://api.thegraph.com/subgraphs/name/ensdomains/ens',
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
	}
}

export default config
