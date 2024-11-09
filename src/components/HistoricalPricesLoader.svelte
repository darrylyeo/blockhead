<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { QuoteCurrency, TickerSymbol } from '$/data/currencies'
	import type { Coin, CoinWithHistoricalPrices } from '$/data/coins'
	import { PriceProvider, priceProviderIcons } from '$/data/priceProviders'
	import { networkByChainId } from '$/data/networks'


	// Inputs
	export let historicalPriceProvider: PriceProvider
	export let query: {
		coins: Coin[]
	}
	export let quoteCurrency: QuoteCurrency
	export let fromDate: number
	export let toDate: number


	// Functions
	import { isTruthy } from '$/utils/isTruthy'


	// Queries
	import { createQueries } from '@tanstack/svelte-query'
	import { getQuicknodeEndpoint } from '$/api/quicknode'


	// Components
	import Loader from './Loader.svelte'


	// Outputs
	export let coinsWithHistoricalPrices: CoinWithHistoricalPrices[]

	type SharedSlotProps = {
		coinsWithHistoricalPrices: typeof coinsWithHistoricalPrices
	}

	type $$Slots = {
		header: SharedSlotProps
		default: SharedSlotProps
	}


	// Internal state
	let resolvedQuery: {
		coins: (
			| {
				chainId: Ethereum.ChainId
				contractAddress: Ethereum.ContractAddress
				symbol?: TickerSymbol
			}
			| {
				symbol: TickerSymbol
			}
		)[]
	}
	$: resolvedQuery = {
		coins: (
			query.coins
				.map(coin => (
					'erc20Token' in coin ?
						{
							chainId: coin.erc20Token.chainId ?? coin.chainId ?? 1,
							contractAddress: coin.erc20Token.address,
							symbol: coin.erc20Token.symbol,
						}
					: coin.symbol === 'ETH' ?
						{
							chainId: 'chainId' in coin ? coin.chainId : undefined,
							contractAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
							symbol: 'ETH',
						}
					:
						coin
				))
		)
	}
</script>


<Loader
	{...$$props}
	loadingIcon={priceProviderIcons[historicalPriceProvider]}
	loadingIconName={historicalPriceProvider}
	loadingMessage="Retrieving price history from {historicalPriceProvider}..."
	{...{
		[PriceProvider.Covalent]: () => ({
			fromQuery: createQueries({
				queries: (
					resolvedQuery.coins
						.map(coin => ({
							queryKey: ['HistoricalPrice', {
								historicalPriceProvider,
								coin,
								quoteCurrency,
								fromDate,
								toDate,
							}],
							queryFn: async ({
								queryKey: [_, {
									coin,
								}],
							}) => {
								const { getHistoricalPricesByAddress, getHistoricalPricesByTickerSymbol } = await import('$/api/covalent')

								const data = (
									'contractAddress' in coin && coin.contractAddress ?
										await getHistoricalPricesByAddress({
											chainId: coin.chainId,
											contractAddress: coin.contractAddress,
											quoteCurrency,
											from: new Date(fromDate).toISOString().slice(0, 10),
											to: new Date(toDate).toISOString().slice(0, 10),
										})
									:
										await getHistoricalPricesByTickerSymbol({
											chainId: coin.chainId,
											tickerSymbol: (
												!coin.symbol && coin.contractAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
													? networkByChainId.get(coin.chainId)?.nativeCurrency.symbol
													: coin.symbol
											),
											quoteCurrency,
											from: new Date(fromDate).toISOString().slice(0, 10),
											to: new Date(toDate).toISOString().slice(0, 10),
										})
								)[0]

								return {
									coin,
									quoteCurrency,
									prices: (
										data.prices
											.map(item => ({
												time: item.date,
												price: item.price,
											}))
									),
								}
							}
						}))
				),
				combine: queries => ({
					...queries[0],
					data: (
						queries
							.map(query => query.data)
							.filter(isTruthy)
					),
				}),
			})
		}),

		[PriceProvider.CoinPaprika]: () => ({
			fromQuery: createQueries({
				queries: (
					resolvedQuery.coins
						.map(coin => ({
							queryKey: ['HistoricalPrice', {
								historicalPriceProvider,
								coin,
								quoteCurrency,
								fromDate,
								toDate,
							}],
							queryFn: async ({
								queryKey: [_, {
									coin,
								}],
							}) => {
								const { getCoinsByCoinIdOhlcvHistorical } = await import('$/api/coinpaprika/api')
								const { tickerIdForSymbol } = await import('$/api/coinpaprika')

								if(!('symbol' in coin && coin.symbol))
									throw new Error('CoinPaprika only supports coin symbols.')

								const tickerId = tickerIdForSymbol.get(coin.symbol)
								if(!tickerId)
									throw new Error(`No CoinPaprika ticker ID found for ${coin.symbol}.`)

								const data = await getCoinsByCoinIdOhlcvHistorical(
									tickerId,
									new Date(fromDate).toISOString(),
									{
										end: new Date(toDate).toISOString(),
										quote: quoteCurrency.toLowerCase(),
									},
									{
										baseUrl: `${getQuicknodeEndpoint()}/addon/748/v1`,
									},
								)

								return {
									coin,
									quoteCurrency,
									prices: (
										data
											.map(item => ({
												time: new Date(item.time_open).toISOString().slice(0, 10),
												price: item.open,
											}))
									),
								}
							},
						}))
				),
				combine: queries => ({
					...queries[0],
					data: (
						queries
							.map(query => query.data)
							.filter(isTruthy)
					),
				}),
			}),
		})
	}[historicalPriceProvider]()}
	bind:result={coinsWithHistoricalPrices}
	let:result={coinsWithHistoricalPrices}
>
	<svelte:fragment slot="header"
		let:result={coinsWithHistoricalPrices}
	>
		<slot name="header"
			{coinsWithHistoricalPrices}
		/>
	</svelte:fragment>

	<slot
		{coinsWithHistoricalPrices}
	/>
</Loader>
