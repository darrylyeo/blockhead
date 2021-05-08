<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'

	export let network: Ethereum.Network
	export let transactionID: Ethereum.TransactionID
	export let blockNumber: Ethereum.BlockNumber

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

	.transaction :global(.block-number) {
		display: inline-block;
		background-color: var(--card-background-color);
		padding: 0.2em 0.5em;
		border-radius: 0.33em;
	}

	.muted {
		opacity: 0.75;
	}
</style>

<p class="transaction">
	{#if transactionID || blockNumber}
		<span class="muted">Transaction</span>
	{/if}
	{#if transactionID}
		<EthereumTransactionID {network} {transactionID} format="middle-truncated"/>
	{/if}
	{#if blockNumber}
		<span class="muted">at</span>
		<EthereumBlockNumber {network} {blockNumber}/>
	{/if}
</p>