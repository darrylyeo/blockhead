<script context="module" lang="ts">
	let cachedBlockHeightForNetwork: Record<Ethereum.ChainID, Ethereum.BlockNumber> = {}
</script>


<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { NetworkProvider } from '../data/networkProviders/types'



	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider

	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork

	let publicClient: Ethereum.PublicClient | undefined
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider: networkProvider,
	})

	
	// Computed

	export let latestBlockNumber: Ethereum.BlockNumber | undefined

	let blockHeightForNetwork: Record<Ethereum.ChainID, Ethereum.BlockNumber> = cachedBlockHeightForNetwork
	
	$: {
		latestBlockNumber = blockHeightForNetwork[network.chainId]
		cachedBlockHeightForNetwork = blockHeightForNetwork
	}


	import { preferences } from '../state/preferences'
	import { getViemPublicClient } from '../data/networkProviders'
	import { onDestroy } from 'svelte'

	$: if(network && !blockHeightForNetwork[network.chainId] && publicClient){
		const { chainId } = network

		onDestroy(
			publicClient.watchBlockNumber({
				onBlockNumber: blockNumber => {
					blockHeightForNetwork = {
						...blockHeightForNetwork,
						[chainId]: Number(blockNumber)
					}
				}
			})
		)
	}


	import BlockNumber from './BlockNumber.svelte'
</script>


<slot {network} {latestBlockNumber}>
	<BlockNumber {network} blockNumber={latestBlockNumber} />
</slot>
