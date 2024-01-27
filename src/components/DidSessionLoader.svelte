<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { AccountConnection } from '$/state/account'

	import type { DIDSession } from 'did-session'
	import { DidProvider, didProviderIcons } from '$/data/didProvider'

	
	// Inputs
	export let network: Ethereum.Network
	export let address: Ethereum.Address
	export let didProvider: DidProvider
	export let accountConnection: AccountConnection
	

	// Outputs
	export let didSession: DIDSession

	type SharedSlotProps = {
		didSession: typeof didSession,
	}

	type $$Slots = {
		default: SharedSlotProps,
		header: SharedSlotProps & {
			isOpen: boolean,
			toggle: () => boolean,
		},
	}


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading DIDs via {didProvider}..."
	loadingIcon={didProviderIcons[didProvider]}
	errorMessage="Couldn't load DIDs via {didProvider}."
	{...{
		[DidProvider.Ceramic]: {
			fromPromise: address && accountConnection?.state?.signer && (async () => {
				const { getDidSession } = await import('$/api/ceramic/did')

				return await getDidSession({
					network,
					address,
					signer: accountConnection.state.signer,
					resources: [
						`ceramic://*`,
					],
				})
			}),
		},
	}[didProvider]}
	bind:result={didSession}
	let:result={didSession}
>
	<svelte:fragment slot="header"
		let:result={dids}
		let:isOpen let:toggle
	>
		<slot name="header"
			{didSession}
			{isOpen} {toggle}
		/>
	</svelte:fragment>

	<slot {didSession} />
</Loader>
