<script lang="ts">
	// Params
	import { audiusTrackId } from '../../../_appsParams'


	// Components
	import AudiusTrackLoader from '../../../../../components/AudiusTrackLoader.svelte'
</script>


<AudiusTrackLoader trackId={$audiusTrackId} />
