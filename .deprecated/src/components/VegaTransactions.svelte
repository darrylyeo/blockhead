<script>
	export let transactionsStream

	const dummyTransaction = {market: {tradableInstrument: {instrument: {quoteName: 'BTC', baseName: 'ETH'}}}, price: 123.456, size: 1, aggressor: 'SIDE_BUY', makerId: '1234abcd', takerId: '5678cdef', trades: []}
	dummyTransaction.trades.push(dummyTransaction)

	import VegaTransaction from '$/components/VegaTransaction.svelte'
	import Loading from '$/components/Loading.svelte'

	import { fade } from 'svelte/transition'
	import { flip } from 'svelte/animate'
</script>

<style>
	.transactions {
		display: grid;
		grid-auto-flow: row reverse;
		gap: var(--padding-inner);

		font-size: 0.8em;
	}
</style>

<div class="transactions">
	{#if transactionsStream}
		{#each $transactionsStream as tx (tx.id)}
			<div><!-- transition:fade animate:flip -->
				<VegaTransaction {tx} />
			</div>
		{:else}
			<Loading>Connecting to Vega...</Loading><!-- <Loading>Loading transactions...</Loading> -->
			<div class="placeholder">
				<VegaTransaction tx={dummyTransaction} />
			</div>
		{/each}
	{:else}
		<!-- <Loading>Connecting to Vega...</Loading> -->
	{/if}
</div>