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
</script>

<svelte:head>
	<title>Portfolio | Blockhead Explorers</title>
</svelte:head>

<section>
	{#if localAccounts}
		<Portfolio name="Your Portfolio" bind:accounts={$localAccounts} editable={true} />
	{/if}
	<Portfolio name="Portis Wallet" accounts={web3Accounts} />
</section>