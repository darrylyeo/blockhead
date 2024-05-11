<script lang="ts">
	// Types
	import type { FarcasterProvider } from '$/data/farcasterProviders'
	import { FarcasterFeedProvider } from '$/data/farcasterFeedProviders'


	// Context
	import { preferences } from '$/state/preferences'

	let farcasterProvider: FarcasterProvider
	$: farcasterProvider = $preferences.farcasterProvider

	let farcasterFeedProvider: FarcasterFeedProvider | 'indexer'
	$: farcasterFeedProvider = $preferences.farcasterFeedProvider

	// (Derived)
	let _farcasterFeedProvider: FarcasterFeedProvider
	$: _farcasterFeedProvider = (
		farcasterFeedProvider === 'indexer' ?
			Object.values(FarcasterFeedProvider).includes(farcasterProvider as unknown as FarcasterFeedProvider) ?
				farcasterProvider as unknown as FarcasterFeedProvider
			:
				undefined as never
		:
			farcasterFeedProvider
	)


	// Components
	import FarcasterCasts from '$/components/FarcasterCasts.svelte'
	import FarcasterCastsLoader from '$/components/FarcasterCastsLoader.svelte'
</script>


<FarcasterCastsLoader
	{farcasterProvider}
	farcasterFeedProvider={_farcasterFeedProvider}
	let:casts
	let:pagination
>
	{#if casts}
		<FarcasterCasts
			{casts}
			{pagination}
			title="Trending"
			{farcasterProvider}
			farcasterFeedProvider={_farcasterFeedProvider}
		/>
	{/if}
</FarcasterCastsLoader>
