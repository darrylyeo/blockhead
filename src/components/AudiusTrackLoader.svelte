<script lang="ts">
	export let trackId: string


	import { getTrack } from '../data/audius/audius'


	import AudiusTrack from './AudiusTrack.svelte'
	import Loader from './Loader.svelte'
</script>


{#if trackId}
	<Loader
		loadingIcon={'/logos/audius-icon.png'}
		loadingMessage="Fetching track from Audius network..."
		fromPromise={() => getTrack({trackId}).then(({data: track}) => track)}
		let:result={track}
	>
		<AudiusTrack {track} />
	</Loader>
{/if}