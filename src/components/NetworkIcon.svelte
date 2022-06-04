<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'


	export let network: Ethereum.Network
	export let imageSources = []
	// export let defaultToTokenIcon = true


	const networkIcons: Record<Ethereum.NetworkName, string> = {
		'arbitrum-one': '/networks/Arbitrum.svg',
		'aurora': '/networks/Aurora.svg',
		'avalanche': '/tokens/AVAX.svg', // '/networks/Avalanche.svg',
		'celo': '/networks/Celo.svg',
		'ethereum': '/tokens/ETH.svg', // '/networks/Ethereum.svg',
		'harmony': '/networks/Harmony.svg',
		'metis': '/networks/Metis.png',
		'optimism': '/networks/Optimism.svg',
		'nahmii': '/networks/Nahmii.svg',
		'nervos': '/networks/Nervos.svg',
		'polygon': '/tokens/MATIC.svg', // '/networks/Polygon.svg',
		'reef': '/networks/Reef.svg',
		'skale': '/networks/SKALE.svg',
	}

	$: imageSource = networkIcons[network.slug]


	import Icon from './Icon.svelte'
	import TokenIcon from './TokenIcon.svelte'
</script>


<!-- {#if defaultToTokenIcon}
	<TokenIcon erc20Token={network.nativeCurrency}>
		<Icon
			key={network.slug}
			imageSources={[
				imageSource,
				...imageSources
			].filter(Boolean)}
			title={network.name}
			placeholder={network.name}
		>
			<slot />
		</Icon>
	</TokenIcon>
{:else} -->
	<Icon
		key={network.slug}
		imageSources={[
			imageSource,
			...imageSources
		].filter(Boolean)}
		title={network.name}
		placeholder={network.name}
	>
		<slot>
			<TokenIcon erc20Token={network.nativeCurrency} />
		</slot>
	</Icon>
<!-- {/if} -->
