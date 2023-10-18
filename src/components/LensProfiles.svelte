<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import { LensInstance, type LensProfile } from '../api/lens'


	// Inputs
	export let instance: LensInstance = LensInstance.Polygon
	export let address: Ethereum.Address
	// (View options)
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 3


	// Outputs
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
			<LensProfileComponent
				{profile}
				{instance}
				{headingLevel}
			/>
		{/each}
	</slot>
</LensProfilesLoader>
