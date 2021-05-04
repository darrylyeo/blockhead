<script lang="ts">
	import { networksBySlug } from '../../data/ethereum/networks'


	export let segment: string
	let networkSlug = segment || 'ethereum'
	$: network = networksBySlug[networkSlug]
	$: networkDisplayName = network ? network.name : networkSlug[0].toUpperCase() + networkSlug.slice(1)

	$: console.log('Explorer segment', segment)
	if(segment === undefined && globalThis.document)
		goto(`explorer/${networkSlug}`)
	
	$: if(globalThis.document)
		document.documentElement.style.setProperty('--primary-color', `var(--${tokenColors[networkSlug]})`)


	import { goto } from '@sapper/app'


	import { fly } from 'svelte/transition'
	import { tokenColors } from '../../data/token-colors'
	import Preferences from '../../components/Preferences.svelte';
</script>

<style>
	main {
		max-width: var(--one-column-width);
		grid-template-columns: 100%;
	}
</style>

<svelte:head>
	<title>{networkSlug ? `${networkDisplayName} Explorer` : `Explorer`} | Blockhead</title>
</svelte:head>

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<div class="bar">
		<h1>{networkSlug ? `${networkDisplayName} Explorer` : `Explorer`}</h1>
		<label>
			<span>Blockchain: </span>
			<!-- <select bind:value={blockchain}> -->
			<select bind:value={networkSlug} on:input={() => globalThis.requestAnimationFrame(() => goto(`explorer/${networkSlug}`))}>
				<option value="bitcoin">Bitcoin</option>
				<option value="ethereum" selected>Ethereum</option>
				<option value="avalanche">Avalanche</option>
			</select>
			<!-- <a href="explorer/bitcoin"><button>Bitcoin</button></a>
			<a href="explorer/ethereum"><button>Ethereum</button></a> -->
		</label>
	</div>

	<slot></slot>
</main>

<Preferences />