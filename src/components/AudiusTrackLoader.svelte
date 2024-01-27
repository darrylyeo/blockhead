<script lang="ts">
	export let trackId: string


	import { getTrack } from '$/api/audius'


	import AudiusTrack from './AudiusTrack.svelte'
	import Loader from './Loader.svelte'


	import { AudiusIcon } from '$/assets/icons'
</script>


{#if trackId}
	<Loader
		loadingIcon={AudiusIcon}
		loadingMessage="Fetching track from Audius network..."
		fromPromise={() => getTrack({trackId}).then(({data: track}) => track)}
		let:result={track}
	>
		<AudiusTrack {track} />
	</Loader>
{/if}