<script lang="ts">
	// Types
	import type { Cast } from '../api/neynar/v2'
	

	// Inputs
	export let casts: Cast[]
	export let title: string

	// (View options)
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 4


	// Components
	import Collapsible from './Collapsible.svelte'
	import FarcasterCast from './FarcasterCast.svelte'
</script>


<Collapsible
	containerClass="card"
	isOpen
>
	<svelte:fragment slot="title">
		<!-- <h3>Trending</h3> -->
		<svelte:element this={`h${headingLevel}`}>{title}</svelte:element>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">Farcaster Feed</span>
	</svelte:fragment>

	<div class="column scrollable-list" style="--resizeVertical-defaultHeight: 50rem">
		{#each casts as cast (cast.hash)}
			<FarcasterCast
				{cast}
			/>
		{/each}
	</div>
</Collapsible>
