<script lang="ts">
	// Constants/types
	import { CastParamType } from '$/api/neynar/v2'
	import type { FarcasterCast, FarcasterCastId, FarcasterUserId } from '$/api/farcaster/index'
	import { FarcasterProvider, farcasterProviders } from '$/data/farcasterProviders'


	// Context
	import * as publicEnv from '$env/static/public'


	// Inputs
	export let farcasterProvider: FarcasterProvider
	export let query:
		& (
			| {
				castId: FarcasterCastId,
				isReply?: boolean,
			}
			| {
				clientUrl: string,
			}
		)
		& {
			withReplies?: boolean,
		}


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
	import { createQuery, createQueries } from '@tanstack/svelte-query'

	import { normalizeFarcasterCast as normalizeCastAirstack } from '$/api/airstack/normalize'
	import { normalizeCastWithRepliesV1 as normalizeCastWithRepliesV1Neynar, normalizeCastV2 as normalizeCastNeynarV2 } from '$/api/neynar/normalize'
	import { normalizeCast as normalizeCastPinata } from '$/api/pinata/farcaster/normalize' 


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading cast from {farcasterProviders[farcasterProvider].name}..."
	loadingIcon={farcasterProviders[farcasterProvider].icon}
	errorMessage="Couldn't load cast from {farcasterProviders[farcasterProvider].name}."
	{...{
		[FarcasterProvider.Hub]: () => {},

		[FarcasterProvider.Airstack]: () => ({
			fromQuery: (
				'castId' in query ?
					query.isReply ?
						createQuery({
							queryKey: ['FarcasterCast', {
								farcasterProvider,
								castId: query.castId,
								isReply: query.isReply,
							}],
							queryFn: async () => {
								throw new Error('Airstack does not yet support fetching individual cast replies.')
							},
						})

					: query.withReplies ?
						createQueries({
							queries: [
								{
									queryKey: ['FarcasterCast', {
										farcasterProvider,
										castId: query.castId,
									}],
									queryFn: async ({
										queryKey: [, { castId }],
									}) => {
										const { getFarcasterCastByHash } = await import('$/api/airstack')

										return await getFarcasterCastByHash({
											hash: castId,
										})
									},
									select: result => (
										result
											?.FarcasterCasts
											?.Cast
											?.map(normalizeCastAirstack)
											[0]
									),
								},
								{
									queryKey: ['FarcasterCasts', {
										farcasterFeedProvider: farcasterProvider,
										parentCastId: query.castId,
									}],
									queryFn: async ({
										queryKey: [, { parentCastId }],
									}) => {
										const { getFarcasterCastReplies } = await import('$/api/airstack')

										return await getFarcasterCastReplies({
											parentHash: parentCastId,
											limit: 100,
											cursor: '',
										})
									},
									select: result => (
										result
											?.FarcasterReplies
											?.Reply
											.map(normalizeCastAirstack)
									),
								},
							],

							combine: ([
								castQuery,
								repliesQuery,
							]) => ({
								...repliesQuery,
								...castQuery,
								data: {
									...castQuery.data,
									...repliesQuery?.data && {
										replies: repliesQuery.data,
									},
								},
							}),
						})

					:
						createQuery({
							queryKey: ['FarcasterCast', {
								farcasterProvider,
								castId: query.castId,
							}],
							queryFn: async ({
								queryKey: [, { castId }],
							}) => {
								const { getFarcasterCastByHash } = await import('$/api/airstack')

								return await getFarcasterCastByHash({
									hash: castId,
								})
							},
							select: (result) => {
								const cast = (
									result
										?.FarcasterCasts
										?.Cast
										?.map(normalizeCastAirstack)
										?.[0]
								)

								if(!cast)
									throw new Error(`Cast with ID ${query.castId} may not be indexed yet or was deleted.`)

								return cast
							},
						})

				: 'clientUrl' in query ?
					createQuery({
						queryKey: ['FarcasterCast', {
							farcasterProvider,
							clientUrl: query.clientUrl,
						}],
						queryFn: async ({
							queryKey: [, { clientUrl }],
						}) => {
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
								throw new Error(`Cast with URL ${query.clientUrl} may not be indexed yet or was deleted.`)

							return cast
						},
					})
				:
					undefined
			),
		}),

		[FarcasterProvider.Neynar]: () => ({
			fromQuery: (
				'castId' in query ?
					query.withReplies ?
						createQuery({
							queryKey: ['FarcasterCast', {
								farcasterProvider,
								castId: query.castId,
								withReplies: true,
							}],
							queryFn: async ({
								queryKey: [, { castId }],
							}) => {
								const { getFarcasterAllCastsInThread } = await import('$/api/neynar/v1')

								return await getFarcasterAllCastsInThread(
									publicEnv.PUBLIC_NEYNAR_API_KEY,
									castId,
								)
							},
							select: result => (
								normalizeCastWithRepliesV1Neynar(
									result.result.casts,
									query.castId
								)
							),
						})

					:
						createQuery({
							queryKey: ['FarcasterCast', {
								farcasterProvider,
								castId: query.castId,
							}],
							queryFn: async ({
								queryKey: [, { castId }],
							}) => {
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

				: 'clientUrl' in query ?
					createQuery({
						queryKey: ['FarcasterCast', {
							farcasterProvider,
							clientUrl: query.clientUrl,
						}],
						queryFn: async ({
							queryKey: [, { clientUrl }],
						}) => {
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
				'castId' in query ?
					createQuery({
						queryKey: ['FarcasterCast', {
							farcasterProvider,
							castId: query.castId,
						}],
						queryFn: async ({
							queryKey: [, { castId }],
						}) => {
							const { getCastByHash } = await import('$/api/pinata/farcaster')

							return await getCastByHash({
								hash: castId,
							})
						},
						select: result => (
							normalizeCastPinata(result.cast)
						),
					})

				: 'clientUrl' in query ?
					createQuery({
						queryKey: ['FarcasterCast', {
							farcasterProvider,
							clientUrl: query.clientUrl,
						}],
						queryFn: async () => {
							throw new Error('Pinata does not yet support fetching casts by Warpcast URLs.')
						},
					})

				:
					undefined
			),
		}),
	}[farcasterProvider]?.()}
	bind:result={cast}
	let:result={cast}
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
