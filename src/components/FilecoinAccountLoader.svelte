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
	export let account: Filecoin.Account

	type SharedSlotProps = {
		account: typeof account,
	}

	type $$Slots = {
		header: SharedSlotProps,
		default: SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'
	import type { getAccountInfoByAddress } from '$/api/beryx/filecoin/api'

	const normalizeAccountBeryx = (account: Awaited<ReturnType<typeof getAccountInfoByAddress>>) => ({
		address,
		actorType: account.actor_type,

		robustAddress: account.robust,
		createdTipsetTimestamp: account.create_timestamp,
		createdTransactionId: account.creation_tx_hash,
	} as Filecoin.Account)


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		contentClass: 'column',
	}}
	loadingIcon={filecoinTransactionProviders[filecoinTransactionProvider].icon}
	loadingIconName={filecoinTransactionProviders[filecoinTransactionProvider].name}
	loadingMessage={`Retrieving ${network.name} account data from ${filecoinTransactionProviders[filecoinTransactionProvider].name}...`}
	errorMessage={`Couldn't retrieve ${network.name} account data from ${filecoinTransactionProviders[filecoinTransactionProvider].name}.`}
	{...{
		[FilecoinTransactionProvider.Beryx]: () => ({
			fromQuery: createQuery({
				queryKey: ['Account', {
					transactionProvider: filecoinTransactionProvider,
					chainId: network.chainId,
					address,
				}],
				queryFn: async () => {
					if(network.slug !== 'filecoin') throw new Error('Beryx only supports Filecoin.')

					const { getAccountInfoByAddress } = await import('$/api/beryx/filecoin/index')

					return await getAccountInfoByAddress(address)
				},
				select: normalizeAccountBeryx,
			}),
		}),
	}[filecoinTransactionProvider]?.()}
	bind:result={account}
	let:result={account}
	debug
>
	<svelte:fragment slot="header">
		<slot name="header"
			{account}
		/>
	</svelte:fragment>

	<slot {account} />
</Loader>
