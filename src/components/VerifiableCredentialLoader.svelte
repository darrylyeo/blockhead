<script lang="ts">
	// Constants/types
	import { VerifiableCredentialProvider, verifiableCredentialProviderIcons } from '$/data/verifiableCredentialProvider'
	import type { Disco } from '$/api/disco/index'

	
	// Inputs
	export let credentialId: ReturnType<typeof crypto.randomUUID>
	export let verifiableCredentialProvider: VerifiableCredentialProvider
	

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


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading verified credential via {verifiableCredentialProvider}..."
	loadingIcon={verifiableCredentialProviderIcons[verifiableCredentialProvider]}
	errorMessage="Couldn't load verified credential via {verifiableCredentialProvider}."
	{...{
		[VerifiableCredentialProvider.Disco]: () => ({
			fromQuery: credentialId && createQuery({
				queryKey: ['VerifiableCredential', {
					credentialId,
					verifiableCredentialProvider,
				}],
				queryFn: async () => {
					const { getCredential } = await import('$/api/disco/index')

					return await getCredential(credentialId)
				},
			}),
		}),
	}[verifiableCredentialProvider]?.()}
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
