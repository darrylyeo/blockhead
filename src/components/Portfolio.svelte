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
	let isAddingWallet = false
	function showAddWallet(){
		isAddingWallet = true
	}

	function isValid(address){
		return address !== ''
	}

	function addWallet(newWalletAddress){
		if(!isValid(newWalletAddress))
			return

		const newAccount = newWalletAddress
		accounts = [...accounts, newAccount] // accounts.push(newAccount)

		isAddingWallet = false
	}

	import Address from './Address.svelte'
	import AddressField from './AddressField.svelte'
	import Balance from './Balance.svelte'
	import Controls from './Controls.svelte'
	import Loading from './Loading.svelte'
</script>

<style>
	.portfolio {
		display: grid;
		gap: var(--padding-inner);
	}

	section {
		padding: var(--padding-outer);

		background-color: var(--card-background-color);
		border-radius: var(--card-border-radius);
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
			<button>Done</button>
		{:else}
			<button>Edit</button>
			<button on:click={showAddWallet}>+ Add Wallet</button>
		{/if}
	{/if}
</Controls>
<div class="portfolio">
	{#if accounts}
		{#each accounts as address}
			<section>
				<h3><Address {address} /></h3>
				{#if provider}
					<Balance provider={provider} address={address} />
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