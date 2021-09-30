<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { DeFiProvider } from '../data/defi-provider'
	import type { QuoteCurrency } from '../data/currency/currency'
	import type { BlockchainAppConfig, BlockchainAppSlug } from '../data/blockchain-apps'
	import type { Covalent } from '../data/analytics/covalent'
	import { blockchainAppsByProviderName } from '../data/blockchain-apps'
	import { getDefiBalances } from '../data/ethereum/price/defi-sdk'
	import { getDeFiProtocolBalances, getFiatRates } from '../data/zapper/zapper'
	import { getTokenAddressBalances } from '../data/analytics/covalent'
	import { networksByChainID } from '../data/ethereum/networks'
	import { preferences } from '../data/ethereum/preferences'


	// Data
	export let blockchainAppConfig: BlockchainAppConfig
	export let address: string
	export let providerName: Ethereum.ProviderName
	export let defiProvider: DeFiProvider = 'Zapper'
	export let quoteCurrency: QuoteCurrency


	// Computed Values
	let zapperFiatRates
	$: if(defiProvider === 'Zapper' && quoteCurrency !== 'USD')
		getFiatRates().then(_ => zapperFiatRates = _)
	$: zapperQuoteCurrency = zapperFiatRates ? quoteCurrency : 'USD' 
	$: zapperFiatRate = zapperFiatRates?.[quoteCurrency] ?? 1

	export let quoteTotal
	export let quoteTotalCurrency
	$: quoteTotalCurrency = zapperQuoteCurrency

	type TypeOfPromise<T> = T extends Promise<infer R> ? R : T
	let zapperDefiProtocolBalances: TypeOfPromise<ReturnType<typeof getDeFiProtocolBalances>>
	$: if(zapperDefiProtocolBalances)
		quoteTotal = zapperDefiProtocolBalances.reduce((sum, {meta}) => sum + Number(
			meta?.find(({label, type, value}) => label === 'Total')?.value ?? 0
		), 0) * zapperFiatRate


	// View options
	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let showUnderlyingAssets = true
	export let showMetadata = true
	export let showActions = false

	type Layout = 'horizontal' | 'horizontal-alternate' | 'vertical'
	export let layout: Layout | 'auto' = 'auto'
	let computedLayout: Layout
	$: computedLayout = layout === 'auto'
		? showUnderlyingAssets ? 'vertical' : 'horizontal' // 'horizontal-alternate'
		: layout
	
	export let isCollapsed: boolean


	let selectedEmbed

	
	import { formatPercent } from '../utils/format-percent'
	import { formatUnits } from '../utils/format-units'


	import Loader from './Loader.svelte'
	import HeightContainer from './HeightContainer.svelte'
	import EthereumBalancesLoader from './EthereumBalancesLoader.svelte'
	import NetworkProviderLoader from './NetworkProviderLoader.svelte'
	import CurrentPrice from './CurrentPrice.svelte'
	import HistoricalPriceChart from './HistoricalPriceChart.svelte'
	import TokenIcon from './TokenIcon.svelte'
	import TokenName from './TokenName.svelte'
	import TokenValue from './TokenValue.svelte'
	import TokenValueWithConversion from './TokenValueWithConversion.svelte'
	

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
		grid-template-columns: repeat(auto-fit, minmax(7rem, 1fr));
	}

	.underlying-symbol {
		display: inline-flex;
		padding: 0 0.3em;
		opacity: 0.8;
	}

	.column {
		display: grid;
    	gap: var(--padding-inner);
	}

	.card {
		position: relative;
		overflow: hidden;
	}

	.card.layout-horizontal {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
	}
	.card.layout-horizontal > :first-child {
		flex: 1 auto;
	}
	.card.layout-horizontal-alternate {
		display: flex;
		flex-wrap: wrap;
		flex-direction: row-reverse;
    	justify-content: flex-end;
	}
	.card.layout-horizontal-alternate .card-annotation {
		font-weight: normal;
		/* order: 1; */
		margin-left: auto;
		line-height: 1.5;
	}

	.card .card-background {
		position: absolute;
		opacity: 0.075;
		width: 13em;
		right: -1.5em;
		top: -2em;
		filter: contrast(10);
		border-radius: 50%;
		z-index: -1;
		pointer-events: none;
		user-select: none;
	}
	.card .card-background > :global(*) {
		font-size: 13em;
	}

	.metadata {
		font-size: 0.8em;
		line-height: 1.25;
		row-gap: 0.5em;
		opacity: 0.8;
	}

	.underlying-asset {
		display: flex;
	}

	.no-balances {
		opacity: 0.6;
	}


	.defi-app-views {
		display: grid;
		align-items: stretch;
		grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
		grid-auto-flow: dense;

		--options-size: 0.8;
	}
	.defi-app-view:not(.is-single), .defi-app-view.full {
		grid-column: 1 / -1;
	}
	.defi-app-view.scrollable-list {
		height: 39.5rem;
	}

	.defi-app-view-items {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
		grid-template-rows: masonry;
		align-items: stretch;

		--padding-inner: 0.75em;
		gap: var(--padding-inner);
	}
	.defi-app-view-items.scrollable-list {
		height: 31rem;
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
	.erc20-token :global(.value-with-conversion:not(:last-child)) {
		display: none;
	}


	iframe {
		width: 100%;
		justify-self: center;
		border-radius: 0.5em;
	}
	iframe.graphql-explorer {
		height: 35rem;
		max-height: 80vh;
	}
	iframe.embed {
		height: 80vh;
	}
</style>


{#if blockchainAppConfig}
	<div class="column defi-app-views">
		{#each blockchainAppConfig.views as {name, slug, chainId, colors, erc20Tokens, nfts, contracts, providers, embeds}}
		{#each [(erc20Tokens?.length ?? 0) + (nfts?.length ?? 0) + (contracts?.length ?? 0) + (providers && Object.entries(providers).length)] as totalViewItems}
			<div
				class="card defi-app-view"
				class:is-single={totalViewItems <= 1}
				class:full={embeds?.length}
				style={cardStyle(colors || blockchainAppConfig.colors)}
			>
				<NetworkProviderLoader
					network={networksByChainID[chainId]}
					{providerName}
					let:network
					let:provider
				>
					<svelte:fragment slot="header">
						<div class="bar">
							<h3 id={slug}>
								{#if slug}
									<a href="#{slug}">{name}</a>
								{:else}
									{name || blockchainAppConfig.name}
								{/if}
							</h3>

							{#if embeds?.length}
								<select bind:value={selectedEmbed}>
									{#each embeds as embed}
										<option value={embed}>{embed.name}</option>
									{/each}
								</select>
							{:else}
								<div class="card-annotation">{network.name}</div>
							{/if}
						</div>

						<hr>
					</svelte:fragment>

					<div
						class="column defi-app-view-items"
					>
					<!-- class:scrollable-list={!address && totalViewItems > 3} -->
						<!-- No address specified - general information -->
						{#if !address}
							{#each contracts || [] as contract}
								
							{/each}


						<!-- Address specified - account balances -->
						{:else}
							<!-- {#each ['Zapper', 'Zerion DeFi SDK'].sort((a, b) => defiProvider === a ? -1 : 1) as defiProvider} -->
								<!-- Zapper -->
								{#if providers?.zapper && defiProvider === 'Zapper'}
									<div class="card">
										<Loader
											loadingMessage="Reading {blockchainAppConfig.name} balances from {defiProvider}..."
											errorMessage="Error getting {blockchainAppConfig.name} balances from {defiProvider}."
											loadingIconName={defiProvider}
											loadingIcon={'/logos/zapper-logomark.svg'}
											fromPromise={network && address && (
												() => getDeFiProtocolBalances({
													protocolNames: providers?.zapper ? [providers.zapper] : [],
													network,
													address
												})
											)}
											bind:result={zapperDefiProtocolBalances}
											let:then={defiProtocolBalances}
											{isCollapsed}
										>
										<!-- showIf={defiProtocolBalances => defiProtocolBalances.length} -->
											<svelte:fragment slot="header" let:status>
												<!-- {#if (status === 'resolved' && defiProtocolBalances.length) || status === 'error'} -->
													<div class="bar">
														<h4><!--DeFi -->Balances</h4>
														{#if quoteTotal}
															<TokenValue symbol={quoteTotalCurrency || quoteCurrency} value={quoteTotal} showPlainFiat={true} />
														{/if}
														<div class="card-annotation">{defiProvider}</div>
													</div>
												<!-- {/if} -->
											</svelte:fragment>

											<div class="defi-balances column" class:scrollable-list={defiProtocolBalances.length > 6}>
												{#each defiProtocolBalances as {protocolName, products, meta}, i}
													{#each products as {
														label, assets, meta: productMeta,
														// _: blockchainAppConfig = blockchainAppsByProviderName.zapper?.[protocolName]
													}, j (label)}
														<div
															class="card defi-protocol"
															transition:scaleFont|local
															animate:flip|local={{duration: 300, delay: Math.abs(i + j * 0.1) * 10}}
														>
														<!-- style={cardStyle(colors || blockchainAppConfig.colors)} -->
															{#if assets[0]?.protocolImg}
																<img class="card-background" src={`https://zapper.fi/images/${assets[0].protocolImg}`} alt={label} width="20"/>
															{:else if assets[0]?.protocolSymbol}
																<span class="card-background"><TokenIcon symbol={assets[0].protocolSymbol} /></span>
															{/if}
															<div class="bar">
																<h5 class:card-annotation={computedLayout === 'horizontal-alternate'} title="{label}">
																	<a href="/apps/{blockchainAppsByProviderName.zapper?.[protocolName]?.slug ?? protocolName}/address/{address}">{label}</a>
																</h5>
																{#each meta as {label, type, value}}
																	{#if label === 'Assets'}
																		<TokenValue
																			symbol={zapperQuoteCurrency}
																			value={value * zapperFiatRate}
																			showPlainFiat={true}
																		/>
																	{:else if label === 'Debt' && value}
																		<TokenValue
																			symbol={zapperQuoteCurrency}
																			value={value * zapperFiatRate}
																			showPlainFiat={true}
																			isDebt={true}
																		/>
																	{/if}
																{/each}
																<!-- {#each meta as {label, type, value}}
																	{#if label !== 'Total' && !(['Assets', 'Debt'].includes(label) && value == 0)}
																		<div>
																			{label}
																			{#if type === 'dollar'}
																				<TokenValue
																					symbol={'USD'}
																					{value}
																					isDebt={label === 'Debt'}
																					showPlainFiat={true}
																				/>
																			{:else}
																				{value}
																			{/if}
																		</div>
																	{/if}
																{/each} -->
															</div>
															<hr>
															<div class="defi-protocol-balances column">
																{#each assets as {
																	type, category,
																	label,
																	symbol, tokenAddress, img, decimals, address,
																	balance, balanceUSD, balanceRaw, price,
																	protocol, protocolDisplay, protocolSymbol, protocolImg,
																	// type === 'vault' || type === 'pool'
																	tokens,
																	// type === 'vault'
																	apy,
																	// type === 'pool'
																	reserve, share, supply
																}}
																	<div class="defi-protocol-balance column">
																		<div class="bar">
																			<TokenValueWithConversion
																				{showValues}

																				{symbol}
																				icon={`https://zapper.fi/images/${img}`}
																				address={tokenAddress || address}
																				value={balanceRaw && Number.isInteger(Number(balanceRaw)) ? formatUnits(balanceRaw, decimals) : balance}

																				convertedValue={balanceUSD * zapperFiatRate}
																				conversionCurrency={zapperQuoteCurrency}
																				conversionRate={price * zapperFiatRate}

																				isDebt={balanceUSD < 0}
																			/>
																			{#if showActions}
																				<div transition:scale>
																					{#if type === 'claimable'}
																						<button class="small">Claim</button>
																					{:else if type === 'pool'}
																						<button class="small">Remove Liquidity</button>
																					{:else if type === 'vault'}
																						<button class="small">Withdraw</button>
																					{:else if type === 'interest-bearing'}
																						<button class="small">Withdraw Collateral</button>
																					{:else if type === 'wallet'}
																						<!-- Don't count as part of total -->
																					{:else}
																						{type}
																					{/if}
																				</div>
																			{:else}
																				{#if label && label !== symbol}
																					<span class="card-annotation">{label}</span>
																				{:else}
																					<span class="card-annotation">{type} {type !== category ? category : ''}</span>
																				{/if}
																			{/if}
																		</div>

																		<!-- Underlying Assets -->
																		{#if showUnderlyingAssets && tokens?.length}
																			<div class="underlying">
																				{#each tokens as {
																					address, decimals, symbol, img,
																					balance, balanceUSD, balanceRaw, price,
																					reserve, weight,
																					isCToken
																				}}
																					<p class="underlying-asset" in:scaleFont>
																						<span class="underlying-symbol">┖</span>
																						<TokenValueWithConversion
																							{showValues}
												
																							{symbol}
																							icon={`https://zapper.fi/images/${img}`}
																							address={tokenAddress || address}
																							value={balanceRaw && Number.isInteger(Number(balanceRaw)) ? formatUnits(balanceRaw, decimals) : balance}
												
																							convertedValue={balanceUSD * zapperFiatRate}
																							conversionCurrency={zapperQuoteCurrency}
																							conversionRate={price * zapperFiatRate}

																							isDebt={balanceUSD < 0}
																						/>
																						{#if weight}
																							<small>({formatPercent(weight)})</small>
																						{/if}
																					</p>
																				{/each}
																			</div>
																		{/if}
																	</div>
																{/each}
															</div>
															{#if showMetadata && productMeta?.length}
																<dl class="metadata">
																	{#each productMeta as {label, type, value}}
																		{#if !(['Total', 'Assets', 'Debt'].includes(label) && value == 0)}
																			<dt>{label}</dt>
																			<dd>
																				{#if type === 'dollar'}
																					<TokenValue
																						symbol={'USD'}
																						value={value}
																						isDebt={label === 'Debt'}
																						showPlainFiat={true}
																					/>
																				{:else if type === 'pct'}
																					{formatPercent(value)}
																				{:else if type === 'number'}
																					{value}
																				{:else}
																					{value}
																				{/if}
																			</dd>
																		{/if}
																	{/each}
																</dl>
															{/if}
														</div>
													{:else}
														<div class="no-balances">No balances found.</div>
													{/each}
												{:else}
													<div class="no-balances">No balances found.</div>
												{/each}
											</div>
											<!-- {#if quoteCurrency !== 'USD'}
												<small class="card row" transition:scale>
													<img src="/logos/zapper-logomark.svg" width="25" height="25" />
													Note: The Zapper API doesn't yet support currencies other than US Dollars.
												</small>
											{/if} -->

											<!-- {#each protocolBalances as {products: [{label, assets, meta: productMeta}], meta}}
												<h4>{label}</h4>
												{#each assets as {type, address, balance, balanceUSD, symbol, price, img, label, reserve}}
													{type}
													<TokenValue
														{symbol}
														{address}
														value={balance}
													/>
												{/each}
												{#each meta as {label, type, value}}
													{label}
													{type}
													{value}
												{/each}
											{/each} -->
										</Loader>
									</div>
								{/if}

								<!-- Zerion DeFi SDK -->
								{#if providers?.zerionDefiSDK && defiProvider === 'Zerion DeFi SDK'}
									<div class="card">
										<Loader
											loadingMessage="Reading {blockchainAppConfig.name} balances from {defiProvider}..."
											errorMessage="Error getting {blockchainAppConfig.name} balances from {defiProvider}."
											fromPromise={provider && address && (
												() => getDefiBalances({
													protocolNames: providers?.zerionDefiSDK,
													network,
													provider,
													address
												})
											)}
											let:then={defiBalances}
											{isCollapsed}
										>
										<!-- showIf={defiBalances => defiBalances?.length} -->
											<TokenIcon slot="loadingIcon" symbol={network.nativeCurrency.symbol} />

											<svelte:fragment slot="header" let:status>
												<!-- {#if defiBalances?.length} -->
													<div class="bar">
														<h4><!--DeFi -->Balances</h4>
														<!-- {#if quoteTotal}
															<TokenValue symbol={quoteTotalCurrency || quoteCurrency} value={quoteTotal} showPlainFiat={true} />
														{/if} -->
														<div class="card-annotation">{defiProvider}</div>
													</div>
												<!-- {/if} -->
											</svelte:fragment>

											<div class="defi-balances column">
												{#each defiBalances as {
													adapterBalances, metadata,
													// _: blockchainAppConfig = blockchainAppsByProviderName.zerionDefiSDK?.[metadata.name]
												}, i (metadata.name + i)}
													<div
														class="card defi-protocol layout-{computedLayout}"
														transition:scaleFont|local
														animate:flip|local={{duration: 300, delay: Math.abs(i) * 10}}
													>
													<!-- style={cardStyle(colors || blockchainAppConfig.colors)} -->
														<h5 class:card-annotation={computedLayout === 'horizontal-alternate'} title="{metadata.description}">
															<img class="card-background" src={`https://${metadata.iconURL}`} alt={metadata.name} width="20"/>
															<a href="/apps/{blockchainAppsByProviderName.zerionDefiSDK?.[metadata.name]?.slug}/address/{address}">{metadata.name}</a>
														</h5>
														{#if computedLayout === 'vertical'}
															<hr>
														{/if}
														<div class="defi-protocol-balances column">
															{#each adapterBalances as adapterBalance}
																<!-- {#if adapterBalance.metadata.adapterType === 'Debt'}
																	<h4>{adapterBalance.metadata.adapterType}</h4>
																{/if} -->
																{#each adapterBalance.balances as {base: baseBalance, underlying}}
																	<div class="column defi-protocol-balance">
																		<TokenValue
																			symbol={baseBalance.metadata.symbol}
																			address={baseBalance.metadata.token}
																			value={formatUnits(baseBalance.amount, baseBalance.metadata.decimals)}
																			isDebt={adapterBalance.metadata.adapterType === 'Debt'}
																		/>
																		{#if underlying.length && showUnderlyingAssets}
																			<div class="underlying">
																				{#each underlying as underlyingBalance}
																					<p in:scaleFont>
																						<span class="underlying-symbol">┖</span>
																						<TokenValue
																							symbol={underlyingBalance.metadata.symbol}
																							address={underlyingBalance.metadata.token}
																							value={formatUnits(underlyingBalance.amount, underlyingBalance.metadata.decimals)}
																							isDebt={adapterBalance.metadata.adapterType === 'Debt'}
																						/>
																					</p>
																				{/each}
																			</div>
																		{/if}
																	</div>
																{/each}
															{/each}
														</div>
													</div>
												{:else}
													<div class="no-balances">No balances found.</div>
												{/each}
											</div>
										</Loader>
									</div>
								{/if}
							<!-- {/each} -->
						{/if}

						<!-- ERC-20 Tokens -->
						<!-- <div class="bar">
							<h4>Token Balances</h4>
						</div> -->
						{#if erc20Tokens && !(
							address && (
								(providers?.zapper && defiProvider === 'Zapper')
								|| (providers?.zerionDefiSDK && defiProvider === 'Zerion DeFi SDK')
							)
						)}
							{#each erc20Tokens as erc20Token}
								<div class="card erc20-token">
									<div class="bar">
										<h4>
											{erc20Token.name}
											(<TokenName {erc20Token} />)
										</h4>
										<div class="card-annotation">ERC-20 Token</div>
										<!-- <h4>
											<TokenName {erc20Token} />
											({erc20Token.name})
										</h4>
										<div class="card-annotation">ERC-20 Token</div> -->
									</div>

									<hr>

									<HeightContainer class="stack">
										{#if !address}
											<div class="column" transition:scale>
												<CurrentPrice
													priceProvider={$preferences.currentPriceProvider}
													token={erc20Token.symbol}
													tokenIcon={erc20Token.icon}
													quoteCurrency={$preferences.quoteCurrency}
													{provider}
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
														(<TokenName {erc20Token} />)
														- Historical Price -->
														Historical Price
													</h4>
												</HistoricalPriceChart>
											</div>
										{:else}
											<div class="card" transition:scale>
												<EthereumBalancesLoader
													{network}
													{address}
													tokenBalancesProvider={$preferences.tokenBalancesProvider}
													quoteCurrency={$preferences.quoteCurrency}
													showIf={balances => balances}
													let:balances
												>
													<svelte:fragment slot="header">
														<div class="bar">
															<h4>Current Balance</h4>
															<div class="card-annotation">{$preferences.tokenBalancesProvider}</div>
														</div>

														<hr>
													</svelte:fragment>
						
													{#each
														[
															balances?.find(balance => balance.contract_address.toLowerCase() === erc20Token.address.toLowerCase())
														].filter(_ => _)
														as {type, balance, quote, quote_rate, contract_name, contract_address, contract_decimals, contract_ticker_symbol, logo_url},
														i (i)
													}
														<TokenValueWithConversion
															{showValues}
															symbol={contract_ticker_symbol || contract_name}
															address={contract_address}
															icon={logo_url}
															name={contract_name}
															value={balance * 0.1 ** contract_decimals}
															isDust={false}
															conversionCurrency={quoteCurrency}
															convertedValue={quote}
															conversionRate={quote_rate}
														/>
													{:else}
														<TokenValueWithConversion
															symbol={erc20Token.symbol}
															address={erc20Token.address}
															icon={erc20Token.icon}
															name={erc20Token.name}
															value={0}
															isDust={false}
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

						{#each nfts || [] as nftContract}
							
						{/each}
					</div>
				</NetworkProviderLoader>


				{#if providers?.theGraph && !address}
					<div class="card">
						<div class="bar">
							<h4><a href="https://thegraph.com/explorer/subgraph/{providers.theGraph.match(/[^/]+\/[^/]+$/)}">Subgraph ({providers.theGraph.match(/[^/]+\/[^/]+$/)})</a></h4>
							<div class="card-annotation">The Graph</div>
						</div>

						<hr>

						<div>
							<iframe
								class="graphql-explorer"
								title="{name} Subgraph GraphiQL Explorer"
								src="https://embed.graphql.com/embed?{new URLSearchParams({
									endpointURL: JSON.stringify(providers.theGraph),
									// query: JSON.stringify('{}'),
									// variables: JSON.stringify(''),
									// response: JSON.stringify(`This is a GraphQL explorer for the ${blockchainAppConfig.name} subgraph on Blockhead! Click on "Docs" in the top right to see the schema.`)),
									history: false,
									prettify: true,
									docs: true
								})}&response={globalThis.encodeURIComponent(JSON.stringify(`This is a GraphQL explorer for the ${blockchainAppConfig.name} subgraph on Blockhead! Click on "Docs" in the top right to see the schema.`))}"
							/>
						</div>
					</div>
				{/if}


				{#if embeds?.length && (selectedEmbed = selectedEmbed || embeds[0])}
					<iframe
						class="embed"
						title={selectedEmbed.description || selectedEmbed.name}
						src={selectedEmbed.src}
					/>
				{/if}
			</div>
		{/each}
		{/each}
	</div>
{/if}


{#if address}
	<div class="card bar options" transition:scale>
		<div class="row">
			<h3>Show</h3>
			<label>
				<select bind:value={showValues}>
					<option value="original">Balances</option>
					<option value="converted">Quotes</option>
					<option value="both">Balances + Quotes</option>
				</select>
			</label>
			<label>
				<input type="checkbox" bind:checked={showUnderlyingAssets}>
				<span>Underlying Assets</span>
			</label>
		</div>
	</div>
{/if}