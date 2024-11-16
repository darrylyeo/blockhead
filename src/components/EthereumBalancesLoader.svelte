<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { TokenWithBalance } from '$/data/tokens'
	import type { QuoteCurrency } from '$/data/currencies'
	import { DefiProvider } from '$/data/defiProviders'
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

	type SharedSlotProps = {
		balances: typeof balances,
		status: Loader<any, any, any, any>['$$slot_def']['default']['status'],
		pagination: Loader<any, any, any, any>['$$slot_def']['default']['pagination'],
		isOpen: Loader<any, any, any, 'collapsible'>['$$slot_def']['default']['isOpen'],
		toggle: Loader<any, any, any, 'collapsible'>['$$slot_def']['default']['toggle'],
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps & {
			loadingMessage: Loader<any, any, any, any>['$$slot_def']['header']['loadingMessage'],
			errorMessage: Loader<any, any, any, any>['$$slot_def']['header']['errorMessage'],
		},
	}


	// Internal state
	$: loadingMessage = `Retrieving ${network.name} balances from ${tokenBalancesProvider === TokenBalancesProvider.RpcProvider ? networkProvider : tokenBalancesProvider}...`
	$: errorMessage = `Couldn't retrieve ${network.name} balances from ${tokenBalancesProvider}.`


	// Functions
	import { createInfiniteQuery, createQuery, createQueries } from '@tanstack/svelte-query'
	import { ConcurrentPromiseQueue } from '$/utils/ConcurrentPromiseQueue'
	import { isTruthy } from '$/utils/isTruthy'

	import { normalizeTokenBalance as normalizeTokenBalanceAirstack } from '$/api/airstack/normalize'

	import { normalizeTokenBalance as normalizeTokenBalanceBlockscout } from '$/api/blockscout/rest/normalize'

	import { normalizeTokenBalance as normalizeTokenBalanceChainbase } from '$/api/chainbase/normalize'

	import { normalizeTokenBalance as normalizeTokenBalanceCovalent } from '$/api/covalent/normalize'

	import { normalizeTokenBalance as normalizeTokenBalanceDecommas } from '$/api/decommas/normalize'

	import { normalizeTokenBalance as normalizeTokenBalanceLiquality } from '$/api/liquality/normalize'

	import { supportedChains } from '$/api/defillama/llamafolio';
	import { normalizeTokenBalances as normalizeTokenBalancesLlamafolio } from '$/api/defillama/llamafolio/normalize';

	import { normalizeTokenBalance as normalizeTokenBalanceNexandria } from '$/api/nexandria/normalize'

	import { normalizeTokenBalance as normalizeTokenBalanceNoves } from '$/api/noves/normalize'

	import { normalizeTokenBalance as normalizeTokenBalanceOneinch } from '$/api/1inch/balances/normalize'

	import { normalizeTokenBalance as normalizeTokenBalanceQuickNode } from '$/api/quicknode/normalize'

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
					queryFn: async ({
						queryKey: [_, {
							address,
							chainId,
						}],
					}) => {
						const { getViemPublicClient } = await import('$/data/networkProviders')
						const { getBalance } = await import('viem/actions')

						const publicClient = getViemPublicClient({
							network,
							networkProvider: networkProvider,
						})

						if(!publicClient) throw new Error(`No provider found.`)

						const balance = await getBalance(publicClient, {
							address,
						})

						return [{
							token: {
								chainId,
								...network.nativeCurrency
							},
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
					queryFn: async ({
						queryKey: [_, {
							address,
							chainId,
						}],
						pageParam: cursor,
					}) => {
						const { getTokenBalances } = await import('$/api/airstack')

						return await getTokenBalances({
							network,
							address,
							cursor,
							limit: 100,
						})
					},
					getPreviousPageParam: (firstPage) => firstPage?.TokenBalances?.pageInfo?.prevCursor ?? undefined,
					getNextPageParam: (lastPage) => lastPage?.TokenBalances?.pageInfo?.nextCursor ?? undefined,
					select: data => (
						data.pages
							.flatMap(page => page?.TokenBalances?.TokenBalance ?? [])
							.map(tokenWithBalance => (
								normalizeTokenBalanceAirstack(tokenWithBalance, network.chainId)
							))
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[TokenBalancesProvider.Blockscout]: () => ({
			fromQuery: address && network && (
				createQuery({
					queryKey: ['Balances', {
						tokenBalancesProvider,
						address,
						chainId: network.chainId,
					}],
					queryFn: async ({
						queryKey: [_, {
							address,
							chainId,
						}],
					}) => {
						const { getAddressTokenBalances } = await import('$/api/blockscout/rest')
						const { getBlockscoutRestEndpoint } = await import('$/api/blockscout/index')

						return await getAddressTokenBalances(
							address,
							{
								baseUrl: getBlockscoutRestEndpoint(chainId),
							}
						)
					},
					select: (result) => (
						result
							.filter(tokenBalance => (
								tokenBalance.token.type === 'ERC-20'
							))
							.map(tokenBalance => (
								normalizeTokenBalanceBlockscout(
									tokenBalance,
									network.chainId,
								)
							))
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
					queryFn: async ({
						queryKey: [_, {
							address,
							chainId,
						}],
						pageParam: page,
					}) => {
						const { getErc20TokenBalances } = await import('$/api/chainbase')

						return await getErc20TokenBalances({
							address,
							chainId,
							page,
						})
					},
					getNextPageParam: (lastPage) => lastPage?.data.next_page,
					select: result => (
						result.pages
							.flatMap(page => page.data)
							.map(tokenWithBalance => (
								normalizeTokenBalanceChainbase(tokenWithBalance, network.chainId)
							))
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
					queryFn: async ({
						queryKey: [_, {
							address,
							chainId,
							quoteCurrency,
						}],
					}) => {
						const { getTokenBalancesForAddress } = await import('$/api/covalent/index')

						return await getTokenBalancesForAddress({
							chainName: chainId,
							walletAddress: address,
							quoteCurrency,
							nft: false,
						})
					},
					select: result => (
						result.items
							.map(tokenBalance => (
								normalizeTokenBalanceCovalent(tokenBalance, quoteCurrency, network.chainId)
							))
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
					queryFn: async ({
						queryKey: [_, {
							address,
							chainId,
						}],
						pageParam: offset,
					}) => {
						const { decommas, chainNameByChainId } = await import('$/api/decommas')

						const chains = [chainNameByChainId[chainId]]

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
							.map(tokenWithBalance => (
								normalizeTokenBalanceDecommas(
									tokenWithBalance,
									address,
								)
							))
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[TokenBalancesProvider.LlamaFolio]: () => ({
			fromQuery: network && address && createQuery({
				queryKey: ['DefiPositions', {
					defiProvider: DefiProvider.LlamaFolio,
					address,
				}],
				queryFn: async () => {
					const { getBalancesByAddress } = await import('$/api/defillama/llamafolio')

					return await getBalancesByAddress({
						address,
					})
				},
				select: result => (
					result
						.protocols
						.filter(protocol => protocol.id === 'wallet')
						.filter(protocol => network ? supportedChains[protocol.chain] === network.chainId : true)
						.map(tokenWithBalance => (
							normalizeTokenBalancesLlamafolio(tokenWithBalance, network.chainId)
						))
						[0]
					?? []
				),
				staleTime: 10 * 1000,
			})
		}),

		[TokenBalancesProvider.Alchemy_Liquality]: () => ({
			fromQuery: address && network && (
				createQuery({
					queryKey: ['Balances', {
						tokenBalancesProvider,
						address,
						chainId: network.chainId,
					}],
					queryFn: async ({
						queryKey: [_, {
							address,
							chainId,
						}],
					}) => {
						const { ERC20Service } = await import('@liquality/wallet-sdk')

						const { liqualitySupportedNetworks } = await import('$/api/liquality')

						if(!liqualitySupportedNetworks.includes(chainId))
							throw new Error(`Liquality doesn't yet support ${network.name}.`)

						return await ERC20Service.listAccountTokens(
							address,
							chainId,
						)
					},
					select: assets => (
						assets
							.map(tokenBalance => (
								normalizeTokenBalanceLiquality(tokenBalance, network.chainId)
							))
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
					queryFn: async ({
						queryKey: [_, {
							address,
							chainId,
						}],
					}) => {
						const { MoralisWeb3Api, chainCodeFromNetwork } = await import('$/api/moralis/web3Api')

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
										chainId,
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

		[TokenBalancesProvider.Nexandria]: () => ({
			fromQuery: address && network && (
				createQuery({
					queryKey: ['Balances', {
						tokenBalancesProvider,
						address,
						chainId: network.chainId,
					}],
					queryFn: async ({
						queryKey: [_, {
							address,
							chainId,
						}],
					}) => {
						const { getPointInTimeBalances } = await import('$/api/nexandria')

						return await getPointInTimeBalances({
							network,
							address
						})
					},
					select: result => (
						result.tokens
							.map(tokenBalance => (
								normalizeTokenBalanceNexandria(tokenBalance, network.chainId)
							))
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[TokenBalancesProvider.Noves]: () => ({
			fromQuery: address && network && (
				createQuery({
					queryKey: ['Balances', {
						tokenBalancesProvider,
						address,
						chainId: network.chainId,
					}],
					queryFn: async ({
						queryKey: [_, {
							address,
							chainId,
						}],
					}) => {
						const { Evm } = await import('$/api/noves/translate')

						const chains = await Evm.getChains()
						const chain = chains.find(chain => chain.evmChainId === chainId)
						
						if (!chain)
							throw new Error(`Chain ${chainId} not supported by Noves`)

						const uniswapLabsDefaultTokenList = await import('$/data/tokens/tokens.uniswap.org.tokenlist.json')

						return await Evm.getTokenBalances({
							chain: chain.name,
							accountAddress: address,
							tokenAddresses: (
								chainId === 1 ?
									uniswapLabsDefaultTokenList
										.map(token => token.address)
								:
									[
										'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
									]
							),
						})
					},
					select: result => (
						result.map(tokenBalance => (
							normalizeTokenBalanceNoves(tokenBalance, network.chainId)
						))
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[TokenBalancesProvider.OneInch_Balance]: () => ({
			fromQuery: address && network && (
				createQueries({
					queries: [
						{
							queryKey: ['Balances', {
								tokenBalancesProvider,
								address,
								chainId: network.chainId
							}],
							queryFn: async ({
								queryKey: [_, {
									address,
									chainId,
								}],
							}) => {
								const { getBalances } = await import('$/api/1inch/balances')

								return getBalances({
									chainId,
									walletAddress: address
								})
							},
							staleTime: 10 * 1000,
						},
						{
							queryKey: ['TokenList', {
								tokenBalancesProvider,
								chainId: network.chainId
							}],
							queryFn: async ({
								queryKey: [_, {
									chainId,
								}],
							}) => {
								const { getTokensForChain } = await import('$/api/1inch/tokens')

								return getTokensForChain({
									chain_id: chainId
								})
							},
							staleTime: 10 * 1000,
						},
					],
					combine: ([balancesQuery, tokensQuery]) => {
						const tokensByAddress = (
							Object.fromEntries(
								(tokensQuery.data?.tokens ?? [])
									.map(token => [token.address, token])
							)
						)

						return {
							...balancesQuery,
							...tokensQuery,
							isLoading: balancesQuery.isLoading || tokensQuery.isLoading,
							data: (
								!(balancesQuery.isLoading || tokensQuery.isLoading) ?
									Object.entries(balancesQuery.data)
										.filter(([address, balance]) => tokensByAddress[address] && BigInt(balance) > 0n)
										.map(([address, balance]) => (
											normalizeTokenBalanceOneinch(
												tokensByAddress[address],
												balance,
											)
										))
								:
									[]
							),
						}
					},
				})
			),
		}),

		[TokenBalancesProvider.Zapper]: () => ({
			fromQuery: address && network && (
				createQuery({
					queryKey: ['Balances', {
						tokenBalancesProvider,
						address,
						chainId: network.chainId,
					}],
					queryFn: async ({
						queryKey: [_, {
							address,
							chainId,
						}],
					}) => {
						const { getTokenBalances } = await import('$/api/zapper')

						return await getTokenBalances({
							network,
							address
						})
					},
					select: tokenBalances => (
						tokenBalances
							.map(tokenWithBalance => (
								normalizeTokenBalanceZapper(tokenWithBalance)
							))
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
					queryFn: async ({
						queryKey: [_, {
							address,
							chainId,
						}],
					}) => {
						const { getWalletTokenBalance } = await import('$/api/quicknode')

						return await getWalletTokenBalance({
							network,
							address
						})
					},
					select: tokenWithBalance => (
						tokenWithBalance.assets
							.map(tokenBalance => (
								normalizeTokenBalanceQuickNode(tokenBalance, network.chainId)
							))
					),
					staleTime: 10 * 1000,
				})
			),
		}),
	}[tokenBalancesProvider]?.()}
	bind:result={balances}
	let:result={balances}
	let:status
	let:pagination
	let:isOpen let:toggle
>
	<svelte:fragment slot="header"
		let:result={balances}
		let:status
		let:pagination
		let:loadingMessage
		let:errorMessage
		let:isOpen let:toggle
	>
		<slot name="header"
			{balances}
			{status} {pagination}
			{loadingMessage} {errorMessage}
			{isOpen} {toggle}
		/>
	</svelte:fragment>

	<slot
		{balances}
		{status} {pagination}
		{isOpen} {toggle}
	/>
</Loader>

