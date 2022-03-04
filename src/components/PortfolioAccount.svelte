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

	export let layout: 'column' | 'grid' = 'column'
	// export let layout: 'column' | 'grid' = 'grid'
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


	import { matchesMediaQuery } from '../utils/matchesMediaQuery'

	const gridLayoutBreakpoint = '(min-width: 62rem)'
	const matchesGridLayoutBreakpoint = matchesMediaQuery(gridLayoutBreakpoint)

	$: isGridLayout = (layout === 'grid' || isEditing) && $matchesGridLayoutBreakpoint


	let gridLayoutIsChainExpanded: Record<Ethereum.ChainID, boolean> = {}

	const toggleGridLayoutIsChainExpanded = (chainID: Ethereum.ChainID) =>
		gridLayoutIsChainExpanded = {...gridLayoutIsChainExpanded, [chainID]: !gridLayoutIsChainExpanded[chainID]}


	let columnLayoutIsSectionExpanded: Record<`${Ethereum.ChainID}-${'balances' | 'defi' | 'nfts'}`, boolean> = {}

	const toggleColumnLayoutIsSectionExpanded = (key: string) =>
		columnLayoutIsSectionExpanded = {...columnLayoutIsSectionExpanded, [key]: !columnLayoutIsSectionExpanded[key]}


	import Address from './Address.svelte'
	import Balance from './Balance.svelte'
	import DefiBalances from './DefiBalances.svelte'
	import EnsName from './EnsName.svelte'
	import EnsResolutionLoader from './EnsResolutionLoader.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import EthereumNFTs from './EthereumNFTs.svelte'
	import HeightContainer from './HeightContainer.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TokenIcon from './TokenIcon.svelte'


	import { tokenColors } from '../data/token-colors'

	import { scale } from 'svelte/transition'
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

	/* .account :global(.defi-balances) {
		--padding-inner: 0.5em;
		display: grid;
		gap: var(--padding-inner);
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));;
	} */

	/* h4 {
		transition: padding-left 0.15s;
	}
	.is-editing h4 {
		padding-left: calc(1.5 * var(--padding-outer));
	} */


	.network {
		scroll-snap-align: start;
		scroll-margin-top: calc(var(--bleed-top) + var(--padding-outer) + 4.5rem);
	}

	/* .network.grid-row {
		display: grid;
		/* grid-template:
			auto
			/ 1fr 1fr 1fr; * /
		/* grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); * /
		gap: 1.75em;
		/* align-items: start; * /
	} */
	/* @media (min-width: 62rem) {
		.network.grid-row {
			grid-template:
				"Tokens DeFi NFTs" auto
				/ 1fr 1fr 1fr;
		}
	}
	.network.grid-row .token-balances {
		grid-area: Tokens;
	}
	.network.grid-row .defi-balances {
		grid-area: DeFi;
	}
	.network.grid-row .nft-balances {
		grid-area: NFTs;
	} */

	@media (min-width: 62rem) {
		.grid-row {
			display: grid;
			grid-template:
				"Tokens DeFi NFTs" auto
				/ [Tokens] 1fr [DeFi] 1fr [NFTs] 1fr;
			gap: 1.5em;
		}

		.grid-row > :global(.token-balances) {
			grid-column-start: Tokens;
		}
		.grid-row > :global(.defi-balances) {
			grid-column-start: DeFi;
		}
		.grid-row > :global(.nft-balances) {
			grid-column-start: NFTs;
		}
	}

	.network.grid-row > section {
		/* max-height: 50vh; */
		/* overflow-y: auto;
		position: sticky;
		top: 4.5rem; */
	}

	.network > :global(section) {
		--padding-inner: 0.5rem;
	}

	.network.grid-row hr {
		display: none;
	}
	hr {
		display: none;
	}


	header, .account :global(.header) {
		grid-column: 1 / -1;
	}


	.is-zero {
		opacity: 0.55;
	}
</style>


<article class="account card column sticky-layout" class:is-editing={isEditing} class:grid-layout={isGridLayout}>
	<EnsResolutionLoader
		{addressOrENSName}
		{provider}
		passiveReverseResolution
		layoutClass="column"
		let:address
		let:ensName
	>
		<header slot="header" class="bar card sticky">
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
			<!-- <slot /> -->
			<div class="stack">
				{#if $matchesGridLayoutBreakpoint && !isEditing}
					<div class="row" transition:scale>
						<button class="small" on:click={() => layout = isGridLayout ? 'column' : 'grid'} transition:scale>{isGridLayout ? '⊟' : '⊞'}</button><!-- ▤ -->
						<select bind:value={layout}>
							<option value="column">Column</option>
							<option value="grid">Grid</option>
						</select>
					</div>
				{/if}
				<slot />
			</div>
		</header>

		<!-- <hr> -->

		{#each
			showNetworks
				?.filter(({show}) => show)
				.map(networkSettings => ({
					networkSettings,
					network: networksByChainID[networkSettings.chainID]
				}))
				?? []
			as {
				networkSettings: {chainID, show, showBalances, showDeFi, showNFTs },
				network
			},
			i (chainID)
		}
			<!-- {#if isGridLayout}<hr>{/if} -->

			<section
				class="network"
				class:column={layout === 'column'}
				class:sticky-layout={isEditing}
				style="{tokenColors[network.slug] ? `--primary-color: var(--${tokenColors[network.slug]});` : ''}"
			>
				<HeightContainer containerClass="header sticky" isOpen={isEditing}>
					<header class="bar card">
						<span class="card-background"><TokenIcon erc20Token={network.nativeCurrency} /></span>
						<h3 class="row">
							<TokenIcon erc20Token={network.nativeCurrency} />
							<Address {network} {address}>{network.name}</Address>
						</h3>
						<span class="card-annotation">#{network.chainId}</span>
						<button class="small" on:click={() => show = false}>Hide Network</button>
					</header>
				</HeightContainer>

				<div class="network-content {isGridLayout ? 'column grid-row' : 'column-block'} sticky-layout">
					<!-- Token Balances -->
					{#if showBalances}<section class="token-balances column">
					<!-- <HeightContainer containerClass="token-balances" class="column" isOpen={showBalances}> -->
						<!-- {#if tokenBalancesProvider === 'Covalent' && Covalent.ChainIDs.includes(network.chainId)} -->
							<EthereumBalances
								{network}
								{address}
								{tokenBalancesProvider}
								{quoteCurrency}
								{showValues} {sortBy} {showSmallValues} {showUnderlyingAssets}
								isCollapsed={(isGridLayout ? !gridLayoutIsChainExpanded[chainID] : !columnLayoutIsSectionExpanded[`${chainID}-${'tokens'}`]) || isEditing}
								isScrollable={!isGridLayout} isHorizontal={!isGridLayout}
								bind:quoteTotal={tokenQuoteTotals[i]}
							>
								<svelte:fragment slot="header" let:balances let:filteredBalances let:quoteCurrency let:quoteTotal>
									<!-- {#if balances.length || isGridLayout} -->
										<hr>

										<header class="bar card sticky">
											<!-- <span class="card-background"><TokenIcon erc20Token={network.nativeCurrency} /></span> -->
											<h4 class="row">
												<TokenIcon erc20Token={network.nativeCurrency} />
												<Address {network} {address}>{#if !isEditing}<mark>{network.name}</mark> {/if}Balances</Address>
											</h4>
											<span>
												<TokenBalance symbol={quoteCurrency} balance={quoteTotal} showPlainFiat={true} />
												| {filteredBalances.length} tokens
											</span>
											{#if isEditing}
												<button class="small" on:click={() => showBalances = false}>Hide</button>
											{:else}
												<button class="small" on:click={() => isGridLayout ? toggleGridLayoutIsChainExpanded(chainID) : toggleColumnLayoutIsSectionExpanded(`${chainID}-${'tokens'}`)}>▼</button>
											{/if}
											<!-- {#if isEditing}
												<label>
													<input type="checkbox" bind:checked={showBalances}>
													<span>Show Balances</span>
												</label>
											{/if} -->
										</header>
									<!-- {/if} -->
								</svelte:fragment>
							</EthereumBalances>
						<!-- {:else if provider}
							{#each [network.nativeCurrency.symbol] as symbol}
								<Balance
									{network}
									{provider}
									{address}
									{symbol}
								/>
							{/each}
						{/if} -->
					</section>{/if}
					<!-- </HeightContainer> -->

					<!-- DeFi Balances -->
					{#if showDeFi}<section class="defi-balances column">
					<!-- <HeightContainer containerClass="defi-balances" class="column" isOpen={showDeFi}> -->
						<DefiBalances
							{network}
							{provider}
							{address}
							{defiProvider}
							{quoteCurrency}
							{showValues} {showUnderlyingAssets}
							isCollapsed={(isGridLayout ? !gridLayoutIsChainExpanded[chainID] : !columnLayoutIsSectionExpanded[`${chainID}-${'defi'}`]) || isEditing}
							isScrollable={!isGridLayout}
							bind:quoteTotal={defiQuoteTotals[i]}
						>
							<svelte:fragment slot="header" let:status let:defiBalances let:quoteTotal let:quoteTotalCurrency>
								<!-- {#if (status === 'resolved' && defiBalances?.length) || status === 'error' || isGridLayout} -->
									<hr>

									<header class="bar card sticky">
										<!-- <span class="card-background"><TokenIcon erc20Token={network.nativeCurrency} /></span> -->
										<h4 class="row">
											<TokenIcon erc20Token={network.nativeCurrency} />
											<span>{#if !isEditing}<mark>{network.name}</mark> {/if}DeFi</span>
										</h4>
										{#if quoteTotal !== undefined}
											<TokenBalance symbol={quoteTotalCurrency || quoteCurrency} balance={quoteTotal} showPlainFiat={true} />
										{/if}
										{#if isEditing}
											<button class="small" on:click={() => showDeFi = false}>Hide</button>
										{:else}
											<button class="small" on:click={() => isGridLayout ? toggleGridLayoutIsChainExpanded(chainID) : toggleColumnLayoutIsSectionExpanded(`${chainID}-${'defi'}`)}>▼</button>
										{/if}
										<!-- {#if isEditing}
											<label>
												<input type="checkbox" bind:checked={showDeFi}>
												<span>Show DeFi</span>
											</label>
										{/if} -->
									</header>
								<!-- {/if} -->
							</svelte:fragment>
						</DefiBalances>
					</section>{/if}
					<!-- </HeightContainer> -->

					<!-- NFT Balances -->
					{#if showNFTs}<section class="nft-balances column">
					<!-- <HeightContainer containerClass="nft-balances" class="column" isOpen={showNFTs}> -->
						<EthereumNFTs
							{network}
							{address}
							{nftProvider}
							{quoteCurrency}
							{showValues} {sortBy} {showSmallValues} {showUnderlyingAssets} {showNFTMetadata}
							isCollapsed={(isGridLayout ? !gridLayoutIsChainExpanded[chainID] : !columnLayoutIsSectionExpanded[`${chainID}-${'nfts'}`]) || isEditing}
							isScrollable={!isGridLayout}
							bind:quoteTotal={nftQuoteTotals[i]}
							let:nftContractCount
							let:nftCount
						>
							<svelte:fragment slot="header" let:balances>
								<!-- {#if balances?.length || isGridLayout} -->
									<hr>

									<header class="bar card sticky">
										<h4 class="row">
											<TokenIcon erc20Token={network.nativeCurrency} />
											<span>{#if !isEditing}<mark>{network.name}</mark> {/if}NFTs</span>
										</h4>
										<span class:is-zero={nftCount === 0}>
											<strong>{nftCount}</strong> NFT{nftCount === 1 ? '' : 's'}
											<!-- across -->|
											<strong>{nftContractCount}</strong> collection{nftContractCount === 1 ? '' : 's'}
										</span>
										{#if isEditing}
											<button class="small" on:click={() => showNFTs = false}>Hide</button>
										{:else}
											<button class="small" on:click={() => isGridLayout ? toggleGridLayoutIsChainExpanded(chainID) : toggleColumnLayoutIsSectionExpanded(`${chainID}-${'nfts'}`)}>▼</button>
										{/if}
										<!-- {#if isEditing}
											<label>
												<input type="checkbox" bind:checked={showNFTs}>
												<span>Show NFTs</span>
											</label>
										{/if} -->
									</header>
								<!-- {/if} -->
							</svelte:fragment>
						</EthereumNFTs>
					</section>{/if}
					<!-- </HeightContainer> -->
				</div>
			</section>
		{/each}
	</EnsResolutionLoader>
</article>