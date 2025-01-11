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


	// Internal state
	$: latestBlockNumberStore = blockHeightForNetwork(network)

	let latestBlockNumber: Ethereum.BlockNumber
	$: latestBlockNumber = $latestBlockNumberStore

	$: blockNumbers = latestBlockNumber !== undefined ? Array.from({ length: showBlocks }, (_, i) => latestBlockNumber - BigInt(i) as Ethereum.BlockNumber) : []


	// Components
	import AnchorLink from './AnchorLink.svelte'
	import Collapsible from './Collapsible.svelte'
	import EthereumBlock from './EthereumBlock.svelte'
	import EthereumBlockLoader from './EthereumBlockLoader.svelte'
	import EthereumBlockHeader from './EthereumBlockHeader.svelte'
	import Loading from './Loading.svelte'


	// Transitions
	import { flip } from 'svelte/animate'
	import { blur } from 'svelte/transition'
</script>


<Collapsible
	type="label"
	containerClass="card"
	class="column"
	isOpen
>
	<svelte:fragment slot="title">
		<svelte:element this={`h${headingLevel}`}>
			Latest Blocks
		</svelte:element>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">
			{transactionProvider === TransactionProvider.RpcProvider ? networkProviderConfigByProvider[$preferences.rpcNetwork].name : transactionProviders[transactionProvider].name}
		</span>
	</svelte:fragment>

	<div class="scrollable-list column">
		{#each blockNumbers as blockNumber (blockNumber)}
			<div
				animate:flip|local={{ duration: 300 }}
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
		{:else}
			<Loading
				icon={{
					src: transactionProviders[transactionProvider].icon,
				}}
				iconAnimation="hover"
			>
				Loading recent blocks from {transactionProviders[transactionProvider].name}...
			</Loading>
		{/each}
	</div>
</Collapsible>


<style>
	.scrollable-list {
		--resizeVertical-defaultHeight: 51.5rem;
	}
</style>
