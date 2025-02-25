<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	
	import { networkBySlug } from '$/data/networks'
	import { FilecoinTransactionProvider, filecoinTransactionProviders } from '$/data/filecoinTransactionProviders'

	
	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let transactions: Filecoin.Transaction[] = []
	export let transactionsCount: number | undefined
	export let filecoinTransactionProvider: FilecoinTransactionProvider = FilecoinTransactionProvider.Beryx
	export let isInternal = false

	// (View options)
	export let layout: 'default' | 'inline' | undefined
	export let title = 'Transactions'
	export let headingLevel: 2 | 3 | 4 | 5 | 6 = 3
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showFees = false
	export let isOpen: boolean


	// Events
	export let pagination: Loader['$$slot_def']['default']['pagination']


	// Components
	import type Loader from './Loader.svelte'
	import AnchorLink from './AnchorLink.svelte'
	import CollapsibleList, { Layout as CollapsibleListLayout } from '$/components/CollapsibleList.svelte'
	import FilecoinTransaction from './FilecoinTransaction.svelte'
	import InlineContainer from './InlineContainer.svelte'
	import Loading from './Loading.svelte'
</script>


<CollapsibleList
	items={transactions}
	itemsCount={transactionsCount}
	getIndex={transaction => transaction.cid}
	isOrdered={true}

	bind:isOpen

	{title}
	{headingLevel}

	isScrollEnabled={transactions.length > 7}
	layout={layout === 'inline' ? CollapsibleListLayout.Card : CollapsibleListLayout.Cards}

	{pagination}
>
	<svelte:fragment slot="toolbar-items" let:isOpen>
		<InlineContainer {isOpen}>
			<label>
				<input type="checkbox" bind:checked={showFees}>
				<span>Fees</span>
			</label>

			<label>
				<span>View</span>
				<select bind:value={detailLevel}>
					<option value="summary">Summary</option>
					<option value="detailed">Detailed</option>
					<option value="exhaustive">Exhaustive</option>
				</select>
			</label>
		</InlineContainer>
	</svelte:fragment>

	<svelte:fragment let:item={transaction}>
		<AnchorLink
			class={layout === 'inline' ? 'card' : ''}
			base={`/explorer/${network.slug}`}
			link={`/tx/${transaction.cid}`}
		>
			<FilecoinTransaction
				{network}
				{transaction}
				{isInternal}

				{layout}
				headingLevel={headingLevel + 1}
				{detailLevel}
				{tokenBalanceFormat}
				{showFees}
			/>
		</AnchorLink>
	</svelte:fragment>

	<svelte:fragment slot="loading">
		{#if pagination?.isFetchingNextPage}
			<Loading
				icon={{
					src: filecoinTransactionProviders[filecoinTransactionProvider].icon,
					name: filecoinTransactionProviders[filecoinTransactionProvider].name,
				}}
				iconAnimation="hover"
				title="Loading more transactions..."
			>
				Loading more transactions via {filecoinTransactionProviders[filecoinTransactionProvider].name}...
			</Loading>
		{/if}
	</svelte:fragment>
</CollapsibleList>
