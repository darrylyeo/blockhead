<script lang="ts">
	import { onMount } from 'svelte'
	import { goto } from '@sapper/app'
	
	let blockchain = 'Ethereum'
	
	// $: {
	// 	console.log('blockchain')
	// 	if(globalThis.document)
	// 		goto(`explorer/${blockchain.toLowerCase()}`)
	// }

	import Controls from '../../components/Controls.svelte'
	import { fly } from 'svelte/transition'
</script>

<style>
	main {
		max-width: var(--one-column-width);
	}
</style>

<svelte:head>
	<title>{blockchain ? `${blockchain} Explorer` : `Explorer`} | Blockhead</title>
</svelte:head>

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<Controls>
		<h2>Explorer</h2>
		<label>
			<span>Blockchain: </span>
			<select bind:value={blockchain} on:input={() => goto(`explorer/${blockchain.toLowerCase()}`)}>
			<!-- <select bind:value={blockchain}> -->
				<option value="Bitcoin">Bitcoin</option>
				<option value="Ethereum" selected>Ethereum</option>
			</select>
		</label>
	</Controls>

	<slot></slot>
</main>