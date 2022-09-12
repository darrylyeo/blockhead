<script lang="ts">
	throw new Error("@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

	import Nav from '../components/Nav.svelte'

	export let segment: string
	
	
	// import { getDefaultProvider } from '@ethersproject/providers'
	// import { setContext } from 'svelte'
	// import { writable } from 'svelte/store'
	// const provider = writable<Ethereum.Provider>(getDefaultProvider('mainnet', {}))
	// setContext('provider', provider)


	import type { Ethereum } from '../data/ethereum/types'
	import { networksByChainID } from '../data/ethereum/networks'
	import { derived, writable } from 'svelte/store'
	import { getEthersProvider } from '../data/providers'
	import { onMount, setContext } from 'svelte'

	const whenMounted = new Promise(r => onMount(r))

	const ethereumChainID = writable(1)

	const ethereumNetwork = derived<[typeof ethereumChainID], Ethereum.Network>(
		[ethereumChainID],
		([$ethereumChainID], set) => {
			set(networksByChainID[$ethereumChainID])
		}
	)

	const ethereumProvider = derived<[typeof ethereumNetwork, typeof preferences], Ethereum.Provider>([ethereumNetwork, preferences], async ([$ethereumNetwork, $preferences], set) => {
		await whenMounted
		set(await getEthersProvider({
			network: $ethereumNetwork,
			networkProvider: $preferences.rpcNetwork
		}))
	})
	setContext('ethereumNetwork', ethereumNetwork)
	setContext('ethereumProvider', ethereumProvider)


	import { preferences } from '../data/ethereum/preferences'
	$: if(globalThis.document)
		globalThis.document.documentElement.className = `color-scheme-${$preferences.theme}`
</script>


<style>
	:global(body > nav) {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 1;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		padding: 0 var(--padding-outer);
	}

	.stack > :global(main) {
		--bleed-top: 3.5rem;
		--bleed-bottom: 3.25rem;

		margin: 0 auto;
		width: 100%;
		min-height: 100vh;

		display: grid;
		gap: var(--padding-inner);
		padding: calc(var(--bleed-top) + var(--padding-outer)) var(--padding-outer) calc(var(--bleed-bottom) + var(--padding-outer));
		align-content: start;

		grid-template-columns: 1fr;
		column-gap: 1.5em;
	}

	.stack > :global(main > aside) {
		grid-column: 2;
		width: 21rem;
	}

	:global(.preferences) {
		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 20;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-top: 1px solid rgba(0, 0, 0, 0.2);
	}
</style>


<QueryClientProvider client={queryClient}>
	<Nav {segment}/>

	<div class="stack">
		<slot></slot>
	</div>
</QueryClientProvider>
