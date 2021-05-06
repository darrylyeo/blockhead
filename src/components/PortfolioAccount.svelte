<script lang="ts">
	import { AccountNetworkSettings, AccountType } from '../data/ethereum/portfolio-accounts'
	// import type { CryptoPosition } from '../data/CryptoPosition'
	import type { Ethereum } from '../data/ethereum/types'
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import type { QuoteCurrency } from '../data/currency/currency'
	import { networksByChainID } from '../data/ethereum/networks'
	import { Covalent } from '../data/analytics/covalent'


	// Balances view options

	export let addressOrENSName: Ethereum.Address | string
	export let type: AccountType
	export let showNetworks: AccountNetworkSettings[]

	export let provider: Ethereum.Provider
	export let analyticsProvider: AnalyticsProvider
	export let quoteCurrency: QuoteCurrency

	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending' = 'value-descending'
	export let showSmallValues = false
	export let showUnderlyingAssets = false

	export let isEditing: boolean

	export let nickname: string


	$: address = type === AccountType.Address ? addressOrENSName : addressOrENSName // await ens.name(addressOrENSName).getAddress()


	// Computed Values
	let tokenQuoteTotals = []
	let defiQuoteTotals = []
	let nftQuoteTotals = []
	$: console.log(address, 'defiQuoteTotals', defiQuoteTotals, 'quoteTotals', quoteTotals)
	$: quoteTotals = [...tokenQuoteTotals, ...defiQuoteTotals, ...nftQuoteTotals].filter(quoteTotal => quoteTotal !== undefined)
	export let quoteTotal
	$: quoteTotal = quoteTotals.reduce((sum, quoteTotal) => sum + quoteTotal, 0)


	import Address from './Address.svelte'
	import Balance from './Balance.svelte'
	import DefiBalances from './DefiBalances.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import EthereumNFTs from './EthereumNFTs.svelte'
	import Loading from './Loading.svelte'
	import HeightContainer from './HeightContainer.svelte'
	import TokenValue from './TokenValue.svelte'
</script>

<style>
	.account {
		--padding-inner: 0.75em;
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

	h4 {
		transition: padding-left 0.15s;
	}
	.is-editing h4 {
		padding-left: calc(1.5 * var(--padding-outer));
	}
</style>

<div class="account column-block" class:is-editing={isEditing}>
	<div class="bar">
		{#if nickname}
			<div class="row-inline">
				<h3>{nickname}</h3>
				<small><Address network={networksByChainID[1]} {address} /></small>
			</div>
		{:else}
			<h3><Address network={networksByChainID[1]} {address} /></h3>
		{/if}
		{#if quoteTotals.length}
			<span class="account-total-value">
				<TokenValue token={quoteCurrency} value={quoteTotal} showPlainFiat={true} />
			</span>
		{/if}
		<slot></slot>
	</div>
	{#each showNetworks as {chainID, show, showBalances, showDeFi, showNFTs}, i}
		{#each [networksByChainID[chainID]] as network}
			{#if show}
				<HeightContainer class="column" isOpen={isEditing}>
					<hr>
					<div class="bar">
						<h3>{network.name}</h3>
						<span class="card-annotation">#{network.chainId}</span>
						<button class="small" on:click={() => show = false}>Hide Network</button>
					</div>
				</HeightContainer>
				<!-- Token Balances -->
				{#if showBalances}
					{#if analyticsProvider === 'Covalent' && Covalent.ChainIDs.includes(network.chainId)}
						<EthereumBalances
							{network}
							{address}
							{analyticsProvider}
							{quoteCurrency}
							{showValues} {sortBy} {showSmallValues} {showUnderlyingAssets}
							isCollapsed={isEditing}
							bind:quoteTotal={tokenQuoteTotals[i]}
						>
							<svelte:fragment slot="header" let:network let:quoteCurrency let:quoteTotal>
								<hr>
								<div class="bar">
									<h4>{network.name} Balances</h4>
									<TokenValue token={quoteCurrency} value={quoteTotal} showPlainFiat={true} />
									{#if isEditing}
										<button class="small" on:click={() => showBalances = false}>Hide</button>
									{/if}
									<!-- {#if isEditing}
										<label>
											<input type="checkbox" bind:checked={showBalances}>
											<span>Show Balances</span>
										</label>
									{/if} -->
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
				{/if}

				<!-- DeFi Balances -->
				{#if showDeFi}
					<DefiBalances
						{network}
						{provider}
						{address}
						{quoteCurrency}
						{showValues}
						{showUnderlyingAssets}
						isCollapsed={isEditing}
						bind:quoteTotal={defiQuoteTotals[i]}
					>
						<svelte:fragment slot="header" let:quoteTotal>
							<hr>
							<div class="bar">
								<h4>{network.name} DeFi</h4>
								{#if isEditing}
									<button class="small" on:click={() => showDeFi = false}>Hide</button>
								{/if}
								{#if quoteTotal !== undefined}
									<TokenValue token={quoteCurrency} value={quoteTotal} showPlainFiat={true} />
								{/if}
								<!-- {#if isEditing}
									<label>
										<input type="checkbox" bind:checked={showDeFi}>
										<span>Show DeFi</span>
									</label>
								{/if} -->
							</div>
						</svelte:fragment>
					</DefiBalances>
				{/if}

				<!-- NFT Balances -->
				{#if showNFTs}
					<EthereumNFTs
						{network}
						{address}
						{analyticsProvider}
						{quoteCurrency}
						{showValues} {sortBy} {showSmallValues} {showUnderlyingAssets}
						isCollapsed={isEditing}
						bind:quoteTotal={nftQuoteTotals[i]}
						let:nftContractCount
						let:nftCount
					>
						<svelte:fragment slot="header">
							<hr>
							<div class="bar">
								<h4>{network.name} NFTs</h4>
								<span>
									<strong>{nftCount}</strong> NFT{nftCount === 1 ? '' : 's'}
									across
									<strong>{nftContractCount}</strong> collection{nftContractCount === 1 ? '' : 's'}
								</span>
								{#if isEditing}
									<button class="small" on:click={() => showNFTs = false}>Hide</button>
								{/if}
								<!-- {#if isEditing}
									<label>
										<input type="checkbox" bind:checked={showNFTs}>
										<span>Show NFTs</span>
									</label>
								{/if} -->
							</div>
						</svelte:fragment>
					</EthereumNFTs>
				{/if}
			{/if}
		{/each}
	{/each}
</div>