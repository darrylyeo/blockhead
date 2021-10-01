<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'

	export let showValues: 'original' | 'converted' | 'both' = 'original'
	export let showDecimalPlaces = 3
	export let showConversionRate = false
	export let showParentheses = true

	export let symbol: TickerSymbol
	export let address: Ethereum.ContractAddress
	export let name: string
	export let icon: string

	export let erc20Token: Ethereum.ERC20Token
	$: symbol ||= erc20Token?.symbol
	$: address ||= erc20Token?.address
	$: name ||= erc20Token?.name
	$: icon = erc20Token?.icon

	export let balance
	export let isDust = false
	$: isSmallValue = Math.abs(convertedValue) < 1e-3
	$: isZero = balance == 0
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
	import TokenBalance from './TokenBalance.svelte'
	import { scaleFont } from '../transitions/scale-font'
</script>

<style>
	.balance, .balance-converted {
		font-size: 1.1em;
	}
	.balance + .balance-converted, .worth, .rate {
		font-size: 0.85em;
	}

	.balance-converted {
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

<span class="token-balance-with-conversion" class:is-debt={isDebt} class:is-dust={isDust} class:is-small-value={isSmallValue} class:is-zero={isZero}>
	{#if showValues === 'original' || showValues === 'both'}
		<span class="balance" transition:scaleFont|local><!-- style="font-size: {sizeByVolume(convertedValue)}em" -->
			<TokenBalance {symbol} {address} {icon} {name} {balance} {showDecimalPlaces} {isDebt} />
		</span>
	{/if}
	{#if (showValues === 'converted' || showValues === 'both')}
		<span class="balance-converted" transition:scaleFont|local={{delay: 50 + animationDelay}}>
			{#if showValues === 'both'}{#if showParentheses}({/if}{/if
			}<TokenBalance symbol={conversionCurrency} balance={convertedValue} {showDecimalPlaces} showPlainFiat={true} {isDebt}
			/>{#if showValues === 'converted' && conversionCurrency !== symbol}
				<span class="worth" transition:scaleFont|local={{delay: animationDelay}}>
					&nbsp;in <TokenName {symbol} {address} {icon} {name} />
				</span>
			{/if
			}{#if showConversionRate && conversionRate}<span class="rate"> at <TokenRate rate={conversionRate} quoteToken={conversionCurrency} baseToken={symbol} layout='horizontal'/></span>{/if
			}{#if showValues === 'both' && showParentheses}){/if}
		</span>
	{/if}
</span>