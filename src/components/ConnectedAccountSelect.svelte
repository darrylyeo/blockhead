<script lang="ts">
	// Constants/types
	import type { Ethereum } from '../data/networks/types'
	import type { AccountConnectionState } from '../state/account'
	import { wallets } from '../data/wallets'


	// Context
	import { accountConnections } from '../state/account'


	// External state
	export let required = false


	// Shared state
	export let address: Ethereum.Address | undefined
	export let selectedAccount: AccountConnectionState | undefined


	// Computed
	$: if(address) selectedAccount = $accountConnections.find(accountConnection => accountConnection.state?.address?.toLowerCase() === address?.toLowerCase())?.state || selectedAccount
	// $: address = selectedAccount?.address


	// Functions
	import { formatAddress } from '../utils/formatAddress'
	import { onEvent } from '../events/onEvent'
</script>


<select
	class="connected-account-select"
	bind:value={selectedAccount}
	{required}
	on:input={e => {
		const selectedOption = e.target.selectedOptions[0]

		if(selectedOption?.value === 'blockhead_addAccountConnection'){
			e.preventDefault()

			const { walletType } = selectedOption.dataset

			globalThis.dispatchEvent(new CustomEvent('blockhead_addAccountConnection', { detail: { walletType }, bubbles: true }))

			// TODO: pass the actual accountConnection via event data
			onEvent(
				'Portfolio/AddAccount',
				data => {
					selectedAccount = $accountConnections.find(accountConnection => accountConnection.walletType === walletType)
				},
				{ once: true }
			)
		}
	}}
>
	{#if $accountConnections.length}
		<option value={undefined} selected disabled>Choose account...</option>

		<!-- <optgroup label="Connected"> -->
			{#each $accountConnections as accountConnection}
				<option value={accountConnection.state}>{accountConnection.walletType}: {formatAddress(accountConnection.state?.address)}</option>
			{/each}
		<!-- </optgroup> -->

		<optgroup label="+ Connect Wallet">
			{#each wallets as {type, name, icon, colors}}
				<option value="blockhead_addAccountConnection" data-wallet-type={type}>{name}</option>
			{/each}
		</optgroup>
	{:else}
		<option value={undefined} selected disabled>Connect Wallet...</option>

		{#each wallets as {type, name, icon, colors}}
			<option value="blockhead_addAccountConnection" data-wallet-type={type}>{name}</option>
		{/each}
	{/if}
</select>
