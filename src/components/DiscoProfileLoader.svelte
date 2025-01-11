<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import { VerifiableCredentialProvider, verifiableCredentialProviders } from '$/data/verifiableCredentialProviders'
	import type { Disco } from '$/api/disco/index'
	import type { DidUrl } from '$/api/ceramic/did'

	
	// Inputs
	export let verifiableCredentialProvider = VerifiableCredentialProvider.Disco
	export let address: Ethereum.Address | undefined
	export let didUrl: DidUrl | undefined
	

	// Outputs
	export let profile: Disco.Profile | undefined

	type SharedSlotProps = {
		profile: typeof profile,
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
	loadingMessage="Loading {verifiableCredentialProviders[verifiableCredentialProvider].name} profile..."
	loadingIcon={verifiableCredentialProviders[verifiableCredentialProvider].icon}
	errorMessage="Couldn't load {verifiableCredentialProviders[verifiableCredentialProvider].name} profile."
	{...{
		[VerifiableCredentialProvider.Disco]: () => ({
			fromQuery: (
				didUrl ?
					createQuery({
						queryKey: ['DiscoProfile', {
							verifiableCredentialProvider,
							didUrl,
						}],
						queryFn: async ({
							queryKey: [_, {
								didUrl,
							}],
						}) => {
							const { getProfileByDid } = await import('$/api/disco/index')

							return await getProfileByDid(didUrl)
						},
					})
				: address ? 
					createQuery({
						queryKey: ['DiscoProfile', {
							verifiableCredentialProvider,
							address,
						}],
						queryFn: async ({
							queryKey: [_, {
								address,
							}],
						}) => {
							const { getProfileByEvmAddress } = await import('$/api/disco/index')

							return await getProfileByEvmAddress(address)
						},
					})
				:
					undefined
			),
		}),
	}[verifiableCredentialProvider]?.()}
	bind:result={profile}
	let:result={profile}
>
	<svelte:fragment slot="header"
		let:result={profile}
		let:isOpen let:toggle
	>
		<slot name="header"
			{profile}
			{isOpen} {toggle}
		/>
	</svelte:fragment>

	<slot {profile} />
</Loader>
