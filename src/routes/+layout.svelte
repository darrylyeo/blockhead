<script lang="ts">
	// CSS
	import '../fonts.css'
	import '../app.css'

	for(const propertyDefinition of [
		{
			name: '--primary-color',
			syntax: '<color>',
			initialValue: 'white',
			inherits: true,
		},
		{
			name: '--global-background-gradient-base-color',
			syntax: '<color>',
			initialValue: 'white',
			inherits: true,
		},
	])
		globalThis.CSS?.registerProperty?.(propertyDefinition)


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
	
	
	// import { getDefaultProvider } from 'ethers'
	// import { setContext } from 'svelte'
	// import { writable } from 'svelte/store'
	// const provider = writable<Ethereum.Provider>(getDefaultProvider('mainnet', {}))
	// setContext('provider', provider)


	import type { Ethereum } from '../data/networks/types'
	import { networksByChainID } from '../data/networks'
	import { derived, writable } from 'svelte/store'
	import { getEthersProvider } from '../data/networkProviders'
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



	// State

	import { browser } from '$app/environment'

	import { preferences } from '../state/preferences'

	$: if(browser)
		Object.assign(globalThis.document.documentElement?.dataset ?? {}, {
			'colorScheme': $preferences.theme,
		})


	// Metadata
	import { MetaTags } from 'svelte-meta-tags'
</script>


<MetaTags {...{
	title: `Blockhead | track, visualize & explore all of crypto, DeFi & web3`,
	titleTemplate: `%s | Blockhead`,
	description: `Track, visualize & explore all of crypto, DeFi & web3 with Blockhead's crypto portfolio tracker, cross-EVM block explorer, and interfaces for your favorite dapps and web3 infrastructure.`,
	openGraph: {
		type: 'website',
		url: 'https://blockhead.info',
		title: `Blockhead | track, visualize & explore all of crypto, DeFi & web3`,
		description: `Track, visualize & explore all of crypto, DeFi & web3 with Blockhead's crypto portfolio tracker, cross-EVM block explorer, and interfaces for your favorite dapps and web3 infrastructure.`,
		images: [
			{
				url: 'Blockhead@1-1728x1080.png',
				width: 1728,
				height: 1080,
				alt: 'Blockhead | track, visualize & explore all of crypto, DeFi & web3'
			},
		],
		site_name: 'Blockhead | track, visualize & explore all of crypto, DeFi & web3',
	},
	twitter: {
		handle: '@darryl__yeo',
		site: '@0xBlockhead',
		cardType: 'summary_large_image',
		title: `Blockhead | track, visualize & explore all of crypto, DeFi & web3`,
		description: `Track, visualize & explore all of crypto, DeFi & web3 with Blockhead's crypto portfolio tracker, cross-EVM block explorer, and interfaces for your favorite dapps and web3 infrastructure.`,
		image: 'Blockhead@1-1728x1080.png',
		imageAlt: 'Blockhead | track, visualize & explore all of crypto, DeFi & web3',
	},
	additionalLinkTags: [
		{
			rel: 'icon',
			href: 'favicon.png',
		},
		{
			rel: 'apple-touch-icon',
			href: 'logo-192.png',
			sizes: '192x192',
		},
		{
			rel: 'apple-touch-icon',
			href: 'logo-512.png',
			sizes: '512x512',
		},
		{
			rel: 'manifest',
			href: 'manifest.json',
		},
	]
}} />


<style>
	:global(:is(body > nav)) {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 1;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		padding: 0 var(--padding-outer);
	}

	:global(:is(body > .stack > main)) {
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
	}

	@media (max-width: 50rem) {
		:global(:is(body > .stack > main > aside)) {
			grid-area: 1 / 1;
		}
	}

	:global(:is(body > .stack > .preferences)) {
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
