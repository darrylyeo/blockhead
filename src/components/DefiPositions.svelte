<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { AppWithDefiPositions } from '$/data/defiPositions'


	// Inputs
	export let appsWithPositions: AppWithDefiPositions[]
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
	import { formatPercent } from '$/utils/formatPercent'
	import { formatKebabCase } from '$/utils/formatKebabCase'
	import { formatIdentifierToWords } from '$/utils/formatIdentifierToWords'
	import { isTruthy } from '$/utils/isTruthy'


	// Components
	import Address from './Address.svelte'
	import AddressWithLabel from './AddressWithLabel.svelte'
	import Collapsible from './Collapsible.svelte'
	import Icon from './Icon.svelte'
	import ScrollContainer from './ScrollContainer.svelte'
	import SizeContainer from './SizeContainer.svelte'
	import TokenBalance from './TokenBalance.svelte'
	import TokenBalanceWithConversion from './TokenBalanceWithConversion.svelte'


	// Transitions/styling
	import { cardStyle } from '$/utils/card-background'
	import { flip } from 'svelte/animate'
	import { scale } from 'svelte/transition'
	import { scaleFont } from '$/transitions/scale-font'
</script>


<style>
	.view {
		:global([data-collapsible-container].layout-horizontal) {
			display: flex;
			flex-wrap: wrap;
			align-items: baseline;
		}
		:global([data-collapsible-container]:is(.layout-horizontal, .layout-horizontal-alternate) > [data-collapsible-trigger]) {
			flex: 1 auto;
		}
		:global([data-collapsible-container].layout-horizontal-alternate) {
			display: flex;
			flex-wrap: wrap;
			flex-direction: row-reverse;
			justify-content: flex-end;
		}
		:global([data-collapsible-container].layout-horizontal-alternate .card-annotation) {
			font-weight: normal;
			/* order: 1; */
			line-height: 1.5;
		}
	}

	.position {
		position: relative;
		overflow: hidden;
	}

	h4, h5 {
		--icon-size: 1.5em;
		height: 1.5em;
	}

	.metadata {
		font-size: 0.8em;
		line-height: 1.25;
		row-gap: 0.5em;
		opacity: 0.8;
	}

	.summary {
		font-size: 0.8em;
	}

	.subpositions {
		font-size: 0.8em;

		gap: 0.7em;
		padding: 0 0.3em;

		display: grid;
		justify-items: start;
		grid-template-columns: repeat(auto-fit, minmax(min(7rem, 100%), 1fr));

		.underlying-asset {
			gap: 0.3em;

			&:before {
				opacity: 0.8;
			}
		}
	}

	.faded {
		opacity: 0.8;
	}
</style>


<ScrollContainer
	isScrollEnabled={isScrollable && appsWithPositions?.length > 6}
	class="defi-balances column"
>
	{#each (
		appsWithPositions
			.map(app => ({
				...app,
				summary: app.summary ?? {
					assets: (
						app.views.some(view => view.summary?.assets?.value)
							? {
								value: (
									app.views.reduce((acc, view) => acc + (view.summary?.assets?.value ?? 0), 0)
								),
								currency: app.views[0].summary?.assets?.currency,
							}
							: undefined
					),
					debt: (
						app.views.some(view => view.summary?.debt?.value)
							? {
								value: (
									app.views.reduce((acc, view) => acc + (view.summary?.debt?.value ?? 0), 0)
								),
								currency: app.views[0].summary?.debt?.currency,
							}
							: undefined
					),
				},
			}))
			.sort((a, b) => (
				(b.summary?.assets?.value ?? 0) - (a.summary?.assets?.value ?? 0)
			))
	) as appWithPositions, i (appWithPositions.id ?? appWithPositions.app?.slug)}
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

					{#if appWithPositions.icon || appWithPositions.app?.icon}
						<Icon
							imageSources={
								[
									appWithPositions.icon,
									appWithPositions.app?.icon
								]
									.filter(isTruthy)
							}
							title={appWithPositions.name}
						/>
					{/if}

					{#if appWithPositions.app}
						<a href="/apps/{appWithPositions.app.slug}/network/{network.slug}/account/{address}">{appWithPositions.app.name}</a>
					{:else}
						{appWithPositions.name}
					{/if}
				</h4>
			</svelte:fragment>

			<svelte:fragment slot="header-right">
				{#if appWithPositions.summary}
					<div class="summary">
						{#if appWithPositions.summary.assets?.value}
							<TokenBalance
								format="fiat"
								token={{
									symbol: appWithPositions.summary.assets.currency,
								}}
								balance={appWithPositions.summary.assets.value}
							/>
						{/if}

						{#if appWithPositions.summary.debt?.value}
							<TokenBalance
								format="fiat"
								token={{
									symbol: appWithPositions.summary.debt.currency,
								}}
								balance={appWithPositions.summary.debt.value}
								isDebt={true}
							/>
						{/if}
					</div>
				{/if}
			</svelte:fragment>

			{#each appWithPositions.views as view, j (view.id)}
				{#if showApps}<hr>{/if}

				<svelte:element
					this={showApps ? 'section' : 'article'}
					class="view"
					class:card={!showApps}
					style={cardStyle(appWithPositions.colors ?? appWithPositions.app?.colors ?? [])}
					transition:scale
				>
				<!-- animate:flip={{duration: 300, delay: Math.abs(i + j * 0.1) * 10}} -->
					<Collapsible
						type="label"
						containerClass="column layout-{computedLayout}"
						isOpen
						canToggle={computedLayout === 'vertical'}
						showTriggerText={false}
					>
						<svelte:fragment slot="title">
							<h5 class:card-annotation={computedLayout === 'horizontal-alternate'} class="row">
								{#if !showApps}
									{#if appWithPositions.images?.[0]}
										<img class="card-background" src={appWithPositions.images[0]} alt={appWithPositions.name} width="20" />
									{/if}

									{#if appWithPositions.icon || appWithPositions.app?.icon}
										<Icon
											imageSources={
												[
													appWithPositions.icon,
													appWithPositions.app?.icon
												]
													.filter(isTruthy)
											}
											title={appWithPositions.name}
										/>
									{/if}
								{/if}
								<span>
									{#if !showApps && appWithPositions.app}
										<a href={`/apps/${appWithPositions.app.slug}/network/${network.slug}/account/${address}`}>{appWithPositions.app.name ?? appWithPositions.name}</a>
										{#if view.name && !(appWithPositions.app.name && appWithPositions.app.name === view.name)} › {view.name}{/if}
									{:else if view.name}
										{view.name}
									{/if}
								</span>
							</h5>
						</svelte:fragment>

						<svelte:fragment slot="header-right">
							{#if view.summary}
								<div class="summary">
									{#if view.summary.assets?.value}
										<TokenBalance
											format="fiat"
											token={{
												symbol: view.summary.assets.currency,
											}}
											balance={view.summary.assets.value}
										/>
									{/if}

									{#if view.summary.debt?.value}
										<TokenBalance
											format="fiat"
											token={{
												symbol: view.summary.debt.currency,
											}}
											balance={view.summary.debt.value}
											isDebt={true}
										/>
									{/if}
								</div>
							{/if}

							{#if view.source}
								<span class="card-annotation">
									{#if view.source.contractAddress}
										<Address {network} address={view.source.contractAddress}>{view.source.name}</Address>
									{:else}
										{view.source.name}
									{/if}
								</span>
							{/if}
						</svelte:fragment>

						<!-- {#if computedLayout === 'vertical'}
							<hr>
						{/if} -->

						<div class="positions column">
							{#each view.positions ?? [] as position, i (position.id ?? i)}
								<div class="position card column">
									<Collapsible
										type="label"
										containerClass="column"
										showTriggerText={false}
										isOpen
									>
										<!-- V2 -->
										<svelte:fragment slot="title">
											<h6 title={`${position.tags?.[0] ? `${formatKebabCase(position.tags[0])}: ` : ''}${position.name} (${formatKebabCase(position.type)})`}>
												{#if (position.type === 'contract-position' || position.type === 'app-token') && 'address' in position.tokenWithBalance.token} 
													<AddressWithLabel
														{network}
														address={position.tokenWithBalance.token.address}
														label={position.name}
														addressFormat="middle-truncated"
													/>
												{:else}
													{position.name}
												{/if}
											</h6>
										</svelte:fragment>

										<svelte:fragment slot="header-right">
											{#if position.tags?.[0]}
												<span class="card-annotation">
													{formatKebabCase(position.tags[0])}
												</span>
											{/if}
										</svelte:fragment>

										<SizeContainer contentProps={{ class: 'column' }}>
											{#if position.type === 'app-token'}
												<div class="bar wrap">
													<!-- V2 -->
													{#if position.type === 'app-token'}
														<TokenBalanceWithConversion
															{tokenBalanceFormat}

															token={position.tokenWithBalance.token}

															balance={position.tokenWithBalance.balance}

															convertedValue={position.tokenWithBalance.conversion?.value}
															conversionCurrency={position.tokenWithBalance.conversion?.currency}
															conversionRate={position.tokenWithBalance.conversion?.rate}

															isDebt={position.isDebt}
														/>
													{/if}

													<!-- V1 -->
													<!-- <TokenBalanceWithConversion
														{tokenBalanceFormat}

														token={position.tokenWithBalance.token}

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
												<div class="subpositions">
													{#each position.subpositions as subposition}
														<!-- V2 -->
														<span class="subposition column">
															<span class="underlying-asset row inline" data-before="┖">
																<TokenBalanceWithConversion
																	{tokenBalanceFormat}

																	token={subposition.tokenWithBalance.token}

																	balance={subposition.tokenWithBalance.balance}

																	convertedValue={subposition.tokenWithBalance.conversion?.value}
																	conversionCurrency={subposition.tokenWithBalance.conversion?.currency}
																	conversionRate={subposition.tokenWithBalance.conversion?.rate}

																	isDebt={subposition.isDebt}
																/>
															</span>

															{#if showMetadata && subposition.metadata?.length}
																<hr>
							
																<dl class="metadata">
																	{#each subposition.metadata as item}
																		<dt>{formatIdentifierToWords(item.label, true)}</dt>
																		<dd>
																			{#if item.value === undefined}
																				-
																			{:else if item.type === 'currency'}
																				<TokenBalance
																					format="fiat"
																					token={{
																						symbol: item.currency,
																					}}
																					balance={BigInt(item.value)}
																					isDebt={item.label === 'Debt'}
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
														</span>

														<!-- V1 -->
														<!-- <span class="underlying-asset column" in:scaleFont>
															<TokenBalanceWithConversion
																{tokenBalanceFormat}

																token={subposition.tokenWithBalance.token}

																balance={subposition.tokenWithBalance.balance}

																convertedValue={subposition.tokenWithBalance.conversion?.value}
																conversionCurrency={subposition.tokenWithBalance.conversion?.currency}
																conversionRate={subposition.tokenWithBalance.conversion?.rate}

																isDebt={subposition.tokenWithBalance.balance < 0n}
															/>
															{#if subposition.metadata.weight}
																<small>({formatPercent(subposition.metadata.weight)})</small>
															{/if}
															{#if subposition.label}{subposition.label}{/if}
														</span> -->
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
																	format="fiat"
																	token={{
																		symbol: item.currency,
																	}}
																	balance={Number(item.value)}
																	isDebt={item.label === 'Debt'}
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
										</SizeContainer>
									</Collapsible>
								</div>
							{/each}
						</div>
					</Collapsible>
				</svelte:element>
			{/each}
		</Collapsible>
	{:else}
		<div class="card">
			<p class="faded">No DeFi positions found.</p>
		</div>
	{/each}
</ScrollContainer>
