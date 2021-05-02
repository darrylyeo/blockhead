<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { DefiSDK } from '../data/ethereum/price/defi-sdk'
	import { getDefiBalances } from '../data/ethereum/price/defi-sdk'


	export let token = 'ETH'

	export let network: Ethereum.Network
	export let provider: Ethereum.Provider
	export let address: string


	export let showUnderlyingAssets = true

	type Layout = 'horizontal' | 'horizontal-alternate' | 'vertical'
	export let layout: Layout | 'auto' = 'auto'
	let computedLayout: Layout
	$: computedLayout = layout === 'auto'
		? showUnderlyingAssets ? 'vertical' : 'horizontal' // 'horizontal-alternate'
		: layout
	
	export let isCollapsed: boolean

	
	import { formatUnits } from 'ethers/lib/utils'
	
	import Loader from './Loader.svelte'
	import TokenIcon from './TokenIcon.svelte'
	import TokenValue from './TokenValue.svelte'
	
	import { flip } from 'svelte/animate'
	import { scaleFont } from '../transitions/scale-font'


	const defiProtocolColors: Record<DefiSDK.ProtocolName, string[]> = {
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

	.card img {
		position: absolute;
		opacity: 0.075;
		width: 13em;
		right: -1.5em;
		top: -2em;
		filter: contrast(10);
		border-radius: 50%;
		z-index: -1;
	}
</style>

{#if provider && address}
	<Loader
		loadingMessage="Reading {network.name} DeFi balances..."
		fromPromise={() => getDefiBalances(provider, address)}
		let:then={defiBalances}
		showIf={defiBalances => defiBalances.length}
		{isCollapsed}
	>
		<TokenIcon slot="loadingIcon" {token} />
		<!-- <svelte:fragment slot="loadingIcon"><TokenIcon slot="icon" {token} /></svelte:fragment> -->

		<svelte:fragment slot="header" let:status>
			{#if defiBalances.length}
				<slot name="header" {status}></slot>
			{/if}
		</svelte:fragment>

		<div class="defi-balances">
			{#each defiBalances as protocol, i (protocol.metadata.name)}
				<div transition:scaleFont|local animate:flip|local={{duration: 300, delay: Math.abs(i) * 10}} class="card defi-protocol layout-{computedLayout}" style="--card-background-image: {makeCardGradient(defiProtocolColors[protocol.metadata.name])})">
					<h5 class:card-annotation={computedLayout === 'horizontal-alternate'} title="{protocol.metadata.description}"><img src={`https://${protocol.metadata.iconURL}`} alt={protocol.metadata.name} width="20"/> {protocol.metadata.name}</h5>
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
{/if}