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
	export let address: Filecoin.Address
	export let transactionProvider: FilecoinTransactionProvider.Beryx = FilecoinTransactionProvider.Beryx
	export let networkProvider: NetworkProvider | undefined
	export let publicClient: Ethereum.PublicClient | undefined

	// (Computed)
	$: transactionProvider = $$props.transactionProvider ?? $preferences.filecoinTransactionProvider
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

	import { normalizeTransaction as normalizeTransactionBeryx, linkInternalTransactions as linkInternalTransactionsBeryx } from '$/api/beryx/filecoin/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		contentClass: 'column',
	}}
	loadingIcon={filecoinTransactionProviders[transactionProvider].icon}
	loadingIconName={filecoinTransactionProviders[transactionProvider].name}
	loadingMessage={`Retrieving account transactions from ${filecoinTransactionProviders[transactionProvider].name}...`}
	errorMessage={`Couldn't retrieve account transactions from ${filecoinTransactionProviders[transactionProvider].name}.`}
	{...{
		[FilecoinTransactionProvider.Beryx]: () => ({
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['BlockTransactions', {
					transactionProvider,
					chainId: network.chainId,
					address,
				}],
				initialPageParam: {
					cursor: undefined
				},
				queryFn: async ({
					queryKey: [_, {
						address,
					}],
					pageParam: {
						cursor,
					},
				}) => {
					const { getTransactionsAllAddress } = await import('$/api/beryx/filecoin/index')

					return await getTransactionsAllAddress(address, {
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
								result.transactions ?? []
							))
					)
						.map(transaction => (
							normalizeTransactionBeryx(
								transaction,
								network
							)
						))
				),
			}),
		}),
	}[transactionProvider]?.()}
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
