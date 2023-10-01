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
	let link: string | undefined
	// (Computed)
	$: formattedTransactionId = formatTransactionHash(transactionId, format)
	$: link = network && transactionId && resolvePath(`/explorer/[networkSlug]/[transactionId]`, { networkSlug: network.slug, transactionId })
</script>


<svelte:element
	this={linked && network ? 'a' : 'span'}
	class="transaction-id monospace"
	{...linked && link ? {
		href: link
	} : undefined}
	title={transactionId}
>
	this={linked && link ? 'a' : 'span'}
</svelte:element>
