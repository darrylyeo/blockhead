<script lang="ts">
	export let playlistId: string
	
	
	import type { Audius } from '$/api/audius'
	import { getPlaylistTracks } from '$/api/audius'
	
	
	import AudiusTrack from './AudiusTrack.svelte'
	import Loader from './Loader.svelte'


	import { AudiusIcon } from '$/assets/icons'
</script>


{#if playlistId}
	<Loader
		loadingIcon={AudiusIcon}
		loadingMessage="Fetching tracks from Audius network..."
		fromPromise={() => getPlaylistTracks({playlistId}).then(({data: tracks}) => tracks)}
		let:result={tracks}
		viewOptions={{
			showIf: tracks => tracks.length,
		}}
	>
		<slot slot="header" name="header" />

		{#each tracks as track}
			<AudiusTrack {track} />
		{/each}
	</Loader>
{/if}
