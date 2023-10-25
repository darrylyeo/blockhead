<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import type { TickerSymbol } from '../data/currencies'
	import { TransactionProvider, transactionProviderIcons } from '../data/transactionProvider'
	import { preferences } from '../state/preferences'


	// Inputs
	export let network: Ethereum.Network
	export let address: Ethereum.Address | undefined
	export let publicClient: Ethereum.PublicClient

	export let quoteCurrency: TickerSymbol
	export let transactionProvider: TransactionProvider

	export let includeLogs = true

	// (Computed)
	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider

	$: loadingMessage = `Retrieving ${network.name} transactions from ${transactionProvider}...`
	$: errorMessage = `Couldn't retrieve ${network.name} transactions from ${transactionProvider}.`


	// Functions
	import { createQuery, createInfiniteQuery } from '@tanstack/svelte-query'

	import { type Covalent, getTransactionsByAddress, normalizeTransaction as normalizeTransactionCovalent } from '../api/covalent'
	import { Etherscan, normalizeTransaction as normalizeTransactionEtherscan } from '../api/etherscan'
	// import { getTransactions as getTransactionsEtherspot } from '../api/etherspot'
	import { chainCodeFromNetwork, MoralisWeb3Api } from '../api/moralis/web3Api'
	import type { TransactionCollection } from '../api/moralis/api/Api'


	// Outputs
	export let transactions: Ethereum.Transaction[] | Covalent.Transactions | TransactionCollection

	type SharedSlotProps = {
		transactions: typeof transactions,
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	layout="collapsible"
	loadingIcon={transactionProviderIcons[transactionProvider]}
	{loadingMessage}
	{errorMessage}
	{...{
		[TransactionProvider.Covalent]: {
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainID: network.chainId,
					address,
					quoteCurrency,
				}],
				queryFn: async ({ pageParam: pageNumber }) => {
					const result = await getTransactionsByAddress({
						chainID: network.chainId,
						address,
						includeLogs,
						quoteCurrency,
						pageNumber: pageNumber ?? 0,
						pageSize: 100,
					})

					return result
				},
				getPreviousPageParam: (firstPage, allPages) => firstPage.pagination?.page_number > 0 ? firstPage.pagination.page_number - 1 : undefined,
				getNextPageParam: (lastPage, allPages) => lastPage.pagination?.has_more ? lastPage.pagination.page_number + 1 : undefined
			}),
			then: result => (
				(result?.pages?.flatMap(page => page.items) ?? [])
					.map(transaction => normalizeTransactionCovalent(transaction, network, quoteCurrency))
			),
		},

		[TransactionProvider.Etherscan]: {
			fromQuery: createQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainID: network.chainId,
					address,
				}],
				queryFn: async () => (
					await Etherscan.Accounts.getTransactions({
						chainId: network.chainId,
						address,
					})
				)
			}),
			then: transactions => transactions.map(transaction => normalizeTransactionEtherscan(network, transaction)),
		},

		[TransactionProvider.Moralis]: {
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['Transactions', {
					transactionProvider,
					chainID: network.chainId,
					address,
					quoteCurrency,
				}],
				queryFn: async ({ pageParam }) => (
					await MoralisWeb3Api.address.getTransactions({
						chain: chainCodeFromNetwork(network),
						from_block: 0,
						// to_block: ,
						offset: pageParam?.offset ?? 0,
						limit: pageParam?.limit ?? 100,
						address
					})
				),
				// queryFn: async ({ pageParam: offset = 0 }) => {
				// 	const {result: transactions, total, page_size, page} = await MoralisWeb3Api.address.getTransactions({
				// 		chain: chainCodeFromNetwork(network),
				// 		from_block: 0,
				// 		// to_block: ,
				// 		offset: offset ?? 0,
				// 		limit: 100,
				// 		address
				// 	})

				// 	// const logs = (await MoralisWeb3Api.address.getLogsByAddress({
				// 	// 	chain: chainCodeFromNetwork(network),
				// 	// 	from_block: 0,
				// 	// 	address: transactions[0].hash
				// 	// }))

				// 	// console.log(transactions[0], logs)

				// 	return (
				// 		includeLogs
				// 			? await Promise.all(transactions.map(transaction => (
				// 				MoralisWeb3Api.transaction.getTransaction({
				// 					chain: chainCodeFromNetwork(network),
				// 					transactionHash: transaction.hash
				// 				})
				// 			)))
				// 			: transactions
				// 	).reverse()
				// },
				getPreviousPageParam: (firstPage, allPages) => {
					const offset = (firstPage.page - 1) * firstPage.page_size
					return offset > 0 ? { offset, limit: firstPage.page_size } : undefined
				},
				getNextPageParam: (lastPage, allPages) => {
					const offset = (lastPage.page + 1) * lastPage.page_size
					return offset < lastPage.total ? { offset, limit: lastPage.page_size } : undefined
				}
			}),
			then: result => result?.pages?.flatMap(page => page.result) ?? [],
		},
	}[transactionProvider]}
	{...$$restProps}
	bind:result={transactions}
	let:result={transactions}
	let:pagination
>
	<svelte:fragment slot="header"
		let:result={transactions}
		let:status
		let:pagination
	>
		<slot name="header" {transactions} {status} {pagination} />
	</svelte:fragment>
	<slot {transactions} {pagination} />
</Loader>
