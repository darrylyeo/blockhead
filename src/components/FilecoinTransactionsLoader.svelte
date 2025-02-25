<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { FilecoinTransactionProvider, filecoinTransactionProviders } from '$/data/filecoinTransactionProviders'
	import { networkBySlug } from '$/data/networks'


	// Context
	import { preferences } from '$/state/preferences'


	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let query: (
		| {
			tipsetNumber: Filecoin.TipsetNumber
		}
		| {
			blockCid: Filecoin.BlockCid
		}
		// | {
		// 	transactionCid: Filecoin.TransactionCid
		// }
		| {
			address: Filecoin.Address
			type?: 'sender' | 'receiver'
		}
	)
	export let filecoinTransactionProvider: FilecoinTransactionProvider
	export let networkProvider: NetworkProvider | undefined

	// (Computed)
	$: filecoinTransactionProvider = $$props.filecoinTransactionProvider ?? $preferences.filecoinTransactionProvider
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork


	// Outputs
	export let transactions: Filecoin.Transaction[] | undefined
	export let transactionsCount: number | undefined

	let result: {
		transactions?: Filecoin.Transaction[]
		transactionsCount?: number
	} | undefined = (
			transactions !== undefined && transactionsCount !== undefined
				? {
					transactions,
					transactionsCount,
				}
				: undefined
	)

	$: transactions = result?.transactions
	$: transactionsCount = result?.transactionsCount

	type SharedSlotProps = {
		transactions: typeof transactions,
		transactionsCount: typeof transactionsCount,
		pagination: Loader['$$slot_def']['default']['pagination'],
	}

	type $$Slots = {
		header: SharedSlotProps,
		default: SharedSlotProps,
	}


	// Functions
	import { createQuery, createInfiniteQuery } from '@tanstack/svelte-query'

	import { normalizeTransactions as normalizeTransactionsBeryx } from '$/api/beryx/filecoin/normalize'

	import { normalizeMessage as normalizeTransactionFilfox } from '$/api/filfox/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		contentClass: 'column',
	}}
	loadingIcon={filecoinTransactionProviders[filecoinTransactionProvider].icon}
	loadingIconName={filecoinTransactionProviders[filecoinTransactionProvider].name}
	loadingMessage={`Retrieving block transactions from ${filecoinTransactionProviders[filecoinTransactionProvider].name}...`}
	errorMessage={`Couldn't retrieve block transactions from ${filecoinTransactionProviders[filecoinTransactionProvider].name}.`}
	{...{
		[FilecoinTransactionProvider.Beryx]: () => ({
			fromInfiniteQuery: (
				'tipsetNumber' in query ?
					createInfiniteQuery({
						queryKey: ['BlockTransactions', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							blockNumber: Number(query.tipsetNumber),
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [_, {
								chainId,
								blockNumber: tipsetNumber,
							}],
							pageParam: cursor,
						}) => {
							const { baseUrls, getTransactionsByHeight } = await import('$/api/beryx/filecoin/index')

							return await getTransactionsByHeight(
								tipsetNumber,
								{
									cursor,
									limit: 100,
								},
								{
									baseUrl: baseUrls[chainId],
								}
							)
						},
						getNextPageParam: (lastPage, allPages) => (
							lastPage.next_cursor || undefined
						),
						select: result => ({
							transactions: (
								normalizeTransactionsBeryx(
									(
										result.pages
											.flatMap(result => (
												result.transactions
												?? []
											))
									),
									network
								)
							),
							transactionsCount: result.pages[0]?.total_txs,
						}),
					})

				: 'blockCid' in query ?
					createInfiniteQuery({
						queryKey: ['BlockTransactions', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							blockCid: query.blockCid,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [_, {
								chainId,
								blockCid,
							}],
							pageParam: cursor,
						}) => {
							const { baseUrls, getTransactionsByBlock } = await import('$/api/beryx/filecoin/index')

							return await getTransactionsByBlock(
								blockCid,
								{
									cursor,
									limit: 100,
								},
								{
									baseUrl: baseUrls[chainId],
								}
							)
						},
						getNextPageParam: (lastPage, allPages) => (
							lastPage.next_cursor || undefined
						),
						select: result => ({
							transactions: (
								normalizeTransactionsBeryx(
									(
										result.pages
											.flatMap(result => (
												result.transactions
												?? []
											))
									),
									network
								)
							),
							transactionsCount: result.pages[0]?.total_txs,
						}),
					})

				: 'hash' in query ?
					createInfiniteQuery({
						queryKey: ['BlockTransactions', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							transactionCid: query.transactionCid,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [_, {
								chainId,
								transactionCid,
							}],
							pageParam: cursor,
						}) => {
							const { baseUrls, getTransactionsByHash } = await import('$/api/beryx/filecoin/index')

							return await getTransactionsByHash(
								transactionCid,
								{
									cursor,
									limit: 100,
								},
								{
									baseUrl: baseUrls[chainId],
								}
							)
						},
						getNextPageParam: (lastPage, allPages) => (
							lastPage.next_cursor || undefined
						),
						select: result => ({
							transactions: (
								normalizeTransactionsBeryx(
									(
										result.pages
											.flatMap(result => (
												result.transactions
												?? []
											))
									),
									network
								)
							),
							transactionsCount: result.pages[0]?.total_txs,
						}),
					})

				: 'address' in query ?
					createInfiniteQuery({
						queryKey: ['BlockTransactions', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							address: query.address,
							type: query.type,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [_, {
								chainId,
								address,
								type,
							}],
							pageParam: cursor,
						}) => {
							if (type === 'receiver') {
								const { baseUrls, getTransactionsByReceiverAddress } = await import('$/api/beryx/filecoin/index')

								return await getTransactionsByReceiverAddress(
									address,
									{
										cursor,
										limit: 100,
									},
									{
										baseUrl: baseUrls[chainId],
									}
								)
							}
							
							else if (type === 'sender') {
								const { baseUrls, getTransactionsBySenderAddress } = await import('$/api/beryx/filecoin/index')

								return await getTransactionsBySenderAddress(
									address,
									{
										cursor,
										limit: 100,
									},
									{
										baseUrl: baseUrls[chainId],
									}
								)
							}

							else {
								const { baseUrls, getTransactionsAllAddress } = await import('$/api/beryx/filecoin/index')

								return await getTransactionsAllAddress(
									address,
									{
										cursor,
										limit: 100,
									},
									{
										baseUrl: baseUrls[chainId],
									}
								)
							}
						},
						getNextPageParam: (lastPage, allPages) => (
							lastPage.next_cursor || undefined
						),
						select: result => ({
							transactions: (
								normalizeTransactionsBeryx(
									(
										result.pages
											.flatMap(result => (
												result.transactions
												?? []
											))
									),
									network
								)
							),
							transactionsCount: result.pages[0]?.total_txs,
						}),
					})
				:
					undefined
			),
		}),

		[FilecoinTransactionProvider.Filfox]: () => ({
			fromQuery: (
				'address' in query ?
					createQuery({
						queryKey: ['Transactions', {
							filecoinTransactionProvider,
							address: query.address,
						}],
						queryFn: async ({
							queryKey: [_, {
								address,
							}],
						}) => {
							const { getAddressMessages } = await import('$/api/filfox')

							return await getAddressMessages({
								address,
							})
						},
						select: result => ({
							transactions: (
								result
									.messages
									.map(transaction => (
										normalizeTransactionFilfox(
											transaction,
											network
										)
									))
							),
							transactionsCount: result.totalCount,
						}),
					})

				: 'blockCid' in query ?
					createQuery({
						queryKey: ['Transactions', {
							filecoinTransactionProvider,
							blockCid: query.blockCid,
						}],
						queryFn: async ({
							queryKey: [_, {
								blockCid,
							}],
						}) => {
							const { getBlockMessages } = await import('$/api/filfox')

							return await getBlockMessages({
								cid: blockCid,
							})
						},
						select: result => ({
							transactions: (
								result
									.messages
									.map(transaction => (
										normalizeTransactionFilfox(
											transaction,
											network
										)
									))
							),
							transactionsCount: result.totalCount,
						}),
					})

				: 'tipsetNumber' in query ?
					createQuery({
						queryKey: ['Transactions', {
							filecoinTransactionProvider,
							tipsetNumber: Number(query.tipsetNumber),
						}],
						queryFn: async () => {
							throw new Error('Filfox does not yet support querying transactions by tipset.')
						},
					})

				:
					undefined
			),
		}),
	}[filecoinTransactionProvider]?.()}
	bind:result
	let:result
	let:pagination
>
	<svelte:fragment slot="header"
		let:pagination
	>
		<slot name="header"
			transactions={result?.transactions}
			transactionsCount={result?.transactionsCount}
			{pagination}
		/>
	</svelte:fragment>

	<slot
		transactions={result?.transactions}
		transactionsCount={result?.transactionsCount}
		{pagination}
	/>
</Loader>
