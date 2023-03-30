<script lang="ts">
	import type { Ethereum } from '../data/networks/types'


	export let transactionID: Ethereum.TransactionID
	export let network: Ethereum.Network

	export let format: 'full' | 'middle-truncated' = 'full'
	export let linked = true


	import { formatTransactionHash } from '../utils/formatTransactionHash'


	$: formattedTransactionId = formatTransactionHash(transactionID, format)
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


<svelte:element
	this={linked && network ? 'a' : 'span'}
	class="transaction-id"
	{...linked && network ? {
		href: `/explorer/${network.slug}/${transactionID}`
	} : {}}
	title={transactionID}
>
	<slot {formattedTransactionId}>{formattedTransactionId}</slot>
</svelte:element>
