<script context="module" lang="ts">
	const cachedImageSources = {}
	const cachedIndex = {}
</script>

<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from '../data/currency/currency'
	import * as CryptoIcons from 'svelte-cryptoicon'
	import { erc20TokensByContractAddress, erc20TokensBySymbol } from '../data/ethereum/tokens/tokens'


	export let token: TickerSymbol
	export let tokenAddress: Ethereum.ContractAddress | undefined
	export let tokenIcon: string


	let i = cachedIndex[tokenAddress || token] ||= 0
	$: cachedIndex[tokenAddress || token] = i
	$: imageSources = cachedImageSources[tokenAddress || token] ||= [
		token === 'AVAX' && '/logos/avax-token.svg',
		token === 'AAVE' && 'https://token-icons.s3.amazonaws.com/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png',
		tokenAddress && `https://token-icons.s3.amazonaws.com/${tokenAddress.toLowerCase()}.png`,
		tokenIcon,
		token && `https://zapper.fi/images/${token}-icon.png`,
		tokenAddress && `https://tokens.1inch.exchange/${tokenAddress.toLowerCase()}.png`,
		tokenAddress && `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddress}/logo.png`,
		tokenAddress && erc20TokensByContractAddress[tokenAddress.toLowerCase()]?.icon,
		token && erc20TokensBySymbol[token]?.icon,
	].filter(Boolean)

	// let loadingError

	$: Icon = token && !['DAI', 'LINK', 'LRC'].includes(token) && CryptoIcons[token[0].toUpperCase() + token.slice(1).toLowerCase()]
</script>


{#if token?.includes(' / ')}
	{#each token.split(' / ') as token}
		<svelte:self {token} />
	{/each}
{:else}
	<picture class="token-icon" title={token + (tokenAddress ? ` (${tokenAddress})` : '')}>
		{#if Icon}
			<svelte:component this={Icon} size="1.25em" />
		<!-- {:else if !loadingError && (tokenAddress || tokenIcon || token)}
			{#if tokenAddress}
				<source src="https://token-icons.s3.amazonaws.com/{tokenAddress.toLowerCase()}.png">
				<source src="https://tokens.1inch.exchange/{tokenAddress.toLowerCase()}.png">
				<source src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/{tokenAddress}/logo.png">
			{/if}
			{#if tokenIcon}
				<source src={tokenIcon}>
			{/if}
			{#if token}
				<source src="https://zapper.fi/images/{token}-icon.png">
			{/if}
			<img on:error={e => loadingError = e}>
			<img src={tokenIcon || `https://zapper.fi/images/${token}-icon.png`} on:error={e => loadingError = e}> -->
		{:else if imageSources[i]}
			<img src={imageSources[i]} on:error={e => i++} alt={token} />
		{:else}
			<i class="placeholder-icon" data-icon={token?.slice(0, 4) ?? '?'}></i>
		{/if}
	</picture>
{/if}

<style>
	.token-icon {
		display: inline-flex;
		height: 1em;
		align-self: center;
		align-items: center;
	}
	.token-icon + :global(.token-icon) {
		margin-left: calc(-25% - var(--padding-inner));
	}

	source {
		display: none;
	}

	img, .placeholder-icon {
		width: 1.25em;
		height: 1.25em;
		border-radius: 0.3em;
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