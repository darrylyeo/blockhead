<script lang="ts">
	// Constants/types
	import type { JsonSchema } from '../data/jsonSchema'


	// Inputs
	export let schemaUrl: string


	// Functions
	import { createQuery } from '@tanstack/svelte-query'


	// Output
	export let jsonSchema: JsonSchema

	type SharedSlotProps = {
		jsonSchema: typeof jsonSchema,
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	fromQuery={
		createQuery({
			queryKey: ['JsonSchema', {
				schemaUrl,
			}],
			queryFn: async () => (
				await fetch(schemaUrl)
					.then(response => response.json())
			)
		})
	}
	loadingMessage={`Fetching JSON schema...`}
	errorMessage={`Couldn't fetch JSON schema.`}
	{...$$restProps}
	bind:result={jsonSchema}
	let:result={jsonSchema}
>
	<svelte:fragment slot="header"
		let:result={jsonSchema}
	>
		<slot name="header" {jsonSchema} />
	</svelte:fragment>

	<slot {jsonSchema} />
</Loader>
