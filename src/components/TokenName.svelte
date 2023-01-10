<script lang="ts">
	import type { TickerSymbol } from '../data/currency/currency'
	import type { Ethereum } from '../data/ethereum/types'


	export let network: EthereumNetwork
	export let symbol: TickerSymbol
	export let address: Ethereum.ContractAddress
	export let name: string
	export let icon: string

	export let erc20Token: Ethereum.ERC20Token
	$: symbol = $$props.symbol || erc20Token?.symbol
	$: address = $$props.address || erc20Token?.address
	$: name = $$props.name || erc20Token?.name
	$: icon = $$props.icon || erc20Token?.icon

	$: title = `${name || symbol}${symbol && name ? ` (${symbol})` : ``}`


	const onDragStart = (e: DragEvent) => {
		e.dataTransfer.setData('text/plain', title)
	}


	import Address from './Address.svelte'
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


<Address
	{network}
	{address}
>
	<span
		class="token-value-container"
		{title}
		draggable={true}
		on:dragstart={onDragStart}
	>
		<TokenIcon {network} {symbol} {address} {name} {icon} {erc20Token} />
		<span class="token-name">{symbol}</span>
	</span>
</Address>
