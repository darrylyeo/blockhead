<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'

	export let value = 0.0
	export let token = 'ETH'
	export let tokenAddress: Ethereum.ContractAddress
	export let decimals = 3

	const formatValue = value =>
		typeof value === 'number' ? value.toFixed(decimals) :
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

	.is-zero {
		opacity: 0.55;
	}
</style>

<span class="token-value-container">
	<TokenIcon {token} {tokenAddress} />
	<span class:is-zero={value == 0}>
		<span class="token-value">{formatValue(value)}</span>
		<span class="token-name">{token}</span>
	</span>
</span>