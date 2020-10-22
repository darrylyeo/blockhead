<script lang="ts">
	export let transactionID
	export let blockNumber

	import EthereumTransactionID from './EthereumTransactionID.svelte'
	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
</script>

<style>
	.transaction {
		display: inline-flex;
		align-items: baseline;
		justify-items: start;
		gap: 0.75ch;
	}
	.transaction > * {
		flex: 0 auto;
	}

	:global(.block-number) {
		background-color: var(--card-background-color);
		--padding-outer: 0.5em;
	}

	.muted {
		opacity: 0.75;
	}
</style>

<p class="transaction">
	<span class="muted">Transaction</span>
	<EthereumTransactionID {transactionID}/>
	{#if blockNumber}
		<span class="muted">at</span>
		<EthereumBlockNumber {blockNumber}/>
	{/if}
</p>