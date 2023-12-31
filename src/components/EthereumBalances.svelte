<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import type { QuoteCurrency } from '../data/currencies'
	import type { TokenBalancesProvider } from '../data/tokenBalancesProvider'

	import type { TokenWithBalance } from '../data/tokens'


	// Context
	import { preferences } from '../state/preferences'


	// Inputs
	export let network: Ethereum.Network
	export let address: string
	export let tokenBalancesProvider: TokenBalancesProvider
	$: tokenBalancesProvider = $$props.tokenBalancesProvider || $preferences.tokenBalancesProvider
	export let quoteCurrency: QuoteCurrency
	$: quoteCurrency = $$props.quoteCurrency || $preferences.quoteCurrency

	export let isSelectable = false
	export let selectedToken: Ethereum.NativeCurrency | Ethereum.ERC20Token | undefined

	// (View options)
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending'
	export let showNativeCurrency = true
	export let showSmallValues = false
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let isScrollable = true
	export let isHorizontal = false

	export let isOpen: boolean

	export let containerClass: string
	export let contentClass: string


	// Internal state
	let animate: boolean
	// (Computed)
	$: animate = !showSmallValues && !!balances && balances.length < 50


	// Outputs
	export let balances: TokenWithBalance[] | undefined

	// (Computed)
	let filteredBalances: TokenWithBalance[]
	$: filteredBalances = balances
		?.filter((tokenWithBalance) => (
			(showNativeCurrency &&
				tokensAreEqual(network.nativeCurrency, tokenWithBalance.token)
			) ||
			!(!showSmallValues && (
				tokenWithBalance.token.symbol?.includes(' ') // spam
				|| tokenWithBalance.token.symbol?.match(/^[a-z0-9-]+(\.[a-z0-9-]+)+$/i) // spam
				// (Math.abs(tokenWithBalance.value) < 1e-3) // isSmallValue
				|| (tokenWithBalance.conversion && Math.abs(tokenWithBalance.conversion.value) < 1e-3) // isSmallValue
				|| (tokenWithBalance.balance === 0n) // isZero
			))
		))
		.sort(
			sortBy === 'value-descending' ? (a, b) => a.conversion && b.conversion ? b.conversion.value - a.conversion.value : Number(a.balance - b.balance) :
			sortBy === 'value-ascending' ? (a, b) => a.conversion && b.conversion ? a.conversion.value - b.conversion.value : Number(a.balance - b.balance) :
			sortBy === 'ticker-ascending' ? (a, b) => a.token.symbol?.localeCompare(b.token.symbol) :
			undefined
		)
		?? []

	export let summary: {
		quoteTotal: number,
		quoteCurrency: QuoteCurrency,
		balancesCount: number,
		filteredBalancesCount: number
	} | undefined

	$: summary = {
		quoteTotal: balances?.reduce((sum, tokenWithBalance) => sum + (tokenWithBalance.conversion?.value ?? 0), 0) ?? 0,
		quoteCurrency,
		balancesCount: balances?.filter(tokenWithBalance => tokenWithBalance.balance > 0).length ?? 0,
		filteredBalancesCount: filteredBalances?.length,
	}


	// Functions
	const tokensAreEqual = (token1: Ethereum.NativeCurrency | Ethereum.ERC20Token, token2: Ethereum.NativeCurrency | Ethereum.ERC20Token) =>
		// token1.name === token2.name &&
		token1.symbol === token2.symbol &&
		token1.decimals === token2.decimals


	// Components
	import EthereumBalancesLoader from './EthereumBalancesLoader.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'


	// Transitions/snimations
	import { flip } from 'svelte/animate'
	import { scale } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
</script>


<style>
	.ethereum-balances {
		--column-width: 12rem;
		/* --column-gap: var(--padding-inner); */
		--column-gap: calc(3 * var(--padding-inner));

		display: grid;
		gap: var(--padding-inner) var(--column-gap);
		grid-template-columns: repeat(auto-fit, minmax(min(var(--column-width), 100%), 1fr));
		transition: grid-template 0.3s;
	}
	.ethereum-balances.horizontal {
		grid-auto-flow: column;
		grid-auto-columns: var(--column-width);
		grid-template-rows: repeat(auto-fit, minmax(min(1.5em, 100%), 1fr));
		overflow-x: auto;
		max-height: 30rem;
		scroll-snap-type: both proximity;
	}
	.ethereum-balances.show-amounts-and-values {
		--column-width: 16rem;
		/* --column-gap: calc(3 * var(--padding-inner)); */
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
</style>


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
		{#if filteredBalances.length}
			<div class="ethereum-balances card" class:horizontal={isHorizontal} class:show-amounts-and-values={tokenBalanceFormat === 'both'}>
				{#each
					filteredBalances
					as tokenWithBalance,
					i ('address' in tokenWithBalance.token ? tokenWithBalance.token : tokenWithBalance.token.symbol || tokenWithBalance.token.name)
				}
					{@const isNativeCurrency = tokensAreEqual(network.nativeCurrency, tokenWithBalance.token)}
					{@const isSelected = selectedToken && selectedToken.address === tokenWithBalance.token.address}

					<span
						class="ethereum-balance"
						class:mark={isNativeCurrency}
						class:is-selectable={isSelectable}
						class:is-selected={isSelected}
						tabindex={isSelectable ? 0 : undefined}
						on:click={() => {
							selectedToken = isSelected ? undefined : tokenWithBalance.token
						}}
						in:scale|global={{ duration: animate ? 500 : 0 }}
						animate:flip|local={{ duration: animate ? 500 : 0, delay: animate ? 300 * i / filteredBalances.length : 0, easing: quintOut }}
					>
						{#if tokenWithBalance.conversion}
							<TokenBalanceWithConversion

								{network}
								erc20Token={tokenWithBalance.token}

								balance={Number(tokenWithBalance.balance) * 0.1 ** tokenWithBalance.token.decimals}
								conversionCurrency={quoteCurrency}
								convertedValue={tokenWithBalance.conversion.value}
								conversionRate={tokenWithBalance.conversion.rate}

								layout="block"
								{tokenBalanceFormat}
								animationDelay={i * 10}
								transitionWidth={filteredBalances.length < 40}
							/>
						{:else}
							<TokenBalance
								{tokenBalanceFormat}

								{network}
								erc20Token={tokenWithBalance.token}

								balance={Number(tokenWithBalance.balance) * 0.1 ** tokenWithBalance.token.decimals}

								animationDelay={i * 10}

								transitionWidth={filteredBalances.length < 40}
							/>
						{/if}
					</span>
				<!-- {:else}
					No balances found. -->
				{/each}
			</div>
		{/if}
	</div>
</EthereumBalancesLoader>
