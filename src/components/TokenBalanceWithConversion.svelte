<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import type { QuoteCurrency, TickerSymbol } from '../data/currency/currency'


	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showDecimalPlaces = 3
	export let showConversionRate = false
	export let showParentheses = true

	export let network: Ethereum.Network
	export let symbol: TickerSymbol
	export let address: Ethereum.ContractAddress
	export let name: string
	export let icon: string

	export let erc20Token: Ethereum.ERC20Token
	$: symbol = $$props.symbol || erc20Token?.symbol
	$: address = $$props.address || erc20Token?.address
	$: name = $$props.name || erc20Token?.name
	$: icon = $$props.icon || erc20Token?.icon

	export let balance
	export let isDebt = false

	export let conversionCurrency: QuoteCurrency
	export let convertedValue
	export let conversionRate


	$: isSmallValue = Math.abs(convertedValue) < 1e-3
	$: isZero = balance == 0


	export let animationDelay = 0
	export let tween = true
	export let clip = true
	export let transitionWidth = true


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

	.is-small-value {
		opacity: 0.55;
	}
	.is-zero {
		opacity: 0.55;
	}
	.is-zero :global(.is-zero) {
		opacity: initial;
	}

	.is-debt {
		color: hsl(31deg 93% 54%);
	}
</style>


<span class="token-balance-with-conversion" class:is-debt={isDebt} class:is-small-value={isSmallValue} class:is-zero={isZero}>
	{#if tokenBalanceFormat === 'original' || tokenBalanceFormat === 'both'}
		<span class="balance" transition:scaleFont|local><!-- style="font-size: {sizeByVolume(convertedValue)}em" -->
			<TokenBalance
				{network} {symbol} {address} {name} {icon}
				{balance} {showDecimalPlaces} {isDebt}
				{tween} {clip} {transitionWidth}
			/>
		</span>
	{/if}
	{#if (tokenBalanceFormat === 'converted' || tokenBalanceFormat === 'both')}
		<span class="balance-converted" transition:scaleFont|local={{delay: 50 + animationDelay}}>
			{#if tokenBalanceFormat === 'both'}{#if showParentheses}({/if}{/if
			}<TokenBalance
				{network} symbol={conversionCurrency}
				balance={convertedValue}{showDecimalPlaces} showPlainFiat={true} {isDebt}
				{tween} {clip} {transitionWidth}
			/>{#if tokenBalanceFormat === 'converted' && conversionCurrency !== symbol}
				<span class="worth" transition:scaleFont|local={{delay: animationDelay}}>
					&nbsp;in <TokenName {network} {symbol} {address} {icon} {name} />
				</span>
			{/if
			}{#if showConversionRate && conversionRate}<span class="rate"> at <TokenRate rate={conversionRate} quoteToken={conversionCurrency} baseToken={symbol} layout='horizontal'/></span>{/if
			}{#if tokenBalanceFormat === 'both' && showParentheses}){/if}
		</span>
	{/if}
</span>