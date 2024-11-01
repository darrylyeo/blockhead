<script lang="ts">
	import type { ComponentProps } from 'svelte'
	import type { PortfolioAccount } from '$/state/portfolios.svelte'
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { AccountIdType } from '$/data/accountId'
	import { DefiProvider, defiProviderIcons } from '$/data/defiProviders'
	import type { QuoteCurrency } from '$/data/currencies'
	import { ethereumMainnet, getNetworkColor, networkByChainId } from '$/data/networks'
	import { type TokenBalancesProvider, tokenBalancesProviderIcons } from '$/data/tokenBalancesProvider'
	import { type NftProvider, nftProviderIcons } from '$/data/nftProviders'
	import { NotificationsProvider, notificationsProviderIcons } from '$/data/notificationsProvider'
	import { Covalent } from '$/api/covalent'
	import { getDefaultProvider } from 'ethers'


	// Balances view options

	export let account: PortfolioAccount

	export let networkProvider: NetworkProvider
	export let defiProvider: DefiProvider
	export let tokenBalancesProvider: TokenBalancesProvider
	export let nftProvider: NftProvider
	export let notificationsProvider: NotificationsProvider
	export let quoteCurrency: QuoteCurrency

	export let layout: 'column' | 'grid' = 'grid'
	// export let layout: 'column' | 'grid' = 'grid'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending' = 'value-descending'
	export let showSmallValues = false
	export let showApps = false
	export let showUnderlyingAssets = false
	export let showDefiPositionMetadata = false
	export let collectionsSortBy: 'symbol-ascending' | 'floor-price-descending' | 'floor-price-ascending' | 'value-descending' | 'value-ascending' = 'floor-price-descending'
	export let showNftMetadata = false
	export let showImagesOnly = false
	export let show3D = false
	export let showFloorPrices = false
	export let showSmallNftFloorPrices = false
	export let showFeed = false
	export let feedLayout: 'byChannel' | 'chronological' = 'byChannel'

	export let isEditing: boolean

	export let nickname: string


	// Computed Values
	// export let portfolioData: Record<Ethereum.ChainId, {
	// 	balances: ,
	// 	quoteTotal: number,
	// }>
	let balancesSummaries: ComponentProps<EthereumBalances>['summary'][] = []
	let defiAppsSummaries: ComponentProps<DefiPositionsLoader>['summary'][] = []
	let nftsSummaries: ComponentProps<EthereumNftBalancesLoader>['summary'][] = []

	export let summary: {
		quoteTotal: number,
		quoteTotalCurrency: QuoteCurrency,
		balancesCount: number,
		filteredBalancesCount: number,
		defiAppsCount: number,
		nftContractsCount: number,
		nftsCount: number,
		hasMoreNfts: boolean,
	} | undefined

	$: summary = {
		quoteTotal:
			[
				...balancesSummaries,
				...defiAppsSummaries,
				...nftsSummaries,
			]
				.map(summary => summary?.quoteTotal)
				.filter(isTruthy)
				.reduce((sum, item) => sum + item, 0),

		quoteTotalCurrency: quoteCurrency,

		balancesCount:
			balancesSummaries
				.map(summary => summary?.balancesCount)
				.filter(isTruthy)
				.reduce((sum, item) => sum + item, 0),
		
		filteredBalancesCount:
			balancesSummaries
				.map(summary => summary?.filteredBalancesCount)
				.filter(isTruthy)
				.reduce((sum, item) => sum + item, 0),

		defiAppsCount:
			defiAppsSummaries
				.map(summary => summary?.defiAppsCount)
				.filter(isTruthy)
				.reduce((sum, item) => sum + item, 0),

		nftContractsCount:
			nftsSummaries
				.map(summary => summary?.nftContractsCount)
				.filter(isTruthy)
				.reduce((sum, item) => sum + item, 0),

		nftsCount:
			nftsSummaries
				.map(summary => summary?.nftsCount)
				.filter(isTruthy)
				.reduce((sum, item) => sum + item, 0),

		hasMoreNfts:
			nftsSummaries
				.some(summary => summary?.hasMore),
	}


	// Functions
	import { isTruthy } from '$/utils/isTruthy'


	import { triggerEvent } from '$/events/triggerEvent'


	import { matchesMediaQuery } from '$/utils/matchesMediaQuery'

	const gridLayoutBreakpoint = '(min-width: 62rem)'
	const matchesGridLayoutBreakpoint = matchesMediaQuery(gridLayoutBreakpoint)

	$: isGridLayout = (layout === 'grid' || isEditing) && $matchesGridLayoutBreakpoint


	const toggleFeed = (showFeed: boolean) => {
		account.showFeed = showFeed

		account = account

		triggerEvent('PortfolioAccount/ToggleFeed', {
			isShowing: account.showFeed,
		})
	}

	let gridLayoutIsChainExpanded: Record<Ethereum.ChainId, boolean> = {}

	const toggleGridLayoutIsChainExpanded = (chainID: Ethereum.ChainId) =>
		gridLayoutIsChainExpanded = {...gridLayoutIsChainExpanded, [chainID]: !gridLayoutIsChainExpanded[chainID]}


	let columnLayoutIsSectionExpanded: Record<`${Ethereum.ChainId}-${'balances' | 'defi' | 'nfts'}`, boolean> = {}

	const toggleColumnLayoutIsSectionExpanded = (key: string) =>
		columnLayoutIsSectionExpanded = {...columnLayoutIsSectionExpanded, [key]: !columnLayoutIsSectionExpanded[key]}


	// Components
	import AccountIdResolver from './AccountIdResolver.svelte'
	import Address from './Address.svelte'
	import Balance from './Balance.svelte'
	import DefiPositions from './DefiPositions.svelte'
	import DefiPositionsLoader from './DefiPositionsLoader.svelte'
	import EnsName from './EnsName.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import EthereumNftBalances from './EthereumNftBalances.svelte'
	import EthereumNftBalancesLoader from './EthereumNftBalancesLoader.svelte'
	import HeightContainer from './HeightContainer.svelte'
	import InlineContainer from './InlineContainer.svelte'
	import InlineTransition from './InlineTransition.svelte'
	import LensName from './LensName.svelte'
	import Loading from './Loading.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
	import Notifications from './Notifications.svelte'
	import SizeContainer from './SizeContainer.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TweenedNumber from './TweenedNumber.svelte'


	import { fade, scale } from 'svelte/transition'
	import { cardStyle } from '$/utils/card-background'
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
		grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr));;
	} */

	h4 {
		white-space: nowrap;
	}
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

	.grid-row {
		transition: 0.3s grid-template var(--ease-out-expo);
	}
	/* .network.grid-row {
		display: grid;
		/* grid-template:
			auto
			/ 1fr 1fr 1fr; * /
		/* grid-template-columns: repeat(auto-fit, minmax(min(15rem, 100%), 1fr)); * /
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
			--account-gridRow-feedColumnWidth: 1fr;
			--account-gridRow-marginRight: 1fr;

			display: grid;
			grid-template:
				"Tokens DeFi NFTs Feed" auto
				/ [Tokens] 1fr [DeFi] 1fr [NFTs] 1fr [Feed] var(--account-gridRow-feedColumnWidth);
			gap: 1.5em;
		}
		.grid-row[data-showing-feed="false"] {
			--account-gridRow-feedColumnWidth: 0fr;
			margin-right: -1.5em;
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
		.grid-row > :global(.feed) {
			grid-column-start: Feed;
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
		align-items: center;
	}
	.error-icon-container > :first-child {
		/* opacity: 0.75; */
		filter: contrast(0.95) grayscale(0.75);
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

	:global([data-state="closed"]) > label {
		cursor: zoom-in;
	}
	:global([data-state="open"]) > label {
		cursor: zoom-out;
	}

	.summary {
		font-size: 0.8em;
	}
</style>


<article
	id={account.id}
	class="account card column sticky-layout"
	class:is-editing={isEditing}
	class:grid-layout={isGridLayout}
>
	<AccountIdResolver
		accountId={account.id}
		passiveResolveToName
		let:address
		loaderViewOptions={{
			clip: false,
		}}
	>
		<header
			slot="header"
			class="bar card sticky"
			let:type
			let:address
			let:ensName
			let:lensName
		>
			<div class="row inline wrap">
				{#if lensName && type === AccountIdType.Lens}
					<h3><LensName {lensName} /></h3>
					{#if address}
						<small class="align-start" transition:scale><Address network={ethereumMainnet} {address} /></small>
					{/if}
				{:else if nickname}
					<h3>{nickname}</h3>
					{#if address}
						<small class="align-start" transition:scale><Address network={ethereumMainnet} {address} /></small>
					{/if}
				{:else if type === AccountIdType.ENS}
					<h3><EnsName {ensName} showAvatar /></h3>
					{#if address}
						<small class="align-start" transition:scale><Address network={ethereumMainnet} {address} /></small>
					{/if}
				{:else if type === AccountIdType.Address}
					<h3><Address network={ethereumMainnet} {address} /></h3>
					{#if ensName}
						<small class="align-start" transition:scale><EnsName {ensName} showAvatar /></small>
					{/if}
				{/if}
			</div>

			{#if summary}
				<span class="summary">
					<span class="account-total-value">
						<TokenBalance
							format="fiat"
							token={{
								symbol: quoteCurrency,
							}}
							balance={summary.quoteTotal}
						/>
					</span>

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
						<strong><TweenedNumber value={summary.nftsCount} /></strong>{summary.hasMoreNfts ? '+' : ''} NFT{summary.nftsCount === 1 ? '' : 's'}

						{#if summary.nftContractsCount}
							from <strong><TweenedNumber value={summary.nftContractsCount} /></strong> collection{summary.nftContractsCount === 1 ? '' : 's'}
						{/if}
					{/if}
				</span>
			{/if}

			<InlineTransition
				key={$matchesGridLayoutBreakpoint && !isEditing}
				align="end"
			>
				{#if $matchesGridLayoutBreakpoint && !isEditing}
					<div class="row">
						<!--<button class="small" on:click={() => layout = isGridLayout ? 'column' : 'grid'} transition:scale>{isGridLayout ? '⊟' : '⊞'}</button>--><!-- ▤ -->
						<select bind:value={layout}>
							<option value="column">Column</option>
							<option value="grid">Grid</option>
						</select>
					</div>
				{:else}
					<slot />
				{/if}
			</InlineTransition>
		</header>

		<!-- <hr> -->

		{#each account.views ?? [] as view, i (view.chainId)}
			{@const network = networkByChainId.get(view.chainId)}

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
				else if(sectionType === 'Feed')
					view.showFeed = !view.showFeed

				// Value isn't yet mutated, invert
				triggerEvent('PortfolioAccount/ToggleSection', {
					chainId: view.chainId,
					sectionType,
					sectionIsShowing: {
						'Balances': !view.showBalances,
						'DeFi': !view.showDefi,
						'NFTs': !view.showNfts,
						'Feed': !view.showFeed,
					}[sectionType],
				})
			}}

			<!-- {#if isGridLayout}<hr>{/if} -->

			<section
				class="network"
				class:column={layout === 'column'}
				class:sticky-layout={isEditing}
				style="{getNetworkColor(network) ? `--primary-color: ${getNetworkColor(network)};` : ''}"
			>
				<SizeContainer
					layout="block"
					isOpen={isEditing}
					renderOnlyWhenOpen={false}
					clip
					containerProps={{
						class: 'header sticky',
					}}
				>
					<header class="bar card" style={cardStyle([getNetworkColor(network)])}>
						<h3 class="row">
							<NetworkIcon {network} />
							<Address {network} {address}>{network.name}</Address>
						</h3>
						<span class="card-annotation">#{network.chainId}</span>
						<button class="small" on:click={deleteView}>Hide Network</button>
						<span class="card-background"><NetworkIcon {network} /></span>
					</header>
				</SizeContainer>

				<div
					class="network-content {isGridLayout ? 'column grid-row' : 'column-block'} sticky-layout"
					data-showing-feed={showFeed}
				>
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

												<Address {network} {address}>
													<InlineContainer
														isOpen={!isEditing && !(showFeed && isGridLayout)}
														renderOnlyWhenOpen={false}
														align="end"
														clip
													><mark>{network.name}</mark>&nbsp;</InlineContainer>Balances
												</Address>
											</h4>

											<InlineTransition
												align="end"
												key={
													status === 'loading' ? 1 :
													status === 'error' ? 2 :
													status === 'resolved' || status === 'reloading' ? 3 :
													0
												}
											>
												{#if status === 'loading'}
													<InlineTransition
														key={defiProvider}
														align="center"
													>
														<Loading
															layout="icon"
															iconAnimation="hover"
															title={loadingMessage}
														>
															<img
																slot="icon"
																src={tokenBalancesProviderIcons[tokenBalancesProvider]}
																alt={tokenBalancesProvider}
																height={20}
															/>
														</Loading>
													</InlineTransition>
												{:else if status === 'error'}
													<div class="error-icon-container stack">
														<img
															title={errorMessage}
															src={tokenBalancesProviderIcons[tokenBalancesProvider]}
															alt={tokenBalancesProvider}
															height={20}
														/>
														<span>⚠︎</span>
													</div>
												{:else if status === 'resolved' || status === 'reloading'}
													<span class="row">
														{#if summary}
															<span
																class="summary align-end"
																class:is-zero={!summary.filteredBalancesCount}
															>
																<TokenBalance
																	format="fiat"
																	token={{
																		symbol: summary.quoteCurrency,
																	}}
																	balance={summary.quoteTotal}
																/>
																│
																<strong><TweenedNumber value={summary.filteredBalancesCount} /></strong> tokens
															</span>
														{/if}

														<InlineContainer
															align="end"
															isOpen={status === 'reloading'}
														>
															<Loading
																layout="icon"
																iconAnimation="hover"
																title={loadingMessage}
															>
																<img
																	slot="icon"
																	src={tokenBalancesProviderIcons[tokenBalancesProvider]}
																	alt={tokenBalancesProvider}
																	height={20}
																/>
															</Loading>
														</InlineContainer>
													</span>
												{/if}
											</InlineTransition>
		
											<InlineTransition
												key={isEditing}
												align="end"
											>
												{#if isEditing}
													<button class="small" on:click={() => toggleSection('Balances')}>Hide</button>
												{:else}
													<button class="small" on:click={() => isGridLayout ? toggleGridLayoutIsChainExpanded(view.chainId) : toggleColumnLayoutIsSectionExpanded(`${view.chainId}-${'tokens'}`)}>▼</button>
												{/if}
											</InlineTransition>
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
									{networkProvider}
									{address}
									{symbol}
								/>
							{/each}
						{/if} -->
					</section>{/if}
					<!-- </HeightContainer> -->

					<!-- DeFi Positions -->
					{#if view.showDefi}<section class="defi-balances column-block">
					<!-- <HeightContainer containerClass="defi-balances" class="column" isOpen={showDeFi}> -->
						<DefiPositionsLoader
							loaderViewOptions={{
								isOpen: Boolean(isGridLayout ? gridLayoutIsChainExpanded[view.chainId] : columnLayoutIsSectionExpanded[`${view.chainId}-${'defi'}`]) && !isEditing,
							}}
							{network}
							{networkProvider}
							{address}
							{defiProvider}
							{quoteCurrency}
							bind:summary={defiAppsSummaries[i]}
							let:appsWithPositions
						>
							<svelte:fragment slot="header"
								let:status
								let:summary
								let:loadingMessage
								let:errorMessage
							>
								<!-- {#if (status === 'resolved' && summary?.defiAppsCount) || status === 'error' || isGridLayout} -->
									<!-- <hr> -->

									<label class="bar card sticky">
										<!-- <span class="card-background"><NetworkIcon {network} /></span> -->
										<h4 class="row">
											<NetworkIcon {network} />

											<span>
												<InlineContainer
													isOpen={!isEditing && !(showFeed && isGridLayout)}
													renderOnlyWhenOpen={false}
													align="end"
													clip
												><mark>{network.name}</mark>&nbsp;</InlineContainer>DeFi
											</span>
										</h4>

										<InlineTransition
											align="end"
											key={
												status === 'loading' ? 1 :
												status === 'error' ? 2 :
												status === 'resolved' || status === 'reloading' ? 3 :
												0
											}
										>
											{#if status === 'loading'}
												<InlineTransition
													key={defiProvider}
													align="center"
												>
													<Loading
														layout="icon"
														iconAnimation="hover"
														title={loadingMessage}
													>
														<img
															slot="icon"
															src={defiProviderIcons[defiProvider]}
															alt={defiProvider}
															height={20}
														/>
													</Loading>
												</InlineTransition>
											{:else if status === 'error'}
												<div class="error-icon-container stack">
													<img
														title={errorMessage}
														src={defiProviderIcons[defiProvider]}
														alt={defiProvider}
														height={20}
													/>
													<span>⚠︎</span>
												</div>
											{:else if status === 'resolved' || status === 'reloading'}
												<span class="row">
													{#if summary}
														<span class="summary" class:is-zero={!summary.defiAppsCount}>
															<TokenBalance
																format="fiat"
																token={{
																	symbol: summary.quoteTotalCurrency || quoteCurrency,
																}}
																balance={summary.quoteTotal}
															/>
															│
															<strong><TweenedNumber value={summary.defiAppsCount} /></strong> app{summary.defiAppsCount === 1 ? '' : 's'}
														</span>
													{/if}

													<InlineContainer
														align="end"
														isOpen={status === 'reloading'}
													>
														<Loading
															layout="icon"
															iconAnimation="hover"
															title={loadingMessage}
														>
															<img
																slot="icon"
																src={defiProviderIcons[defiProvider]}
																alt={defiProvider}
																height={20}
															/>
														</Loading>
													</InlineContainer>
												</span>
											{/if}
										</InlineTransition>

										<InlineTransition
											key={isEditing}
											align="end"
										>
											{#if isEditing}
												<button class="small" on:click={() => toggleSection('DeFi')}>Hide</button>
											{:else}
												<button class="small" on:click={() => isGridLayout ? toggleGridLayoutIsChainExpanded(view.chainId) : toggleColumnLayoutIsSectionExpanded(`${view.chainId}-${'defi'}`)}>▼</button>
											{/if}
										</InlineTransition>

										<!-- {#if isEditing}
											<label>
												<input type="checkbox" bind:checked={showDeFi}>
												<span>Show DeFi</span>
											</label>
										{/if} -->
									</label>
								<!-- {/if} -->
							</svelte:fragment>

							{#if appsWithPositions}
								<DefiPositions
									{appsWithPositions}
									{network}
									{address}
									{quoteCurrency}
									{tokenBalanceFormat}
									{showApps}
									{showUnderlyingAssets}
									showMetadata={showDefiPositionMetadata}
									isScrollable={!isGridLayout}
								/>
							{/if}
						</DefiPositionsLoader>
					</section>{/if}
					<!-- </HeightContainer> -->

					<!-- NFT Balances -->
					{#if view.showNfts}<section class="nft-balances column-block">
					<!-- <HeightContainer containerClass="nft-balances" class="column" isOpen={showNFTs}> -->
						<EthereumNftBalancesLoader
							{network}
							{address}
							{nftProvider}
							{quoteCurrency}
							loaderViewOptions={{
								isOpen: Boolean(isGridLayout ? gridLayoutIsChainExpanded[view.chainId] : columnLayoutIsSectionExpanded[`${view.chainId}-${'nfts'}`]) && !isEditing,
							}}
							bind:summary={nftsSummaries[i]}
							let:nftContractsWithBalances
							let:pagination
						>
							<svelte:fragment slot="header"
								let:summary
								let:status
								let:loadingMessage let:errorMessage
							>
								<!-- {#if balances?.length || isGridLayout} -->
									<!-- <hr> -->

									<label class="bar card sticky">
										<h4 class="row">
											<!-- <span class="card-background"><NetworkIcon {network} /></span> -->
											<NetworkIcon {network} />

											<span>
												<InlineContainer
													isOpen={!isEditing && !(showFeed && isGridLayout)}
													renderOnlyWhenOpen={false}
													align="end"
													clip
												><mark>{network.name}</mark>&nbsp;</InlineContainer>NFTs
											</span>
										</h4>

										<InlineTransition
											align="end"
											key={
												status === 'loading' ? 1 :
												status === 'error' ? 2 :
												status === 'resolved' || status === 'reloading' ? 3 :
												0
											}
										>
											{#if status === 'loading'}
												<InlineTransition
													key={nftProvider}
													align="center"
												>
													<Loading
														layout="icon"
														iconAnimation="hover"
														title={loadingMessage}
													>
														<img
															slot="icon"
															src={nftProviderIcons[nftProvider]}
															alt={nftProvider}
															height={20}
														/>
													</Loading>
												</InlineTransition>
											{:else if status === 'error'}
												<div class="error-icon-container stack">
													<img
														title={errorMessage}
														src={nftProviderIcons[nftProvider]}
														alt={nftProvider}
														height={20}
													/>
													<span>⚠︎</span>
												</div>
											{:else if status === 'resolved' || status === 'reloading'}
												<span class="row">
													{#if summary}
														<span class="summary" class:is-zero={!summary.nftsCount}>
															{#if summary.quoteTotal}
																<TokenBalance
																	format="fiat"
																	token={{
																		symbol: summary.quoteCurrency || quoteCurrency,
																	}}
																	balance={summary.quoteTotal}
																/>
																│
															{/if}
															<strong><TweenedNumber value={summary.nftsCount} />{summary.hasMore ? '+' : ''}</strong> NFT{summary.nftsCount === 1 ? '' : 's'}
															│
															<!-- across -->
															<strong><TweenedNumber value={summary.nftContractsCount} /></strong> collection{summary.nftContractsCount === 1 ? '' : 's'}
														</span>
													{/if}

													<InlineContainer
														align="end"
														isOpen={status === 'reloading'}
													>
														<Loading
															layout="icon"
															iconAnimation="hover"
															title={loadingMessage}
														>
															<img
																slot="icon"
																src={nftProviderIcons[nftProvider]}
																alt={nftProvider}
																height={20}
															/>
														</Loading>
													</InlineContainer>
												</span>
											{/if}
										</InlineTransition>
	
										<InlineTransition
											key={isEditing}
											align="end"
										>
											{#if isEditing}
												<button class="small" on:click={() => toggleSection('NFTs')}>Hide</button>
											{:else}
												<button class="small" on:click={() => isGridLayout ? toggleGridLayoutIsChainExpanded(view.chainId) : toggleColumnLayoutIsSectionExpanded(`${view.chainId}-${'nfts'}`)}>▼</button>
											{/if}
										</InlineTransition>
										<!-- {#if isEditing}
											<label>
												<input type="checkbox" bind:checked={showNFTs}>
												<span>Show NFTs</span>
											</label>
										{/if} -->
									</label>
								<!-- {/if} -->
							</svelte:fragment>

							{#if nftContractsWithBalances}
								<EthereumNftBalances
									{nftContractsWithBalances}
									{network}
									{address}
									{nftProvider}
									{quoteCurrency}
									{collectionsSortBy} {showUnderlyingAssets} {showNftMetadata} layout={showImagesOnly ? 'images' : 'collections'} {show3D} {showFloorPrices} {showSmallNftFloorPrices} isScrollable={!isGridLayout}
									{pagination}
								/>
							{/if}
						</EthereumNftBalancesLoader>
					</section>{/if}

					{#if showFeed}<section class="feed" transition:fade={{duration: 300}}>
						<Notifications
							loaderViewOptions={{
								isOpen: Boolean(isGridLayout ? gridLayoutIsChainExpanded[view.chainId] : columnLayoutIsSectionExpanded[`${view.chainId}-${'feed'}`]) && !isEditing,
								showIf: notifications => notifications,
							}}
							{network}
							{address}
							isScrollable={!isGridLayout}
							{feedLayout}
						>
							<svelte:fragment slot="header" let:summary let:status let:loadingMessage let:errorMessage>
								<label class="bar card sticky">
									<h4 class="row">
										<img
											src={notificationsProviderIcons[notificationsProvider]}
											alt={notificationsProvider}
											width={17.5}
										/>
										Feed
									</h4>

									<InlineTransition
										align="end"
										key={
											status === 'loading' ? 1 :
											status === 'error' ? 2 :
											status === 'resolved' || status === 'reloading' ? 3 :
											0
										}
									>
										{#if status === 'loading'}
											<InlineTransition
												key={notificationsProvider}
												align="center"
											>
												<Loading
													layout="icon"
													iconAnimation="hover"
													title={loadingMessage}
												>
													<img
														slot="icon"
														src={notificationsProviderIcons[notificationsProvider]}
														alt={notificationsProvider}
														height={20}
													/>
												</Loading>
											</InlineTransition>
										{:else if status === 'error'}
											<div class="error-icon-container stack">
												<img
													title={errorMessage}
													src={notificationsProviderIcons[notificationsProvider]}
													alt={notificationsProvider}
													height={20}
												/>
												<span>⚠︎</span>
											</div>
										{:else if status === 'resolved' || status === 'reloading'}
											<span class="row">
												{#if summary}
													<span class="summary" class:is-zero={!summary.notificationsCount}>
														<strong><TweenedNumber value={summary.notificationsCount} /></strong> notification{summary.notificationsCount === 1 ? '' : 's'}
														│
														<!-- across -->
														<strong><TweenedNumber value={summary.channelsCount} /></strong> channel{summary.channelsCount === 1 ? '' : 's'}
													</span>
												{/if}

												<InlineContainer
													align="end"
													isOpen={status === 'reloading'}
												>
													<Loading
														layout="icon"
														iconAnimation="hover"
														title={loadingMessage}
													>
														<img
															slot="icon"
															src={notificationsProviderIcons[notificationsProvider]}
															alt={notificationsProvider}
															height={20}
														/>
													</Loading>
												</InlineContainer>
											</span>
										{/if}
									</InlineTransition>

									<InlineTransition
										key={isEditing}
										align="end"
									>
										{#if isEditing}
											<button class="small" on:click={() => toggleSection('Feed')}>Hide</button>
										{:else}
											<button class="small" on:click={() => isGridLayout ? toggleGridLayoutIsChainExpanded(view.chainId) : toggleColumnLayoutIsSectionExpanded(`${view.chainId}-${'feed'}`)}>▼</button>
										{/if}
									</InlineTransition>
								</label>
							</svelte:fragment>
						</Notifications>
					</section>{/if}
					<!-- </HeightContainer> -->
				</div>
			</section>
		{/each}
	</AccountIdResolver>
</article>
