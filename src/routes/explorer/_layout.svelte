<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '@sapper/app'

	let blockchain = 'Ethereum'

	// $: {
	// 	console.log('blockchain')
	// 	if(globalThis.document)
	// 		goto(`explorer/${blockchain.toLowerCase()}`)
	// }
</script>

<style>

</style>

<svelte:head>
	<title>{blockchain ? `${blockchain} Explorer` : `Explorer`} | Blockhead</title>
</svelte:head>

<div>
	<h2>Explorer</h2>
	<label>
		<span>Blockchain: </span>
		<!-- <select bind:value={blockchain} on:input={() => goto(`explorer/${blockchain.toLowerCase()}`)}> -->
		<select bind:value={blockchain}>
			<option value="Bitcoin">Bitcoin</option>
			<option value="Ethereum" selected>Ethereum</option>
		</select>
	</label>
</div>

<slot></slot>