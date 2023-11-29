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
	import FarcasterCastLoader from '../../../../components/FarcasterCastLoader.svelte'
	import FarcasterCast from '../../../../components/FarcasterCast.svelte'
	import FarcasterUserProfileLoader from '../../../../components/FarcasterUserProfileLoader.svelte'
</script>


{#if $farcasterUserId || $farcasterUserName}
	<FarcasterUserProfileLoader
		{farcasterProvider}
		userId={$farcasterUserId || undefined}
		userName={$farcasterUserName}
		let:user
	>
		{#if user}
			<section>
				{#if user?.id}
					<FarcasterCastsLoader
						{farcasterProvider}
						userId={user.id}
						let:casts
					>
						{#if casts}
							<FarcasterCasts
								title={`${user?.name || user?.id} › Casts`}
								{casts}
							/>
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
		let:cast
	>
		{#if cast}
			<FarcasterCast
				{farcasterProvider}
				{cast}
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
				title="Trending"
				{casts}
			/>
		{/if}
	</FarcasterCastsLoader>
{/if}
