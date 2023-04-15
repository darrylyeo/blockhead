<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import type { LensInstance, LensProfile } from '../api/lens'


	// External state
	export let instance: LensInstance
	export let address: Ethereum.Address


	// Shared state
	export let profiles: LensProfile[]


	// Components
	import LensProfilesLoader from './LensProfilesLoader.svelte'
	import LensProfileComponent from './LensProfile.svelte'
</script>


<LensProfilesLoader
	{instance}
	{address}
	bind:profiles
	let:profiles
>
	<slot {profiles}>
		{#each profiles as profile (profile.id)}
			<LensProfileComponent {profile} {instance} />
		{/each}
	</slot>
</LensProfilesLoader>
