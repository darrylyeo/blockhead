<script lang="ts">
	// Constants/types
	import type { AccountConnection } from '../../../state/account'


	// Params
	import { accountId } from '../_appsParams'


	// Computed
	$: if(selectedAccountConnection?.state?.account?.address) $accountId = selectedAccountConnection.state.account.address
	$: currentAccountId = $accountId


	// Internal state
	let selectedAccountConnection: AccountConnection


	// Components
	import AddressField from '../../../components/AddressField.svelte'
	import ConnectedAccountSelect from '../../../components/ConnectedAccountSelect.svelte'


	// Transitions
	import { fly } from 'svelte/transition'
</script>


<style>
	.accountId-form {
		display: grid;
		grid-template-columns: 3fr auto 1fr auto;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<form class="accountId-form row" on:submit|preventDefault={() => $accountId = currentAccountId}>
		<AddressField bind:address={currentAccountId} placeholder="EVM Address (0xabcd...6789) / ENS Domain (vitalik.eth) / Lens Handle (stani.lens)" />

		<span>or</span>

		<label class="row inline">
			<ConnectedAccountSelect address={$accountId} bind:selectedAccountConnection />
		</label>

		<button type="submit">Go</button>
	</form>

	<slot />
</section>
