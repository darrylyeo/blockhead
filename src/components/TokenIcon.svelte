<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import * as CryptoIcons from 'svelte-cryptoicon'

	export let token = 'ETH'
	export let tokenAddress: Ethereum.ContractAddress | undefined

	$: Icon = CryptoIcons[token[0].toUpperCase() + token.slice(1).toLowerCase()]
</script>

<picture>
	{#if Icon}
		<svelte:component this={Icon} size="1.25em" /> 
	{:else if tokenAddress}
		<source srcset="https://token-icons.s3.amazonaws.com/{tokenAddress.toLowerCase()}.png">
		<source srcset="https://tokens.1inch.exchange/{tokenAddress.toLowerCase()}.png">
		<img title={token + (tokenAddress ? ` (${tokenAddress})` : '')}>
	{:else}
		<i class="placeholder-icon" data-icon={token.slice(0, 4)}></i>
	{/if}
</picture>

<style>
	picture {
		display: inline-flex;
		align-self: center;
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