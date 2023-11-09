<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import type { NetworkProvider } from '../data/networkProviders/types'
	import type { QuoteCurrency } from '../data/currencies'
	import type { Web3AppConfig } from '../data/web3Apps'
	import type { ZapperAppId, ZapperAppConfig } from '../api/zapper'

	import { getViemPublicClient } from '../data/networkProviders'
	import { DefiProvider, defiProviderIcons } from '../data/defiProviders'
	import type { AppWithDefiPositions } from '../data/defiPositions'


	// Inputs
	export let web3Apps: Web3AppConfig[]
	export let network: Ethereum.Network
	export let address: Ethereum.Address

	export let networkProvider: NetworkProvider
	export let publicClient: Ethereum.PublicClient | undefined
	export let defiProvider: DefiProvider = DefiProvider.Zapper
	export let quoteCurrency: QuoteCurrency

	// (Computed)
	$: publicClient = network && networkProvider && getViemPublicClient({
		network,
		networkProvider,
	})

	// (View options)
	type Layout = 'horizontal' | 'horizontal-alternate' | 'vertical'
	export let layout: Layout | 'auto' = 'auto'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showUnderlyingAssets = true
	export let showMetadata = true
	export let showActions = false
	export let isScrollable = false

	export let isOpen: boolean

	export let containerClass: string
	export let contentClass: string

	// (Computed)
	let computedLayout: Layout
	$: computedLayout = layout === 'auto'
		? 'vertical'
		// ? showUnderlyingAssets ? 'vertical' : 'horizontal' // 'horizontal-alternate'
		: layout


	// Internal state
	let appsWithPositions: AppWithDefiPositions[] | undefined

	let zapperFiatRates: Record<QuoteCurrency, number> | undefined
	// $: if(defiProvider === DefiProvider.Zapper && quoteCurrency !== 'USD')
	// 	getFiatRates().then(_ => zapperFiatRates = _)
	$: zapperQuoteCurrency = zapperFiatRates ? quoteCurrency : 'USD' 
	$: zapperFiatRate = zapperFiatRates?.[quoteCurrency] ?? 1

	let allZapperAppConfigs: Partial<Record<ZapperAppId, ZapperAppConfig>>
	$: if(defiProvider === DefiProvider.Zapper)
		getAllApps().then(_ => allZapperAppConfigs = Object.fromEntries(_.map(app => [app.id, app])))

	$: defiBalancesDescription = web3Apps?.map(({name}) => name).join('/') || `${network.name} DeFi`


	// Outputs
	export let summary: {
		quoteTotal: number | undefined,
		defiAppsCount: number,
		quoteTotalCurrency: QuoteCurrency | undefined,
	} | undefined

	$: summary =
		appsWithPositions ? 
			{
				quoteTotal: appsWithPositions
					.flatMap(appWithPositions => appWithPositions.views)
					.map(view => (view.summary?.assets?.value ?? 0) - (view.summary?.debt?.value ?? 0))
					.reduce((sum, value) => sum + value, 0)
					* zapperFiatRate,

				defiAppsCount: appsWithPositions.length,

				quoteTotalCurrency: defiProvider === DefiProvider.Zapper ? zapperQuoteCurrency : undefined
			}
		:
			undefined
	
	type SharedSlotProps = {
		appsWithPositions: typeof appsWithPositions,
		summary: typeof summary,
		status: Loader<any, any, any, any, any>['$$slot_def']['default']['status'],
		loadingMessage: string,
		errorMessage: string,
	}

	type $$Slots = {
		'default': SharedSlotProps,
		'header': SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'
	import { getDefiBalances, normalizeDefiBalances as normalizeDefiBalancesZerion } from '../api/zerion/defiSdk'
	import { getAllApps, getDefiBalancesForApps, normalizeDefiBalances as normalizeDefiBalancesZapper } from '../api/zapper'

	import { formatPercent } from '../utils/formatPercent'
	import { formatKebabCase } from '../utils/formatKebabCase'
	import { formatIdentifierToWords } from '../utils/formatIdentifierToWords'


	// Components
	import Address from './Address.svelte'
	import AddressWithLabel from './AddressWithLabel.svelte'
	import Loader from './Loader.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'


	// Transitions/styling
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
	/* .underlying-symbol { */
	.underlying-asset:before {
		content: '┖';
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

	h5 {
		--icon-size: 1.75em;
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

	.summary {
		font-size: 0.8em;
	}
</style>


<Loader
	layout="collapsible"
	collapsibleType="label"
	loadingMessage="Reading {defiBalancesDescription} balances from {defiProvider}..."
	errorMessage="Error getting {defiBalancesDescription} balances from {defiProvider}."
	loadingIconName={defiProvider}
	loadingIcon={defiProviderIcons[defiProvider]}
	{...{
		[DefiProvider.Zapper]: () => ({
			fromStore: network && address && (() => (
				getDefiBalancesForApps({
					// appIds: web3Apps?.flatMap(({views}) => views.flatMap(({providers}) => providers?.zapper ?? [])),
					network,
					address,
					asStore: true
				})
			)),
			then: defiBalances => (
				normalizeDefiBalancesZapper(defiBalances, allZapperAppConfigs)
			),
		}),

		[DefiProvider.ZerionDefiSdk]: () => ({
			fromQuery: network && address && createQuery({
				queryKey: ['DefiBalances', {
					defiProvider,
					address,
					chainId: network.chainId,
				}],
				queryFn: async () => (
					await getDefiBalances({
						protocolNames: web3Apps?.flatMap(({views}) => views.flatMap(({providers}) => providers?.zerionDefiSDK ?? [])),
						network,
						publicClient,
						address,
					})
				),
				select: normalizeDefiBalancesZerion,
				staleTime: 10 * 1000,
			})
		}),
	}[defiProvider]?.()}
	bind:result={appsWithPositions}
	let:result={appsWithPositions}
	{isOpen}
	{containerClass}
	{contentClass}
>
	<svelte:fragment slot="header"
		let:result={appsWithPositions}
		let:status
		let:loadingMessage
		let:errorMessage
	>
		<slot name="header" {appsWithPositions} {summary} {status} {loadingMessage} {errorMessage} />
	</svelte:fragment>

	<div class="defi-balances column" class:scrollable-list={isScrollable && appsWithPositions && appsWithPositions?.length > 6}>
		{#each appsWithPositions ?? [] as appWithPositions, i (appWithPositions.id ?? appWithPositions.app?.slug)}
			{#if appWithPositions.summary}
				{#if appWithPositions.summary.assets?.value}
					<TokenBalance
						symbol={appWithPositions.summary.assets.currency}
						balance={appWithPositions.summary.assets.value}
						format="fiat"
					/>
				{/if}

				{#if appWithPositions.summary.debt?.value}
					<TokenBalance
						symbol={appWithPositions.summary.debt.currency}
						balance={appWithPositions.summary.debt.value}
						format="fiat"
						isDebt={true}
					/>
				{/if}
			{/if}
			{#each appWithPositions.views as view, j (view.id)}
				<div
					class="card defi-protocol layout-{computedLayout}"
					style={cardStyle(appWithPositions.colors ?? appWithPositions.app?.colors ?? [])}
					transition:scale|global
					animate:flip|local={{duration: 300, delay: Math.abs(i + j * 0.1) * 10}}
				>
					<div class="bar wrap">
						<h5 class:card-annotation={computedLayout === 'horizontal-alternate'} class="row">
							{#if appWithPositions.images?.[0]}
								<img class="card-background" src={appWithPositions.images[0]} alt={appWithPositions.name} width="20" />
							{/if}
							{#if appWithPositions.icon}<img src={appWithPositions.icon} alt={appWithPositions.name} width="20"/>{/if}
							<!-- {#if appWithPositions.images}<img src={appWithPositions.images[0]} alt={appWithPositions.name} width="20"/>{/if} -->
							<span>
								<a href="/apps/{appWithPositions.app?.slug}/account/{address}">{appWithPositions.app?.name ?? appWithPositions.name}</a>
								{#if view.name && !(appWithPositions.app?.name && appWithPositions.app.name === view.name)} › {view.name}{/if}
							</span>
						</h5>

						{#if view.summary}
							<div class="summary">
								{#if view.summary.assets?.value}
									<TokenBalance
										symbol={view.summary.assets.currency}
										balance={view.summary.assets.value}
										format="fiat"
									/>
								{/if}

								{#if view.summary.debt?.value}
									<TokenBalance
										symbol={view.summary.debt.currency}
										balance={view.summary.debt.value}
										format="fiat"
										isDebt={true}
									/>
								{/if}
							</div>
						{/if}

						{#if 'source' in view && view.source}
							<span class="card-annotation">
								{#if view.source.contractAddress}
									<Address {network} address={view.source.contractAddress}>{view.source.name}</Address>
								{:else}
									{view.source.name}
								{/if}
							</span>
						{/if}
					</div>

					{#if computedLayout === 'vertical'}
						<hr>
					{/if}

					<div class="defi-protocol-balances column">
						{#each view.positions ?? [] as position}
							<div class="defi-protocol-balance card column">
								<!-- V2 -->
								<header class="bar" title={`${position.tags?.[0] ? `${formatKebabCase(position.tags[0])}: ` : ''}${position.name} (${formatKebabCase(position.type)})`}>
									<h6>
										{#if position.type === 'contract-position' || position.type === 'app-token'}
											<AddressWithLabel
												{network}
												{address}
												label={position.name}
												format="middle-truncated"
											/>
										{:else}
											{position.name}
										{/if}
									</h6>

									<span class="card-annotation">
										{position.tags?.[0] ? formatKebabCase(position.tags[0]) : ''}
									</span>
								</header>

								{#if position.type === 'app-token'}
									<div class="bar">
										<!-- V2 -->
										{#if position.type === 'app-token'}
											<TokenBalanceWithConversion
												{tokenBalanceFormat}

												{network}
												erc20Token={position.tokenWithBalance.token}

												balance={Number(position.tokenWithBalance.balance) * 0.1 ** position.tokenWithBalance.token.decimals}

												convertedValue={position.tokenWithBalance.conversion?.value}
												conversionCurrency={position.tokenWithBalance.conversion?.currency}
												conversionRate={position.tokenWithBalance.conversion?.rate}

												isDebt={position.tokenWithBalance.balance < 0n}
											/>
										{/if}

										<!-- V1 -->
										<!-- <TokenBalanceWithConversion
											{tokenBalanceFormat}

											{network}
											erc20Token={position.tokenWithBalance.token}

											balance={position.tokenWithBalance.balance}

											convertedValue={position.tokenWithBalance.conversion?.value}
											conversionCurrency={position.tokenWithBalance.conversion?.currency}
											conversionRate={position.tokenWithBalance.conversion?.rate}

											isDebt={position.tokenWithBalance.balance < 0n}
										/> -->

										{#if showActions}
											<!-- V1 -->
											<!-- <div transition:scale|global>
												{#if position.type === 'claimable'}
													<button class="small">Claim</button>
												{:else if position.type === 'pool'}
													<button class="small">Remove Liquidity</button>
												{:else if position.type === 'vault'}
													<button class="small">Withdraw</button>
												{:else if position.type === 'interest-bearing'}
													<button class="small">Withdraw Collateral</button>
												{:else if position.type === 'wallet'}
													<!-- Don't count as part of total -- >
												{:else}
													{position.type}
												{/if}
											</div> -->
										{:else}
											<!-- V2 -->
											<!-- <span class="card-annotation">
												{formatKebabCase(position.type)}
											</span> -->
											<!-- <span class="card-annotation">
												{formatKebabCase(position.tags?.[0])}
												({formatKebabCase(position.type)})
											</span> -->

											<!-- V1 -->
											<!-- {#if position.name && position.name !== position.tokenWithBalance.token.symbol}
												<span class="card-annotation">{position.name}</span>
											{:else}
												<span class="card-annotation">
													{type}{position.tags?.[0] && position.type !== position.tags?.[0] ? ` ${position.tags?.[0]}` : ''}
												</span>
											{/if} -->
										{/if}
									</div>
								{/if}

								<!-- Underlying Assets -->
								{#if position.subpositions?.length && (showUnderlyingAssets || position.type === 'contract-position')}
									<div class="underlying">
										{#each position.subpositions as subposition}
											<span class="underlying-asset" in:scaleFont|global>
												<!-- <span class="underlying-symbol">┖</span> -->

												<!-- V2 -->
												<TokenBalanceWithConversion
													{tokenBalanceFormat}

													{network}
													erc20Token={subposition.tokenWithBalance.token}

													balance={Number(subposition.tokenWithBalance.balance) * 0.1 ** subposition.tokenWithBalance.token.decimals}

													convertedValue={subposition.tokenWithBalance.conversion?.value}
													conversionCurrency={subposition.tokenWithBalance.conversion?.currency}
													conversionRate={subposition.tokenWithBalance.conversion?.rate}

													isDebt={subposition.tokenWithBalance.balance < 0n}
												/>

												<!-- V1 -->
												<!-- <TokenBalanceWithConversion
													{tokenBalanceFormat}

													{network}
													erc20Token={subposition.tokenWithBalance.token}

													balance={subposition.tokenWithBalance.balance}

													convertedValue={subposition.tokenWithBalance.conversion?.value}
													conversionCurrency={subposition.tokenWithBalance.conversion?.currency}
													conversionRate={subposition.tokenWithBalance.conversion?.rate}

													isDebt={subposition.tokenWithBalance.balance < 0n}
												/>
												{#if subposition.metadata.weight}
													<small>({formatPercent(subposition.metadata.weight)})</small>
												{/if}
												{#if subposition.label}{subposition.label}{/if} -->
											</span>

											<!-- {#if showMetadata && position.metadata?.length}
												<hr>
			
												<dl class="metadata">
													{#each position.metadata as item}
														<dt>{formatIdentifierToWords(item.label, true)}</dt>
														<dd>
															{#if item.value === undefined}
																-
															{:else if item.type === 'currency'}
																<TokenBalance
																	symbol={item.currency}
																	balance={Number(item.value)}
																	isDebt={item.label === 'Debt'}
																	format="fiat"
																/>
															{:else if item.type === 'number'}
																{#if item.format === 'percent'}
																	{formatPercent(item.value)}
																{:else}
																	{item.value}
																{/if}
															{:else if item.type === 'other'}
																{#if Array.isArray(item.value)}
																	{#each item.value as value}
																		<p>{value}</p>
																	{/each}
																{:else}
																	{item.value}
																{/if}
															{/if}
														</dd>
													{/each}
												</dl>
											{/if} -->
										{/each}
									</div>
								{/if}

								{#if showMetadata && position.metadata?.length}
									<hr>

									<dl class="metadata">
										{#each position.metadata as item}
											<dt>{formatIdentifierToWords(item.label, true)}</dt>
											<dd>
												{#if item.value === undefined}
													-
												{:else if item.type === 'currency'}
													<TokenBalance
														symbol={item.currency}
														balance={Number(item.value)}
														isDebt={item.label === 'Debt'}
														format="fiat"
													/>
												{:else if item.type === 'number'}
													{#if item.format === 'percent'}
														{formatPercent(item.value)}
													{:else}
														{item.value}
													{/if}
												{:else if item.type === 'other'}
													{#if Array.isArray(item.value)}
														{#each item.value as value}
															<p>{value}</p>
														{/each}
													{:else}
														{item.value}
													{/if}
												{/if}
											</dd>
										{/each}
									</dl>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/each}
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
