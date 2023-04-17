<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { isTestnet, mainnetForTestnet } from '../data/networks'


	export let network: Ethereum.Network
	export let imageSources: string[] = []
	// export let defaultToTokenIcon = true


	import { ArbitrumIcon, AuroraIcon, BaseIcon, CeloIcon, CronosIcon, EvmosIcon, GnosisIcon, HarmonyIcon, MetisIcon, OptimismIcon, PolygonZkevmIcon, ScrollIcon, SKALEIcon } from '../assets/networkIcons'
	import { tokenIcons } from '../assets/tokenIcons'

	const networkIcons: Record<Ethereum.NetworkName, string> = {
		'arbitrum-one': ArbitrumIcon,
		'aurora': AuroraIcon,
		'avalanche': tokenIcons.AVAX, // AvalancheIcon,
		'base': BaseIcon,
		'celo': CeloIcon,
		'cronos': CronosIcon,
		'ethereum': tokenIcons.ETH, // EthereumIcon,
		'evmos': EvmosIcon,
		'gnosis': GnosisIcon,
		'harmony': HarmonyIcon,
		'metis': MetisIcon,
		'optimism': OptimismIcon,
		// 'nahmii': NahmiiIcon,
		// 'nervos': NervosIcon,
		'polygon': tokenIcons.MATIC, // PolygonIcon,
		'polygon-zkevm': PolygonZkevmIcon, // PolygonIcon,
		// 'reef': ReefIcon,
		'scroll': ScrollIcon,
		'skale': SKALEIcon,
	}

	$: imageSource = networkIcons[network?.slug] || networkIcons[mainnetForTestnet[network?.slug]?.slug]


	import Icon from './Icon.svelte'
	import TokenIcon from './TokenIcon.svelte'
</script>


{#if network}
<!-- {#if defaultToTokenIcon}
	<TokenIcon {network} erc20Token={network.nativeCurrency}>
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
		isGrayscale={isTestnet(network)}
	>
		<slot>
			<TokenIcon {network} erc20Token={network.nativeCurrency} />
		</slot>
	</Icon>
<!-- {/if} -->
{/if}
