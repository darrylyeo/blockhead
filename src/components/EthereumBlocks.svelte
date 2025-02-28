<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { TransactionProvider, transactionProviders } from '$/data/transactionProviders'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { networkProviderConfigByProvider } from '$/data/networkProviders'


	// Context
	import { preferences } from '$/state/preferences'
	import { blockHeightForNetwork } from '$/state/blockHeights'


	// Inputs
	export let network: Ethereum.Network
	export let showBlocks = 20

	export let transactionProvider: TransactionProvider
	export let networkProvider: NetworkProvider

	// (Computed)
	$: transactionProvider = $$props.transactionProvider ?? $preferences.transactionProvider
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork

	// (View options)
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 3
	export let isOpen = true
	export let title = 'Latest Blocks'


	// Internal state
	$: latestBlockNumberStore = blockHeightForNetwork(network)

	let latestBlockNumber: Ethereum.BlockNumber
	$: latestBlockNumber = $latestBlockNumberStore

	$: blockNumbers = latestBlockNumber !== undefined ? Array.from({ length: showBlocks }, (_, i) => latestBlockNumber - BigInt(i) as Ethereum.BlockNumber) : []


	// Components
	import AnchorLink from './AnchorLink.svelte'
	import CollapsibleList, { Layout as CollapsibleListLayout } from '$/components/CollapsibleList.svelte'
	import EthereumBlock from './EthereumBlock.svelte'
	import EthereumBlockLoader from './EthereumBlockLoader.svelte'
	import EthereumBlockHeader from './EthereumBlockHeader.svelte'
	import Loading from './Loading.svelte'
	import { RangeFormat } from './PaginationCount.svelte'


	// Transitions
	import { blur } from 'svelte/transition'
</script>


<CollapsibleList
	items={blockNumbers}
	getIndex={blockNumber => blockNumber}
	itemsCount={$latestBlockNumberStore}
	currentRange={[
		blockNumbers[blockNumbers.length - 1],
		blockNumbers[0],
	]}
	isOrdered={false}
	containerClass="card"
	rangeFormat={RangeFormat.EndIndexed}
	rangePrefix="latest"

	bind:isOpen

	{title}
	{headingLevel}

	isScrollEnabled={blockNumbers.length > 7}
	layout={CollapsibleListLayout.Plain}
	defaultHeight="51.5rem"
	animateFlip={true}
>
	<svelte:fragment slot="header-right">
		<span class="card-annotation">
			{transactionProvider === TransactionProvider.RpcProvider ? networkProviderConfigByProvider[$preferences.rpcNetwork].name : transactionProviders[transactionProvider].name}
		</span>
	</svelte:fragment>

	<svelte:fragment let:item={blockNumber}>
		<div
			transition:blur={{ duration: 1000 }}
		>
			<AnchorLink
				class="card"
				base={`/explorer/${network.slug}`}
				link={`/block/${blockNumber}`}
			>
				<EthereumBlockLoader
					{network}
					{blockNumber}
					{transactionProvider}
					{networkProvider}
					includeTransactions={true}

					let:block
					let:status
				>
					<svelte:fragment slot="header" let:block>
						{#if block}
							<EthereumBlockHeader
								{network}
								{block}
								headingLevel={headingLevel}
							/>
						{/if}
					</svelte:fragment>

					{#if status === 'resolved'}
						<hr>

						<EthereumBlock
							{network}
							{block}
							headingLevel={headingLevel}
						/>
					{/if}
				</EthereumBlockLoader>
			</AnchorLink>
		</div>
	</svelte:fragment>

	<svelte:fragment slot="loading">
		<Loading
			icon={{
				src: transactionProviders[transactionProvider].icon,
				name: transactionProviders[transactionProvider].name,
			}}
			iconAnimation="hover"
			title="Loading blocks..."
		>
			Loading recent blocks from {transactionProviders[transactionProvider].name}...
		</Loading>
	</svelte:fragment>
</CollapsibleList>

