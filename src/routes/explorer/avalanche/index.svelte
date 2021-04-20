<script lang="ts">
	import type { Ethereum } from '../../../data/ethereum/types'
	import { getContext } from 'svelte'
	import { preferredAnalyticsProvider, preferredQuoteCurrency, preferredPriceFeedProvider } from '../../../data/ethereum/preferences'
	
	const provider = getContext<Ethereum.Provider>('provider')

	import PriceChart from '../../../components/PriceChart.svelte'
</script>

<style>
	.row {
		align-items: stretch;
		flex-wrap: wrap;
	}
	.row > * {
		flex: 1 20rem;
	}

	section :global(.token-rate) {
		font-size: 2em;
	}
</style>

<div class="row">
	<section class="card">
		<div class="bar">
			<h3>Historical Price</h3>
			<span class="card-annotation">{$preferredAnalyticsProvider}</span>
		</div>
		<PriceChart provider={$preferredAnalyticsProvider} quoteCurrency={$preferredQuoteCurrency} currency="AVAX" />
	</section>
</div>