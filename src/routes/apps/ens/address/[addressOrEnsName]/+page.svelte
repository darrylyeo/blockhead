<script lang="ts">
	import { networksByChainID } from '../../../../../data/ethereum/networks'


	import { page } from '$app/stores'

	$: addressOrEnsName = $page.params.addressOrEnsName


	import EnsResolutionLoader from '../../../../../components/EnsResolutionLoader.svelte'
	import EnsSearchLoader from '../../../../../components/EnsSearchLoader.svelte'
</script>


<EnsResolutionLoader
	{addressOrEnsName}
	passiveForwardResolution
	let:ensName
>
	<EnsSearchLoader network={networksByChainID[1]} searchQuery={ensName} />
</EnsResolutionLoader>
