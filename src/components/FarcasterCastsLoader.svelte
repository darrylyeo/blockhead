<script lang="ts">
	// Constants/types
	import type { Cast as CastNeynar } from '../api/neynar/v2'
	import type { FarcasterUserId } from '../api/farcaster/index'
	import { FarcasterProvider, farcasterProviderIcons } from '../data/farcasterProviders'


	// Context
	import { env } from '../env'


	// Inputs
	export let farcasterProvider: FarcasterProvider = FarcasterProvider.Neynar
	export let userId: FarcasterUserId | undefined
	

	// Outputs
	export let casts: CastNeynar[] | undefined

	type SharedSlotProps = {
		casts: typeof casts,
	}

	type $$Slots = {
		default: SharedSlotProps,
		header: SharedSlotProps,
	}


	// Functions
	import { createInfiniteQuery } from '@tanstack/svelte-query'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading casts from {farcasterProvider}..."
	loadingIcon={farcasterProviderIcons[farcasterProvider]}
	errorMessage="Couldn't load casts from {farcasterProvider}."
	{...{
		[FarcasterProvider.Hub]: () => {},

		[FarcasterProvider.Neynar]: () => ({
			fromInfiniteQuery: (
				createInfiniteQuery({
					queryKey: ['FarcasterCasts', {
						farcasterProvider,
						userId,
					}],
					initialPageParam: '',
					queryFn: async ({ pageParam: cursor }) => {
						const { feed } = await import('../api/neynar/v2')

						return (
							userId ?
								await feed(
									env.NEYNAR_API_KEY,
									'filter',
									{
										filterType: 'fids',
										fids: String(userId),
										fid: userId,
										cursor,
										limit: 100,
									}
								)
							: 
								await feed(
									env.NEYNAR_API_KEY,
									'filter',
									{
										filterType: 'global_trending',
										cursor,
										limit: 100,
									}
								)
						)
					},
					getNextPageParam: (lastPage) => lastPage.next?.cursor,
					select: result => (
						result.pages.flatMap(page => page.casts ?? [])
					),
					staleTime: 10 * 1000,
				})
			),
		}),
	}[farcasterProvider]?.()}
	{...$$restProps}
	bind:result={casts}
	let:result={casts}
>
	<svelte:fragment slot="header"
		let:result={casts}
	>
		<slot name="header"
			{casts}
		/>
	</svelte:fragment>

	<slot {casts} />
</Loader>
