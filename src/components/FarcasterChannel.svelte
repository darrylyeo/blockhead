<script lang="ts">
	// Types/constants
	import type { FarcasterChannel } from '$/api/farcaster'

	
	// Inputs
	export let channel: FarcasterChannel | Pick<FarcasterChannel, 'id'> | Pick<FarcasterChannel, 'url'>

	// (View options)
	export let showName = true
	export let showId = false


	// Functions
	import { resolveRoute } from '$app/paths'
</script>


<a
	class="farcaster-channel row"
	href={'id' in channel ? resolveRoute('/apps/farcaster/channel/[farcasterChannelId]', { farcasterChannelId: channel.id }) : ''}
>
	{#if 'image' in channel}
		<img
			src={channel.image}
			alt={channel.name}
		/>
	{/if}

	<slot>
		<span class="row inline">
			{#if 'name' in channel && showName}
				<span class="channel-name">{'name' in channel ? channel.name : 'url' in channel ? channel.url : ''}</span>
			{/if}

			{#if 'id' in channel && showId}
				<span class="channel-id">
					/{channel.id}
				</span>
			{/if}
		</span>
	</slot>
</a>


<style>
	.farcaster-channel {
		display: inline-flex;
		gap: 0.5em;
	}

	img {
		border-radius: 4px;
		height: 1.5em;
	}

	.channel-name + .channel-id {
		font-size: smaller;
		opacity: 0.5;
	}
</style>
