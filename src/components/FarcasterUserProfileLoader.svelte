<script lang="ts">
	// Constants/types
	import type { FarcasterUser, FarcasterUserId, FarcasterUserName } from '$/api/farcaster/index'
	import { FarcasterProvider, farcasterProviderIcons } from '$/data/farcasterProviders'


	// Context
	import * as publicEnv from '$env/static/public'
	import { preferences } from '$/state/preferences'


	// Inputs
	export let farcasterProvider: FarcasterProvider
	export let userId: FarcasterUserId | undefined
	export let userName: FarcasterUserName | undefined
	export let viewerUserId: FarcasterUserId | undefined

	$: farcasterProvider = farcasterProvider ?? $preferences.farcasterProvider


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
	import { normalizeFarcasterUser as normalizeUserAirstack } from '$/api/airstack/normalize'
	import { normalizeUserV1 as normalizeUserNeynarV1 } from '$/api/neynar/normalize'
	import { normalizeUser as normalizeUserPinata } from '$/api/pinata/farcaster/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage={`Searching for Farcaster user ${userId ? `#${userId}` : `"${userName}"`} via ${farcasterProvider}...`}
	loadingIcon={farcasterProviderIcons[farcasterProvider]}
	errorMessage={`Couldn't find Farcaster user ${userId ? `#${userId}` : `"${userName}"`}.`}
	{...$$restProps}
	{...{
		[FarcasterProvider.Airstack]: () => ({
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
						const { getFarcasterUserByName, getFarcasterUserById } = await import('$/api/airstack')

						return (
							userName ?
								await getFarcasterUserByName({ 
									userName,
								})
							: userId ?
								await getFarcasterUserById({
									userId,
								})
							:
								undefined
						)
					},
					select: result => (
						result?.Socials?.Social?.[0]
							? normalizeUserAirstack(result.Socials.Social?.[0])
							: initialData
					),
				})
			),
		}),

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
						const { getFarcasterUserByUsername, user } = await import('$/api/neynar/v1')

						return (
							userName ?
								await getFarcasterUserByUsername(
									publicEnv.PUBLIC_NEYNAR_API_KEY,
									userName,
									viewerUserId
										? { viewerFid: viewerUserId }
										: undefined,
								)
							: userId ?
								await user(
									publicEnv.PUBLIC_NEYNAR_API_KEY,
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

		[FarcasterProvider.Pinata]: () => ({
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
						if(userId){
							const { getUserByFID } = await import('$/api/pinata/farcaster')

							return (
								await getUserByFID({
									fid: userId,
								})
							)
						} else if(userName){
							throw `Pinata doesn't yet support fetching Farcaster profiles by username.`
						}
					},
					select: result => (
						result
							? normalizeUserPinata(result.user)
							: initialData
					),
				})
			),
		}),

		[FarcasterProvider.Hub]: () => {},
	}[farcasterProvider]?.()}
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
