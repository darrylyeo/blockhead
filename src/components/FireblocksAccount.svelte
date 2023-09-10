<script lang="ts">
	// Types
	import type { VaultAccountResponse } from 'fireblocks-sdk'


	// Inputs
	export let isSandbox: boolean
	export let account: VaultAccountResponse


	// Internal state
	// const createNoncustodialWallet = async () => {
	// 	const { getFireblocksClient } = await import('../api/fireblocks')

	// 	const client = getFireblocksClient({
	// 		isSandbox,
	// 	})

	// 	return await client.NCW.createWallet()
	// }


	// Components
	import Collapsible from './Collapsible.svelte'
</script>



<Collapsible class="card">
	<svelte:fragment slot="title">
		<h4>{account.name}</h4>
	</svelte:fragment>

	<svelte:fragment slot="header-right">
		<span class="card-annotation">Fireblocks Account</span>
	</svelte:fragment>

	{account.id}

	<!-- <button on:click={createNoncustodialWallet} data-before="+">Create Wallet</button> -->

	<!-- <form method="POST" action="?/createNoncustodialWallet">
		<button type="submit" data-before="+">Create Wallet</button>
	</form> -->
</Collapsible>
