<script lang="ts">
	import { onMount } from 'svelte'
	import type { Vega } from '$/api/vega'

	let assets: Record<Vega.AssetID, Vega.Asset> = {}
	let markets: Record<Vega.MarketID, Vega.Market> = {}
	let transactionsStream
	onMount(async () => {
		const { getVegaAssets, getVegaMarkets, recentTransactionsStream } = await import('$/api/vega')
		transactionsStream = recentTransactionsStream(marketId, tx => Math.random() < samplePercentage / 100)
		assets = await getVegaAssets()
		markets = await getVegaMarkets()
	})

	let marketId
	let samplePercentage = 100
	
	import VegaTransactions from './VegaTransactions.svelte'
</script>

<h1>Vega</h1>

<section>
	<div class="bar">
		<h2>Recent Trades</h2>
		<label>
			Market: <select bind:value={marketId}>
				<option value="all">all</option>
				{#each Object.values(markets) as market (market.id)}
					<option value={market.id}>{market.name}</option>
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
	</div>
	<VegaTransactions {transactionsStream}/>
</section>