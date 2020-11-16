<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'

	export let value = 0.0
	export let token = 'ETH'
	export let tokenAddress: Ethereum.ContractAddress
	export let decimals = 3

	const formatValue = value =>
		typeof value === 'number' ? value.toFixed(decimals) :
		typeof value === 'string' ? value :
		value.toString()
	
	import TokenIcon from './TokenIcon.svelte'
</script>

<style>
	div {
		display: inline-grid;
		grid-auto-flow: column;
		justify-content: start;
		align-items: center;
		gap: var(--padding-inner);

		line-height: 1;
		align-self: baseline;
	}

	div {
		--padding-inner: 0.33em;
	}

	.token-name {
		font-weight: 300;
		font-size: 0.8em;
	}
</style>

<div>
	<TokenIcon {token} {tokenAddress} />
	<span>
		<span class="token-value">{formatValue(value)}</span>
		<span class="token-name">{token}</span>
	</span>
</div>