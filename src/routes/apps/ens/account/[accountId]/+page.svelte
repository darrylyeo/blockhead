<script lang="ts">
	import { networksByChainID } from '$/data/networks'


	import { page } from '$app/stores'

	$: accountId = $page.params.accountId


	import AccountIdResolver from '$/components/AccountIdResolver.svelte'
	import EnsSearchLoader from '$/components/EnsSearchLoader.svelte'
</script>


<AccountIdResolver
	{accountId}
	passiveResolveToAddress
	let:ensName
>
	<EnsSearchLoader network={networksByChainID[1]} searchQuery={ensName} />
</AccountIdResolver>
