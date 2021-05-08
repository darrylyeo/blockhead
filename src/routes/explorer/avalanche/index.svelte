<script lang="ts">
	import type { Ethereum } from '../../../data/ethereum/types'
	import { getContext } from 'svelte'
	import { preferredAnalyticsProvider, preferredQuoteCurrency, preferredPriceFeedProvider } from '../../../data/ethereum/preferences'


	const explorerNetwork = getContext<SvelteStore<Ethereum.Network>>('explorerNetwork')
	const explorerProvider = getContext<SvelteStore<Ethereum.Provider>>('explorerProvider')
	const blockNumber = getContext<SvelteStore<number>>('blockNumber')


	const ethereumNetwork = getContext<SvelteStore<Ethereum.Network>>('ethereumNetwork')
	const ethereumProvider = getContext<SvelteStore<Ethereum.Provider>>('ethereumProvider')


	import type { PriceScale } from '../../../components/PriceChart.svelte'
	let priceScale: PriceScale


	import Loader from '../../../components/Loader.svelte'
	import CovalentPriceChart from '../../../components/CovalentPriceChart.svelte'
	import OraclePrice from '../../../components/OraclePrice.svelte'
</script>

<style>
	.row {
		align-items: stretch;
	}
	.row > * {
		flex: 1 20rem;
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
			fromPromise={() => new Promise(r => $ethereumProvider.once('block', r))}
		>
			<p>
				<span>The {$explorerNetwork.name} blockchain is </span>
				<strong>{$blockNumber}</strong>
				<span> blocks long.</span>
			</p>
		</Loader>
	</section>

	<!-- <section class="card">
		<OraclePrice
			oracleProvider={$preferredPriceFeedProvider}
			token={$explorerNetwork.nativeCurrency.symbol}
			quoteCurrency={$preferredQuoteCurrency}
			provider={$explorerProvider}
			network={$ethereumNetwork}
			blockNumber={$blockNumber}
		/>
	</section> -->
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
			currencies={[$explorerNetwork.nativeCurrency.symbol]}
			{priceScale}
		/>
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