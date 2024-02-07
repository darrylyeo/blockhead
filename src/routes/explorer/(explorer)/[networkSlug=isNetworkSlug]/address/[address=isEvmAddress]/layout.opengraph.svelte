<script lang="ts">
	// Types
	import type { SvelteComponent, ComponentProps } from 'svelte'

	type Component = $$Generic<SvelteComponent>


	// Constants
	import { networksBySlug, getNetworkColor } from '$/data/networks'


	// Context
	import type { load } from './layout.opengraph'

	$: ({
		width,
		height,
		url,
		data: {
			address,
			network,
			publicClient,
			ensName,
			bytecode,
			contractMetadata,
			addressType,
			contractName,
			sourcePaths,
		},
		pageComponent,
		pageProps,
	} = $$props as ({
		width: number,
		height: number,
		url: string,
		data: Awaited<ReturnType<typeof load>>,
		pageComponent: Component | undefined,
		pageProps: ComponentProps<Component> | undefined
	}))


	// Components
	import OpenGraphGeneratedImage from '$/opengraph/OpenGraphGeneratedImage.svelte'
</script>


<OpenGraphGeneratedImage {...{
	width,
	height,
	url,
	...(
		contractName && address && ensName ?
			{
				title: `${contractName} (${address})`,
				subtitle: ensName,
			}
		: contractName ?
			{
				title: contractName,
				subtitle: address,
			}
		:
			{
				title: address,
			}
	),
	annotation: `${network.name} ${addressType}`,
	primaryColor: getNetworkColor(network) ?? getNetworkColor(networksBySlug['ethereum']),
}}>
	{#if pageComponent}
		<svelte:component this={pageComponent} {...pageProps} />
	{/if}
</OpenGraphGeneratedImage>
