<script>
    import { onMount } from 'svelte'

	// import { recentTrades } from '../data/vega.ts'
    
    let samplePercentage
    let transactions
    onMount(async () => {
	    const { recentTransactionsStream } = await import('../data/vega.ts')
        samplePercentage = 100.0
        transactions = recentTransactionsStream(tx => Math.random() < samplePercentage / 100);
    })

    import VegaTransaction from './VegaTransaction.svelte'
</script>

<style>
	input {
		background-color: #333;
		padding: 0.3em;
		color: lightgoldenrodyellow;
		border: 1px solid darkblue;
		font-size: 1em;
		width: 4em;
	}
</style>

<main>
	<div id="controls">
        <label>
            Sample <input type="number" min="0" max="100" bind:value={samplePercentage}>% of transactions
        </label>
	</div>
	{#each [...$transactions || []].reverse() as tx (tx.id)}
		<VegaTransaction {tx} />
	{/each}
</main>