<script lang="ts">
	export let playlistId: string


	import { getPlaylist } from '../data/audius/audius'


	import AudiusPlaylist from './AudiusPlaylist.svelte'
	import Loader from './Loader.svelte'
</script>


{#if playlistId}
	<Loader
		loadingIcon={'/logos/Audius.png'}
		loadingMessage="Fetching playlist data from Audius network..."
		fromPromise={() => getPlaylist({playlistId}).then(({data: [playlist]}) => playlist)}
		let:result={playlist}
	>
		<AudiusPlaylist {playlist} />
	</Loader>
{/if}