<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'
	import type { AppWithDefiPositions } from '../data/defiPositions'


	// Inputs
	export let appsWithPositions: AppWithDefiPositions[] | undefined
	export let network: Ethereum.Network
	export let address: Ethereum.Address

	// (View options)
	type Layout = 'horizontal' | 'horizontal-alternate' | 'vertical'
	export let layout: Layout | 'auto' = 'auto'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showUnderlyingAssets = true
	export let showMetadata = true
	export let showActions = false
	export let isScrollable = false
	export let showApps = true

	// (Computed)
	let computedLayout: Layout
	$: computedLayout = layout === 'auto'
		? 'vertical'
		// ? showUnderlyingAssets ? 'vertical' : 'horizontal' // 'horizontal-alternate'
		: layout


	// Functions
	import { formatPercent } from '../utils/formatPercent'
	import { formatKebabCase } from '../utils/formatKebabCase'
	import { formatIdentifierToWords } from '../utils/formatIdentifierToWords'


	// Components
	import Address from './Address.svelte'
	import AddressWithLabel from './AddressWithLabel.svelte'
	import Collapsible from './Collapsible.svelte'
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


<div class="defi-balances column" class:scrollable-list={isScrollable && appsWithPositions && appsWithPositions?.length > 6}>
	{#each appsWithPositions ?? [] as appWithPositions, i (appWithPositions.id ?? appWithPositions.app?.slug)}
		<Collapsible
			type="label"
			containerClass="card"
			class="column"
			isOpen
			showContentsOnly={!showApps}
			showTriggerText={false}
			style={cardStyle(appWithPositions.colors ?? appWithPositions.app?.colors ?? [])}
		>
			<svelte:fragment slot="title">
				<h4 class="row">
					{#if appWithPositions.images?.[0]}
						<img class="card-background" src={appWithPositions.images[0]} alt={appWithPositions.name} width="20" />
					{/if}
					{#if appWithPositions.icon}<img src={appWithPositions.icon} alt={appWithPositions.name} width="20" />{/if}
					<a href="/apps/{appWithPositions.app?.slug}/account/{address}">{appWithPositions.app?.name ?? appWithPositions.name}</a>
				</h4>
			</svelte:fragment>

			<svelte:fragment slot="header-right">
				{#if appWithPositions.summary}
					<div class="summary">
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
					</div>
				{/if}
			</svelte:fragment>

			{#each appWithPositions.views as view, j (view.id)}
				<div
					class="card defi-protocol layout-{computedLayout}"
					style={cardStyle(appWithPositions.colors ?? appWithPositions.app?.colors ?? [])}
					transition:scale
					animate:flip={{duration: 300, delay: Math.abs(i + j * 0.1) * 10}}
				>
					<div class="bar wrap">
						<h5 class:card-annotation={computedLayout === 'horizontal-alternate'} class="row">
							{#if !showApps}
								{#if appWithPositions.images?.[0]}
									<img class="card-background" src={appWithPositions.images[0]} alt={appWithPositions.name} width="20" />
								{/if}
								{#if appWithPositions.icon}<img src={appWithPositions.icon} alt={appWithPositions.name} width="20" />{/if}
							{/if}
							<span>
								{#if !showApps}
									<a href="/apps/{appWithPositions.app?.slug}/account/{address}">{appWithPositions.app?.name ?? appWithPositions.name}</a>
									{#if view.name && !(appWithPositions.app?.name && appWithPositions.app.name === view.name)} › {view.name}{/if}
								{:else}
									{view.name}
								{/if}
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

					<!-- {#if computedLayout === 'vertical'}
						<hr>
					{/if} -->

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
											<!-- <div transition:scale>
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
											<span class="underlying-asset" in:scaleFont>
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
		</Collapsible>
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
