<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { networksByChainID } from '$/data/networks'


	// Inputs
	export let format: 'token' | 'fiat' = 'token'
	export let token: {
		name?: string,
		chainId?: Ethereum.ChainID,
		symbol?: string,
		address?: Ethereum.ContractAddress,
		decimals?: number,
		icon?: string,
	}
	export let balance: number = 0
	export let isDebt = false

	// (Derived)
	$: network = token.chainId && networksByChainID[token.chainId]
	$: isZero = balance == 0
	$: isNegative = balance < 0

	$: compactLargeValues = format === 'token'

	$: title = `${balance} ${token.name || token.symbol}${token.symbol && token.name ? ` (${token.symbol})` : ``}`


	// (View options)
	export let showDecimalPlaces = 3 // 2 + Math.round(Math.log10(price || 1))

	export let tween = true
	export let clip = true
	export let transitionWidth = true


	// Actions
	const onDragStart = (e: DragEvent) => {
		e.dataTransfer.setData('text/plain', title)
	}


	// Components
	import Address from './Address.svelte'
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
		/* width: max-content; */
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
	{#if format === 'fiat'}
		<span class="token-balance">
			{isNegative ? '−' : ''}<TweenedNumber
				value={Math.abs(balance)}
				format={{
					currency: token.symbol,
					showDecimalPlaces,
					compactLargeValues
				}}
				{tween} {clip} {transitionWidth}
			/>
		</span>
	{:else}
		<TokenIcon {token} />

		<span class="inline-no-wrap">
			<span class="token-balance">
				{isNegative ? '−' : ''}<TweenedNumber
					value={Math.abs(balance)}
					format={{
						showDecimalPlaces,
						compactLargeValues
					}}
					{tween} {clip} {transitionWidth}
				/>
			</span>
			<Address
				{network}
				address={token.address}
				format="middle-truncated"
				let:formattedAddress
			>
				<span class="token-name">{token.symbol || formattedAddress}</span>
			</Address>
		</span>
	{/if}
</span>
