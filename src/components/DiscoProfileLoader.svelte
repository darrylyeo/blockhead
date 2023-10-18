<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import { VerifiableCredentialProvider, verifiableCredentialProviderIcons } from '../data/verifiableCredentialProvider'
	import type { Disco } from '../api/disco/index'
	import type { DidUrl } from '../api/ceramic/did'

	
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
	import { getProfileByDid, getProfileByEvmAddress } from '../api/disco/index'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading {verifiableCredentialProvider} profile..."
	loadingIcon={verifiableCredentialProviderIcons[verifiableCredentialProvider]}
	errorMessage="Couldn't load {verifiableCredentialProvider} profile."
	{...{
		[VerifiableCredentialProvider.Disco]: {
			fromQuery: (
				didUrl ?
					createQuery({
						queryKey: ['DiscoProfile', {
							verifiableCredentialProvider,
							didUrl,
						}],
						queryFn: async () => (
							await getProfileByDid(didUrl)
						),
					})
				: address ? 
					createQuery({
						queryKey: ['DiscoProfile', {
							verifiableCredentialProvider,
							address,
						}],
						queryFn: async () => (
							await getProfileByEvmAddress(address)
						),
					})
				:
					undefined
			),
		},
	}[verifiableCredentialProvider]}
	{...$$restProps}
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
