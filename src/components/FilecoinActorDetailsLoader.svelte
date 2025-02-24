<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { FilecoinTransactionProvider, filecoinTransactionProviders } from '$/data/filecoinTransactionProviders'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { getViemPublicClient } from '$/data/networkProviders'


	// Context
	import { preferences } from '$/state/preferences'


	// Inputs
	export let network: Ethereum.Network
	export let address: Filecoin.Address
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
	export let actor: Filecoin.Actor

	type SharedSlotProps = {
		actor: typeof actor
		filecoinTransactionProvider: typeof filecoinTransactionProvider
	}

	type $$Slots = {
		header: SharedSlotProps,
		default: SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { normalizeAccount as normalizeAccountBeryx } from '$/api/beryx/filecoin/normalize'

	import { normalizeAccount as normalizeAccountFilfox } from '$/api/filfox/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		contentClass: 'column',
	}}
	loadingIcon={filecoinTransactionProviders[filecoinTransactionProvider].icon}
	loadingIconName={filecoinTransactionProviders[filecoinTransactionProvider].name}
	loadingMessage={`Retrieving ${network.name} actor information from ${filecoinTransactionProviders[filecoinTransactionProvider].name}...`}
	errorMessage={`Couldn't retrieve ${network.name} actor information from ${filecoinTransactionProviders[filecoinTransactionProvider].name}.`}
	{...{
		[FilecoinTransactionProvider.Beryx]: () => ({
			fromQuery: createQuery({
				queryKey: ['Account', {
					transactionProvider: filecoinTransactionProvider,
					chainId: network.chainId,
					address,
				}],
				queryFn: async ({
					queryKey: [_, {
						chainId,
						address,
					}],
				}) => {
					const { baseUrls, getAccountInfoByAddress } = await import('$/api/beryx/filecoin/index')

					try {
						return await getAccountInfoByAddress(
							address,
							{
								baseUrl: baseUrls[chainId],
							}
						)
					}catch(error){
						if(error.status === 422)
							throw `${error.data.status} ${error.data.error}`

						throw error
					}
				},
				select: account => (
					normalizeAccountBeryx(
						account,
					)
				),
			}),
		}),

		[FilecoinTransactionProvider.Filfox]: () => ({
			fromQuery: createQuery({
				queryKey: ['Account', {
					transactionProvider: filecoinTransactionProvider,
					chainId: network.chainId,
					address,
				}],
				queryFn: async ({
					queryKey: [_, {
						chainId,
						address,
					}],
				}) => {
					const { getAddress } = await import('$/api/filfox')
					const { baseUrls } = await import('$/api/filfox')

					return await getAddress(
						{
							address,
						},
						{
							baseUrl: baseUrls[chainId],
						}
					)
				},
				select: account => (
					normalizeAccountFilfox(
						account,
						network,
					)
				),
			}),
		}),
	}[filecoinTransactionProvider]?.()}
	bind:result={actor}
	let:result={actor}
>
	<svelte:fragment slot="header">
		<slot name="header"
			{actor}
			{filecoinTransactionProvider}
		/>
	</svelte:fragment>

	<slot
		{actor}
		{filecoinTransactionProvider}
	/>
</Loader>
