<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { DeFiProvider } from '../data/defi-provider'
	import type { QuoteCurrency } from '../data/currency/currency'
	import type { DefiSDK } from '../data/ethereum/price/defi-sdk'
	import type { Web3AppConfig, Web3AppSlug } from '../data/web3Apps'
	import { web3AppsByProviderName } from '../data/web3Apps'
	import { getDefiBalances } from '../data/ethereum/price/defi-sdk'
	import type { ZapperAppId, ZapperAppConfig } from '../data/zapper/zapper'
	import { getAllApps, getDefiBalancesForApps } from '../data/zapper/zapper'


	// Data
	export let web3Apps: Web3AppConfig[]
	export let network: Ethereum.Network
	export let provider: Ethereum.Provider
	export let address: string
	export let defiProvider: DeFiProvider = 'Zapper'
	export let quoteCurrency: QuoteCurrency


	// Computed Values
	let zapperFiatRates
	$:console.log(zapperFiatRates)
	// $: if(defiProvider === 'Zapper' && quoteCurrency !== 'USD')
	// 	getFiatRates().then(_ => zapperFiatRates = _)
	$: zapperQuoteCurrency = zapperFiatRates ? quoteCurrency : 'USD' 
	$: zapperFiatRate = zapperFiatRates?.[quoteCurrency] ?? 1

	let zapperApps: Partial<Record<ZapperAppId, ZapperAppConfig>>
	$: if(defiProvider === 'Zapper')
		getAllApps().then(_ => zapperApps = Object.fromEntries(_.map(app => [app.id, app])))

	export let summary: {
		quoteTotal: number,
		defiAppsCount: number,
		quoteTotalCurrency: QuoteCurrency
	}

	let zerionDefiBalances: Awaited<ReturnType<typeof getDefiBalances>>
	let zapperDefiBalances: Awaited<ReturnType<typeof getDefiBalancesForApps>>

	$: summary =
		zerionDefiBalances ?
			{
				quoteTotal: undefined,

				defiAppsCount: zerionDefiBalances.length,

				quoteTotalCurrency: undefined
			}
		: zapperDefiBalances ? 
			{
				quoteTotal: zapperDefiBalances.reduce((sum, {meta}) => sum + Number(
					meta?.find(({label, type, value}) => label === 'Total')?.value ?? 0
				), 0) * zapperFiatRate,

				defiAppsCount: zapperDefiBalances.length,

				quoteTotalCurrency: defiProvider === 'Zapper' ? zapperQuoteCurrency : undefined
			}
		:
			undefined


	// View options
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showUnderlyingAssets = true
	export let showMetadata = true
	export let showActions = false
	export let isScrollable = false

	type Layout = 'horizontal' | 'horizontal-alternate' | 'vertical'
	export let layout: Layout | 'auto' = 'auto'
	let computedLayout: Layout
	$: computedLayout = layout === 'auto'
		? showUnderlyingAssets ? 'vertical' : 'horizontal' // 'horizontal-alternate'
		: layout
	
	export let isCollapsed: boolean

	
	import { formatPercent } from '../utils/format-percent'
	import { formatUnits } from '../utils/format-units'


	$: defiBalancesDescription = web3Apps?.map(({name}) => name).join('/') || `${network.name} DeFi`


	import Loader from './Loader.svelte'
	import Loading from './Loading.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'


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

	.metadata {
		font-size: 0.8em;
		line-height: 1.25;
		row-gap: 0.5em;
		opacity: 0.8;
	}

	.underlying-asset {
		display: flex;
	}
</style>

{#if network && address}
	<!-- Zapper -->
	{#if defiProvider === 'Zapper' || network.chainId !== 1}
		<Loader
			loadingMessage="Reading {defiBalancesDescription} balances from {defiProvider}..."
			errorMessage="Error getting {defiBalancesDescription} balances from {defiProvider}."
			loadingIconName={defiProvider}
			loadingIcon={'/logos/Zapper.svg'}
			fromStore={() => getDefiBalancesForApps({
				// appIds: web3Apps?.flatMap(({views}) => views.flatMap(({providers}) => providers?.zapper ?? [])),
				network,
				address,
				asStore: true
			})}
			bind:result={zapperDefiBalances}
			let:result={defiProtocolBalances}
			{isCollapsed}
		>
			<svelte:fragment slot="header" let:status>
				<slot name="header" {status} defiBalances={defiProtocolBalances} {summary} />
			</svelte:fragment>

			<div class="defi-balances column" class:scrollable-list={isScrollable && defiProtocolBalances.flatMap(({products}) => products).length > 6}>
				{#each defiProtocolBalances as {appId, products, meta}, i}
					{#each products as {
						label, assets, meta: productMeta,
						// _: web3AppConfig = web3AppsByProviderName.zapper?.[appId]
					}, j (label)}
						<div
							class="card defi-protocol"
							style={cardStyle(web3AppsByProviderName.zapper?.[appId]?.colors ?? zapperApps?.[appId]?.primaryColor ? [zapperApps[appId].primaryColor] : [])}
							transition:scale
							animate:flip|local={{duration: 300, delay: Math.abs(i + j * 0.1) * 10}}
						>
							{#if assets[0]?.appImgUrl}
								<img class="card-background" src={assets[0].appImgUrl} alt={label} width="20"/>
							<!-- {:else if assets[0]?.symbol}
								<span class="card-background"><TokenIcon symbol={assets[0].protocolSymbol} /></span> -->
							{/if}
							<div class="bar">
								<h5 class:card-annotation={computedLayout === 'horizontal-alternate'} title="{label}">
									<a href="/apps/{web3AppsByProviderName.zapper?.[appId]?.slug ?? appId}/address/{address}">{label}</a>
								</h5>
								{#each meta as {label, type, value}}
									{#if label === 'Assets'}
										<TokenBalance
											symbol={zapperQuoteCurrency}
											balance={value * zapperFiatRate}
											showPlainFiat={true}
										/>
									{:else if label === 'Debt' && value}
										<TokenBalance
											symbol={zapperQuoteCurrency}
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
													{'USD'}
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
										<div class="bar">
											<TokenBalanceWithConversion
												{tokenBalanceFormat}

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
													<span class="card-annotation">{type}{category && type !== category ? ` ${category}` : ''}</span>
												{/if}
											{/if}
										</div>

										<!-- Underlying Assets -->
										{#if showUnderlyingAssets && tokens?.length}
											<div class="underlying">
												{#each tokens as {
													// address, balance, balanceRaw, balanceUSD, category, decimals, img, label, metaType, network, price, symbol, tokenImageUrl, type,
													// address, decimals, symbol, img,
													label,
													address, decimals, symbol, tokenImageUrl,
													balance, balanceUSD, balanceRaw, price,
													reserve, weight,
													isCToken
												}}
													<abbr class="underlying-asset" in:scaleFont title={label}>
														<span class="underlying-symbol">┖</span>
														<TokenBalanceWithConversion
															{tokenBalanceFormat}

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
														{#if label}{label}{/if}
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
					{/each}
				{/each}
			</div>
			<!-- {#if quoteCurrency !== 'USD'}
				<small class="card row" transition:scale>
					<img src="/logos/Zapper.svg" width="25" height="25" />
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
	{/if}

	<!-- Zerion DeFi SDK -->
	{#if defiProvider === 'Zerion DeFi SDK'	&& network.chainId === 1}
		{#if provider}
			<Loader
				loadingMessage="Reading {defiBalancesDescription} balances from {defiProvider}..."
				errorMessage="Error getting {defiBalancesDescription} balances from {defiProvider}."
				fromPromise={() => getDefiBalances({
					protocolNames: web3Apps?.flatMap(({views}) => views.flatMap(({providers}) => providers?.zerionDefiSDK ?? [])),
					network,
					provider,
					address
				})}
				bind:result={zerionDefiBalances}
				let:result={defiBalances}
				{isCollapsed}
			>					
				<NetworkIcon slot="loadingIcon" {network} />

				<svelte:fragment slot="header" let:status>
					<slot name="header" {status} {defiBalances} {summary} />
				</svelte:fragment>

				<div class="defi-balances column">
					{#each defiBalances as {
						adapterBalances, metadata,
						// _: web3AppConfig = web3AppsByProviderName.zerionDefiSDK?.[metadata.name]
					}, i (metadata.name + i)}
						<div
							class="card defi-protocol layout-{computedLayout}"
							style={cardStyle(web3AppsByProviderName.zerionDefiSDK?.[metadata.name]?.colors)}
							transition:scaleFont|local
							animate:flip|local={{duration: 300, delay: Math.abs(i) * 10}}
						>
							<h5 class:card-annotation={computedLayout === 'horizontal-alternate'} title="{metadata.description}">
								<img class="card-background" src={`https://${metadata.iconURL}`} alt={metadata.name} width="20"/>
								<a href="/apps/{web3AppsByProviderName.zerionDefiSDK?.[metadata.name]?.slug}/address/{address}">{metadata.name}</a>
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
												symbol={baseBalance.metadata.symbol}
												address={baseBalance.metadata.token}
												balance={formatUnits(baseBalance.amount, baseBalance.metadata.decimals)}
												isDebt={adapterBalance.metadata.adapterType === 'Debt'}
											/>
											{#if underlying.length && showUnderlyingAssets}
												<div class="underlying">
													{#each underlying as underlyingBalance}
														<p in:scaleFont>
															<span class="underlying-symbol">┖</span>
															<TokenBalance
																symbol={underlyingBalance.metadata.symbol}
																address={underlyingBalance.metadata.token}
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
					{/each}
				</div>
			</Loader>
		{:else}
			<Loading>Connecting to the blockchain...</Loading>
		{/if}
	{/if}
{/if}