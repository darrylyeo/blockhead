<script lang="ts">
	import type { Ethereum } from '../data/networks/types'
	import { NetworkProvider } from '../data/networkProviders/types'
	import { getViemPublicClient } from '../data/networkProviders'


	export let network: Ethereum.Network
	export let publicClientPromise: () => Promise<Ethereum.PublicClient>
	export let networkProvider: NetworkProvider


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
		publicClientPromise || (
			network && networkProvider && (async () => {
				const publicClient = getViemPublicClient({
					network,
					networkProvider: networkProvider,
				})

				if(!publicClient)
					throw new Error(`Couldn't find a${networkProvider.match(/^[aeiou]/gi) ? 'n' : ''} ${networkProvider} node matching the configuration.`)

				return publicClient
			})
		)
	}
	let:result={publicClient}
	clip={false}
	{...$$restProps}
>
	<NetworkIcon slot="loadingIcon" {network} />

	<svelte:fragment slot="header"
		let:result={publicClient}
		let:isOpen
		let:toggle
	>
		<slot name="header"
			{network} {publicClient}
			{isOpen} {toggle}
		/>
	</svelte:fragment>

	<slot {network} {publicClient} />
</Loader>
