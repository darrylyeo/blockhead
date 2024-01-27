<script lang="ts">
	// Params
	import { audiusUserId } from '../../../_appsParams'


	// Components
	import AudiusUserLoader from '$/components/AudiusUserLoader.svelte'
	import AudiusUserTracksLoader from '$/components/AudiusUserTracksLoader.svelte'
	import AudiusUserFavoritesLoader from '$/components/AudiusUserFavoritesLoader.svelte'
</script>


<AudiusUserLoader userId={$audiusUserId} />

<!-- <AudiusUserTracksLoader userId={$audiusUserId}>
	<svelte:fragment slot="header">
		<hr>
		<h3>Tracks</h3>
	</svelte:fragment>
</AudiusUserTracksLoader>

<AudiusUserFavoritesLoader userId={$audiusUserId}>
	<svelte:fragment slot="header">
		<hr>
		<h3>Favorites</h3>
	</svelte:fragment>
</AudiusUserFavoritesLoader> -->

<div class="card">
	<h3>Tracks</h3>
	<AudiusUserTracksLoader userId={$audiusUserId} />
</div>

<div class="card">
	<h3>Favorites</h3>
	<AudiusUserFavoritesLoader userId={$audiusUserId} />
</div>
