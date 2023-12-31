<script lang="ts">
	// Constants/types
	import { CastParamType } from '../api/neynar/v2'
	import type { FarcasterCast, FarcasterCastId, FarcasterUserId } from '../api/farcaster/index'
	import { FarcasterProvider, farcasterProviderIcons } from '../data/farcasterProviders'


	// Context
	import { env } from '../env'


	// Inputs
	export let farcasterProvider: FarcasterProvider = FarcasterProvider.Neynar
	export let userId: FarcasterUserId | undefined
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
	import { normalizeCastWithRepliesV1 as normalizeCastWithRepliesV1Neynar, normalizeCastV2 as normalizeCastNeynarV2 } from '../api/neynar/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading cast from {farcasterProvider}..."
	loadingIcon={farcasterProviderIcons[farcasterProvider]}
	errorMessage="Couldn't load cast from {farcasterProvider}."
	{...{
		[FarcasterProvider.Hub]: () => {},

		[FarcasterProvider.Neynar]: () => ({
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
					...castId && withReplies ? {
						queryFn: async () => {
							const { getFarcasterAllCastsInThread } = await import('../api/neynar/v1')

							return await getFarcasterAllCastsInThread(
								env.NEYNAR_API_KEY,
								castId,
							)
						},
						select: result => (
							normalizeCastWithRepliesV1Neynar(result.result.casts)
						),
					} : {
						queryFn: async () => {
							const { cast } = await import('../api/neynar/v2')

							return (
								castId ?
									await cast(
										env.NEYNAR_API_KEY,
										castId,
										CastParamType.Hash,
									)
								: clientUrl ? 
									await cast(
										env.NEYNAR_API_KEY,
										clientUrl,
										CastParamType.Url,
									)
								:
									undefined
							)
						},
						select: result => (
							result?.cast && normalizeCastNeynarV2(result.cast)
						),
					},
				})
			),
		}),
	}[farcasterProvider]?.()}
	{...$$restProps}
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
