<script lang="ts">
	export let playlistId: string
	
	
	import type { Audius } from '../data/audius/audius'
	import { getPlaylistTracks } from '../data/audius/audius'
	
	
	import AudiusTrack from './AudiusTrack.svelte'
	import Loader from './Loader.svelte'


	import { AudiusIcon } from '../assets/icons'
</script>


{#if playlistId}
	<Loader
		loadingIcon={AudiusIcon}
		loadingMessage="Fetching tracks from Audius network..."
		fromPromise={() => getPlaylistTracks({playlistId}).then(({data: tracks}) => tracks)}
		let:result={tracks}
		showIf={tracks => tracks.length}
	>
		<slot slot="header" name="header" />

		{#each tracks as track}
			<AudiusTrack {track} />
		{/each}
	</Loader>
{/if}
