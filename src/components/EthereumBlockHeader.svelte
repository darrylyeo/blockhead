<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import { updatesByNetwork } from '$/data/networks/updates'


	// Inputs
	export let network: Ethereum.Network
	export let block: Ethereum.Block

	// (Computed)
	$: lastUpdate = updatesByNetwork.get(network)?.find(upgrade => Number(block.blockNumber) >= upgrade.blockNumber)

	// (View options)
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 2


	// Components
	import BlockNumber from './BlockNumber.svelte'
</script>


<header class="bar">
	<svelte:element this={`h${headingLevel}`}>
		<BlockNumber {network} blockNumber={block.blockNumber} tween={false} />
	</svelte:element>

	<span class="card-annotation">
		{network.name} {block.blockNumber == 0 ? 'Genesis Block' : 'Block'}

		{#if lastUpdate}(<a href={lastUpdate.links[0]} target="_blank">{lastUpdate.name}</a>){/if}
	</span>
</header>
