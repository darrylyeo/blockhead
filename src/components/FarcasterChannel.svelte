<script lang="ts">
	// Types/constants
	import type { FarcasterProvider } from '../data/farcasterProviders'
	
	
	// Inputs
	export let farcasterProvider: FarcasterProvider
	export let channelUrl: string


	// Components
	import FarcasterChannelsLoader from './FarcasterChannelsLoader.svelte'
</script>


<FarcasterChannelsLoader
	farcasterProvider={farcasterProvider}
	let:channels
>
	{@const channel = channels?.find(channel => channel.url === channelUrl)}

	{#if channel}
		<a
			class="channel row"
			href={channel.url}
		>
			<img src={channel.image} />

			<span>{channel.name}</span>
		</a>
	{/if}
</FarcasterChannelsLoader>


<style>
	.channel {
		font-size: 0.8em;
		font-weight: normal;
	}

	.row {
		gap: 0.5em;
	}

	img {
		border-radius: 4px;
		height: 1.5em;
	}
</style>
