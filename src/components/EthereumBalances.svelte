<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { Covalent } from '../api/covalent'
	import type { QuoteCurrency, TickerSymbol } from '../data/currencies'
	import { getTokenAddressBalances } from '../api/covalent'
	import { preferences } from '../state/preferences'

	export let network: Ethereum.Network
	export let address: string
	export let tokenBalancesProvider = $preferences.tokenBalancesProvider
	export let quoteCurrency: QuoteCurrency = $preferences.quoteCurrency
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending'
	export let showNativeCurrency = true
	export let showSmallValues = false
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let isScrollable = true
	export let isHorizontal = false

	export let isSelectable = false
	export let selectedToken: Ethereum.ERC20Token | undefined

	export let isOpen: boolean

	export let containerClass: string
	export let contentClass: string


	type TokenWithBalance = {
		token: Ethereum.ERC20Token,
		balance: Covalent.ERC20TokenOrNFTContractWithBalance['balance'],
		type: Covalent.ERC20TokenOrNFTContractWithBalance['type'],
		value: Covalent.ERC20TokenOrNFTContractWithBalance['quote'],
		rate: Covalent.ERC20TokenOrNFTContractWithBalance['quote_rate'],
	}

	export let balances: TokenWithBalance[] = []

	export let filteredBalances: TokenWithBalance[]
	$: filteredBalances = balances
		.filter(({type, value, token, balance}) =>
			type !== 'nft' && (
				(showNativeCurrency &&
					tokensAreEqual(network.nativeCurrency, token)
				) ||
				!(!showSmallValues && (
					// type === 'dust' ||
					Math.abs(value) < 1e-3 || // isSmallValue
					balance == 0 // isZero
				))
			)
		)
		.sort(
			sortBy === 'value-descending' ? (a, b) => b.value - a.value || a.balance - b.balance :
			sortBy === 'value-ascending' ? (a, b) => a.value - b.value || b.balance - a.balance :
			sortBy === 'ticker-ascending' ? (a, b) => a.token.symbol?.localeCompare(b.token.symbol) :
			undefined
		)

	export let summary: {
		quoteTotal: number,
		quoteCurrency: QuoteCurrency,
		balancesCount: number,
		filteredBalancesCount: number
	}

	$: summary = {
		quoteTotal: balances.reduce((sum, item) => sum + item.value, 0),
		quoteCurrency,
		balancesCount: balances.length,
		filteredBalancesCount: filteredBalances.length,
	}


	const tokensAreEqual = (token1, token2) =>
		// token1.name === token2.name &&
		token1.symbol === token2.symbol &&
		token1.decimals === token2.decimals
	

	import EthereumBalancesLoader from './EthereumBalancesLoader.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'


	import { flip } from 'svelte/animate'
	import { scale } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
</script>


<style>
	.ethereum-balances {
		--column-width: 12rem;
		--column-gap: var(--padding-inner);

		display: grid;
		gap: var(--padding-inner) var(--column-gap);
		grid-template-columns: repeat(auto-fit, minmax(var(--column-width), 1fr));
	}
	.ethereum-balances.horizontal {
		grid-auto-flow: column;
		grid-auto-columns: var(--column-width);
		grid-template-rows: repeat(auto-fit, minmax(1.5em, 1fr));
		overflow-x: auto;
		max-height: 30rem;
		scroll-snap-type: both proximity;
	}
	.ethereum-balances.show-amounts-and-values {
		--column-width: 16rem;
		--column-gap: calc(3 * var(--padding-inner));
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

		scroll-snap-align: start;
		scroll-margin-left: var(--padding-outer);
		scroll-margin-top: calc(var(--padding-inner));
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

	.ethereum-balance :global(.token-balance-with-conversion) {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
</style>


{#if address}
	<EthereumBalancesLoader
		{network}
		{address}
		{tokenBalancesProvider}
		{quoteCurrency}
		{isOpen}
		{containerClass}
		{contentClass}
		bind:balances
	>
		<!-- showIf={() => balances.length} -->
		<svelte:fragment slot="header" let:status let:loadingMessage let:errorMessage>
			<slot name="header" {balances} {filteredBalances} {summary} {status} {loadingMessage} {errorMessage} />
		</svelte:fragment>

		<div class:scrollable-list={isScrollable && filteredBalances.length > 45}>
			<div class="ethereum-balances card" class:horizontal={isHorizontal} class:show-amounts-and-values={tokenBalanceFormat === 'both'}>
				{#each
					filteredBalances
					as {type, token, balance, value, rate},
					i (token.address || token.symbol || token.name)
				}
					<span
						class="ethereum-balance"
						class:mark={tokensAreEqual(network.nativeCurrency, token)}
						class:is-selectable={isSelectable}
						class:is-selected={selectedToken?.address === token.address}
						tabindex={isSelectable ? 0 : undefined}
						on:click={() =>
							selectedToken = selectedToken?.address === token.address ? undefined : token
						}
						in:scale
						animate:flip|local={{duration: filteredBalances.length < 50 ? 500 : 0, delay: 300 * i / filteredBalances.length, easing: quintOut}}
					>
						<TokenBalanceWithConversion
							{tokenBalanceFormat}

							{network}
							erc20Token={token}

							balance={balance * 0.1 ** token.decimals}
							conversionCurrency={quoteCurrency}
							convertedValue={value}
							conversionRate={rate}

							animationDelay={i * 10}
							showParentheses={false}

							transitionWidth={filteredBalances.length < 40}
						/>
					</span>
				{:else}
					No balances found.
				{/each}
			</div>
		</div>
	</EthereumBalancesLoader>
{/if}
