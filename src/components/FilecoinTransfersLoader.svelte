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
	export let query: (
		| {
			address: Filecoin.Address
		}
		| {
			transactionCid: Filecoin.TransactionCid
		}
	)
	export let filecoinTransactionProvider: FilecoinTransactionProvider
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
	let result: {
		transfers?: Filecoin.Transfer[]
		transfersCount?: number
	} | undefined = undefined

	$: transfers = result?.transfers
	$: transfersCount = result?.transfersCount

	type SharedSlotProps = {
		transfers: typeof transfers,
		transfersCount: typeof transfersCount,
	}

	type $$Slots = {
		header: SharedSlotProps,
		default: SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { normalizeTransfer as normalizeTransferFilfox } from '$/api/filfox/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		contentClass: 'column',
	}}
	loadingIcon={filecoinTransactionProviders[filecoinTransactionProvider].icon}
	loadingIconName={filecoinTransactionProviders[filecoinTransactionProvider].name}
	loadingMessage={`Retrieving ${network.name} transfers from ${filecoinTransactionProviders[filecoinTransactionProvider].name}...`}
	errorMessage={`Couldn't retrieve ${network.name} transfers from ${filecoinTransactionProviders[filecoinTransactionProvider].name}.`}
	{...{
		[FilecoinTransactionProvider.Beryx]: () => ({}),

		[FilecoinTransactionProvider.Filfox]: () => ({
			fromQuery: (
				'address' in query ?
					createQuery({
						queryKey: ['Transfers', {
							filecoinTransactionProvider,
							address: query.address,
						}],
						queryFn: async ({
							queryKey: [_, {
								address,
							}],
						}) => {
							const { getAddressTransfers } = await import('$/api/filfox')
							
							return await getAddressTransfers({
								address,
							})
						},
						select: result => ({
							transfers: (
								result.transfers
									.map(transfer => (
										normalizeTransferFilfox(
											transfer
										)
									))
							),
							transfersCount: result.totalCount,
						}),
					})

				: 'transactionCid' in query ?
					createQuery({
						queryKey: ['Transfers', {
							filecoinTransactionProvider,
							transactionCid: query.transactionCid,
						}],
						queryFn: async ({
							queryKey: [_, {
								transactionCid,
							}],
						}) => {
							const { getMessageTransfers } = await import('$/api/filfox')
							
							return await getMessageTransfers({
								address,
							})
						},
						select: result => ({
							transfers: (
								result.transfers
									.map(transfer => (
										normalizeTransferFilfox(
											transfer
										)
									))
							),
							transfersCount: result.totalCount,
						}),
					})

				:
					undefined
			),
		}),
	}[filecoinTransactionProvider]?.()}
	bind:result
	let:result
>
	<svelte:fragment slot="header">
		<slot name="header"
			transfers={result?.transfers}
			transfersCount={result?.transfersCount}
		/>
	</svelte:fragment>

	<slot
		transfers={result?.transfers}
		transfersCount={result?.transfersCount}
	/>
</Loader>
