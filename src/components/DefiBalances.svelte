<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { QuoteCurrency } from '../data/currency/currency'
	import type { DefiSDK } from '../data/ethereum/price/defi-sdk'
	import { getDefiBalances } from '../data/ethereum/price/defi-sdk'
	import { getAllDeFiProtocolBalances } from '../data/zapper/zapper'


	// Data
	export let network: Ethereum.Network
	export let provider: Ethereum.Provider
	export let address: string
	export let defiProvider: 'Zapper' | 'Zerion DeFi SDK' = 'Zapper'
	export let quoteCurrency: QuoteCurrency


	// Computed Values
	export let quoteTotal
	type TypeOfPromise<T> = T extends Promise<infer R> ? R : T
	let zapperDefiProtocolBalances: TypeOfPromise<ReturnType<typeof getAllDeFiProtocolBalances>>
	$: if(zapperDefiProtocolBalances)
		quoteTotal = zapperDefiProtocolBalances.reduce((sum, {meta}) => sum + Number(
			meta?.find(({label, type, value}) => label === 'Total')?.value ?? 0
		), 0)


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

	
	import { formatPercent } from '../utils/format-percent'
	import { formatUnits } from '../utils/format-units'


	import Loader from './Loader.svelte'
	import Loading from './Loading.svelte'
	import TokenIcon from './TokenIcon.svelte'
	import TokenValue from './TokenValue.svelte'
	import TokenValueWithConversion from './TokenValueWithConversion.svelte'
	
	import { flip } from 'svelte/animate'
	import { scale } from 'svelte/transition'
	import { scaleFont } from '../transitions/scale-font'

	type ZapperProtocolName = '1inch' | 'Aave' | 'Alchemix' | 'Alpha' | 'B.Protocol' | 'Badger' | 'Balancer' | 'Bancor' | 'BarnBridge' | 'Compound' | 'Cover' | 'Cream' | 'Curve' | 'DefiSaver' | 'DerivaDEX' | 'Dhedge' | 'Dodo' | 'Dynamic Set' | 'Empty Set' | 'Futureswap' | 'Harvest' | 'Hegic' | 'Idle' | 'KeeperDAO' | 'Linkswap' | 'Liquity' | 'Loopring' | 'Maker' | 'Mooniswap' | 'Mushroom' | 'Pickle' | 'PoolTogether' | 'Rari Capital' | 'RealT' | 'Reflexer' | 'S.Finance' | 'Saddle' | 'Shell' | 'Smoothy' | 'SnowSwap' | 'Sushiswap' | 'Swerve' | 'Synthetix' | 'TokenSets' | 'Uniswap' | 'Unit' | 'Value' | 'Vesper' | 'Yearn' | 'dForce' | 'dYdX' | 'xSigma' | 'AutoFarm' | 'Ellipsis' | 'Harvest' | 'PancakeSwap' | 'Venus' | 'Aave' | 'Curve' | 'PoolTogether' | 'Quickswap' | 'Synthetix' | 'Synths' | 'Uniswap V1' | 'Uniswap V2'

	const defiProtocolColors: Record<ZapperProtocolName & DefiSDK.ProtocolName, string[]> = {
		'Aave': ['#77c0c7', '#b56da4'],
		'Aave • Uniswap Market': [],
		'Ampleforth': [],
		'Aragon': [],
		'Balancer': [],
		'Bancor': [],
		'bZx bZx': ['#33dfcc', '#003cda'],
		'Chi Gastoken by 1inch': ['#d21318', '#3d3d3c'],
		'Compound': ['#01d395'],
		'C.R.E.A.M.': [],
		'Curve': [/*'#840000',*/ '#fd2700', '#f9ea02', '#91ff67'/*, '#0213fa'*/], // unofficial
		'DDEX • Lending': [],
		'DDEX • Margin': [],
		'DDEX • Spot': [],
		'DeFi Money Market': [],
		'DODO': [],
		'dYdX': [],
		'Idle': [],
		'iearn.finance (v2/v3)': [],
		'Harvest': [],
		'KeeperDAO': [],
		'KIMCHI': [],
		'KyberDAO': [],
		'Chai': [],
		'Dai Savings Protocol': [],
		'Loopring': ['#1c42ff'],
		'Maker Governance': [],
		'Multi-Collateral Dai': [],
		'Matic': [],
		'Melon': [],
		'mStable': ['#000000'],
		'Nexus Mutual': [],
		'Pickle Finance': [],
		'PieDAO': ['#d90a9d', '#9811dc', '#7732f8', '#28d4ff'], // unofficial
		'PoolTogether': ['#4a31a5'],
		'SashimiSwap': [],
		'SushiSwap': [],
		'Swerve': [],
		'Synthetix': ['#1e1a31'],
		'TokenSets': [],
		'SetToken V2': [],
		'Uniswap V1': [],
		'Uniswap V2': ['#ff007a'],
		'Yearn': ['#0273f6', '#075fb9'],
		'yearn.finance • Vaults': ['#0273f6', '#075fb9'], // unofficial
		'0x Staking': []
	}

	const makeCardGradient = (colors = []) =>
		`linear-gradient(155deg, ${colors.length == 1 ? [`${colors[0]}20`, `${colors[0]}55`] : colors.map(color => `${color}50`)}`
</script>

<style>
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

	.metadata {
		font-size: 0.8em;
		line-height: 1.25;
		row-gap: 0.5em;
		opacity: 0.8;
	}
</style>

{#if provider && address}
	<!-- Zapper -->
	{#if defiProvider === 'Zapper'}
		<Loader
			loadingMessage="Reading {network.name} DeFi balances from {defiProvider}..."
			errorMessage="Error getting {network.name} DeFi balances from {defiProvider}."
			loadingIconName={defiProvider}
			loadingIcon={'/logos/zapper-logomark.svg'}
			fromPromise={() => getAllDeFiProtocolBalances({network, address})}
			bind:result={zapperDefiProtocolBalances}
			let:then={defiProtocolBalances}
			showIf={protocolBalances => protocolBalances.length}
			{isCollapsed}
		>
			<svelte:fragment slot="header" let:status>
				{#if status === 'resolved' && defiProtocolBalances.length}
					<slot name="header" {quoteTotal}></slot>
				{/if}
			</svelte:fragment>

			<div class="defi-balances">
				{#each defiProtocolBalances as {products, meta}, i}
					{#each products as {label, assets, meta: productMeta}, j (label)}
						<div transition:scaleFont|local animate:flip|local={{duration: 300, delay: Math.abs(i + j * 0.1) * 10}} class="card defi-protocol" style="--card-background-image: {makeCardGradient(defiProtocolColors[label])}); --primary-color: {defiProtocolColors[label]?.[defiProtocolColors[label].length / 2 | 0] ?? 'inherit'}">
							{#if assets[0]?.protocolImg}
								<img class="card-background" src={`https://zapper.fi/images/${assets[0].protocolImg}`} alt={label} width="20"/>
							{:else if assets[0]?.protocolSymbol}
								<span class="card-background"><TokenIcon token={assets[0].protocolSymbol} /></span>
							{/if}
							<div class="bar">
								<h5 class:card-annotation={computedLayout === 'horizontal-alternate'} title="{label}">{label}</h5>
								{#each meta as {label, type, value}}
									{#if label === 'Assets'}
										<TokenValue
											token={'USD'}
											value={value}
											showPlainFiat={true}
										/>
									{:else if label === 'Debt' && value}
										<TokenValue
											token={'USD'}
											value={value}
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
													token={'USD'}
													value={value}
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

												token={symbol}
												tokenIcon={`https://zapper.fi/images/${img}`}
												tokenAddress={tokenAddress || address}
												value={balanceRaw && Number.isInteger(Number(balanceRaw)) ? formatUnits(balanceRaw, decimals) : balance}

												convertedValue={balanceUSD}
												conversionCurrency={'USD'}
												conversionRate={price}
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
													<p in:scaleFont>
														<span class="underlying-symbol">┖</span>
														<TokenValueWithConversion
															{showValues}
				
															token={symbol}
															tokenIcon={`https://zapper.fi/images/${img}`}
															tokenAddress={tokenAddress || address}
															value={balanceRaw && Number.isInteger(Number(balanceRaw)) ? formatUnits(balanceRaw, decimals) : balance}
				
															convertedValue={balanceUSD}
															conversionCurrency={'USD'}
															conversionRate={price}
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
														token={'USD'}
														value={value}
														isDebt={label === 'Debt'}
														showPlainFiat={true}
													/>
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
			{#if quoteCurrency !== 'USD'}
				<small class="card row" transition:scale>
					<img src="/logos/zapper-logomark.svg" width="25" height="25" />
					Note: The Zapper API doesn't yet support currencies other than US Dollars.
				</small>
			{/if}

			<!-- {#each protocolBalances as {products: [{label, assets, meta: productMeta}], meta}}
				<h4>{label}</h4>
				{#each assets as {type, address, balance, balanceUSD, symbol, price, img, label, reserve}}
					{type}
					<TokenValue
						token={symbol}
						tokenAddress={address}
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
	{/if}

	<!-- Zerion DeFi SDK -->
	{#if defiProvider === 'Zerion DeFi SDK' && network.chainId === 1}
		{#if provider}
			<Loader
				loadingMessage="Reading {network.name} DeFi balances from {defiProvider}..."
				errorMessage="Error getting {network.name} DeFi balances from {defiProvider}."
				fromPromise={() => getDefiBalances(provider, address)}
				let:then={defiBalances}
				showIf={defiBalances => defiBalances.length}
				{isCollapsed}
			>
				<TokenIcon slot="loadingIcon" token="ETH" />
				<!-- <svelte:fragment slot="loadingIcon"><TokenIcon slot="icon" {token} /></svelte:fragment> -->

				<svelte:fragment slot="header" let:status>
					{#if defiBalances.length}
						<slot name="header" {network} {quoteCurrency} {quoteTotal}></slot>
					{/if}
				</svelte:fragment>

				<div class="defi-balances">
					{#each defiBalances as protocol, i (protocol.metadata.name)}
						<div transition:scaleFont|local animate:flip|local={{duration: 300, delay: Math.abs(i) * 10}} class="card defi-protocol layout-{computedLayout}" style="--card-background-image: {makeCardGradient(defiProtocolColors[protocol.metadata.name])})">
							<h5 class:card-annotation={computedLayout === 'horizontal-alternate'} title="{protocol.metadata.description}"><img class="card-background" src={`https://${protocol.metadata.iconURL}`} alt={protocol.metadata.name} width="20"/> {protocol.metadata.name}</h5>
							{#if computedLayout === 'vertical'}
								<hr>
							{/if}
							<div class="defi-protocol-balances column">
								{#each protocol.adapterBalances as adapterBalance}
									<!-- {#if adapterBalance.metadata.adapterType === 'Debt'}
										<h4>{adapterBalance.metadata.adapterType}</h4>
									{/if} -->
									{#each adapterBalance.balances as {base: baseBalance, underlying}}
										<div class="column defi-protocol-balance">
											<TokenValue
												token={baseBalance.metadata.symbol}
												tokenAddress={baseBalance.metadata.token}
												value={formatUnits(baseBalance.amount, baseBalance.metadata.decimals)}
												isDebt={adapterBalance.metadata.adapterType === 'Debt'}
											/>
											{#if underlying.length && showUnderlyingAssets}
												<div class="underlying">
													{#each underlying as underlyingBalance}
														<p in:scaleFont>
															<span class="underlying-symbol">┖</span>
															<TokenValue
																token={underlyingBalance.metadata.symbol}
																tokenAddress={underlyingBalance.metadata.token}
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
					{/each}
				</div>
			</Loader>
		{:else}
			<Loading>Connecting to the blockchain...</Loading>
		{/if}
	{/if}
{/if}