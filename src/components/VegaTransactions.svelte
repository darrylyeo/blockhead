<script>
	export let transactionsStream

	const dummyTransaction = {market: {tradableInstrument: {instrument: {quoteName: 'BTC', baseName: 'ETH'}}}, price: 300, size: 10, aggressor: 'SIDE_BUY', makerId: '1234abcd', takerId: '5678cdef', trades: []}
	dummyTransaction.trades.push(dummyTransaction)

	import VegaTransaction from './VegaTransaction.svelte'
	import Loading from './Loading.svelte'
</script>

<style>
	div {
		display: grid;
		grid-auto-flow: row reverse;
		gap: var(--padding-inner);
	}
</style>

<div>
	{#if transactionsStream}
		{#each $transactionsStream as tx (tx.id)}
			<VegaTransaction {tx} />
		{:else}
			<Loading>Loading transactions...</Loading>
			<VegaTransaction tx={dummyTransaction} />
		{/each}
	{:else}
		<Loading>Connecting to Vega...</Loading>
	{/if}
</div>