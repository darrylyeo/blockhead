<script lang="ts">
	import type { Ethereum } from '../data/networks/types'


	export let network: Ethereum.Network
	export let transactionID: Ethereum.TransactionID
	export let transactionIndex: Ethereum.TransactionIndex
	export let blockNumber: Ethereum.BlockNumber


	export let showTransactionID = true


	import EthereumTransactionID from './EthereumTransactionID.svelte'
	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
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

	/* .muted {
		opacity: 0.8;
	} */
</style>


<p class="transaction row-inline" title="Transaction {transactionID}">
	{#if transactionID || blockNumber}
		<span class="muted">Transaction</span>
	{/if}
	{#if transactionID && showTransactionID}<span class="transaction-id"><EthereumTransactionID {network} {transactionID} format="middle-truncated"/></span>
	{/if}
	<span>
		{#if transactionID && showTransactionID && transactionIndex !== undefined}<span class="muted">(</span>{/if
		}{#if transactionIndex !== undefined}<a class="muted" href={transactionID && !showTransactionID ? `/explorer/${network.slug}/${transactionID}` : undefined}>#{transactionIndex}</a> {/if
		}{#if blockNumber !== undefined}
			<span class="muted">in block</span>
			<EthereumBlockNumber {network} {blockNumber} format="number-only" />{
			#if transactionID && showTransactionID && transactionIndex !== undefined}<span class="muted">)</span>{/if}
		{/if}
	</span>
</p>