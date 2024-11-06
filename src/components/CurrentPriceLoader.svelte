<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import type { QuoteCurrency, TickerSymbol } from '$/data/currencies'
	import { PriceProvider, priceProviderIcons } from '$/data/priceProviders'
	import { ethereumMainnet, networkByChainId } from '$/data/networks'


	// Context
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
				chainId: query.erc20Token.chainId ?? 1,
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
		[PriceProvider.Chainlink]: {
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
		},

		[PriceProvider.CoinGecko_Zapper]: {
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
		},

		// [PriceProvider.Covalent]: {
		// 	fromQuery: createQuery({
		// 		queryKey: ['CurrentPrice', {
		// 			currentPriceProvider,
		// 			query: _query,
		// 			quoteCurrency,
		// 		}],
		// 		queryFn: async ({
		// 			queryKey: [_, {
		// 				query
		// 				quoteCurrency,
		// 			}],
		// 		}) => {
		// 			const { getSpotPrices } = await import('$/api/covalent')

		// 			if(!('symbol' in query))
		// 				throw new Error(`Token contract addresses not yet supported.`) 

		// 			const data = await getSpotPrices({
		// 				tickers: [query.symbol],
		// 			})

		// 			if(!data?.items?.[0])
		// 				throw new Error(`The ${token} spot price isn't currently indexed by Covalent.`)

		// 			return {
		// 				price: data.items[0].quote_rate,
		// 				rank: data.items[0].rank,
		// 				icon: data.items[0].logo_url,
		// 				updatedAt: data.updated_at
		// 			}
		// 		},
		// 	}),
		// },

		// [PriceProvider.CompoundOpenPriceFeed]: {
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
		// },

		[PriceProvider.QuickNode_Odos]: {
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
		},
	}[currentPriceProvider]}
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
