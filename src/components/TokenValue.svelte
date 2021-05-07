<script lang="ts">
	import type { BigNumberish } from 'ethers'
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from '../data/currency/currency'
	import { fiatQuoteCurrencies } from '../data/currency/currency'

	export let token: TickerSymbol
	export let tokenAddress: Ethereum.ContractAddress
	export let tokenIcon: string
	export let tokenName: string

	export let value: number | string | BigNumberish = 0
	export let price
	export let showDecimalPlaces = 3 // 2 + Math.round(Math.log10(price || 1))

	export let isDebt = false

	export let showPlainFiat = false
	$: isFiat = showPlainFiat && token in fiatQuoteCurrencies

	$: isNegative = value < 0


	import { formatValue } from '../utils/format-value'


	import { tweened } from 'svelte/motion'
	const tweenedValue = tweened(0, {
		duration: 1000,
		delay: 1,
		easing: quintOut,
		interpolate: (from, to) => t => {
			const logFrom = from ? Math.log10(from) : -showDecimalPlaces - 1
			const logTo = to ? Math.log10(to) : -showDecimalPlaces - 1
			return Math.pow(10, logFrom + t * (logTo - logFrom))
		}
	})
	$: tweenedValue.set(Math.abs(value || 0))


	import TokenIcon from './TokenIcon.svelte'
	import { expoOut, quintOut } from 'svelte/easing'
</script>

<style>
	.token-value-container {
		display: inline-grid;
		grid-auto-flow: column;
		justify-content: start;
		align-items: baseline;
		--padding-inner: 0.33em;
		gap: var(--padding-inner);
	}

	.token-value-container > * {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.token-name {
		font-weight: 300;
		font-size: 0.8em;
	}
	.token-value {
		font-weight: 500;
	}

	.is-debt {
		color: hsl(31deg 93% 54%);
	}
</style>

<span class="token-value-container" class:is-debt={isDebt} title="{value} {tokenName || token}{token && tokenName ? ` (${token})` : ``}">
	{#if isFiat}
		<span class="token-value">{isNegative ? '−' : ''}{formatValue($tweenedValue, token)}</span>
	{:else}
		<TokenIcon {token} {tokenAddress} {tokenIcon} />
		<span>
			<span class="token-value">{isNegative ? '−' : ''}{formatValue($tweenedValue)}</span>
			<span class="token-name">{token || '___'}</span>
		</span>
	{/if}
</span>