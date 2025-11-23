<script lang="ts">
	// Types/constants
	import type { EvmContractPosition } from '$/schema/EvmContractPosition.ts'


	// Props
	let {
		position,
	}: {
		position: EvmContractPosition
	} = $props()


	// Derived
	const hasFinancialData = $derived(
		position.$fields.totalCostBasis != null ||
		position.$fields.totalClosedPnl != null ||
		position.$fields.totalOpenPnl != null
	)
	const hasChains = $derived(
		position.$fields.chains != null &&
		Object.keys(position.$fields.chains).length > 0
	)
	const hasAssets = $derived(
		position.$fields.$$assets.length > 0
	)
</script>


<article data-column="gap-2">
	<header data-row="wrap">
		<div data-column="gap-1">
			<h3>{position.$fields.name}</h3>
			<div data-tag="small">{position.$fields.protocol.name}</div>
		</div>

		<div data-column="gap-1" data-align="end">
			<div class="value">
				${position.$fields.value.toLocaleString(undefined, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				})}
			</div>
		</div>
	</header>

	{#if hasFinancialData}
		<div data-row="wrap" class="financial-metrics">
			{#if position.$fields.totalCostBasis != null}
				<div data-column="gap-1">
					<span class="label">Cost Basis</span>
					<span class="value">
						${position.$fields.totalCostBasis.toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}
					</span>
				</div>
			{/if}

			{#if position.$fields.totalClosedPnl != null}
				<div data-column="gap-1">
					<span class="label">Closed P&L</span>
					<span class="value" data-pnl={position.$fields.totalClosedPnl >= 0 ? 'positive' : 'negative'}>
						${position.$fields.totalClosedPnl >= 0 ? '+' : ''}
						{position.$fields.totalClosedPnl.toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}
					</span>
				</div>
			{/if}

			{#if position.$fields.totalOpenPnl != null}
				<div data-column="gap-1">
					<span class="label">Open P&L</span>
					<span class="value" data-pnl={position.$fields.totalOpenPnl >= 0 ? 'positive' : 'negative'}>
						${position.$fields.totalOpenPnl >= 0 ? '+' : ''}
						{position.$fields.totalOpenPnl.toLocaleString(undefined, {
							minimumFractionDigits: 2,
							maximumFractionDigits: 2
						})}
					</span>
				</div>
			{/if}
		</div>
	{/if}

	{#if hasChains}
		<details>
			<summary>Chains ({Object.keys(position.$fields.chains ?? {}).length})</summary>
			<ul data-column="gap-1">
				{#each Object.entries(position.$fields.chains ?? {}) as [chainKey, chain]}
					<li>
						<div data-row="wrap">
							<span>{chainKey}</span>
							<span>
								${chain.value.toLocaleString(undefined, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2
								})}
							</span>
							<span>
								({(chain.valuePercentile * 100).toFixed(2)}%)
							</span>
						</div>
					</li>
				{/each}
			</ul>
		</details>
	{/if}

	{#if hasAssets}
		<details>
			<summary>Assets ({position.$fields.$$assets.length})</summary>
			<ul data-column="gap-1">
				{#each position.$fields.$$assets as assetId}
					<li>
						<span>
							{assetId.$coin.address ?? 'Native'}
						</span>
					</li>
				{/each}
			</ul>
		</details>
	{/if}
</article>


<style>
	article {
		padding: var(--spacing-2);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
	}

	header {
		align-items: start;
	}

	h3 {
		margin: 0;
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-semibold);
	}

	.value {
		font-weight: var(--font-weight-semibold);
		font-variant-numeric: tabular-nums;
		font-size: var(--font-size-lg);
	}

	.financial-metrics {
		padding: var(--spacing-2);
		background-color: color-mix(in oklch, var(--background-color) 95%, var(--text-color));
		border-radius: var(--border-radius);
	}

	.label {
		font-size: var(--font-size-sm);
		color: var(--text-color-secondary);
	}

	.value[data-pnl='positive'] {
		color: var(--color-success);
	}

	.value[data-pnl='negative'] {
		color: var(--color-error);
	}
</style>

