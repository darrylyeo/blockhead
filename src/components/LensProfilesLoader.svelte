<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import { type LensName, LensInstance, getProfileByLensName, type LensProfile } from '../api/lens'


	// External state
	export let address: Ethereum.Address | undefined
	export let lensName: LensName | undefined
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


{#if address}
	<Loader
		loadingIcon={LensIcon}
		loadingIconName="Lens"
		loadingMessage="Finding Lens profiles owned by address..."
		errorMessage="Couldn't load Lens profiles."
		fromUseQuery={useQuery({
			queryKey: ['LensProfilesByAddress', {
				instance,
				address,
			}],
			queryFn: async () => (
				await getProfilesOwnedByAddress({
					instance,
					address,
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
	>
		<svelte:fragment slot="header"
			let:result={profiles}
			let:status
		>
			<slot name="header" {status} {profiles} />
		</svelte:fragment>
		<slot {profiles} />
	</Loader>

{:else if lensName}
	<Loader
		loadingIcon={LensIcon}
		loadingIconName="Lens"
		loadingMessage="Finding Lens profile for {lensName}..."
		errorMessage="Couldn't load Lens profile for {lensName}."
		fromUseQuery={
			useQuery({
				queryKey: ['LensProfileByLensName', {
					lensName,
				}],
				queryFn: async () => (
					await getProfileByLensName({
						instance,
						lensName,
					})
				),
			})
		}
		then={({data, error}) => {
			if(error){
				console.error(error)
				throw new Error(error.graphQLErrors.map(e => e.message).join('\n'))
			}

			return data ? [data.profile] : []
		}}
		bind:result={profiles}
		let:result={profiles}
	>
		<svelte:fragment slot="header"
			let:result={profiles}
			let:status
		>
			<slot name="header" {status} {profiles} />
		</svelte:fragment>
		<slot {profiles} />
	</Loader>
{/if}
