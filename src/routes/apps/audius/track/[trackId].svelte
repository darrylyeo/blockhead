<script lang="ts">
	import { page } from '$app/stores'

	$: ({trackId} = $page.params)


	import AudiusTrackLoader from '../../../../components/AudiusTrackLoader.svelte'
</script>


{#if trackId}
	<AudiusTrackLoader {trackId} />
{/if}