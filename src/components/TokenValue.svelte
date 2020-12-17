<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from '../data/currency/currency'

	export let token: TickerSymbol
	export let tokenAddress: Ethereum.ContractAddress
	export let tokenIcon: string
	export let tokenName: string

	export let value: number | string | BigInt = '...'
	export let showDecimalPlaces = 3

	export let showPlainFiat = false
	$: isFiat = showPlainFiat && ['USD', 'EUR', 'GBP', 'CAD', 'INR'].includes(token)

	const formatValue = value => {
		try {
			return new Intl.NumberFormat(globalThis.navigator.languages, {
				... isFiat ? {style: 'currency', currency: token} : {},
				minimumFractionDigits: showDecimalPlaces,
				maximumFractionDigits: showDecimalPlaces
			}).format(value)
		}catch(e){
			console.error(e)
			return value?.toString()
		}
	}
	
	import TokenIcon from './TokenIcon.svelte'
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
</style>

<span class="token-value-container" title="{value} {token} ({tokenName})">
	{#if isFiat}
		<span class="token-value">{formatValue(value)}</span>
	{:else}
		<TokenIcon {token} {tokenAddress} {tokenIcon} />
		<span>
			<span class="token-value">{formatValue(value)}</span>
			<span class="token-name">{token || '___'}</span>
		</span>
	{/if}
</span>