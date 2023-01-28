<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { getEthersProvider } from '../data/providers'
	import { preferences } from '../state/preferences'


	export let network: Ethereum.Network
	export let providerPromise: () => Promise<Ethereum.Provider>
	export let providerName: Ethereum.ProviderName = $preferences.rpcNetwork


	let viaRPC = $preferences.rpcNetwork === 'Auto' ? '' : ` via ${$preferences.rpcNetwork}`


	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


<Loader
	loadingMessage="Connecting to the {network ? `${network.name} ` : ''} blockchain{viaRPC}..."
	fromPromise={network && providerName && (async () =>
		await getEthersProvider({
			network,
			networkProvider: providerName
		})
	)}
	let:result={provider}
	clip={false}
>
	<NetworkIcon slot="loadingIcon" {network} />

	<slot name="header" slot="header" {network} {provider} />

	<slot {network} {provider} />
</Loader>
