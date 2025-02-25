<script lang="ts">
	// Types/constants
	import type { FarcasterCast as _FarcasterCast } from '$/api/farcaster'
	import { type FarcasterProvider } from '$/data/farcasterProviders'
	import { type FarcasterFeedProvider, farcasterFeedProviders } from '$/data/farcasterFeedProviders'
	

	// Inputs
	export let casts: (_FarcasterCast | Pick<_FarcasterCast, 'id'>)[]
	export let title: string
	export let farcasterProvider: FarcasterProvider
	export let farcasterFeedProvider: FarcasterFeedProvider
	export let isReplies: boolean = false

	// (View options)
	export let headingLevel: 1 | 2 | 3 | 4 | 5 | 6 = 4
	export let layout: 'feed' | 'embedded-replies' = 'feed'


	// Events
	export let pagination: Loader['$$slot_def']['default']['pagination']


	// Components
	import AnchorLink from './AnchorLink.svelte'
	import CollapsibleList, { Layout as CollapsibleListLayout } from '$/components/CollapsibleList.svelte'
	import FarcasterCast from './FarcasterCast.svelte'
	import FarcasterCastLoader from './FarcasterCastLoader.svelte'
	import Loader from './Loader.svelte'
	import Loading from './Loading.svelte'
</script>


<CollapsibleList
	items={casts}
	getIndex={cast => cast.id}
	isOrdered={true}

	containerClass="card"
	isOpen
	showContentsOnly={layout === 'embedded-replies'}

	{title}
	headingLevel={headingLevel + 1}

	isScrollEnabled={true}
	layout={CollapsibleListLayout.Plain}
	defaultHeight="max(16rem, calc(100dvh - 24rem))"

	{pagination}
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

	<svelte:fragment let:item={cast}>
		{#if 'timestamp' in cast && String(farcasterProvider) === String(farcasterFeedProvider)}
			<AnchorLink
				base={`/apps/farcaster`}
				link={`/cast/${cast.id}`}
				isEnabled={!isReplies}
			>
				<FarcasterCast
					{cast}
					{farcasterProvider}
					{farcasterFeedProvider}
				/>
			</AnchorLink>

		{:else}
			<FarcasterCastLoader
				{farcasterProvider}
				query={{
					castId: cast.id,
					isReply: isReplies,
				}}
				let:cast
			>
				{#if cast}
					<AnchorLink
						base={`/apps/farcaster`}
						link={`/cast/${cast.id}`}
						isEnabled={!isReplies}
					>
						<FarcasterCast
							{cast}
							{farcasterProvider}
							{farcasterFeedProvider}
						/>
					</AnchorLink>
				{/if}
			</FarcasterCastLoader>
		{/if}
	</svelte:fragment>

	<svelte:fragment slot="empty">
		<div class="card">No {isReplies ? 'replies' : 'casts'} yet.</div>
	</svelte:fragment>

	<svelte:fragment slot="after">
		{#if pagination?.isFetchingNextPage}
			<Loading
				icon={{
					src: farcasterFeedProviders[farcasterFeedProvider].icon,
					name: farcasterFeedProviders[farcasterFeedProvider].name,
				}}
				iconAnimation="hover"
			>
				Loading more {isReplies ? 'replies' : 'casts'} via {farcasterFeedProviders[farcasterFeedProvider].name}...
			</Loading>
		{/if}
	</svelte:fragment>
</CollapsibleList>
