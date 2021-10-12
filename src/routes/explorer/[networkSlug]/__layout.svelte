<script lang="ts">
	import type { Ethereum } from '../../../data/ethereum/types'
	import { getContext } from 'svelte'

	const networkSlug = getContext<SvelteStore<string>>('networkSlug')

	$: showCurrentBlockHeight = true
	$: showCurrentPrice = ['ethereum', 'polygon', 'avalanche', 'fantom', 'bsc'].includes($networkSlug)
	$: showHistoricalPrice = ['ethereum', 'polygon', 'avalanche', 'fantom', 'bsc'].includes($networkSlug)

	let placeholder
	// $: placeholder = {
	// 	'avalanche': 'C-Chain Address (0xabcd...6789) / Avvy Domain (avvy.avax)'
	// }


	const explorerNetwork = getContext<SvelteStore<Ethereum.Network>>('explorerNetwork')
	const explorerProvider = getContext<SvelteStore<Ethereum.Provider>>('explorerProvider')
	const blockNumber = getContext<SvelteStore<number>>('blockNumber')

	const ethereumNetwork = getContext<SvelteStore<Ethereum.Network>>('ethereumNetwork')
	const ethereumProvider = getContext<SvelteStore<Ethereum.Provider>>('ethereumProvider')


	import type { Writable } from 'svelte/store'

	const query = getContext<Writable<string>>('query')

	$: currentQuery = $query
	

	import { preferences } from '../../../data/ethereum/preferences'


	const isAddress = query => /^0x[0-9a-f]{40}$/i.test(query)
	const isTransaction = query => /^0x[0-9a-f]{64}$/i.test(query)
	const isBlockNumber = query => /^[0-9]+$/i.test(query)


	import AddressField from '../../../components/AddressField.svelte'
	import NetworkProviderLoader from '../../../components/NetworkProviderLoader.svelte'

	import HistoricalPriceChart from '../../../components/HistoricalPriceChart.svelte'
	import CurrentPrice from '../../../components/CurrentPrice.svelte'
	import EthereumBlockHeight from '../../../components/EthereumBlockHeight.svelte'

	import EthereumAccount from '../../../components/EthereumAccount.svelte'
	import EthereumBlockLoader from '../../../components/EthereumBlockLoader.svelte'
	import EthereumTransactionLoader from '../../../components/EthereumTransactionLoader.svelte'

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

	<NetworkProviderLoader
		network={$explorerNetwork}
		providerPromise={$explorerProvider && (async () => $explorerProvider)}
		providerName={$preferences.rpcNetwork}
	>
		{#if $explorerProvider}
			{#if $query}
				{#if isTransaction($query)}
					<div class="column">
						<EthereumTransactionLoader
							network={$explorerNetwork}
							transactionID={$query}
							provider={$explorerProvider}
				
							detailLevel="exhaustive"
							showValues="both"
							showFees={true}
				
							layout="standalone"
						/>
					</div>
				{:else if isBlockNumber($query)}
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
						<EthereumAccount network={$explorerNetwork} addressOrENSName={$query} provider={$explorerProvider}/>
					</div>
				{/if}
			{:else}
				<div class="row">
					{#if showCurrentBlockHeight}
						<section class="card">
							<EthereumBlockHeight
								network={$explorerNetwork}
								provider={$explorerProvider}
								blockNumber={$blockNumber}
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
								blockNumber={$blockNumber}
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
		{/if}
	</NetworkProviderLoader>
</section>