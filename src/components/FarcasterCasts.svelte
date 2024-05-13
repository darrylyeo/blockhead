<script lang="ts">
	// Types/constants
	import type { FarcasterCast as _FarcasterCast } from '$/api/farcaster'
	import { type FarcasterProvider, farcasterProviderIcons } from '$/data/farcasterProviders'
	import type { FarcasterFeedProvider } from '$/data/farcasterFeedProviders'
	

	// Inputs
	export let casts: (_FarcasterCast | Pick<_FarcasterCast, 'id'>)[]
	export let title: string
	export let farcasterProvider: FarcasterProvider
	export let farcasterFeedProvider: FarcasterFeedProvider

	// (View options)
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 4
	export let layout: 'feed' | 'embedded-replies' = 'feed'


	// Events
	export let pagination: Loader<any, any, any, any>['$$slot_def']['default']['pagination']


	// Components
	import Collapsible from './Collapsible.svelte'
	import FarcasterCast from './FarcasterCast.svelte'
	import FarcasterCastLoader from './FarcasterCastLoader.svelte'
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
			{#if 'timestamp' in cast && String(farcasterProvider) === String(farcasterFeedProvider)}
				<FarcasterCast
					{cast}
					{farcasterProvider}
					{farcasterFeedProvider}
				/>
			{:else}
				<FarcasterCastLoader
					{farcasterProvider}
					castId={cast.id}
					let:cast
				>
					<FarcasterCast
						{cast}
						{farcasterProvider}
						{farcasterFeedProvider}
					/>
				</FarcasterCastLoader>
			{/if}
		{:else}
			<div class="card">No casts yet.</div>
		{/each}

		<svelte:fragment slot="after">
			{#if pagination?.isFetchingNextPage}
				<Loading
					icon={{
						src: farcasterProviderIcons[farcasterProvider],
						name: farcasterProvider,
					}}
					iconAnimation="hover"
				>
					Loading more casts via {farcasterProvider}...
				</Loading>
			{/if}
		</svelte:fragment>
	</ScrollContainer>
</Collapsible>
