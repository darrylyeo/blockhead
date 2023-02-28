<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { DeFiProvider } from '../data/defi-provider'
	import type { QuoteCurrency } from '../data/currency/currency'
	import type { Web3AppConfig } from '../data/web3Apps'
	import { web3AppsByProviderName } from '../data/web3Apps'
	import { networksByChainID } from '../data/ethereum/networks'
	import { getDefiBalances } from '../api/zerion/defiSdk'
	import type { ZapperAppId, ZapperAppConfig, ZapperAppBalance } from '../data/zapper/zapper'
	import { getAllApps, getDefiBalancesForApps, chainIdByNetworkName } from '../data/zapper/zapper'


	// Data
	export let web3Apps: Web3AppConfig[]
	export let network: Ethereum.Network
	export let provider: Ethereum.Provider
	export let address: string
	export let defiProvider: DeFiProvider = 'Zapper'
	export let quoteCurrency: QuoteCurrency


	// Computed Values
	let zapperFiatRates
	// $: if(defiProvider === 'Zapper' && quoteCurrency !== 'USD')
	// 	getFiatRates().then(_ => zapperFiatRates = _)
	$: zapperQuoteCurrency = zapperFiatRates ? quoteCurrency : 'USD' 
	$: zapperFiatRate = zapperFiatRates?.[quoteCurrency] ?? 1

	let allZapperAppConfigs: Partial<Record<ZapperAppId, ZapperAppConfig>>
	$: if(defiProvider === 'Zapper')
		getAllApps().then(_ => allZapperAppConfigs = Object.fromEntries(_.map(app => [app.id, app])))

	export let summary: {
		quoteTotal: number,
		defiAppsCount: number,
		quoteTotalCurrency: QuoteCurrency
	}

	let zerionDefiBalances: Awaited<ReturnType<typeof getDefiBalances>>
	let zapperDefiBalances: ({ appId: ZapperAppId } & ZapperAppBalance)[]

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
	
	export let isOpen: boolean

	
	import { formatPercent } from '../utils/format-percent'
	import { formatUnits } from '../utils/format-units'
	import { formatKebabCase } from '../utils/formatKebabCase';


	$: defiBalancesDescription = web3Apps?.map(({name}) => name).join('/') || `${network.name} DeFi`


	import AddressWithLabel from './AddressWithLabel.svelte'
	import Loader from './Loader.svelte'
	import Loading from './Loading.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'
	import TokenIcon from './TokenIcon.svelte'


	import { cardStyle } from '../utils/card-background'
	import { flip } from 'svelte/animate'
	import { scale } from 'svelte/transition'
	import { scaleFont } from '../transitions/scale-font'


	import { ZapperIcon, ZerionIcon } from '../assets/icons'
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
</style>

{#if network && address}
	<!-- Zapper -->
	{#if defiProvider === 'Zapper' || network.chainId !== 1}
		<Loader
			layout="collapsible"
			collapsibleType="label"
			loadingMessage="Reading {defiBalancesDescription} balances from {defiProvider}..."
			errorMessage="Error getting {defiBalancesDescription} balances from {defiProvider}."
			loadingIconName={defiProvider}
			loadingIcon={ZapperIcon}
			fromStore={() => getDefiBalancesForApps({
				// appIds: web3Apps?.flatMap(({views}) => views.flatMap(({providers}) => providers?.zapper ?? [])),
				network,
				address,
				asStore: true
			})}
			then={zapperDefiBalances => [...zapperDefiBalances.values()].filter(({ products } ) => products.length)}
			bind:result={zapperDefiBalances}
			let:result={zapperDefiBalances}
			{isOpen}
		>
			<svelte:fragment slot="header" let:status let:loadingMessage let:errorMessage>
				<slot name="header" {zapperDefiBalances} {summary} {status} {loadingMessage} {errorMessage} />
			</svelte:fragment>

			<div class="defi-balances column" class:scrollable-list={isScrollable && zapperDefiBalances.flatMap(({products}) => products).length > 6}>
				{#each zapperDefiBalances as {appId, products, meta}, i}
					{@const web3AppConfig = web3AppsByProviderName.zapper?.[appId]}
					{@const erc20Token = web3AppConfig?.views?.flatMap(view => view.erc20Tokens ?? [])[0]}
					{@const zapperAppConfig = allZapperAppConfigs?.[appId]}

					{#each products as {
						label, assets, meta: productMeta,
					}, j (label)}
						<div
							class="card defi-protocol"
							style={cardStyle(web3AppConfig?.colors ?? (zapperAppConfig?.primaryColor ? [zapperAppConfig?.primaryColor] : []))}
							transition:scale
							animate:flip|local={{duration: 300, delay: Math.abs(i + j * 0.1) * 10}}
						>
							<div class="bar">
								<h5 class:card-annotation={computedLayout === 'horizontal-alternate'} class="row">
									{#if assets[0]?.appImgUrl}
										<img class="card-background" src={assets[0].appImgUrl} alt={label} width="20"/>
									<!-- {:else if assets[0]?.symbol}
										<span class="card-background"><TokenIcon {network} symbol={assets[0].protocolSymbol} /></span> -->
									{/if}
									{#if erc20Token}<TokenIcon {network} {erc20Token} />{/if}
									<span>
										<a href="/apps/{web3AppConfig?.slug ?? appId}/address/{address}">{web3AppConfig?.name ?? label}</a>
										{#if web3AppConfig?.name && web3AppConfig.name !== label} › {label}{/if}
									</span>
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
									// V2
									key,
									type, appId, groupId,
									network: networkName, symbol, address, name, decimals,
									supply,
									tokens,
									pricePerShare, price,
									dataProps: {
										liquidity,
										reserves,
										apy
									} = {},
									displayProps: {
										label,
										secondaryLabel,
										images,
										statsItems
									} = {},
									balance, balanceRaw, balanceUSD,

									// V1
									// type, category,
									// label,
									// symbol, tokenAddress, img, decimals, address,
									// balance, balanceUSD, balanceRaw, price,
									// protocol, protocolDisplay, protocolSymbol, protocolImg,
									// // type === 'vault' || type === 'pool'
									// tokens,
									// // type === 'vault'
									// apy,
									// // type === 'pool'
									// reserve, share, supply
								}}
									{@const network = networksByChainID[chainIdByNetworkName[networkName] ?? 1]}

									<div class="defi-protocol-balance card column">
										<!-- V2 -->
										<header class="bar" title="{formatKebabCase(groupId)}: {label} ({formatKebabCase(type)})">
											<h6>
												{#if type === 'contract-position'}
													<AddressWithLabel
														{network}
														{address}
														{label}
														format="middle-truncated"
													/>
												<!-- {:else if type === 'app-token'}
													{formatKebabCase(groupId)} -->
												{:else}
													{label}
												{/if}
											</h6>

											<span class="card-annotation">
												{formatKebabCase(groupId)}
												<!-- ({formatKebabCase(type)}) -->
											</span>
										</header>

										{#if type === 'app-token'}
										<div class="bar">
											<!-- V2 -->
											{#if type === 'app-token'}
												<TokenBalanceWithConversion
													{tokenBalanceFormat}

													{network}
													{symbol}
													{address}
													{name}
													icon={images[0]}
													
													{decimals}
													balance={balanceRaw && Number.isInteger(Number(balanceRaw)) ? formatUnits(balanceRaw, decimals) : balance}
													convertedValue={balanceUSD * zapperFiatRate}
													conversionCurrency={zapperQuoteCurrency}
													conversionRate={price * zapperFiatRate}

													isDebt={balanceUSD < 0}
												/>
											{/if}

											<!-- V1 -->
											<!-- <TokenBalanceWithConversion
												{tokenBalanceFormat}

												{symbol}
												address={tokenAddress || address}
												icon={`https://zapper.fi/images/${img}`}

												balance={balanceRaw && Number.isInteger(Number(balanceRaw)) ? formatUnits(balanceRaw, decimals) : balance}
												convertedValue={balanceUSD * zapperFiatRate}
												conversionCurrency={zapperQuoteCurrency}
												conversionRate={price * zapperFiatRate}

												isDebt={balanceUSD < 0}
											/> -->

											{#if showActions}
												<!-- V1 -->
												<!-- <div transition:scale>
													{#if type === 'claimable'}
														<button class="small">Claim</button>
													{:else if type === 'pool'}
														<button class="small">Remove Liquidity</button>
													{:else if type === 'vault'}
														<button class="small">Withdraw</button>
													{:else if type === 'interest-bearing'}
														<button class="small">Withdraw Collateral</button>
													{:else if type === 'wallet'}
														<!-- Don't count as part of total -- >
													{:else}
														{type}
													{/if}
												</div> -->
											{:else}
												<!-- V2 -->
												<!-- <span class="card-annotation">
													{formatKebabCase(type)}
												</span> -->
												<!-- <span class="card-annotation">
													{formatKebabCase(groupId)}
													({formatKebabCase(type)})
												</span> -->

												<!-- V1 -->
												<!-- {#if label && label !== symbol}
													<span class="card-annotation">{label}</span>
												{:else}
													<span class="card-annotation">
														{type}{category && type !== category ? ` ${category}` : ''}
													</span>
												{/if} -->
											{/if}
										</div>
										{/if}

										<!-- Underlying Assets -->
										{#if tokens?.length && (showUnderlyingAssets || type === 'contract-position')}
											<div class="underlying">
												{#each tokens as {
													// V2
													id, type, appId, groupId,
													price, supply,
													network: networkName, symbol, name, address, decimals,
													tokens: innerTokens,
													dataProps: {
														// liquidity,
													} = {},
													displayProps: {
														// label,
														// images,
														// statsItems,
														// secondaryLabel,
													} = {},
													pricePerShare,
													balance, balanceRaw, balanceUSD

													// V1
													// // address, balance, balanceRaw, balanceUSD, category, decimals, img, label, metaType, network, price, symbol, tokenImageUrl, type,
													// // address, decimals, symbol, img,
													// label,
													// address, decimals, symbol, tokenImageUrl,
													// balance, balanceUSD, balanceRaw, price,
													// reserve, weight,
													// isCToken
												}}
													{@const network = networksByChainID[chainIdByNetworkName[networkName] ?? 1]}

													<span class="underlying-asset" in:scaleFont>
														<!-- <span class="underlying-symbol">┖</span> -->

														<!-- V2 -->
														<TokenBalanceWithConversion
															{tokenBalanceFormat}

															{network}
															{symbol}
															icon={images?.[0]}
															{name}
															{address}
															{decimals}

															balance={balanceRaw && Number.isInteger(Number(balanceRaw)) ? formatUnits(balanceRaw, decimals) : balance}
															convertedValue={balanceUSD * zapperFiatRate}
															conversionCurrency={zapperQuoteCurrency}
															conversionRate={price * zapperFiatRate}

															isDebt={balanceUSD < 0}
														/>

														<!-- V1 -->
														<!-- <TokenBalanceWithConversion
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
														{#if label}{label}{/if} -->
														</span>
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
	{/if}

	<!-- Zerion DeFi SDK -->
	{#if defiProvider === 'Zerion DeFi SDK'	&& network.chainId === 1}
		{#if provider}
			<Loader
				layout="collapsible"
				collapsibleType="label"
				loadingMessage="Reading {defiBalancesDescription} balances from {defiProvider}..."
				loadingIcon={ZerionIcon}
				errorMessage="Error getting {defiBalancesDescription} balances from {defiProvider}."
				fromPromise={() => getDefiBalances({
					protocolNames: web3Apps?.flatMap(({views}) => views.flatMap(({providers}) => providers?.zerionDefiSDK ?? [])),
					network,
					provider,
					address
				})}
				bind:result={zerionDefiBalances}
				let:result={defiBalances}
				{isOpen}
			>
				<!-- <NetworkIcon slot="loadingIcon" {network} /> -->

				<svelte:fragment slot="header" let:status let:loadingMessage let:errorMessage>
					<slot name="header" {defiBalances} {summary} {status} {loadingMessage} {errorMessage} />
				</svelte:fragment>

				<div class="defi-balances column">
					{#each defiBalances as {
						adapterBalances, metadata,
					}, i (metadata.name + i)}
						{@const web3AppConfig = web3AppsByProviderName.zerionDefiSDK?.[metadata.name]}
						{@const erc20Token = web3AppConfig?.views?.flatMap(view => view.erc20Tokens ?? [])[0]}

						<div
							class="card defi-protocol layout-{computedLayout}"
							style={cardStyle(web3AppConfig?.colors)}
							transition:scaleFont|local
							animate:flip|local={{duration: 300, delay: Math.abs(i) * 10}}
						>
							<h5 class:card-annotation={computedLayout === 'horizontal-alternate'} class="row" title="{metadata.description}">
								{#if metadata.iconURL}
									<img class="card-background" src={`https://${metadata.iconURL}`} alt={metadata.name} />
									<!-- <img src={`https://${metadata.iconURL}`} alt={metadata.name} width="20" />
								{:else if erc20Token}
									<span class="card-background"><TokenIcon {network} {erc20Token} /></span> -->
								{:else}
									<TokenIcon {network} {erc20Token} />
								{/if}
								<a href="/apps/{web3AppConfig?.slug}/address/{address}">{metadata.name}</a>
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
														<span class="underlying-asset" in:scaleFont>
															<!-- <span class="underlying-symbol">┖</span> -->
															<TokenBalance
																symbol={underlyingBalance.metadata.symbol}
																address={underlyingBalance.metadata.token}
																balance={formatUnits(underlyingBalance.amount, underlyingBalance.metadata.decimals)}
																isDebt={adapterBalance.metadata.adapterType === 'Debt'}
															/>
														</span>
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