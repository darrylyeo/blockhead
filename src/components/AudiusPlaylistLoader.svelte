<script lang="ts">
	export let playlistId: string
	
	
	import { getPlaylist } from '$/api/audius'
	
	
	import AudiusPlaylist from './AudiusPlaylist.svelte'
	import Loader from './Loader.svelte'


	import { AudiusIcon } from '$/assets/icons'
</script>


{#if playlistId}
	<Loader
		loadingIcon={AudiusIcon}
		loadingMessage="Fetching playlist data from Audius network..."
		fromPromise={() => getPlaylist({playlistId}).then(({data: [playlist]}) => playlist)}
		let:result={playlist}
	>
		<AudiusPlaylist {playlist} />
	</Loader>
{/if}
