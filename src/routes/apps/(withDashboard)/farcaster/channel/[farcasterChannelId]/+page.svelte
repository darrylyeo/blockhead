<script lang="ts">
	// Types
	import type { FarcasterProvider } from '$/data/farcasterProviders'
	import { FarcasterFeedProvider } from '$/data/farcasterFeedProviders'


	// Context
	import { appsParams } from '$/routes/apps/_appsParams.svelte'

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
	import FarcasterCastsLoader from '$/components/FarcasterCastsLoader.svelte'
	import FarcasterCasts from '$/components/FarcasterCasts.svelte'
	import FarcasterChannel from '$/components/FarcasterChannel.svelte'
	import FarcasterChannelDetails from '$/components/FarcasterChannelDetails.svelte'
	import FarcasterChannelLoader from '$/components/FarcasterChannelLoader.svelte'
</script>


<FarcasterChannelLoader
	{farcasterProvider}
	query={{
		channelId: appsParams.farcasterChannelId,
	}}
	let:channel
>
	{#if channel}
		<FarcasterChannelDetails
			{channel}
			{farcasterProvider}
			headingLevel={2}
		/>
	{/if}
</FarcasterChannelLoader>

<FarcasterCastsLoader
	{farcasterProvider}
	farcasterFeedProvider={_farcasterFeedProvider}
	query={{
		channelId: appsParams.farcasterChannelId,
	}}
	let:casts
	let:pagination
>
	{#if casts}
		<FarcasterCasts
			{casts}
			{farcasterProvider}
			farcasterFeedProvider={_farcasterFeedProvider}
			{pagination}
		>
			<svelte:fragment slot="title">
				<h3 class="row inline">
					<FarcasterChannelLoader
						viewOptions={{
							layout: 'passive',
						}}
						{farcasterProvider}
						query={{
							channelId: appsParams.farcasterChannelId,
						}}
						let:channel
					>
						{#if channel}
							<FarcasterChannel
								{channel}
							/>
						{/if}
					</FarcasterChannelLoader>
					›
					<span>Casts</span>
				</h3>
			</svelte:fragment>
		</FarcasterCasts>
	{/if}
</FarcasterCastsLoader>


<style>
	.row {
		align-items: center;
	}
</style>
