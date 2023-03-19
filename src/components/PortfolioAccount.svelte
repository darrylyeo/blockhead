<script lang="ts">
	import type { PortfolioAccount } from '../state/portfolio-accounts'
	import type { Ethereum } from '../data/networks/types'
	import { DefiProvider, defiProviderIcons } from '../data/defiProviders'
	import type { QuoteCurrency } from '../data/currencies'
	import { getNetworkColor, networksByChainID } from '../data/networks'
	import { type TokenBalancesProvider, tokenBalancesProviderIcons } from '../data/tokenBalancesProvider'
	import { type NftProvider, nftProviderIcons } from '../data/nftProviders'
	import { Covalent } from '../api/covalent'
	import { getDefaultProvider } from 'ethers'


	// Balances view options

	export let account: PortfolioAccount

	export let provider: Ethereum.Provider
	export let defiProvider: DefiProvider
	export let tokenBalancesProvider: TokenBalancesProvider
	export let nftProvider: NftProvider
	export let quoteCurrency: QuoteCurrency

	export let layout: 'column' | 'grid' = 'grid'
	// export let layout: 'column' | 'grid' = 'grid'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending' = 'value-descending'
	export let showSmallValues = false
	export let showUnderlyingAssets = false
	export let showNFTMetadata = false
	export let showImagesOnly = false
	export let show3D = false

	export let isEditing: boolean

	export let nickname: string


	// Computed Values
	// export let portfolioData: Record<Ethereum.ChainID, {
	// 	balances: ,
	// 	quoteTotal: number,
	// }>
	let balancesSummaries = []
	let defiAppsSummaries = []
	let nftsSummaries = []

	export let summary: {
		quoteTotal: number,
		quoteTotalCurrency: QuoteCurrency,
		balancesCount: number,
		filteredBalancesCount: number,
		defiAppsCount: number,
		nftContractsCount: number,
		nftsCount: number,
	}

	$: summary = {
		quoteTotal:
			[
				...balancesSummaries.map(({ quoteTotal }) => quoteTotal),
				...defiAppsSummaries.map(({ quoteTotal }) => quoteTotal),
				...nftsSummaries.map(({ quoteTotal }) => quoteTotal),
			]
				.reduce((sum, n = 0) => sum + n, 0),

		quoteTotalCurrency: quoteCurrency,

		balancesCount:
			balancesSummaries
				.reduce((sum, { balancesCount = 0 } = {}) => sum + balancesCount, 0),
		
		filteredBalancesCount:
			balancesSummaries
				.reduce((sum, { filteredBalancesCount = 0 } = {}) => sum + filteredBalancesCount, 0),

		defiAppsCount:
			defiAppsSummaries
				.reduce((sum, { defiAppsCount = 0 } = {}) => sum + defiAppsCount, 0),

		nftContractsCount:
			nftsSummaries
				.reduce((sum, { nftContractsCount = 0 } = {}) => sum + nftContractsCount, 0),

		nftsCount:
			nftsSummaries
				.reduce((sum, { nftsCount = 0 } = {}) => sum + nftsCount, 0),
	}


	import { triggerEvent } from '../events/triggerEvent'


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
	import EthereumNftBalances from './EthereumNftBalances.svelte'
	import HeightContainer from './HeightContainer.svelte'
	import InlineContainer from './InlineContainer.svelte'
	import Loading from './Loading.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
	import SizeContainer from './SizeContainer.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TweenedNumber from './TweenedNumber.svelte'


	import { tokenColors } from '../data/tokenColors'

	import { scale } from 'svelte/transition'
	import { cardStyle } from '../utils/card-background'
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

	.error-icon-container {
		aspect-ratio: 1;
	}
	.error-icon-container > :first-child {
		/* opacity: 0.75; */
		filter: contrast(0.95) grayscale(0.75);
		align-self: stretch;
	}
	.error-icon-container > :last-child {
		color: var(--primary-color);
		font-size: 0.75em;
		place-self: end;
		justify-content: center;
		align-items: center;
		z-index: 1;
		display: flex;
		line-height: 0;
		width: 0;
		height: 0;
	}

	label {
		cursor: ns-resize;
	}
</style>


<article
	id={account.id}
	class="account card column sticky-layout"
	class:is-editing={isEditing}
	class:grid-layout={isGridLayout}
>
	<EnsResolutionLoader
		addressOrEnsName={account.id}
		{provider}
		passiveReverseResolution
		let:type
		let:address
		let:ensName
		let:lensName
		clip={false}
	>
		<header slot="header" class="bar card sticky">
			<div class="row-inline">
				{#if lensName && type === 'lensName'}
					<h3>{lensName}</h3>
					{#if address}
						<small><Address network={networksByChainID[1]} {address} /></small>
					{/if}
				{:else if nickname}
					<h3>{nickname}</h3>
					{#if address}
						<small><Address network={networksByChainID[1]} {address} /></small>
					{/if}
				{:else if type === 'ensName'}
					{#if ensName}
						<h3><EnsName {ensName} showAvatar /></h3>
					{/if}
					{#if address}
						<small><Address network={networksByChainID[1]} {address} /></small>
					{/if}
				{:else}
					{#if address}
						<h3><Address network={networksByChainID[1]} {address} /></h3>
					{/if}
					{#if ensName}
						<small><EnsName {ensName} showAvatar /></small>
					{/if}
				{/if}
			</div>

			{#if summary}
				<span class="summary">
					<span class="account-total-value"><TokenBalance symbol={quoteCurrency} balance={summary.quoteTotal} showPlainFiat={true} /></span>

					{#if summary.filteredBalancesCount}
						│
						<strong><TweenedNumber value={summary.filteredBalancesCount} /></strong> token{summary.filteredBalancesCount === 1 ? '' : 's'}
					{/if}

					{#if summary.defiAppsCount}
						│
						<strong><TweenedNumber value={summary.defiAppsCount} /></strong> app{summary.defiAppsCount === 1 ? '' : 's'}
					{/if}

					{#if summary.nftsCount}
						│
						<strong><TweenedNumber value={summary.nftsCount} /></strong> NFT{summary.nftsCount === 1 ? '' : 's'}

						{#if summary.nftContractsCount}
							from <strong><TweenedNumber value={summary.nftContractsCount} /></strong> collection{summary.nftContractsCount === 1 ? '' : 's'}
						{/if}
					{/if}
				</span>
			{/if}

			<InlineContainer containerClass="align-end" class="stack align-end">
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
			</InlineContainer>
		</header>

		<!-- <hr> -->

		{#each account.views ?? [] as view, i (view.chainId)}
			{@const network = networksByChainID[view.chainId]}

			{@const deleteView = () => {
				account.deleteView(view)

				account = account

				triggerEvent('PortfolioAccount/ToggleNetwork', {
					chainId: view.chainId,
					networkIsShowing: false,
				})
			}}

			{@const toggleSection = (sectionType) => { // 'Balances' | 'DeFi' | 'NFTs'
				if(sectionType === 'Balances')
					view.showBalances = !view.showBalances
				else if(sectionType === 'DeFi')
					view.showDefi = !view.showDefi
				else if(sectionType === 'NFTs')
					view.showNfts = !view.showNfts

				// Value isn't yet mutated, invert
				triggerEvent('PortfolioAccount/ToggleSection', {
					chainId: view.chainId,
					sectionType,
					sectionIsShowing: {
						'Balances': !view.showBalances,
						'DeFi': !view.showDefi,
						'NFTs': !view.showNfts,
					}[sectionType],
				})
			}}

			<!-- {#if isGridLayout}<hr>{/if} -->

			<section
				class="network"
				class:column={layout === 'column'}
				class:sticky-layout={isEditing}
				style="{tokenColors[network.slug] ? `--primary-color: var(--${tokenColors[network.slug]});` : ''}"
			>
				<SizeContainer containerClass="header sticky" isOpen={isEditing} renderOnlyWhenOpen={false}>
					<header class="bar card" style={cardStyle([getNetworkColor(network)])}>
						<span class="card-background"><NetworkIcon {network} /></span>
						<h3 class="row">
							<NetworkIcon {network} />
							<Address {network} {address}>{network.name}</Address>
						</h3>
						<span class="card-annotation">#{network.chainId}</span>
						<button class="small" on:click={deleteView}>Hide Network</button>
					</header>
				</SizeContainer>

				<div class="network-content {isGridLayout ? 'column grid-row' : 'column-block'} sticky-layout">
					<!-- Token Balances -->
					{#if view.showBalances}<section class="token-balances column-block">
					<!-- <HeightContainer containerClass="token-balances" class="column" isOpen={showBalances}> -->
						<!-- {#if tokenBalancesProvider === TokenBalancesProvider.Covalent && Covalent.ChainIDs.includes(network.chainId)} -->
							<EthereumBalances
								{network}
								{address}
								{tokenBalancesProvider}
								{quoteCurrency}
								{tokenBalanceFormat} {sortBy} {showSmallValues} {showUnderlyingAssets}
								isOpen={Boolean(isGridLayout ? gridLayoutIsChainExpanded[view.chainId] : columnLayoutIsSectionExpanded[`${view.chainId}-${'tokens'}`]) && !isEditing}
								isScrollable={!isGridLayout} isHorizontal={!isGridLayout}
								bind:summary={balancesSummaries[i]}
							>
								<svelte:fragment slot="header" let:summary let:status let:loadingMessage let:errorMessage>
									<!-- {#if balances.length || isGridLayout} -->
										<!-- <hr> -->

										<label class="bar card sticky">
											<!-- <span class="card-background"><NetworkIcon {network} /></span> -->
											<h4 class="row">
												<NetworkIcon {network} />
												<Address {network} {address}><InlineContainer isOpen={!isEditing} clip containerClass="align-end"><mark>{network.name}</mark>&nbsp;</InlineContainer>Balances</Address>
											</h4>
											<InlineContainer containerClass="align-end" class="stack align-end">
												{#if status === 'loading'}
													<Loading
														layout="icon"
														iconAnimation="hover"
														title={loadingMessage}
													>
														<img
															slot="icon"
															src={tokenBalancesProviderIcons[tokenBalancesProvider]}
															alt={tokenBalancesProvider}
															width={20}
														/>
													</Loading>
													<!-- <span transition:scale>Loading...</span> -->
												{:else if status === 'error'}
													<div class="error-icon-container stack" transition:scale>
														<img
															title={errorMessage}
															src={tokenBalancesProviderIcons[tokenBalancesProvider]}
															alt={tokenBalancesProvider}
															width={20}
														/>
														<span>⚠︎</span>
													</div>
												{:else if summary}
													<span
														class="summary align-end"
														class:is-zero={!summary.filteredBalancesCount}
														transition:scale
													>
														<TokenBalance symbol={summary.quoteCurrency} balance={summary.quoteTotal} showPlainFiat={true} />
														│
														<strong><TweenedNumber value={summary.filteredBalancesCount} /></strong> tokens
													</span>
												{/if}
											</InlineContainer>
											<InlineContainer containerClass="align-end" class="stack align-end">
												{#if isEditing}
													<button class="small" on:click={() => toggleSection('Balances')} transition:scale>Hide</button>
												{:else}
													<button class="small" on:click={() => isGridLayout ? toggleGridLayoutIsChainExpanded(view.chainId) : toggleColumnLayoutIsSectionExpanded(`${view.chainId}-${'tokens'}`)} transition:scale>▼</button>
												{/if}
											</InlineContainer>
											<!-- {#if isEditing}
												<label>
													<input type="checkbox" bind:checked={showBalances}>
													<span>Show Balances</span>
												</label>
											{/if} -->
										</label>
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
					{#if view.showDefi}<section class="defi-balances column-block">
					<!-- <HeightContainer containerClass="defi-balances" class="column" isOpen={showDeFi}> -->
						<DefiBalances
							{network}
							{provider}
							{address}
							{defiProvider}
							{quoteCurrency}
							{tokenBalanceFormat} {showUnderlyingAssets}
							isOpen={Boolean(isGridLayout ? gridLayoutIsChainExpanded[view.chainId] : columnLayoutIsSectionExpanded[`${view.chainId}-${'defi'}`]) && !isEditing}
							isScrollable={!isGridLayout}
							bind:summary={defiAppsSummaries[i]}
						>
							<svelte:fragment slot="header" let:status let:summary let:loadingMessage let:errorMessage>
								<!-- {#if (status === 'resolved' && summary?.defiAppsCount) || status === 'error' || isGridLayout} -->
									<!-- <hr> -->

									<label class="bar card sticky">
										<!-- <span class="card-background"><NetworkIcon {network} /></span> -->
										<h4 class="row">
											<NetworkIcon {network} />
											<span><InlineContainer isOpen={!isEditing} clip containerClass="align-end"><mark>{network.name}</mark>&nbsp;</InlineContainer>DeFi</span>
										</h4>
										<InlineContainer containerClass="align-end" class="stack align-end">
											{#if status === 'loading'}
												<Loading
													layout="icon"
													iconAnimation="hover"
													title={loadingMessage}
												>
													<img
														slot="icon"
														src={defiProviderIcons[defiProvider]}
														alt={defiProvider}
														width={20}
													/>
												</Loading>
												<!-- <span transition:scale>Loading...</span> -->
											{:else if status === 'error'}
												<div class="error-icon-container stack" transition:scale>
													<img
														title={errorMessage}
														src={defiProviderIcons[defiProvider]}
														alt={defiProvider}
														width={20}
													/>
													<span>⚠︎</span>
												</div>
											{:else if summary}
												<span class="summary" class:is-zero={!summary.defiAppsCount}>
													<TokenBalance
														symbol={summary.quoteTotalCurrency || quoteCurrency}
														balance={summary.quoteTotal}
														showPlainFiat={true}
													/>
													│
													<strong><TweenedNumber value={summary.defiAppsCount} /></strong> app{summary.defiAppsCount === 1 ? '' : 's'}
												</span>
											{/if}
										</InlineContainer>
										<InlineContainer containerClass="align-end" class="stack align-end">
											{#if isEditing}
												<button class="small" on:click={() => toggleSection('DeFi')} transition:scale>Hide</button>
											{:else}
												<button class="small" on:click={() => isGridLayout ? toggleGridLayoutIsChainExpanded(view.chainId) : toggleColumnLayoutIsSectionExpanded(`${view.chainId}-${'defi'}`)} transition:scale>▼</button>
											{/if}
										</InlineContainer>
										<!-- {#if isEditing}
											<label>
												<input type="checkbox" bind:checked={showDeFi}>
												<span>Show DeFi</span>
											</label>
										{/if} -->
									</label>
								<!-- {/if} -->
							</svelte:fragment>
						</DefiBalances>
					</section>{/if}
					<!-- </HeightContainer> -->

					<!-- NFT Balances -->
					{#if view.showNfts}<section class="nft-balances column-block">
					<!-- <HeightContainer containerClass="nft-balances" class="column" isOpen={showNFTs}> -->
						<EthereumNftBalances
							{network}
							{address}
							{nftProvider}
							{quoteCurrency}
							{sortBy} {showSmallValues} {showUnderlyingAssets} {showNFTMetadata} {showImagesOnly} {show3D}
							isOpen={Boolean(isGridLayout ? gridLayoutIsChainExpanded[view.chainId] : columnLayoutIsSectionExpanded[`${view.chainId}-${'nfts'}`]) && !isEditing}
							isScrollable={!isGridLayout}
							bind:summary={nftsSummaries[i]}
						>
							<svelte:fragment slot="header" let:summary let:status let:loadingMessage let:errorMessage>
								<!-- {#if balances?.length || isGridLayout} -->
									<!-- <hr> -->

									<label class="bar card sticky">
										<h4 class="row">
											<!-- <span class="card-background"><NetworkIcon {network} /></span> -->
											<NetworkIcon {network} />
											<span><InlineContainer isOpen={!isEditing} clip containerClass="align-end"><mark>{network.name}</mark>&nbsp;</InlineContainer>NFTs</span>
										</h4>
										<InlineContainer containerClass="align-end" class="stack align-end">
											{#if status === 'loading'}
												<Loading
													layout="icon"
													iconAnimation="hover"
													title={loadingMessage}
												>
													<img
														slot="icon"
														src={nftProviderIcons[nftProvider]}
														alt={nftProvider}
														width={20}
													/>
												</Loading>
												<!-- <span transition:scale>Loading...</span> -->
											{:else if status === 'error'}
												<div class="error-icon-container stack" transition:scale>
													<img
														title={errorMessage}
														src={nftProviderIcons[nftProvider]}
														alt={nftProvider}
														width={20}
													/>
													<span>⚠︎</span>
												</div>
											{:else if summary}
												<span class="summary" class:is-zero={!summary.nftsCount}>
													<strong><TweenedNumber value={summary.nftsCount} /></strong> NFT{summary.nftsCount === 1 ? '' : 's'}
													│
													<!-- across -->
													<strong><TweenedNumber value={summary.nftContractsCount} /></strong> collection{summary.nftContractsCount === 1 ? '' : 's'}
												</span>
											{/if}
										</InlineContainer>
										<InlineContainer containerClass="align-end" class="stack align-end">
											{#if isEditing}
												<button class="small" on:click={() => toggleSection('NFTs')} transition:scale>Hide</button>
											{:else}
												<button class="small" on:click={() => isGridLayout ? toggleGridLayoutIsChainExpanded(view.chainId) : toggleColumnLayoutIsSectionExpanded(`${view.chainId}-${'nfts'}`)} transition:scale>▼</button>
											{/if}
										</InlineContainer>
										<!-- {#if isEditing}
											<label>
												<input type="checkbox" bind:checked={showNFTs}>
												<span>Show NFTs</span>
											</label>
										{/if} -->
									</label>
								<!-- {/if} -->
							</svelte:fragment>
						</EthereumNftBalances>
					</section>{/if}
					<!-- </HeightContainer> -->
				</div>
			</section>
		{/each}
	</EnsResolutionLoader>
</article>