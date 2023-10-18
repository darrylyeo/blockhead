<script lang="ts">
	// Constants/types
	import { VerifiedCredentialProvider, verifiedCredentialProviderIcons } from '../data/verifiedCredentialProvider'
	import type { Disco } from '../api/disco/index'

	
	// Inputs
	export let credentialId: ReturnType<typeof crypto.randomUUID>
	export let verifiedCredentialProvider: VerifiedCredentialProvider
	

	// Outputs
	export let credential: Disco.VerifiableCredential

	type SharedSlotProps = {
		credential: typeof credential,
	}

	type $$Slots = {
		default: SharedSlotProps,
		header: SharedSlotProps & {
			isOpen: boolean,
			toggle: () => boolean,
		},
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'
	import { getCredential } from '../api/disco/index'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading verified credential via {verifiedCredentialProvider}..."
	loadingIcon={verifiedCredentialProviderIcons[verifiedCredentialProvider]}
	errorMessage="Couldn't load verified credential via {verifiedCredentialProvider}."
	{...{
		[VerifiedCredentialProvider.Disco]: {
			fromQuery: credentialId && createQuery({
				queryKey: ['VerifiableCredential', {
					credentialId,
					verifiedCredentialProvider,
				}],
				queryFn: async () => (
					await getCredential(credentialId)
				),
			}),
		},
	}[verifiedCredentialProvider]}
	{...$$restProps}
	bind:result={credential}
	let:result={credential}
>
	<svelte:fragment slot="header"
		let:result={credential}
		let:isOpen let:toggle
	>
		<slot name="header"
			{credential}
			{isOpen} {toggle}
		/>
	</svelte:fragment>

	<slot {credential} />
</Loader>
