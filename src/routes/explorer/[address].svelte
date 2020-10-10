<script context="module" lang="ts">
	// import { pocketInstance } from '../../data/pocket-network'

	let address

	export async function preload({ params }) {
		address = params.address

		if(!globalThis.document)
			return

		// const pocketInstance = await import('../../data/pocket-network')
		// const balance = await pocketInstance.rpc.query.getBalance(address)
		
		// return { address, balance }
		// const res = await this.fetch(`exporer/${address}.json`);
		// const data = await res.json();

		// if (res.status === 200) {
		// 	return { post: data };
		// } else {
		// 	this.error(res.status, data.message);
		// }

		return {address}
	}

	// import Portfolio from '../../components/Portfolio.svelte'
	import TokenValue from '../../components/TokenValue.svelte'
</script>

<script lang="ts">
	import { goto } from '@sapper/app'
	import Address from "../../components/Address.svelte"

	let balance
</script>

<style>

</style>

<svelte:head>
	<title>{address || 'Explorer'} | Blockhead Explorer</title>
</svelte:head>

<h2>
	<Address editable={true} bind:address={address} /> <!-- on:change={goto(`explorer/${address}`)} -->
</h2>

<div class="content">
	<!-- <Portfolio {address} /> -->
	<!-- <TokenValue value={balance} /> -->

	<!-- {#each balances as balance} -->
		<TokenValue token="BTC" />
	<!-- {/each} -->
</div>
