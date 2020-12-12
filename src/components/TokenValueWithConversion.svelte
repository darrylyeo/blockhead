<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { BaseCurrency, TickerSymbol } from '../data/currency/currency'

	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let showDecimalPlaces = 3

	export let token: TickerSymbol
	export let tokenAddress: Ethereum.ContractAddress
	export let value

	export let conversionCurrency: BaseCurrency
	export let convertedValue

	export let conversionRate

	function sizeByVolume(size) {
		return 1 + size * 0.0025
	}
	
	import TokenName from './TokenName.svelte'
	import TokenRate from './TokenRate.svelte'
	import TokenValue from './TokenValue.svelte'
	import { scale } from 'svelte/transition'
</script>

<style>
	.value, .value-converted {
		font-size: 1.1em;
	}
	.value + .value-converted {
		font-size: 0.85em;
	}
	.worth {
		font-size: 0.85em;
	}

	.is-zero {
		opacity: 0.55;
	}
</style>

<span class="value-with-conversion" class:is-zero={value == 0}>
	{#if showValues === 'original' || showValues === 'both'}
		<span class="value" transition:scale><!-- style="font-size: {sizeByVolume(convertedValue)}em" -->
			<TokenValue {token} {tokenAddress} {value} {showDecimalPlaces} />
		</span>
	{/if}
	{#if (showValues === 'converted' || showValues === 'both')}
		<span class="value-converted" transition:scale>
			{#if showValues === 'both'}({/if}<TokenValue token={conversionCurrency} value={convertedValue} {showDecimalPlaces} />{#if conversionRate} at <TokenRate rate={conversionRate} {conversionCurrency} baseToken={token} layout='horizontal'/>{/if}{#if showValues === 'both'}){/if}
		</span>
		{#if showValues === 'converted' && conversionCurrency !== token}
			<span class="worth" transition:scale>
				as <TokenName {token} />
			</span>
		{/if}
	{/if}
</span>