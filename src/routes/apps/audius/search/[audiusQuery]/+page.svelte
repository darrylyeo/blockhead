<script lang="ts">
	// Params
	import { audiusQuery } from '../../../_appsParams'


	// Components
	import AudiusSearch from '../../../../../components/AudiusSearch.svelte'
</script>


<AudiusSearch query={$audiusQuery} />
