<script lang="ts">
	// Types
	import type { FarcasterProvider } from '$/data/farcasterProviders'
	import { FarcasterFeedProvider} from '$/data/farcasterFeedProviders'


	// Context
	import {
		farcasterCastId,
		farcasterUserName,
		farcasterCastShortId,
	} from '$/routes/apps/_appsParams' 

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
			farcasterFeedProvider={_farcasterFeedProvider}
			layout="standalone"
			showReactionsAndReplies
		/>
	{/if}
</FarcasterCastLoader>
