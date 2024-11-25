<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'


	// Inputs
	export let transactionId: Ethereum.TransactionId
	export let network: Ethereum.Network
	// (View options)
	export let format: 'full' | 'middle-truncated' = 'full'
	export let linked = true


	// Functions
	import { formatTransactionHash } from '$/utils/formatTransactionHash'
	import { resolveRoute } from '$app/paths'

	// Internal state
	// (Computed)
	$: formattedTransactionId = formatTransactionHash(transactionId, format)
	$: link = linked && network && transactionId ? resolveRoute(`/explorer/[networkSlug]/tx/[transactionId]`, { networkSlug: network.slug, transactionId }) : undefined


	// Actions
	const onDragStart = (e: DragEvent) => {
		e.dataTransfer?.setData('text/plain', transactionId)
		if(link) e.dataTransfer?.setData('text/uri-list', link)
	}


	// Components
	import TruncatedValue from './TruncatedValue.svelte'
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
	<slot {formattedTransactionId}>
		{#if format === 'middle-truncated'}
			<TruncatedValue
				value={transactionId}
			/>
		{:else}
			{formattedTransactionId}
		{/if}
	</slot>
</svelte:element>
