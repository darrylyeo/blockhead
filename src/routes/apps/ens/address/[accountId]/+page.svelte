<script lang="ts">
	import { networksByChainID } from '../../../../../data/networks'


	import { page } from '$app/stores'

	$: accountId = $page.params.accountId


	import EnsResolutionLoader from '../../../../../components/EnsResolutionLoader.svelte'
	import EnsSearchLoader from '../../../../../components/EnsSearchLoader.svelte'
</script>


<EnsResolutionLoader
	{accountId}
	passiveForwardResolution
	let:ensName
>
	<EnsSearchLoader network={networksByChainID[1]} searchQuery={ensName} />
</EnsResolutionLoader>
