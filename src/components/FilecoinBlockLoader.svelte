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
	export let blockCid: Filecoin.BlockCid
	export let filecoinTransactionProvider: FilecoinTransactionProvider
	export let networkProvider: NetworkProvider | undefined
	export let publicClient: Ethereum.PublicClient | undefined

	// (Computed)
	$: filecoinTransactionProvider = $$props.filecoinTransactionProvider ?? $preferences.filecoinTransactionProvider
	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider
	})

	// View options
	export let viewOptions: Loader['$$prop_def']['viewOptions'] | undefined = {
		contentClass: 'column',
	}


	// Outputs
	export let block: Filecoin.Block

	type SharedSlotProps = {
		block: typeof block
	}

	type $$Slots = {
		header: SharedSlotProps
		default: SharedSlotProps
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { normalizeBlockFromTipset as normalizeBlockFromTipsetBeryx } from '$/api/beryx/filecoin/normalize'

	import { normalizeBlock as normalizeBlockFilfox } from '$/api/filfox/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	{viewOptions}
	loadingIcon={filecoinTransactionProviders[filecoinTransactionProvider].icon}
	loadingIconName={filecoinTransactionProviders[filecoinTransactionProvider].name}
	loadingMessage={`Retrieving ${network.name} block from ${filecoinTransactionProviders[filecoinTransactionProvider].name}...`}
	errorMessage={`Couldn't retrieve ${network.name} block from ${filecoinTransactionProviders[filecoinTransactionProvider].name}.`}
	{...{
		[FilecoinTransactionProvider.Beryx]: () => ({
			fromQuery: createQuery({
				queryKey: ['Block', {
					filecoinTransactionProvider,
					chainId: network.chainId,
					blockCid,
				}],
				queryFn: async ({
					queryKey: [_, {
						chainId,
						blockCid,
					}],
				}) => {
					const { baseUrls, getTipsetByBlockCid } = await import('$/api/beryx/filecoin/index')

					return await getTipsetByBlockCid(
						blockCid,
						{
							baseUrl: baseUrls[chainId],
						}
					)
				},
				select: tipset => (
					normalizeBlockFromTipsetBeryx(
						tipset,
						blockCid
					)
				),
			}),
		}),

		[FilecoinTransactionProvider.Filfox]: () => ({
			fromQuery: createQuery({
				queryKey: ['Block', {
					filecoinTransactionProvider,
					blockCid,
				}],
				queryFn: async ({
					queryKey: [_, {
						blockCid,
					}],
				}) => {
					const { getBlock } = await import('$/api/filfox')
					
					return await getBlock({
						cid: blockCid,
					})
				},
				select: result => (
					normalizeBlockFilfox(result)
				)
			}),
		}),
	}[filecoinTransactionProvider]?.()}
	bind:result={block}
	let:result={block}
>
	<svelte:fragment slot="header">
		<slot name="header"
			{block}
		/>
	</svelte:fragment>

	<slot {block} />
</Loader>
