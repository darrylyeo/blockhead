<script lang="ts">
	// Constants/types
	import { VerifiedCredentialProvider, verifiedCredentialProviderIcons } from '../data/verifiedCredentialProvider'
	import type { DidUrl } from '../api/ceramic/did'
	import type { Disco } from '../api/disco/index'

	
	// Inputs
	export let verifiedCredentialProvider: VerifiedCredentialProvider
	export let did: DidUrl
	

	// Outputs
	export let credentials: Disco.VerifiableCredentialResponse[]

	type SharedSlotProps = {
		credentials: typeof credentials,
	}

	type $$Slots = {
		default: SharedSlotProps,
		header: SharedSlotProps & {
			isOpen: boolean,
			toggle: () => boolean,
		},
	}


	// Functions
	import { createInfiniteQuery } from '@tanstack/svelte-query'
	import { getCredentials } from '../api/disco/index'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading verified credential via {verifiedCredentialProvider}..."
	loadingIcon={verifiedCredentialProviderIcons[verifiedCredentialProvider]}
	errorMessage="Couldn't load verified credential via {verifiedCredentialProvider}."
	{...{
		[VerifiedCredentialProvider.Disco]: {
			fromQuery: did && createInfiniteQuery({
				queryKey: ['VerifiableCredentials', {
					did,
					verifiedCredentialProvider,
				}],
				queryFn: async ({ pageParam: page }) => (
					await getCredentials(did, { page })
				),
				getNextPageParam: (lastPage, allPages) => allPages.length,
			}),
			then: result => (
				result.pages.flat()
			),
		},
	}[verifiedCredentialProvider]}
	{...$$restProps}
	bind:result={credentials}
	let:result={credentials}
>
	<svelte:fragment slot="header"
		let:result={credentials}
		let:isOpen let:toggle
	>
		<slot name="header"
			{credentials}
			{isOpen} {toggle}
		/>
	</svelte:fragment>

	<slot {credentials} />
</Loader>
