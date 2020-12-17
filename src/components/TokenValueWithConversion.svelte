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
	$: isZero = value == 0
	export let isDust = false

	export let conversionCurrency: QuoteCurrency
	export let convertedValue

	export let conversionRate

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

	.is-dust, .is-zero {
		opacity: 0.55;
	}
</style>

<span class="value-with-conversion" class:is-zero={isZero} class:is-dust={isDust}>
	{#if showValues === 'original' || showValues === 'both'}
		<span class="value" transition:scaleFont|local><!-- style="font-size: {sizeByVolume(convertedValue)}em" -->
			<TokenValue {token} {tokenAddress} {tokenIcon} {tokenName} {value} {showDecimalPlaces} />
		</span>
	{/if}
	{#if (showValues === 'converted' || showValues === 'both')}
		<span class="value-converted" transition:scaleFont|local={{delay: 300}}>
			{#if showValues === 'both'}({/if
			}<TokenValue token={conversionCurrency} value={convertedValue} {showDecimalPlaces}
			/>{#if showValues === 'converted' && conversionCurrency !== token}
				<span class="worth" transition:scaleFont|local>
					&nbsp;in <TokenName {token} {tokenAddress} {tokenIcon} />
				</span>
			{/if
			}{#if showConversionRate && conversionRate}<span class="rate"> at <TokenRate rate={conversionRate} quoteToken={conversionCurrency} baseToken={token} layout='horizontal'/></span>{/if
			}{#if showValues === 'both'}){/if}
		</span>
	{/if}
</span>