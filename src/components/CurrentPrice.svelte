<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'
	import type { CurrentPriceProvider } from '../data/ethereum/price/price-feed-provider'
	import { getChainlinkPriceFeed } from '../data/ethereum/price/chainlink'
	// import { getCompoundPriceFeed } from '.../../../data/ethereum/price/compound-price-feed'
	import { getSpotPrices } from '../data/analytics/covalent'


	/*export*/ let priceProvider: CurrentPriceProvider | 'auto' = 'auto'
	let currentPriceProvider = priceProvider === 'auto' ? 'Chainlink' : priceProvider

	export let token: TickerSymbol
	export let quoteCurrency: QuoteCurrency
	export let provider: Ethereum.Provider
	export let network: Ethereum.Network

	export let blockNumber: number


	let isHidden = false


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
		loadingIconName={priceProvider}
		loadingMessage="Retrieving price from Chainlink..."
		fromPromise={blockNumber && () => getChainlinkPriceFeed(provider, token, quoteCurrency)}
		let:then={priceFeed}
	>
		<div slot="header" class="bar">
			<h3>Current Price</h3>
			<span class="card-annotation">{priceProvider}</span>
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
				loadingIconName={priceProvider}
				loadingMessage="Retrieving price from Chainlink..."
				fromPromise={() => getChainlinkPriceFeed(provider, token, quoteCurrency)}
				let:then={priceFeed}
			>
				<div slot="header" class="bar">
					<h3>Current Price</h3>
					<span class="card-annotation">{priceProvider}</span>
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

{#if !isHidden}
	<div class="bar">
		<slot name="title">
			<h3>Current Price</h3>
		</slot>
		<span class="card-annotation">{currentPriceProvider}</span>
	</div>
	<div class="stack">
		{#key blockNumber}
			{#if currentPriceProvider === 'Chainlink'}
				<Loader
					loadingIcon={'/logos/chainlink.svg'}
					loadingIconName={currentPriceProvider}
					loadingMessage="Retrieving price from {currentPriceProvider}..."
					errorMessage="{token} price not available"
					fromPromise={provider && network && (() => getChainlinkPriceFeed(provider, network, token, quoteCurrency))}
					let:then={priceFeed}
					whenErrored={async () => {
						await new Promise(r => setTimeout(r, 1000))
						if(priceProvider === 'auto')
							currentPriceProvider = 'Covalent'
					}}
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
			{:else if currentPriceProvider === 'Covalent'}
				<Loader
					loadingIcon={'/logos/covalent-logomark.svg'}
					loadingIconName={currentPriceProvider}
					loadingMessage="Retrieving price from {currentPriceProvider}..."
					errorMessage="{token} price not available"
					fromPromise={async () => {
						const data = await getSpotPrices({tickers: [token]})
						if(data?.items?.[0])
							return {
								price: data.items[0].quote_rate,
								rank: data.items[0].rank,
								icon: data.items[0].logo_url,
								updatedAt: data.updated_at
							}
						throw new Error(`The ${token} spot price isn't currently indexed by Covalent.`)
					}}
					let:then={data}
				>
					<svelte:fragment slot="errorActions" let:cancel>
						<button class="small" on:click={() => {
							cancel()
							isHidden = true
						}}>Dismiss</button>
					</svelte:fragment>

					<div class="rate">
						<TokenValue
							value={1}
							{token}
							tokenIcon={data.icon}
							tween={false}
						/>
						=
						<TokenValue
							value={data.price}
							token={/*quoteCurrency*/ 'USD'}
							showPlainFiat={true}
						/>
					</div>
					<!-- <div class="rate">
						<TokenRate
							rate={data.price}
							quoteToken={quoteCurrency}
							baseToken={token}
							layout="horizontal"
						/>
					</div> -->
					<footer class="bar">
						<span>Rank #{data.rank}</span>
						<span class="card-annotation">Updated {new Date(data.updatedAt).toLocaleTimeString()}</span>
					</footer>
				</Loader>
			{/if}
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
{/if}