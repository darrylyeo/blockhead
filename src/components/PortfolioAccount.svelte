<script lang="ts">
	import { AccountNetworkSettings, AccountType } from '../data/ethereum/portfolio-accounts'
	// import type { CryptoPosition } from '../data/CryptoPosition'
	import type { Ethereum } from '../data/ethereum/types'
	import type { DeFiProvider } from '../data/defi-provider'
	import type { QuoteCurrency } from '../data/currency/currency'
	import { networksByChainID } from '../data/ethereum/networks'
	import { Covalent } from '../data/analytics/covalent'
	import { getDefaultProvider } from '@ethersproject/providers'


	// Balances view options

	export let addressOrENSName: Ethereum.Address | string
	export let type: AccountType
	export let showNetworks: AccountNetworkSettings[]

	export let provider: Ethereum.Provider
	export let defiProvider: DeFiProvider
	export let tokenBalancesProvider
	export let nftProvider
	export let quoteCurrency: QuoteCurrency

	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending' = 'value-descending'
	export let showSmallValues = false
	export let showUnderlyingAssets = false
	export let showNFTMetadata = false

	export let isEditing: boolean

	export let nickname: string


	// Computed Values
	// export let portfolioData: Record<Ethereum.ChainID, {
	// 	balances: ,
	// 	quoteTotal: number,
	// }>
	let tokenQuoteTotals = []
	let defiQuoteTotals = []
	let nftQuoteTotals = []
	// $: console.log(address, 'defiQuoteTotals', defiQuoteTotals, 'quoteTotals', quoteTotals)
	$: quoteTotals = [...tokenQuoteTotals, ...defiQuoteTotals, ...nftQuoteTotals].filter(quoteTotal => quoteTotal !== undefined)
	export let quoteTotal
	$: quoteTotal = quoteTotals.reduce((sum, quoteTotal) => sum + quoteTotal, 0)


	import Address from './Address.svelte'
	import Balance from './Balance.svelte'
	import DefiBalances from './DefiBalances.svelte'
	import EnsName from './EnsName.svelte'
	import EnsResolutionLoader from './EnsResolutionLoader.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import EthereumNFTs from './EthereumNFTs.svelte'
	import HeightContainer from './HeightContainer.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import { tokenColors } from '../data/token-colors'
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
	<EnsResolutionLoader
		{addressOrENSName}
		{provider}
		passiveReverseResolution
		let:address
		let:ensName
	>
		<div slot="header" class="bar">
			<div class="row-inline">
				{#if nickname}
					<h3>{nickname}</h3>
					{#if address}
						<small><Address network={networksByChainID[1]} {address} /></small>
					{/if}
				{:else if type === AccountType.ENS}
					{#if ensName}
						<h3><EnsName {ensName} /></h3>
					{/if}
					{#if address}
						<small><Address network={networksByChainID[1]} {address} /></small>
					{/if}
				{:else}
					{#if address}
						<h3><Address network={networksByChainID[1]} {address} /></h3>
					{/if}
					{#if ensName}
						<small><EnsName {ensName} /></small>
					{/if}
				{/if}
			</div>
			{#if quoteTotals.length}
				<span class="account-total-value">
					<TokenBalance symbol={quoteCurrency} balance={quoteTotal} showPlainFiat={true} />
				</span>
			{/if}
			<slot></slot>
		</div>

		{#each showNetworks as {chainID, show, showBalances, showDeFi, showNFTs}, i}
			{#each [networksByChainID[chainID]] as network}
				{#if show}
					<div class="column" style="{tokenColors[network.slug] ? `--primary-color: var(--${tokenColors[network.slug]});` : ''}">
						<HeightContainer class="column" isOpen={isEditing}>
							<hr>
							<div class="bar">
								<h3><Address {network} {address}>{network.name}</Address></h3>
								<span class="card-annotation">#{network.chainId}</span>
								<button class="small" on:click={() => show = false}>Hide Network</button>
							</div>
						</HeightContainer>

						<!-- Token Balances -->
						{#if showBalances}
							{#if tokenBalancesProvider === 'Covalent' && Covalent.ChainIDs.includes(network.chainId)}
								<EthereumBalances
									{network}
									{address}
									{tokenBalancesProvider}
									{quoteCurrency}
									{showValues} {sortBy} {showSmallValues} {showUnderlyingAssets}
									isCollapsed={isEditing}
									bind:quoteTotal={tokenQuoteTotals[i]}
								>
									<svelte:fragment slot="header" let:balances let:quoteCurrency let:quoteTotal>
										{#if balances?.length}
											<hr>
											<div class="bar">
												<h4><Address {network} {address}>{network.name} Balances</Address></h4>
												<TokenBalance symbol={quoteCurrency} balance={quoteTotal} showPlainFiat={true} />
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
										{/if}
									</svelte:fragment>
								</EthereumBalances>
							{:else if provider}
								<div class="balances">
									{#each [network.nativeCurrency.symbol] as symbol}
										<Balance
											{network}
											{provider}
											{address}
											{symbol}
										/>
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
								{defiProvider}
								{quoteCurrency}
								{showValues}
								{showUnderlyingAssets}
								isCollapsed={isEditing}
								bind:quoteTotal={defiQuoteTotals[i]}
							>
								<svelte:fragment slot="header" let:status let:defiBalances let:quoteTotal let:quoteTotalCurrency>
									{#if (status === 'resolved' && defiBalances?.length) || status === 'error'}
										<hr>
										<div class="bar">
											<h4>{network.name} DeFi</h4>
											{#if quoteTotal !== undefined}
												<TokenBalance symbol={quoteTotalCurrency || quoteCurrency} balance={quoteTotal} showPlainFiat={true} />
											{/if}
											{#if isEditing}
												<button class="small" on:click={() => showDeFi = false}>Hide</button>
											{/if}
											<!-- {#if isEditing}
												<label>
													<input type="checkbox" bind:checked={showDeFi}>
													<span>Show DeFi</span>
												</label>
											{/if} -->
										</div>
									{/if}
								</svelte:fragment>
							</DefiBalances>
						{/if}

						<!-- NFT Balances -->
						{#if showNFTs}
							<EthereumNFTs
								{network}
								{address}
								{nftProvider}
								{quoteCurrency}
								{showValues} {sortBy} {showSmallValues} {showUnderlyingAssets} {showNFTMetadata}
								isCollapsed={isEditing}
								bind:quoteTotal={nftQuoteTotals[i]}
								let:nftContractCount
								let:nftCount
							>
								<svelte:fragment slot="header" let:balances>
									{#if balances?.length}
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
									{/if}
								</svelte:fragment>
							</EthereumNFTs>
						{/if}
					</div>
				{/if}
			{/each}
		{/each}
	</EnsResolutionLoader>
</div>