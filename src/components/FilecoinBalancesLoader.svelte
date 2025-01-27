<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { FilecoinTokenBalancesProvider, filecoinTokenBalancesProviders } from '$/data/filecoinTokenBalancesProviders'
	import type { TokenWithBalance } from '$/data/tokens'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { getViemPublicClient } from '$/data/networkProviders'


	// Context
	import { preferences } from '$/state/preferences'


	// Inputs
	export let network: Ethereum.Network
	export let address: Filecoin.Address
	export let tokenBalancesProvider: FilecoinTokenBalancesProvider
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
	export let balances: TokenWithBalance[]

	type SharedSlotProps = {
		balances: typeof balances,
		tokenBalancesProvider: typeof tokenBalancesProvider,
	}

	type $$Slots = {
		header: SharedSlotProps,
		default: SharedSlotProps,
	}


	// Functions
	import { isTruthy } from '$/utils/isTruthy'

	import { createQuery } from '@tanstack/svelte-query'

	import { normalizeBalance as normalizeBalanceBeryx } from '$/api/beryx/filecoin/normalize'

	import { normalizeCurrentBalance as normalizeCurrentBalanceFilfox } from '$/api/filfox/normalize'


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
				queryFn: async ({
					queryKey: [_, {
						chainId,
						address,
					}],
				}) => {
					const { baseUrls, getAccountBalanceByAddress } = await import('$/api/beryx/filecoin/index')

					return await getAccountBalanceByAddress(
						address,
						{
							baseUrl: baseUrls[chainId],
						}
					)
				},
				select: result => (
					result.balances
						?.map(balance => (
							normalizeBalanceBeryx(balance)
						))
				),
			}),
		}),

		[FilecoinTokenBalancesProvider.Filfox]: () => ({
			fromQuery: createQuery({
				queryKey: ['Balances', {
					tokenBalancesProvider,
					chainId: network.chainId,
					address,
				}],
				queryFn: async ({
					queryKey: [_, {
						chainId,
						address,
					}],
				}) => {
					const { getAddressBalanceStats } = await import('$/api/filfox/index')

					return await getAddressBalanceStats({
						address,
					})
				},
				select: balances => (
					[
						normalizeCurrentBalanceFilfox(
							balances,
							network
						),
					]
						.filter(isTruthy)
				),
			}),
		}),
	}[tokenBalancesProvider]?.()}
	bind:result={balances}
	let:result={balances}
>
	<svelte:fragment slot="header">
		<slot name="header"
			{balances}
			{tokenBalancesProvider}
		/>
	</svelte:fragment>

	<slot
		{balances}
		{tokenBalancesProvider}
	/>
</Loader>
