<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { NetworkProvider } from '../data/networkProviders/types'


	export let network: Ethereum.Network
	export let providerPromise: () => Promise<Ethereum.Provider>
	export let networkProvider: NetworkProvider


	import { getEthersProvider } from '../data/networkProviders'
	import { preferences } from '../state/preferences'

	$: networkProvider = $$props.networkProvider || $preferences.rpcNetwork

	$: viaRPC = networkProvider === NetworkProvider.Default ? '' : ` via ${networkProvider}`


	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


<Loader
	loadingMessage="Connecting to the {network ? `${network.name} ` : ''} network{viaRPC}..."
	errorMessage="Error connecting to the {network ? `${network.name} ` : ''} network{viaRPC}. Try changing the On-Chain Data provider in Preferences."
	fromPromise={
		providerPromise || (
			network && networkProvider && (async () =>
				await getEthersProvider({
					network,
					networkProvider,
				})
			)
		)
	}
	let:result={provider}
	clip={false}
	{...$$restProps}
>
	<NetworkIcon slot="loadingIcon" {network} />

	<svelte:fragment slot="header"
		let:result={provider}
	>
		<slot name="header" {network} {provider} />
	</svelte:fragment>

	<slot {network} {provider} />
</Loader>
