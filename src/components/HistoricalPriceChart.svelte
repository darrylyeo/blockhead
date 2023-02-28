<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'

	export let historicalPriceProvider = 'Covalent'
	export let currencies: (TickerSymbol | Ethereum.ContractAddress)[]
	export let quoteCurrency: QuoteCurrency


	import type { PriceScale } from './PriceChart.svelte'
	let priceScale: PriceScale


	import CovalentPriceChart from './CovalentPriceChart.svelte'
</script>


<style>
	.options {
		font-size: calc(var(--options-size, 1) * 1em);
	}
</style>


<div class="bar">
	<slot name="title">
		<h3>Historical Price</h3>
	</slot>
	<span class="card-annotation">{historicalPriceProvider}</span>
</div>

<CovalentPriceChart
	{historicalPriceProvider}
	{currencies}
	{quoteCurrency}
	{priceScale}
/>

<div class="options bar">
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