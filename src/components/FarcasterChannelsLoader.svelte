<script lang="ts">
	// Constants/types
	import type { FarcasterChannel } from '$/api/farcaster/index'
	import { FarcasterProvider, farcasterProviderIcons } from '$/data/farcasterProviders'


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

	import { getFarcasterChannelList } from '$/api/neynar/channels'

	import { normalizeFarcasterChannel as normalizeChannelAirstack } from '$/api/airstack/normalize'
	import { normalizeChannel as normalizeChannelNeynar } from '$/api/neynar/normalize'
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

		[FarcasterProvider.Neynar]: () => ({
			fromQuery: (
				createQuery({
					queryKey: ['FarcasterChannels', {
						farcasterProvider,
					}],
					queryFn: async () => (
						await getFarcasterChannelList()
					),
					select: result => (
						result.map(normalizeChannelNeynar)
					),
				})
			),
		}),

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
					getNextPageParam: (lastPage, pages) => lastPage.data?.next_page_token,
					select: result => (
						result.pages
							.flatMap(page => page.data.channels)
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
