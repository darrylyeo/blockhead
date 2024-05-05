<script lang="ts">
	// Types
	import type { FarcasterProvider } from '$/data/farcasterProviders'


	// Context
	import {
		farcasterUserId,
		farcasterUserName,
	} from '$/routes/apps/_appsParams' 

	import { preferences } from '$/state/preferences'

	let farcasterProvider: FarcasterProvider
	$: farcasterProvider = $preferences.farcasterProvider


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
					userId={user.id}
					let:casts
					let:pagination
				>
					{#if casts}
						<FarcasterCasts
							{casts}
							{farcasterProvider}
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
