<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { ENS } from '../data/ens'
	import { networksByChainID } from '../data/ethereum/networks'


	export let network: Ethereum.Network = networksByChainID[1]
	export let ensName: string = ''

	export let linked = true


	$: formattedENSName = ensName.trim().toLowerCase()
</script>


<style>
	.format {
		font-family: var(--monospace-fonts), var(--base-fonts);
		font-size: 0.95em;

		/* display: inline-block;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis; */
	}
</style>


{#if linked}
	<a class="ens-name" href="/apps/ens/{formattedENSName}">
		<slot {formattedENSName}>
			<span class="format">
				{formattedENSName}
			</span>
		</slot>
	</a>
{:else}
	<slot {formattedENSName}>
		<span class="ens-name format">
			{formattedENSName}
		</span>
	</slot>
{/if}