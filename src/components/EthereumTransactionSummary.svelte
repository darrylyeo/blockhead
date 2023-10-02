<script lang="ts">
	import type { Ethereum } from '../data/networks/types'


	export let network: Ethereum.Network
	export let transactionID: Ethereum.TransactionID
	export let transactionIndex: Ethereum.TransactionIndex
	export let blockNumber: Ethereum.BlockNumber


	export let showTransactionID = true


	import TransactionId from './TransactionId.svelte'
	import BlockNumber from './BlockNumber.svelte'
	import InlineContainer from './InlineContainer.svelte'
</script>


<style>
	.transaction {
		display: inline-flex;
		align-items: baseline;
		justify-items: start;
		/* gap: 0.75ch; */
	}
	.transaction > * {
		flex: 0 auto;
	}

	.regular-font {
		font-family: var(--base-fonts);
	}
</style>


<p class="transaction row-inline wrap" title="Transaction {transactionID}">
	<TransactionId
		{network}
		transactionId={transactionID}
		format="middle-truncated"
		linked
		let:formattedTransactionId
	>
		{#if transactionID || blockNumber}<span class="regular-font">Transaction </span>{/if
		}<InlineContainer isOpen={transactionID && showTransactionID} clip>{formattedTransactionId}</InlineContainer>
	</TransactionId>

	<span>
		{#if transactionID && showTransactionID && transactionIndex !== undefined}<span class="muted">(</span>{/if
		}{#if transactionIndex !== undefined}{#if transactionID && !showTransactionID}<TransactionId>#{transactionIndex}</TransactionId>{:else}<span class="muted">#{transactionIndex}</span>{/if} {/if
		}{#if blockNumber !== undefined}
			<span class="muted">in block</span>
			<BlockNumber {network} {blockNumber} />{
			#if transactionID && showTransactionID && transactionIndex !== undefined}<span class="muted">)</span>{/if}
		{/if}
	</span>
</p>