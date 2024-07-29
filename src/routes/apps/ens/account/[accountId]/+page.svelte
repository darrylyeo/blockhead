<script lang="ts">
	import { ethereumMainnet } from '$/data/networks'


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
	<EnsSearchLoader network={ethereumMainnet} searchQuery={ensName} />
</AccountIdResolver>
