<script lang="ts">
	import { AudiusIcon } from '$/assets/icons'

	export let userId: string


	import type { Audius } from '$/api/audius'
	import { getUserTracks } from '$/api/audius'


	import AudiusTrack from './AudiusTrack.svelte'
	import Loader from './Loader.svelte'
</script>


{#if userId}
	<Loader
		loadingIcon={AudiusIcon}
		loadingMessage="Fetching tracks from Audius network..."
		fromPromise={() => getUserTracks({userId}).then(({data: tracks}) => tracks)}
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