<script lang="ts">
	import type { Covalent } from '../data/analytics/covalent'
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import type { TickerSymbol } from '../data/currency/currency'
	import { getTokenAddressBalances } from '../data/analytics/covalent'

	export let analyticsProvider: AnalyticsProvider
	export let address: string
	export let conversionCurrency: TickerSymbol
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending'
	export let showValues
	
	$: quoteCurrency = conversionCurrency as Covalent.QuoteCurrency

	let sortFunction: (a: Covalent.TokenBalance, b: Covalent.TokenBalance) => number
	$: sortFunction =
		sortBy === 'value-descending' ? (a, b) => b.quote - a.quote :
		sortBy === 'value-ascending' ? (a, b) => a.quote - b.quote :
		sortBy === 'ticker-ascending' ? (a, b) => a.contract_ticker_symbol.localeCompare(b.contract_ticker_symbol) :
		undefined

	import Loading from './Loading.svelte'
	import TokenValueWithConversion from './TokenValueWithConversion.svelte'
	import { flip } from 'svelte/animate'
	import { scale } from 'svelte/transition'
	import { circOut, elasticInOut, elasticOut, quintOut } from 'svelte/easing'
</script>

<style>		
	.erc20-balances {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
		align-items: stretch;
		gap: var(--padding-inner);
	}

	/* 
	.erc20-balances {
		display: flex;
		flex-wrap: wrap;
		margin: calc(-0.5 * var(--padding-inner));
		justify-content: space-evenly;
	}
	.erc20-balances > :global(*) {
		padding: calc(0.5 * var(--padding-inner));
		flex: 0 auto;
	} */
</style>

<div class="erc20-balances">
	{#if analyticsProvider === 'Covalent' && address}
		{#await getTokenAddressBalances({address, nft: true, quoteCurrency})}
			<Loading>
				Retrieving balances...
			</Loading>
		{:then balances}
			{#each balances.items.sort(sortFunction) as {balance, quote, quote_rate, contract_name, contract_address, contract_decimals, contract_ticker_symbol, contract_logo_url}, i (contract_ticker_symbol)}
				<span in:scale animate:flip|local={{duration: 500, delay: Math.abs(i) * 10, easing: quintOut}}>
					<TokenValueWithConversion
						{showValues}
						token={contract_ticker_symbol}
						tokenAddress={contract_address}
						tokenIcon={contract_logo_url}
						tokenName={contract_name}
						value={balance * 0.1 ** contract_decimals}
						conversionCurrency={quoteCurrency}
						convertedValue={quote}
						conversionRate={quote_rate}
						/>
				</span>
			{/each}
		{:catch error}
			{error}
		{/await}
	{/if}
</div>
