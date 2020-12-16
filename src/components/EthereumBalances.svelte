<script lang="ts">
	import type { Covalent } from '../data/analytics/covalent'
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import type { QuoteCurrency } from '../data/currency/currency'
	import { getTokenAddressBalances } from '../data/analytics/covalent'

	export let analyticsProvider: AnalyticsProvider
	export let address: string
	export let conversionCurrency: QuoteCurrency
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending'
	export let showZeroBalances = false
	export let showValues

	let filterFunction: (b: Covalent.TokenBalance) => boolean
	$: filterFunction = showZeroBalances
		? b => b.type !== 'nft' // undefined
		: b => b.type !== 'nft' && b.type !== 'dust' // b.quote > 1e-6

	let sortFunction: (a: Covalent.TokenBalance, b: Covalent.TokenBalance) => number
	$: sortFunction =
		sortBy === 'value-descending' ? (a, b) => b.quote - a.quote || b.token_balance - a.token_balance :
		sortBy === 'value-ascending' ? (a, b) => a.quote - b.quote || a.token_balance - b.token_balance :
		sortBy === 'ticker-ascending' ? (a, b) => a.contract_ticker_symbol.localeCompare(b.contract_ticker_symbol) :
		undefined

	import Loading from './Loading.svelte'
	import TokenValueWithConversion from './TokenValueWithConversion.svelte'
	import { flip } from 'svelte/animate'
	import { scale } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
</script>

<style>		
	.ethereum-balances {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
		align-items: stretch;
		gap: var(--padding-inner);
	}

	/* 
	.ethereum-balances {
		display: flex;
		flex-wrap: wrap;
		margin: calc(-0.5 * var(--padding-inner));
		justify-content: space-evenly;
	}
	.ethereum-balances > :global(*) {
		padding: calc(0.5 * var(--padding-inner));
		flex: 0 auto;
	} */
</style>

<div class="ethereum-balances">
	{#if analyticsProvider === 'Covalent' && address}
		{#await getTokenAddressBalances({address, nft: false, quoteCurrency: conversionCurrency})}
			<Loading>
				<img slot="icon" src="/logos/covalent-logomark.svg" alt="Covalent" width="25">
				Retrieving balances from Covalent...
			</Loading>
		{:then balances}
			{#each
				(filterFunction ? balances.items.filter(filterFunction) : balances.items).sort(sortFunction)
				as {type, balance, quote, quote_rate, contract_name, contract_address, contract_decimals, contract_ticker_symbol, logo_url},
				i (contract_address || contract_ticker_symbol || contract_name)
			}
				<span in:scale animate:flip|local={{duration: 500, delay: Math.abs(i) * 10, easing: quintOut}}>
					<TokenValueWithConversion
						{showValues}
						token={contract_ticker_symbol || contract_name}
						tokenAddress={contract_address}
						tokenIcon={logo_url}
						tokenName={contract_name}
						value={balance * 0.1 ** contract_decimals}
						isDust={type === 'dust'}
						{conversionCurrency}
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
