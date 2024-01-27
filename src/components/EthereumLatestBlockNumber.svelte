<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { blockHeightForNetwork } from '$/state/blockHeights'


	// Inputs
	export let network: Ethereum.Network


	// Internal state
	$: latestBlockNumberStore = blockHeightForNetwork(network)


	// Outputs
	let latestBlockNumber: Ethereum.BlockNumber | undefined
	// (Computed)
	$: {
		latestBlockNumber = $latestBlockNumberStore
	}

	type $$Slots = {
		default: {
			network: typeof network,
			latestBlockNumber: typeof latestBlockNumber,
		}
	}


	// Components
	import BlockNumber from './BlockNumber.svelte'
</script>


<slot {network} {latestBlockNumber}>
	<BlockNumber {network} blockNumber={latestBlockNumber} />
</slot>
