<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { FilecoinTransactionProvider, filecoinTransactionProviders } from '$/data/filecoinTransactionProviders'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { getViemPublicClient } from '$/data/networkProviders'
	import { networkBySlug } from '$/data/networks'


	// Context
	import { preferences } from '$/state/preferences'


	// Inputs
	export let network: Ethereum.Network = networkBySlug.get('filecoin')!
	export let transactionCid: Filecoin.TransactionCid
	export let filecoinTransactionProvider: FilecoinTransactionProvider = FilecoinTransactionProvider.Beryx
	export let networkProvider: NetworkProvider | undefined
	export let publicClient: Ethereum.PublicClient | undefined

	// (Computed)
	$: filecoinTransactionProvider = $$props.filecoinTransactionProvider ?? $preferences.filecoinTransactionProvider
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider,
	})


	// Outputs
	export let transaction: Filecoin.Transaction

	type SharedSlotProps = {
		transaction: typeof transaction,
	}

	type $$Slots = {
		header: SharedSlotProps,
		default: SharedSlotProps,
	}


	// Functions
	import { createInfiniteQuery } from '@tanstack/svelte-query'
	import { formatUnits } from 'viem'
	import type { getTransactionsByHash } from '$/api/beryx/filecoin/index'

	type BeryxTransaction = NonNullable<Awaited<ReturnType<typeof getTransactionsByHash>>['Transactions']>[number]
	type BeryxTransactionWithInternalTransactions = BeryxTransaction & { internalTransactions: BeryxTransaction[] }

	const normalizeTransactionBeryx = (transaction: BeryxTransactionWithInternalTransactions) => ({
		id: transaction.tx_cid,

		isSuccessful: transaction.status == 'Ok',

		fromAddress: transaction.tx_from,
		toAddress: transaction.tx_to,

		value: formatUnits(transaction.amount, network.nativeCurrency.decimals),

		gasToken: network.nativeCurrency,
		gasSpent: transaction.gas_used,

		method: transaction.tx_type,

		metadata: transaction.tx_metadata,
		
		internalTransactions: transaction.internalTransactions?.map(normalizeTransactionBeryx),
		blockId: transaction.block_cid,
		tipsetId: transaction.tipset_cid,
		tipsetNumber: transaction.height,
		tipsetTimestamp: new Date(transaction.tx_timestamp).valueOf(),
	} as Filecoin.Transaction)

	const linkInternalTransactionsBeryx = (transactions: BeryxTransaction[]) => {
		const transactionsById = Object.fromEntries(transactions.map(transaction => [transaction.id, transaction]))

		const rootTransactions: BeryxTransactionWithInternalTransactions[] = []

		for(const transaction of transactions){
			const parentTransaction = transactionsById[transaction.parent_id]

			if(parentTransaction) (parentTransaction.internalTransactions ??= []).push(transaction)
			else rootTransactions.push(transaction)
		}

		console.log({rootTransactions})

		return rootTransactions
	}


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		contentClass: 'column',
	}}
	loadingIcon={filecoinTransactionProviders[filecoinTransactionProvider].icon}
	loadingIconName={filecoinTransactionProviders[filecoinTransactionProvider].name}
	loadingMessage={`Retrieving transaction from ${filecoinTransactionProviders[filecoinTransactionProvider].name}...`}
	errorMessage={`Couldn't retrieve transaction from ${filecoinTransactionProviders[filecoinTransactionProvider].name}.`}
	{...{
		[FilecoinTransactionProvider.Beryx]: () => ({
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['Transaction', {
					transactionProvider: filecoinTransactionProvider,
					networkProvider,
					chainId: network.chainId,
					transactionId: transactionCid,
				}],
				queryFn: async ({ pageParam: NextPage }) => {
					if(network.slug !== 'filecoin') throw new Error('Beryx only supports Filecoin.')

					const { getTransactionsByHash } = await import('$/api/beryx/filecoin/index')

					return await getTransactionsByHash(transactionCid, { page: NextPage })
				},
				getNextPageParam: (lastPage, allPages) => lastPage.HasNextPage ? lastPage.NextPage : undefined,
				select: result => (
					linkInternalTransactionsBeryx(
						result.pages
							.flatMap(({ transactions }) => transactions)
					)
						.map(normalizeTransactionBeryx)
						[0]
				),
			}),
		}),
	}[filecoinTransactionProvider]?.()}
	bind:result={transaction}
	let:result={transaction}
>
	<svelte:fragment slot="header">
		<slot name="header"
			{transaction}
		/>
	</svelte:fragment>

	<slot {transaction} />
</Loader>
