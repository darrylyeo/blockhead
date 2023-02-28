<script lang="ts">
	import type { Ethereum } from '../data/networks/types'


	export let transactionID: Ethereum.TransactionID
	export let network: Ethereum.Network
	export let format: 'full' | 'middle-truncated' = 'full'
	export let linked = true


	import { formatTransactionHash } from '../utils/formatTransactionHash'
	$: formattedTransactionID = formatTransactionHash(transactionID, format)
</script>


<style>
	.transaction-id {
		font-family: var(--monospace-fonts), var(--base-fonts);

		/* display: inline-block;
		max-width: 100%;
		overflow: hidden;
		text-overflow: ellipsis; */
	}
</style>


{#if linked}
	<a class="transaction-id" href="/explorer/{network.slug}/{transactionID}" title={transactionID}>{formattedTransactionID}</a>
{:else}
	<span class="transaction-id" title={transactionID}>{formattedTransactionID}</span>
{/if}