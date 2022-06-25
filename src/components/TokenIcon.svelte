<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { TickerSymbol } from '../data/currency/currency'
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


	import Icon from './Icon.svelte'
</script>


{#if symbol?.includes(' / ')}
	{#each symbol.split(' / ') as symbol}
		<svelte:self {symbol} />
	{/each}
{:else}
	<Icon
		key={address || symbol}
		imageSources={[
			{
				'AAVE': '/tokens/AAVE.svg',
				'AVAX': '/tokens/AVAX.svg',
				'BNB': '/tokens/BNB.svg',
				'BTC': '/tokens/BTC.svg',
				'COMP': '/tokens/COMP.svg',
				'DAI': '/tokens/DAI.svg',
				'ENS': '/tokens/ENS.svg',
				'ETH': '/tokens/ETH.svg',
				'FTM': '/tokens/FTM.svg',
				'MATIC': '/tokens/MATIC.svg',
				'MKR': '/tokens/MKR.svg',
				'ONE': '/tokens/ONE.svg',
				'USDC': '/tokens/USDC.svg',
				// 'USDC': '/tokens/USDC-filled.svg',
				'USDT': '/tokens/USDT.svg',
				'WBTC': '/tokens/WBTC.svg',
			}[symbol],
			// address && `https://token-icons.s3.amazonaws.com/${address.toLowerCase()}.png`,
			icon,
			// symbol && `https://zapper.fi/images/${symbol}-icon.png`,
			// address && `https://tokens.1inch.exchange/${address.toLowerCase()}.png`,
			// address && `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${address}/logo.png`,
			address && erc20TokensByContractAddress[address.toLowerCase()]?.icon,
			symbol && erc20TokensBySymbol[symbol]?.icon,
		].filter(Boolean)}
		title={symbol + (address ? ` (${address})` : '')}
		placeholder={symbol ?? '?'}
	>
		<slot />
	</Icon>
{/if}
