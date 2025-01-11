<script lang="ts">
	// Constants/types
	import type { FarcasterCast, FarcasterCastId } from '$/api/farcaster/index'
	import { FarcasterProvider, farcasterProviders } from '$/data/farcasterProviders'


	// Context
	import * as publicEnv from '$env/static/public'


	// Inputs
	export let farcasterProvider: FarcasterProvider
	export let query:
		// Replies to cast
		| {
			parentCastId: FarcasterCastId,
		}


	// Outputs
	export let casts: FarcasterCast[] | undefined

	type SharedSlotProps = {
		casts: typeof casts,
		pagination: Loader<any, any, any, any>['$$slot_def']['default']['pagination']
	}

	type $$Slots = {
		default: SharedSlotProps,
		header: SharedSlotProps,
	}


	// Functions
	import { createQuery, createInfiniteQuery } from '@tanstack/svelte-query'

	import { normalizeFarcasterCast as normalizeCastAirstack } from '$/api/airstack/normalize'
	import { normalizeCastWithRepliesV1 as normalizeCastWithRepliesV1Neynar } from '$/api/neynar/normalize'
	import { normalizeConversation as normalizeConversationPinata } from '$/api/pinata/farcaster/normalize'

	import { isTruthy } from '$/utils/isTruthy'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading replies from {farcasterProviders[farcasterProvider].name}..."
	loadingIcon={farcasterProviders[farcasterProvider].icon}
	errorMessage="Couldn't load replies from {farcasterProviders[farcasterProvider].name}."
	{...{
		[FarcasterProvider.Hub]: () => ({}),

		[FarcasterProvider.Airstack]: () => ({
			fromInfiniteQuery: (
				createInfiniteQuery({
					queryKey: ['FarcasterCasts', {
						farcasterProvider,
						parentCastId: query.parentCastId,
					}],
					initialPageParam: '',
					queryFn: async ({
						queryKey: [, { parentCastId }],
						pageParam: cursor,
					}) => {
						const { getFarcasterCastReplies } = await import('$/api/airstack')

						return await getFarcasterCastReplies({
							parentHash: parentCastId,
							limit: 50,
							cursor,
						})
					},
					getNextPageParam: (lastPage) => lastPage?.FarcasterReplies?.pageInfo?.nextCursor,
					select: result => (
						result.pages
							.flatMap(page => page?.FarcasterReplies?.Reply ?? [])
							.filter(isTruthy)
							.map(normalizeCastAirstack)
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[FarcasterProvider.Neynar]: () => ({
			fromQuery: (
				createQuery({
					queryKey: ['FarcasterCast', {
						farcasterProvider,
						castId: query.parentCastId,
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
							query.parentCastId,
						)
							?.replies
					),
				})
			),
		}),

		[FarcasterProvider.Pinata]: () => ({
			fromQuery: (
				createQuery({
					queryKey: ['FarcasterCasts', {
						farcasterProvider,
						parentCastId: query.parentCastId,
					}],
					initialPageParam: '',
					queryFn: async ({
						queryKey: [, { parentCastId }],
					}) => {
						const { getCasts } = await import('$/api/pinata/farcaster')

						return await getCasts({
							parentHash: parentCastId,
						})
					},
					select: result => (
						normalizeConversationPinata(result.conversation)
					),
					staleTime: 10 * 1000,
				})
			),
		}),
	}[farcasterProvider]?.()}
	bind:result={casts}
	let:result={casts}
	let:pagination
>
	<svelte:fragment slot="header"
		let:result={casts}
		let:pagination
	>
		<slot name="header"
			{casts}
			{pagination}
		/>
	</svelte:fragment>

	<slot
		{casts}
		{pagination}
	/>
</Loader>
