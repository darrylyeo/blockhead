<script lang="ts">
	import type { TickerSymbol } from '../data/currency/currency'
	import type { Ethereum } from '../data/ethereum/types'


	export let symbol: TickerSymbol
	export let address: Ethereum.ContractAddress
	export let name: string
	export let icon: string

	export let erc20Token: Ethereum.ERC20Token
	$: symbol ||= erc20Token?.symbol
	$: address ||= erc20Token?.address
	$: name ||= erc20Token?.name
	$: icon = erc20Token?.icon


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

		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>


<span class="token-value-container" title="{name || symbol}{symbol && name ? ` (${symbol})` : ``}">
	<TokenIcon {symbol} {address} {icon} />
	<span class="token-name">{symbol}</span>
</span>