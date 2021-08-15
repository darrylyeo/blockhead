<script lang="ts">
	import { page } from '$app/stores'

	$: ({playlistId} = $page.params)


	import AudiusPlaylistLoader from '../../../../components/AudiusPlaylistLoader.svelte'
	import AudiusPlaylistTracksLoader from '../../../../components/AudiusPlaylistTracksLoader.svelte'
</script>


{#if playlistId}
	<AudiusPlaylistLoader {playlistId} />
{/if}

<div class="card">
	<h3>Tracks</h3>
	<AudiusPlaylistTracksLoader {playlistId} />
</div>