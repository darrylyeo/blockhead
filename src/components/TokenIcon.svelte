<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'
	import { erc20TokensByContractAddress, erc20TokensBySymbol } from '$/data/tokens'


	// Inputs
	export let token: {
		name?: string,
		chainId?: Ethereum.ChainId,
		symbol?: string,
		address?: Ethereum.ContractAddress,
		decimals?: number,
		icon?: string,
	}


	// Components
	import Icon from './Icon.svelte'
	import { tokenIcons } from '$/assets/tokenIcons'
</script>


{#if token.symbol?.includes(' / ')}
	{#each token.symbol.split(' / ') as _symbol}
		<svelte:self symbol={_symbol} />
	{/each}
{:else}
	<Icon
		key={token.address || token.symbol}
		imageSources={[
			token.symbol && token.symbol in tokenIcons && tokenIcons[token.symbol],
			// token.address && `https://token-icons.s3.amazonaws.com/${address.toLowerCase()}.png`,
			token.icon,
			// token.symbol && `https://zapper.fi/images/${symbol}-icon.png`,
			// token.address && `https://tokens.1inch.exchange/${address.toLowerCase()}.png`,
			// token.address && `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`,
			token.address && erc20TokensByContractAddress[token.address.toLowerCase()]?.icon,
			token.symbol && erc20TokensBySymbol[token.symbol]?.icon,
		].filter(Boolean)}
		title={token.symbol + (token.address ? ` (${token.address})` : '')}
		placeholder={token.symbol ?? '?'}
	>
		<slot />
	</Icon>
{/if}
