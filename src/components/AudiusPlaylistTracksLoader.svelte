<script lang="ts">
	export let playlistId: string


	import { createQuery } from '@tanstack/svelte-query'


	import AudiusTrack from './AudiusTrack.svelte'
	import Loader from './Loader.svelte'


	import { AudiusIcon } from '$/assets/icons'
</script>


{#if playlistId}
	<Loader
		loadingIcon={AudiusIcon}
		loadingMessage="Fetching tracks from Audius network..."
		fromQuery={createQuery({
			queryKey: ['AudiusPlaylistTracks', {
				playlistId,
			}],
			queryFn: async ({
				queryKey: [_, {
					playlistId,
				}]
			}) => {
				const { getPlaylistTracks } = await import('$/api/audius')

				return await getPlaylistTracks({
					playlistId,
				})
			},
			select: result => result.data,
		})}
		let:result={tracks}
		viewOptions={{
			showIf: tracks => tracks.length,
		}}
	>
		<slot slot="header" name="header" />

		{#each tracks as track}
			<AudiusTrack {track} />
		{/each}
	</Loader>
{/if}
