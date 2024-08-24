<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { networkByChainId } from '$/data/networks'


	// Inputs
	export let token: {
		name?: string,
		chainId?: Ethereum.ChainId,
		symbol?: string,
		address?: Ethereum.ContractAddress,
		decimals?: number,
		icon?: string,
	}

	$: title = `${token.name || token.symbol}${token.symbol && token.name ? ` (${token.symbol})` : ``}`
	$: network = token.chainId && networkByChainId.get(token.chainId)

	export let showName = false


	// Actions
	const onDragStart = (e: DragEvent) => {
		e.dataTransfer.setData('text/plain', title)
	}


	// Components
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
	address={token.address}
>
	<span
		class="token-value-container"
		{title}
		draggable={true}
		on:dragstart={onDragStart}
	>
		<TokenIcon
			{network}
			{token}
		/>
		<span class="token-name">
			{#if showName && token.name}
				{token.name}
			{:else if token.symbol}
				{token.symbol}
			{/if}
		</span>
	</span>
</Address>
