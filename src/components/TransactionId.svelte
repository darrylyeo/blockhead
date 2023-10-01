<script lang="ts">
	import type { Ethereum } from '../data/networks/types'


	export let transactionId: Ethereum.TransactionID
	export let network: Ethereum.Network

	export let format: 'full' | 'middle-truncated' = 'full'
	export let linked = true


	import { formatTransactionHash } from '../utils/formatTransactionHash'


	$: formattedTransactionId = formatTransactionHash(transactionId, format)
</script>


<svelte:element
	this={linked && network ? 'a' : 'span'}
	class="transaction-id monospace"
	{...linked && network ? {
		href: `/explorer/${network.slug}/${transactionId}`
	} : {}}
	title={transactionId}
>
	<slot {formattedTransactionId}>{formattedTransactionId}</slot>
</svelte:element>
