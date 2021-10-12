<script lang="ts">
	import { networksByChainID } from '../../../../data/ethereum/networks'


	import { page } from '$app/stores'

	$: addressOrENSName = $page.params.addressOrENSName


	import EnsResolutionLoader from '../../../../components/EnsResolutionLoader.svelte'
	import EnsSearchLoader from '../../../../components/EnsSearchLoader.svelte'
</script>


<EnsResolutionLoader
	{addressOrENSName}
	passiveForwardResolution
	let:ensName
>
	<EnsSearchLoader network={networksByChainID[1]} searchQuery={ensName} />
</EnsResolutionLoader>