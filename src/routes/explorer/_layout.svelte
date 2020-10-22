<script lang="ts">
	import { goto } from '@sapper/app'
	
	let blockchain = 'Ethereum'
	
	const blockchainColors = {
		'Bitcoin': 'bitcoin-gold',
		'Ethereum': 'ethereum-blue'
	}

	export let segment: string
	$: console.log('segment', segment)
	$: if(segment === undefined && globalThis.document){
		goto(`explorer/${blockchain.toLowerCase()}`)
		document.documentElement.style.setProperty('--primary-color', `var(--${blockchainColors[blockchain]})`)
	}

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
		<h1>{blockchain ? `${blockchain} Explorer` : `Explorer`}</h1>
		<label>
			<span>Blockchain: </span>
			<!-- <select bind:value={blockchain}> -->
			<select bind:value={blockchain}>
				<option value="Bitcoin">Bitcoin</option>
				<option value="Ethereum" selected>Ethereum</option>
			</select>
			<!-- <a href="explorer/bitcoin"><button>Bitcoin</button></a>
			<a href="explorer/ethereum"><button>Ethereum</button></a> -->
		</label>
	</Controls>

	<slot></slot>
</main>