<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import { DefiProvider, defiProviderIcons } from '../data/defiProviders'
	import type { QuoteCurrency } from '../data/currencies'
	import type { Web3AppConfig, Web3AppSlug } from '../data/web3Apps'
	import type { Covalent } from '../api/covalent'
	import { web3AppsByProviderName } from '../data/web3Apps'
	import { getDefiBalances } from '../api/zerion/defiSdk'
	import { getDefiBalancesForApps } from '../api/zapper'
	import { getTokenAddressBalances } from '../api/covalent'
	import { networksByChainID } from '../data/networks'
	import { preferences } from '../state/preferences'


	// Data
	export let web3AppConfig: Web3AppConfig
	export let address: string
	export let networkProvider: NetworkProvider
	export let defiProvider: DefiProvider = DefiProvider.Zapper
	export let quoteCurrency: QuoteCurrency


	// Computed Values
	let zapperFiatRates
	// $: if(defiProvider === DefiProvider.Zapper && quoteCurrency !== 'USD')
	// 	getFiatRates().then(_ => zapperFiatRates = _)
	$: zapperQuoteCurrency = zapperFiatRates ? quoteCurrency : 'USD' 
	$: zapperFiatRate = zapperFiatRates?.[quoteCurrency] ?? 1

	export let quoteTotal
	export let quoteTotalCurrency
	$: quoteTotalCurrency = zapperQuoteCurrency


	let zapperDefiProtocolBalances: Awaited<ReturnType<typeof getDefiBalancesForApps>>
	$: if(zapperDefiProtocolBalances)
		quoteTotal = zapperDefiProtocolBalances.reduce((sum, {meta}) => sum + Number(
			meta?.find(({label, type, value}) => label === 'Total')?.value ?? 0
		), 0) * zapperFiatRate


	// View options
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showUnderlyingAssets = true
	export let showMetadata = true
	export let showActions = false

	type Layout = 'horizontal' | 'horizontal-alternate' | 'vertical'
	export let layout: Layout | 'auto' = 'auto'
	let computedLayout: Layout
	$: computedLayout = layout === 'auto'
		? showUnderlyingAssets ? 'vertical' : 'horizontal' // 'horizontal-alternate'
		: layout
	
	export let isOpen: boolean


	let selectedEmbed

	
	import { formatPercent } from '../utils/formatPercent'
	import { formatUnits } from '../utils/formatUnits'
	import { formatKebabCase } from '../utils/formatKebabCase'


	import Address from './Address.svelte'
	import Collapsible from './Collapsible.svelte'
	import Loader from './Loader.svelte'
	import HeightContainer from './HeightContainer.svelte'
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

	
	import { ZapperIcon } from '../assets/icons'


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
	<div class="column defi-app-views">
		{#each web3AppConfig.views as {name, slug, links, chainId, colors, erc20Tokens, nfts, contracts, providers, embeds}}
			{@const totalViewItems = (erc20Tokens?.length ?? 0) + (nfts?.length ?? 0) + (contracts?.length ?? 0) + (providers && Object.entries(providers).length)}
			{@const _links = links ?? web3AppConfig?.links}

			<div
				class="card defi-app-view"
				class:is-single={totalViewItems <= 1}
				class:full={embeds?.length}
				style={cardStyle(colors || web3AppConfig.colors)}
			>
				<NetworkProviderLoader
					network={networksByChainID[chainId]}
					{networkProvider}
					let:network
					let:publicClient
				>
					<svelte:fragment slot="header"
						let:network
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
						</div>

						<hr>
					</svelte:fragment>

					<div
						class="column defi-app-view-items"
					>
					<!-- class:scrollable-list={!address && totalViewItems > 3} -->
						<!-- No address specified - general information -->
						{#if !address}
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
						{:else}
							<!-- {#each Object.values(DefiProvider).sort((a, b) => defiProvider === a ? -1 : 1) as defiProvider} -->
								<!-- Zapper -->
								{#if providers?.zapper && defiProvider === DefiProvider.Zapper}
									<div class="card">
										<Loader
											loadingMessage="Reading {web3AppConfig.name} balances from {defiProvider}..."
											errorMessage="Error getting {web3AppConfig.name} balances from {defiProvider}."
											loadingIconName={defiProvider}
											loadingIcon={defiProviderIcons[defiProvider]}
											fromStore={() => getDefiBalancesForApps({
												appIds: [providers?.zapper],
												network,
												address,
												asStore: true
											})}
											bind:result={zapperDefiProtocolBalances}
											let:result={defiProtocolBalances}
											{isOpen}
										>
										<!-- showIf={defiProtocolBalances => defiProtocolBalances.length} -->
											<svelte:fragment slot="header"
												let:status
											>
												<!-- {#if (status === 'resolved' && defiProtocolBalances.length) || status === 'error'} -->
													<div class="bar wrap">
														<h4><!--DeFi -->Balances</h4>
														{#if quoteTotal}
															<TokenBalance
																{network} symbol={quoteTotalCurrency || quoteCurrency}
																balance={quoteTotal}
																showPlainFiat={true}
															/>
														{/if}
														<div class="card-annotation">{defiProvider}</div>
													</div>
												<!-- {/if} -->
											</svelte:fragment>

											<div class="defi-balances column" class:scrollable-list={defiProtocolBalances.flatMap(({products}) => products).length > 6}>
												{#each defiProtocolBalances as {appId, products, meta}, i}
													{#each products as {
														label, assets, meta: productMeta,
														// _: web3AppConfig = web3AppsByProviderName.zapper?.[appId]
													}, j (label)}
														<div
															class="card defi-protocol"
															transition:scaleFont
															animate:flip|local={{duration: 300, delay: Math.abs(i + j * 0.1) * 10}}
														>
														<!-- style={cardStyle(colors || web3AppConfig.colors)} -->
															{#if assets[0]?.appImgUrl}
																<img class="card-background" src={assets[0].appImgUrl} alt={label} width="20"/>
															<!-- {:else if assets[0]?.symbol}
																<span class="card-background"><TokenIcon {network} symbol={assets[0].protocolSymbol} /></span> -->
															{/if}
															<div class="bar wrap">
																<h5 class:card-annotation={computedLayout === 'horizontal-alternate'} title="{label}">
																	<a href="/apps/{web3AppsByProviderName.zapper?.[appId]?.slug ?? appId}/account/{address}">{label}</a>
																</h5>
																{#each meta as {label, type, value}}
																	{#if label === 'Assets'}
																		<TokenBalance
																			{network} symbol={zapperQuoteCurrency}
																			balance={value * zapperFiatRate}
																			showPlainFiat={true}
																		/>
																	{:else if label === 'Debt' && value}
																		<TokenBalance
																			{network} symbol={zapperQuoteCurrency}
																			balance={value * zapperFiatRate}
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
																				<TokenBalance
																					symbol={'USD'}
																					balance={value}
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
																		<div class="bar wrap">
																			<TokenBalanceWithConversion
																				{tokenBalanceFormat}

																				{network}
																				{symbol}
																				address={tokenAddress || address}
																				icon={`https://zapper.fi/images/${img}`}

																				balance={balanceRaw && Number.isInteger(Number(balanceRaw)) ? formatUnits(balanceRaw, decimals) : balance}
																				convertedValue={balanceUSD * zapperFiatRate}
																				conversionCurrency={zapperQuoteCurrency}
																				conversionRate={price * zapperFiatRate}

																				isDebt={balanceUSD < 0}
																			/>
																			{#if showActions}
																				<div transition:scale|global>
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
																				<span class="card-annotation">{formatKebabCase(type)}{category && type !== category ? ` ${category}` : ''}</span>																				{/if}
																			{/if}
																		</div>

																		<!-- Underlying Assets -->
																		{#if showUnderlyingAssets && tokens?.length}
																			<div class="underlying">
																				{#each tokens as {
																					address, decimals, symbol, tokenImageUrl,
																					balance, balanceUSD, balanceRaw, price,
																					reserve, weight,
																					isCToken
																				}}
																					<abbr class="underlying-asset" in:scaleFont|global title={label}>
																						<span class="underlying-symbol">┖</span>
																						<TokenBalanceWithConversion
																							{tokenBalanceFormat}

																							{network}
																							{symbol}
																							address={tokenAddress || address}
																							icon={tokenImageUrl}

																							balance={balanceRaw && Number.isInteger(Number(balanceRaw)) ? formatUnits(balanceRaw, decimals) : balance}
																							convertedValue={balanceUSD * zapperFiatRate}
																							conversionCurrency={zapperQuoteCurrency}
																							conversionRate={price * zapperFiatRate}

																							isDebt={balanceUSD < 0}
																						/>
																						{#if weight}
																							<small>({formatPercent(weight)})</small>
																						{/if}
																					</abbr>
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
																					<TokenBalance
																						symbol={'USD'}
																						balance={value}
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
												<small class="card row" transition:scale|global>
													<img src={ZapperIcon} width="25" height="25" />
													Note: The Zapper API doesn't yet support currencies other than US Dollars.
												</small>
											{/if} -->

											<!-- {#each protocolBalances as {products: [{label, assets, meta: productMeta}], meta}}
												<h4>{label}</h4>
												{#each assets as {type, address, balance, balanceUSD, symbol, price, img, label, reserve}}
													{type}
													<TokenBalance
														{symbol} {address}
														{balance}
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
								{#if providers?.zerionDefiSDK && defiProvider === DefiProvider.ZerionDefiSdk}
									<div class="card">
										<Loader
											loadingMessage="Reading {web3AppConfig.name} balances from {defiProvider}..."
											errorMessage="Error getting {web3AppConfig.name} balances from {defiProvider}."
											fromPromise={publicClient && address && (
												() => getDefiBalances({
													protocolNames: providers?.zerionDefiSDK,
													network,
													publicClient,
													address
												})
											)}
											let:result={defiBalances}
											{isOpen}
										>
										<!-- showIf={defiBalances => defiBalances?.length} -->
											<NetworkIcon slot="loadingIcon" {network} />

											<svelte:fragment slot="header"
												let:status
											>
												<!-- {#if defiBalances?.length} -->
													<div class="bar wrap">
														<h4><!--DeFi -->Balances</h4>
														<!-- {#if quoteTotal}
															<TokenBalance
																symbol={quoteTotalCurrency || quoteCurrency}
																balance={quoteTotal}
																showPlainFiat={true}
															/>
														{/if} -->
														<div class="card-annotation">{defiProvider}</div>
													</div>
												<!-- {/if} -->
											</svelte:fragment>

											<div class="defi-balances column">
												{#each defiBalances as {
													adapterBalances, metadata,
													// _: web3AppConfig = web3AppsByProviderName.zerionDefiSDK?.[metadata.name]
												}, i (metadata.name + i)}
													<div
														class="card defi-protocol layout-{computedLayout}"
														transition:scaleFont
														animate:flip|local={{duration: 300, delay: Math.abs(i) * 10}}
													>
													<!-- style={cardStyle(colors || web3AppConfig.colors)} -->
														<h5 class:card-annotation={computedLayout === 'horizontal-alternate'} title="{metadata.description}">
															<img class="card-background" src={`https://${metadata.iconURL}`} alt={metadata.name} width="20"/>
															<a href="/apps/{web3AppsByProviderName.zerionDefiSDK?.[metadata.name]?.slug}/account/{address}">{metadata.name}</a>
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
																		<TokenBalance
																			{network} symbol={baseBalance.metadata.symbol} address={baseBalance.metadata.token}
																			balance={formatUnits(baseBalance.amount, baseBalance.metadata.decimals)}
																			isDebt={adapterBalance.metadata.adapterType === 'Debt'}
																		/>
																		{#if underlying.length && showUnderlyingAssets}
																			<div class="underlying">
																				{#each underlying as underlyingBalance}
																					<p in:scaleFont|global>
																						<span class="underlying-symbol">┖</span>
																						<TokenBalance
																							{network} symbol={underlyingBalance.metadata.symbol} address={underlyingBalance.metadata.token}
																							balance={formatUnits(underlyingBalance.amount, underlyingBalance.metadata.decimals)}
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
						<!-- <div class="bar wrap">
							<h4>Token Balances</h4>
						</div> -->
						{#if erc20Tokens && !(
							address && (
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
										{#if !address}
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
												/>
											</div>
										{:else}
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

															balance={balance * 0.1 ** token.decimals}
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
							{#if !address}
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
							{:else}
								<!-- <section class="card">
									<EthereumNfts
										{network}
										{address}
									/>
								</section> -->
							{/if}
						{/each}
					</div>
				</NetworkProviderLoader>


				{#if providers?.theGraph && !address}
					<div class="card" id="subgraph">
						<div class="bar wrap">
							<h4><a href="https://thegraph.com/explorer/subgraph/{providers.theGraph.match(/[^/]+\/[^/]+$/)}">Subgraph ({providers.theGraph.match(/[^/]+\/[^/]+$/)})</a></h4>
							<div class="card-annotation">The Graph</div>
						</div>

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