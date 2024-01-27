<script lang="ts">
	// Types/constants
	import type { FarcasterProvider } from '$/data/farcasterProviders'
	
	
	// Inputs
	export let farcasterProvider: FarcasterProvider
	export let channelUrl: string


	// Functions
	import { getChannelFromUrl } from '$/api/farcaster'


	// Components
	import FarcasterChannelsLoader from './FarcasterChannelsLoader.svelte'
</script>


<FarcasterChannelsLoader
	farcasterProvider={farcasterProvider}
	layout="passive"
	let:channels
>
	{@const channel = (
		channels?.find(channel => channel.url === channelUrl)
		?? (channelUrl && getChannelFromUrl(channelUrl))
	)}

	{#if channel}
		<a
			class="channel row"
			href={channel.url}
		>
			<img src={channel.image} />

			<span>{channel.name}</span>
		</a>
	{:else}
		{channelUrl}
	{/if}
</FarcasterChannelsLoader>


<style>
	.channel {
		display: inline-flex;
		align-self: center;
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
