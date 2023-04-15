<script lang="ts">
	// Constants/types
	import { type LensProfile, LensInstance } from '../../../../../api/lens'


	// Params
	import { accountId } from '../../../_appsParams'


	// Internal state
	let profiles: LensProfile[]
	let instance = LensInstance.Polygon


	// Components
	import LensProfiles from '../../../../../components/LensProfiles.svelte'
	import AccountIdResolver from '../../../../../components/AccountIdResolver.svelte';
</script>


<AccountIdResolver
	accountId={$accountId || undefined}
	let:address
	let:lensName
>
	{#if address || lensName}
		<LensProfiles {instance} {address} {lensName} bind:profiles />
	{/if}
</AccountIdResolver>
