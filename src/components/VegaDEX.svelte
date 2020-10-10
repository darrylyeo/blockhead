<script>
    import { onMount } from 'svelte'

	// import { recentTrades } from '../data/vega.ts'
    import { VEGA_NODE_URL } from '../config.ts'
    
    let samplePercentage
    let trades
    onMount(async () => {
	    const { recentTrades } = await import('../data/vega.ts')
        samplePercentage = 100.0
        trades = recentTrades(tx => Math.random() < (samplePercentage / 100), `wss://${VEGA_NODE_URL}/query`);
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
            Sample <input type="number" min="0" max="100" bind:value={samplePercentage}>% of trades
        </label>
	</div>
	{#each ($trades || []).slice().reverse() as tx (tx.id)}
		<VegaTransaction {tx} />
	{/each}
</main>