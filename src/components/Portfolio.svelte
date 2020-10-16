<script lang="ts">
	import { onMount } from 'svelte'

	import { ethereumNetwork } from '../data/ethereum/network'
	import { getProvider } from '../data/ethereum/provider'
	import type { CryptoAddress } from '../data/CryptoAddress'
	// import type { CryptoPosition } from '../data/CryptoPosition'
	
	export let name = 'Your Portfolio'
	export let editable = false
	export let accounts: CryptoAddress[]

	let provider 
	onMount(async () => {
		provider = await getProvider($ethereumNetwork)
	})

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


	let delayStartIndex = 0

	import Address from './Address.svelte'
	import AddressField from './AddressField.svelte'
	import Balance from './Balance.svelte'
	import Controls from './Controls.svelte'
	import Loading from './Loading.svelte'
	import { flip } from 'svelte/animate'
</script>

<style>
	.portfolio {
		display: grid;
		gap: var(--padding-inner);
		grid-template-columns: 100%;
	}

	section {
		/* display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 1fr auto; */
		display: flex;
		gap: var(--padding-inner);
		padding: var(--padding-outer);

		background-color: var(--card-background-color);
		border-radius: var(--card-border-radius);
	}

	section > * {
		flex: 1;
	}

	.edit-controls {
		flex: 0 auto;
	}

	form {
		display: contents;
	}
</style>


<Controls>
	<h1>{name}</h1>
	{#if editable}
		{#if isAddingWallet}
			<form on:submit={() => addWallet(newWalletAddress)}>
				<AddressField bind:address={newWalletAddress} required />
				<button>Add</button>
			</form>
		{:else if isEditing}
			<button on:click={toggleEdit}>Done</button>
		{:else}
			<button on:click={toggleEdit}>Edit</button>
			<button on:click={showAddWallet}>+ Add Wallet</button>
		{/if}
	{/if}
</Controls>
<div class="portfolio">
	{#if accounts}
		{#each accounts as address, i (address)}
			<section animate:flip={{duration: 300, delay: Math.abs(delayStartIndex - i) * 50}}>
				<div>
					<h3><Address {address} /></h3>
					{#if provider}
						<Balance provider={provider} address={address} />
					{/if}
				</div>
				{#if isEditing}
					<div class="edit-controls">
						<button on:click={() => deleteWallet(i)}>Delete</button>
					</div>
				{/if}
			</section>
		{:else}
			<p>Your Blockhead Portfolio is empty!</p>
			{#if editable}
				<p>You can <a on:click={showAddWallet}>add a new wallet address manually</a>, or import an address by connecting a wallet service below!</p>
			{/if}
		{/each}
	{:else}
		<slot>
			<Loading>Loading your accounts...</Loading>
		</slot>
	{/if}
</div>