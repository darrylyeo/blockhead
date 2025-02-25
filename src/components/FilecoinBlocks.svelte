<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'

	
	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let blocks: Filecoin.Block[] = []

	// (View options)
	export let title = 'Blocks'
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3
	export let isOpen: boolean


	// Components
	import AnchorLink from './AnchorLink.svelte'
	import CollapsibleList, { Layout as CollapsibleListLayout } from '$/components/CollapsibleList.svelte'
	import FilecoinBlock from './FilecoinBlock.svelte'
</script>


<CollapsibleList
	items={blocks}
	itemsCount={blocks.length}
	getIndex={block => block.cid}
	isOrdered={true}

	bind:isOpen

	{title}
	{headingLevel}

	isScrollEnabled={blocks.length > 7}
	layout={CollapsibleListLayout.Cards}
>
	<svelte:fragment let:item={block}>
		<AnchorLink
			class="card"
			base={`/explorer/${network.slug}`}
			link={`/block/${block.cid}`}
		>
			<FilecoinBlock
				{block}
				headingLevel={headingLevel + 1}
				isOpen
			/>
		</AnchorLink>
	</svelte:fragment>
</CollapsibleList>


<style>
	small {
		opacity: 0.5;
	}
</style>
