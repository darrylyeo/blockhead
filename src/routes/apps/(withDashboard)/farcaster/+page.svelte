<script lang="ts">
	// Types
	import type { FarcasterProvider } from '$/data/farcasterProviders'
	import { FarcasterFeedProvider, farcasterFeedProviders } from '$/data/farcasterFeedProviders'


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

	let feedOptions: FarcasterCastsLoader['feedOptions'] = {
		[FarcasterFeedProvider.Airstack]: {
			criteria: 'social_capital_value',
			timeFrame: 'one_day',
		},
	}


	// Components
	import FarcasterCasts from '$/components/FarcasterCasts.svelte'
	import FarcasterCastsLoader from '$/components/FarcasterCastsLoader.svelte'
	import FarcasterUserProfileLoader from '$/components/FarcasterUserProfileLoader.svelte'
	import FarcasterUser from '$/components/FarcasterUser.svelte'
	import Icon from '$/components/Icon.svelte'
</script>


<FarcasterCastsLoader
	{farcasterProvider}
	farcasterFeedProvider={_farcasterFeedProvider}
	query={{
		trending: true,
		feedOptions,
	}}
	let:casts
	let:pagination
>
	{#if casts}
		<FarcasterCasts
			{casts}
			{pagination}
			{farcasterProvider}
			farcasterFeedProvider={_farcasterFeedProvider}
		>
			<svelte:fragment slot="title">
				<h3 class="title">
					<span class="row with-float">
						<Icon imageSources={[farcasterFeedProviders[farcasterFeedProvider].icon]} />

						{_farcasterFeedProvider}
					</span>
					›
					{#if _farcasterFeedProvider === FarcasterFeedProvider.Airstack}
						Trending / Past Day
					{:else if _farcasterFeedProvider === FarcasterFeedProvider.Neynar}
						Trending
					{:else if _farcasterFeedProvider === FarcasterFeedProvider.OpenRank}
						<FarcasterUserProfileLoader
							viewOptions={{
								layout: 'passive',
							}}
							{farcasterProvider}
							userId={3}
							let:user
						>
							{#if user}
								<FarcasterUser
									{user}
									{farcasterProvider}
								/>
							{/if}
						</FarcasterUserProfileLoader>
						›
						Following
					{:else if _farcasterFeedProvider === FarcasterFeedProvider.Pinata}
						Recent
					{/if}
				</h3>
			</svelte:fragment>
		</FarcasterCasts>
	{/if}
</FarcasterCastsLoader>
