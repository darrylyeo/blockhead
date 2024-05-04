<script lang="ts">
	// Types
	import type { FarcasterCast as _FarcasterCast } from '$/api/farcaster'
	import type { FarcasterProvider } from '$/data/farcasterProviders'
	

	// Inputs
	export let casts: _FarcasterCast[]
	export let title: string
	export let farcasterProvider: FarcasterProvider

	// (View options)
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 4
	export let layout: 'feed' | 'embedded-replies' = 'feed'


	// Events
	export let pagination: Loader<any, any, any, any>['$$slot_def']['default']['pagination']


	// Components
	import Collapsible from './Collapsible.svelte'
	import FarcasterCast from './FarcasterCast.svelte'
	import Loader from './Loader.svelte'
	import Loading from './Loading.svelte'
	import ScrollContainer from './ScrollContainer.svelte'
</script>


<Collapsible
	containerClass="card"
	isOpen
	showContentsOnly={layout === 'embedded-replies'}
	{...$$restProps}
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

	<ScrollContainer
		{pagination}
		style="
			--resizeVertical-defaultHeight: 50rem;
			max-height: 80vh;
		"
	>
		{#each casts as cast (cast.id)}
			<FarcasterCast
				{cast}
				{farcasterProvider}
			/>
		{:else}
			<div class="card">No casts yet.</div>
		{/each}

		<svelte:fragment slot="after">
			{#if pagination?.isFetchingNextPage}
				<Loading>Loading more casts...</Loading>
			{/if}
		</svelte:fragment>
	</ScrollContainer>
</Collapsible>
