<script lang="ts">
	import type { TickerSymbol } from '../data/currency/currency'

	export let rate = 0.0
	export let quoteToken: TickerSymbol
	export let baseToken: TickerSymbol
	export let decimals = 3

	export let layout: 'horizontal' | 'vertical' = 'vertical'
	export let fractionLayout: 'horizontal' | 'vertical' = layout === 'vertical' ? 'horizontal' : 'vertical'

	const formatRate = value =>
		typeof value === 'number' ? value.toFixed(decimals) :
		typeof value === 'string' ? value :
		value.toString()

	import { tokenColors } from '../data/token-colors'
	import TokenIcon from './TokenIcon.svelte'
</script>

<style>
	.token-rate.horizontal, .fraction.horizontal {
		grid-auto-flow: column;
	}
	.token-rate.vertical, .fraction.vertical {
		grid-auto-flow: row;
	}

	.token-rate {
		display: inline-grid;
		justify-content: center;
		justify-items: center;
		align-items: center;
		gap: var(--padding-inner);

		line-height: 1;
		--padding-inner: 0.33em;

		align-self: baseline;
	}
	.token-rate.horizontal {
		--padding-inner: 0.33em;
	}

	@supports (-webkit-background-clip: text) or (background-clip: text) {
		.rate {
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

		font-size: 0.5em;
	}
	.fraction.horizontal {
		gap: 0.33em;
	}
	.token-rate.horizontal .fraction.horizontal {
		align-self: baseline;
	}
	.fraction.vertical {
		gap: 0.33em;
	}

	.fraction > * {
		display: inline-grid;
		grid-auto-flow: column;
		gap: var(--padding-inner);

		justify-items: center;
		align-items: center;
	}
	.fraction.vertical .fraction-bar {
		text-indent: -1000vw;
		border-bottom: 0.1em solid;
		height: 0;
		width: 100%;
	}

	.token-name {
		font-weight: 300;
	}
</style>

<div class="token-rate {layout}">
	<span class="rate" style="--color-1: var(--{tokenColors[quoteToken]}); --color-2: var(--{tokenColors[baseToken]})">
		{formatRate(rate)}
	</span>
	<span class="fraction {fractionLayout}">
		<span>
			<TokenIcon token={quoteToken} />
			<span class="token-name">{quoteToken}</span>
		</span>
		<span class="fraction-bar">/</span>
		<span>
			<TokenIcon token={baseToken} />
			<span class="token-name">{baseToken}</span>
		</span>
	</span>
</div>