<script lang="ts">
	// Params
	import { appsParams } from '../../../_appsParams.svelte'


	// Components
	import AudiusTrackLoader from '$/components/AudiusTrackLoader.svelte'
</script>


<AudiusTrackLoader trackId={appsParams.audiusTrackId} />
