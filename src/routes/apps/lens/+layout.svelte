<script lang="ts">
	// Constants/types
	import type { AccountConnectionState } from '../../../state/account'
	import type { Ethereum } from '../../../data/networks/types'


	// Params
	import { accountId } from '../_appsParams'


	// Context
	import { web3AppConfig } from '../_appsContext'


	// Internal state
	let selectedAccount: AccountConnectionState
	let selectedLoginAddress: Ethereum.Address = $accountId
	let selectedLoginAccount: AccountConnectionState


	// Computed
	$: if(selectedAccount?.address) $accountId = selectedAccount.address
	$: currentAccountId = $accountId


	// Components
	import AddressField from '../../../components/AddressField.svelte'
	import ConnectedAccountSelect from '../../../components/ConnectedAccountSelect.svelte'
	import LensAuthenticationLoader from '../../../components/LensAuthenticationLoader.svelte'


	// Transitions
	import { fly } from 'svelte/transition'
	import { cardStyle } from '../../../utils/card-background'
</script>


<style>
	.accountId-form {
		display: grid;
		grid-template-columns: 3fr auto 1fr auto;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<form class="accountId-form row" on:submit|preventDefault={() => $accountId = currentAccountId}>
		<AddressField bind:address={currentAccountId} placeholder="Lens Handle (stani.lens) / ENS Domain (vitalik.eth) / EVM Address (0xabcd...6789)" />

		<span>or</span>

		<label class="row inline">
			<ConnectedAccountSelect address={$accountId} bind:selectedAccount />
		</label>

		<button type="submit">Go</button>
	</form>

	<section class="card column" style={$web3AppConfig?.colors && cardStyle([...$web3AppConfig.colors].reverse())}>
		<LensAuthenticationLoader
			accountConnection={selectedLoginAccount}
			let:accessToken
			let:refreshToken
		>
			<svelte:fragment slot="title">
				<h3>Sign in with Lens</h3>
			</svelte:fragment>

			<svelte:fragment slot="toolbar">
				<ConnectedAccountSelect address={selectedLoginAddress} bind:selectedAccount={selectedLoginAccount} required />
			</svelte:fragment>

			{#if accessToken}
				<h3>You're signed in.</h3>
			{/if}
		</LensAuthenticationLoader>
	</section>

	<slot />
</section>
