<script lang="ts">
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import type { Covalent } from '../data/analytics/covalent'
	import { getHistoricalPrices } from '../data/analytics/covalent'
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'
	
	export let provider: AnalyticsProvider
	export let currencies: TickerSymbol[]
	export let quoteCurrency: QuoteCurrency
	export let fromDate = '2018-01-01'
	export let toDate = new Date().toISOString().slice(0, 10) // today's date
	export let fromPrice = 0
	export let toPrice = 1000

	$: historicalPriceLogo = ({
		'Covalent': '/logos/covalent-logomark.svg'
	})[provider]

	import Loader from './Loader.svelte'
	import PriceChart from './PriceChart.svelte'
</script>

{#if provider === 'Covalent'}
	<Loader
		fromPromise={() => Promise.all(
			currencies.map(async currency => {
				const data = await getHistoricalPrices({tickerSymbol: currency, quoteCurrency, from: fromDate, to: toDate})
				console.log(data)
				return {
					currency,
					prices: data.prices.map(({date, price}) => ({time: date, price}))
				}
			})
		)}
		loadingIcon={historicalPriceLogo}
		loadingIconName={provider}
		loadingMessage="Retrieving price history..."
		let:then={data}
	>
		<PriceChart
			{data}
			{quoteCurrency}
			timeRange={[fromDate, toDate]}
			priceRange={[fromPrice, toPrice]}}
		/>
	</Loader>
{/if}