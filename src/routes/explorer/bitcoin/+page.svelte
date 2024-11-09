<script lang="ts">
	import { networkByChainId } from '$/data/networks'


	import { preferences } from '$/state/preferences'


	const symbol = 'BTC'


	import CurrentPrice from '$/components/CurrentPrice.svelte'
	import HistoricalPriceChart from '$/components/HistoricalPriceChart.svelte'
</script>

<style>
	.row {
		display: flex;
		align-items: stretch;
		flex-wrap: wrap;
		gap: var(--padding-inner);
	}
	.row > * {
		flex: 1 20rem;
		padding: var(--padding-outer);
	}
</style>

<div class="card">Bitcoin explorer coming soon!</div>

<hr>

<div>
	<section class="card">
		<CurrentPrice
			networkProvider={$preferences.rpcNetwork}
			currentPriceProvider={$preferences.currentPriceProvider}
			query={{
				symbol,
			}}
			quoteCurrency={$preferences.quoteCurrency}
		/>
	</section>
</div>

<div>
	<section class="card">
		<HistoricalPriceChart
			historicalPriceProvider={$preferences.historicalPriceProvider}
			query={{
				coins: [
					{
						symbol,
					},
				],
			}}
			quoteCurrency={$preferences.quoteCurrency}
		/>
	</section>
</div>
