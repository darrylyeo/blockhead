<script lang="ts">
	import type { BigNumberish } from 'ethers'
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from '../data/currency/currency'
	import { fiatQuoteCurrencies } from '../data/currency/currency'

	export let symbol: TickerSymbol
	export let address: Ethereum.ContractAddress
	export let name: string
	export let icon: string

	export let erc20Token: Ethereum.ERC20Token
	$: symbol ||= erc20Token?.symbol
	$: address ||= erc20Token?.address
	$: name ||= erc20Token?.name
	$: icon ||= erc20Token?.icon

	export let balance: number | string | BigNumberish = 0
	export let price
	export let showDecimalPlaces = 3 // 2 + Math.round(Math.log10(price || 1))

	export let isDebt = false

	export let showPlainFiat = false
	$: isFiat = showPlainFiat && symbol in fiatQuoteCurrencies

	$: isNegative = balance < 0

	export let tween = true


	import { formatValue } from '../utils/format-value'


	import { tweened } from 'svelte/motion'
	const tweenedValue = tweened(0, {
		duration: tween ? 1000 : 0,
		delay: tween ? 1 : 0,
		easing: quintOut,
		interpolate: (from, to) => t => {
			const logFrom = from ? Math.log10(from) : -showDecimalPlaces - 1
			const logTo = to ? Math.log10(to) : -showDecimalPlaces - 1
			return Math.pow(10, logFrom + t * (logTo - logFrom))
		}
	})
	$: tweenedValue.set(Math.abs(balance || 0))


	import TokenIcon from './TokenIcon.svelte'
	import { expoOut, quintOut } from 'svelte/easing'
</script>


<style>
	.token-balance-container {
		display: inline-grid;
		grid-auto-flow: column;
		justify-content: start;
		align-items: baseline;
		--padding-inner: 0.33em;
		gap: var(--padding-inner);
	}

	.token-balance-container > * {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.token-name {
		font-weight: 300;
		font-size: 0.8em;
	}
	.token-balance {
		font-weight: 500;
	}

	.is-debt {
		color: hsl(31deg 93% 54%);
	}
</style>


<span class="token-balance-container" class:is-debt={isDebt} title="{balance} {name || symbol}{symbol && name ? ` (${symbol})` : ``}">
	{#if isFiat}
		<span class="token-balance">{isNegative ? '−' : ''}{formatValue($tweenedValue, symbol)}</span>
	{:else}
		<TokenIcon {symbol} {address} {name} {icon} {erc20Token} />
		<span>
			<span class="token-balance">{isNegative ? '−' : ''}{formatValue($tweenedValue)}</span>
			<span class="token-name">{symbol || '___'}</span>
		</span>
	{/if}
</span>