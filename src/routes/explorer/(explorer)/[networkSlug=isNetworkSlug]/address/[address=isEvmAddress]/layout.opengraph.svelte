<script lang="ts">
	// Types
	import type { SvelteComponent, ComponentProps } from 'svelte'

	type Component = $$Generic<SvelteComponent>


	// Constants
	import { networkBySlug, getNetworkColor } from '$/data/networks'


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
	import { networkIcons } from '$/assets/networkIcons'
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
				subtitle: ensName,
			}
	),
	annotation: `${network.name} ${addressType}`,
	primaryColor: getNetworkColor(network) ?? getNetworkColor(networkBySlug.get('ethereum')!),
	backgroundIcon: network && new URL(networkIcons[network.slug], new URL(url).origin).toString(),
}}>
	{#if pageComponent}
		<svelte:component this={pageComponent} {...pageProps} />
	{/if}
</OpenGraphGeneratedImage>
