<script>
	import { onMount } from 'svelte'
	
	// import { recentTrades } from '../data/vega.ts'
	
	let samplePercentage = 100
	let transactionsStream
	onMount(async () => {
		const { recentTransactionsStream } = await import('../data/vega.ts')
		transactionsStream = recentTransactionsStream(tx => Math.random() < samplePercentage / 100);
	})
	
	import Controls from './Controls.svelte'
	import VegaTransactions from './VegaTransactions.svelte'
</script>

<h1>Vega</h1>

<section>
	<Controls>
		<h2>Recent Trades</h2>
		<label>
			Show <select bind:value={samplePercentage}>
				<option value="100">all transactions</option>
				<option value="50">every other transaction</option>
				<option value="20">1 out of 5 transactions</option>
				<option value="10">1 out of 10 transactions</option>
				<option value="1">1 out of 100 transactions</option>
			</select>
		</label>
	</Controls>
	<VegaTransactions {transactionsStream}/>
</section>