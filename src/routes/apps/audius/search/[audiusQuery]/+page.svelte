<script lang="ts">
	// Params
	import { appsParams } from '../../../_appsParams.svelte'


	// Components
	import AudiusSearch from '$/components/AudiusSearch.svelte'
</script>


<AudiusSearch query={appsParams.audiusQuery} />
