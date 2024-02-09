<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { TokenWithBalance } from '$/data/tokens'
	import type { QuoteCurrency } from '$/data/currencies'
	import { networkProviderConfigByProvider } from '$/data/networkProviders'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { TokenBalancesProvider, tokenBalancesProviderIcons } from '$/data/tokenBalancesProvider'


	// Context
	import { preferences } from '$/state/preferences'


	// External state
	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let tokenBalancesProvider: TokenBalancesProvider
	export let quoteCurrency: QuoteCurrency

	// (Computed)
	export let networkProvider: NetworkProvider

	$: networkProvider = $$props.providerName ?? $preferences.rpcNetwork


	// View options
	export let showIf: (<TData = unknown> (then: TData) => boolean | any) | undefined
	export let isOpen: boolean

	export let containerClass: string
	export let contentClass: string


	// Outputs
	export let balances: TokenWithBalance[] | undefined

	$: loadingMessage = `Retrieving ${network.name} balances from ${tokenBalancesProvider === TokenBalancesProvider.RpcProvider ? networkProvider : tokenBalancesProvider}...`
	$: errorMessage = `Couldn't retrieve ${network.name} balances from ${tokenBalancesProvider}.`


	// Functions
	import { createInfiniteQuery, createQuery } from '@tanstack/svelte-query'
	import { queryStore, gql } from '@urql/svelte'
	import { ConcurrentPromiseQueue } from '$/utils/ConcurrentPromiseQueue'

	import { getViemPublicClient } from '$/data/networkProviders'

	import { airstackNetworkNames, getClient } from '$/api/airstack/index'
	import { normalizeTokenBalance as normalizeTokenBalanceAirstack } from '$/api/airstack/normalize'

	import { getErc20TokenBalances } from '$/api/chainbase'
	import { normalizeTokenBalance as normalizeTokenBalanceChainbase } from '$/api/chainbase/normalize'

	import { getTokenBalancesForAddress } from '$/api/covalent/index'
	import { normalizeTokenBalance as normalizeTokenBalanceCovalent } from '$/api/covalent/normalize'

	import { normalizeTokenBalance as normalizeTokenBalanceDecommas } from '$/api/decommas/normalize'

	import { normalizeTokenBalance as normalizeTokenBalanceLiquality } from '$/api/liquality/normalize'

	import { MoralisWeb3Api, chainCodeFromNetwork } from '$/api/moralis/web3Api/index'

	import { getWalletTokenBalance } from '$/api/quicknode/index'
	import { normalizeTokenBalance as normalizeTokenBalanceQuickNode } from '$/api/quicknode/normalize'

	import { getTokenBalances as getTokenBalancesZapper } from '$/api/zapper/index'
	import { normalizeTokenBalance as normalizeTokenBalanceZapper } from '$/api/zapper/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		layout: 'collapsible',
		collapsibleType: 'label',
		showIf,
		isOpen,
		containerClass,
		contentClass,
	}}
	loadingIcon={tokenBalancesProvider === TokenBalancesProvider.RpcProvider ? networkProviderConfigByProvider[networkProvider].icon : tokenBalancesProviderIcons[tokenBalancesProvider]}
	loadingIconName={tokenBalancesProvider}
	{loadingMessage}
	{errorMessage}
	{...{
		[TokenBalancesProvider.RpcProvider]: () => ({
			fromQuery: address && network && networkProvider && (
				createQuery({
					queryKey: ['Balances', {
						tokenBalancesProvider,
						networkProvider,
						address,
						chainId: network.chainId,
					}],
					queryFn: async () => {
						const publicClient = getViemPublicClient({
							network,
							networkProvider: networkProvider,
						})

						if(!publicClient) throw new Error(`No provider found.`)

						const balance = await publicClient.getBalance({ address })

						return [{
							token: network.nativeCurrency,
							balance,
						}]
					},
					staleTime: 10 * 1000,
				})
			),
		}),

		[TokenBalancesProvider.Airstack]: () => ({
			fromInfiniteQuery: address && network && (
				createInfiniteQuery({
					queryKey: ['Balances', {
						tokenBalancesProvider,
						networkProvider,
						address,
						chainId: network.chainId,
					}],
					initialPageParam: '',
					queryFn: async ({ pageParam: cursor }) => {
						if(!(network.chainId in airstackNetworkNames))
							throw new Error(`Airstack doesn't yet support ${network.name}.`)

						return await getClient().query(gql`
							query TokenBalances(
								$address: Identity!, 
								$blockchain: TokenBlockchain!, 
								$limit: Int!, 
								$cursor: String!
							) {
								TokenBalances(
									input: {
										filter: {
											owner: {_in: [$address]},
											tokenType: { _in: [ERC20] }
										},
										blockchain: $blockchain,
										limit: $limit,
										cursor: $cursor
									}
								) {
									TokenBalance {
										tokenAddress
										amount
										tokenType
										blockchain
										chainId
										formattedAmount
										id
										lastUpdatedBlock
										lastUpdatedTimestamp
										token {
											address
											baseURI
											chainId
											blockchain
											contractMetaData {
												description
												externalLink
												feeRecipient
												image
												name
												sellerFeeBasisPoints
											}
											contractMetaDataURI
											decimals
											id
											lastTransferBlock
											lastTransferHash
											lastTransferTimestamp
											logo {
												external
												large
												medium
												original
												small
											}
											name
											projectDetails {
												collectionName
												description
												discordUrl
												externalUrl
												twitterUrl
											}
											rawContractMetaData
											symbol
											tokenTraits
											totalSupply
											type
										}
									}
									pageInfo {
										nextCursor
										prevCursor
									}
								}
							}
						`, {
							address,
							blockchain: airstackNetworkNames[network.chainId],
							limit: 50,
							cursor,
						})
							.toPromise()
							.then(result => {
								if(result.error)
									throw result.error

								return result.data
							})
					},
					getPreviousPageParam: (firstPage) => firstPage.TokenBalances.pageInfo.prevCursor || undefined,
					getNextPageParam: (lastPage) => lastPage.TokenBalances.pageInfo.nextCursor || undefined,
					select: data => (
						(data.pages.flatMap(page => page.TokenBalances.TokenBalance))
							.map(normalizeTokenBalanceAirstack)
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[TokenBalancesProvider.Chainbase]: () => ({
			fromQuery: address && network && (
				createInfiniteQuery({
					queryKey: ['Balances', {
						tokenBalancesProvider,
						address,
						chainId: network.chainId,
					}],
					queryFn: async ({ pageParam: page }) => (
						await getErc20TokenBalances({
							address,
							chainId: network.chainId,
							page,
						})
					),
					getNextPageParam: (lastPage) => lastPage?.data.next_page,
					select: result => (
						result.pages
							.flatMap(page => page.data)
							.map(normalizeTokenBalanceChainbase)
					),
					staleTime: 10 * 1000,
				})
			),
		}),
		
		[TokenBalancesProvider.Covalent]: () => ({
			fromQuery: address && network && (
				createQuery({
					queryKey: ['Balances', {
						tokenBalancesProvider,
						address,
						chainId: network.chainId,
						quoteCurrency,
					}],
					queryFn: async () => (
						await getTokenBalancesForAddress({
							chainName: network.chainId,
							walletAddress: address,
							quoteCurrency,
							nft: false,
						})
					),
					select: result => (
						result.items
							.map(tokenBalance => normalizeTokenBalanceCovalent(tokenBalance, quoteCurrency))
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[TokenBalancesProvider.Decommas]: () => ({
			fromInfiniteQuery: address && network && (
				createInfiniteQuery({
					queryKey: ['Balances', {
						tokenBalancesProvider,
						address,
						chainId: network.chainId,
					}],
					initialPageParam: 0,
					queryFn: async ({ pageParam: offset }) => {
						const { decommas, chainNameByChainId } = await import('$/api/decommas')

						const chains = [chainNameByChainId[network.chainId]]

						const [
							coinsResponse,
							tokensResponse,
						] = await Promise.all([
							offset === 0
								? decommas.address.getCoins({
									chains,
									address,
								})
								: undefined,
							decommas.address.getTokens({
								chains,
								address,
								verified: true,
								limit: 100,
								offset,
							}),
						])

						return {
							count: (coinsResponse?.count ?? 0) + tokensResponse.count,
							result: [
								...(coinsResponse?.result ?? []),
								...tokensResponse.result,
							]
						}
					},
					getNextPageParam: (lastPage, allPages) => allPages && allPages.length * 100 < lastPage.count ? allPages.length * 100 : undefined,
					select: ({ pages }) => (
						pages
							.flatMap(result => result.result)
							.map(normalizeTokenBalanceDecommas)
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[TokenBalancesProvider.Liquality]: () => ({
			fromQuery: address && network && (
				createQuery({
					queryKey: ['Balances', {
						tokenBalancesProvider,
						address,
						chainId: network.chainId,
					}],
					queryFn: async () => {
						const { ERC20Service } = await import('@liquality/wallet-sdk')

						const { liqualitySupportedNetworks } = await import('$/api/liquality/index')

						if(!liqualitySupportedNetworks.includes(network.chainId))
							throw new Error(`Liquality doesn't yet support ${network.name}.`)

						return await ERC20Service.listAccountTokens(
							address,
							network.chainId
						)
					},
					select: assets => (
						assets.map(normalizeTokenBalanceLiquality)
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[TokenBalancesProvider.Moralis]: () => ({
			fromQuery: address && network && (
				createQuery({
					queryKey: ['Balances', {
						tokenBalancesProvider,
						address,
						chainId: network.chainId,
					}],
					queryFn: async () => {
						try {
							const chain = chainCodeFromNetwork(network)
							const nativeBalance = await MoralisWeb3Api.address.getNativeBalance({
								chain,
								address
							})
							const tokenBalances = await MoralisWeb3Api.address.getTokenBalances({
								chain,
								address
								// to_block: 
							})

							const queue = new ConcurrentPromiseQueue(3)

							const result = [
								{
									token: network.nativeCurrency,
									balance: BigInt(nativeBalance.balance),
								},
								...await Promise.all(tokenBalances.map(async tokenBalance => ({
									token: {
										symbol: tokenBalance.symbol,
										address: tokenBalance.token_address,
										name: tokenBalance.name,
										icon: tokenBalance.logo || tokenBalance.thumbnail,
										decimals: tokenBalance.decimals,
									},
									balance: BigInt(tokenBalance.balance),
									/*
									...(quoteCurrency === 'USD' || quoteCurrency === network.nativeCurrency.symbol) && (await (async () => {
										try {
											const { nativePrice, usdPrice } = await queue.enqueue(async () => await MoralisWeb3Api.erc20.getTokenPrice({ chain, address: tokenBalance.token_address }))

											return {
												conversion: {
													currency: quoteCurrency,
													rate: (
														quoteCurrency === 'USD' ?
															usdPrice
														: nativePrice ?
															Number(nativePrice.value) / (10 ** nativePrice.decimals)
														:
															undefined

													),
												}
											}
										}catch{
											return {}
										}
									})())
									*/
								})))
							]

							return result
						}catch(e){
							throw new Error(e?.error?.message ?? e?.error ?? e)
						}
					},
					staleTime: 10 * 1000,
				})
			)}),

		[TokenBalancesProvider.Zapper]: () => ({
			fromQuery: address && network && (
				createQuery({
					queryKey: ['Balances', {
						tokenBalancesProvider,
						address,
						chainId: network.chainId,
					}],
					queryFn: async () => (
						await getTokenBalancesZapper({
							network,
							address
						})
					),
					select: tokenBalances => (
						tokenBalances
							.map(normalizeTokenBalanceZapper) ?? []
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[TokenBalancesProvider.QuickNode]: () => ({
			fromQuery: address && network && (
				createQuery({
					queryKey: ['Balances', {
						tokenBalancesProvider,
						address,
						chainId: network.chainId,
					}],
					queryFn: async () => (
						await getWalletTokenBalance({
							network,
							address
						})
					),
					select: tokenWithBalance => (
						tokenWithBalance.assets.map(normalizeTokenBalanceQuickNode)
					),
					staleTime: 10 * 1000,
				})
			),
		}),
	}[tokenBalancesProvider]?.()}
	bind:result={balances}
	let:result={balances}
>
	<svelte:fragment slot="header"
		let:result={balances}
		let:status
		let:loadingMessage
		let:errorMessage
	>
		<slot name="header" {balances} {status} {loadingMessage} {errorMessage} />
	</svelte:fragment>

	<slot {balances} />
</Loader>

