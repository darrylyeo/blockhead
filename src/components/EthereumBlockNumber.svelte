<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	
	export let network: Ethereum.Network
	export let blockNumber: Ethereum.BlockNumber

	export let format: 'full' | 'number-only' = 'full'
	export let linked = true

	$: formattedBlockNumber =
		format === 'full' ?
			`block #${blockNumber}`
		:
			blockNumber

</script>

<style>
	.format {
		font-family: var(--monospace-fonts), var(--base-fonts);
	}
</style>

{#if linked}
	<a class="block-number" href="/explorer/{network.slug}/{blockNumber}">
		<slot {formattedBlockNumber}>
			<span class="format">
				{formattedBlockNumber}
			</span>
		</slot>
	</a>
{:else}
	<slot {formattedBlockNumber}>
		<span class="block-number format">
			{formattedBlockNumber}
		</span>
	</slot>
{/if}