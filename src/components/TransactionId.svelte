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
	import { resolvePath } from '@sveltejs/kit'


	// Internal state
	// (Computed)
	$: formattedTransactionId = formatTransactionHash(transactionId, format)
	$: link = linked && network && transactionId ? resolvePath(`/explorer/[networkSlug]/tx/[transactionId]`, { networkSlug: network.slug, transactionId }) : undefined


	// Actions
	const onDragStart = (e: DragEvent) => {
		e.dataTransfer?.setData('text/plain', transactionId)
		if(link) e.dataTransfer?.setData('text/uri-list', link)
	}
</script>


<svelte:element
	this={link ? 'a' : 'span'}
	class="transaction-id monospace"
	{...link ? {
		href: link
	} : undefined}
	title={transactionId}
	draggable={true}
	on:dragstart={onDragStart}
>
	<slot {formattedTransactionId}>{formattedTransactionId}</slot>
</svelte:element>
