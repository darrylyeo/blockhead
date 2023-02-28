<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'
	import type { CurrentPriceProvider } from '../data/ethereum/price/price-feed-provider'
	import { getChainlinkPriceFeed } from '../data/ethereum/price/chainlink'
	// import { getCompoundPriceFeed } from '.../../../data/ethereum/price/compound-price-feed'
	import { getSpotPrices } from '../api/covalent'


	import { preferences } from '../state/preferences'

	export let currentPriceProvider: CurrentPriceProvider | 'auto' = 'auto'
	$: currentPriceProvider = $$props.currentPriceProvider || $preferences.currentPriceProvider

	let _currentPriceProvider
	$: _currentPriceProvider = currentPriceProvider === 'auto' ? 'Chainlink' : currentPriceProvider

	export let token: TickerSymbol
	export let quoteCurrency: QuoteCurrency
	export let provider: Ethereum.Provider
	export let network: Ethereum.Network

	export let blockNumber: number


	let isHidden = false


	import Address from './Address.svelte'
	import Date from './Date.svelte'
	import Loader from './Loader.svelte'
	// import TokenRate from './TokenRate.svelte'
	import TokenBalance from './TokenBalance.svelte'


	import { ChainlinkIcon, CovalentIcon } from '../assets/icons'
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
		loadingIcon={priceFeedIcon}
		loadingIconName={currentPriceProvider}
		loadingMessage="Retrieving price from Chainlink..."
		fromPromise={blockNumber && () => getChainlinkPriceFeed(provider, token, quoteCurrency)}
		let:result={priceFeed}
	>
		<div slot="header" class="bar">
			<h3>Current Price</h3>
			<span class="card-annotation">{currentPriceProvider}</span>
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
				loadingIcon={priceFeedIcon}
				loadingIconName={currentPriceProvider}
				loadingMessage="Retrieving price from Chainlink..."
				fromPromise={() => getChainlinkPriceFeed(provider, token, quoteCurrency)}
				let:result={priceFeed}
			>
				<div slot="header" class="bar">
					<h3>Current Price</h3>
					<span class="card-annotation">{currentPriceProvider}</span>
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
	<div class="stack">
		{#if _currentPriceProvider === 'Chainlink'}
			<div class="column">
				<Loader
					loadingIcon={ChainlinkIcon}
					loadingIconName={_currentPriceProvider}
					loadingMessage="Retrieving price from {_currentPriceProvider}..."
					errorMessage="{token} price not available"
					fromPromise={provider && network && blockNumber && (() => getChainlinkPriceFeed(provider, network, token, quoteCurrency))}
					let:result={priceFeed}
					whenErrored={async () => {
						await new Promise(r => setTimeout(r, 1000))
						if(currentPriceProvider === 'auto')
							_currentPriceProvider = 'Covalent'
					}}
				>
					<div slot="header" class="bar" let:status>
						<slot name="title">
							<h3>Current Price</h3>
						</slot>

						<span class="card-annotation">
							{_currentPriceProvider}
							{#if status === 'resolved'}
								›
								<Address {network} address={priceFeed.contractAddress}>{token}/{quoteCurrency} Price Feed</Address>
							{/if}
						</span>
					</div>

					<div class="rate">
						<TokenBalance
							{network} symbol={token}
							balance={1}
							tween={false}
						/>
						=
						<TokenBalance
							symbol={quoteCurrency}
							balance={priceFeed.price}
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
						<span />
						<span class="card-annotation">
							Updated
							<Date
								date={priceFeed.updatedAt}
								format="relative"
								layout="horizontal"
							/>
						</span>
					</footer>
				</Loader>
			</div>
		<!-- {:else if _currentPriceProvider === 'Covalent'}
			<div class="column">
				<Loader
					loadingIcon={CovalentIcon}
					loadingIconName={_currentPriceProvider}
					loadingMessage="Retrieving price from {_currentPriceProvider}..."
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
					let:result={data}
				>
					<div slot="header" class="bar">
						<slot name="title">
							<h3>Current Price</h3>
						</slot>

						<span class="card-annotation">
							{_currentPriceProvider}
						</span>
					</div>

					<svelte:fragment slot="errorActions" let:cancel>
						<button class="small" on:click={() => {
							cancel()
							isHidden = true
						}}>Dismiss</button>
					</svelte:fragment>

					<div class="rate">
						<TokenBalance
							{network}
							symbol={token}
							icon={data.icon}
							balance={1}
							tween={false}
						/>
						=
						<TokenBalance
							symbol={/*quoteCurrency*/ 'USD'}
							balance={data.price}
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
					</div> -- >
					<footer class="bar">
						<span>Rank #{data.rank}</span>
						<span class="card-annotation">Updated {new Date(data.updatedAt).toLocaleTimeString()}</span>
					</footer>
				</Loader>
			</div> -->
		{/if}
	</div>

	<!-- {#if isMounted}
		{#await getCompoundPriceFeed(token, quoteCurrency)}
			<Loading>
				<img slot="icon" src={ChainlinkIcon} alt="Chainlink" width="50">
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