<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'


	export let network: Ethereum.Network
	export let imageSources = []
	// export let defaultToTokenIcon = true


	import { ArbitrumIcon, AuroraIcon, CeloIcon, CronosIcon, EvmosIcon, GnosisIcon, HarmonyIcon, MetisIcon, OptimismIcon, SKALEIcon } from '../assets/networkIcons'
	import { tokenIcons } from '../assets/tokenIcons'

	const networkIcons: Record<Ethereum.NetworkName, string> = {
		'arbitrum-one': ArbitrumIcon,
		'aurora': AuroraIcon,
		'avalanche': tokenIcons.AVAX, // AvalancheIcon,
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
		// 'reef': ReefIcon,
		'skale': SKALEIcon,
	}

	$: imageSource = networkIcons[network.slug]


	import Icon from './Icon.svelte'
	import TokenIcon from './TokenIcon.svelte'
</script>


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
	>
		<slot>
			<TokenIcon {network} erc20Token={network.nativeCurrency} />
		</slot>
	</Icon>
<!-- {/if} -->
