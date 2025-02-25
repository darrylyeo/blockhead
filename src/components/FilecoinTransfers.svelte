<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { networkBySlug } from '$/data/networks'
	import { FilecoinTransactionProvider } from '$/data/filecoinTransactionProviders'

	
	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let transfers: Filecoin.Transfer[] = []
	export let transfersCount: number | undefined
	export let filecoinTransactionProvider: FilecoinTransactionProvider

	// (View options)
	export let title = 'Transfers'
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3
	export let isOpen: boolean


	// Components
	import CollapsibleList, { Layout as CollapsibleListLayout } from '$/components/CollapsibleList.svelte'
	import FilecoinTransfer from './FilecoinTransfer.svelte'
</script>


<CollapsibleList
	items={transfers}
	itemsCount={transfersCount}
	isOrdered={true}

	bind:isOpen

	{title}
	{headingLevel}

	isScrollEnabled={transfers.length > 7}
	layout={CollapsibleListLayout.Cards}
>

	<svelte:fragment let:item={transfer}>
		<FilecoinTransfer
			{network}
			{transfer}
			headingLevel={headingLevel + 1}
			layout="inline"
		/>
	</svelte:fragment>
</CollapsibleList>
