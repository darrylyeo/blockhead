<script lang="ts">
	import { networksByChainID } from '../../../data/ethereum/networks'


    import { page } from '$app/stores'

	$: query = $page.params.query


    import EnsSearchLoader from '../../../components/EnsSearchLoader.svelte'
</script>


<EnsSearchLoader network={networksByChainID[1]} searchQuery={query} />