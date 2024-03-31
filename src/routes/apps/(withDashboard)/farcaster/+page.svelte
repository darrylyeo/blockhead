<script lang="ts">
	// Types
	import type { FarcasterProvider } from '$/data/farcasterProviders'


	// Context
	import { farcasterUserId, farcasterUserName, farcasterCastId, farcasterCastShortId, farcasterChannelSlug } from '../../_appsParams'
	import { preferences } from '$/state/preferences'


	// Internal state
	let farcasterProvider: FarcasterProvider
	$: farcasterProvider = $preferences.farcasterProvider


	// Components
	import FarcasterCasts from '$/components/FarcasterCasts.svelte'
	import FarcasterCastsLoader from '$/components/FarcasterCastsLoader.svelte'
	import FarcasterCastLoader from '$/components/FarcasterCastLoader.svelte'
	import FarcasterCast from '$/components/FarcasterCast.svelte'
	import FarcasterUser from '$/components/FarcasterUser.svelte'
	import FarcasterUserProfileLoader from '$/components/FarcasterUserProfileLoader.svelte'
	import FarcasterUserProfile from '$/components/FarcasterUserProfile.svelte'
</script>


{#if $farcasterCastId || ($farcasterUserName && $farcasterCastShortId)}
	<FarcasterCastLoader
		{farcasterProvider}
		castId={$farcasterCastId}
		clientUrl={`https://warpcast.com/${$farcasterUserName}/${$farcasterCastShortId}`} 
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

{:else if $farcasterUserId || $farcasterUserName}
	<FarcasterUserProfileLoader
		{farcasterProvider}
		userId={$farcasterUserId || undefined}
		userName={$farcasterUserName}
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
						userId={user.id}
						let:casts
					>
						{#if casts}
							<FarcasterCasts
								{casts}
								{farcasterProvider}
							>
								<svelte:fragment slot="title">
									<span class="row inline align-bottom">
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

{:else if $farcasterCastId}
	<FarcasterCastLoader
		{farcasterProvider}
		castId={$farcasterCastId}
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

{:else}
	<FarcasterCastsLoader
		{farcasterProvider}
		let:casts
	>
		{#if casts}
			<FarcasterCasts
				{casts}
				title="Trending"
				{farcasterProvider}
			/>
		{/if}
	</FarcasterCastsLoader>
{/if}
