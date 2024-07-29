<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { Filecoin } from '$/data/filecoin'
	import { TokenBalancesProvider, tokenBalancesProviderIcons } from '$/data/tokenBalancesProvider'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { getViemPublicClient } from '$/data/networkProviders'


	// Context
	import { preferences } from '$/state/preferences'


	// Inputs
	export let network: Ethereum.Network
	export let address: Filecoin.Address
	export let tokenBalancesProvider: TokenBalancesProvider.Beryx = TokenBalancesProvider.Beryx
	export let networkProvider: NetworkProvider | undefined
	export let publicClient: Ethereum.PublicClient | undefined

	// (Computed)
	$: tokenBalancesProvider = $$props.tokenBalancesProvider ?? $preferences.tokenBalancesProvider
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
	import type { getAccountBalanceByAddress } from '$/api/beryx/filecoin/api'

	const normalizeBalanceBeryx = (balance: Awaited<ReturnType<typeof getAccountBalanceByAddress>>['balances'][number]) => ({
		value: Number(balance.value),
		token: {
			symbol: balance.currency.symbol,
			decimals: balance.currency.decimals,
		},
	})


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		contentClass: 'column',
	}}
	loadingIcon={tokenBalancesProviderIcons[tokenBalancesProvider]}
	loadingIconName={tokenBalancesProvider}
	loadingMessage={`Retrieving ${network.name} account data from ${tokenBalancesProvider}...`}
	errorMessage={`Couldn't retrieve ${network.name} account data from ${tokenBalancesProvider}.`}
	{...{
		[TokenBalancesProvider.Beryx]: () => ({
			fromQuery: createQuery({
				queryKey: ['Balances', {
					tokenBalancesProvider,
					chainId: network.chainId,
					address,
				}],
				queryFn: async () => {
					if(network.slug !== 'filecoin') throw new Error('Beryx only supports Filecoin.')

					const { getAccountBalanceByAddress } = await import('$/api/beryx/filecoin/index')

					return (await getAccountBalanceByAddress(address)).balances.map(normalizeBalanceBeryx)
				},
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
