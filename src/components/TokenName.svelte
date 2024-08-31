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

	export let layout: 'name-and-symbol' | 'name-or-symbol' | 'symbol' = 'symbol'


	// Internal state
	// (Computed)
	$: computedLayout = (
		layout === 'name-and-symbol' && token.name && token.symbol ?
			'name-and-symbol'
		: layout === 'name-or-symbol' && token.symbol ?
			token.name ?
				'name'
			:
				'symbol'
		: token.symbol ?
			'symbol'
		:
			'none'
	)


	// Actions
	const onDragStart = (e: DragEvent) => {
		e.dataTransfer.setData('text/plain', title)
	}


	// Components
	import Address from './Address.svelte'
	import TokenIcon from './TokenIcon.svelte'
</script>


<Address
	{network}
	address={token.address}
>
	{#if computedLayout === 'name-and-symbol'}
		<span class="name">{token.name}</span>
	{/if}

	{#if computedLayout === 'name-and-symbol'}({/if}<span
		class="row with-float"
		{title}
		draggable={true}
		on:dragstart={onDragStart}
	>
		<TokenIcon
			{network}
			{token}
		/>

		{#if computedLayout === 'name'}
			<span class="name">{token.name}</span>
		{:else if computedLayout === 'symbol' || computedLayout === 'name-and-symbol'}
			<span class="symbol">{token.symbol}</span>
		{/if}
	</span>{#if computedLayout === 'name-and-symbol'}){/if}
</Address>


<style>
	.name,
	.symbol {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.symbol {
		font-weight: 300;
	}

	.with-float {
		justify-content: start;

		.name,
		.symbol {
			font-size: 0.8em;
		}
	}
</style>
