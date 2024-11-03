<script lang="ts">
	// Types/constants
	import { EasProvider, easProviderIcons } from '$/api/eas/provider'


	// Context
	import { appsContext } from '$/routes/apps/_appsContext.svelte'

	import { appsParams } from '$/routes/apps/_appsParams.svelte'

	import { preferences } from '$/state/preferences'
	$: easProvider = $preferences.easProvider ?? EasProvider.Easscan


	// Functions
	import { createQuery } from '@tanstack/svelte-query'


	// Components
	import Loader from '$/components/Loader.svelte'
	import EasSchema from '../../../../EasSchema.svelte'
</script>


<Loader
	loadingMessage={`Loading schema from ${easProvider}...`}
	loadingIcon={easProviderIcons[easProvider]}
	{...{
		[EasProvider.Easscan]: {
			fromQuery: createQuery({
				queryKey: ['EasSchema', {
					easProvider,
					chainId: appsContext.network?.chainId,
					schemaId: appsParams.easSchemaId,
				}],
				queryFn: async ({
					queryKey: [_, {
						chainId,
						schemaId,
					}],
				}) => {
					const { getSchema } = await import('$/api/eas/easscan')

					const result = await getSchema({
						chainId,
						schemaId,
					})

					if(!result?.schema)
						throw `Schema "${schemaId}" wasn't found.`

					return result.schema
				},
				staleTime: 10 * 1000,
			}),
		},
	}[easProvider]}
	let:result={schema}
>
	{#if schema}
		<EasSchema
			network={appsContext.network}
			{schema}
			layout="standalone"
		/>
	{/if}
</Loader>
