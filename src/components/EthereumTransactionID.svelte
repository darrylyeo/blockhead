<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'

	export let transactionID: Ethereum.TransactionID
	export let network: Ethereum.Network
	export let format: 'full' | 'middle-truncated' = 'full'
	export let linked = true

	$: formattedTransactionID =
		format === 'middle-truncated' ?
			transactionID.slice(0, 10) + '…' + transactionID.slice(-8)
		:
			transactionID
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
	<a class="transaction-id" href="explorer/{network.slug}/{transactionID}">{formattedTransactionID}</a>
{:else}
	<span class="transaction-id">{formattedTransactionID}</span>
{/if}