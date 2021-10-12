<script lang="ts">
	import { page } from '$app/stores'


	const { query } = $page.params


	import AudiusSearch from '../../../../components/AudiusSearch.svelte'
</script>


<AudiusSearch {query} />