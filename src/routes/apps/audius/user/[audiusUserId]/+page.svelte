<script lang="ts">
	// Params
	import { appsParams } from '../../../_appsParams.svelte'


	// Components
	import AudiusUserLoader from '$/components/AudiusUserLoader.svelte'
	import AudiusUserTracksLoader from '$/components/AudiusUserTracksLoader.svelte'
	import AudiusUserFavoritesLoader from '$/components/AudiusUserFavoritesLoader.svelte'
</script>


<AudiusUserLoader userId={appsParams.audiusUserId} />

<!-- <AudiusUserTracksLoader userId={appsParams.audiusUserId}>
	<svelte:fragment slot="header">
		<hr>
		<h3>Tracks</h3>
	</svelte:fragment>
</AudiusUserTracksLoader>

<AudiusUserFavoritesLoader userId={appsParams.audiusUserId}>
	<svelte:fragment slot="header">
		<hr>
		<h3>Favorites</h3>
	</svelte:fragment>
</AudiusUserFavoritesLoader> -->

<div class="card">
	<h3>Tracks</h3>
	<AudiusUserTracksLoader userId={appsParams.audiusUserId} />
</div>

<div class="card">
	<h3>Favorites</h3>
	<AudiusUserFavoritesLoader userId={appsParams.audiusUserId} />
</div>
