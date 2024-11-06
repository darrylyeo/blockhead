<script lang="ts">
	// Context
	import { explorerContext } from '../../_explorerContext.svelte'


	// External stores
	import { preferences } from '$/state/preferences'


	// Internal state
	const networkProvider = $derived(
		$preferences.rpcNetwork
	)

	let showCurrentBlockHeight = $state(true)

	let showCurrentPrice = $state(true)

	let showHistoricalPrice = $state(false)


	// Components
	import CurrentPrice from '$/components/CurrentPrice.svelte'
	import EthereumBlockHeight from '$/components/EthereumBlockHeight.svelte'
	import EthereumBlocks from '$/components/EthereumBlocks.svelte'
	import HistoricalPriceChart from '$/components/HistoricalPriceChart.svelte'
</script>


<div class="row wrap">
	{#if showCurrentBlockHeight}
		<section class="card">
			<EthereumBlockHeight
				network={explorerContext.network}
				blockNumber={explorerContext.blockNumber}
			/>
		</section>
	{/if}

	{#if showCurrentPrice}
		<section class="card">
			<CurrentPrice
				{networkProvider}
				currentPriceProvider={$preferences.currentPriceProvider}
				query={{
					chainId: explorerContext.network.chainId,
					symbol: explorerContext.network.nativeCurrency.symbol,
				}}
				quoteCurrency={$preferences.quoteCurrency}
				blockNumber={explorerContext.blockNumber}
			/>
		</section>
	{/if}
</div>

{#if showHistoricalPrice}
	<div class="row">
		<section class="card">
			<HistoricalPriceChart
				historicalPriceProvider={$preferences.historicalPriceProvider}
				query={{
					coins: [
						{
							chainId: explorerContext.network.chainId,
							erc20Token: {
								address: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
								...explorerContext.network.nativeCurrency,
							},
						},
					],
				}}
				quoteCurrency={$preferences.quoteCurrency}
			/>
		</section>
	</div>
{/if}

{#if explorerContext.network}
	<EthereumBlocks
		network={explorerContext.network}
	/>
{/if}


<style>
	.row {
		align-items: stretch;
	}
	.row > * {
		flex: 1 20rem;
	}
</style>
