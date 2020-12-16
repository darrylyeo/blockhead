<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from '../data/currency/currency'
	import * as CryptoIcons from 'svelte-cryptoicon'

	export let token: TickerSymbol
	export let tokenAddress: Ethereum.ContractAddress | undefined
	export let tokenIcon: string

	let loadingError = false

	$: Icon = token && CryptoIcons[token[0].toUpperCase() + token.slice(1).toLowerCase()]
</script>

<picture title={token + (tokenAddress ? ` (${tokenAddress})` : '')}>
	{#if Icon}
		<svelte:component this={Icon} size="1.25em" /> 
	{:else if !loadingError && (tokenAddress || tokenIcon)}
		{#if tokenAddress}
			<source srcset="https://token-icons.s3.amazonaws.com/{tokenAddress.toLowerCase()}.png">
			<source srcset="https://tokens.1inch.exchange/{tokenAddress.toLowerCase()}.png">
		{/if}
		{#if tokenIcon}
			<source srcset={tokenIcon}>
		{/if}
		<img on:error={() => loadingError = true}>
	{:else}
		<i class="placeholder-icon" data-icon={token?.slice(0, 4) ?? '?'}></i>
	{/if}
</picture>

<style>
	picture {
		display: inline-flex;
		height: 1em;
		align-self: center;
		align-items: center;
	}

	img, .placeholder-icon {
		width: 1.25em;
		height: 1.25em;
	}

	.placeholder-icon {
		background-color: rgba(50, 50, 50, 0.75);
		color: #fff;

		display: inline-flex;
		place-items: center;
		place-content: center;
		border-radius: 50%;
		overflow: hidden;
	}
	.placeholder-icon:before {
		content: attr(data-icon);

		font-size: 0.37em;
		font-style: normal;
		font-weight: 500;
	}
</style>