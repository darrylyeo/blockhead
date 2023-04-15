<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import type { AccountConnectionState } from '../state/account'


	// External state
	export let required = false


	// Functions
	import { formatAddress } from '../utils/formatAddress'
	import { accountConnections } from '../state/account'


	// Shared state
	export let address: Ethereum.Address | undefined
	export let selectedAccount: AccountConnectionState | undefined


	// Computed
	$: selectedAccount = address && $accountConnections.find(accountConnection => accountConnection.state?.address?.toLowerCase() === address?.toLowerCase())?.state || undefined
	// $: address = selectedAccount?.address
</script>


<select
	class="connected-account-select"
	bind:value={selectedAccount}
	{required}
>
	<option value="" selected disabled>Choose account...</option>

	<!-- <optgroup label="Connected"> -->
		{#each $accountConnections as accountConnection}
			<option value={accountConnection.state}>{accountConnection.walletType}: {formatAddress(accountConnection.state?.address)}</option>
		{/each}
	<!-- </optgroup> -->
</select>
