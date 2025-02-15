<script lang="ts">
	import type { ComponentProps } from 'svelte'
	import type { PortfolioAccount } from '$/state/portfolio-accounts'
	import type { Ethereum } from '$/data/networks/types'
	import type { NetworkProvider } from '$/data/networkProviders/types'
	import { AccountIdType } from '$/data/accountId'
	import { DefiProvider, defiProviders } from '$/data/defiProviders'
	import type { QuoteCurrency } from '$/data/currencies'
	import { ethereumMainnet, getNetworkColor, networkByChainId } from '$/data/networks'
	import { type TokenBalancesProvider, tokenBalancesProviders } from '$/data/tokenBalancesProviders'
	import { type NftProvider, nftProviders } from '$/data/nftProviders'
	import { NotificationsProvider, notificationsProviders } from '$/data/notificationsProviders'
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

	export let isEditing = false
	export let isDragging = false

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


	// UI state
	let isReordering = false


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
	import EthereumBalancesLoader from './EthereumBalancesLoader.svelte'
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


	// Actions
	import { dragToReorder } from '$/actions/dragToReorder'


	// Transitions/animations
	import { fade, scale } from 'svelte/transition'
	import { cardStyle } from '$/utils/card-background'
	import { flip } from 'svelte/animate'
	import { expoOut } from 'svelte/easing'
</script>


<style>
	.account {
		--padding-inner: 0.75em;

		transition-property: padding, background-color;

		header,
		:global(.header) {
			grid-column: 1 / -1;
		}

		header.sticky {
			transition-property: var(--draggable-transitionProperties), margin-inline;
		}

		&[data-is-dragging] {
			background-color: transparent;

			padding: 0 calc(var(--padding-outer) * 1.5);

			header.sticky {
				--sticky-header-outset: calc(var(--padding-outer) * 1.5);
			}
		}

		/* hr {
			display: none;
		} */

		.account-total-value {
			font-weight: bold;
			font-size: 1.1em;
		}

		.network {
			scroll-snap-align: start;
			scroll-margin-top: calc(var(--bleed-top) + var(--padding-outer) + 4.5rem);

			> :global(section) {
				--padding-inner: 0.5rem;
			}

			.grid-row {
				transition: 0.3s var(--ease-out-expo);
				transition-property: grid-template, gap, margin-inline-end;

				@media (min-width: 62rem) {
					--account-gridRow-feedColumnWidth: 1fr;
					--account-gridRow-gap: 1.5em;
					--account-gridRow-marginInlineEnd: 0;

					&[data-showing-feed="false"] {
						--account-gridRow-feedColumnWidth: 0fr;
						--account-gridRow-marginInlineEnd: calc(-1 * var(--account-gridRow-gap));
					}

					.account[data-is-editing] & {
						--account-gridRow-gap: 0.5rem;
					}

					display: grid;
					grid-template:
						"Tokens DeFi NFTs Feed" auto
						/ [Tokens] 1fr [DeFi] 1fr [NFTs] 1fr [Feed] var(--account-gridRow-feedColumnWidth);
					gap: var(--account-gridRow-gap);
					margin-inline-end: var(--account-gridRow-marginInlineEnd);

					> section {
						&.token-balances {
							grid-column-start: Tokens;
						}
						&.defi-balances {
							grid-column-start: DeFi;
						}
						&.nft-balances {
							grid-column-start: NFTs;
						}
						&.feed {
							grid-column-start: Feed;
						}
					}
				}

				> section {
					/* max-height: 50vh; */
					/* overflow-y: auto;
					position: sticky;
					top: 4.5rem; */

					:global(.sticky) {
						transition-property: margin-inline;
					}

					h4 {
						white-space: nowrap;
					}

					/* hr {
						display: none;
					} */
				}
			}
		}
	}

	.is-zero {
		opacity: 0.55;
	}

	.error-icon-container {
		align-items: center;

		> :first-child {
			/* opacity: 0.75; */
			filter: contrast(0.95) grayscale(0.75);
		}

		> :last-child {
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
	}

	label {
		:global([data-state="closed"]) > & {
			cursor: zoom-in;
		}
		:global([data-state="open"]) > & {
			cursor: zoom-out;
		}
	}

	.summary {
		font-size: 0.8em;
	}
</style>


<article
	id={account.id}
	class="account card column sticky-layout"
	class:grid-layout={isGridLayout}
	data-is-editing={isEditing ? '' : undefined}
	data-is-dragging={isDragging ? '' : undefined}
>
	<AccountIdResolver
		accountId={account.id}
		passiveResolveToName
		let:address
		loaderViewOptions={{
			clip: isDragging,
			isOpen: !isDragging,
		}}
	>
		<header
			slot="header"
			class="bar card sticky"
			draggable="true"
			data-drag-handle="portfolio-account"
			let:type
			let:address
			let:ensName
			let:lensName
		>
			<div class="row inline wrap">
				{#if lensName && type === AccountIdType.LensHandle}
					<h3><LensName {lensName} /></h3>
					{#if address}
						<small class="align-start" transition:scale><Address network={ethereumMainnet} {address} /></small>
					{/if}
				{:else if nickname}
					<h3>{nickname}</h3>
					{#if address}
						<small class="align-start" transition:scale><Address network={ethereumMainnet} {address} /></small>
					{/if}
				{:else if type === AccountIdType.EnsName}
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
						<span>
							<strong><TweenedNumber value={summary.filteredBalancesCount} /></strong> token{summary.filteredBalancesCount === 1 ? '' : 's'}
						</span>
					{/if}

					{#if summary.defiAppsCount}
						│
						<span>
							<strong><TweenedNumber value={summary.defiAppsCount} /></strong> app{summary.defiAppsCount === 1 ? '' : 's'}
						</span>
					{/if}

					{#if summary.nftsCount}
						│
						<span>
							<span>
								<strong><TweenedNumber value={summary.nftsCount} /></strong>{summary.hasMoreNfts ? '+' : ''} NFT{summary.nftsCount === 1 ? '' : 's'}
							</span>

							{#if summary.nftContractsCount}
								<span>
									from <strong><TweenedNumber value={summary.nftContractsCount} /></strong> collection{summary.nftContractsCount === 1 ? '' : 's'}
								</span>
							{/if}
						</span>
					{/if}
				</span>
			{/if}

			<InlineTransition
				key={$matchesGridLayoutBreakpoint && !isEditing && !isDragging}
				align="end"
			>
				{#if $matchesGridLayoutBreakpoint && !isEditing && !isDragging}
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

		<div
			class="column"
			use:dragToReorder={{
				handle: target => (
					target instanceof HTMLElement && target.dataset.dragHandle === 'portfolio-account-network'
				),
				items: account.views,
				setItems: _ => { account.views = _ },
				afterDragStart: e => {
					isReordering = true
				},
				onDragEnd: e => {
					// Wait for animate:flip to complete
					setTimeout(() => {
						isReordering = false
					}, 300)
				},
			}}
		>
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
					class="network column-block with-hidden-transitions"
					class:sticky-layout={isEditing}
					draggable={isEditing}
					data-drag-handle="portfolio-account-network"
					animate:flip={{ duration: 300, easing: expoOut }}
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

					<SizeContainer
						layout="block"
						isOpen={!isReordering}
						clip={isReordering}
					>
						<div
							class="network-content {isGridLayout ? 'column grid-row' : 'column-block'} sticky-layout"
							data-showing-feed={showFeed}
						>
							<!-- Token Balances -->
							{#if view.showBalances}<section class="token-balances column-block">
							<!-- <HeightContainer containerClass="token-balances" class="column" isOpen={showBalances}> -->
								<!-- {#if tokenBalancesProvider === TokenBalancesProvider.Covalent && Covalent.ChainIDs.includes(network.chainId)} -->

									<EthereumBalancesLoader
										{network}
										{address}
										{tokenBalancesProvider}
										{quoteCurrency}
										viewOptions={{
											isOpen: Boolean(isGridLayout ? gridLayoutIsChainExpanded[view.chainId] : columnLayoutIsSectionExpanded[`${view.chainId}-${'tokens'}`]) && !isEditing,
										}}
										let:balances
									>
										<!-- showIf={() => balances.length} -->
										<svelte:fragment slot="header"
											let:status
											let:loadingMessage
											let:errorMessage
										>
											{@const summary = balancesSummaries[i]}

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
																		src={tokenBalancesProviders[tokenBalancesProvider].icon}
																		alt={tokenBalancesProviders[tokenBalancesProvider].name}
																		height={20}
																	/>
																</Loading>
															</InlineTransition>
														{:else if status === 'error'}
															<div class="error-icon-container stack">
																<img
																	title={errorMessage}
																	src={tokenBalancesProviders[tokenBalancesProvider].icon}
																	alt={tokenBalancesProviders[tokenBalancesProvider].name}
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
																		<span>
																			<strong><TweenedNumber value={summary.filteredBalancesCount} /></strong> tokens
																		</span>
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
																			src={tokenBalancesProviders[tokenBalancesProvider].icon}
																			alt={tokenBalancesProviders[tokenBalancesProvider].name}
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

										<EthereumBalances
											{network}
											{address}
											{tokenBalancesProvider}
											{balances}
											{quoteCurrency}
											{tokenBalanceFormat} {sortBy} {showSmallValues} {showUnderlyingAssets}
											isScrollable={!isGridLayout} isHorizontal={!isGridLayout}
											bind:summary={balancesSummaries[i]}
										/>
									</EthereumBalancesLoader>
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
																	src={defiProviders[defiProvider].icon}
																	alt={defiProvider}
																	height={20}
																/>
															</Loading>
														</InlineTransition>
													{:else if status === 'error'}
														<div class="error-icon-container stack">
															<img
																title={errorMessage}
																src={defiProviders[defiProvider].icon}
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
																	<span>
																		<strong><TweenedNumber value={summary.defiAppsCount} /></strong> app{summary.defiAppsCount === 1 ? '' : 's'}
																	</span>
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
																		src={defiProviders[defiProvider].icon}
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
																	src={nftProviders[nftProvider].icon}
																	alt={nftProviders[nftProvider].name}
																	height={20}
																/>
															</Loading>
														</InlineTransition>
													{:else if status === 'error'}
														<div class="error-icon-container stack">
															<img
																title={errorMessage}
																src={nftProviders[nftProvider].icon}
																alt={nftProviders[nftProvider].name}
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
																	<span>
																		<strong><TweenedNumber value={summary.nftsCount} />{summary.hasMore ? '+' : ''}</strong> NFT{summary.nftsCount === 1 ? '' : 's'}
																	</span>
																	│
																	<!-- across -->
																	<span>
																		<strong><TweenedNumber value={summary.nftContractsCount} /></strong> collection{summary.nftContractsCount === 1 ? '' : 's'}
																	</span>
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
																		src={nftProviders[nftProvider].icon}
																		alt={nftProviders[nftProvider].name}
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
													src={notificationsProviders[notificationsProvider].icon}
													alt={notificationsProviders[notificationsProvider].name}
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
																src={notificationsProviders[notificationsProvider].icon}
																alt={notificationsProviders[notificationsProvider].name}
																height={20}
															/>
														</Loading>
													</InlineTransition>
												{:else if status === 'error'}
													<div class="error-icon-container stack">
														<img
															title={errorMessage}
															src={notificationsProviders[notificationsProvider].icon}
															alt={notificationsProviders[notificationsProvider].name}
															height={20}
														/>
														<span>⚠︎</span>
													</div>
												{:else if status === 'resolved' || status === 'reloading'}
													<span class="row">
														{#if summary}
															<span class="summary" class:is-zero={!summary.notificationsCount}>
																<span>
																	<strong><TweenedNumber value={summary.notificationsCount} /></strong> notification{summary.notificationsCount === 1 ? '' : 's'}
																</span>
																│
																<!-- across -->
																<span>
																	<strong><TweenedNumber value={summary.channelsCount} /></strong> channel{summary.channelsCount === 1 ? '' : 's'}
																</span>
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
																	src={notificationsProviders[notificationsProvider].icon}
																	alt={notificationsProviders[notificationsProvider].name}
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
					</SizeContainer>
				</section>
			{/each}
		</div>
	</AccountIdResolver>
</article>
