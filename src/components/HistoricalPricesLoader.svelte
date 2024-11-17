<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { QuoteCurrency, TickerSymbol } from '$/data/currencies'
	import type { Coin, CoinWithHistoricalPrices } from '$/data/coins'
	import { HistoricalPriceProvider, priceProviderIcons } from '$/data/priceProviders'
	import { networkByChainId } from '$/data/networks'


	// Inputs
	export let historicalPriceProvider: HistoricalPriceProvider
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
		[HistoricalPriceProvider.Covalent]: () => ({
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

		[HistoricalPriceProvider.CoinPaprika]: () => ({
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
									return null
									// throw new Error(`No CoinPaprika ticker ID found for ${coin.symbol}.`)

								const data = await getCoinsByCoinIdOhlcvHistorical(
									tickerId,
									(
										new Date(
											Math.max(
												fromDate,
												toDate - 29 * 24 * 60 * 60 * 1000,
											)
										)
											.toISOString()
									),
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
					...queries.find(query => query.isSuccess) ?? queries[0],
					data: (
						queries
							.filter(query => query.isSuccess)
							.map(query => query.data)
							.filter(isTruthy)
					),
				}),
			}),
		}),

		[HistoricalPriceProvider.OneInch_Charts]: () => ({
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
								const { getTokenPriceHistory } = await import('$/api/1inch/charts')
								
								if(!('contractAddress' in coin && coin.chainId))
									throw new Error('1inch Charts only supports tokens with contract addresses')

								return await getTokenPriceHistory({
									token0: coin.contractAddress,
									token1: quoteCurrency === 'USD' && coin.chainId === 1 ? '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' : '',
									period: 'AllTime',
									chainId: coin.chainId,
								})
							},
							select: result => ({
								coin,
								quoteCurrency,
								prices: result.data.map(item => ({
									time: new Date(item.time * 1000).toISOString().slice(0, 10),
									price: item.value,
								})),
							}),
						}))
				),
				combine: queries => ({
					...queries[0],
					data: queries
						.map(query => query.data)
						.filter(isTruthy)
				}),
			})
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
