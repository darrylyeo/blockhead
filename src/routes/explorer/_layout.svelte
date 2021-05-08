<script lang="ts">
	import type { Ethereum } from '../../data/ethereum/types'
	import { preferredEthereumProvider } from '../../data/ethereum/preferences'
	import { networksBySlug } from '../../data/ethereum/networks'
	import { derived, writable } from 'svelte/store'
	import { onMount, setContext } from 'svelte'
	import { getProvider } from '../../data/ethereum/provider'


	export let segment: string
	$: console.log('Explorer segment', segment)
	
	const networkSlug = writable<string>(segment || 'ethereum')

	if(segment === undefined && globalThis.document)
		goto(`explorer/${$networkSlug}`)


	// Explorer context stores

	const explorerNetwork = derived<typeof networkSlug, Ethereum.Network>(networkSlug, ($networkSlug, set) => {
		if(networksBySlug[$networkSlug])
			set(networksBySlug[$networkSlug])
	})
	setContext('explorerNetwork', explorerNetwork)

	const whenMounted = new Promise(r => onMount(r))
	const explorerProvider = derived<[typeof explorerNetwork, typeof preferredEthereumProvider], Ethereum.Provider>([explorerNetwork, preferredEthereumProvider], async ([$explorerNetwork, $preferredEthereumProvider], set) => {
		await whenMounted
		if($explorerNetwork)
			set(await getProvider($explorerNetwork, $preferredEthereumProvider, 'ethers'))
	})
	setContext('explorerProvider', explorerProvider)

	const blockNumber = derived<typeof explorerProvider, number>(explorerProvider, ($explorerProvider, set) => {
		const onBlock = blockNumber => set(blockNumber)
		if($explorerProvider){
			$explorerProvider.on('block', onBlock)
			return () => $explorerProvider.off('block', onBlock)
		}
	})
	setContext('blockNumber', blockNumber)


	$: networkDisplayName = $explorerNetwork ? $explorerNetwork.name : $networkSlug[0].toUpperCase() + $networkSlug.slice(1)

	
	$: if(globalThis.document)
		document.documentElement.style.setProperty('--primary-color', `var(--${tokenColors[$networkSlug]})`)


	const query = writable<string>('')
	setContext('query', query)

	import { goto } from '@sapper/app'


	import { fly } from 'svelte/transition'
	import { tokenColors } from '../../data/token-colors'
	import Preferences from '../../components/Preferences.svelte'
</script>

<style>
	main {
		max-width: var(--one-column-width);
		grid-template-columns: 100%;
	}
</style>

<svelte:head>
	<title>{$query ? `${$query} | ` : ''}{$networkSlug ? `${networkDisplayName} Explorer` : `Explorer`} | Blockhead</title>
</svelte:head>

<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<div class="bar">
		<h1>{$networkSlug ? `${networkDisplayName} Explorer` : `Explorer`}</h1>
		<label>
			<span>Blockchain: </span>
			<!-- <select bind:value={blockchain}> -->
			<select bind:value={$networkSlug} on:input={() => globalThis.requestAnimationFrame(() => goto(`explorer/${$networkSlug}`))}>
				<option value="bitcoin">Bitcoin</option>
				<option value="ethereum" selected>Ethereum</option>
				<option value="matic">Polygon/Matic</option>
				<option value="xdai">xDAI</option>
				<option value="avalanche">Avalanche</option>
			</select>
			<!-- <a href="explorer/bitcoin"><button>Bitcoin</button></a>
			<a href="explorer/ethereum"><button>Ethereum</button></a> -->
		</label>
	</div>

	<div class="stack">
		<slot />
	</div>
</main>

<Preferences />