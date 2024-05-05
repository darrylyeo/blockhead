<script lang="ts">
	// Types
	import type { FarcasterProvider } from '$/data/farcasterProviders'


	// Context
	import { preferences } from '$/state/preferences'


	// Internal state
	let farcasterProvider: FarcasterProvider
	$: farcasterProvider = $preferences.farcasterProvider


	// Components
	import FarcasterCasts from '$/components/FarcasterCasts.svelte'
	import FarcasterCastsLoader from '$/components/FarcasterCastsLoader.svelte'
</script>


<FarcasterCastsLoader
	{farcasterProvider}
	let:casts
	let:pagination
>
	{#if casts}
		<FarcasterCasts
			{casts}
			{pagination}
			title="Trending"
			{farcasterProvider}
		/>
	{/if}
</FarcasterCastsLoader>
