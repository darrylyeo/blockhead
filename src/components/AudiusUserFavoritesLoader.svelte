<script lang="ts">
	export let userId: string


	import type { Audius } from '../data/audius/audius'
	import { getUserFavorites } from '../data/audius/audius'


	import AudiusTrackLoader from './AudiusTrackLoader.svelte'
	import AudiusPlaylistLoader from './AudiusPlaylistLoader.svelte'
	import Loader from './Loader.svelte'
</script>


{#if userId}
	<Loader
		loadingIcon={'/logos/Audius.png'}
		loadingMessage="Fetching user favorites from Audius network..."
		fromPromise={() => getUserFavorites({userId}).then(({data: favorites}) => favorites)}
		let:result={favorites}
		showIf={favorites => favorites.length}
	>
		<slot slot="header" name="header" />

		{#each favorites as {favorite_item_id, favorite_type}}
			{#if favorite_type === 'SaveType.track'}
				<AudiusTrackLoader trackId={favorite_item_id} />
			{:else if favorite_type === 'SaveType.playlist'}
				<AudiusPlaylistLoader playlistId={favorite_item_id} />
			{/if}
		{/each}
	</Loader>
{/if}