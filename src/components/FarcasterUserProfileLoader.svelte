<script lang="ts">
	// Constants/types
	import type { FarcasterUser, FarcasterUserId, FarcasterUserName } from '../api/farcaster/index'
	import { FarcasterProvider, farcasterProviderIcons } from '../data/farcasterProviders'


	import { env } from '../env'


	// Inputs
	export let farcasterProvider: FarcasterProvider = FarcasterProvider.Neynar
	export let userId: FarcasterUserId | undefined
	export let userName: FarcasterUserName | undefined
	export let viewerUserId: FarcasterUserId | undefined


	// Outputs
	let initialData: Partial<FarcasterUser>

	$: initialData = {
		...userId && {
			id: userId,
		},
		...userName && {
			name: userName,
		},
	}

	export let user: FarcasterUser | typeof initialData

	type SharedSlotProps = {
		user: typeof user,
	}

	type $$Slots = {
		default: SharedSlotProps,
		header: SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'
	import { normalizeUserV1 as normalizeUserNeynarV1 } from '../api/neynar/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage={`Searching for Farcaster user ${userId ? `#${userId}` : `"${userName}"`} via ${farcasterProvider}...`}
	loadingIcon={farcasterProviderIcons[farcasterProvider]}
	errorMessage={`Couldn't find Farcaster user ${userId ? `#${userId}` : `"${userName}"`}.`}
	{...{
		[FarcasterProvider.Neynar]: () => ({
			fromQuery: (
				(userName || userId) && createQuery({
					queryKey: ['FarcasterUserProfile', {
						farcasterProvider,
						...userId && {
							userId,
						},
						...userName && {
							userName,
						},
						...viewerUserId && {
							viewerUserId,
						},
					}],
					queryFn: async () => {
						const { getFarcasterUserByUsername, user } = await import('../api/neynar/v1')

						return (
							userName ?
								await getFarcasterUserByUsername(
									env.NEYNAR_API_KEY,
									userName,
									viewerUserId
										? { viewerFid: viewerUserId }
										: undefined,
								)
							: userId ?
								await user(
									env.NEYNAR_API_KEY,
									userId,
									viewerUserId
										? { viewerFid: viewerUserId }
										: undefined,
								)
							:
								undefined
						)
					},
					select: result => (
						result
							? normalizeUserNeynarV1(result.result.user, viewerUserId)
							: initialData
					),
				})
			),
		}),

		[FarcasterProvider.Hub]: () => {},
	}[farcasterProvider]?.()}
	{...$$restProps}
	bind:result={user}
	let:result={user}
>
	<svelte:fragment slot="header"
		let:result={user}
	>
		<slot name="header"
			{user}
		/>
	</svelte:fragment>

	<slot {user} />
</Loader>
