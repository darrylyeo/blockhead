<script lang="ts">
	// Types/constants
	import type { FarcasterChannel } from '$/api/farcaster'

	
	// Inputs
	export let channel: FarcasterChannel | Pick<FarcasterChannel, 'id'> | Pick<FarcasterChannel, 'url'>
</script>


<a
	class="channel row"
	href={channel.url}
>
	{#if 'image' in channel}
		<img
			src={channel.image}
			alt={channel.name}
		/>
	{/if}

	<span>{'name' in channel ? channel.name : 'url' in channel ? channel.url : ''}</span>
</a>


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
