<script lang="ts">
	import { page } from '$app/stores'

	$: ({userId} = $page.params)


	import AudiusUserLoader from '../../../../components/AudiusUserLoader.svelte'
	import AudiusUserTracksLoader from '../../../../components/AudiusUserTracksLoader.svelte'
	import AudiusUserFavoritesLoader from '../../../../components/AudiusUserFavoritesLoader.svelte'
</script>


{#if userId}
	<AudiusUserLoader {userId} />

	<!-- <AudiusUserTracksLoader {userId}>
		<svelte:fragment slot="header">
			<hr>
			<h3>Tracks</h3>
		</svelte:fragment>
	</AudiusUserTracksLoader>

	<AudiusUserFavoritesLoader {userId}>
		<svelte:fragment slot="header">
			<hr>
			<h3>Favorites</h3>
		</svelte:fragment>
	</AudiusUserFavoritesLoader> -->

	<div class="card">
		<h3>Tracks</h3>
		<AudiusUserTracksLoader {userId} />
	</div>

	<div class="card">
		<h3>Favorites</h3>
		<AudiusUserFavoritesLoader {userId} />
	</div>
{/if}