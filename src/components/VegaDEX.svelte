<script>
    import { onMount } from 'svelte'

	// import { recentTrades } from '../data/vega.ts'
    
    let samplePercentage = 100
    let transactions
    onMount(async () => {
	    const { recentTransactionsStream } = await import('../data/vega.ts')
        transactions = recentTransactionsStream(tx => Math.random() < samplePercentage / 100);
    })

    import VegaTransaction from './VegaTransaction.svelte'
</script>

<style>
	section {
        display: grid;
        grid-auto-flow: row reverse;
        gap: var(--padding-inner);
    }

    #controls {
        display: flex;
    }
    #controls > * {
        flex: auto;
    }
</style>

<h2>Vega</h2>

<div id="controls">
    <label>
        Show <select bind:value={samplePercentage}>
            <option value="100">all transactions</option>
            <option value="50">every other transaction</option>
            <option value="20">1 out of 5 transactions</option>
            <option value="10">1 out of 10 transactions</option>
            <option value="1">1 out of 100 transactions</option>
        </select>
    </label>
</div>
<section>
    {#if transactions}
        {#each $transactions as tx (tx.id)}
            <VegaTransaction {tx} />
        {:else}
            <p>Connected to Vega.</p>
            <p>Loading transactions...</p>
        {/each}
    {:else}
        <p>Connecting to Vega...</p>
    {/if}
</section>