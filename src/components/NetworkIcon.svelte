<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'
	import { getNetworkIcon, isTestnet } from '$/data/networks'


	export let network: Ethereum.Network
	export let imageSources: string[] = []
	// export let defaultToTokenIcon = true


	$: imageSource = getNetworkIcon(network)


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
			<TokenIcon
				token={{
					chainId: network.chainId,
					...network.nativeCurrency,
				}}
			/>
		</slot>
	</Icon>
<!-- {/if} -->
{/if}
