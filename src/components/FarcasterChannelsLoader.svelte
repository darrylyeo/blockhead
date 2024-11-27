<script lang="ts">
	// Constants/types
	import type { FarcasterChannel } from '$/api/farcaster/index'
	import { FarcasterProvider, farcasterProviderIcons } from '$/data/farcasterProviders'


	// Context
	import * as publicEnv from '$env/static/public'


	// Inputs
	export let farcasterProvider: FarcasterProvider = FarcasterProvider.Neynar


	// Outputs
	export let channels: FarcasterChannel[] | undefined

	type SharedSlotProps = {
		channels: typeof channels,
	}

	type $$Slots = {
		default: SharedSlotProps,
		header: SharedSlotProps,
	}


	// Functions
	import { createQuery, createInfiniteQuery } from '@tanstack/svelte-query'

	import { normalizeFarcasterChannel as normalizeChannelAirstack } from '$/api/airstack/normalize'
	import { normalizeChannel as normalizeChannelNeynar, normalizeChannelOld as normalizeChannelOldNeynar } from '$/api/neynar/normalize'
	import { normalizeChannel as normalizeChannelPinata } from '$/api/pinata/farcaster/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading channels from {farcasterProvider}..."
	loadingIcon={farcasterProviderIcons[farcasterProvider]}
	errorMessage="Couldn't load channels from {farcasterProvider}."
	{...$$restProps}
	{...{
		[FarcasterProvider.Hub]: () => {},

		[FarcasterProvider.Airstack]: () => ({
			fromInfiniteQuery: (
				createInfiniteQuery({
					queryKey: ['FarcasterChannels', {
						farcasterProvider,
					}],
					initialPageParam: '',
					queryFn: async ({ pageParam: cursor }) => {
						const { getFarcasterChannels } = await import('$/api/airstack')

						return await getFarcasterChannels({
							limit: 100,
							cursor,
						})
					},
					getNextPageParam: (lastPage) => lastPage?.FarcasterChannels?.pageInfo?.nextCursor,
					select: result => (
						result.pages
							.flatMap(page => page?.FarcasterChannels?.FarcasterChannel ?? [])
							.map(normalizeChannelAirstack)
					),
					staleTime: 10 * 1000,
				})
			),
		}),

		[FarcasterProvider.Neynar]: () => (
			true ?
				{
					fromInfiniteQuery: (
						createInfiniteQuery({
							queryKey: ['FarcasterChannels', {
								farcasterProvider,
							}],
							initialPageParam: '',
							queryFn: async ({ pageParam: pageToken }) => {
								const { getFarcasterChannelList } = await import('$/api/neynar/v2')

								return await getFarcasterChannelList(
									publicEnv.PUBLIC_NEYNAR_API_KEY,
									{
										cursor: pageToken,
										limit: 100,
									}
								)
							},
							getNextPageParam: (lastPage, pages) => lastPage.next?.cursor,
							select: result => (
								result.pages
									.flatMap(page => page.channels ?? [])
									.map(normalizeChannelNeynar)
							),
						})
					),
				}
				: {
					fromQuery: (
						createQuery({
							queryKey: ['FarcasterChannels', {
								farcasterProvider,
							}],
							queryFn: async () => {
								const { getFarcasterChannelList } = await import('$/api/neynar/channels')

								return await getFarcasterChannelList()
							},
							select: result => (
								result.map(normalizeChannelOldNeynar)
							),
						})
					),
				}
		),

		[FarcasterProvider.Pinata]: () => ({
			fromInfiniteQuery: (
				createInfiniteQuery({
					queryKey: ['FarcasterChannels', {
						farcasterProvider,
					}],
					initialPageParam: '',
					queryFn: async ({ pageParam: pageToken }) => {
						const { getChannels } = await import('$/api/pinata/farcaster')

						return await getChannels({
							pageToken,
							pageSize: 100,
						})
					},
					getNextPageParam: (lastPage, pages) => lastPage.next.cursor,
					select: result => (
						result.pages
							.flatMap(page => page.channels)
							.map(normalizeChannelPinata)
					),
				})
			),
		}),
	}[farcasterProvider]?.()}
	
	bind:result={channels}
	let:result={channels}
>
	<svelte:fragment slot="header"
		let:result={channels}
	>
		<slot name="header"
			{channels}
		/>
	</svelte:fragment>

	<slot {channels} />
</Loader>
