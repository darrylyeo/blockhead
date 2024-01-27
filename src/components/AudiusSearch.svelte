<script lang="ts">
	export let query: string


	import type { Audius } from '$/api/audius'
	import { searchUsers, searchTracks, searchPlaylists } from '$/api/audius'

	let users: Audius.User[]
	let tracks: Audius.Track[]
	let playlists: Audius.Playlist[]

	const searchAudius = query => {
		return Promise.race([
			searchUsers({query}).then(({data}) => users = data),
			searchTracks({query}).then(({data}) => tracks = data),
			searchPlaylists({query}).then(({data}) => playlists = data)
		])
	}
	// const searchAudius = async query => {
	// 	({data: users} = await searchUsers({query}))
	// 	({data: tracks} = await searchTracks({query}))
	// 	({data: playlists} = await searchPlaylists({query}))
	// }


	import AudiusUser from './AudiusUser.svelte'
	import AudiusTrack from './AudiusTrack.svelte'
	import AudiusPlaylist from './AudiusPlaylist.svelte'
	import Loader from '$/components/Loader.svelte'


	import { AudiusIcon } from '$/assets/icons'
</script>


<style>
	.audius-search {
		gap: 1.5rem;
	}

	.grid {
		display: grid;
		gap: var(--padding-inner);
		grid-template-columns: repeat(auto-fill, minmax(min(30rem, 100%), 1fr));
	}

	.scrollable-list {
		--resizeVertical-defaultHeight: 40rem;
	}
</style>


<Loader
	loadingIcon={AudiusIcon}
	loadingMessage="Searching Audius for tracks, artists, and playlists..."
	fromPromise={query && (() => searchAudius(query))}
>
	<div class="audius-search column">
		{#if tracks?.length}
			<h2>Tracks</h2>
			<div class="audius-tracks column" class:scrollable-list={tracks.length > 6}>
				{#each tracks as track}
					<AudiusTrack {track} />
				{/each}
			</div>
		{/if}

		{#if users?.length}
			{#if tracks?.length}<hr>{/if}

			<h2>Users</h2>
			<div class="audius-users grid" class:scrollable-list={users.length > 12}>
				{#each users as user}
					<AudiusUser {user} layout="summary" />
				{/each}
			</div>
		{/if}

		{#if playlists?.length}
			{#if tracks?.length || users?.length}<hr>{/if}

			<h2>Playlists</h2>
			<div class="audius-playlist column" class:scrollable-list={playlists.length > 6}>
				{#each playlists as playlist}
					<AudiusPlaylist {playlist} />
				{/each}
			</div>
		{/if}
	</div>
</Loader>