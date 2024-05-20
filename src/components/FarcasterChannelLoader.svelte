<script lang="ts">
	// Types/constants
	import type { FarcasterChannel, FarcasterChannelId } from '$/api/farcaster/index'
	import { FarcasterProvider, farcasterProviderIcons } from '$/data/farcasterProviders'


	// Context
	import * as publicEnv from '$env/static/public'


	// Inputs
	export let farcasterProvider: FarcasterProvider
	export let query:
		| {
			channelId: FarcasterChannelId,
		}
		| {
			castParentUrl: string,
		}


	// Outputs
	export let channel: FarcasterChannel | undefined

	type SharedSlotProps = {
		channel: typeof channel,
	}

	type $$Slots = {
		default: SharedSlotProps,
		header: SharedSlotProps,
	}


	// Functions
	import { createQuery } from '@tanstack/svelte-query'

	import { normalizeFarcasterChannel as normalizeChannelAirstack } from '$/api/airstack/normalize'
	import { normalizeChannel as normalizeChannelNeynar } from '$/api/neynar/normalize'
	import { normalizeChannel as normalizeChannelPinata } from '$/api/pinata/farcaster/normalize'

	import { getChannelIdFromUrl } from '$/api/farcaster'

	const findChannelIdByUrl = (castParentUrl: string): FarcasterChannelId | undefined => { 
		const channelId = getChannelIdFromUrl(castParentUrl)

		if(channelId)
			return channelId
	}


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading channel details from {farcasterProvider}..."
	loadingIcon={farcasterProviderIcons[farcasterProvider]}
	errorMessage={`Couldn't load channel details from ${farcasterProvider}.`}
	{...$$restProps}
	{...{
		[FarcasterProvider.Hub]: () => {},

		[FarcasterProvider.Airstack]: () => ({
			fromQuery: (
				'channelId' in query ?
					createQuery({
						queryKey: ['FarcasterChannel', {
							farcasterProvider,
							channelId: query.channelId,
						}],
						queryFn: async ({
							queryKey: [, { channelId }],
						}) => {
							const { getFarcasterChannel } = await import('$/api/airstack/index')

							return await getFarcasterChannel({
								channelId,
							})
						},
						select: (result) => (
							result
								?.FarcasterChannels
								?.FarcasterChannel
								?.map(normalizeChannelAirstack)
								[0]
						),
						staleTime: 10 * 1000,
					})

				: 'castParentUrl' in query ?
					createQuery({
						queryKey: ['FarcasterChannel', {
							farcasterProvider,
							castParentUrl: query.castParentUrl,
						}],
						queryFn: async ({
							queryKey: [, { castParentUrl }],
						}) => {
							const channelId = findChannelIdByUrl(castParentUrl)

							if(channelId){
								const { getFarcasterChannel } = await import('$/api/airstack/index')

								return await getFarcasterChannel({
									channelId,
								})
							}

							throw `Airstack doesn't support querying channels by cast parent URL.`
						},
						select: (result) => (
							result
								?.FarcasterChannels
								?.FarcasterChannel
								?.map(normalizeChannelAirstack)
								[0]
						),
						staleTime: 10 * 1000,
					})

				:
					undefined
			),
		}),

		[FarcasterProvider.Neynar]: () => ({
			fromQuery: (
				'channelId' in query ?
					createQuery({
						queryKey: ['FarcasterChannel', {
							farcasterProvider,
							channelId: query.channelId,
						}],
						queryFn: async ({
							queryKey: [, { channelId }],
						}) => {
							const { getFarcasterChannel, ChannelType } = await import('$/api/neynar/v2')

							return await getFarcasterChannel(
								publicEnv.PUBLIC_NEYNAR_API_KEY,
								channelId,
								{
									$type: ChannelType.Id,
								},
							)
						},
						select: (result) => (
							normalizeChannelNeynar(result.channel)
						),
						staleTime: 10 * 1000,
					})

				: 'castParentUrl' in query ?
					createQuery({
						queryKey: ['FarcasterChannel', {
							farcasterProvider,
							castParentUrl: query.castParentUrl,
						}],
						queryFn: async ({
							queryKey: [, { castParentUrl }],
						}) => {
							const { getFarcasterChannel, ChannelType } = await import('$/api/neynar/v2')

							return await getFarcasterChannel(
								publicEnv.PUBLIC_NEYNAR_API_KEY,
								castParentUrl,
								{
									$type: ChannelType.ParentUrl,
								},
							)
						},
						select: (result) => (
							normalizeChannelNeynar(result.channel)
						),
						staleTime: 10 * 1000,
					})
				
				:
					undefined
			),
		}),

		[FarcasterProvider.Pinata]: () => ({
			fromQuery: (
				'channelId' in query ?
					createQuery({
						queryKey: ['FarcasterChannel', {
							farcasterProvider,
							channelId: query.channelId,
						}],
						queryFn: async ({
							queryKey: [, { channelId }],
						}) => {
							const { getChannelByName } = await import('$/api/pinata/farcaster')

							return await getChannelByName({ name: channelId })
						},
						select: (result) => (
							normalizeChannelPinata(result.data)
						),
						staleTime: 10 * 1000,
					})

				: 'castParentUrl' in query ?
					createQuery({
						queryKey: ['FarcasterChannel', {
							farcasterProvider,
							castParentUrl: query.castParentUrl,
						}],
						queryFn: async ({
							queryKey: [, { castParentUrl }],
						}) => {
							const channelId = findChannelIdByUrl(castParentUrl)

							if(channelId){
								const { getChannelByName } = await import('$/api/pinata/farcaster')

								return await getChannelByName({ name: channelId })
							}

							throw `Pinata doesn't support querying channels by cast parent URL.`
						},
						select: (result) => (
							normalizeChannelPinata(result.data)
						),
					})

				:
					undefined
			),
		}),
	}[farcasterProvider]?.()}
	
	bind:result={channel}
	let:result={channel}
>
	<svelte:fragment slot="header"
		let:result={channel}
	>
		<slot name="header"
			{channel}
		/>
	</svelte:fragment>

	<slot {channel} />
</Loader>
