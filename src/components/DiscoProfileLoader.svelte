<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import { VerifiedCredentialProvider, verifiedCredentialProviderIcons } from '../data/verifiedCredentialProvider'
	import type { Disco } from '../api/disco/index'
	import type { DidUrl } from '../api/ceramic/did'

	
	// Inputs
	export let verifiedCredentialProvider = VerifiedCredentialProvider.Disco
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
	loadingMessage="Loading {verifiedCredentialProvider} profile..."
	loadingIcon={verifiedCredentialProviderIcons[verifiedCredentialProvider]}
	errorMessage="Couldn't load {verifiedCredentialProvider} profile."
	{...{
		[VerifiedCredentialProvider.Disco]: {
			fromQuery: (
				didUrl ?
					createQuery({
						queryKey: ['DiscoProfile', {
							verifiedCredentialProvider,
							didUrl,
						}],
						queryFn: async () => (
							await getProfileByDid(didUrl)
						),
					})
				: address ? 
					createQuery({
						queryKey: ['DiscoProfile', {
							verifiedCredentialProvider,
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
	}[verifiedCredentialProvider]}
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
