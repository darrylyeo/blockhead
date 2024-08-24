<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { tokenColors } from '$/data/tokenColors'


	// Inputs
	export let rate = 0.0
	export let quoteToken: Ethereum.Erc20Token
	export let baseToken: Ethereum.Erc20Token
	export let decimals = 3

	// (View options)
	export let layout: 'horizontal' | 'vertical' = 'vertical'
	export let fractionLayout: 'horizontal' | 'vertical' = layout === 'vertical' ? 'horizontal' : 'vertical'
	export let showName = false


	// Functions
	const formatRate = (value: number | string): string => (
		typeof value === 'number' ?
			value.toFixed(decimals)
		: typeof value === 'string' ?
			value
		:
			value.toString()
	)


	// Components
	import TokenName from './TokenName.svelte'
</script>


<style>
	.token-rate {
		display: inline-grid;
		justify-content: center;
		justify-items: center;
		align-items: center;
		gap: var(--padding-inner);

		line-height: 1;
		--padding-inner: 0.33em;

		align-self: baseline;

		&[data-layout="horizontal"] {
			grid-auto-flow: column;
			--padding-inner: 0.33em;
		}

		&[data-layout="vertical"] {
			grid-auto-flow: row;
		}

		.rate {
			@supports (-webkit-background-clip: text) or (background-clip: text) {
				--color-1: currentColor;
				--color-2: var(--bitcoin-gold);
				background: linear-gradient(135deg, var(--color-1), var(--color-2));
				-webkit-background-clip: text;
				background-clip: text;
				-webkit-text-fill-color: #ffffff20;
			}
		}

		.fraction {
			display: inline-grid;
			align-items: center;

			&[data-layout="horizontal"] {
				grid-auto-flow: column;

				gap: 0.33em;

				.token-rate[data-layout="horizontal"] & {
					align-self: baseline;
				}
			}

			&[data-layout="vertical"] {
				font-size: 0.5em;

				grid-auto-flow: row;
				gap: 0.33em;

				.fraction-bar {
					text-indent: -1000vw;
					border-bottom: 0.1em solid;
					height: 0;
					width: 100%;
				}
			}

			> * {
				display: inline-grid;
				grid-auto-flow: column;
				gap: var(--padding-inner);
				justify-items: center;
				align-items: center;
			}
		}

		.token-name {
			font-weight: 300;
		}
	}
</style>


<div
	class="token-rate"
	data-layout={layout}
>
	<span
		class="rate"
		style="
			--color-1: var(--{tokenColors[quoteToken.symbol ?? '']});
			--color-2: var(--{tokenColors[baseToken.symbol ?? '']});
		"
	>
		{formatRate(rate)}
	</span>

	<span
		class="fraction"
		data-layout={fractionLayout}
	>
		<span>
			<TokenName
				token={quoteToken}
				{showName}
			/>
		</span>

		<span class="fraction-bar">/</span>

		<span>
			<TokenName
				token={baseToken}
				{showName}
			/>
		</span>
	</span>
</div>
