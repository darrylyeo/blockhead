<script lang="ts">
	import type { CryptoAddress } from '../data/CryptoAddress'
	// import type { CryptoPosition } from '../data/CryptoPosition'
	import type { Ethereum } from '../data/ethereum/types'
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import type { QuoteCurrency } from '../data/currency/currency'


	// Portfolio management

	export let name = 'Your Portfolio'
	export let editable = false
	export let accounts: CryptoAddress[]

	let newWalletAddress = ''

	let isEditing = false
	const toggleEdit = () => isEditing = !isEditing

	let isAddingWallet = false
	const showAddWallet = () => isAddingWallet = true

	function isValid(address){
		return address !== ''
	}

	function addWallet(newWalletAddress){
		if(!isValid(newWalletAddress))
			return

		if(accounts.includes(newWalletAddress))
			return

		const newAccount = newWalletAddress
		accounts = [...accounts, newAccount] // accounts.push(newAccount)

		isAddingWallet = false
		newWalletAddress = ''
	}

	function deleteWallet(i){
		delayStartIndex = i
		accounts = [...accounts.slice(0, i), ...accounts.slice(i + 1)]
	}

	let showUnderlyingAssets = false


	// Balances view options

	export let provider: Ethereum.Provider
	export let analyticsProvider: AnalyticsProvider
	export let quoteCurrency: QuoteCurrency

	let showValues: 'original' | 'converted' | 'both' = 'original'
	let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending' = 'value-descending'
	let showSmallValues = false


	// Options menu
	let showOptions = true
	const toggleShowOptions = () => showOptions = !showOptions


	let delayStartIndex = 0

	import Address from './Address.svelte'
	import AddressField from './AddressField.svelte'
	import Balance from './Balance.svelte'
	import DefiBalances from './DefiBalances.svelte'
	import EthereumBalances from './EthereumBalances.svelte'
	import Loading from './Loading.svelte'
	import { flip } from 'svelte/animate'
</script>

<style>
	.portfolio {
		display: grid;
		gap: var(--padding-inner);
		grid-template-columns: 100%;
	}

	.edit-controls {
		flex: 0 auto;
	}

	form {
		display: contents;
	}

	form :global(.address-field) {
		width: 16rem;
	}

	.account {
		--padding-inner: 0.75em;
		display: grid;
		gap: var(--padding-inner);
	}

	/* .balances {
		display: flex;
		flex-wrap: wrap;
		gap: var(--padding-inner);
	}
	.balances > :global(*) {
		flex: 0 auto;
	} */
	.account :global(.ethereum-balances) {
		--padding-inner: 0.5em;
	}

	.account :global(.defi-balances) {
		--padding-inner: 0.5em;
		display: grid;
		gap: var(--padding-inner);
		grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
	}

	.options {
		position: sticky;
		/* top: 0; */
		bottom: 0;
		grid-row-end: 4;

		margin: 0 calc(-1 * var(--padding-outer));
		z-index: 1;

		font-size: 0.8em;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
	}
</style>


<div class="bar">
	<h1>{name}</h1>
	{#if editable}
		{#if isAddingWallet}
			<form on:submit|preventDefault={() => addWallet(newWalletAddress)}>
				<AddressField bind:address={newWalletAddress} autofocus required/>
				<button>Add</button>
				<button>Cancel</button>
			</form>
		{:else if isEditing}
			<button on:click={toggleEdit}>Done</button>
		{:else}
			<button on:click={toggleEdit}>Edit</button>
			<button on:click={showAddWallet}>+ Add Wallet</button>
		{/if}
	{/if}
	<!-- <button on:click={toggleShowOptions}>Options</button> -->
	<slot></slot>
</div>
{#if showOptions && accounts.length}
	<div class="card bar options">
		<div class="row">
			<h3>Show</h3>
			<label>
				<select bind:value={showValues}>
					<option value="original">Token Amounts</option>
					<option value="converted">Quote Values</option>
					<option value="both">Amounts and Values</option>
				</select>
			</label>
			<label>
				<input type="checkbox" bind:checked={showSmallValues}>
				<span>Small Values</span>
			</label>
			<label>
				<input type="checkbox" bind:checked={showUnderlyingAssets}>
				<span>Underlying Assets</span>
			</label>
		</div>
		<div class="row">
			<h3>Sort</h3>
			<label>
				<select bind:value={sortBy}>
					<option value="ticker-ascending">Alphabetical</option>
					<option value="value-descending">Highest Value</option>
					<option value="value-ascending">Lowest Value</option>
				</select>
			</label>
		</div>
	</div>
{/if}
<div class="portfolio">
	{#if accounts}
		{#each accounts as address, i (address)}
			<section class="card" animate:flip|local={{duration: 300, delay: Math.abs(delayStartIndex - i) * 50}}>
				<div class="bar">
					<div class="account">
						<h3><Address {address} /></h3>
						{#if analyticsProvider}
							<EthereumBalances {analyticsProvider} conversionCurrency={quoteCurrency} {sortBy} {showSmallValues} {showValues} {address} />
						{/if}
						{#if provider}
							<!-- <div class="balances">
								{#each ['ETH'] as token}
									<div class="card">
										<Balance {provider} {token} {address} />
									</div>
								{/each}
							</div> -->
							<DefiBalances {provider} {address} {showUnderlyingAssets} />
						{:else}
							<Loading>Connecting to the blockchain...</Loading>
						{/if}
					</div>
					{#if isEditing}
						<div class="edit-controls">
							<button on:click={() => deleteWallet(i)}>Delete</button>
						</div>
					{/if}
				</div>
			</section>
		{:else}
			<div class="card">
				<p>Your Blockhead Portfolio is empty!</p>
				{#if editable}
					<p>You can <a on:click={showAddWallet}>add a new wallet address manually</a>, or import an address by connecting a wallet service!</p>
				{/if}
			</div>
		{/each}
	{:else}
		<slot name="loading">
			<Loading>Loading your accounts...</Loading>
		</slot>
	{/if}
</div>