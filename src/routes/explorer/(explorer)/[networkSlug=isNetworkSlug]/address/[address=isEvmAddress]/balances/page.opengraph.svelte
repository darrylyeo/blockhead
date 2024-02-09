<script lang="ts">
	// Context
	import type { load } from './page.opengraph'

	$: ({
		data: {
			network,
			balances,
			summary,
		},
	} = $$props as {
		data: Awaited<ReturnType<typeof load>>
	})


	// Functions
	import { formatValue } from '$/utils/formatValue'
</script>


<div class="layout">
	<header class="summary row">
		<h3>{network.name} Balances</h3>

		<span>
			{formatValue(
				summary.quoteTotal,
				{
					compactLargeValues: true,
					currency: 'USD',
				},
			)}
		</span>
	</header>

	<div class="card grid">
		{#each (
			balances
				.slice(0, 60)
				.sort((a, b) => (b.conversion?.value ?? 0) - (a.conversion?.value ?? 0))
		) as tokenWithBalance}
			<div class="row">
				<div class="token-balance row">
					{#if 'icon' in tokenWithBalance.token}
						<img src={tokenWithBalance.token.icon} width="30" height="30" />
					{/if}

					{#if tokenWithBalance.balance}
						<span>
							{formatValue(
								Number(tokenWithBalance.balance) * 0.1 ** tokenWithBalance.token.decimals,
								{
									compactLargeValues: true,
								},
							)}
						</span>
					{/if}

					{#if tokenWithBalance.token.symbol}
						<span class="symbol">{tokenWithBalance.token.symbol}</span>
					{/if}
				</div>

				{#if tokenWithBalance.conversion}
					<span class="conversion-value">
						{formatValue(
							tokenWithBalance.conversion.value,
							{
								compactLargeValues: true,
								currency: 'USD',
							},
						)}
					</span>
				{/if}
			</div>
		{/each}
	</div>
</div>


<style>
	.layout {
		height: 100%;

		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.grid {
		flex-shrink: 1;
		flex-grow: 1;

		display: flex;
		flex-direction: column;
		align-content: space-between;
		justify-items: space-between;
		justify-content: space-between;
		flex-wrap: wrap;
		row-gap: 1em;
		column-gap: 2em;
		line-height: 1;
	}
	.grid > * {
		max-width: 300px;
	}

	.row {
		column-gap: 0.25em;
		flex-wrap: nowrap;
	}

	.token-balance {
		align-items: baseline;
	}
	.symbol {
		font-size: 0.75em;
		opacity: 0.75;
	}

	.conversion-value {
		font-size: 0.75em;
		opacity: 0.75;
	}
</style>
