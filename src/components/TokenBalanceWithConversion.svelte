<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { QuoteCurrency, TickerSymbol } from '$/data/currencies'


	// Inputs
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

	export let balance: number
	export let isDebt = false

	export let conversionCurrency: QuoteCurrency
	export let convertedValue: number
	export let conversionRate: number

	// (View options)
	export let layout: 'inline' | 'block' = 'inline'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showDecimalPlaces = 3
	export let showConversionRate = false

	export let animationDelay = 0
	export let tween = true
	export let clip = true
	export let transitionWidth = true


	// Internal state
	// (Computed)
	$: showParentheses = layout === 'inline'
	$: isSmallValue = Math.abs(convertedValue) < 1e-3
	$: isZero = balance == 0


	// Components
	import InlineContainer from './InlineContainer.svelte'
	import InlineTransition from './InlineTransition.svelte'
	import TokenName from './TokenName.svelte'
	import TokenRate from './TokenRate.svelte'
	import TokenBalance from './TokenBalance.svelte'


	// Transitions
	import { fade } from 'svelte/transition'
	// const sizeByVolume = (size) => 1 + size * 0.0025
</script>


<style>
	.token-balance-with-conversion {
		display: inline;
		transition: none;
	}
	.token-balance-with-conversion[data-layout="block"] {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	.token-balance-with-conversion[data-layout="block"][data-format="converted"] .balance-converted {
		font-size: 0.85em;
	}

	.balance, .balance-converted {
		font-size: 1.1em;
	}
	.token-balance-with-conversion[data-format="both"] .balance-converted,
	.worth, .rate {
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


<span
	class="token-balance-with-conversion"
	class:is-debt={isDebt}
	class:is-small-value={isSmallValue}
	class:is-zero={isZero}
	data-layout={layout}
	data-format={tokenBalanceFormat}
>
	<InlineTransition
		align="start"
		key={tokenBalanceFormat === 'original' || tokenBalanceFormat === 'both'}
		transition={fade}
		clip
	>
		{#if tokenBalanceFormat === 'original' || tokenBalanceFormat === 'both'}
			<span class="balance"><!-- style="font-size: {sizeByVolume(convertedValue)}em" -->
				<TokenBalance
					{network} {symbol} {address} {name} {icon}
					{balance} {showDecimalPlaces} {isDebt}
					{tween} {clip} {transitionWidth}
				/>
			</span>
		{:else if tokenBalanceFormat === 'converted' && layout === 'block'}
			<span class="balance">
				<TokenName {network} {symbol} {address} {icon} {name} />
			</span>
		{/if}
	</InlineTransition>

	<InlineContainer
		isOpen={(tokenBalanceFormat === 'converted' || tokenBalanceFormat === 'both')}
		delay={50 + animationDelay}
		clip
	>
		<span class="balance-converted">
			{#if tokenBalanceFormat === 'both'}{#if showParentheses}({/if}{/if
			}<TokenBalance
				{network} symbol={conversionCurrency}
				balance={convertedValue} {showDecimalPlaces} format="fiat" {isDebt}
				{tween} {clip} {transitionWidth}
			/><InlineContainer
				isOpen={tokenBalanceFormat === 'converted' && layout === 'inline' && conversionCurrency !== symbol}
				delay={animationDelay}
				clip
			>
				<span class="worth">
					&nbsp;in <TokenName {network} {symbol} {address} {icon} {name} />
				</span>
			</InlineContainer>{#if showConversionRate && conversionRate}<span class="rate"> at <TokenRate rate={conversionRate} quoteToken={conversionCurrency} baseToken={symbol} layout='horizontal'/></span>{/if
			}{#if tokenBalanceFormat === 'both' && showParentheses}){/if}
		</span>
	</InlineContainer>
</span>
