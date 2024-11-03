<script lang="ts">
	// Types
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import type { QuoteCurrency, TickerSymbol } from '$/data/currencies'
	import { PriceProvider } from '$/data/priceProviders'
	import { ethereumMainnet } from '$/data/networks'


	// Inputs
	export let currentPriceProvider: PriceProvider | 'auto' = 'auto'
	export let oracleNetwork: Ethereum.Network | undefined
	$: oracleNetwork = $$props.oracleNetwork || ethereumMainnet
	export let networkProvider: NetworkProvider

	export let query: CurrentPriceLoader['$$prop_def']['query']
	export let quoteCurrency: QuoteCurrency

	export let blockNumber: number

	// (View options)
	export let layout: Loader<any, any, any, any>['viewOptions']['layout'] = 'default'


	// Internal state
	let _currentPriceProvider: PriceProvider
	$: _currentPriceProvider = currentPriceProvider === 'auto' ? PriceProvider.Chainlink : currentPriceProvider

	let isHidden = false


	// Components
	import Address from './Address.svelte'
	import CurrentPriceLoader from './CurrentPriceLoader.svelte'
	import Date from './Date.svelte'
	import Loader from './Loader.svelte'
	import TokenBalance from './TokenBalance.svelte'
	// import TokenRate from './TokenRate.svelte'
</script>


{#if !isHidden}
	<CurrentPriceLoader
		viewOptions={{
			layout,
			collapsibleType: 'label',
		}}
		currentPriceProvider={_currentPriceProvider}
		{oracleNetwork}
		{networkProvider}
		{query}
		{quoteCurrency}
		{blockNumber}
		let:result
		whenErrored={async () => {
			// await new Promise(r => setTimeout(r, 1000))
			// if(currentPriceProvider === 'auto')
			// 	_currentPriceProvider = PriceProvider.Covalent
		}}
	>
		<header slot="header" class="bar wrap"
			let:status
			let:result
			let:isOpen let:toggle
		>
			<slot name="title">
				<h3>Current Price</h3>
			</slot>

			<span class="card-annotation">
				{_currentPriceProvider}

				{#if _currentPriceProvider === PriceProvider.Chainlink && status === 'resolved'}
					{@const priceFeed = result}

					›
					<Address
						network={oracleNetwork}
						address={priceFeed.contractAddress}
					>{'symbol' in query ? `${query.symbol}/${quoteCurrency} ` : ''}Price Feed</Address>
				{/if}
			</span>

			{#if layout === 'collapsible'}
				<button
					class="small"
					data-after={isOpen ? '⏶' : '⏷'}
					on:click={toggle}
				>{isOpen ? 'Hide' : 'Show'}</button>
			{/if}
		</header>

		{#if _currentPriceProvider === PriceProvider.Chainlink}
			{@const priceFeed = result}

			<div class="rate">
				<TokenBalance
					token={{
						chainId: oracleNetwork?.chainId,
						symbol: query.symbol,
					}}
					balance={1}
					tween={false}
				/>
				=
				<TokenBalance
					token={{
						symbol: quoteCurrency,
					}}
					balance={priceFeed.price}
					format="fiat"
				/>
			</div>
			<!-- <div class="rate">
				<TokenRate
					rate={priceFeed.price}
					quoteToken={{
						symbol: quoteCurrency,
					}}
					baseToken={{
						symbol: query.symbol,
					}}
					layout="horizontal"
				/>
			</div> -->

		{:else}
			<div class="rate">
				<TokenBalance
					token={
						'erc20Token' in query ?
							query.erc20Token
						:
							{
								chainId: 'chainId' in query && query.chainId,
								symbol: query.symbol,
								icon: result.icon,
							}
					}
					balance={1}
					tween={false}
				/>
				=
				<TokenBalance
					token={{
						symbol: result.quoteCurrency,
					}}
					balance={result.price}
					format="fiat"
				/>
			</div>
			<!-- <div class="rate">
				<TokenRate
					rate={result.price}
					quoteToken={{
						symbol: quoteCurrency,
					}}
					baseToken={{
						symbol: query.symbol,
					}}
					layout="horizontal"
				/>
			</div> -->
		{/if}

		<footer class="bar wrap">
			{#if _currentPriceProvider === PriceProvider.Chainlink}
				{@const priceFeed = result}

				<span />
				<span class="card-annotation">
					Updated
					<Date
						date={priceFeed.updatedAt}
						format="relative"
						layout="horizontal"
					/>
				</span>
			{:else if _currentPriceProvider === PriceProvider.Covalent}
				<span>Rank #{result.rank}</span>
				<span class="card-annotation">Updated {new Date(result.updatedAt).toLocaleTimeString()}</span>
			{/if}
		</footer>

		<svelte:fragment slot="errorActions" let:cancel>
			<button class="small" on:click={() => {
				cancel()
				isHidden = true
			}}>Dismiss</button>
		</svelte:fragment>
	</CurrentPriceLoader>
{/if}


<style>
	.rate {
		font-size: 1.8em;
		text-align: center;
	}

	footer {
		font-size: 0.8em;
	}
</style>
