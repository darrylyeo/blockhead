<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { networkByChainId } from '$/data/networks'


	// Inputs
	export let format: 'token' | 'fiat' = 'token'
	export let token: Partial<Ethereum.NativeCurrency | Ethereum.Erc20Token> = {}
	export let balance: number | bigint | undefined
	export let isDebt = false

	// (Derived)
	$: network = token.chainId && networkByChainId.get(token.chainId)

	$: formattedBalance = Number(balance) * 0.1 ** (token.decimals ?? 0)

	$: displayedBalance = (
		showSmallestUnits ?
			Number(balance)
		:
			formattedBalance
	)

	$: isZero = balance !== undefined && Number(balance) === 0
	$: isNegative = balance !== undefined && (balance ? balance < 0 : balance.toString()[0] === '-')

	$: compactLargeValues = format === 'token'

	$: title = `${formattedBalance} ${token.name || token.symbol}${token.symbol && token.name ? ` (${token.symbol})` : ``}`


	// (View options)
	export let showName = false
	export let showDecimalPlaces = 3 // 2 + Math.round(Math.log10(price || 1))
	export let showSmallestUnits = false

	export let tween = true
	export let clip = true
	export let transitionWidth = true

	$: computedFormat = {
		...(
			showSmallestUnits ?
				'unitSymbol' in token && token.unitSymbol ?
					{
						currency: token.unitSymbol,
						showDecimalPlaces: 0,
					}
				:
					{
						currency: `${token.symbol} units`,
						showDecimalPlaces: 0,
					}
					
			:
				{
					currency: token.symbol,
					showDecimalPlaces,
				}
		),
		compactLargeValues,
	}


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
				value={Math.abs(displayedBalance)}
				format={computedFormat}
				{tween} {clip} {transitionWidth}
			/>
		</span>
	{:else}
		<TokenIcon {token} />

		<span class="inline-no-wrap">
			<span class="token-balance">
				{isNegative ? '−' : ''}<TweenedNumber
					value={Math.abs(displayedBalance)}
					format={{
						...computedFormat,
						currency: undefined,
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
				<span class="token-name">
					{#if showName && token.name}
						{token.name}
					{:else if showSmallestUnits}
						{#if 'unitSymbol' in token && token.unitSymbol}
							<abbr
								title={`10^−${token.decimals} ${token.symbol}`}
							>{token.unitSymbol}</abbr>
						{:else}
							{token.symbol} units
						{/if}
					{:else if token.symbol}
						{token.symbol}
					{:else if formattedAddress}
						{formattedAddress}
					{/if}
				</span>
			</Address>
		</span>
	{/if}
</span>
