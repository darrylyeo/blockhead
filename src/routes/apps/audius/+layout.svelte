<script lang="ts">
	// Constants/types
	import type { AccountConnection } from '$/state/account'


	// Params
	import { appsParams } from '../_appsParams.svelte'


	// Context
	import { appsContext } from '../_appsContext.svelte'

	import { preferences } from '$/state/preferences'


	// Internal state
	let selectedAccountConnection: AccountConnection

	let tokenBalanceFormat
	let showUnderlyingAssets


	// Computed
	$: if(selectedAccountConnection?.state?.account?.address) appsParams.accountId = selectedAccountConnection.state.account.address
	$: currentAccountId = appsParams.accountId
	$: currentQuery = appsParams.audiusQuery


	// Components
	import AccountIdResolver from '$/components/AccountIdResolver.svelte'
	import AddressField from '$/components/AddressField.svelte'
	import ConnectedAccountSelect from '$/components/ConnectedAccountSelect.svelte'
	import Web3AppDashboard from '$/components/Web3AppDashboard.svelte'


	// Transitions
	import { fly } from 'svelte/transition'
</script>


<style>
	.audiusQuery-form {
		display: grid;
		grid-template-columns: 1fr auto;
	}

	.accountId-form {
		display: grid;
		grid-template-columns: 3fr auto 1fr auto;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	{#if appsContext.currentView === 'Dashboard'}
		<div class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
			<hr>

			<h2>Explore</h2>
		</div>
	{/if}

	{#if appsContext.currentView === 'Dashboard' || appsContext.currentView === 'Explorer'}
		<form class="audiusQuery-form" on:submit|preventDefault={() => appsParams.audiusQuery = currentQuery}>
			<input type="search" bind:value={currentQuery} placeholder="Search Audius tracks, artists, and playlists..." />
			<button>Search</button>
		</form>
	{/if}

	<div class="column">
		{#if appsContext.currentView === 'Explorer'}
			<div class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
				<hr>

				<slot />
			</div>
		{/if}
		{#if appsContext.currentView === 'Dashboard'}
			<hr>

			<h2>Dashboard</h2>
		{/if}

		{#if appsContext.currentView === 'Dashboard' || appsContext.currentView === 'Account'}
			<form class="accountId-form row" on:submit|preventDefault={() => appsParams.accountId = currentAccountId}>
				<AddressField bind:address={currentAccountId} placeholder="EVM Address (0xabcd...6789) / ENS Domain (vitalik.eth) / Lens Handle (stani.lens)" />
		
				<span>or</span>

				<label class="row inline">
					<ConnectedAccountSelect address={appsParams.accountId} bind:selectedAccountConnection />
				</label>

				<button type="submit">Go</button>
			</form>

			<AccountIdResolver
				accountId={appsParams.accountId}
				passiveResolveToAddress
				passiveResolveToName
				let:address
			>
				<Web3AppDashboard
					{address}
					web3AppConfig={appsContext.web3AppConfig}
					networkProvider={$preferences.rpcNetwork}
					defiProvider={$preferences.defiProvider}
					quoteCurrency={$preferences.quoteCurrency}
					{tokenBalanceFormat}
					{showUnderlyingAssets}
				/>
			</AccountIdResolver>
		{/if}
	</div>
</section>