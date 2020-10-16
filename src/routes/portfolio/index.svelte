<script lang="ts">
	import { onMount } from 'svelte'

	import { getProvider } from '../../data/ethereum/provider'
	import { getLocalAccounts, getWeb3Accounts } from '../../data/ethereum/accounts'
	
	let localAccounts

	onMount(async () => {
		localAccounts = getLocalAccounts()
	})

	let provider
	const loadProvider = async () => {
		provider = await getProvider()
	}

	const disconnectProvider = () => {
		provider = undefined
	}
	
	import Portfolio from '../../components/Portfolio.svelte'
	import Loading from '../../components/Loading.svelte'
	import { fly } from 'svelte/transition'
import Controls from '../../components/Controls.svelte'
import { disconnect } from 'process';
</script>

<style>
	main {
		/* display: grid;
		grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr)); */
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 2rem;
	}
	section {
		flex: 1 25rem;
		max-width: 45rem;

		display: grid;
		gap: var(--padding-inner);
		align-content: start;
		grid-template-columns: 100%;
	}
</style>

<svelte:head>
	<title>Portfolio | Blockhead Explorers</title>
</svelte:head>

<main in:fly={{x: 100}} out:fly={{x: -100}}>
	<section>
		{#if localAccounts}
			<Portfolio name="Your Portfolio" bind:accounts={$localAccounts} editable={true} />
		{:else}
			LocalStorage isn't availale in your browser.
		{/if}
	</section>
	<section>
		{#if provider}
			{#await getWeb3Accounts(provider)}
				<Loading>Log into Portis via the pop-up window.</Loading>
			{:then web3Accounts}
				<Portfolio name="Portis Wallet" accounts={web3Accounts}></Portfolio>
			{:catch error}
				<h2>Import from Portis</h2>
				<div>
					<p>We couldn't connect your Portis.io Account: <strong>{error}</strong></p>
					<button on:click={loadProvider}>Try Again</button>
					<button on:click={disconnectProvider}>Cancel</button>
				</div>
			{/await}
		{:else}
			<Controls>
				<h2>Portis Wallet</h2>
				<button on:click={loadProvider}>Connect</button>
			</Controls>
			<div>
				<p>Create or connect an existing Portis.io account to import your wallet addresses.</p>
			</div>
		{/if}
	</section>
</main>