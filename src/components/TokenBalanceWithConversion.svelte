<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import type { QuoteCurrency } from '$/data/currencies'


	// Inputs
	export let token: {
		name?: string,
		chainId?: Ethereum.ChainId,
		symbol?: string,
		address?: Ethereum.ContractAddress,
		decimals?: number,
		icon?: string,
	}

	export let balance: number | bigint | undefined
	export let isDebt = false

	export let conversionCurrency: QuoteCurrency | undefined
	export let convertedValue: number | undefined
	export let conversionRate: number | undefined

	// (View options)
	export let layout: 'inline' | 'block' = 'inline'
	export let tokenBalanceFormat: 'original' | 'converted' | 'both' = 'original'
	export let showName = false
	export let showDecimalPlaces = 3
	export let showConversionRate = false

	export let animationDelay = 0
	export let tween = true
	export let clip = true
	export let transitionWidth = true


	// Internal state
	let computedTokenBalanceFormat: 'original' | 'converted' | 'both'
	// (Computed)
	$: computedTokenBalanceFormat =
		tokenBalanceFormat === 'both' ?
			(balance && convertedValue === undefined) ?
				'original'
			: (!balance && convertedValue !== undefined) ?
				'converted'
			:
				'both'
		: tokenBalanceFormat === 'converted' ?
			convertedValue !== undefined ?
				'converted'
			:
				'original'
		:
			'original'

	$: showParentheses = layout === 'inline'
	$: isSmallValue = convertedValue !== undefined && Math.abs(convertedValue) < 1
	$: isZero = balance == 0


	// Components
	import InlineContainer from './InlineContainer.svelte'
	import InlineTransition from './InlineTransition.svelte'
	import TokenName from './TokenName.svelte'
	import TokenRate from './TokenRate.svelte'
	import TokenBalance from './TokenBalance.svelte'


	// Transitions
	// const sizeByVolume = (size) => 1 + size * 0.0025
</script>


<span
	class="token-balance-with-conversion"
	class:is-debt={isDebt}
	class:is-small-value={isSmallValue}
	class:is-zero={isZero}
	data-layout={layout}
	data-format={computedTokenBalanceFormat}
>
	<InlineTransition
		align="start"
		key={computedTokenBalanceFormat === 'original' || computedTokenBalanceFormat === 'both'}
	>
		{#if computedTokenBalanceFormat === 'original' || computedTokenBalanceFormat === 'both'}
			<span class="balance"><!-- style="font-size: {sizeByVolume(convertedValue)}em" -->
				<TokenBalance
					{token}
					{balance} {showDecimalPlaces} {isDebt}
					{tween} {clip} {transitionWidth}
					layout={showName ? 'name' : 'symbol'}
				/>
			</span>
		{:else if computedTokenBalanceFormat === 'converted' && layout === 'block'}
			<span class="balance">
				<TokenName
					{token}
					layout={showName ? 'name' : 'symbol'}
				/>
			</span>
		{/if}
	</InlineTransition>

	<InlineContainer
		isOpen={(computedTokenBalanceFormat === 'converted' || computedTokenBalanceFormat === 'both')}
		renderOnlyWhenOpen={false}
		delay={50 + animationDelay}
		clip
	>
		<span class="balance-converted">
			{#if computedTokenBalanceFormat === 'both'}{#if showParentheses}({/if}{/if
			}<TokenBalance
				format="fiat"
				token={{
					symbol: conversionCurrency,
				}}
				balance={convertedValue} {showDecimalPlaces} {isDebt}
				{tween} {clip} {transitionWidth}
				{showName}
			/><InlineContainer
				isOpen={computedTokenBalanceFormat === 'converted' && layout === 'inline' && conversionCurrency !== token.symbol}
				renderOnlyWhenOpen={false}
				delay={animationDelay}
				clip
			>
				<span class="worth">
					&nbsp;in <TokenName
						{token}
						layout={showName ? 'name' : 'symbol'}
					/>
				</span>
			</InlineContainer>{#if showConversionRate && conversionRate}<span class="rate"> at <TokenRate rate={conversionRate} quoteToken={{ symbol: conversionCurrency }} baseToken={{ symbol: token.symbol }} layout="horizontal" /></span>{/if
			}{#if computedTokenBalanceFormat === 'both' && showParentheses}){/if}
		</span>
	</InlineContainer>
</span>


<style>
	.token-balance-with-conversion {
		--balance-fontSize: 1.1em;
		--balanceConverted-fontSize: 0em;
		--balanceConverted-fontSize: 1em;

		&[data-format="both"] {
			--balanceConverted-fontSize: 0.85em;
		}
		&[data-format="converted"] {
			--balanceConverted-fontSize: 0.85em;
		}
		
		transition: none;

		&[data-layout="inline"] {
			display: inline;
		}		
		&[data-layout="block"] {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
		}

		&.is-small-value {
			opacity: 0.55;
		}

		&.is-zero {
			opacity: 0.55;

			& :global(.is-zero) {
				opacity: initial;
			}
		}

		&.is-debt {
			color: hsl(31deg 93% 54%);
		}

		& .balance {
			font-size: var(--balance-fontSize);
		}

		& .balance-converted {
			font-size: var(--balanceConverted-fontSize);
			white-space: nowrap;
		}

		& .worth {
			font-size: 0.85em;
		}

		& .rate {
			font-size: 0.85em;
		}
	}
</style>
