<script lang="ts">
	import type { Ethereum } from '../../../data/ethereum/types'
	import { getContext } from 'svelte'
	import { preferredAnalyticsProvider, preferredQuoteCurrency, preferredOracleProvider } from '../../../data/ethereum/preferences'


	const explorerNetwork = getContext<SvelteStore<Ethereum.Network>>('explorerNetwork')
	const explorerProvider = getContext<SvelteStore<Ethereum.Provider>>('explorerProvider')
	const blockNumber = getContext<SvelteStore<number>>('blockNumber')


	const ethereumNetwork = getContext<SvelteStore<Ethereum.Network>>('ethereumNetwork')
	const ethereumProvider = getContext<SvelteStore<Ethereum.Provider>>('ethereumProvider')


	import EthereumBlockHeight from '../../../components/EthereumBlockHeight.svelte'
	import HistoricalPriceChart from '../../../components/HistoricalPriceChart.svelte'
</script>

<style>
	.row {
		align-items: stretch;
	}
	.row > * {
		flex: 1 20rem;
	}
</style>

<div class="row">
	<section class="card">
		<EthereumBlockHeight
			network={$explorerNetwork}
			provider={$explorerProvider}
			blockNumber={$blockNumber}
		/>
	</section>

	<!-- <section class="card">
		<CurrentPrice
			priceProvider={$preferredOracleProvider}
			token={$explorerNetwork.nativeCurrency.symbol}
			quoteCurrency={$preferredQuoteCurrency}
			provider={$explorerProvider}
			network={$ethereumNetwork}
			blockNumber={$blockNumber}
		/>
	</section> -->
</div>

<div class="row">
	<section class="card">
		<HistoricalPriceChart
			analyticsProvider={$preferredAnalyticsProvider}
			currencies={[$explorerNetwork.nativeCurrency.symbol]}
			quoteCurrency={$preferredQuoteCurrency}
		/>
	</section>
</div>