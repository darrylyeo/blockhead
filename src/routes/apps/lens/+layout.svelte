<script lang="ts">
	// Constants/types
	import type { AccountConnection } from '$/state/account'
	import type { Ethereum } from '$/data/networks/types'


	// Params
	import { accountId } from '../_appsParams'


	// Context
	import { web3AppConfig } from '../_appsContext'


	// Internal state
	let selectedAccountConnection: AccountConnection
	let selectedLoginAddress: Ethereum.Address = $accountId
	let selectedLoginAccountConnection: AccountConnection


	// Computed
	$: if(selectedAccountConnection?.state?.account?.address) $accountId = selectedAccountConnection.state.account.address
	$: currentAccountId = $accountId


	// Components
	import AddressField from '$/components/AddressField.svelte'
	import ConnectedAccountSelect from '$/components/ConnectedAccountSelect.svelte'
	import LensAuthenticationLoader from '$/components/LensAuthenticationLoader.svelte'


	// Transitions
	import { fly } from 'svelte/transition'
	import { cardStyle } from '$/utils/card-background'
</script>


<style>
	.accountId-form {
		display: grid;
		grid-template-columns: 3fr auto 1fr auto;
	}

	.layout {
		display: grid;
		grid-template:
			'Main Aside'
			/ 1fr 19.25rem;
		gap: 1rem;
		align-items: start;
	}

	@media (max-width: 55rem) {
		.layout {
			grid-template:
				'Aside'
				'Main'
				/ minmax(0, 1fr);
		}
	}

	aside {
		grid-area: Aside;
	}

	.layout > :global(:nth-child(2)) {
		grid-area: Main;
	}

	.layout :global(.connected-account-select) {
		max-width: 7.5rem;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	<form class="accountId-form row" on:submit|preventDefault={() => $accountId = currentAccountId}>
		<AddressField bind:address={currentAccountId} placeholder="Lens Handle (stani.lens) / ENS Domain (vitalik.eth) / EVM Address (0xabcd...6789)" />

		<span>or</span>

		<label class="row inline">
			<ConnectedAccountSelect address={$accountId} bind:selectedAccountConnection />
		</label>

		<button type="submit">Go</button>
	</form>

	<div class="layout">
		<aside class="card column" style={$web3AppConfig?.colors && cardStyle([...$web3AppConfig.colors].reverse())}>
			<LensAuthenticationLoader
				accountConnection={selectedLoginAccountConnection}
				let:accessToken
				let:refreshToken
			>
				<svelte:fragment slot="title">
					<h4>Sign in with Lens</h4>
				</svelte:fragment>
	
				<svelte:fragment slot="toolbar">
					<ConnectedAccountSelect address={selectedLoginAddress} bind:selectedAccountConnection={selectedLoginAccountConnection} required />
				</svelte:fragment>
	
				{#if accessToken}
					<h3>You're signed in.</h3>
				{/if}
			</LensAuthenticationLoader>
		</aside>

		<slot />
	</div>
</section>
