<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import type { QuoteCurrency, TickerSymbol } from '$/data/currencies'
	import { PriceProvider, priceProviderIcons } from '$/data/priceProviders'
	import { ethereumMainnet, networkByChainId } from '$/data/networks'


	// Context
	import * as publicEnv from '$env/static/public'
	import { preferences } from '$/state/preferences'


	// Inputs
	export let currentPriceProvider: PriceProvider
	$: currentPriceProvider = $$props.currentPriceProvider || $preferences.currentPriceProvider
	export let oracleNetwork: Ethereum.Network | undefined = ethereumMainnet
	export let networkProvider: NetworkProvider

	export let query: (
		| {
			chainId: Ethereum.ChainId
			contractAddress: Ethereum.ContractAddress
			symbol?: TickerSymbol
		}
		| {
			chainId?: Ethereum.ChainId
			erc20Token: Ethereum.Erc20Token
		}
		| {
			symbol: TickerSymbol
		}
	)
	export let quoteCurrency: QuoteCurrency

	export let blockNumber: number


	// Internal state
	let _query: (
		| {
			chainId: Ethereum.ChainId
			contractAddress: Ethereum.ContractAddress
			symbol?: TickerSymbol
		}
		| {
			symbol: TickerSymbol
		}
	)
	$: _query = (
		'erc20Token' in query ?
			{
				chainId: query.erc20Token.chainId ?? query.chainId ?? 1,
				contractAddress: query.erc20Token.address,
				symbol: query.erc20Token.symbol,
			}
		:
			query
	)


	// Functions
	import { createQuery } from '@tanstack/svelte-query'
	import { getViemPublicClient } from '$/data/networkProviders'


	// Outputs
	export let result: {
		quoteCurrency: QuoteCurrency
		price: number
		updatedAt: number

		// Chainlink
		contractAddress?: Ethereum.ContractAddress

		// Covalent
		icon?: string
		rank?: number
	}

	type SharedSlotProps = {
		result: typeof result,
	}

	type $$Slots = {
		header: SharedSlotProps,
		default: SharedSlotProps,
	}


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	{...$$props}
	loadingIcon={priceProviderIcons[currentPriceProvider]}
	loadingIconName={currentPriceProvider}
	loadingMessage="Retrieving price from {currentPriceProvider}..."
	errorMessage={`${'symbol' in _query ? `${_query.symbol} price` : 'Price'} not available.`}
	{...{
		[PriceProvider.Chainlink]: () => ({
			fromQuery: oracleNetwork && createQuery({
				queryKey: ['CurrentPrice', {
					currentPriceProvider,
					oracleChainId: oracleNetwork?.chainId,
					query: _query,
					quoteCurrency,
					blockNumber,
				}],
				queryFn: async ({
					queryKey: [_, {
						currentPriceProvider,
						oracleChainId,
						query,
						quoteCurrency,
						blockNumber,
					}],
				}) => {
					const { getChainlinkPriceFeed } = await import('$/api/chainlink')

					const oraclePublicClient = getViemPublicClient({
						network: oracleNetwork,
						networkProvider,
					})

					if(!oraclePublicClient) return

					if(!('symbol' in query && query.symbol))
						throw new Error(`Token contract addresses not yet supported.`) 

					return {
						quoteCurrency,
						...await getChainlinkPriceFeed(
							oraclePublicClient,
							oracleNetwork,
							query.symbol,
							quoteCurrency,
						),
					}
				},
			}),
		}),

		[PriceProvider.CoinGecko_Zapper]: () => ({
			fromQuery: createQuery({
				queryKey: ['CurrentPrice', {
					currentPriceProvider,
					query: _query,
					quoteCurrency,
				}],
				queryFn: async ({
					queryKey: [_, {
						query,
					}],
				}) => {
					const { networkNamesByChainId } = await import('$/api/zapper')
					const { pricesControllerListPricesV3 } = await import('$/api/zapper/v2')

					const symbol = (
						'symbol' in query ?
							query.symbol
						:
							undefined
					)

					if(!('chainId' in query && query.chainId))
						throw new Error(`Chain ID not specified.`)

					const result = await pricesControllerListPricesV3({
						network: networkNamesByChainId.get(query.chainId),
					})

					const prices = JSON.parse(result)

					return prices
				},
				select: result => {
					const query = _query

					const symbol = (
						'symbol' in query ?
							query.symbol
						:
							undefined
					)

					const contractAddress = (
						symbol === 'ETH' ?
							'0x0000000000000000000000000000000000000000'
						: 'contractAddress' in query ?
							query.contractAddress
						:
							undefined
					)

					const price = result.find(tokenPrice => (
						tokenPrice.networkId === query.chainId
						&& tokenPrice.address === contractAddress
					))

					if(!price)
						throw new Error('Price not found')

					return {
						quoteCurrency: 'USD',
						price: price.price,
						updatedAt: price.priceUpdatedAt,
					}
				},
			})
		}),

		[PriceProvider.Covalent]: () => ({
			fromQuery: createQuery({
				queryKey: ['CurrentPrice', {
					currentPriceProvider,
					query: _query,
					quoteCurrency,
				}],
				queryFn: async ({
					queryKey: [_, {
						query,
						quoteCurrency,
					}],
				}) => {
					const coin = query
					const { getHistoricalPricesByTickerSymbol } = await import('$/api/covalent')
					const { getHistoricalTokenPrices } = await import('$/api/covalent/index')

					const now = new Date(Date.now()).toISOString().slice(0, 10)

					const data = (
						'contractAddress' in coin && coin.contractAddress ?
							// v2
							await getHistoricalTokenPrices({
								chainName: coin.chainId,
								quoteCurrency,
								contractAddress: coin.contractAddress,
								from: now,
								to: now,
								pricesAtAsc: true,
							})
							// v1
							// (await getHistoricalPricesByAddress({
							// 	chainId: coin.chainId,
							// 	contractAddress: coin.contractAddress,
							// 	quoteCurrency,
							// 	from: now,
							// 	to: now,
							// }))[0]
						:
							(await getHistoricalPricesByTickerSymbol({
								chainId: coin.chainId,
								tickerSymbol: (
									!coin.symbol && coin.contractAddress === '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
										? networkByChainId.get(coin.chainId)?.nativeCurrency.symbol
										: coin.symbol
								),
								quoteCurrency,
								from: now,
								to: now,
							}))[0]
					)

					const item = data.prices[data.prices.length - 1]

					return {
						quoteCurrency: 'USD',
						price: Number(item.price),
						updatedAt: new Date(data.update_at).getTime(),
					}
				},
				// queryFn: async ({
				// 	queryKey: [_, {
				// 		query,
				// 		quoteCurrency,
				// 	}],
				// }) => {
				// 	const { getSpotPrices } = await import('$/api/covalent')

				// 	if(!('symbol' in query))
				// 		throw new Error(`Token contract addresses not yet supported.`) 

				// 	const data = await getSpotPrices({
				// 		tickers: [query.symbol],
				// 	})

				// 	console.log({data})

				// 	if(!data?.items?.[0])
				// 		throw new Error(`The ${query.symbol} spot price isn't currently indexed by Covalent.`)

				// 	return {
				// 		price: data.items[0].quote_rate,
				// 		rank: data.items[0].rank,
				// 		icon: data.items[0].logo_url,
				// 		updatedAt: data.updated_at
				// 	}
				// },
			}),
		}),

		// [PriceProvider.CompoundOpenPriceFeed]: () => ({
		// 	fromQuery: createQuery({
		// 		queryKey: ['CurrentPrice', {
		// 			currentPriceProvider,
		// 			query: _query,
		// 			quoteCurrency,
		// 		}],
		// 		queryFn: async ({
		// 			queryKey: [_, {
		// 				quoteCurrency,
		// 				query,
		// 			}],
		// 		}) => {
		// 			const { getCompoundPriceFeed } = await import('.$/data/ethereum/price/compound-price-feed')
					
		// 			if(!('symbol' in query))
		// 				throw new Error(`Token contract addresses not yet supported.`) 

		// 			return await getCompoundPriceFeed(
		// 				query.symbol,
		// 				quoteCurrency,
		// 			)
		// 		},
		// 	}),
		// }),

		[PriceProvider.Etherscan]: () => ({
			fromQuery: createQuery({
				queryKey: ['CurrentPrice', {
					currentPriceProvider,
					query: _query,
					quoteCurrency,
				}],
				queryFn: async ({
					queryKey: [_, {
						query,
					}],
				}) => {
					const { Etherscan } = await import('$/api/etherscan')

					const network = networkByChainId.get(query.chainId)

					if(!network)
						throw new Error(`Network not supported.`)

						console.log({query})

					if(!(
						(!query.erc20Token?.contractAddress || query.erc20Token.contractAddress === '0x0000000000000000000000000000000000000000')
						&& query.symbol === network.nativeCurrency.symbol
					))
						throw new Error(`Etherscan doesn't support fetching prices for tokens other than the native currency.`)

					return await Etherscan.Stats.getPrice({
						chainId: query.chainId,
					})
				}
			}),
			select: result => ({
				quoteCurrency: 'USD',
				price: Number(result.ethusd),
				updatedAt: Number(result.ethusd_timestamp) * 1000,
			}),
		}),

		[PriceProvider.QuickNode_Odos]: () => ({
			fromQuery: createQuery({
				queryKey: ['CurrentPrice', {
					currentPriceProvider,
					query: _query,
					quoteCurrency,
				}],
				queryFn: async ({
					queryKey: [_, {
						query,
						quoteCurrency,
					}],
				}) => {
					const { getTokenPrice } = await import('$/api/quicknode/addons/odos')

					const symbol = (
						'symbol' in query ?
							query.symbol
						:
							undefined
					)

					const contractAddress = (
						symbol === 'ETH' ?
							'0x0000000000000000000000000000000000000000'
						: 'contractAddress' in query ?
							query.contractAddress
						:
							undefined
					)

					if(!contractAddress)
						throw new Error(`Token symbols are not yet supported.`)

					if(!('chainId' in query && query.chainId))
						throw new Error(`Chain ID not specified.`)

					return await getTokenPrice({
						network: networkByChainId.get(query.chainId),
						contractAddresses: [
							contractAddress,
						],
					})
				},
				select: result => ({
					quoteCurrency: 'USD',
					price: Object.values(result)[0],
				}),
			}),
		}),

		[PriceProvider.CoinPaprika]: () => ({
			fromQuery: createQuery({
				queryKey: ['CurrentPrice', {
					currentPriceProvider,
					query: _query,
					quoteCurrency,
				}],
				queryFn: async ({
					queryKey: [_, {
						query,
						quoteCurrency,
					}],
				}) => {
					const { getTickers, getTickersById } = await import('$/api/coinpaprika/api')
					const { tickerIdForSymbol } = await import('$/api/coinpaprika')

					if(!('symbol' in query))
						throw new Error(`Token contract addresses not yet supported.`)

					const tickerId = tickerIdForSymbol.get(query.symbol)

					const result = (
						!tickerId ?
							await (async () => {
								const tickers = await getTickers({
									quotes: quoteCurrency,
								})

								for(const ticker of tickers.toReversed())
									if(ticker.symbol && ticker.id)
										tickerIdForSymbol.set(ticker.symbol, ticker.id)

								return tickers.find(ticker => (
									ticker.symbol === query.symbol
									&& (
										!('type' in ticker) || (
											query.contractAddress && query.contractAddress !== '0x0000000000000000000000000000000000000000'
												? ticker.type === 'token'
												: ticker.type === 'coin'
										)
									)
								))
							})()
						:
							await getTickersById(
								tickerId,
								{
									quotes: quoteCurrency,
								},
							)
					)

					return result
				},
				select: result => {
					if(!result?.quotes?.[quoteCurrency])
						throw new Error(`Price not available in ${quoteCurrency}`)

					return {
						quoteCurrency,
						price: result.quotes[quoteCurrency].price,
						updatedAt: result.last_updated ? new Date(result.last_updated).getTime() : undefined,
						rank: result.rank,
					}
				},
			}),
		}),

		[PriceProvider.CoinApi]: () => ({
			fromQuery: createQuery({
				queryKey: ['CurrentPrice', {
					currentPriceProvider,
					query: _query,
					quoteCurrency,
				}],
				queryFn: async ({
					queryKey: [_, {
						query,
					}],
				}) => {
					const { getSpecificRate } = await import('$/api/coinapi/market-data/rest')

					if(!('symbol' in query))
						throw new Error(`Token contract addresses not yet supported.`)

					const result = await getSpecificRate(
						query.symbol,
						quoteCurrency,
						{},
						{
							headers: {
								'X-CoinAPI-Key': publicEnv.PUBLIC_COINAPI_MARKETDATA_API_KEY,
							},
						},
					)

					if(!result?.rate)
						throw new Error(`Price not available in ${quoteCurrency}`)

					return {
						quoteCurrency,
						price: result.rate,
						updatedAt: result.time && new Date(result.time).getTime(),
					}
				}
			})
		}),
	}[currentPriceProvider]()}
	bind:result
	let:result
	let:status
>
	<svelte:fragment slot="header"
		let:result
		let:status
		let:isOpen let:toggle
	>
		<slot name="header"
			{result}
			{status}
			{isOpen} {toggle}
		/>
	</svelte:fragment>

	<slot
		{result}
		{status}
	/>
</Loader>
