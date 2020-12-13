<script lang="ts">
	import type { TickerSymbol } from '../data/currency/currency'
	import type { Ethereum } from '../data/ethereum/types'

	export let token: TickerSymbol
	export let tokenAddress: Ethereum.ContractAddress
	export let tokenIcon: string

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
	<TokenIcon {token} {tokenAddress} {tokenIcon} />
	<span class="token-name">{token}</span>
</span>