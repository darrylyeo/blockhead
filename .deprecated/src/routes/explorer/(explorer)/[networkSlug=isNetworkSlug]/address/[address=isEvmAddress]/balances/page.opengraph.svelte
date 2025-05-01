<script lang="ts">
	// Context
	import type { load } from './page.opengraph'

	$: ({
		pageData: {
			network,
			balances,
			summary,
		},
	} = $$props as {
		pageData: Awaited<ReturnType<typeof load>>,
	})


	// Functions
	import { formatValue } from '$/utils/formatValue'


	// Components
	import FormattedNumber from '$/components/FormattedNumber.svelte'


	// Functions
	const clamp = (min: number, value: number, max: number) => Math.min(Math.max(min, value), max)
</script>


<div class="layout">
	<header class="row">
		<h3>{network.name} Balances</h3>

		<span class="summary row">
			<strong>
				{formatValue(
					summary.quoteTotal,
					{
						compactLargeValues: true,
						currency: 'USD',
					},
				)}
			</strong>

			<span role="separator" />

			<span class="row inline">
				<strong>
					{formatValue(
						summary.balancesCount,
						{
							compactLargeValues: true,
						},
					)}
				</strong>

				tokens
			</span>
		</span>
	</header>

	<div
		class="card grid"
		style={`
			font-size: ${clamp(1, 2 - (balances?.length ?? 0) ** 1.25 / 7, 2)}em;
		`}
	>
		{#each (
			balances
				?.slice(0, 15)
			?? []
		) as tokenWithBalance}
			<div class="row inline">
				<div class="token-balance-with-icon row">
					{#if 'icon' in tokenWithBalance.token}
						<div class="icon">
							<img
								src={tokenWithBalance.token.icon}
								width="30"
								height="30"
							/>
						</div>
					{/if}

					<span class="token-balance row inline">
						{#if tokenWithBalance.balance}
							<span>
								<FormattedNumber
									value={Number(tokenWithBalance.balance) * 0.1 ** tokenWithBalance.token.decimals}
									format={{
										showDecimalPlaces: 3,
										compactLargeValues: true,
									}}
								/>
							</span>
						{/if}

						{#if tokenWithBalance.token.symbol}
							<span class="symbol">{tokenWithBalance.token.symbol}</span>
						{/if}
					</span>
				</div>

				{#if tokenWithBalance.conversion}
					<span class="conversion-value">
						<FormattedNumber
							value={tokenWithBalance.conversion.value}
							format={{
								showDecimalPlaces: 3,
								compactLargeValues: true,
								currency: 'USD',
							}}
						/>
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
		row-gap: 1em;

		font-size: 1.3em;
	}

	.grid {
		flex-shrink: 1;
		flex-grow: 1;

		display: flex;
		flex-direction: column;
		align-content: center;
		justify-content: center;
		flex-wrap: wrap;
		column-gap: 1.5em;
		row-gap: 1em;
		line-height: 1;
	}
	.grid > * {
		width: 13.5em;
		column-gap: 1em;
	}

	.token-balance-with-icon {
		column-gap: 0.25em;
	}
	.token-balance {
		column-gap: 0.25em;
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
