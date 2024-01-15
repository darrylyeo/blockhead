<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import type { Filecoin } from '../data/filecoin'
	import { TransactionProvider, transactionProviderIcons } from '../data/transactionProvider'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import { getViemPublicClient } from '../data/networkProviders'


	// Context
	import { preferences } from '../state/preferences'


	// Inputs
	export let network: Ethereum.Network
	export let tipsetNumber: Filecoin.TipsetNumber
	export let transactionProvider: TransactionProvider.Beryx = TransactionProvider.Beryx
	export let networkProvider: NetworkProvider | undefined
	export let publicClient: Ethereum.PublicClient | undefined

	// (Computed)
	$: transactionProvider = $$props.transactionProvider ?? $preferences.transactionProvider
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
	import type { getTipsetByHeight } from '../api/beryx/filecoin/api'

	const normalizeTipsetBeryx = (tipset: Awaited<ReturnType<typeof getTipsetByHeight>>) => ({
		id: tipset.tipset_cid,
		number: BigInt(tipset.height),
		timestamp: new Date(tipset.timestamp).valueOf(),
		isCanonical: tipset.canonical,
		baseGasFee: BigInt(tipset.base_fee),

		previousId: tipset.parent_tipset_cid,
		blocks: tipset.blocks_info?.map(block => ({
			id: block.BlockCid,
			minerAddress: block.Miner,
		})),
		transactions: tipset.transactions,
	} as Filecoin.Tipset)


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	viewOptions={{
		contentClass: 'column',
	}}
	loadingIcon={transactionProviderIcons[transactionProvider]}
	loadingIconName={transactionProvider}
	loadingMessage={`Retrieving ${network.name} tipset from ${transactionProvider}...`}
	errorMessage={`Couldn't retrieve ${network.name} tipset from ${transactionProvider}.`}
	{...{
		[TransactionProvider.Beryx]: () => ({
			fromQuery: createQuery({
				queryKey: ['Block', {
					transactionProvider,
					chainId: network.chainId,
					tipsetNumber: Number(tipsetNumber),
				}],
				queryFn: async () => {
					if(network.slug !== 'filecoin') throw new Error('Beryx only supports Filecoin.')

					const { getTipsetByHeight } = await import('../api/beryx/filecoin/index')

					return normalizeTipsetBeryx((await getTipsetByHeight(Number(tipsetNumber)))[0])
				},
			}),
		}),
	}[transactionProvider]?.()}
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
