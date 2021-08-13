<script context="module">
	import '../fonts.css'
	import '../app.css'


	import process from 'process'
	import { Buffer } from 'buffer'

	globalThis.global = globalThis
	globalThis.Buffer = Buffer
	globalThis.process = process
</script>

<script lang="ts">
	import Nav from '../components/Nav.svelte'
	
	export let segment: string
	
	
	// import { getDefaultProvider } from '@ethersproject/providers'
	// import { setContext } from 'svelte'
	// import { writable } from 'svelte/store'
	// const provider = writable<Ethereum.Provider>(getDefaultProvider('mainnet', {}))
	// setContext('provider', provider)


	import type { Ethereum } from '../data/ethereum/types'
	import { ethereumChainID, preferredEthereumProvider } from '../data/ethereum/preferences'
	import { networksByChainID } from '../data/ethereum/networks'
	import { derived } from 'svelte/store'
	import { getEthersProvider } from '../data/ethereum/provider'
	import { onMount, setContext } from 'svelte'

	const whenMounted = new Promise(r => onMount(r))

	const ethereumNetwork = derived<[typeof ethereumChainID], Ethereum.Network>(
		[ethereumChainID],
		([$ethereumChainID], set) => {
			set(networksByChainID[$ethereumChainID])
		}
	)

	const ethereumProvider = derived<[typeof ethereumNetwork, typeof preferredEthereumProvider], Ethereum.Provider>([ethereumNetwork, preferredEthereumProvider], async ([$ethereumNetwork, $preferredEthereumProvider], set) => {
		await whenMounted
		set(await getEthersProvider($ethereumNetwork, $preferredEthereumProvider))
	})
	setContext('ethereumNetwork', ethereumNetwork)
	setContext('ethereumProvider', ethereumProvider)


	import { preferredColorScheme } from '../data/ethereum/preferences'
	$: if(globalThis.document)
		globalThis.document.documentElement.className = `color-scheme-${$preferredColorScheme}`
</script>

<style>
	/* Grid-based */
	/* :global(#sapper) {
		display: grid;
		grid:
			"nav" auto
			"main" 1fr
			"preferences" auto;
		place-items: start;
		min-height: 100vh;
	}

	:global(nav) {
		grid-area: nav;
		position: sticky;
		width: 100%;
		top: 0;
		z-index: 1;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		padding: 0 var(--padding-outer);
	}

	:global(main) {
		grid-area: main;
	}

	:global(.preferences) {
		grid-area: preferences;
		position: sticky;
		width: 100%;
		bottom: 0;
		z-index: 1;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-top: 1px solid rgba(0, 0, 0, 0.2);
		--padding-outer: 1em;
		padding: var(--padding-outer);
	} */


	/* Experimental: make <main> the scrolling element to enable inner position: sticky elements */
	/* :global(#sapper) {
		height: 100vh;
	} */
	/* :global(#sapper main) {
		overflow-y: auto;
		height: 100vh;
		grid-area: 1 / 1 / 3 / 1;
	} */
	/* :global(#sapper main) {
		overflow-y: auto;
		--bleed: 3rem;
		margin: calc(-1 * var(--bleed)) 0;
		padding: calc(var(--bleed) + var(--padding-outer)) var(--padding-outer);
	} */


	/* Fixed layout (supports inner position: sticky elements) */
	:global(nav) {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 1;
	}

	:global(main) {
		--bleed-top: 3.5rem;
		--bleed-bottom: 3.25rem;
		align-content: start;
		padding: calc(var(--bleed-top) + var(--padding-outer)) var(--padding-outer) calc(var(--bleed-bottom) + var(--padding-outer));
	}

	:global(.preferences) {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 1;
	}



	:global(nav) {
		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		padding: 0 var(--padding-outer);
	}
	:global(.preferences) {
		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-top: 1px solid rgba(0, 0, 0, 0.2);
		--padding-outer: 1em;
		padding: var(--padding-outer);

		max-height: 3.5rem;
		overflow-y: auto;
	}
</style>

<Nav {segment}/>

<div class="stack">
	<slot></slot>
</div>