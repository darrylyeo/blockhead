<script lang="ts">
	import type { Ethereum } from '../../../data/ethereum/types'
	import { getContext, onMount } from 'svelte'
	import { readable } from 'svelte/store'
	import { preferredAnalyticsProvider, preferredQuoteCurrency, preferredPriceFeedProvider } from '../../../data/ethereum/preferences'
	// import { getCompoundPriceFeed } from '.../../../data/ethereum/price/compound-price-feed'
	import { getChainlinkPriceFeed } from '.../../../data/ethereum/price/chainlink'
	
	const provider = getContext<Ethereum.Provider>('provider')

	const blockNumber = readable<number>(undefined, set => {
		$provider.on('block', blockNumber => {
			set(blockNumber)
		})
	})

	$: priceFeedLogo = ({
		'Chainlink': '/logos/chainlink.svg'
	})[$preferredPriceFeedProvider]

	import Loader from '../../../components/Loader.svelte'
	import CovalentPriceChart from '../../../components/CovalentPriceChart.svelte'
	import TokenRate from '../../../components/TokenRate.svelte'

	let isMounted = false
	onMount(() => isMounted = true)
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

	section :global(.token-rate) {
		font-size: 2em;
	}
</style>

<div class="row">
	<section class="card">
		<div class="bar">
			<h3>Current Price</h3>
			<span class="card-annotation">{$preferredPriceFeedProvider}</span>
		</div>
		{#key $blockNumber}
			<Loader
				loadingIcon={priceFeedLogo}
				loadingIconName={$preferredPriceFeedProvider}
				loadingMessage="Retrieving price from Chainlink..."
				fromPromise={() => getChainlinkPriceFeed($provider, 'mainnet', 'ETH', $preferredQuoteCurrency)}
				let:then={priceFeed}
			>
				<TokenRate rate={priceFeed.price} quoteToken={$preferredQuoteCurrency} baseToken="ETH" layout="horizontal" />
				<!-- <p>Updated {priceFeed.updatedAt.toString()} -->
			</Loader>
		{/key}
	</section>

	<section class="card">
		<h3>Block Number</h3>
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

	<!-- {#if isMounted}
		{#await getCompoundPriceFeed('ETH', $preferredQuoteCurrency)}
			<Loading>
				<img slot="icon" src="/logos/chainlink" alt="Chainlink" width="50">
				Retrieving price...
			</Loading>
		{:then rate}
			<section class="card">
				<h3>Current Rate (Chainlink)</h3>
				<TokenRate {rate} quoteToken={'ETH'} baseToken={$preferredQuoteCurrency} />
			</section>
		{/await}
	{/if} -->
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
		/>
		<!-- currencies={['ETH', 'BTC', 'CEL', 'USDC', 'USDT', 'DAI', 'UNI', 'BAL', 'AVAX', 'CRV', 'YFI']} -->
	</section>
</div>