<script lang="ts">
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import type { Covalent } from '../data/analytics/covalent'
	import { getHistoricalPrices } from '../data/analytics/covalent'
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'
	
	export let provider: AnalyticsProvider
	export let currency: TickerSymbol
	export let quoteCurrency: QuoteCurrency
	export let fromDate = '2018-01-01'
	export let toDate = new Date().toISOString().slice(0, 10) // today's date
	export let fromPrice = 0
	export let toPrice = 1000


	const dayToTimestamp = (day: Covalent.Day) => new Date(day).valueOf() / 86400000
	
	$: fromDateTimestamp = dayToTimestamp(fromDate)
	$: toDateTimestamp = dayToTimestamp(toDate)


	$: historicalPriceLogo = ({
		'Covalent': '/logos/covalent-logomark.svg'
	})[provider]

	import Loading from "./Loading.svelte"
</script>

<style>
	svg {
		width: 100%;
	}
	.price-line {
		fill: var(--primary-color);
		stroke: rgba(0, 0, 0, 0.3);
		stroke-width: 5;
		stroke-linejoin: round;
		transform: scale(1, -1);
	}
</style>

{#if provider === 'Covalent'}
	{#await getHistoricalPrices({tickerSymbol: currency, quoteCurrency, from: fromDate, to: toDate})}
		<Loading iconAnimation="hover">
			<img slot="icon" src={historicalPriceLogo} alt={provider} width="32">
			Retrieving price history...
		</Loading>
	{:then result}
		<!-- <svg height="300" viewBox="0 0 1 1"> -->
		<svg height="300" viewBox="{fromDateTimestamp} {-toPrice} {toDateTimestamp - fromDateTimestamp} {toPrice - fromPrice}">
			<g class="price-line"><!-- style="--x-start: {fromDateTimestamp}; --x-end: {toDateTimestamp}; --y-start: {fromPrice}; --y-end: {toPrice};" -->
				<polyline
					points={[
						[toDateTimestamp, 0],
						[fromDateTimestamp, 0],
						...result.prices.map(({date, price}) => [dayToTimestamp(date), price]).reverse()
					].map(point => point.join(' ')).join(',')}
				></polyline>
			</g>
		</svg>
	{:catch error}
		<div class="card">
			{error}
		</div>
	{/await}
{/if}