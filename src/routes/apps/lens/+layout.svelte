<script lang="ts">
	// Constants/types
	import type { AccountConnectionState } from '../../../state/account'


	// Params
	import { accountId } from '../_appsParams'


	// Context
	import { web3AppConfig } from '../_appsContext'


	// Internal state
	let selectedAccount: AccountConnectionState


	// Computed
	$: if(selectedAccount?.address) $accountId = selectedAccount.address
	$: currentAccountId = $accountId


	// Components
	import AddressField from '../../../components/AddressField.svelte'
	import ConnectedAccountSelect from '../../../components/ConnectedAccountSelect.svelte'
	import LensLogin from '../../../components/LensLogin.svelte'


	// Transitions
	import { fly } from 'svelte/transition'
	import { cardStyle } from '../../../utils/card-background'
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

	<section class="card column" style={$web3AppConfig?.colors && cardStyle([...$web3AppConfig.colors].reverse())}>
		<h3>Sign in with Lens</h3>
	</section>

	<slot />
</section>
