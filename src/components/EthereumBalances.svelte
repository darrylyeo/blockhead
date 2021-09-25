<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { Covalent } from '../data/analytics/covalent'
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'
	import { getTokenAddressBalances } from '../data/analytics/covalent'
	import { preferences } from '../data/ethereum/preferences'

	export let network: Ethereum.Network
	export let address: string
	export let analyticsProvider: AnalyticsProvider = $preferences.analyticsProvider
	export let quoteCurrency: QuoteCurrency = $preferences.quoteCurrency
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending'
	export let showSmallValues = false
	export let showValues

	export let isSelectable = false
	export let selectedToken: {
		token: TickerSymbol,
		tokenAddress: Ethereum.ContractAddress,
		tokenIcon: string,
		tokenName: string
	} | undefined = undefined

	export let quoteTotal


	export let isCollapsed: boolean


	let filterFunction: (b: Covalent.ERC20TokenOrNFTContractWithBalance) => boolean
	$: filterFunction = showSmallValues
		? b => b.type !== 'nft' // undefined
		: b => b.type !== 'nft' && !(/*b.type === 'dust' || */ b.quote < 1e-3)

	let sortFunction: (a: Covalent.ERC20TokenOrNFTContractWithBalance, b: Covalent.ERC20TokenOrNFTContractWithBalance) => number
	$: sortFunction =
		sortBy === 'value-descending' ? (a, b) => b.quote - a.quote || b.balance - a.balance :
		sortBy === 'value-ascending' ? (a, b) => a.quote - b.quote || a.balance - b.balance :
		sortBy === 'ticker-ascending' ? (a, b) => a.contract_ticker_symbol.localeCompare(b.contract_ticker_symbol) :
		undefined


	let allBalances

	export let balances: Covalent.ERC20TokenOrNFTContractWithBalance[] = []

	$: if(allBalances)
		balances = (filterFunction ? allBalances.filter(filterFunction) : allBalances).sort(sortFunction)

	$: quoteTotal = balances.reduce((sum, item) => sum + item.quote, 0)
	

	import EthereumBalancesLoader from './EthereumBalancesLoader.svelte'
	import TokenValueWithConversion from './TokenValueWithConversion.svelte'
	import { flip } from 'svelte/animate'
	import { scale } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
</script>

<style>
	.ethereum-balances {
		--column-width: 12rem;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(var(--column-width), 1fr));
		align-items: stretch;
		gap: var(--padding-inner);
	}
	.ethereum-balances.show-amounts-and-values {
		--column-width: 16rem;
		column-gap: calc(2 * var(--padding-inner));
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

	.ethereum-balance {
		min-height: 1.65em;
		gap: var(--padding-inner);
	}
	.ethereum-balance.is-selectable {
		--padding-outer: 0.25rem;
		margin: calc(-1 * var(--padding-outer));
		padding: var(--padding-outer);
		border-radius: var(--card-border-radius);
		transition: 0.3s;
		cursor: pointer;
		outline: none;
	}
	.ethereum-balance.is-selectable:hover, .ethereum-balance.is-selectable:focus {
		background-color: var(--card-background-color);
	}
	.ethereum-balance.is-selectable.is-selected {
		background-color: rgba(255, 255, 255, 0.3);
		box-shadow: var(--primary-color) 0 0 0 2px inset;
	}

	.ethereum-balance :global(.value-with-conversion) {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
</style>

{#if address}
	<EthereumBalancesLoader
		{network}
		{address}
		{analyticsProvider}
		{quoteCurrency}
		showIf={() => balances.length}
		{isCollapsed}
		bind:balances={allBalances}
	>
		<svelte:fragment slot="header">
			{#if balances.length}
				<slot name="header" {network} {quoteCurrency} {quoteTotal}></slot>
			{/if}
		</svelte:fragment>

		<div class:scrollable-list={balances.length > 45}>
			<div class="ethereum-balances card" class:show-amounts-and-values={showValues === 'both'}>
				{#each
					balances
					as {type, balance, quote, quote_rate, contract_name, contract_address, contract_decimals, contract_ticker_symbol, logo_url},
					i (contract_address || contract_ticker_symbol || contract_name)
				}
					<span
						class="ethereum-balance"
						class:is-selectable={isSelectable}
						class:is-selected={selectedToken?.tokenAddress === contract_address}
						tabindex={isSelectable ? 0 : undefined}
						on:click={() =>
							selectedToken = selectedToken?.tokenAddress === contract_address ? undefined : {
								token: contract_ticker_symbol || contract_name,
								tokenAddress: contract_address,
								tokenIcon: logo_url,
								tokenName: contract_name,
							}
						}
						in:scale
						animate:flip|local={{duration: 500, delay: i * 10, easing: quintOut}}
					>
						<TokenValueWithConversion
							{showValues}
							token={contract_ticker_symbol || contract_name}
							tokenAddress={contract_address}
							tokenIcon={logo_url}
							tokenName={contract_name}
							value={balance * 0.1 ** contract_decimals}
							isDust={false}
							conversionCurrency={quoteCurrency}
							convertedValue={quote}
							conversionRate={quote_rate}
							animationDelay={i * 10}
							showParentheses={false}
						/>
						<!-- isDust={type === 'dust'} -->
					</span>
				{/each}
			</div>
		</div>
	</EthereumBalancesLoader>
{/if}
