<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../../../data/networks/types'


	// Params/Context

	import { networkSlug, query } from '../_explorerParams'

	import { explorerNetwork, explorerProvider, explorerBlockNumber } from '../_explorerContext'

	import { getContext } from 'svelte'

	const ethereumNetwork = getContext<SvelteStore<Ethereum.Network>>('ethereumNetwork')
	const ethereumProvider = getContext<SvelteStore<Ethereum.Provider>>('ethereumProvider')

	import type { Writable } from 'svelte/store'

	const relevantPreferences = getContext<Writable<string[]>>('relevantPreferences')
	$: $relevantPreferences = [
		'theme',
		...(
			!$query ? ['rpcNetwork', 'currentPriceProvider', 'historicalPriceProvider'] :
			_isTransaction ? ['rpcNetwork', 'transactionProvider', 'quoteCurrency'] :
			_isBlockNumber ? ['rpcNetwork', 'transactionProvider', 'quoteCurrency'] :
			['rpcNetwork', 'contractSourceProvider', 'tokenBalancesProvider', 'transactionProvider', 'quoteCurrency']
			// _isAddress ? ['rpcNetwork', 'tokenBalancesProvider', 'transactionProvider', 'quoteCurrency'] :
			// []
		),
	]


	// External stores

	import { preferences } from '../../../state/preferences'


	// Internal state
		
	$: currentQuery = $query

	$: showCurrentBlockHeight = true

	$: showCurrentPrice = [
		'ethereum',
		'polygon',
		'avalanche',
		'fantom',
		'bsc'
	].includes($networkSlug)

	$: showHistoricalPrice = [
		'ethereum',
		'polygon',
		'avalanche',
		'fantom',
		'bsc'
	].includes($networkSlug)

	let placeholder: string
	// $: placeholder = {
	// 	'avalanche': 'C-Chain Address (0xabcd...6789) / Avvy Domain (avvy.avax)'
	// }


	// Functions
	import { isEvmAddress } from '../../../utils/isEvmAddress'
	const isTransaction = query => /^0x[0-9a-f]{64}$/i.test(query)
	const isBlockNumber = query => /^(?:0|[1-9][0-9]*)$/i.test(query)

	$: _isAddress = isEvmAddress($query)
	$: _isTransaction = isTransaction($query)
	$: _isBlockNumber = isBlockNumber($query)


	// Block Navigation

	import type { Covalent } from '../../../api/covalent'
	import type { BlockTransaction } from '../../../api/moralis/api/Api'

	let navigationContext: {
		transaction?: Covalent.Transaction | BlockTransaction,
		transactionBlockNumber?: number,
		block?: Ethereum.Block,
	} = {}

	$: navigationContext.transactionBlockNumber = navigationContext.transaction &&
		Number((navigationContext.transaction as Covalent.Transaction).block_height
		|| (navigationContext.transaction as BlockTransaction).block_number)

	import { availableNetworks } from '../../../data/networks'
	import { TransactionProvider, transactionProviderIcons } from '../../../data/transactionProvider'
	import { parallelLoaderStore } from '../../../utils/parallelLoaderStore'
	import { chainCodeFromNetwork, MoralisWeb3Api } from '../../../api/moralis/web3Api'


	// Components

	import ExplorerInput from '../../../components/ExplorerInput.svelte'
	import NetworkProviderLoader from '../../../components/NetworkProviderLoader.svelte'

	import HistoricalPriceChart from '../../../components/HistoricalPriceChart.svelte'
	import CurrentPrice from '../../../components/CurrentPrice.svelte'
	import EthereumBlockHeight from '../../../components/EthereumBlockHeight.svelte'

	import EthereumAccountOrContract from '../../../components/EthereumAccountOrContract.svelte'
	import EthereumBlockLoader from '../../../components/EthereumBlockLoader.svelte'
	import EthereumBlockNavigation from '../../../components/EthereumBlockNavigation.svelte';
	import EthereumTransactionLoader from '../../../components/EthereumTransactionLoader.svelte'
	import Loader from '../../../components/Loader.svelte';


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

	.row {
		align-items: stretch;
	}
	.row > * {
		flex: 1 20rem;
	}


	.navigation {
		--padding-inner: 0.25em;

		/* margin: 0 calc(-1 * var(--padding-outer)); */
		margin-top: auto;
		padding: var(--padding-outer);

		background-color: rgba(0, 0, 0, 0.25);
		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
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
	<form on:submit|preventDefault={() => $query = currentQuery}>
		<ExplorerInput bind:value={currentQuery} {placeholder} network={$explorerNetwork} />
		<button type="submit">Go</button>
	</form>

	{#if $explorerNetwork}
		<NetworkProviderLoader
			network={$explorerNetwork}
			providerPromise={$explorerProvider && (async () => $explorerProvider)}
			providerName={$preferences.rpcNetwork}
			contentClass="column"
		>
			{#if $explorerProvider}
				<div class="stack">
					{#key $query}
						{#if $query}
							{#if _isTransaction}
								<div class="column"in:fly={{ x: 50, duration: 200 }} out:fly={{ x: -50, duration: 200 }}>
									<EthereumTransactionLoader
										network={$explorerNetwork}
										transactionId={$query}
										provider={$explorerProvider}

										detailLevel="exhaustive"
										tokenBalanceFormat="both"
										showFees={true}

										layout="standalone"

										bind:transaction={navigationContext.transaction}
									/>
								</div>
							{:else if _isBlockNumber}
								<div class="column" in:fly={{ x: 50, duration: 200 }} out:fly={{ x: -50, duration: 200 }}>
									<EthereumBlockLoader
										network={$explorerNetwork}
										blockNumber={$query}
										provider={$explorerProvider}
										transactionProvider={$preferences.transactionProvider}

										bind:block={navigationContext.block}
									/>
								</div>
							{:else}
								<div class="column" in:fly={{ x: 50, duration: 200 }} out:fly={{ x: -50, duration: 200 }}>
									<EthereumAccountOrContract network={$explorerNetwork} accountId={$query} provider={$explorerProvider}/>
								</div>
							{/if}
						{:else}
							<div class="column-block" in:fly={{ x: 50, duration: 200 }} out:fly={{ x: -50, duration: 200 }}>
								<div class="row">
									{#if showCurrentBlockHeight}
										<section class="card">
											<EthereumBlockHeight
												network={$explorerNetwork}
												provider={$explorerProvider}
												blockNumber={$explorerBlockNumber}
											/>
										</section>
									{/if}

									{#if showCurrentPrice}
										<section class="card">
											<CurrentPrice
												currentPriceProvider={$preferences.currentPriceProvider}
												token={$explorerNetwork.nativeCurrency.symbol}
												quoteCurrency={$preferences.quoteCurrency}
												provider={$ethereumProvider}
												network={$ethereumNetwork}
												blockNumber={$explorerBlockNumber}
											/>
										</section>
									{/if}
								</div>

								{#if showHistoricalPrice}
									<div class="row">
										<section class="card">
											<HistoricalPriceChart
												historicalPriceProvider={$preferences.historicalPriceProvider}
												currencies={[$explorerNetwork.nativeCurrency.symbol]}
												quoteCurrency={$preferences.quoteCurrency}
											/>
										</section>
									</div>
								{/if}
							</div>
						{/if}
					{/key}
				</div>

				<div class="navigation currentNetwork column">
					<EthereumBlockNavigation
						network={$explorerNetwork}
						provider={$explorerProvider}
						blockNumber={
							_isBlockNumber ?
								Number($query)
							: _isTransaction ?
								navigationContext.transactionBlockNumber
							:
								undefined
						}
						showBeforeAndAfter={_isBlockNumber}
					/>
				</div>
				
				{@const transactionProvider = $preferences.transactionProvider}
				{#if _isBlockNumber && availableNetworks && transactionProvider === TransactionProvider.Moralis && navigationContext.block?.timestamp}
					{@const network = $explorerNetwork}
					{@const otherNetworks = availableNetworks.filter(_network => _network !== network)}
				
					<Loader
						loadingIconName={'Moralis'}
						loadingIcon={transactionProviderIcons[transactionProvider]}
						fromStore={otherNetworks && navigationContext.block?.timestamp && (() =>
							// <Awaited<ReturnType<typeof MoralisWeb3Api.dateToBlock.getDateToBlock>>[]>
							parallelLoaderStore(otherNetworks, network => (
								MoralisWeb3Api.dateToBlock.getDateToBlock({
									chain: chainCodeFromNetwork(network),
									date: navigationContext.block.timestamp
								})
							))
						)}
						then={closestBlockByNetwork => [...closestBlockByNetwork?.entries()].filter(([network, { block: blockNumber }]) => blockNumber > 0) ?? []}
						let:result={networksAndClosestBlock}
						clip={false}
					>
						<svelte:fragment slot="loadingMessage">
							Finding blocks produced around the same time as {network.name} › Block {navigationContext.block.blockNumber}...
						</svelte:fragment>
				
						{#if networksAndClosestBlock?.length}
							<div class="navigation otherNetworks column">
								{#each networksAndClosestBlock as [network, {block: blockNumber, timestamp}]}
									<EthereumBlockNavigation
										{network}
										blockNumber={blockNumber > 1 ? Number(blockNumber) : undefined}
									/>
								{/each}
							</div>
						{/if}
					</Loader>
				{/if}
			{/if}
		</NetworkProviderLoader>
	{/if}
</section>