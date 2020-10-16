<script lang="ts">
	import { onMount } from 'svelte'

	import { getLocalAccounts, getWeb3Accounts } from '../../data/ethereum/accounts'
	
	let localAccounts
	let web3Accounts
	onMount(async () => {
		localAccounts = await getLocalAccounts()
		web3Accounts = await getWeb3Accounts()
	})
	
	import Portfolio from '../../components/Portfolio.svelte'
	import { fly } from 'svelte/transition'
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

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<section>
		{#if localAccounts}
			<Portfolio name="Your Portfolio" bind:accounts={$localAccounts} editable={true} />
		{/if}
	</section>
	<section>
		<Portfolio name="Portis Wallet" accounts={web3Accounts} />
	</section>
</main>