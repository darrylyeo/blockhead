<script lang="ts">
	import { formatAddress } from '../utils/formatAddress'
	import { accountConnections, type AccountConnectionState } from '../state/account'


	export let required: boolean


	export let selectedAccount: AccountConnectionState
</script>


<select class="connected-account-select" bind:value={selectedAccount} {required}>
	<option value="" disabled>Choose account...</option>

	<!-- <optgroup label="Connected"> -->
		{#each $accountConnections as accountConnection}
			<option value={accountConnection.state}>{accountConnection.walletType}: {formatAddress(accountConnection.state?.address)}</option>
		{/each}
	<!-- </optgroup> -->
</select>
