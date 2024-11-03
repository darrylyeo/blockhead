<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import type { QuoteCurrency, TickerSymbol } from '$/data/currencies'
	import { PriceProvider, priceProviderIcons } from '$/data/priceProviders'
	import { ethereumMainnet } from '$/data/networks'


	// Context
	import { preferences } from '$/state/preferences'


	// Inputs
	export let currentPriceProvider: PriceProvider
	$: currentPriceProvider = $$props.currentPriceProvider || $preferences.currentPriceProvider
	export let oracleNetwork: Ethereum.Network | undefined = ethereumMainnet
	export let networkProvider: NetworkProvider

	export let network: Ethereum.Network | undefined
	export let token: TickerSymbol
	export let quoteCurrency: QuoteCurrency

	export let blockNumber: number


	// Functions
	import { createQuery } from '@tanstack/svelte-query'
	import { getViemPublicClient } from '$/data/networkProviders'


	// Outputs
	export let result


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	{...$$props}
	loadingIcon={priceProviderIcons[currentPriceProvider]}
	loadingIconName={currentPriceProvider}
	loadingMessage="Retrieving price from {currentPriceProvider}..."
	errorMessage="{token} price not available"
	{...{
		[PriceProvider.Chainlink]: {
			fromQuery: oracleNetwork && createQuery({
				queryKey: ['CurrentPrice', {
					currentPriceProvider,
					oracleChainId: oracleNetwork?.chainId,
					chainId: network?.chainId,
					token,
					quoteCurrency,
					blockNumber,
				}],
				queryFn: async ({
					queryKey: [_, {
						currentPriceProvider,
						oracleChainId,
						chainId,
						token,
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

					return await getChainlinkPriceFeed(
						oraclePublicClient,
						oracleNetwork,
						token,
						quoteCurrency,
					)
				},
			}),
		},

		// [PriceProvider.Covalent]: {
		// 	fromQuery: createQuery({
		// 		queryKey: ['CurrentPrice', {
		// 			currentPriceProvider,
		// 			chainId: network?.chainId,
		// 			token,
		// 			quoteCurrency,
		// 		}],
		// 		queryFn: async ({
		// 			queryKey: [_, {
		// 				token,
		// 				quoteCurrency,
		// 			}],
		// 		}) => {
		// 			const { getSpotPrices } = await import('$/api/covalent')

		// 			const data = await getSpotPrices({
		// 				tickers: [token],
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
		// 			chainId: network?.chainId,
		// 			token,
		// 			quoteCurrency,
		// 		}],
		// 		queryFn: async ({
		// 			queryKey: [_, {
		// 				token,
		// 				quoteCurrency,
		// 			}],
		// 		}) => {
		// 			const { getCompoundPriceFeed } = await import('.$/data/ethereum/price/compound-price-feed')

		// 			return await getCompoundPriceFeed(
		// 				token,
		// 				quoteCurrency,
		// 			)
		// 		},
		// 	}),
		// },
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
