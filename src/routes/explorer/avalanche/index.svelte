<script lang="ts">
	import type { Ethereum } from '../../../data/ethereum/types'
	import { getContext } from 'svelte'
	import { preferredAnalyticsProvider, preferredQuoteCurrency, preferredPriceFeedProvider } from '../../../data/ethereum/preferences'
	import type { PriceScale } from '../../../components/PriceChart.svelte'
	
	const provider = getContext<Ethereum.Provider>('provider')

	let priceScale: PriceScale

	import CovalentPriceChart from '../../../components/CovalentPriceChart.svelte'
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
		<CovalentPriceChart
			provider={$preferredAnalyticsProvider}
			quoteCurrency={$preferredQuoteCurrency}
			currencies={['AVAX']}
			{priceScale}
		/>
		<div class="bar">
			<h4>Show</h4>
			<label>
				<span>Price Scale</span>
				<select bind:value={priceScale}>
					<option value="logarithmic">Logarithmic</option>
					<option value="linear">Linear</option>
					<option value="linearFromZero">Linear From Zero</option>
				</select>
			</label>
		</div>
	</section>
</div>