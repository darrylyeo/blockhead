<script lang="ts">
	// Types
	import type { FarcasterProvider } from '../../../../data/farcasterProviders'


	// Context
	import { farcasterUserId, farcasterUserName, farcasterCastId } from '../../_appsParams'
	import { preferences } from '../../../../state/preferences'


	// Internal state
	let farcasterProvider: FarcasterProvider
	$: farcasterProvider = $preferences.farcasterProvider


	// Components
	import FarcasterCasts from '../../../../components/FarcasterCasts.svelte'
	import FarcasterCastsLoader from '../../../../components/FarcasterCastsLoader.svelte'
</script>


{#if $farcasterUserId || $farcasterUserName}


{:else if $farcasterCastId}


{:else}
	<FarcasterCastsLoader
		{farcasterProvider}
		let:casts
	>
		{#if casts}
			<FarcasterCasts
				title="Trending"
				{casts}
			/>
		{/if}
	</FarcasterCastsLoader>
{/if}
