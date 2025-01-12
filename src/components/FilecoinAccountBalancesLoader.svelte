<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { FilecoinTokenBalancesProvider, filecoinTokenBalancesProviders } from '$/data/filecoinTokenBalancesProviders'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { getViemPublicClient } from '$/data/networkProviders'


	// Context
	import { preferences } from '$/state/preferences'


	// Inputs
	export let network: Ethereum.Network
	export let address: Filecoin.Address
	export let tokenBalancesProvider: FilecoinTokenBalancesProvider = FilecoinTokenBalancesProvider.Beryx
	export let networkProvider: NetworkProvider | undefined
	export let publicClient: Ethereum.PublicClient | undefined

	// (Computed)
	$: tokenBalancesProvider = $$props.tokenBalancesProvider ?? $preferences.filecoinTokenBalancesProvider
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider,
	})


	// Outputs
	export let balances: Ethereum.Erc20Token[]

	type SharedSlotProps = {
		balances: typeof balances,
	}

	type $$Slots = {
		header: SharedSlotProps,
		default: SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { normalizeBalance as normalizeBalanceBeryx } from '$/api/beryx/filecoin/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		contentClass: 'column',
	}}
	loadingIcon={filecoinTokenBalancesProviders[tokenBalancesProvider].icon}
	loadingIconName={filecoinTokenBalancesProviders[tokenBalancesProvider].name}
	loadingMessage={`Retrieving ${network.name} account data from ${filecoinTokenBalancesProviders[tokenBalancesProvider].name}...`}
	errorMessage={`Couldn't retrieve ${network.name} account data from ${filecoinTokenBalancesProviders[tokenBalancesProvider].name}.`}
	{...{
		[FilecoinTokenBalancesProvider.Beryx]: () => ({
			fromQuery: createQuery({
				queryKey: ['Balances', {
					tokenBalancesProvider,
					chainId: network.chainId,
					address,
				}],
				queryFn: async () => {
					if(network.slug !== 'filecoin') throw new Error('Beryx only supports Filecoin.')

					const { getAccountBalanceByAddress } = await import('$/api/beryx/filecoin/index')

					return await getAccountBalanceByAddress(address)
				},
				select: result => (
					result.balances
						?.map(balance => (
							normalizeBalanceBeryx(balance)
						))
				),
			}),
		}),
	}[tokenBalancesProvider]?.()}
	bind:result={balances}
	let:result={balances}
	debug
>
	<svelte:fragment slot="header">
		<slot name="header"
			{balances}
		/>
	</svelte:fragment>

	<slot {balances} />
</Loader>
