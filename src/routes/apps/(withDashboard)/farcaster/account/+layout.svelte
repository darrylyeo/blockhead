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
	import FarcasterUserProfileLoader from '$/components/FarcasterUserProfileLoader.svelte'
	import FarcasterUserProfile from '$/components/FarcasterUserProfile.svelte'
	import FarcasterCastsLoader from '$/components/FarcasterCastsLoader.svelte'
	import FarcasterCasts from '$/components/FarcasterCasts.svelte'
	import FarcasterUser from '$/components/FarcasterUser.svelte'
</script>


<FarcasterUserProfileLoader
	{farcasterProvider}
	{...appsParams.farcasterUserId ?
		{
			userId: appsParams.farcasterUserId,
		}
	: appsParams.farcasterUserName ?
		{
			userName: appsParams.farcasterUserName,
		}
	: {}}
	let:user
>
	{#if user}
		<FarcasterUserProfile
			{user}
			headingLevel={2}
			{farcasterProvider}
		/>

		{#if user?.id}
			<section id="/casts">
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
								<a
									href="#/casts"
								>
									<FarcasterUser
										{user}
										{farcasterProvider}
									/>
									›
									<span>Casts</span>
								</a>
							</svelte:fragment>
						</FarcasterCasts>
					{/if}
				</FarcasterCastsLoader>
			</section>

			<section id="/following/casts">
				<FarcasterCastsLoader
					{farcasterProvider}
					farcasterFeedProvider={_farcasterFeedProvider}
					query={{
						followedByUserId: user.id,
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
								<a
									href="#/following/casts"
								>
									<FarcasterUser
										{user}
										{farcasterProvider}
									/>
									›
									<span>Following</span>
									›
									<span>Casts</span>
								</a>
							</svelte:fragment>
						</FarcasterCasts>
					{/if}
				</FarcasterCastsLoader>
			</section>
		{/if}
	{/if}
</FarcasterUserProfileLoader>
