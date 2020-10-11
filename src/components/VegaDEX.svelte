<script>
    import { onMount } from 'svelte'

	// import { recentTrades } from '../data/vega.ts'
    
    let samplePercentage = 100
    let transactionsStream
    onMount(async () => {
	    const { recentTransactionsStream } = await import('../data/vega.ts')
        transactionsStream = recentTransactionsStream(tx => Math.random() < samplePercentage / 100);
    })

    import VegaTransactions from './VegaTransactions.svelte'
</script>

<style>
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
    <VegaTransactions {transactionsStream}/>
</section>