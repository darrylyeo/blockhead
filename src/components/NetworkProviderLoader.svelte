<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { getEthersProvider } from '../data/ethereum/provider'
	import { preferences } from '../data/ethereum/preferences'
	

	export let network: Ethereum.Network
	export let providerPromise: () => Promise<Ethereum.Provider>
	export let providerName: Ethereum.ProviderName = $preferences.rpcNetwork


	let viaRPC = $preferences.rpcNetwork === 'Auto' ? '' : ` via ${$preferences.rpcNetwork}`


	import Loader from './Loader.svelte'
	import TokenIcon from './TokenIcon.svelte'
</script>


<Loader
	loadingMessage="Connecting to the {network ? `${network.name} ` : ''} blockchain{viaRPC}..."
	let:then={provider}
>
	<TokenIcon slot="loadingIcon" symbol={network?.nativeCurrency.symbol} />

	<slot name="header" slot="header" {network} {provider} />

	<slot {network} {provider} />
</Loader>