<script lang="ts">
	// Types
	import type { Ethereum } from '../data/networks/types'
	import { NetworkProvider } from '../data/networkProviders/types'
	import { getViemPublicClient } from '../data/networkProviders'


	// Context
	import { preferences } from '../state/preferences'


	// Inputs
	export let network: Ethereum.Network | undefined
	export let publicClientPromise: () => Promise<Ethereum.PublicClient>
	export let networkProvider: NetworkProvider

	// (Computed]
	$: networkProvider = $$props.networkProvider || $preferences.rpcNetwork

	// (View options)
	export let loaderViewOptions: Partial<Loader<any, any, any, any, any>['viewOptions']> | undefined


	// Internal state
	$: viaRPC = networkProvider === NetworkProvider.Default ? '' : ` via ${networkProvider}`


	import Loader from './Loader.svelte'
	import NetworkIcon from './NetworkIcon.svelte'
</script>


{#if network && (publicClientPromise || networkProvider)}
	<Loader
		viewOptions={{
			clip: false,
			...loaderViewOptions,
		}}
		loadingMessage="Connecting to the {network.name} network{viaRPC}..."
		errorMessage="Error connecting to the {network.name} network{viaRPC}. Try changing the On-Chain Data provider in Preferences."
		fromPromise={
			publicClientPromise || (async () => {
				const publicClient = getViemPublicClient({
					network,
					networkProvider: networkProvider,
				})

				if(!publicClient)
					throw new Error(`Couldn't find a${networkProvider.match(/^[aeiou]/gi) ? 'n' : ''} ${networkProvider} node matching the configuration.`)

				return publicClient
			})
		}
		let:result={publicClient}
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
{/if}
