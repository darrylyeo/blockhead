<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../../../data/ethereum/types'


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
			['rpcNetwork', 'tokenBalancesProvider', 'transactionProvider', 'quoteCurrency']
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

	let placeholder
	// $: placeholder = {
	// 	'avalanche': 'C-Chain Address (0xabcd...6789) / Avvy Domain (avvy.avax)'
	// }


	const isAddress = query => /^0x[0-9a-f]{40}$/i.test(query)
	const isTransaction = query => /^0x[0-9a-f]{64}$/i.test(query)
	const isBlockNumber = query => /^[0-9]+$/i.test(query)

	$: _isAddress = isAddress($query)
	$: _isTransaction = isTransaction($query)
	$: _isBlockNumber = isBlockNumber($query)


	// Components

	import AddressField from '../../../components/AddressField.svelte'
	import NetworkProviderLoader from '../../../components/NetworkProviderLoader.svelte'

	import HistoricalPriceChart from '../../../components/HistoricalPriceChart.svelte'
	import CurrentPrice from '../../../components/CurrentPrice.svelte'
	import EthereumBlockHeight from '../../../components/EthereumBlockHeight.svelte'

	import EthereumAccountOrContract from '../../../components/EthereumAccountOrContract.svelte'
	import EthereumBlockLoader from '../../../components/EthereumBlockLoader.svelte'
	import EthereumTransactionLoader from '../../../components/EthereumTransactionLoader.svelte'

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
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<form on:submit|preventDefault={() => $query = currentQuery}>
		<AddressField bind:address={currentQuery} {placeholder} />
		<button>Go</button>
	</form>

	{#if $explorerNetwork}
		<NetworkProviderLoader
			network={$explorerNetwork}
			providerPromise={$explorerProvider && (async () => $explorerProvider)}
			providerName={$preferences.rpcNetwork}
		>
			{#if $explorerProvider}
				{#key $query}
					{#if $query}
						{#if _isTransaction}
							<div class="column">
								<EthereumTransactionLoader
									network={$explorerNetwork}
									transactionID={$query}
									provider={$explorerProvider}

									detailLevel="exhaustive"
									tokenBalanceFormat="both"
									showFees={true}

									layout="standalone"
								/>
							</div>
						{:else if _isBlockNumber}
							<div class="column">
								<EthereumBlockLoader
									network={$explorerNetwork}
									blockNumber={$query}
									provider={$explorerProvider}
									transactionProvider={$preferences.transactionProvider}
								/>
							</div>
						{:else}
							<div class="column">
								<EthereumAccountOrContract network={$explorerNetwork} addressOrEnsName={$query} provider={$explorerProvider}/>
							</div>
						{/if}
					{:else}
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
					{/if}
				{/key}
			{/if}
		</NetworkProviderLoader>
	{/if}
</section>