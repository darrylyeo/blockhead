<script lang="ts">
	import type { Ethereum } from '../../../data/ethereum/types'
	import { getContext } from 'svelte'
	import { preferredQuoteCurrency, preferredOracleProvider, preferredAnalyticsProvider } from '../../../data/ethereum/preferences'


	const token = 'BTC'

	const ethereumNetwork = getContext<SvelteStore<Ethereum.Network>>('ethereumNetwork')
	const ethereumProvider = getContext<SvelteStore<Ethereum.Provider>>('ethereumProvider')


	import CurrentPrice from '../../../components/CurrentPrice.svelte'
	import HistoricalPriceChart from '../../../components/HistoricalPriceChart.svelte'
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
			priceProvider={$preferredOracleProvider}
			{token}
			quoteCurrency={$preferredQuoteCurrency}
			provider={$ethereumProvider}
			network={$ethereumNetwork}
		/>
	</section>
</div>

<div>
	<section class="card">
		<HistoricalPriceChart
			analyticsProvider={$preferredAnalyticsProvider}
			currencies={[token]}
			quoteCurrency={$preferredQuoteCurrency}
		/>
	</section>
</div>