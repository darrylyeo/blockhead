<script lang="ts">
	// Constants/types
	import type { FarcasterChannel } from '../api/farcaster/index'
	import { FarcasterProvider, farcasterProviderIcons } from '../data/farcasterProviders'


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
	import { createQuery } from '@tanstack/svelte-query'
	import { normalizeChannel as normalizeChannelNeynar } from '../api/neynar/normalize'


	// Components
	import Loader from './Loader.svelte'
</script>


<Loader
	loadingMessage="Loading channels from {farcasterProvider}..."
	loadingIcon={farcasterProviderIcons[farcasterProvider]}
	errorMessage="Couldn't load channels from {farcasterProvider}."
	{...{
		[FarcasterProvider.Hub]: () => {},

		[FarcasterProvider.Neynar]: () => ({
			fromQuery: (
				createQuery({
					queryKey: ['FarcasterChannels', {
						farcasterProvider,
					}],
					queryFn: async () => (
						fetch('https://raw.githubusercontent.com/neynarxyz/farcaster-channels/main/warpcast.json')
							.then(response => response.json())
					),
					select: result => (
						result.map(normalizeChannelNeynar)
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
