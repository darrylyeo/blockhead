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
	export let query: (
		| {
			tipsetNumber: Filecoin.TipsetNumber,
		}
		| {
			tipsetCid: Filecoin.TipsetCid,
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
	export let tipset: Filecoin.Tipset

	type SharedSlotProps = {
		tipset: typeof tipset,
	}

	type $$Slots = {
		header: SharedSlotProps,
		default: SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { normalizeTipset as normalizeTipsetBeryx } from '$/api/beryx/filecoin/normalize'

	import { normalizeTipset as normalizeTipsetFilfox } from '$/api/filfox/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		contentClass: 'column',
	}}
	loadingIcon={filecoinTransactionProviders[filecoinTransactionProvider].icon}
	loadingIconName={filecoinTransactionProviders[filecoinTransactionProvider].name}
	loadingMessage={`Retrieving ${network.name} tipset from ${filecoinTransactionProviders[filecoinTransactionProvider].name}...`}
	errorMessage={`Couldn't retrieve ${network.name} tipset from ${filecoinTransactionProviders[filecoinTransactionProvider].name}.`}
	{...{
		[FilecoinTransactionProvider.Beryx]: () => ({
			fromQuery: (
				'tipsetNumber' in query ?
					createQuery({
						queryKey: ['Block', {
							filecoinTransactionProvider,
							chainId: network.chainId,
							tipsetNumber: Number(query.tipsetNumber),
						}],
						queryFn: async ({
							queryKey: [_, {
								chainId,
								tipsetNumber
							}]
						}) => {
							const { baseUrls, getTipsetByHeight } = await import('$/api/beryx/filecoin/index')

							return await getTipsetByHeight(
								tipsetNumber,
								{
									baseUrl: baseUrls[chainId]
								}
							)
						},
						select: result => (
							normalizeTipsetBeryx(result[0])
						),
					})

				: 'tipsetCid' in query ?
					createQuery({
						queryKey: ['Block', {
							filecoinTransactionProvider,
							chainId: network.chainId,
							tipsetCid: query.tipsetCid,
						}],
						queryFn: async ({
							queryKey: [_, {
								tipsetCid,
							}],
						}) => {
							const { getTipsetByHash } = await import('$/api/beryx/filecoin/index')

							return await getTipsetByHash(tipsetCid)
						},
						select: result => (
							normalizeTipsetBeryx(result[0])
						),
					})

				:
					undefined
			),
		}),

		[FilecoinTransactionProvider.Filfox]: () => ({
			fromQuery: (
				'tipsetNumber' in query ?
					createQuery({
						queryKey: ['Block', {
							filecoinTransactionProvider,
							tipsetNumber: Number(query.tipsetNumber),
						}],
						queryFn: async () => {
							const { getTipset } = await import('$/api/filfox')
							
							return await getTipset({
								height: Number(query.tipsetNumber),
							})
						},
						select: result => (
							normalizeTipsetFilfox(result)
						),
					})

				: 'tipsetCid' in query ?
					createQuery({
						queryKey: ['Block', {
							filecoinTransactionProvider,
							tipsetCid: query.tipsetCid,
						}],
						queryFn: async () => {
							throw new Error(`The ${filecoinTransactionProviders[filecoinTransactionProvider].name} API doesn't support retrieving tipset by CID.`) 
						},
					})

				:
					undefined
			),
		}),
	}[filecoinTransactionProvider]?.()}
	bind:result={tipset}
	let:result={tipset}
	debug
>
	<svelte:fragment slot="header">
		<slot name="header"
			{tipset}
		/>
	</svelte:fragment>

	<slot {tipset} />
</Loader>
