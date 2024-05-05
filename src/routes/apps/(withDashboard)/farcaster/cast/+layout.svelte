<script lang="ts">
	// Types
	import type { FarcasterProvider } from '$/data/farcasterProviders'


	// Context
	import {
		farcasterCastId,
		farcasterUserName,
		farcasterCastShortId,
	} from '$/routes/apps/_appsParams' 

	import { preferences } from '$/state/preferences'

	let farcasterProvider: FarcasterProvider
	$: farcasterProvider = $preferences.farcasterProvider


	// Components
	import FarcasterCastLoader from '$/components/FarcasterCastLoader.svelte'
	import FarcasterCast from '$/components/FarcasterCast.svelte'
</script>


<FarcasterCastLoader
	{farcasterProvider}
	{...$farcasterCastId ?
		{
			castId: $farcasterCastId,
		}
	: $farcasterUserName && $farcasterCastShortId ?
		{
			clientUrl: `https://warpcast.com/${$farcasterUserName}/${$farcasterCastShortId}`
		}
	:
		{}}
	withReplies
	let:cast
>
	{#if cast}
		<FarcasterCast
			{cast}
			{farcasterProvider}
			layout="standalone"
			showReactionsAndReplies
		/>
	{/if}
</FarcasterCastLoader>
