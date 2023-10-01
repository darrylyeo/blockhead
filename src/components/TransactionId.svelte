<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'


	// Inputs
	export let transactionId: Ethereum.TransactionID
	export let network: Ethereum.Network
	// (View options)
	export let format: 'full' | 'middle-truncated' = 'full'
	export let linked = true


	// Functions
	import { formatTransactionHash } from '../utils/formatTransactionHash'


	// Internal state
	// (Computed)
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
