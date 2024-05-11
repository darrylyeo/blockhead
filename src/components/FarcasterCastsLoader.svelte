<script lang="ts">
	// Constants/types
	import { FeedType, FilterType } from '$/api/neynar/v2'
	import type { FarcasterCast, FarcasterUserId } from '$/api/farcaster/index'
	import { FarcasterProvider } from '$/data/farcasterProviders'
	import { FarcasterFeedProvider, farcasterFeedProviderIcons } from '$/data/farcasterFeedProviders'


	// Context
	import * as publicEnv from '$env/static/public'


	// Inputs
	export let farcasterProvider: FarcasterProvider = FarcasterProvider.Neynar
	export let farcasterFeedProvider: FarcasterFeedProvider = farcasterProvider as unknown as FarcasterFeedProvider
	export let userId: FarcasterUserId | undefined
	

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
	import { createInfiniteQuery } from '@tanstack/svelte-query'

	import { normalizeFarcasterCast as normalizeCastAirstack } from '$/api/airstack/normalize'
	import { normalizeCastV2 as normalizeCastNeynarV2 } from '$/api/neynar/normalize'
	import { normalizeCast as normalizeCastPinata } from '$/api/pinata/farcaster/normalize' 


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading casts from {farcasterFeedProvider}..."
	loadingIcon={farcasterFeedProviderIcons[farcasterFeedProvider]}
	errorMessage="Couldn't load casts from {farcasterFeedProvider}."
	{...{
		[FarcasterFeedProvider.Airstack]: () => ({
			fromInfiniteQuery: (
				createInfiniteQuery({
					queryKey: ['FarcasterCasts', {
						farcasterProvider,
						userId,
					}],
					initialPageParam: '',
					queryFn: async ({ pageParam: cursor }) => {
						if(userId){
							const { getFarcasterCastsByUserId } = await import('$/api/airstack')

							return await getFarcasterCastsByUserId({
								userId,
								limit: 100,
								cursor,
							})
						}else{
							const { getFarcasterCasts } = await import('$/api/airstack')

							return await getFarcasterCasts({
								limit: 100,
								cursor,
							})
						}
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
				createInfiniteQuery({
					queryKey: ['FarcasterCasts', {
						farcasterFeedProvider,
						userId,
					}],
					initialPageParam: '',
					queryFn: async ({ pageParam: cursor }) => {
						const { feed } = await import('$/api/neynar/v2')

						return (
							userId ?
								await feed(
									publicEnv.PUBLIC_NEYNAR_API_KEY,
									FeedType.Filter,
									{
										filterType: FilterType.Fids,
										fids: String(userId),
										fid: userId,
										cursor,
										limit: 100,
									}
								)
							: 
								await feed(
									publicEnv.PUBLIC_NEYNAR_API_KEY,
									FeedType.Filter,
									{
										filterType: FilterType.GlobalTrending,
										cursor,
										limit: 100,
									}
								)
						)
					},
					getNextPageParam: (lastPage) => lastPage.next?.cursor,
					select: result => (
						result.pages
							.flatMap(page => page.casts ?? [])
							.map(normalizeCastNeynarV2)
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[FarcasterFeedProvider.Pinata]: () => ({
			fromQuery: (
				createInfiniteQuery({
					queryKey: ['FarcasterCasts', {
						farcasterFeedProvider,
						userId,
					}],
					initialPageParam: '',
					queryFn: async ({ pageParam: pageToken }) => {
						const { getCasts } = await import('$/api/pinata/farcaster')

						return (
							userId ?
								await getCasts({
									fid: userId,
									pageSize: 100,
									pageToken,
								})
							:
								await getCasts({
									pageSize: 100,
									pageToken,
								})
						)
					},
					getNextPageParam: (lastPage) => lastPage.data?.next_page_token,
					select: result => (
						result.pages
							.flatMap(page => page.data.casts)
							.map(normalizeCastPinata)
					),
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
