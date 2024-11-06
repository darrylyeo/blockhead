<script lang="ts">
	// Types/constants
	import { InputPattern } from '$/data/inputPatterns'


	// Params/Context
	import { page } from '$app/stores'

	import { explorerParams, type ExplorerInputParams } from '../_explorerParams.svelte'

	import { explorerContext } from '../_explorerContext.svelte'


	// External stores
	import { preferences } from '$/state/preferences'


	// Internal state
	let currentExplorerInputValue = $state<string>('')
	$effect(() => {
		currentExplorerInputValue = explorerContext.query
	})

	let currentExplorerInputParams: ExplorerInputParams = {}


	const networkProvider = $derived(
		$preferences.rpcNetwork
	)


	// Block Navigation
	$effect(() => {
		explorerContext.navigationContext.transactionBlockNumber = explorerContext.navigationContext.transaction?.blockNumber
	})

	import { availableNetworks } from '$/data/networks'
	import { TransactionProvider, transactionProviderIcons } from '$/data/transactionProvider'
	import { parallelLoaderStore } from '$/utils/parallelLoaderStore'
	import { chainCodeFromNetwork, MoralisWeb3Api } from '$/api/moralis/web3Api/index'


	// Components
	import SearchInput from '$/components/SearchInput.svelte'
	import EthereumBlockNavigation from '$/components/EthereumBlockNavigation.svelte'
	import Loader from '$/components/Loader.svelte'
	

	// Transitions
	import { fly } from 'svelte/transition'
</script>


<style>
	form {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--padding-inner);
		align-items: center;
	}


	.navigation {
		--padding-inner: 0.25em;

		/* margin: 0 calc(-1 * var(--padding-outer)); */
		margin-top: auto;
		padding: var(--padding-outer);

		background-color: rgba(0, 0, 0, 0.25);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-radius: var(--card-border-radius);
		margin: 0 calc(-1 * var(--padding-outer));
	}
	.navigation.currentNetwork {
		position: sticky;
		bottom: 4rem;
		/* bottom: 0; */
		z-index: 1;
	}
	.navigation.otherNetworks {
		font-size: 0.8em;
	}
	/* .navigation {
		position: sticky;
		top: calc(100% - 8rem);
		bottom: 3.5rem;

		transition: 0.3s;
	}
	.navigation:not(:hover):not(:focus-within) {
		transform: translateY(calc(100% - 1em - var(--padding-outer) * 2));
	} */
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<form on:submit|preventDefault={() => {
		explorerParams.address = currentExplorerInputParams.address
		explorerParams.blockNumber = currentExplorerInputParams.blockNumber
		explorerParams.ensName = currentExplorerInputParams.ensName
		explorerParams.transactionId = currentExplorerInputParams.transactionId
	}}>
		<SearchInput
			inputPatterns={
				explorerContext.network?.slug === 'filecoin' ?
					[
						InputPattern.FilecoinAccountId,
						InputPattern.FilecoinTransactionId,
						InputPattern.FilecoinTipsetNumber,
					]
				:
					[
						InputPattern.Address,
						InputPattern.TransactionId,
						InputPattern.BlockNumber,
						InputPattern.EnsName,
					]
			}
			bind:value={currentExplorerInputValue}
			bind:matchedPatterns={currentExplorerInputParams}
			network={explorerContext.network}
		/>
		<button type="submit">Go</button>
	</form>

	{#if explorerContext.network}
		<div class="stack">
			{#key $page.route.id}
				<div
					class="column"
					in:fly={{ x: 50, duration: 200 }}
					out:fly={{ x: -50, duration: 200 }}
				>
					<slot />
				</div>
			{/key}
		</div>

		<div class="navigation currentNetwork column">
			<EthereumBlockNavigation
				network={explorerContext.network}
				{networkProvider}
				blockNumber={
					explorerContext.queryType === 'block' ?
						BigInt(explorerParams.blockNumber)
					: explorerContext.queryType === 'transaction' ?
						explorerContext.navigationContext.transactionBlockNumber
					:
						undefined
				}
				showBeforeAndAfter={explorerContext.queryType === 'block'}
			/>
		</div>
		
		{@const transactionProvider = $preferences.transactionProvider}
		{#if explorerContext.queryType === 'block' && availableNetworks && transactionProvider === TransactionProvider.Moralis && explorerContext.navigationContext.block?.timestamp}
			{@const network = explorerContext.network}
			{@const otherNetworks = availableNetworks.filter(_network => _network !== network)}
		
			<Loader
				viewOptions={{
					clip: false,
				}}
				loadingIconName={'Moralis'}
				loadingIcon={transactionProviderIcons[transactionProvider]}
				fromStore={otherNetworks && explorerContext.navigationContext.block?.timestamp && (() =>
					// <Awaited<ReturnType<typeof MoralisWeb3Api.dateToBlock.getDateToBlock>>[]>
					parallelLoaderStore(otherNetworks, network => (
						MoralisWeb3Api.dateToBlock.getDateToBlock({
							chain: chainCodeFromNetwork(network),
							date: explorerContext.navigationContext.block.timestamp
						})
					))
				)}
				then={closestBlockByNetwork => (
					[...closestBlockByNetwork?.entries() ?? []]
						.map(([network, data]) => ({
							network,
							blockNumber: BigInt(data.block),
							timestamp: data.timestamp,
						}))
						.filter(data => data.blockNumber > 0n)
				)}
				let:result={networksAndClosestBlock}
			>
				<svelte:fragment slot="loadingMessage">
					Finding blocks produced around the same time as {network.name} › Block {explorerContext.navigationContext.block.blockNumber}...
				</svelte:fragment>
		
				{#if networksAndClosestBlock?.length}
					<div class="navigation otherNetworks column">
						{#each networksAndClosestBlock as { network, blockNumber, timestamp }}
							<EthereumBlockNavigation
								{network}
								blockNumber={blockNumber > 1n ? blockNumber : undefined}
							/>
						{/each}
					</div>
				{/if}
			</Loader>
		{/if}
	{/if}
</section>
