<script lang="ts">
	// Constants/types
	import { UrlMetadataProvider, urlMetadataProviders } from '$/data/urlMetadataProviders'
	import type { UrlMetadata } from '$/data/urlMetadata'


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

	import { normalizeUrlMetadata as normalizeUrlMetadataMetadataVision } from '$/api/metadataVision/normalize'

	import { normalizeUrlMetadata as normalizeUrlMetadataModProtocol } from '$/api/mod/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading metadata from {urlMetadataProviders[urlMetadataProvider].name}..."
	loadingIcon={urlMetadataProviders[urlMetadataProvider].icon}
	errorMessage="Couldn't load metadata from {urlMetadataProviders[urlMetadataProvider].name}."
	{...{
		[String(undefined)]: () => ({
			fromPromise: async () => undefined,
		}),

		[UrlMetadataProvider.MetadataVision]: () => ({
			fromQuery: (
				createQuery({
					queryKey: ['UrlMetadata', {
						urlMetadataProvider,
						url,
					}],
					queryFn: async () => {
						const { getUrlMetadata } = await import('$/api/metadataVision/index')

						return getUrlMetadata(url)
					},
					select: result => (
						normalizeUrlMetadataMetadataVision(result)
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[UrlMetadataProvider.ModProtocol]: () => ({
			fromQuery: (
				createQuery({
					queryKey: ['UrlMetadata', {
						urlMetadataProvider,
						url,
					}],
					queryFn: async () => {
						const { getMetadataForUrls } = await import('$/api/mod/index')

						return await getMetadataForUrls([
							url,
						])
					},
					select: result => (
						Object.entries(result)
							.map(([url, metadata]) => (
								normalizeUrlMetadataModProtocol(
									url,
									metadata,
								)
							))
							[0]
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
