<script lang="ts">
	// Params
	import { appsParams } from '../../../_appsParams.svelte'


	// Components
	import AudiusPlaylistLoader from '$/components/AudiusPlaylistLoader.svelte'
	import AudiusPlaylistTracksLoader from '$/components/AudiusPlaylistTracksLoader.svelte'
</script>


<AudiusPlaylistLoader playlistId={appsParams.audiusPlaylistId} />

<div class="card">
	<h3>Tracks</h3>
	<AudiusPlaylistTracksLoader playlistId={appsParams.audiusPlaylistId} />
</div>
