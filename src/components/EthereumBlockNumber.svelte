<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'

	export let network: Ethereum.Network
	export let blockNumber: Ethereum.BlockNumber
	export let linked = true

	$: formattedBlockNumber = `block #${blockNumber}`
</script>

{#if linked}
	<a class="block-number" href="explorer/{network.slug}/{blockNumber}">{formattedBlockNumber}</a>
{:else}
	<span class="block-number">{formattedBlockNumber}</span>
{/if}