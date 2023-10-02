<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import type { Filecoin } from '../data/filecoin'
	import { TransactionProvider, transactionProviderIcons } from '../data/transactionProvider'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import { getViemPublicClient } from '../data/networkProviders'
	import { networksBySlug } from '../data/networks'


	// Context
	import { preferences } from '../state/preferences'


	// Inputs
	export let network: Ethereum.Network = networksBySlug['filecoin']
	export let address: Filecoin.Address
	export let transactionProvider: TransactionProvider.Beryx = TransactionProvider.Beryx
	export let networkProvider: NetworkProvider | undefined
	export let publicClient: Ethereum.PublicClient | undefined

	// (Computed)
	$: transactionProvider = $$props.transactionProvider ?? $preferences.transactionProvider
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider,
	})


	// Outputs
	export let transactions: Filecoin.Transaction[]

	type SharedSlotProps = {
		transactions: typeof transactions,
	}

	type $$Slots = {
		header: SharedSlotProps,
		default: SharedSlotProps,
	}


	// Functions
	import { createInfiniteQuery } from '@tanstack/svelte-query'
	import { formatUnits } from 'viem'
	import type { getTransactionsByHeight } from '../api/beryx/filecoin/index'

	type BeryxTransaction = NonNullable<Awaited<ReturnType<typeof getTransactionsByHeight>>['Transactions']>[number]
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
		address: transaction.height,
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

		return rootTransactions
	}


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingIcon={transactionProviderIcons[transactionProvider]}
	loadingIconName={transactionProvider}
	loadingMessage={`Retrieving account transactions from ${transactionProvider}...`}
	errorMessage={`Couldn't retrieve account transactions from ${transactionProvider}.`}
	contentClass="column"
	{...{
		[TransactionProvider.Beryx]: {
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['BlockTransactions', {
					transactionProvider,
					chainID: network.chainId,
					blockNumber: Number(address),
				}],
				queryFn: async ({ pageParam: next_cursor }) => {
					if(network.slug !== 'filecoin') throw new Error('Beryx only supports Filecoin.')

					const { getTransactionsByAddress } = await import('../api/beryx/filecoin/index')

					return await getTransactionsByAddress(address, { page: next_cursor })
				},
				getNextPageParam: (lastPage, allPages) => lastPage.next_cursor ? lastPage.next_cursor : undefined,
			}),
			then: result => (
				linkInternalTransactionsBeryx(
					result.pages
						.flatMap(({ transactions }) => transactions)
				)
					.map(normalizeTransactionBeryx)
			),
		},
	}[transactionProvider]}
	bind:result={transactions}
	let:result={transactions}
>
	<svelte:fragment slot="header">
		<slot name="header"
			{transactions}
		/>
	</svelte:fragment>

	<slot {transactions} />
</Loader>
