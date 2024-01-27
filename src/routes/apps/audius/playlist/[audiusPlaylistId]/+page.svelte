<script lang="ts">
	// Params
	import { audiusPlaylistId } from '../../../_appsParams'


	// Components
	import AudiusPlaylistLoader from '$/components/AudiusPlaylistLoader.svelte'
	import AudiusPlaylistTracksLoader from '$/components/AudiusPlaylistTracksLoader.svelte'
</script>


<AudiusPlaylistLoader playlistId={$audiusPlaylistId} />

<div class="card">
	<h3>Tracks</h3>
	<AudiusPlaylistTracksLoader playlistId={$audiusPlaylistId} />
</div>
