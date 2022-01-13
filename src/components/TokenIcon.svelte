<script context="module" lang="ts">
	const cachedImageSources = {}
	const cachedIndex = {}
</script>

<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from '../data/currency/currency'
	import * as CryptoIcons from 'svelte-cryptoicon'
	import { erc20TokensByContractAddress, erc20TokensBySymbol } from '../data/ethereum/tokens/tokens'


	export let symbol: TickerSymbol
	export let address: Ethereum.ContractAddress
	export let name: string
	export let icon: string

	export let erc20Token: Ethereum.ERC20Token
	$: symbol = $$props.symbol || erc20Token?.symbol
	$: address = $$props.address || erc20Token?.address
	$: name = $$props.name || erc20Token?.name
	$: icon = $$props.icon || erc20Token?.icon


	let i = cachedIndex[address || symbol] ||= 0
	$: cachedIndex[address || symbol] = i
	$: imageSources = cachedImageSources[address || symbol] ||= [
		symbol === 'AVAX' && '/logos/avax-token.svg',
		symbol === 'MATIC' && '/logos/matic-token.svg',
		symbol === 'FTM' && '/logos/fantom-token.svg',
		symbol === 'METIS' && '/logos/metis-token.png',
		symbol === 'AETH' && '/logos/arbitrum.svg',
		symbol === 'skETH' && '/logos/skale-token.svg',
		symbol === 'CELO' && '/logos/celo.svg',
		symbol === 'AAVE' && 'https://token-icons.s3.amazonaws.com/0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9.png',
		address && `https://token-icons.s3.amazonaws.com/${address.toLowerCase()}.png`,
		icon,
		symbol && `https://zapper.fi/images/${symbol}-icon.png`,
		address && `https://tokens.1inch.exchange/${address.toLowerCase()}.png`,
		address && `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`,
		address && erc20TokensByContractAddress[address.toLowerCase()]?.icon,
		symbol && erc20TokensBySymbol[symbol]?.icon,
	].filter(Boolean)

	// let loadingError

	$: Icon = symbol && !['DAI', 'LINK', 'LRC', 'AMP', 'DOGE', 'MATIC'].includes(symbol) && CryptoIcons[symbol[0].toUpperCase() + symbol.slice(1).toLowerCase()]
</script>


{#if symbol?.includes(' / ')}
	{#each symbol.split(' / ') as symbol}
		<svelte:self {symbol} />
	{/each}
{:else}
	<picture class="token-icon" title={symbol + (address ? ` (${address})` : '')}>
		{#if Icon}
			<svelte:component this={Icon} size="1.25em" />
		<!-- {:else if !loadingError && (address || icon || token)}
			{#if address}
				<source src="https://token-icons.s3.amazonaws.com/{address.toLowerCase()}.png">
				<source src="https://tokens.1inch.exchange/{address.toLowerCase()}.png">
				<source src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/{address}/logo.png">
			{/if}
			{#if icon}
				<source src={icon}>
			{/if}
			{#if token}
				<source src="https://zapper.fi/images/{token}-icon.png">
			{/if}
			<img on:error={e => loadingError = e}>
			<img src={icon || `https://zapper.fi/images/${token}-icon.png`} on:error={e => loadingError = e}> -->
		{:else if imageSources[i]}
			<img src={imageSources[i]} on:error={e => i++} />
		{:else}
			<span class="placeholder-icon" data-icon={symbol ?? '?'} />
		{/if}
	</picture>
{/if}


<style>
	.token-icon {
		--token-size: 1.25em;

		display: inline-flex;
		width: var(--token-size);
		height: 1em;
		align-self: center;
		align-items: center;
	}
	.token-icon + :global(.token-icon) {
		margin-left: calc(-0.25em - var(--padding-inner));
	}

	source {
		display: none;
	}

	img, .placeholder-icon, .token-icon > :global(svg) {
		width: var(--token-size);
		height: var(--token-size);
		max-width: 100%;
		aspect-ratio: 1;
		border-radius: 0.3em;
		object-fit: contain;
	}

	.placeholder-icon {
		/* background-color: rgba(50, 50, 50, 0.75);
		background-color: var(--primary-color); */
		background: radial-gradient(transparent -175%, var(--primary-color) 125%);
		/* border: 0.1em dotted var(--primary-color); */
		/* box-shadow: 0 0 0.125em 0.125em var(--primary-color) inset; */

		color: #fff;

		display: inline-flex;
		/* place-items: center; */
		place-content: center;
		text-align: center;
		border-radius: 50%;
		overflow: hidden;

		line-height: var(--token-size);
		padding: 0 0.1em;
	}
	.placeholder-icon:before {
		content: attr(data-icon);

		font-family: Pally, var(--base-fonts);
		font-size: 0.5em;
		font-weight: bold;

		/* white-space: pre;
		word-break: keep-all; */
	}

	/* ETH SVG off-center correction */
	picture[title="ETH"] :global(circle + g) {
		transform: translateX(-.498px);
	}
</style>