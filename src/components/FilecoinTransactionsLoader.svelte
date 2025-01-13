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
		| {
			transactionCid: Filecoin.TransactionCid
		}
		| {
			address: Filecoin.Address
			type?: 'sender' | 'receiver'
		}
	)
	export let filecoinTransactionProvider: FilecoinTransactionProvider = FilecoinTransactionProvider.Beryx
	export let networkProvider: NetworkProvider | undefined

	// (Computed)
	$: filecoinTransactionProvider = $$props.filecoinTransactionProvider ?? $preferences.filecoinTransactionProvider
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork


	// Outputs
	export let transactions: Filecoin.Transaction[]

	type SharedSlotProps = {
		transactions: typeof transactions,
		pagination: Loader['$$slot_def']['default']['pagination'],
	}

	type $$Slots = {
		header: SharedSlotProps,
		default: SharedSlotProps,
	}


	// Functions
	import { createInfiniteQuery } from '@tanstack/svelte-query'

	import { normalizeTransaction as normalizeTransactionBeryx, linkInternalTransactions as linkInternalTransactionsBeryx } from '$/api/beryx/filecoin/normalize'


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
						initialPageParam: {
							cursor: undefined
						},
						queryFn: async ({
							queryKey: [_, {
								blockNumber: tipsetNumber,
							}],
							pageParam: {
								cursor,
							},
						}) => {
							const { getTransactionsByHeight } = await import('$/api/beryx/filecoin/index')

							return await getTransactionsByHeight(tipsetNumber, {
								cursor,
								limit: 100,
							})
						},
						getNextPageParam: (lastPage, allPages) => ({
							cursor: lastPage.next_cursor,
						}),
						select: result => (
							linkInternalTransactionsBeryx(
								result.pages
									.flatMap(result => (
										result.transactions
										?? []
									))
							)
								.map(transaction => (
									normalizeTransactionBeryx(
										transaction,
										network
									)
								))
						),
					})

				: 'blockCid' in query ?
					createInfiniteQuery({
						queryKey: ['BlockTransactions', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							blockCid: query.blockCid,
						}],
						initialPageParam: {
							cursor: undefined
						},
						queryFn: async ({
							queryKey: [_, {
								blockCid,
							}],
							pageParam: {
								cursor,
							},
						}) => {
							const { getTransactionsByBlock } = await import('$/api/beryx/filecoin/index')

							return await getTransactionsByBlock(blockCid, {
								cursor,
								limit: 100,
							})
						},
						getNextPageParam: (lastPage, allPages) => ({
							cursor: lastPage.next_cursor,
						}),
						select: result => (
							linkInternalTransactionsBeryx(
								result.pages
									.flatMap(result => (
										result.transactions
										?? []
									))
							)
								.map(transaction => (
									normalizeTransactionBeryx(
										transaction,
										network
									)
								))
						),
					})

				: 'hash' in query ?
					createInfiniteQuery({
						queryKey: ['BlockTransactions', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							transactionCid: query.transactionCid,
						}],
						initialPageParam: {
							cursor: undefined
						},
						queryFn: async ({
							queryKey: [_, {
								transactionCid,
							}],
							pageParam: {
								cursor,
							},
						}) => {
							const { getTransactionsByHash } = await import('$/api/beryx/filecoin/index')

							return await getTransactionsByHash(transactionCid, {
								cursor,
								limit: 100,
							})
						},
						getNextPageParam: (lastPage, allPages) => ({
							cursor: lastPage.next_cursor,
						}),
						select: result => (
							linkInternalTransactionsBeryx(
								result.pages
									.flatMap(result => (
										result.transactions
										?? []
									))
							)
								.map(transaction => (
									normalizeTransactionBeryx(
										transaction,
										network
									)
								))
						),
					})

				: 'address' in query ?
					createInfiniteQuery({
						queryKey: ['BlockTransactions', {
							transactionProvider: filecoinTransactionProvider,
							chainId: network.chainId,
							address: query.address,
							type: query.type,
						}],
						initialPageParam: {
							cursor: undefined
						},
						queryFn: async ({
							queryKey: [_, {
								address,
								type,
							}],
							pageParam: {
								cursor,
							},
						}) => {
							if (type === 'receiver') {
								const { getTransactionsByReceiverAddress } = await import('$/api/beryx/filecoin/index')

								return await getTransactionsByReceiverAddress(address, {
									cursor,
									limit: 100,
								})
							}
							
							else if (type === 'sender') {
								const { getTransactionsBySenderAddress } = await import('$/api/beryx/filecoin/index')

								return await getTransactionsBySenderAddress(address, {
									cursor,
									limit: 100,
								})
							}

							else {
								const { getTransactionsAllAddress } = await import('$/api/beryx/filecoin/index')

								return await getTransactionsAllAddress(address, {
									cursor,
									limit: 100,
								})
							}
						},
						getNextPageParam: (lastPage, allPages) => ({
							cursor: lastPage.next_cursor,
						}),
						select: result => (
							linkInternalTransactionsBeryx(
								result.pages
									.flatMap(result => (
										result.transactions
										?? []
									))
							)
								.map(transaction => (
									normalizeTransactionBeryx(
										transaction,
										network
									)
								))
						),
					})
				:
					undefined
			),
		}),
	}[filecoinTransactionProvider]?.()}
	bind:result={transactions}
	let:result={transactions}
	let:pagination
>
	<svelte:fragment slot="header"
		let:pagination
	>
		<slot name="header"
			{transactions}
			{pagination}
		/>
	</svelte:fragment>

	<slot
		{transactions}
		{pagination}
	/>
</Loader>
