<script lang="ts">
	import { onMount } from 'svelte'

	import { getWeb3Accounts } from '../../data/ethereum/accounts'
	
	let accounts
	onMount(async () => {
		accounts = await getWeb3Accounts()
	})
	
	import Portfolio from '../../components/Portfolio.svelte'
</script>

<svelte:head>
	<title>Portfolio | Blockhead Explorers</title>
</svelte:head>

<section>
	<Portfolio name="Portis Wallet" {accounts} />
</section>