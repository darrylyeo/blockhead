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
	$: symbol = $$props.symbol || erc20Token?.symbol
	$: address = $$props.address || erc20Token?.address
	$: name = $$props.name || erc20Token?.name
	$: icon = $$props.icon || erc20Token?.icon

	export let balance: number | string | BigNumberish = 0
	export let price
	export let showDecimalPlaces = 3 // 2 + Math.round(Math.log10(price || 1))

	export let isDebt = false

	export let showPlainFiat = false
	$: isFiat = showPlainFiat && symbol in fiatQuoteCurrencies

	$: isZero = balance == 0
	$: isNegative = balance < 0

	$: compactLargeValues = !showPlainFiat

	$: title = `${balance} ${name || symbol}${symbol && name ? ` (${symbol})` : ``}`


	export let tween = true
	export let clip = true
	export let transitionWidth = true


	import { formatValue } from '../utils/formatValue'
	import { formatAddress } from '../utils/formatAddress'

	
	const onDragStart = (e: DragEvent) => {
		e.dataTransfer.setData('text/plain', title)
	}


	import TokenIcon from './TokenIcon.svelte'
	import TweenedNumber from './TweenedNumber.svelte'
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

	.inline-no-wrap {
		display: inline-grid;
		grid-auto-flow: column;
		gap: 0.45ch;
		align-items: baseline;
		width: max-content;
	}
	.token-balance {
		font-weight: 500;
	}
	.token-name {
		font-weight: 300;
		font-size: 0.8em;
		font-weight: 500;
		opacity: 0.75;
		/* font-weight: 900;
		opacity: 0.5; */
	}

	.is-debt {
		color: hsl(31deg 93% 54%);
	}

	.is-zero {
		opacity: 0.55;
	}
</style>


<span
	class="token-balance-container"
	class:is-debt={isDebt}
	class:is-zero={isZero}
	{title}
	draggable={true}
	on:dragstart={onDragStart}
>
	{#if isFiat}
		<span class="token-balance">
			{isNegative ? '−' : ''}<TweenedNumber
				value={Math.abs(balance || 0)}
				format={{
					currency: symbol,
					// showDecimalPlaces,
					compactLargeValues
				}}
				{showDecimalPlaces}
				{tween} {clip} {transitionWidth}
			/>
		</span>
	{:else}
		<TokenIcon {symbol} {address} {name} {icon} {erc20Token} />
		<span class="inline-no-wrap">
			<span class="token-balance">
				{isNegative ? '−' : ''}<TweenedNumber
					value={Math.abs(balance || 0)}
					format={{
						// showDecimalPlaces,
						compactLargeValues
					}}
					{showDecimalPlaces}
					{tween} {clip} {transitionWidth}
				/>
			</span>
			<span class="token-name">{symbol || formatAddress(address, 'middle-truncated')}</span>
		</span>
	{/if}
</span>