<script lang="ts">
	import { formatAddress } from '../utils/formatAddress'
	import { connectedAccounts, type ConnectedAccount } from '../state/account'


	export let required: boolean


	export let selectedAccount: ConnectedAccount
</script>


<select class="connected-account-select" bind:value={selectedAccount} {required}>
	<option value="" disabled>Choose account...</option>

	<!-- <optgroup label="Connected"> -->
		{#each $connectedAccounts as connectedAccount}
			<option value={connectedAccount}>{connectedAccount.walletConnection.walletType}: {formatAddress(connectedAccount.address)}</option>
		{/each}
	<!-- </optgroup> -->
</select>
