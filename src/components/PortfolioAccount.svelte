<script lang="ts">
	import type { CryptoAddress } from '../data/CryptoAddress'
	// import type { CryptoPosition } from '../data/CryptoPosition'
	import type { Ethereum } from '../data/ethereum/types'
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import type { QuoteCurrency } from '../data/currency/currency'
	import { Covalent } from '../data/analytics/covalent'


	// Balances view options

	export let networks: Ethereum.Network[]
	export let address: CryptoAddress
	export let provider: Ethereum.Provider
	export let analyticsProvider: AnalyticsProvider
	export let quoteCurrency: QuoteCurrency

	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending' = 'value-descending'
	export let showSmallValues = false
	export let showUnderlyingAssets = false


	// Computed Values
	let quoteTotals = []


	import Address from './Address.svelte'
	import DefiBalances from './DefiBalances.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import Loading from './Loading.svelte'
	import TokenValue from './TokenValue.svelte'
</script>

<style>
	.account {
		--padding-inner: 0.75em;
		display: grid;
		gap: var(--padding-inner);
	}

	.account-total-value {
		font-weight: bold;
		font-size: 1.1em;
	}

	.account :global(.ethereum-balances) {
		--padding-inner: 0.5em;
	}

	.account :global(.defi-balances) {
		--padding-inner: 0.5em;
		display: grid;
		gap: var(--padding-inner);
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	}
</style>

<div class="account">
	<div class="bar">
		<h3><Address {address} /></h3>
		<span class="account-total-value">
			<TokenValue token={quoteCurrency} value={quoteTotals.reduce((sum, quoteTotal) => sum + quoteTotal, 0)} showPlainFiat={true} />
		</span>
		<slot></slot>
	</div>
	{#each networks as network, i}
		<!-- Token Balances -->
		{#if analyticsProvider === 'Covalent' && Covalent.ChainIDs.includes(network.chainId)}
			<EthereumBalances
				{network}
				{address}
				{analyticsProvider}
				{quoteCurrency}
				{showValues} {sortBy} {showSmallValues} {showUnderlyingAssets}
				bind:quoteTotal={quoteTotals[i]}
			>
				<div slot="header" class="bar" let:network let:quoteCurrency let:quoteTotal>
					<h4>{network.name}</h4>
					<TokenValue token={quoteCurrency} value={quoteTotal} showPlainFiat={true} />
				</div>
			</EthereumBalances>
		{/if}

		<!-- DeFi Balances -->
		{#if network.chainId === 1}
			{#if provider}
				<DefiBalances {provider} {address} {showUnderlyingAssets}>
					<svelte:fragment slot="header">
						<hr>
						<h4>Ethereum DeFi</h4>
					</svelte:fragment>
				</DefiBalances>
			{:else}
				<Loading>Connecting to the blockchain...</Loading>
			{/if}
		{/if}
	{/each}
</div>