<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'

	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let showDecimalPlaces = 3
	export let showConversionRate = false

	export let token: TickerSymbol
	export let tokenAddress: Ethereum.ContractAddress
	export let tokenIcon: string
	export let tokenName: string

	export let value
	export let isDust = false
	$: isSmallValue = Math.abs(convertedValue) < 1e-3
	$: isZero = value == 0
	export let isDebt = false

	export let conversionCurrency: QuoteCurrency
	export let convertedValue

	export let conversionRate

	export let animationDelay = 0

	function sizeByVolume(size) {
		return 1 + size * 0.0025
	}
	
	import TokenName from './TokenName.svelte'
	import TokenRate from './TokenRate.svelte'
	import TokenValue from './TokenValue.svelte'
	import { scaleFont } from '../transitions/scale-font'
</script>

<style>
	.value, .value-converted {
		font-size: 1.1em;
	}
	.value + .value-converted, .worth, .rate {
		font-size: 0.85em;
	}

	.value-converted {
		white-space: nowrap;
	}

	.is-dust, .is-small-value {
		opacity: 0.55;
	}
	.is-zero {
		/* opacity: 0.2; */
		opacity: 0.55;
	}

	.is-debt {
		color: hsl(31deg 93% 54%);
	}
</style>

<span class="value-with-conversion" class:is-debt={isDebt} class:is-dust={isDust} class:is-small-value={isSmallValue} class:is-zero={isZero}>
	{#if showValues === 'original' || showValues === 'both'}
		<span class="value" transition:scaleFont|local><!-- style="font-size: {sizeByVolume(convertedValue)}em" -->
			<TokenValue {token} {tokenAddress} {tokenIcon} {tokenName} {value} {showDecimalPlaces} {isDebt} />
		</span>
	{/if}
	{#if (showValues === 'converted' || showValues === 'both')}
		<span class="value-converted" transition:scaleFont|local={{delay: 50 + animationDelay}}>
			}<TokenValue token={conversionCurrency} value={convertedValue} {showDecimalPlaces} showPlainFiat={true} {isDebt}
			/>{#if showValues === 'converted' && conversionCurrency !== token}
				<span class="worth" transition:scaleFont|local={{delay: animationDelay}}>
					&nbsp;in <TokenName {token} {tokenAddress} {tokenIcon} {tokenName} />
				</span>
			{/if
			}{#if showConversionRate && conversionRate}<span class="rate"> at <TokenRate rate={conversionRate} quoteToken={conversionCurrency} baseToken={token} layout='horizontal'/></span>{/if
			}{#if showValues === 'both'}){/if}
		</span>
	{/if}
</span>