<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import { DefiProvider } from '../data/defiProviders'
	import type { QuoteCurrency } from '../data/currencies'
	import type { Web3AppConfig } from '../data/web3Apps'
	import { networksByChainID } from '../data/networks'
	import { preferences } from '../state/preferences'
	import type { AccountConnection } from '../state/account'

	type Layout = 'horizontal' | 'horizontal-alternate' | 'vertical'


	// Inputs
	export let web3AppConfig: Web3AppConfig
	export let network: Ethereum.Network | undefined
	export let currentView: 'Dashboard' | 'Explorer' | 'Account'
	export let address: Ethereum.Address | undefined
	export let accountConnection: AccountConnection | undefined
	export let networkProvider: NetworkProvider
	export let defiProvider: DefiProvider = DefiProvider.Zapper
	export let quoteCurrency: QuoteCurrency

	// (View options)
	export let isOpen: boolean
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showUnderlyingAssets = true
	export let showMetadata = true
	export let showActions = false
	export let layout: Layout | 'auto' = 'auto'

	// (Computed)
	let computedLayout: Layout
	$: computedLayout = layout === 'auto'
		? showUnderlyingAssets ? 'vertical' : 'horizontal' // 'horizontal-alternate'
		: layout


	// Functions
	import type { ZapperAppBalance } from '../api/zapper'


	// Internal state
	let selectedEmbed: NonNullable<Web3AppConfig['views'][number]['embeds']>[number] | undefined

	let zapperDefiProtocolBalances: Map<string, ZapperAppBalance> | undefined // StoresValues<Awaited<ReturnType<typeof getDefiBalancesForApps>>>['data']

	let zapperFiatRates: Record<QuoteCurrency, number> | undefined
	let zapperQuoteCurrency: QuoteCurrency
	let zapperFiatRate: number

	// (Computed)
	// $: if(defiProvider === DefiProvider.Zapper && quoteCurrency !== 'USD')
	// 	getFiatRates().then(_ => zapperFiatRates = _)
	$: zapperQuoteCurrency = zapperFiatRates ? quoteCurrency : 'USD' 
	$: zapperFiatRate = zapperFiatRates?.[quoteCurrency] ?? 1


	// Outputs
	export let quoteTotal: number
	export let quoteTotalCurrency: QuoteCurrency

	// (Computed)
	$: quoteTotalCurrency = zapperQuoteCurrency

 	$: quoteTotal = zapperFiatRate * (
		[...zapperDefiProtocolBalances?.values() ?? []]
			.map(balance => Number(balance.meta?.find(item => item.label === 'Total')?.value ?? 0))
			.reduce((sum, value) => sum + value, 0)
	)


	// Components
	import Address from './Address.svelte'
	import Collapsible from './Collapsible.svelte'
	import HeightContainer from './HeightContainer.svelte'
	import DefiPositions from './DefiPositions.svelte'
	import DefiPositionsLoader from './DefiPositionsLoader.svelte'
	import EthereumBalancesLoader from './EthereumBalancesLoader.svelte'
	import EthereumAccountOrContract from './EthereumAccountOrContract.svelte';
	import EthereumContractExplorer from './EthereumContractExplorer.svelte'
	import NetworkProviderLoader from './NetworkProviderLoader.svelte'
	import CurrentPrice from './CurrentPrice.svelte'
	import HistoricalPriceChart from './HistoricalPriceChart.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
	import GraphiqlExplorer from './GraphiqlExplorer.svelte'
	import TokenName from './TokenName.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'
	import TokenBalanceFormatSelect from './TokenBalanceFormatSelect.svelte'


	// Transitions/animations
	import { cardStyle } from '../utils/card-background'
	import { flip } from 'svelte/animate'
	import { scale } from 'svelte/transition'
	import { scaleFont } from '../transitions/scale-font'
</script>


<style>
	.defi-balances.scrollable-list {
		contain: layout;
	}

	.underlying {
		font-size: 0.8em;
		text-align: left;

		display: grid;
		justify-items: start;
		--padding-inner: 0.1em;
		gap: var(--padding-inner);
		grid-template-columns: repeat(auto-fit, minmax(min(7rem, 100%), 1fr));
	}

	.column {
		display: grid;
    	gap: var(--padding-inner);
	}

	.card {
		position: relative;
		overflow: hidden;
	}


	.defi-app-views {
		display: grid;
		align-items: stretch;
		grid-template-columns: repeat(auto-fit, minmax(min(25rem, 100%), 1fr));
		grid-auto-flow: dense;

		--options-size: 0.8;
	}
	.defi-app-view:not(.is-single), .defi-app-view.full {
		grid-column: 1 / -1;
	}
	.defi-app-view.scrollable-list {
		--resizeVertical-defaultHeight: 39.5rem;
	}

	.defi-app-view-items {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(25rem, 100%), 1fr));
		grid-template-rows: masonry;
		align-items: stretch;

		--padding-inner: 0.75em;
		gap: var(--padding-inner);
	}
	.defi-app-view-items.scrollable-list {
		--resizeVertical-defaultHeight: 31rem;
	}
	.defi-app-view-items:not(:has(> *)) {
		display: none;
	}

	.defi-app-view-items > * {
		--padding-inner: 0.75em;
	}
	.defi-app-view-items > .bar {
		grid-column: 1 / -1;
	}

	.options {
		position: sticky;
		bottom: 0;

		z-index: 1;

		font-size: 0.8em;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
	}

	.defi-app-view {
		--echart-height: 15rem;
	}


	/* Svelte bug */
	.erc20-token :global(.token-balance-with-conversion:not(:last-child)) {
		display: none;
	}

	.defi-app-views :global(.graphiql-explorer) {
		height: 35rem;
		max-height: 80vh;
	}

	iframe {
		width: 100%;
		justify-self: center;
		border-radius: 0.5em;
	}
	iframe.embed {
		height: 80vh;
	}
</style>


{#if web3AppConfig}
	{@const views = network ? web3AppConfig.views.filter(view => view.chainId === network.chainId) : web3AppConfig.views}

	<div class="column defi-app-views">
		{#each views as {
			name, slug, links, chainId, colors,
			components, erc20Tokens, nfts, contracts, providers, embeds
		} (`${name}/${chainId}/${slug}`)}
			{@const totalViewItems = (erc20Tokens?.length ?? 0) + (nfts?.length ?? 0) + (contracts?.length ?? 0) + (providers && Object.entries(providers).length)}
			{@const _links = links ?? web3AppConfig?.links}

			<div
				class="card defi-app-view"
				class:full={embeds?.length}
				style={cardStyle(colors || web3AppConfig.colors)}
				transition:scale={{ duration: 300 }}
				animate:flip={{ duration: 300 }}
			>
			<!-- class:is-single={totalViewItems <= 1} -->
				<NetworkProviderLoader
					layout="collapsible"
					collapsibleType="label"
					isOpen={views.length === 1}

					network={networksByChainID[chainId]}
					{networkProvider}
					let:network
					let:publicClient
				>
					<svelte:fragment slot="header"
						let:network
						let:isOpen
						let:toggle
					>
						<div class="bar wrap">
							<span class="row-inline wrap">
								<h3 id={slug} class="row-inline">
									<NetworkIcon {network} />
									›
									{#if slug}
										<a href="#{slug}">{name || web3AppConfig.name}</a>
									{:else}
										{name || web3AppConfig.name}
									{/if}
								</h3>

								{#if _links?.length}
									<span>
										({#each _links as href, i}<a {href} target="_blank">{new URL(href)?.host.replace(/^www[.]/, '')}</a>{#if i < _links.length - 1}{', '}{/if}{/each})
									</span>
								{/if}
							</span>

							{#if embeds?.length}
								<select bind:value={selectedEmbed}>
									{#each embeds as embed}
										<option value={embed}>{embed.name}</option>
									{/each}
								</select>
							{:else}
								<div class="card-annotation">{network.name} App</div>
							{/if}

							{#if toggle}
								<button
									class="small"
									data-after={isOpen ? '▲' : '▼'}
									on:click={toggle}
								/>
							{/if}
						</div>
					</svelte:fragment>

					<hr>

					{#if components?.length}
						<div class="column">
							{#each components as Component}
								<svelte:component this={Component}
									{network}
									{address}
									{accountConnection}
								/>
							{/each}
						</div>
					{/if}

					<div
						class="column defi-app-view-items"
					>
					<!-- class:scrollable-list={currentView === 'Dashboard' && totalViewItems > 3} -->
						<!-- No address specified - general information -->
						{#if currentView === 'Dashboard'}
							{#if contracts?.length}
								<Collapsible
									type="label"
									containerClass="card"
									class="column"
									isOpen={false}
								>
									<h4 slot="title">Contracts</h4>

									<span slot="header-right" class="card-annotation">{contracts.length} Contracts</span>

									{#each contracts as {
										name,
										address: contractAddress
									}}
										<EthereumAccountOrContract
											{network}
											{networkProvider}
											accountId={contractAddress}
											headingLevel={4}
											isOpen={false}
											resolveAccountNames={false}
										>
											<svelte:fragment slot="title" let:network let:address>
												<h4>
													{#if address}
														{#if name}
															<Address {network} {address}>{name}</Address>
														{:else}
															<Address {network} {address} />
														{/if}
													{:else}
														Contract
													{/if}
												</h4>
											</svelte:fragment>

											<svelte:fragment slot="contract-title" let:network let:address>
												<h5>
													<Address {network} {address}>Contract Code</Address>
												</h5>
											</svelte:fragment>
										</EthereumAccountOrContract>
									{/each}
								</Collapsible>
							{/if}


						<!-- Address specified - account balances -->
						{:else if currentView === 'Account' && (
							(providers?.zapper && defiProvider === DefiProvider.Zapper)
							|| (providers?.zerionDefiSDK && defiProvider === DefiProvider.ZerionDefiSdk)
						)}
							<DefiPositionsLoader
								apps={[web3AppConfig]}
								{network}
								{networkProvider}
								{address}
								{defiProvider}
								{quoteCurrency}
								isOpen
								let:appsWithPositions
							>
								<svelte:fragment slot="header"
									let:status
									let:summary
									let:loadingMessage
									let:errorMessage
								>
									<header class="bar sticky">
										<h4 class="row">Positions</h4>

										{#if (status === 'resolved' || status === 'reloading') && summary}
											<span class="summary row" class:is-zero={!summary.defiAppsCount}>
												<TokenBalance
													symbol={summary.quoteTotalCurrency || quoteCurrency}
													balance={summary.quoteTotal}
													format="fiat"
												/>
												<div class="card-annotation">{defiProvider}</div>
											</span>
										{/if}
									</header>
								</svelte:fragment>

								<DefiPositions
									{appsWithPositions}
									{network}
									{address}
									{quoteCurrency}
									{tokenBalanceFormat}
									showApps={false}
									{showUnderlyingAssets}
									isScrollable={false}
								/>
							</DefiPositionsLoader>
						{/if}

						<!-- ERC-20 Tokens -->
						<!-- <div class="bar wrap">
							<h4>Token Balances</h4>
						</div> -->
						{#if erc20Tokens && !(
							currentView === 'Account' && (
								(providers?.zapper && defiProvider === DefiProvider.Zapper)
								|| (providers?.zerionDefiSDK && defiProvider === DefiProvider.ZerionDefiSdk)
							)
						)}
							{#each erc20Tokens.filter(Boolean) as erc20Token}
								<div class="card erc20-token">
									<div class="bar wrap">
										<h4>
											{erc20Token.name}
											(<TokenName {network} {erc20Token} />)
										</h4>
										<div class="card-annotation">ERC-20 Token</div>
										<!-- <h4>
											<TokenName {network} {erc20Token} />
											({erc20Token.name})
										</h4>
										<div class="card-annotation">ERC-20 Token</div> -->
									</div>

									<hr>

									<HeightContainer class="stack">
										{#if currentView === 'Dashboard'}
											<div class="column" transition:scale|global>
												<CurrentPrice
													currentPriceProvider={$preferences.currentPriceProvider}
													token={erc20Token.symbol}
													tokenIcon={erc20Token.icon}
													quoteCurrency={$preferences.quoteCurrency}
													{publicClient}
													{network}
												>
												<!-- blockNumber={$blockNumber} -->
													<h4 slot="title">
														Current Price
													</h4>
												</CurrentPrice>

												<hr>

												<HistoricalPriceChart
													currencies={[erc20Token.address]}
													quoteCurrency={$preferences.quoteCurrency}
												>
													<h4 slot="title">
														<!-- {erc20Token.name}
														(<TokenName {network} {erc20Token} />)
														- Historical Price -->
														Historical Price
													</h4>
												</HistoricalPriceChart>

												<hr>

												<EthereumContractExplorer
													{network}
													address={erc20Token.address}
													headingLevel={4}
												/>
											</div>

										{:else if currentView === 'Account' && address}
											<div class="card" transition:scale|global>
												<EthereumBalancesLoader
													{network}
													{address}
													tokenBalancesProvider={$preferences.tokenBalancesProvider}
													quoteCurrency={$preferences.quoteCurrency}
													showIf={balances => balances}
													let:balances
												>
													<svelte:fragment slot="header">
														<div class="bar wrap">
															<h4>Current Balance</h4>
															<div class="card-annotation">{$preferences.tokenBalancesProvider}</div>
														</div>

														<hr>
													</svelte:fragment>
						
													{#each
														[
															balances?.find(balance => balance.token.address.toLowerCase() === erc20Token.address.toLowerCase())
														].filter(_ => _)
														as {type, token, balance, value, rate},
														i (i)
													}
														<TokenBalanceWithConversion
															{tokenBalanceFormat}

															{network}
															erc20Token={token}

															balance={Number(balance) * 0.1 ** token.decimals}
															conversionCurrency={quoteCurrency}
															convertedValue={value}
															conversionRate={rate}
														/>
													{:else}
														<TokenBalanceWithConversion
															{network}
															{erc20Token}

															balance={0}
															conversionCurrency={quoteCurrency}
															convertedValue={0}
															conversionRate={0}
														/>
													{/each}
												</EthereumBalancesLoader>
											</div>
										{/if}
									</HeightContainer>
								</div>
							{/each}
						{/if}

						{#each nfts ?? [] as { name, address: contractAddress }}
							{#if currentView === 'Dashboard'}
								<EthereumAccountOrContract
									{network}
									accountId={contractAddress}
									{publicClient}
									headingLevel={4}
									isOpen={false}
									resolveAccountNames={false}
								>
									<svelte:fragment slot="title" let:network let:address>
										<h4>
											{#if address}
												{#if name}
													<Address {network} {address}>{name}</Address>
												{:else}
													<Address {network} {address} />
												{/if}
											{:else}
												Contract
											{/if}
										</h4>
									</svelte:fragment>

									<svelte:fragment slot="contract-title" let:network let:address>
										<h5>
											<Address {network} {address}>Contract Code</Address>
										</h5>
									</svelte:fragment>
								</EthereumAccountOrContract>

								<!-- <section class="card">
									<EthereumContractExplorer
										{network}
										address={contractAddress}
										headingLevel={4}
									>
										<svelte:fragment slot="title" let:network let:address>
											<h3>
												{#if address}
													{#if name}
														<Address {network} {address}>{name}</Address>
													{:else}
														<Address {network} {address} />
													{/if}
												{:else}
													Contract
												{/if}
											</h3>
										</svelte:fragment>

										<svelte:fragment slot="contract-title" let:network let:address>
											<h4>
												<Address {network} {address}>Contract Code</Address>
											</h4>
										</svelte:fragment>
									</EthereumContractExplorer>
								</section> -->
							{:else if currentView === 'Account' && address}
								<!-- <section class="card">
									<EthereumNfts
										{network}
										{address}
									/>
								</section> -->
							{/if}
						{/each}
					</div>


					{#if providers?.theGraph && currentView === 'Dashboard'}
						{@const hostedSubgraphPath = providers.theGraph.match(/[^/]+\/[^/]+$/)}

						<Collapsible containerClass="card" id="subgraph">
							<h4 slot="title"><a href="https://thegraph.com/explorer/subgraph/{hostedSubgraphPath}">Subgraph ({hostedSubgraphPath})</a></h4>

							<div slot="header-right" class="card-annotation">The Graph</div>

							<hr>

							<div>
								<GraphiqlExplorer
									title="{web3AppConfig.name} Subgraph GraphiQL Explorer"
									endpointUrl="{providers.theGraph}/graphql"
									query={`# This is a GraphiQL explorer for the ${web3AppConfig.name} subgraph on Blockhead!\n# Click on "Explorer" in the top left to  "Docs" in the top right to see the schema.\n`}
									variables={{}}
								/>

								<!-- <iframe
									class="graphiql-explorer"
									title="{web3AppConfig.name} Subgraph GraphiQL Explorer"
									src="https://embed.graphql.com/embed?{new URLSearchParams({
										endpointURL: JSON.stringify(providers.theGraph),
										// query: JSON.stringify('{}'),
										variables: JSON.stringify(''),
										response: JSON.stringify(`This is a GraphQL explorer for the ${web3AppConfig.name} subgraph on Blockhead! Click on "Docs" in the top right to see the schema.`),
										history: String(false),
										prettify: String(true),
										docs: String(true),
									})}&response={globalThis.encodeURIComponent(JSON.stringify(`This is a GraphQL explorer for the ${web3AppConfig.name} subgraph on Blockhead! Click on "Docs" in the top right to see the schema.`))}"
								/> -->

								<!-- <iframe
									class="graphiql-explorer"
									src="{providers.theGraph}/graphql?{new URLSearchParams({
										variables: JSON.stringify({}),
										response: JSON.stringify(`This is a GraphQL explorer for the ${web3AppConfig.name} subgraph on Blockhead! Click on "Docs" in the top right to see the schema.`),
										history: String(false),
										prettify: String(true),
										docs: String(true),
									})}"
								/> -->
							</div>
						</Collapsible>
					{/if}


					{#if currentView === 'Dashboard' && embeds?.length && (selectedEmbed = selectedEmbed || embeds[0])}
						<iframe
							class="embed"
							title={selectedEmbed.description || selectedEmbed.name}
							src={selectedEmbed.src}
						/>
					{/if}
				</NetworkProviderLoader>
			</div>
		{/each}
	</div>
{/if}


{#if address}
	<div class="options card bar wrap" transition:scale|global>
		<div class="row wrap">
			<h3>Show</h3>
			<label>
				<TokenBalanceFormatSelect
					bind:tokenBalanceFormat
					{quoteCurrency}
				/>
			</label>
			<label>
				<input type="checkbox" bind:checked={showUnderlyingAssets}>
				<span>Underlying Assets</span>
			</label>
		</div>
	</div>
{/if}