<script lang="ts">
	import { AccountType } from '../data/ethereum/accounts'
	// import type { CryptoPosition } from '../data/CryptoPosition'
	import type { Ethereum } from '../data/ethereum/types'
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import type { QuoteCurrency } from '../data/currency/currency'
	import { Covalent } from '../data/analytics/covalent'


	// Balances view options

	export let addressOrENSName: Ethereum.Address | string
	export let type: AccountType
	export let networks: Ethereum.Network[]

	export let provider: Ethereum.Provider
	export let analyticsProvider: AnalyticsProvider
	export let quoteCurrency: QuoteCurrency

	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending' = 'value-descending'
	export let showSmallValues = false
	export let showUnderlyingAssets = false

	export let isCollapsed: boolean


	$: address = type === AccountType.Address ? addressOrENSName : addressOrENSName // await ens.name(addressOrENSName).getAddress()


	// Computed Values
	let tokenQuoteTotals = []
	let nftQuoteTotals = []
	$: quoteTotals = [...tokenQuoteTotals, ...nftQuoteTotals]
	export let quoteTotal
	$: quoteTotal = quoteTotals.reduce((sum, quoteTotal) => sum + quoteTotal, 0)


	import Address from './Address.svelte'
	import Balance from './Balance.svelte'
	import DefiBalances from './DefiBalances.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import EthereumNFTs from './EthereumNFTs.svelte'
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
		{#if quoteTotals.length}
			<span class="account-total-value">
				<TokenValue token={quoteCurrency} value={quoteTotal} showPlainFiat={true} />
			</span>
		{/if}
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
				{isCollapsed}
				bind:quoteTotal={tokenQuoteTotals[i]}
			>
				<svelte:fragment slot="header" let:network let:quoteCurrency let:quoteTotal>
					<hr>
					<div class="bar">
						<h4>{network.name}</h4>
						<TokenValue token={quoteCurrency} value={quoteTotal} showPlainFiat={true} />
					</div>
				</svelte:fragment>
			</EthereumBalances>
		{:else if provider}
			<div class="balances">
				{#each ['ETH', 'USDC'] as token}
					<Balance {provider} {token} {address} />
				{/each}
			</div>
		{/if}

		<!-- DeFi Balances -->
		{#if network.chainId === 1}
			{#if provider}
				<DefiBalances
					{network}
					{provider}
					{address}
					{showUnderlyingAssets}
					{isCollapsed}
				>
					<svelte:fragment slot="header">
						<hr>
						<h4>{network.name} DeFi</h4>
					</svelte:fragment>
				</DefiBalances>
			{:else}
				<Loading>Connecting to the blockchain...</Loading>
			{/if}
		{/if}

		<!-- NFT Balances -->
		<EthereumNFTs
			{network}
			{address}
			{analyticsProvider}
			{quoteCurrency}
			{showValues} {sortBy} {showSmallValues} {showUnderlyingAssets}
			{isCollapsed}
			bind:quoteTotal={nftQuoteTotals[i]}
		>
			<svelte:fragment slot="header">
				<hr>
				<h4>{network.name} NFTs</h4>
			</svelte:fragment>
		</EthereumNFTs>
	{/each}
</div>