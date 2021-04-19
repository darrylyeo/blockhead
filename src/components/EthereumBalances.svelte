<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { networksByChainID } from '../data/ethereum/networks'
	import { Covalent } from '../data/analytics/covalent'
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'
	import { getTokenAddressBalances } from '../data/analytics/covalent'

	export let analyticsProvider: AnalyticsProvider
	export let address: string
	export let conversionCurrency: QuoteCurrency
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

	let filterFunction: (b: Covalent.TokenBalance) => boolean
	$: filterFunction = showSmallValues
		? b => b.type !== 'nft' // undefined
		: b => b.type !== 'nft' && !(/*b.type === 'dust' || */ b.quote < 1e-3)

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
</style>

{#if analyticsProvider === 'Covalent' && address}
	{#each Covalent.MainnetChainIDs.map(chainID => networksByChainID[chainID]) as network, i}
		{#await getTokenAddressBalances({address, nft: false, chainID: network.chainId, quoteCurrency: conversionCurrency})}
			<Loading iconAnimation="hover">
				<img slot="icon" src="/logos/covalent-logomark.svg" alt="Covalent" width="25">
				Retrieving {network.name} balances from Covalent...
			</Loading>
		{:then balances}
			<h4>{network.name}</h4>
			<div class="ethereum-balances card">
				{#each
					(filterFunction ? balances.items.filter(filterFunction) : balances.items).sort(sortFunction)
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
						animate:flip|local={{duration: 500, delay: Math.abs(i) * 10, easing: quintOut}}
					>
						<TokenValueWithConversion
							{showValues}
							token={contract_ticker_symbol || contract_name}
							tokenAddress={contract_address}
							tokenIcon={logo_url}
							tokenName={contract_name}
							value={balance * 0.1 ** contract_decimals}
							isDust={false}
							{conversionCurrency}
							convertedValue={quote}
							conversionRate={quote_rate}
						/>
						<!-- isDust={type === 'dust'} -->
					</span>
				{/each}
			</div>
		{:catch error}
			{error}
		{/await}
	{/each}
{/if}
