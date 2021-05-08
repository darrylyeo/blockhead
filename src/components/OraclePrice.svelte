<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'
	import type { PriceFeedProvider } from '../data/ethereum/price/price-feed-provider'
	import { getChainlinkPriceFeed } from '../data/ethereum/price/chainlink'
	// import { getCompoundPriceFeed } from '.../../../data/ethereum/price/compound-price-feed'


	export let oracleProvider: PriceFeedProvider

	export let token: TickerSymbol
	export let quoteCurrency: QuoteCurrency
	export let provider: Ethereum.Provider
	export let network: Ethereum.Network

	export let blockNumber: number



	import Loader from './Loader.svelte'
	import TokenRate from './TokenRate.svelte'
	import TokenValue from './TokenValue.svelte'
	import Address from './Address.svelte'
</script>

<style>
	.rate {
		font-size: 1.8em;
		text-align: center;
	}

	footer {
		font-size: 0.8em;
	}
</style>

<!-- {#if provider.network}
	<Loader
		loadingIcon={priceFeedLogo}
		loadingIconName={oracleProvider}
		loadingMessage="Retrieving price from Chainlink..."ZZ
		fromPromise={blockNumber && () => getChainlinkPriceFeed(provider, token, quoteCurrency)}
		let:then={priceFeed}
	>
		<div slot="header" class="bar">
			<h3>Current Price</h3>
			<span class="card-annotation">{oracleProvider}</span>
		</div>

		<TokenRate
			rate={priceFeed.price}
			quoteToken={quoteCurrency}
			baseToken={token}
			layout="horizontal"
		/>
		<p>Updated {priceFeed.updatedAt.toLocaleTimeString()}
	</Loader>
{/if} -->
<!-- <div class="stack">
	{#key blockNumber}
		{#if provider.network}
			<Loader
				loadingIcon={priceFeedLogo}
				loadingIconName={oracleProvider}
				loadingMessage="Retrieving price from Chainlink..."
				fromPromise={() => getChainlinkPriceFeed(provider, token, quoteCurrency)}
				let:then={priceFeed}
			>
				<div slot="header" class="bar">
					<h3>Current Price</h3>
					<span class="card-annotation">{oracleProvider}</span>
				</div>
				<TokenRate
					rate={priceFeed.price}
					quoteToken={quoteCurrency}
					baseToken={token}
					layout="horizontal"
				/>
				<p>Updated {priceFeed.updatedAt.toLocaleTimeString()}
			</Loader>
		{/if}
	{/key}
</div> -->
<div class="bar">
	<h3>Current Price</h3>
	<span class="card-annotation">{oracleProvider}</span>
</div>
<div class="stack">
	{#key blockNumber}
		<Loader
			loadingIcon={'/logos/chainlink.svg'}
			loadingIconName={oracleProvider}
			loadingMessage="Retrieving price from Chainlink..."
			fromPromise={() => getChainlinkPriceFeed(provider, network, token, quoteCurrency)}
			let:then={priceFeed}
		>
			<div class="rate">
				<TokenValue
					value={1}
					{token}
					tween={false}
				/>
				=
				<TokenValue
					value={priceFeed.price}
					token={quoteCurrency}
					showPlainFiat={true}
				/>
			</div>
			<!-- <div class="rate">
				<TokenRate
					rate={priceFeed.price}
					quoteToken={quoteCurrency}
					baseToken={token}
					layout="horizontal"
				/>
			</div> -->
			<footer class="bar">
				<Address {network} address={priceFeed.contractAddress}>{token}/{quoteCurrency} Price Feed</Address>
				<span class="card-annotation">Updated {priceFeed.updatedAt.toLocaleTimeString()}</span>
			</footer>
		</Loader>
	{/key}
</div>

<!-- {#if isMounted}
	{#await getCompoundPriceFeed(token, quoteCurrency)}
		<Loading>
			<img slot="icon" src="/logos/chainlink" alt="Chainlink" width="50">
			Retrieving price...
		</Loading>
	{:then rate}
		<section class="card">
			<h3>Current Rate (Chainlink)</h3>
			<TokenRate {rate} quoteToken={token} baseToken={quoteCurrency} />
		</section>
	{/await}
{/if} -->