<script lang="ts">
	import { goto } from '@sapper/app'
	
	export let segment: string
	let blockchain = segment || 'ethereum'

	$: console.log('Explorer segment', segment)
	if(segment === undefined && globalThis.document)
		goto(`explorer/${blockchain}`)
	
	$: if(globalThis.document)
		document.documentElement.style.setProperty('--primary-color', `var(--${tokenColors[blockchain]})`)

	$: blockchainDisplayName = blockchain[0].toUpperCase() + blockchain.slice(1)

	import { fly } from 'svelte/transition'
	import { tokenColors } from '../../data/token-colors'
</script>

<style>
	main {
		max-width: var(--one-column-width);
		grid-template-columns: 100%;
	}
</style>

<svelte:head>
	<title>{blockchain ? `${blockchainDisplayName} Explorer` : `Explorer`} | Blockhead</title>
</svelte:head>

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<div class="bar">
		<h1>{blockchain ? `${blockchainDisplayName} Explorer` : `Explorer`}</h1>
		<label>
			<span>Blockchain: </span>
			<!-- <select bind:value={blockchain}> -->
			<select bind:value={blockchain} on:input={() => globalThis.requestAnimationFrame(() => goto(`explorer/${blockchain}`))}>
				<option value="bitcoin">Bitcoin</option>
				<option value="ethereum" selected>Ethereum</option>
			</select>
			<!-- <a href="explorer/bitcoin"><button>Bitcoin</button></a>
			<a href="explorer/ethereum"><button>Ethereum</button></a> -->
		</label>
	</div>

	<slot></slot>
</main>