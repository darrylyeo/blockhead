<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from '../data/currency/currency'

	export let value = '...'
	export let token: TickerSymbol
	export let tokenAddress: Ethereum.ContractAddress
	export let showDecimalPlaces = 3

	const formatValue = value =>
		typeof value === 'number' ? value.toFixed(showDecimalPlaces) :
		typeof value === 'string' ? value :
		value?.toString()
	
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

	.token-name {
		font-weight: 300;
		font-size: 0.8em;
	}
</style>

<span class="token-value-container">
	<TokenIcon {token} {tokenAddress} />
	<span>
		<span class="token-value">{formatValue(value)}</span>
		<span class="token-name">{token}</span>
	</span>
</span>