<script lang="ts">
	// Constants/types
	import type { AccountConnectionState } from '../../../state/account'


	// Params
	import { accountId, audiusQuery } from '../_appsParams'


	// Context
	import { web3AppConfig, currentView } from '../_appsContext'
	import { preferences } from '../../../state/preferences'


	// Internal state
	let selectedAccount: AccountConnectionState

	let tokenBalanceFormat
	let showUnderlyingAssets


	// Computed
	$: if(selectedAccount?.address) $accountId = selectedAccount.address
	$: currentAccountId = $accountId
	$: currentQuery = $audiusQuery


	// Components
	import AccountIdResolver from '../../../components/AccountIdResolver.svelte'
	import AddressField from '../../../components/AddressField.svelte'
	import ConnectedAccountSelect from '../../../components/ConnectedAccountSelect.svelte'
	import Web3AppDashboard from '../../../components/Web3AppDashboard.svelte'


	// Transitions
	import { fly } from 'svelte/transition'
</script>


<head>
	<title>{$accountId ? `${$accountId} | ` : ''}{`${$web3AppConfig?.name} ${$currentView}`} | Blockhead</title>
</head>


<style>
	.audiusQuery-form {
		display: grid;
		grid-template-columns: 1fr auto;
	}

	.accountId-form {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto 1fr auto;
	}
</style>


<section class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
	{#if $currentView === 'Dashboard'}
		<div class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
			<hr>

			<h2>Explore</h2>
		</div>
	{/if}

	{#if $currentView === 'Dashboard' || $currentView === 'Explorer'}
		<form class="audiusQuery-form" on:submit|preventDefault={() => $audiusQuery = currentQuery}>
			<input type="search" bind:value={currentQuery} placeholder="Search Audius tracks, artists, and playlists..." />
			<button>Search</button>
		</form>
	{/if}

	<div class="column">
		{#if $currentView === 'Explorer'}
			<div class="column" in:fly={{x: 100}} out:fly={{x: -100}}>
				<hr>

				<slot />
			</div>
		{/if}
		{#if $currentView === 'Dashboard'}
			<hr>

			<h2>Dashboard</h2>
		{/if}

		{#if $currentView === 'Dashboard' || $currentView === 'Account'}
			<form class="accountId-form row" on:submit|preventDefault={() => $accountId = currentAccountId}>
				<label class="row inline">
					<ConnectedAccountSelect address={$accountId} bind:selectedAccount />
				</label>
		
				<span>or</span>
		
				<AddressField bind:address={currentAccountId} placeholder="EVM Address (0xabcd...6789) / ENS Domain (vitalik.eth) / Lens Handle (stani.lens)" />
				
				<button type="submit">Go</button>
			</form>

			<AccountIdResolver
				accountId={$accountId}
				passiveResolveToAddress
				passiveReverseResolution
				let:address
			>
				<Web3AppDashboard
					{address}
					web3AppConfig={$web3AppConfig}
					providerName={$preferences.rpcNetwork}
					defiProvider={$preferences.defiProvider}
					quoteCurrency={$preferences.quoteCurrency}
					{tokenBalanceFormat}
					{showUnderlyingAssets}
				/>
			</AccountIdResolver>
		{/if}
	</div>
</section>