<script lang="ts">
	// Constants/types
	import { FeedType, FilterType } from '$/api/neynar/v2'
	import type { FarcasterCast, FarcasterUserId, FarcasterChannelId } from '$/api/farcaster/index'
	import { FarcasterProvider } from '$/data/farcasterProviders'
	import { FarcasterFeedProvider, farcasterFeedProviders } from '$/data/farcasterFeedProviders'


	// Context
	import * as publicEnv from '$env/static/public'


	// Inputs
	export let farcasterProvider: FarcasterProvider
	export let farcasterFeedProvider: FarcasterFeedProvider = farcasterProvider as unknown as FarcasterFeedProvider
	export let query:
		// Unordered / chronological
		| undefined
		// Casts by user
		| {
			userId: FarcasterUserId,
		}
		// Casts by users followed by user
		| {
			followedByUserId: FarcasterUserId,
		}
		// Casts in channel by channel ID
		| {
			channelId: FarcasterChannelId,
			withReplies?: boolean,
		}
		// Casts in channel by cast parent URL
		| {
			castParentUrl: string,
			withReplies?: boolean,
		}
		// Casts in trending
		| {
			trending: boolean,
			feedOptions?: {
				[FarcasterFeedProvider.Airstack]?: {
					criteria: 'social_capital_value' | 'likes' | 'recasts' | 'replies' | 'likes_recasts_replies',
					timeFrame: 'one_hour' | 'two_hours' | 'eight_hours' | 'one_day' | 'two_days' | 'seven_days',
				},
			},
		}


	// Outputs
	export let casts: (FarcasterCast | Pick<FarcasterCast, 'id'>)[] | undefined

	type SharedSlotProps = {
		casts: typeof casts,
		pagination: Loader['$$slot_def']['default']['pagination']
	}

	type $$Slots = {
		default: SharedSlotProps,
		header: SharedSlotProps,
	}


	// Functions
	import { createInfiniteQuery } from '@tanstack/svelte-query'

	import { normalizeFarcasterCast as normalizeCastAirstack, normalizeFarcasterTrendingCast as normalizeTrendingCastAirstack } from '$/api/airstack/normalize'
	import { normalizeCastV2 as normalizeCastNeynarV2 } from '$/api/neynar/normalize'
	import { normalizeCast as normalizeCastPinata, normalizeCastCamelCase as normalizeCastCamelCasePinata } from '$/api/pinata/farcaster/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading casts from {farcasterFeedProviders[farcasterFeedProvider].name}..."
	loadingIcon={farcasterFeedProviders[farcasterFeedProvider].icon}
	errorMessage="Couldn't load casts from {farcasterFeedProviders[farcasterFeedProvider].name}."
	{...{
		[FarcasterFeedProvider.Airstack]: () => ({
			fromInfiniteQuery: (
				query && 'userId' in query ?
					createInfiniteQuery({
						queryKey: ['FarcasterCasts', {
							farcasterFeedProvider,
							userId: query.userId,
						}],
						initialPageParam: '',
						queryFn: async ({
							pageParam: cursor
						}) => {
							const { getFarcasterCastsByUserId } = await import('$/api/airstack')

							return await getFarcasterCastsByUserId({
								userId: query.userId,
								limit: 20,
								cursor,
							})
						},
						getNextPageParam: (lastPage) => lastPage?.FarcasterCasts?.pageInfo?.nextCursor,
						select: result => (
							result.pages
								.flatMap(page => page?.FarcasterCasts?.Cast ?? [])
								.map(normalizeCastAirstack)
						),
						staleTime: 10 * 1000,
					})

				: query && 'castParentUrl' in query ?
					createInfiniteQuery({
						queryKey: ['FarcasterCasts', {
							farcasterFeedProvider,
							channelId: query.channelId,
							withReplies: query.withReplies,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [, { channelId, withReplies }],
							pageParam: cursor,
						}) => {
							const { getFarcasterCastsByChannel } = await import('$/api/airstack')

							return await getFarcasterCastsByChannel({
								channelId,
								withReplies,
								limit: 20,
								cursor,
							})
						},
						getNextPageParam: (lastPage) => lastPage?.FarcasterCasts?.pageInfo?.nextCursor,
						select: result => (
							result.pages
								.flatMap(page => page?.FarcasterCasts?.Cast ?? [])
								.map(normalizeCastAirstack)
						),
						staleTime: 10 * 1000,
					})

				: query && 'trending' in query ?
					createInfiniteQuery({
						queryKey: ['FarcasterCasts', {
							farcasterFeedProvider,
							feedOptions: query.feedOptions,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [, { feedOptions }],
							pageParam: cursor
						}) => {
							const { getFarcasterTrendingCasts } = await import('$/api/airstack')

							return await getFarcasterTrendingCasts({
								criteria: feedOptions?.[FarcasterFeedProvider.Airstack]?.criteria,
								timeFrame: feedOptions?.[FarcasterFeedProvider.Airstack]?.timeFrame,
								limit: 20,
								cursor,
							})
						},
						getNextPageParam: (lastPage) => lastPage?.TrendingCasts?.pageInfo?.nextCursor,
						select: result => (
							result.pages
								.flatMap(page => page?.TrendingCasts?.TrendingCast ?? [])
								.map(normalizeTrendingCastAirstack)
						),
						staleTime: 10 * 1000,
					})

				:
					createInfiniteQuery({
						queryKey: ['FarcasterCasts', {
							farcasterFeedProvider,
						}],
						initialPageParam: '',
						queryFn: async ({ pageParam: cursor }) => {
							const { getFarcasterCasts } = await import('$/api/airstack')

							return await getFarcasterCasts({
								limit: 20,
								cursor,
							})
						},
						getNextPageParam: (lastPage) => lastPage?.FarcasterCasts?.pageInfo?.nextCursor,
						select: result => (
							result.pages
								.flatMap(page => page?.FarcasterCasts?.Cast ?? [])
								.map(normalizeCastAirstack)
						),
						staleTime: 10 * 1000,
					})
			),
		}),

		[FarcasterFeedProvider.Neynar]: () => ({
			fromInfiniteQuery: (
				query && 'userId' in query ?
					createInfiniteQuery({
						queryKey: ['FarcasterCasts', {
							farcasterFeedProvider,
							userId: query.userId,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [, { userId }],
							pageParam: cursor,
						}) => {
							const { feed } = await import('$/api/neynar/v2')

							return await feed(
								publicEnv.PUBLIC_NEYNAR_API_KEY,
								FeedType.Filter,
								{
									filterType: FilterType.Fids,
									fids: String(userId),
									fid: userId,
									cursor,
									limit: 20,
								}
							)
						},
						getNextPageParam: (lastPage) => lastPage?.next?.cursor,
						select: result => (
							[...new Set(
								result.pages
									.flatMap(page => page.casts ?? [])
									.map(normalizeCastNeynarV2)
							)]
						),
						staleTime: 10 * 1000,
					})

				: query && 'channelId' in query ?
					createInfiniteQuery({
						queryKey: ['FarcasterCasts', {
							farcasterFeedProvider,
							channelId: query.channelId,
							withReplies: query.withReplies,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [, { channelId, withReplies }],
							pageParam: cursor,
						}) => {
							const { getFarcasterFeedChannels } = await import('$/api/neynar/v2')

							return await getFarcasterFeedChannels(
								publicEnv.PUBLIC_NEYNAR_API_KEY,
								channelId,
								{
									withReplies,
									cursor,
									limit: 20,
								}
							)
						},
						getNextPageParam: (lastPage) => lastPage?.next?.cursor,
						select: result => (
							[...new Set(
								result.pages
									.flatMap(page => page.casts ?? [])
									.map(normalizeCastNeynarV2)
							)]
						),
						staleTime: 10 * 1000,
					})

				:
					createInfiniteQuery({
						queryKey: ['FarcasterCasts', {
							farcasterFeedProvider,
						}],
						initialPageParam: '',
						queryFn: async ({
							pageParam: cursor,
						}) => {
							const { feed } = await import('$/api/neynar/v2')

							return await feed(
								publicEnv.PUBLIC_NEYNAR_API_KEY,
								FeedType.Filter,
								{
									filterType: FilterType.GlobalTrending,
									cursor,
									limit: 20,
								}
							)
						},
						getNextPageParam: (lastPage) => lastPage.next?.cursor,
						select: result => (
							[...new Set(
								result.pages
									.flatMap(page => page.casts ?? [])
									.map(normalizeCastNeynarV2)
							)]
						),
						staleTime: 10 * 1000,
					})
			),
		}),

		[FarcasterFeedProvider.OpenRank]: () => ({
			fromInfiniteQuery: (
				query && 'followedByUserId' in query ?
					createInfiniteQuery({
						queryKey: ['FarcasterCasts', {
							farcasterFeedProvider,
							followedByUserId: query.followedByUserId,
						}],
						initialPageParam: 0,
						queryFn: async ({
							queryKey: [, { followedByUserId }],
							pageParam: offset,
						}) => {
							const { getRecentCastsForFidCastsPersonalizedRecentFidGet } = await import('$/api/openrank/farcaster/index')

							return await getRecentCastsForFidCastsPersonalizedRecentFidGet(
								followedByUserId,
								{
									offset,
									limit: 20,
								},
							)
						},
						getNextPageParam: (lastPage, allPages) => allPages.length * 50,
						select: result => (
							[...new Set(
								result.pages
									.flatMap(page => page.result ?? [])
									.map(item => item.cast_hash)
							)]
								.map(id => ({
									id,
								}))
						),
						staleTime: 10 * 1000,
					})

				: query && 'channelId' in query ?
					createInfiniteQuery({
						queryKey: ['FarcasterCasts', {
							farcasterFeedProvider,
							channelId: query.channelId,
						}],
						initialPageParam: 0,
						queryFn: async ({
							queryKey: [, { channelId }],
							pageParam: offset,
						}) => {
							const { getPopularChannelCastsChannelsCastsPopularChannelGet } = await import('$/api/openrank/farcaster/index')

							try {
								return await getPopularChannelCastsChannelsCastsPopularChannelGet(
									channelId,
									{
										offset,
										limit: 20,
									},
								)
							} catch (e) {
								try {
									throw JSON.parse(e.data.message).detail[0].msg
								}catch(e){
									throw e
								}
							}
						},
						getNextPageParam: (lastPage, allPages) => allPages.length,
						select: result => {
							const castIds = [...new Set(
								result.pages
									.flatMap(page => page.result ?? [])
									.map(item => item.cast_hash)
							)]
								.map(id => ({
									id,
								}))

							if(!castIds.length)
								throw `Either no casts exist, or OpenRank has not yet indexed the Farcaster channel "${query.channelId}".`
						},
						staleTime: 10 * 1000,
					})

				:
					// Default to dwr.eth's Feed
					createInfiniteQuery({
						queryKey: ['FarcasterCasts', {
							farcasterFeedProvider,
						}],
						initialPageParam: 0,
						queryFn: async ({
							pageParam: offset,
						}) => {
							const { getRecentCastsForFidCastsPersonalizedRecentFidGet } = await import('$/api/openrank/farcaster/index')

							return await getRecentCastsForFidCastsPersonalizedRecentFidGet(
								3,
								{
									offset,
									limit: 20,
								},
							)
						},
						getNextPageParam: (lastPage, allPages) => allPages.length * 50,
						select: result => (
							[...new Set(
								result.pages
									.flatMap(page => page.result ?? [])
									.map(item => item.cast_hash)
							)]
								.map(id => ({
									id,
								}))
						),
						staleTime: 10 * 1000,
					})
			),
		}),

		[FarcasterFeedProvider.Pinata]: () => ({
			fromInfiniteQuery: (
				query && 'userId' in query ?
					createInfiniteQuery({
						queryKey: ['FarcasterCasts', {
							farcasterFeedProvider,
							userId: query.userId,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [, { userId }],
							pageParam: pageToken,
						}) => {
							const { getCasts } = await import('$/api/pinata/farcaster')

							return await getCasts({
								fid: userId,
								reverse: true,
								pageSize: 20,
								pageToken,
							})
						},
						getNextPageParam: (lastPage) => lastPage.next.cursor,
						select: result => (
							result.pages
								.flatMap(page => page.casts)
								.map(normalizeCastPinata)
						),
						staleTime: 10 * 1000,
					})

				: query && 'channelId' in query ?
					createInfiniteQuery({
						queryKey: ['FarcasterCasts', {
							farcasterFeedProvider,
							channelId: query.channelId,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [, { channelId }],
							pageParam: pageToken,
						}) => {
							const { getCasts } = await import('$/api/pinata/farcaster')

							return await getCasts({
								channel: channelId,
								reverse: true,
								pageSize: 20,
								pageToken,
							})
						},
						getNextPageParam: (lastPage) => lastPage.next.cursor,
						select: result => (
							result.pages
								.flatMap(page => page.casts)
								.map(normalizeCastPinata)
						),
						staleTime: 10 * 1000,
					})

				: query && 'castParentUrl' in query ?
					createInfiniteQuery({
						queryKey: ['FarcasterCasts', {
							farcasterFeedProvider,
							castParentUrl: query.castParentUrl,
						}],
						initialPageParam: '',
						queryFn: async ({
							queryKey: [, { castParentUrl }],
							pageParam: pageToken,
						}) => {
							const { getCasts } = await import('$/api/pinata/farcaster')

							return await getCasts({
								channel: castParentUrl,
								reverse: true,
								pageSize: 20,
								pageToken,
							})
						},
						getNextPageParam: (lastPage) => lastPage.next.cursor,
						select: result => (
							result.pages
								.flatMap(page => page.casts)
								.map(normalizeCastPinata)
						),
						staleTime: 10 * 1000,
					})

				:
					createInfiniteQuery({
						queryKey: ['FarcasterCasts', {
							farcasterFeedProvider,
						}],
						initialPageParam: '',
						queryFn: async ({ pageParam: pageToken }) => {
							const { getCasts } = await import('$/api/pinata/farcaster')

							return await getCasts({
								reverse: true,
								pageSize: 20,
								pageToken,
							})
						},
						getNextPageParam: (lastPage) => lastPage.next.cursor,
						select: result => (
							result.pages
								.flatMap(page => page.casts)
								.map(normalizeCastCamelCasePinata)
						),
						staleTime: 10 * 1000,
					})
			),
		}),
	}[farcasterFeedProvider]?.()}
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
