<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'

	export let blockNumber: Ethereum.BlockNumber
	export let linked = true

	$: formattedBlockNumber = `block #${blockNumber}`

	let blockchain = 'ethereum'
</script>

{#if linked}
	<a class="block-number" href="explorer/{blockchain}/{blockNumber}">{formattedBlockNumber}</a>
{:else}
	<span class="block-number">{formattedBlockNumber}</span>
{/if}