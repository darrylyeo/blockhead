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
	export let tipsetNumber: Filecoin.TipsetNumber
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
	loadingIcon={filecoinTransactionProviders[filecoinTransactionProvider].icon}
	loadingIconName={filecoinTransactionProviders[filecoinTransactionProvider].name}
	loadingMessage={`Retrieving block transactions from ${filecoinTransactionProviders[filecoinTransactionProvider].name}...`}
	errorMessage={`Couldn't retrieve block transactions from ${filecoinTransactionProviders[filecoinTransactionProvider].name}.`}
	{...{
		[FilecoinTransactionProvider.Beryx]: () => ({
			fromInfiniteQuery: createInfiniteQuery({
				queryKey: ['BlockTransactions', {
					transactionProvider: filecoinTransactionProvider,
					chainId: network.chainId,
					blockNumber: Number(tipsetNumber),
				}],
				queryFn: async ({ pageParam: next_cursor }) => {
					if(network.slug !== 'filecoin') throw new Error('Beryx only supports Filecoin.')

					const { getTransactionsByHeight } = await import('$/api/beryx/filecoin/index')

					return await getTransactionsByHeight(Number(tipsetNumber), { page: next_cursor })
				},
				getNextPageParam: (lastPage, allPages) => lastPage.next_cursor ? lastPage.next_cursor : undefined,
				select: result => (
					linkInternalTransactionsBeryx(
						result.pages
							.flatMap(({ transactions }) => transactions)
					)
						.map(normalizeTransactionBeryx)
				),
			}),
		}),
	}[filecoinTransactionProvider]?.()}
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
