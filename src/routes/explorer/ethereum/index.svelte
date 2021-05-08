<script lang="ts">
	import type { Ethereum } from '../../../data/ethereum/types'
	import { getContext, onMount } from 'svelte'
	import { readable } from 'svelte/store'
	import { preferredAnalyticsProvider, preferredEthereumProvider, preferredQuoteCurrency, preferredPriceFeedProvider } from '../../../data/ethereum/preferences'
	import type { PriceScale } from '../../../components/PriceChart.svelte'


	const token = 'ETH'

	const network = getContext<SvelteStore<Ethereum.Network>>('ethereumNetwork')
	const provider = getContext<SvelteStore<Ethereum.Provider>>('ethereumProvider')

	const blockNumber = readable<number>(undefined, set => {
		$provider.on('block', blockNumber => {
			set(blockNumber)
		})
	})


	let priceScale: PriceScale


	import Loader from '../../../components/Loader.svelte'
	import CovalentPriceChart from '../../../components/CovalentPriceChart.svelte'
	import OraclePrice from '../../../components/OraclePrice.svelte'
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

<div class="row">
	<section class="card">
		<div class="bar">
			<h3>Block Number</h3>
			<!-- <span class="card-annotation">{$preferredEthereumProvider}</span> -->
		</div>
		<Loader
			loadingMessage="Retrieving statistics..."
			fromPromise={() => new Promise(r => $provider.once('block', r))}
		>
			<p>
				<span>The Ethereum blockchain is </span>
				<strong>{$blockNumber}</strong>
				<span> blocks long.</span>
			</p>
		</Loader>
	</section>

	<section class="card">
		<OraclePrice
			oracleProvider={$preferredPriceFeedProvider}
			{token}
			quoteCurrency={$preferredQuoteCurrency}
			provider={$provider}
			network={$network}
			blockNumber={$blockNumber}
		/>
	</section>
</div>

<div class="row">
	<section class="card">
		<div class="bar">
			<h3>Historical Price</h3>
			<span class="card-annotation">{$preferredAnalyticsProvider}</span>
		</div>
		<CovalentPriceChart
			provider={$preferredAnalyticsProvider}
			quoteCurrency={$preferredQuoteCurrency}
			currencies={['ETH']}
			{priceScale}
		/>
		<!-- currencies={['ETH', 'BTC', 'CEL', 'USDC', 'USDT', 'DAI', 'UNI', 'BAL', 'AVAX', 'CRV', 'YFI']} -->
		<div class="bar">
			<h4>Show</h4>
			<label>
				<span>Price Scale</span>
				<select bind:value={priceScale}>
					<option value="logarithmic">Logarithmic</option>
					<option value="linear">Linear</option>
					<option value="linearFromZero">Linear From Zero</option>
				</select>
			</label>
		</div>
	</section>
</div>