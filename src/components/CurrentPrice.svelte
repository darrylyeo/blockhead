<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { networksByChainID } from '../data/networks'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import { getViemPublicClient } from '../data/networkProviders'
	import type { QuoteCurrency, TickerSymbol } from '../data/currencies'
	import { PriceProvider, priceProviderIcons } from '../data/priceProviders'
	import { getChainlinkPriceFeed } from '../api/chainlink'
	// import { getCompoundPriceFeed } from '.../../../data/ethereum/price/compound-price-feed'
	import { getSpotPrices } from '../api/covalent'


	import { preferences } from '../state/preferences'

	export let currentPriceProvider: PriceProvider | 'auto' = 'auto'
	$: currentPriceProvider = $$props.currentPriceProvider || $preferences.currentPriceProvider

	let _currentPriceProvider: PriceProvider
	$: _currentPriceProvider = currentPriceProvider === 'auto' ? PriceProvider.Chainlink : currentPriceProvider

	export let oracleNetwork: Ethereum.Network = networksByChainID[1]
	export let networkProvider: NetworkProvider
	export let token: TickerSymbol
	export let quoteCurrency: QuoteCurrency

	export let blockNumber: number


	let oraclePublicClient: Ethereum.PublicClient | undefined
	$: oraclePublicClient = oracleNetwork && networkProvider && getViemPublicClient({
		network: oracleNetwork,
		networkProvider,
	})


	let isHidden = false


	import Address from './Address.svelte'
	import Date from './Date.svelte'
	import Loader from './Loader.svelte'
	// import TokenRate from './TokenRate.svelte'
	import TokenBalance from './TokenBalance.svelte'
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


<!-- {#if network}
	<Loader
		loadingIcon={priceFeedIcon}
		loadingIconName={currentPriceProvider}
		loadingMessage="Retrieving price from Chainlink..."
		fromPromise={blockNumber && () => getChainlinkPriceFeed(publicClient, token, quoteCurrency)}
		let:result={priceFeed}
	>
		<div slot="header" class="bar wrap">
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
		{#if network}
			<Loader
				loadingIcon={priceFeedIcon}
				loadingIconName={currentPriceProvider}
				loadingMessage="Retrieving price from Chainlink..."
				fromPromise={() => getChainlinkPriceFeed(publicClient, token, quoteCurrency)}
				let:result={priceFeed}
			>
				<div slot="header" class="bar wrap">
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
		{#if _currentPriceProvider === PriceProvider.Chainlink}
			<div class="column">
				<Loader
					loadingIcon={priceProviderIcons[_currentPriceProvider]}
					loadingIconName={_currentPriceProvider}
					loadingMessage="Retrieving price from {_currentPriceProvider}..."
					errorMessage="{token} price not available"
					fromPromise={blockNumber, oraclePublicClient && oracleNetwork && (() => getChainlinkPriceFeed(oraclePublicClient, oracleNetwork, token, quoteCurrency))}
					let:result={priceFeed}
					whenErrored={async () => {
						await new Promise(r => setTimeout(r, 1000))
						if(currentPriceProvider === 'auto')
							_currentPriceProvider = PriceProvider.Covalent
					}}
				>
					<div slot="header" class="bar wrap" let:status let:result={priceFeed}>
						<slot name="title">
							<h3>Current Price</h3>
						</slot>

						<span class="card-annotation">
							{_currentPriceProvider}
							{#if status === 'resolved'}
								›
								<Address network={oracleNetwork} address={priceFeed.contractAddress}>{token}/{quoteCurrency} Price Feed</Address>
							{/if}
						</span>
					</div>

					<div class="rate">
						<TokenBalance
							network={oracleNetwork} symbol={token}
							balance={1}
							tween={false}
						/>
						=
						<TokenBalance
							symbol={quoteCurrency}
							balance={priceFeed.price}
							format="fiat"
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
					<footer class="bar wrap">
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
		<!-- {:else if _currentPriceProvider === PriceProvider.Covalent}
			<div class="column">
				<Loader
					loadingIcon={priceProviderIcons[_currentPriceProvider]}
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
					<div slot="header" class="bar wrap">
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
							format="fiat"
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
					<footer class="bar wrap">
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