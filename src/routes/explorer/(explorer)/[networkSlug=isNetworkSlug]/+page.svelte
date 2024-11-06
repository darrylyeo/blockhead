<script lang="ts">
	// Params/Context
	import {
		networkSlug,
	} from '../../_explorerParams'

	import {
		explorerNetwork,
		explorerBlockNumber,
	} from '../../_explorerContext'


	// External stores
	import { preferences } from '$/state/preferences'


	// Internal state
	$: networkProvider = $preferences.rpcNetwork

	$: showCurrentBlockHeight = true

	$: showCurrentPrice = [
		'ethereum',
		'polygon',
		'avalanche',
		'fantom',
		'bsc'
	].includes($networkSlug)

	$: showHistoricalPrice = false


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
				network={$explorerNetwork}
				blockNumber={$explorerBlockNumber}
			/>
		</section>
	{/if}

	{#if showCurrentPrice}
		<section class="card">
			<CurrentPrice
				{networkProvider}
				currentPriceProvider={$preferences.currentPriceProvider}
				query={{
					chainId: $explorerNetwork.chainId,
					erc20Token: $explorerNetwork.nativeCurrency,
				}}
				quoteCurrency={$preferences.quoteCurrency}
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

{#if $explorerNetwork}
	<EthereumBlocks
		network={$explorerNetwork}
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
