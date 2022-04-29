<script lang="ts">
	export let userId: string


	import type { Audius } from '../data/audius/audius'
	import { getUserTracks } from '../data/audius/audius'


	import AudiusTrack from './AudiusTrack.svelte'
	import Loader from './Loader.svelte'
</script>


{#if userId}
	<Loader
		loadingIcon={'/logos/audius-icon.png'}
		loadingMessage="Fetching tracks from Audius network..."
		fromPromise={() => getUserTracks({userId}).then(({data: tracks}) => tracks)}
		let:result={tracks}
		showIf={tracks => tracks.length}
	>
		<slot slot="header" name="header" />

		{#each tracks as track}
			<AudiusTrack {track} />
		{/each}
	</Loader>
{/if}