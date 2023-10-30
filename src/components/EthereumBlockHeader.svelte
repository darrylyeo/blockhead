<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import { updatesByNetwork } from '../data/networks/updates'


	// Inputs
	export let network: Ethereum.Network
	export let block: Ethereum.Block

	// (Computed)
	$: lastUpdate = updatesByNetwork.get(network)?.find(upgrade => Number(block.blockNumber) >= upgrade.blockNumber)


	// Components
	import BlockNumber from './BlockNumber.svelte'
</script>


<header class="bar">
	<h2><BlockNumber {network} blockNumber={block.blockNumber} tween={false} /></h2>
	<span class="card-annotation">
		{network.name} {block.blockNumber == 0 ? 'Genesis Block' : 'Block'}

		{#if lastUpdate}(<a href={lastUpdate.links[0]} target="_blank">{lastUpdate.name}</a>){/if}
	</span>
</header>
