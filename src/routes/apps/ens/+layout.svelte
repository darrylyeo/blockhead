<script lang="ts">
	// Constants/types
	import type { AccountConnectionState } from '../../../state/account'


	// Params
	import { accountId } from '../_appsParams'


	// Computed
	$: if(selectedAccount?.address) $accountId = selectedAccount.address
	$: currentAccountId = $accountId


	// Internal state
	let selectedAccount: AccountConnectionState


	// Components
	import AddressField from '../../../components/AddressField.svelte'
	import ConnectedAccountSelect from '../../../components/ConnectedAccountSelect.svelte'


	// Transitions
	import { fly } from 'svelte/transition'
</script>


<style>
	.accountId-form {
		display: grid;
		grid-template-columns: auto auto 1fr auto;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<form class="accountId-form row" on:submit|preventDefault={() => $accountId = currentAccountId}>
		<label class="row inline">
			<ConnectedAccountSelect address={$accountId} bind:selectedAccount />
		</label>

		<span>or</span>

		<AddressField bind:address={currentAccountId} placeholder="EVM Address (0xabcd...6789) / ENS Domain (vitalik.eth) / Lens Handle (stani.lens)" />

		<button type="submit">Go</button>
	</form>

	<slot />
</section>
