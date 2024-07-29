<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'
	import type { Covalent } from '$/api/covalent'
	import { getHistoricalPricesByTickerSymbol, getHistoricalPricesByAddress } from '$/api/covalent'
	import type { QuoteCurrency, TickerSymbol } from '$/data/currencies'
	import type { PriceScale } from './PriceChart.svelte'
	import { PriceProvider, priceProviderIcons } from '$/data/priceProviders'


	export let historicalPriceProvider: PriceProvider
	export let currencies: (TickerSymbol | Ethereum.ContractAddress)[]
	export let chainID: Ethereum.ChainId = 1
	export let quoteCurrency: QuoteCurrency
	export let fromDate = '2017-01-01'
	export let toDate = new Date().toISOString().slice(0, 10) // today's date
	export let fromPrice = 0
	export let toPrice = 1000
	export let priceScale: PriceScale


	import { isEvmAddress } from '$/utils/isEvmAddress'
	import { promiseAllFulfilled } from '$/utils/promiseAllFulfilled'


	import Loader from './Loader.svelte'
	import PriceChart from './PriceChart.svelte'


	import { CovalentIcon } from '$/assets/icons'
	import { parallelLoaderStore } from '$/utils/parallelLoaderStore';
</script>


<!-- {#if historicalPriceProvider === PriceProvider.Covalent && currencies}
	<Loader
		fromStore={() =>
			parallelLoaderStore(currencies, async currency => {
				if(currency.toLowerCase() === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
					currency = 'ETH'
				
				const _isAddress = isEvmAddress(currency)

				const data = _isAddress
					? await getHistoricalPricesByAddress({chainId, contractAddress: currency, quoteCurrency, from: fromDate, to: toDate})
					: await getHistoricalPricesByTickerSymbol({tickerSymbol: currency, quoteCurrency, from: fromDate, to: toDate})

				return {
					currency: _isAddress ? data.contract_ticker_symbol : currency,
					prices: data.prices.map(({date, price}) => ({time: date, price}))
				}
			})
		}

		loadingIcon={priceProviderIcons[historicalPriceProvider]}
		loadingIconName={historicalPriceProvider}
		loadingMessage="Retrieving price history from {historicalPriceProvider}..."
		then={data => [...data.values()]}
		let:result={data}
		showIf={data => data.length}
	>
		<slot name="header"></slot>

		<PriceChart
			{data}
			{quoteCurrency}
			timeRange={[fromDate, toDate]}
			priceRange={[fromPrice, toPrice]}}
			{priceScale}
		/>
	</Loader>
{/if} -->

<!-- () => Promise.all(
	currencies.map(async currency => {
		const data = await getHistoricalPrices({tickerSymbol: currency, quoteCurrency, from: fromDate, to: toDate})
		console.log(data)
		return {
			currency,
			prices: data.prices.map(({date, price}) => ({time: date, price}))
		}
	})
) -->

<!-- currencies ?
	() => Promise.all(
		currencies.map(async currency => {
			const data = await getHistoricalPrices({tickerSymbol: currency, quoteCurrency, from: fromDate, to: toDate})
			console.log(data)
			return {
				currency,
				prices: data.prices.map(({date, price}) => ({time: date, price}))
			}
		})
	)
: contractAddresses ?
	async () => {
		const data = await getHistoricalPricesByAddresses({contractAddresses, quoteCurrency, from: fromDate, to: toDate, chainId})
		console.log('getHistoricalPricesByAddresses', data)
		return data.map(tokenWithPrices => ({
			currency: tokenWithPrices.contract_ticker_symbol,
			prices: tokenWithPrices.prices.map(({date, price}) => ({time: date, price}))
		}))
	}
:
	undefined -->