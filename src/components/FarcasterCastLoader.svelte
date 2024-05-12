<script lang="ts">
	// Constants/types
	import { CastParamType } from '$/api/neynar/v2'
	import type { FarcasterCast, FarcasterCastId, FarcasterUserId } from '$/api/farcaster/index'
	import { FarcasterProvider, farcasterProviderIcons } from '$/data/farcasterProviders'


	// Context
	import * as publicEnv from '$env/static/public'


	// Inputs
	export let farcasterProvider: FarcasterProvider = FarcasterProvider.Neynar
	export let castId: FarcasterCastId | undefined
	export let clientUrl: string | undefined
	export let withReplies: boolean = false
	export let viewerUserId: FarcasterUserId | undefined


	// Outputs
	export let cast: FarcasterCast | undefined

	type SharedSlotProps = {
		cast: typeof cast,
	}

	type $$Slots = {
		default: SharedSlotProps,
		header: SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'
	import { normalizeFarcasterCast as normalizeCastAirstack } from '$/api/airstack/normalize'
	import { normalizeCastWithRepliesV1 as normalizeCastWithRepliesV1Neynar, normalizeCastV2 as normalizeCastNeynarV2 } from '$/api/neynar/normalize'
	import { normalizeCast as normalizeCastPinata } from '$/api/pinata/farcaster/normalize' 


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading cast from {farcasterProvider}..."
	loadingIcon={farcasterProviderIcons[farcasterProvider]}
	errorMessage="Couldn't load cast from {farcasterProvider}."
	{...{
		[FarcasterProvider.Hub]: () => {},

		[FarcasterProvider.Airstack]: () => ({
			fromQuery: (
				castId ?
					createQuery({
						queryKey: ['FarcasterCast', {
							farcasterProvider,
							castId,
						}],
						queryFn: async () => {
							const { getFarcasterCastByHash } = await import('$/api/airstack')

							return await getFarcasterCastByHash({
								hash: castId,
							})
						},
						select: result => {
							const cast = (
								result
									?.FarcasterCasts
									?.Cast
									?.map(normalizeCastAirstack)
									?.[0]
							)

							if(!cast)
								throw new Error(`Cast with ID ${castId} may not be indexed yet or was deleted.`)

							return cast
						},
					})
				: clientUrl ?
					createQuery({
						queryKey: ['FarcasterCast', {
							farcasterProvider,
							clientUrl,
						}],
						queryFn: async () => {
							const { getFarcasterCastByClientUrl } = await import('$/api/airstack')

							return await getFarcasterCastByClientUrl({
								clientUrl,
							})
						},
						select: result => {
							const cast = (
								result
									?.FarcasterCasts
									?.Cast
									?.map(normalizeCastAirstack)
									?.[0]
							)

							if(!cast)
								throw new Error(`Cast with URL ${clientUrl} may not be indexed yet or was deleted.`)

							return cast
						},
					})
				:
					undefined
			),
		}),

		[FarcasterProvider.Neynar]: () => ({
			fromQuery: (
				castId ?
					withReplies ?
						createQuery({
							queryKey: ['FarcasterCast', {
								farcasterProvider,
								castId,
								withReplies,
							}],
							queryFn: async () => {
								const { getFarcasterAllCastsInThread } = await import('$/api/neynar/v1')

								return await getFarcasterAllCastsInThread(
									publicEnv.PUBLIC_NEYNAR_API_KEY,
									castId,
								)
							},
							select: result => (
								normalizeCastWithRepliesV1Neynar(result.result.casts)
							),
						})
					:
						createQuery({
							queryKey: ['FarcasterCast', {
								farcasterProvider,
								castId,
							}],
							queryFn: async () => {
								const { cast } = await import('$/api/neynar/v2')

								return await cast(
									publicEnv.PUBLIC_NEYNAR_API_KEY,
									castId,
									CastParamType.Hash,
								)
							},
							select: result => (
								result?.cast && normalizeCastNeynarV2(result.cast)
							),
						})
				: clientUrl ?
					createQuery({
						queryKey: ['FarcasterCast', {
							farcasterProvider,
							clientUrl,
						}],
						queryFn: async () => {
							const { cast } = await import('$/api/neynar/v2')

							return await cast(
								publicEnv.PUBLIC_NEYNAR_API_KEY,
								clientUrl,
								CastParamType.Url,
							)
						},
						select: result => (
							result?.cast && normalizeCastNeynarV2(result.cast)
						),
					})
				:
					undefined
			),
		}),

		[FarcasterProvider.Pinata]: () => ({
			fromQuery: (
				createQuery({
					queryKey: ['FarcasterCast', {
						farcasterProvider,
						...castId && {
							castId,
						},
						...clientUrl && {
							clientUrl,
						},
					}],
					queryFn: async () => {
						const { getCastByHash } = await import('$/api/pinata/farcaster')

						return await getCastByHash({
							hash: castId,
						})
					},
					select: result => (
						normalizeCastPinata(result.data)
					),
				})
			),
		}),
	}[farcasterProvider]?.()}
	bind:result={cast}
	let:result={cast}
	debug
>
	<svelte:fragment slot="header"
		let:result={cast}
	>
		<slot name="header"
			{cast}
		/>
	</svelte:fragment>

	<slot {cast} />
</Loader>
