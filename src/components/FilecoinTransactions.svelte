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
	import Collapsible from './Collapsible.svelte'
	import FilecoinTransaction from './FilecoinTransaction.svelte'
	import InlineContainer from './InlineContainer.svelte'
	import Loading from './Loading.svelte'
	import PaginationCount from './PaginationCount.svelte'
	import ScrollContainer from './ScrollContainer.svelte'
</script>


<Collapsible
	type="label"
	title=""
	bind:isOpen
	canToggle={transactions.length > 0}
>
	<svelte:fragment slot="title">
		<slot name="title">
			<span class="row inline wrap">
				<svelte:element this={`h${headingLevel}`}>
					{title}
					<!-- <span>(<TweenedNumber value={transactions.length} />{#if transactionsCount !== undefined && transactions.length !== transactionsCount}{' '}/ {transactionsCount}{:else if pagination?.hasNextPage}+{/if})</span> -->
				</svelte:element>
				<small>
					<PaginationCount
						itemsCount={transactionsCount}
						currentRange={[0, transactions.length]}
						hasMoreItems={pagination?.hasNextPage}
						isShowingRange={isOpen}
					/>
				</small>
			</span>
		</slot>
	</svelte:fragment>

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
	
	<ScrollContainer
		{pagination}
		style="
			--resizeVertical-defaultHeight: max(16rem, calc(100dvh - 24rem));
		"
	>
		{#each transactions as transaction}
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
		{/each}

		<svelte:fragment slot="after">
			{#if pagination?.isFetchingNextPage}
				<Loading
					icon={{
						src: filecoinTransactionProviders[filecoinTransactionProvider].icon,
						name: filecoinTransactionProviders[filecoinTransactionProvider].name,
					}}
					iconAnimation="hover"
				>
					Loading more transactions via {filecoinTransactionProviders[filecoinTransactionProvider].name}...
				</Loading>
			{/if}
		</svelte:fragment>
	</ScrollContainer>
</Collapsible>


<style>
	small {
		opacity: 0.66;
	}
</style>
