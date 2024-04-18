<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'
	import type { AccountConnection, AccountConnectionSelector } from '$/state/account'
	import { KnownWalletType, displayedKnownWallets } from '$/data/wallets'


	// Context
	import { accountConnections } from '$/state/account'
	import { eip6963Providers } from '$/state/wallets'


	// External state
	export let required = false


	// Shared state
	export let address: Ethereum.Address | undefined
	export let selectedAccountConnection: AccountConnection | undefined


	// Computed
	$: if(address) selectedAccountConnection = $accountConnections.find(accountConnection => accountConnection.state?.account?.address?.toLowerCase() === address?.toLowerCase()) || selectedAccountConnection
	// $: address = selectedAccount?.address

	$: selectedAccountConnection ||= undefined


	// Functions
	import { formatAddress } from '$/utils/formatAddress'


	// Actions
	import type { FormEventHandler } from 'svelte/elements'

	import { onEvent } from '$/events/onEvent'

	const onInput: FormEventHandler<HTMLSelectElement> = e => {
		const selectedOption = e.currentTarget.selectedOptions[0]

		if(selectedOption?.value === 'blockhead_addAccountConnection'){
			e.preventDefault()

			const {
				knownWalletType,
				eip6963Rdns,
			} = selectedOption.dataset

			const selector: AccountConnectionSelector = {
				...(knownWalletType && {
					knownWallet: {
						type: knownWalletType as KnownWalletType,
					},
				}),
				...(eip6963Rdns && {
					eip6963: {
						rdns: eip6963Rdns,
					},
				}),
			}

			globalThis.dispatchEvent(new CustomEvent('blockhead_addAccountConnection', { detail: { selector }, bubbles: true }))

			// TODO: pass the actual accountConnection via event data
			onEvent(
				'Portfolio/AddAccount',
				() => {
					selectedAccountConnection = $accountConnections
						.find(accountConnection => (
							accountConnection.selector.knownWallet?.type === knownWalletType
							|| accountConnection.selector.eip6963?.rdns === eip6963Rdns
						))
				},
				{ once: true }
			)
		}
	}
</script>


<select
	class="connected-account-select"
	bind:value={selectedAccountConnection}
	{required}
	on:input={onInput}
>
	{#if $accountConnections.length}
		<option value={undefined} selected disabled>Choose account...</option>

		<!-- <optgroup label="Connected"> -->
			{#each $accountConnections as accountConnection}
				{@const name = (
					accountConnection.selector.knownWallet ?
						knownWalletsByType[accountConnection.selector.knownWallet.type].name
					: accountConnection.selector.eip6963 ?
						findEip6963Provider({
							eip6963Providers: $eip6963Providers,
							rdns: accountConnection.selector.eip6963.rdns,
						})
							?.info.name
					:
						''
				)}
				<option value={accountConnection}>
					{name}: {formatAddress(accountConnection.state?.account?.address)}
				</option>
			{/each}
		<!-- </optgroup> -->

		<optgroup label="+ Connect Wallet">
			{#each Object.values($eip6963Providers) as eip6963Provider}
				<option
					value="blockhead_addAccountConnection"
					data-eip6963-rdns={eip6963Provider.info.rdns}
				>
					{eip6963Provider.info.name}
				</option>
			{/each}

			{#each displayedKnownWallets as knownWallet}
				<option
					value="blockhead_addAccountConnection"
					data-known-wallet-type={knownWallet.type}
				>
					{knownWallet.name}
				</option>
			{/each}
		</optgroup>
	{:else}
		<option value={undefined} selected disabled>Connect Wallet...</option>

		{#each displayedKnownWallets as knownWallet}
			<option
				value="blockhead_addAccountConnection"
				data-known-wallet-type={knownWallet.type}
			>
				{knownWallet.name}
			</option>
		{/each}
	{/if}
</select>
