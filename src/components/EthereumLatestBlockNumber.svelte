<script context="module" lang="ts">
	let cachedBlockHeightForNetwork: Record<Ethereum.ChainID, Ethereum.BlockNumber> = {}
</script>


<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { NetworkProvider } from '../data/networkProviders/types'



	export let network: Ethereum.Network
	export let networkProvider: NetworkProvider

	$: networkProvider = $$props.networkProvider ?? $preferences.rpcNetwork

	
	// Computed

	export let latestBlockNumber: Ethereum.BlockNumber | undefined

	let blockHeightForNetwork: Record<Ethereum.ChainID, Ethereum.BlockNumber> = cachedBlockHeightForNetwork
	
	$: {
		latestBlockNumber = blockHeightForNetwork[network.chainId]
		cachedBlockHeightForNetwork = blockHeightForNetwork
	}


	import { preferences } from '../state/preferences'
	import { getEthersProvider } from '../data/networkProviders'
	// import { onDestroy } from 'svelte'

	$: if(network && !blockHeightForNetwork[network.chainId]){
		const { chainId } = network

		const provider = getEthersProvider({
			network,
			networkProvider,
		})

		const onBlock = (blockNumber) => {
			blockHeightForNetwork = {
				...blockHeightForNetwork,
				[chainId]: blockNumber
			}
		}

		provider.on('block', onBlock)

		// onDestroy(() => provider.off('block', onBlock))
	}


	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
</script>


<slot {network} {latestBlockNumber}>
	<EthereumBlockNumber {network} blockNumber={latestBlockNumber} />
</slot>
