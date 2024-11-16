<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { TickerSymbol } from '$/data/currencies'
	import { TransactionProvider, transactionProviderIcons } from '$/data/transactionProvider'
	import { preferences } from '$/state/preferences'


	// Inputs
	export let network: Ethereum.Network
	export let address: Ethereum.Address | undefined
	export let publicClient: Ethereum.PublicClient

	export let quoteCurrency: TickerSymbol
	export let transactionProvider: string // TransactionProvider

	export let includeLogs = true

	// (View options)
	export let viewOptions: Loader<any, any, any, any>['$$prop_def']['viewOptions'] | undefined

	// (Computed)
	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider

	$: loadingMessage = `Retrieving ${network.name} transactions from ${transactionProvider}...`
	$: errorMessage = `Couldn't retrieve ${network.name} transactions from ${transactionProvider}.`


	// Functions
	import { createQuery, createInfiniteQuery } from '@tanstack/svelte-query'

	import { normalizeTransaction as normalizeTransactionBlockscout } from '$/api/blockscout/rest/normalize'

	import { normalizeTransaction as normalizeTransactionChainbase } from '$/api/chainbase/normalize'

	import { normalizeTransaction as normalizeTransactionCovalent } from '$/api/covalent/normalize'

	// import { normalizeTransaction as normalizeTransactionCurvegridMultibaas } from '$/api/curvegrid/multibaas/normalize'

	import { normalizeTransaction as normalizeTransactionDecommas } from '$/api/decommas/normalize'

	import { normalizeTransaction as normalizeTransactionEtherscan } from '$/api/etherscan/normalize'

	import { normalizeTransaction as normalizeTransactionMoralis } from '$/api/moralis/web3Api/normalize'

	import { normalizeTransaction as normalizeTransactionNoves } from '$/api/noves/normalize'


	// Outputs
	export let transactions: Ethereum.Transaction[] | undefined

	type SharedSlotProps = {
		transactions: typeof transactions,
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps & {
			isOpen: Loader<any, any, any, 'collapsible'>['$$slot_def']['default']['isOpen'],
			toggle: Loader<any, any, any, 'collapsible'>['$$slot_def']['default']['toggle'],
		},
	}


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		layout: 'collapsible',
		...viewOptions,
	}}
	loadingIcon={transactionProviderIcons[transactionProvider]}
	{loadingMessage}
	{errorMessage}
	{...{
		[TransactionProvider.Blockscout]: () => ({
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainId: network.chainId,
					address,
					quoteCurrency,
				}],
				initialPageParam: {},
				queryFn: async ({
					queryKey: [_, {
						chainId,
						address,
					}],
					pageParam: next_page_params,
				}) => {
					const { getBlockscoutRestEndpoint } = await import('$/api/blockscout')
					const { getAddressTxs } = await import('$/api/blockscout/rest')

					return await getAddressTxs(
						address,
						{},
						{
							baseUrl: getBlockscoutRestEndpoint(chainId),
							fetch: (url, ...args) => (
								fetch(new URL(`?${new URLSearchParams(next_page_params)}`, url), ...args)
							),
						}
					)
				},
				getNextPageParam: (lastPage) => lastPage.next_page_params,
				select: ({ pages }) => (
					pages
						.flatMap(page => (
							page
								.items
								.map(transaction => (
									normalizeTransactionBlockscout(transaction, network)
								))
						))
				),
				staleTime: 10 * 1000,
			}),
		}),

		[TransactionProvider.Chainbase]: () => ({
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainId: network.chainId,
					address,
					quoteCurrency,
				}],
				initialPageParam: 0,
				queryFn: async ({
					queryKey: [_, {
						chainId,
						address,
					}],
					pageParam: page,
				}) => {
					const { getTransactionsByAccount } = await import('$/api/chainbase')

					return await getTransactionsByAccount({
						chainId,
						address,
						page,
					})
				},
				getNextPageParam: (lastPage) => lastPage.next_page,
				select: result => (
					(result?.pages?.flatMap(page => page.data) ?? [])
						.map(transaction => normalizeTransactionChainbase(transaction, network))
				),
				staleTime: 10 * 1000,
			}),
		}),

		[TransactionProvider.Covalent]: () => ({
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainId: network.chainId,
					address,
					quoteCurrency,
					includeLogs,
				}],
				initialPageParam: 0,
				queryFn: async ({
					queryKey: [_, {
						chainId,
						address,
						quoteCurrency,
						includeLogs,
					}],
					pageParam: page,
				}) => {
					const { getPaginatedTransactionsForAddress } = await import('$/api/covalent/index')

					return await getPaginatedTransactionsForAddress({
						chainName: chainId,
						walletAddress: address,
						page,
						quoteCurrency,
						noLogs: !includeLogs,
					})
				},
				getPreviousPageParam: (firstPage, allPages) => firstPage.links.prev !== null ? Number(firstPage.links.current_page) - 1 : undefined,
				getNextPageParam: (lastPage, allPages) => lastPage.links.next !== null ? Number(lastPage.links.current_page) + 1 : undefined,
				select: result => (
					(result?.pages?.flatMap(page => page.items) ?? [])
						.map(transaction => normalizeTransactionCovalent(transaction, network, quoteCurrency))
				),
				staleTime: 10 * 1000,
			}),
		}),

		[TransactionProvider.Curvegrid_Multibaas]: () => ({
			fromQuery: createQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainId: network.chainId,
					address,
				}],
				queryFn: () => {
					throw new Error('Curvegrid does not yet support querying transactions by address.')
				},
				// initialPageParam: {
				// 	limit: 100,
				// 	offset: 0,
				// },
				// queryFn: async ({
				// 	queryKey: [_, {
				// 		chainId,
				// 		address,
				// 	}],
				// 	pageParam: {
				// 		limit,
				// 		offset,
				// 	},
				// }) => {
				// 	const { getTransactions } = await import('$/api/curvegrid/multibaas')

				// 	return await getTransactions({
				// 		chain: 'ethereum',
				// 		wallet_address: address,
				// 		limit,
				// 		offset,
				// 	})
				// },
				// getNextPageParam: (lastPage, allPages) => ({
				// 	limit: lastPage.pageParam.limit,
				// 	offset: lastPage.offset + lastPage.pageParam.limit,
				// }),
				// select: result => (
				// 	result.pages
				// 		.flatMap(page => page.data.result)
				// 		.map(transaction => normalizeTransactionCurvegridMultibaas(transaction, network))
				// ),
				staleTime: 10 * 1000,
			})
		}),

		[TransactionProvider.Decommas]: () => ({
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainId: network.chainId,
					address,
					quoteCurrency,
				}],
				initialPageParam: 0,
				queryFn: async ({
					queryKey: [_, {
						chainId,
						address,
					}],
					pageParam: offset,
				}) => {
					const { decommas, chainNameByChainId } = await import('$/api/decommas')

					const chainName = chainNameByChainId[chainId]

					return await decommas.address.getTransactions({
						chain: chainName,
						address,
						limit: 100,
						offset,
					})
				},
				getNextPageParam: (lastPage, allPages) => allPages && allPages.length * 100 < lastPage.count ? allPages.length * 100 : undefined,
				select: ({ pages }) => (
					pages.flatMap(page => page.result)
						.map(transaction => normalizeTransactionDecommas(transaction, network))
				),
				staleTime: 10 * 1000,
			}),
		}),

		[TransactionProvider.Etherscan]: () => ({
			fromQuery: createQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainId: network.chainId,
					address,
				}],
				queryFn: async ({
					queryKey: [_, {
						chainId,
						address,
					}],
				}) => {
					const { Etherscan } = await import('$/api/etherscan/index')

					return await Etherscan.Accounts.getTransactions({
						chainId,
						address,
					})
				},
				select: transactions => transactions.map(transaction => normalizeTransactionEtherscan(network, transaction)),
				staleTime: 10 * 1000,
			}),
		}),

		[TransactionProvider.Etherspot]: () => ({
			// fromQuery: createQuery({
			// 	queryKey: ['Transactions', {
			// 		transactionProvider,
			// 		chainId: network.chainId,
			// 		address,
			// 		quoteCurrency,
			// 	}],
			// 	queryFn: async ({
			// 		queryKey: [_, {
			// 			chainId,
			// 			address,
			// 			quoteCurrency,
			// 		}],
			// 		pageParam: page,
			// 	}) => {
			// 		const { getTransactions } = await import('$/api/etherspot')

			// 		return await getTransactions({
			// 			chainId,
			// 			address,
			// 			page,
			// 			quoteCurrency,
			// 		})
			// 	},
			// 	staleTime: 10 * 1000,
			// }),
		}),

		[TransactionProvider.Moralis]: () => ({
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainId: network.chainId,
					address,
					quoteCurrency,
					includeLogs,
				}],
				initialPageParam: { offset: 0, limit: 20 },
				queryFn: async ({
					queryKey: [_, {
						chainId,
						address,
						includeLogs,
					}],
					pageParam: { offset = 0, limit },
				}) => {
					const { chainCodeFromNetwork, MoralisWeb3Api } = await import('$/api/moralis/web3Api/index')

					const response = await MoralisWeb3Api.address.getTransactions({
						chain: chainCodeFromNetwork(network),
						from_block: 0,
						offset: offset ?? 0,
						limit,
						address
					})

					return includeLogs
						? {
							...response,
							result: await Promise.all(
								response.result.map(async transaction => (
									await MoralisWeb3Api.transaction.getTransaction({
										chain: chainCodeFromNetwork(network),
										transactionHash: transaction.hash
									})
								))
							)
						}
						: response
				},
				getPreviousPageParam: (firstPage, allPages) => {
					const offset = (firstPage.page - 1) * firstPage.page_size
					return offset > 0 ? { offset, limit: firstPage.page_size } : undefined
				},
				getNextPageParam: (lastPage, allPages) => {
					const offset = (lastPage.page + 1) * lastPage.page_size
					return offset < lastPage.total ? { offset, limit: lastPage.page_size } : undefined
				},
				select: result => (
					(result?.pages?.flatMap(page => page.result) ?? [])
						.map(transaction => normalizeTransactionMoralis(transaction, network, quoteCurrency))
				),
				staleTime: 10 * 1000,
			}),
		}),

		[TransactionProvider.Noves]: () => ({
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainId: network.chainId,
					address,
					quoteCurrency,
				}],
				initialPageParam: 0,
				queryFn: async ({
					queryKey: [_, {
						chainId,
						address,
					}],
					pageParam: page,
				}) => {
					const { Evm } = await import('$/api/noves/translate')

					const chains = await Evm.getChains()
					const chain = chains.find(chain => chain.evmChainId === chainId)
					
					if (!chain)
						throw new Error(`Chain ${chainId} not supported by Noves`)

					return await Evm.getTransactions({
						accountAddress: address,
						chain: chain.name,
						page,
						pageSize: 50,
						sort: 'desc',
						viewAsAccountAddress: address,
					})
				},
				getNextPageParam: (lastPage, allPages) => allPages.length,
				select: ({ pages }) => (
					pages.flatMap(page => page.items)
						.map(transaction => (
							normalizeTransactionNoves(transaction, network)
						))
				),
				staleTime: 10 * 1000,
			})
		}),
	}[transactionProvider]?.()}
	bind:result={transactions}
	let:result={transactions}
	let:pagination
	let:isOpen let:toggle
>
	<svelte:fragment slot="header"
		let:result={transactions}
		let:status
		let:pagination
		let:isOpen let:toggle
	>
		<slot name="header"
			{transactions}
			{status} {pagination}
			{isOpen} {toggle}
		/>
	</svelte:fragment>

	<slot
		{transactions}
		{status} {pagination}
		{isOpen} {toggle}
	/>
</Loader>
