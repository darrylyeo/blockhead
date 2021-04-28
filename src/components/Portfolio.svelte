<script lang="ts">
	import type { CryptoAddress } from '../data/CryptoAddress'
	// import type { CryptoPosition } from '../data/CryptoPosition'
	import type { Ethereum } from '../data/ethereum/types'
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import type { QuoteCurrency } from '../data/currency/currency'
	import { networksByChainID } from '../data/ethereum/networks'


	// Portfolio management

	export let name = ''
	export let editable = false
	export let accounts: CryptoAddress[]

	enum State {
		Idle = 'idle',
		Editing = 'editing',
		Adding = 'adding'
	}
	let state = State.Idle
	$: if(editable && name === '')
		state = State.Editing


	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()


	// Wallet management

	function isValid(address){
		return address !== ''
	}

	let newWalletAddress = ''

	function addWallet(newWalletAddress){
		if(!isValid(newWalletAddress))
			return

		if(accounts.includes(newWalletAddress))
			return

		const newAccount = newWalletAddress
		accounts = [newAccount, ...accounts]
	}

	function deleteWallet(i){
		delayStartIndex = i
		accounts = [...accounts.slice(0, i), ...accounts.slice(i + 1)]
	}
	
	
	// Balances view options
	
	export let networks = [1, 137, 43114, 56, 250].map(chainID => networksByChainID[chainID])
	export let provider: Ethereum.Provider
	export let analyticsProvider: AnalyticsProvider
	export let quoteCurrency: QuoteCurrency
	
	let showValues: 'original' | 'converted' | 'both' = 'original'
	let sortBy: 'value-descending' | 'value-ascending' | 'ticker-ascending' = 'value-descending'
	let showSmallValues = false
	let showUnderlyingAssets = false


	// Options menu
	let showOptions = true
	const toggleShowOptions = () => showOptions = !showOptions


	let delayStartIndex = 0

	import AddressField from './AddressField.svelte'
	import Loading from './Loading.svelte'
	import PortfolioAccount from './PortfolioAccount.svelte'
	import { flip } from 'svelte/animate'
	import { scale } from 'svelte/transition'
</script>

<style>
	.edit-controls {
		flex: 0 auto;
		font-size: 0.7em;
	}

	.options {
		position: sticky;
		bottom: 0;

		margin: 0 calc(-1 * var(--padding-outer));
		z-index: 1;

		font-size: 0.8em;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
	}

	form {
		display: contents;
	}
</style>


<div class="portfolio column">
	<div class="bar">
		<h1 on:dblclick={() => state = State.Editing}>
			{#if state !== State.Editing}
				{name || '[Untitled Portfolio]'}
			{:else}
				<form on:submit={() => state = State.Idle}>
					<input type="text" bind:value={name} placeholder="My Portfolio" autofocus />
				</form>
			{/if}
		</h1>
		{#if editable}
			<div class="stack">
				{#if state !== State.Editing}
					<div class="bar" transition:scale>
						{#if state === State.Idle}
							<button on:click={() => state = State.Adding} transition:scale>+ Add Wallet</button>
						{/if}
						<button on:click={() => state = State.Editing}>Edit</button>
					</div>
				{:else}
					<div class="bar" transition:scale>
						<button on:click={() => dispatch('delete')}>Delete Portfolio</button>
						<button on:click={() => state = State.Idle}>Done</button>
					</div>
				{/if}
			</div>
		{/if}
		<!-- <button on:click={toggleShowOptions}>Options</button> -->
		<slot></slot>
	</div>

	{#if accounts}
		{#if state === State.Adding || !accounts.length}
			<div class="stack" transition:scale>
				{#if state === State.Adding}
					<div class="card" transition:scale>
						<div class="bar">
							<div>
								<h3>Add Wallet</h3>
							</div>
							<small>{networks.map(network => network.name).join(', ')}</small>
						</div>
						<div class="bar">
							<form class="bar" on:submit|preventDefault={() => {addWallet(newWalletAddress); state = State.Idle; newWalletAddress = ''}}>
								<AddressField bind:address={newWalletAddress} autofocus required/>
								<button class="medium" disabled={!isValid(newWalletAddress)}>Add</button>
							</form>
							<button class="medium" on:click={() => state = State.Idle}>Cancel</button>
						</div>
					</div>
				{:else if !accounts.length}
					<div class="card" transition:scale|local>
						<h3>Your Blockhead Portfolio is empty!</h3>
						{#if editable}
							<p>You can <a on:click={() => isAddingWallet = true}>add a new wallet address manually</a>, or import an address by connecting a wallet service!</p>
						{/if}
					</div>
				{/if}
			</div>
		{/if}
		{#each accounts as address, i (address)}
			<section class="card" transition:scale|local animate:flip|local={{duration: 300, delay: Math.abs(delayStartIndex - i) * 50}}>
				<div class="bar">
					<PortfolioAccount
						{networks}
						{address}
						{provider}
						{analyticsProvider}
						{quoteCurrency}

						{showValues}
						{sortBy}
						{showSmallValues}
						{showUnderlyingAssets}
					>
						{#if state === State.Editing}
							<div class="row edit-controls" transition:scale>
								<button on:click={() => deleteWallet(i)}>Remove</button>
							</div>
						{/if}
					</PortfolioAccount>
				</div>
			</section>
		{/each}
	{:else}
		<slot name="loading">
			<Loading>Loading your accounts...</Loading>
		</slot>
	{/if}

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
</div>