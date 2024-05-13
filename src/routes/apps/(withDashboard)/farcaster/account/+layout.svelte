<script lang="ts">
	// Types
	import type { FarcasterProvider } from '$/data/farcasterProviders'
	import { FarcasterFeedProvider } from '$/data/farcasterFeedProviders'


	// Context
	import {
		farcasterUserId,
		farcasterUserName,
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
	import FarcasterUserProfileLoader from '$/components/FarcasterUserProfileLoader.svelte'
	import FarcasterUserProfile from '$/components/FarcasterUserProfile.svelte'
	import FarcasterCastsLoader from '$/components/FarcasterCastsLoader.svelte'
	import FarcasterCasts from '$/components/FarcasterCasts.svelte'
	import FarcasterUser from '$/components/FarcasterUser.svelte'
</script>


<FarcasterUserProfileLoader
	{farcasterProvider}
	{...$farcasterUserId ?
		{
			userId: $farcasterUserId,
		}
	: $farcasterUserName ?
		{
			userName: $farcasterUserName,
		}
	: {}}
	let:user
>
	{#if user}
		<FarcasterUserProfile
			{user}
		/>

		<section>
			{#if user?.id}
				<FarcasterCastsLoader
					{farcasterProvider}
					farcasterFeedProvider={_farcasterFeedProvider}
					query={{
						userId: user.id,
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
								<span>
									<FarcasterUser
										{user}
									/>
									<span style="margin-bottom: 0.125em"> › Casts</span>
								</span>
							</svelte:fragment>
						</FarcasterCasts>
					{/if}
				</FarcasterCastsLoader>
			{/if}
		</section>
	{/if}
</FarcasterUserProfileLoader>
