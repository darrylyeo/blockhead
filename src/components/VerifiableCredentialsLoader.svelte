<script lang="ts">
	// Constants/types
	import { VerifiableCredentialProvider, verifiableCredentialProviders } from '$/data/verifiableCredentialProviders'
	import type { DidUrl } from '$/api/ceramic/did'
	import type { Disco } from '$/api/disco/index'

	
	// Inputs
	export let verifiableCredentialProvider: VerifiableCredentialProvider
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


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading verified credentials via {verifiableCredentialProviders[verifiableCredentialProvider].name}..."
	loadingIcon={verifiableCredentialProviders[verifiableCredentialProvider].icon}
	errorMessage="Couldn't load verified credentials via {verifiableCredentialProviders[verifiableCredentialProvider].name}."
	{...{
		[VerifiableCredentialProvider.Disco]: () => ({
			fromQuery: did && createInfiniteQuery({
				queryKey: ['VerifiableCredentials', {
					did,
					verifiableCredentialProvider,
				}],
				queryFn: async ({ pageParam: page }) => {
					const { getCredentials } = await import('$/api/disco/index')

					return await getCredentials(did, { page })
				},
				getNextPageParam: (lastPage, allPages) => allPages.length,
				select: result => (
					result.pages.flat()
				),
			}),
		}),
	}[verifiableCredentialProvider]?.()}
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
