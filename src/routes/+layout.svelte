<script lang="ts">
	import '../fonts.css'
	import '../app.css'


	// Svelte Query
	import { QueryClient, persistQueryClient, broadcastQueryClient, createWebStoragePersistor, QueryClientProvider } from '@sveltestack/svelte-query'

	export const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				keepPreviousData: true,
				// staleTime: Infinity,
				cacheTime: Infinity,
			},
		}
	})

	const localStoragePersistor = createWebStoragePersistor({
		storage: globalThis.localStorage
	})
	persistQueryClient({
		queryClient,
		persistor: localStoragePersistor,
	})

	// broadcastQueryClient({
		// 	queryClient,
		// 	broadcastChannel: globalThis.location?.origin,
	// })


	import Nav from '../components/Nav.svelte'
	
	
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


	import { preferences } from '../state/preferences'
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

	:global(body > .stack > main) {
		--bleed-top: 3.5rem;
		--bleed-bottom: 3.25rem;

		isolation: isolate;

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

	:global(body > .stack > main > aside) {
		grid-column: 2;
		width: 21rem;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
	}

	@media (max-width: 50rem) {
		:global(body > .stack > main > aside) {
			grid-area: 1 / 1;
		}
	}

	:global(body > .stack > .preferences) {
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
	<Nav />

	<div class="stack">
		<slot></slot>
	</div>
</QueryClientProvider>
