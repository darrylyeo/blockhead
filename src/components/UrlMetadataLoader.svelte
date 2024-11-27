<script lang="ts">
	// Constants/types
	import { UrlMetadataProvider, urlMetadataProviderIcons } from '$/data/urlMetadataProvider'
	import type { UrlMetadata } from '$/api/mod'


	// Context
	import { preferences } from '$/state/preferences'


	// Inputs
	export let urlMetadataProvider: UrlMetadataProvider
	export let url: string

	// (Computed)
	$: urlMetadataProvider = $$props.urlMetadataProvider || $preferences.urlMetadataProvider


	// Outputs
	export let urlMetadata: UrlMetadata | undefined

	type SharedSlotProps = {
		urlMetadata: typeof urlMetadata,
	}

	type $$Slots = {
		default: SharedSlotProps,
		header: SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading metadata from {urlMetadataProvider}..."
	loadingIcon={urlMetadataProviderIcons[urlMetadataProvider]}
	errorMessage="Couldn't load metadata from {urlMetadataProvider}."
	{...{
		[String(undefined)]: () => ({
			fromPromise: async () => undefined,
		}),

		[UrlMetadataProvider.ModProtocol]: () => ({
			fromQuery: (
				createQuery({
					queryKey: ['UrlMetadata', {
						urlMetadataProvider,
						url,
					}],
					queryFn: async () => {
						const { getMetadataForUrls } = await import('$/api/mod')

						return await getMetadataForUrls([
							url,
						])
					},
					select: result => (
						Object.values(result)[0]
					),
					staleTime: 10 * 1000,
				})
			),
		}),
	}[urlMetadataProvider]?.()}
	bind:result={urlMetadata}
	let:result={urlMetadata}
>
	<svelte:fragment slot="header"
		let:result={urlMetadata}
	>
		<slot name="header"
			{urlMetadata}
		/>
	</svelte:fragment>

	<slot {urlMetadata} />
</Loader>
