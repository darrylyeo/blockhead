<script lang="ts">
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import type { Ethereum } from '../data/ethereum/types'
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'

	export let analyticsProvider: AnalyticsProvider = 'Covalent'
	export let currencies: (TickerSymbol | Ethereum.ContractAddress)[]
	export let quoteCurrency: QuoteCurrency


	import type { PriceScale } from './PriceChart.svelte'
	let priceScale: PriceScale


	import CovalentPriceChart from './CovalentPriceChart.svelte'
</script>

<div class="bar">
	<slot name="title">
		<h3>Historical Price</h3>
	</slot>
	<span class="card-annotation">{analyticsProvider}</span>
</div>

<CovalentPriceChart
	{analyticsProvider}
	{currencies}
	{quoteCurrency}
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