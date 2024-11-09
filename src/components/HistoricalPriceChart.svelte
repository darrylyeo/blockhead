<script lang="ts">
	// Types/constants
	import type { QuoteCurrency } from '$/data/currencies'
	import { PriceProvider } from '$/data/priceProviders'


	// Inputs
	export let historicalPriceProvider = PriceProvider.CoinPaprika
	export let query: HistoricalPricesLoader['$$prop_def']['query']
	export let quoteCurrency: QuoteCurrency
	export let fromDate = Date.now() - 29 * 24 * 60 * 60 * 1000
	export let toDate = Date.now()


	// Internal state
	import type { PriceScale } from './PriceChart.svelte'
	let priceScale: PriceScale = 'logarithmic'
	let fromPrice = 0
	let toPrice = 1000


	// Components
	import Collapsible from './Collapsible.svelte'
	import HistoricalPricesLoader from './HistoricalPricesLoader.svelte'
	import PriceChart from './PriceChart.svelte'
</script>


<Collapsible
	type="label"
	class="column"
	{...$$restProps}
>
	<svelte:fragment slot="title">
		<slot name="title">
			<h3>Historical Price</h3>
		</slot>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">{historicalPriceProvider}</span>
	</svelte:fragment>

	<HistoricalPricesLoader
		{historicalPriceProvider}
		{query}
		{quoteCurrency}
		{fromDate}
		{toDate}
		let:coinsWithHistoricalPrices
	>
		{#if coinsWithHistoricalPrices}
			<PriceChart
				{coinsWithHistoricalPrices}
				{quoteCurrency}
				timeRange={[fromDate, toDate]}
				priceRange={[fromPrice, toPrice]}
				{priceScale}
			/>
		{/if}
	</HistoricalPricesLoader>

	<footer class="options bar wrap">
		<h4>Show</h4>

		<label>
			<span>Price Scale</span>
			<select bind:value={priceScale}>
				<option value="logarithmic">Logarithmic</option>
				<option value="linear">Linear</option>
				<option value="linearFromZero">Linear From Zero</option>
			</select>
		</label>
	</footer>
</Collapsible>


<style>
	.options {
		font-size: calc(var(--options-size, 1) * 1em);
	}
</style>
