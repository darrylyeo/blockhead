<script lang="ts">
	export let userId: string


	import { createQuery } from '@tanstack/svelte-query'


	import AudiusTrack from './AudiusTrack.svelte'
	import Loader from './Loader.svelte'

	import { AudiusIcon } from '$/assets/icons'
</script>


{#if userId}
	<Loader
		loadingIcon={AudiusIcon}
		loadingMessage="Fetching tracks from Audius network..."
		fromQuery={createQuery({
			queryKey: ['AudiusUserTracks', {
				userId,
			}],
			queryFn: async ({
				queryKey: [_, {
					userId,
				}]
			}) => {
				const { getUserTracks } = await import('$/api/audius')

				return await getUserTracks({
					userId,
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