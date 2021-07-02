<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { getProvider } from '../data/ethereum/provider'
	import { preferredEthereumProvider } from '../data/ethereum/preferences'
	

	export let network: Ethereum.Network
	export let providerPromise: () => Promise<Ethereum.Provider>
	export let providerName: Ethereum.ProviderName = $preferredEthereumProvider


	import { onMount } from 'svelte'
	let isMounted
	onMount(() => isMounted = true)

	$: if(isMounted)
		providerPromise ||= (network && providerName && (() => getProvider(network, providerName, 'ethers')))


	import Loader from './Loader.svelte'
	import TokenIcon from './TokenIcon.svelte'
</script>


<Loader
	loadingMessage="Connecting to the {network ? `${network.name} ` : ''} blockchain via {providerName}..."
	fromPromise={providerPromise}
	let:then={provider}
>
	<TokenIcon slot="loadingIcon" token={network.nativeCurrency.symbol} />

	<slot {provider} />
</Loader>