<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import { LensInstance, type LensProfile } from '../api/lens'


	// External state
	export let address: Ethereum.Address
	export let instance: LensInstance = LensInstance.Polygon


	// Shared state
	export let profiles: LensProfile[]


	// Actions
	import { useQuery } from '@sveltestack/svelte-query'
	import { getProfilesOwnedByAddress } from '../api/lens'


	// Components
	import Loader from './Loader.svelte'
	import { LensIcon } from '../assets/icons'
</script>



<Loader
	loadingIcon={LensIcon}
	loadingIconName="Lens"
	loadingMessage="Finding Lens profiles..."
	errorMessage="Couldn't load Lens profiles."
	fromUseQuery={useQuery({
		queryKey: ['LensProfilesByAddress', {
			instance,
			address,
		}],
		queryFn: async () => (
			await getProfilesOwnedByAddress({
				instance,
				address
			})
		),
	})}
	then={({data, error}) => {
		if(error){
			console.error(error)
			throw new Error(error.graphQLErrors.map(e => e.message).join('\n'))
		}

		return data?.profiles.items
	}}
	bind:result={profiles}
	let:result={profiles}
	let:status
>
	<slot name="header" slot="header" {status} {profiles} />
	<slot {profiles} />
</Loader>
