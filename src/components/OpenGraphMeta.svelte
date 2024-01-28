<script lang="ts">
	// Types
	import type { OpenGraphImageGeneratorParams } from '$/opengraph/imageGenerator'


	// Context
	import { page } from '$app/stores'


	// Inputs
	export let openGraphImageUrl: string | undefined
	export let openGraphImageWidth: number | undefined = 1728
	export let openGraphImageHeight: number | undefined = 1080


	// Internal state
	// (Computed)
	$: openGraphImageGeneratorUrl = `${$page.url}?${new URLSearchParams({
		timestamp: Date.now(),
		width: openGraphImageWidth,
		height: openGraphImageHeight,
	} as OpenGraphImageGeneratorParams).toString()}`


	// Components
	import { MetaTags } from 'svelte-meta-tags'
</script>


<MetaTags {...{
	openGraph: {
		images: [
			{
				url: openGraphImageUrl ?? openGraphImageGeneratorUrl,
				width: openGraphImageWidth,
				height: openGraphImageHeight,
				alt: 'Blockhead | track, visualize & explore all of crypto, DeFi & web3'
			},
		],
	},
}} />
