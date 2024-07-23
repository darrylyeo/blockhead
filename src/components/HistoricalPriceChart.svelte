<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { QuoteCurrency, TickerSymbol } from '$/data/currencies'
	import { PriceProvider } from '$/data/priceProviders'


	// Inputs
	export let historicalPriceProvider = PriceProvider.Covalent
	export let currencies: (TickerSymbol | Ethereum.ContractAddress)[]
	export let quoteCurrency: QuoteCurrency


	// Internal state
	import type { PriceScale } from './PriceChart.svelte'
	let priceScale: PriceScale


	// Components
	import Collapsible from './Collapsible.svelte'
	import CovalentPriceChart from './CovalentPriceChart.svelte'
</script>


<Collapsible
	type="label"
>
	<svelte:fragment slot="title">
		<slot name="title">
			<h3>Historical Price</h3>
		</slot>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">{historicalPriceProvider}</span>
	</svelte:fragment>

	<CovalentPriceChart
		{historicalPriceProvider}
		{currencies}
		{quoteCurrency}
		{priceScale}
	/>

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
