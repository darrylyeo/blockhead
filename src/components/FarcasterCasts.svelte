<script lang="ts">
	// Types
	import type { Cast } from '../api/neynar/v2'
	import type { FarcasterProvider } from '../data/farcasterProviders'
	

	// Inputs
	export let casts: Cast[]
	export let title: string
	export let farcasterProvider: FarcasterProvider

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
		<slot name="title">
			<svelte:element this={`h${headingLevel}`}>
				{title}
			</svelte:element>
		</slot>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">Farcaster Feed</span>
	</svelte:fragment>

	<div
		class="column scrollable-list"
		style="
			--resizeVertical-defaultHeight: 50rem;
			max-height: 80vh;
		"
	>
		{#each casts as cast (cast.hash)}
			<FarcasterCast
				{cast}
				{farcasterProvider}
			/>
		{:else}
			<div class="card">No casts yet.</div>
		{/each}
	</div>
</Collapsible>
