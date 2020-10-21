<script lang="ts">
	import { onMount } from 'svelte'
	import type { Vega } from '../data/vega'

	let assets: Record<Vega.AssetID, Vega.Asset> = {}
	let markets: Record<Vega.MarketID, Vega.Market> = {}
	let transactionsStream
	onMount(async () => {
		const { getVegaAssets, getVegaMarkets, recentTransactionsStream } = await import('../data/vega')
		transactionsStream = recentTransactionsStream(tx => Math.random() < samplePercentage / 100)
		assets = await getVegaAssets()
		markets = await getVegaMarkets()
	})

	let samplePercentage = 100
	
	import Controls from './Controls.svelte'
	import VegaTransactions from './VegaTransactions.svelte'
</script>

<h1>Vega</h1>

<section>
	<Controls>
		<h2>Recent Trades</h2>
		<label>
			Market: <select bind:value={samplePercentage}>
				<option value="all">all</option>
				{#each Object.values(markets) as market (market.id)}
					<option value="{market.id}">{market.name}</option>
				{/each}
			</select>
		</label>
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