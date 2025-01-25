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
	export let transaction: Filecoin.Transaction

	type SharedSlotProps = {
		transaction: typeof transaction,
	}

	type $$Slots = {
		header: SharedSlotProps,
		default: SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

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
	loadingMessage={`Retrieving transaction from ${filecoinTransactionProviders[filecoinTransactionProvider].name}...`}
	errorMessage={`Couldn't retrieve transaction from ${filecoinTransactionProviders[filecoinTransactionProvider].name}.`}
	{...{
		[FilecoinTransactionProvider.Beryx]: () => ({
			fromQuery: createQuery({
				queryKey: ['Transaction', {
					transactionProvider: filecoinTransactionProvider,
					networkProvider,
					chainId: network.chainId,
					transactionId: transactionCid,
				}],
				queryFn: async ({
					queryKey: [_, {
						chainId,
						transactionId,
					}],
				}) => {
					const { baseUrls, getTransactionsByHash } = await import('$/api/beryx/filecoin/index')

					return await getTransactionsByHash(
						transactionId,
						{
							baseUrl: baseUrls[chainId],
						}
					)
				},
				select: result => (
					normalizeTransactionsBeryx(
						result.transactions ?? [],
						network
					)
						[0]
				),
			}),
		}),

		[FilecoinTransactionProvider.Filfox]: () => ({
			fromQuery: createQuery({
				queryKey: ['Transaction', {
					transactionProvider: filecoinTransactionProvider,
					transactionId: transactionCid,
				}],
				queryFn: async ({
					queryKey: [_, {
						transactionId,
					}],
				}) => {
					const { getMessage } = await import('$/api/filfox')

					return await getMessage({
						cid: transactionId,
					})
				},
				select: result => (
					normalizeTransactionFilfox(
						result,
						network
					)
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
