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



	// Global state

	import { browser } from '$app/environment'

	import { preferences } from '../state/preferences'

	$: if(browser)
		Object.assign(globalThis.document.documentElement?.dataset ?? {}, {
			'colorScheme': $preferences.theme,
		})


	// Metadata
	import { MetaTags } from 'svelte-meta-tags'


	// Internal state
	let showAccounts = false


	// Components
	import AccountConnections from '../components/AccountConnections.svelte'
	import SizeContainer from '../components/SizeContainer.svelte'


	// Transitions
	import { fly } from 'svelte/transition'
	import { quintOut } from 'svelte/easing'
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
				url: 'https://blockhead.info/Blockhead@1-1728x1080.png',
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
		title: `Blockhead・track, visualize & explore all of crypto, DeFi & web3・B⃞`,
		description: `EVM networks, blocks, txs, accounts, contracts, dapps, NFTs, web3 infra`,
		// description: `EVM networks/blocks/txs/accounts/contracts/dapps/NFTs/infra & more`,
		image: 'https://blockhead.info/Blockhead@1-1728x1080.png',
		imageAlt: 'Blockhead | track, visualize & explore all of crypto, DeFi & web3',
	},
	additionalLinkTags: [
		{
			rel: 'icon',
			href: '/favicon.png',
		},
		{
			rel: 'apple-touch-icon',
			href: '/logo-192.png',
			sizes: '192x192',
		},
		{
			rel: 'apple-touch-icon',
			href: '/logo-512.png',
			sizes: '512x512',
		},
		{
			rel: 'manifest',
			href: '/manifest.json',
		},
	]
}} />


<style>
	/* :global(body) {
		display: grid;
		grid-template:
			'Header Header' max-content
			'Main Aside' 1fr
			'Footer Footer' auto
			/ minmax(0, 1fr) auto;
	} */
	:global(:is(body > nav)) {
		/* grid-area: Header;

		position: sticky;
		top: 0;
		z-index: 1; */

		position: fixed;
		width: 100%;
		top: 0;
		z-index: 1;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		padding: 0 var(--padding-outer);
	}

	/* :global(:is(body > .stack)) {
		grid-area: Main;
	} */

	:global(:is(body > .stack > main)) {
		--bleed-top: 3.5rem;
		--bleed-bottom: 3.25rem;

		isolation: isolate;

		margin: 0 auto;
		width: 100%;
		min-width: min(var(--one-column-width), 100vw);
		min-height: 100vh;

		display: grid;
		gap: var(--padding-inner);
		padding: calc(var(--bleed-top) + var(--padding-outer)) var(--padding-outer) calc(var(--bleed-bottom) + var(--padding-outer));
		align-content: start;

		transition: 0.4s var(--ease-out-expo);
	}

	@media (min-width: 50rem) {
		[data-show-accounts="true"] :global(main) {
			min-width: min(var(--one-column-width) + 22rem, 100vw);
			padding-right: calc(22rem + var(--padding-outer));
		}
	}

	@media (max-width: 50rem) {
		:global(:is(body > .stack > main > aside)) {
			grid-area: 1 / 1;
		}
	}

	:global(:is(body > .stack > .preferences)) {
		/* grid-area: Footer; */

		position: fixed;
		width: 100%;
		bottom: 0;
		z-index: 20;

		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
		border-top: 1px solid rgba(0, 0, 0, 0.2);
	}

	aside {
		/* grid-area: Aside; */
		z-index: 1;

		position: fixed;
		right: 0;
		top: 3.5rem;
		bottom: 3.5rem;

		overflow: auto;

		width: min(22rem, 100vw);
		padding: 1.5rem;

		background-color: rgba(var(--rgb-light-dark), 0.33);
		-webkit-backdrop-filter: var(--overlay-backdrop-filter);
		backdrop-filter: var(--overlay-backdrop-filter);
	}

	[role="toolbar"] {
		position: sticky;
		right: 0;
		min-width: auto;
		backdrop-filter: var(--overlay-backdrop-filter);
	}
	[role="toolbar"]:after {
		content: '';
		z-index: -1;
		position: absolute;
		inset: -1rem;
		background: linear-gradient(to right, rgba(var(--rgb-light-dark), 0), rgba(var(--rgb-light-dark), calc(0.925 - 0.2 * var(--is-light))) 1rem);
	}

	.wallets-toggle span {
		font-weight: bold;
		opacity: 1 !important;
		padding: 0.2em 0.6em;
	}
	.wallets-toggle span:before {
		content: none !important;
	}
</style>


<svelte:window on:blockhead_addAccountConnection={e => showAccounts = true} />


<QueryClientProvider client={queryClient}>
	<Nav>
		<svelte:fragment slot="toolbar">
			<div role="toolbar">
				<label class="wallets-toggle">
					<input type="checkbox" bind:checked={showAccounts} />
					<span data-after={showAccounts ? '⏶' : '⏷'}>Wallets</span>
				</label>
			</div>
		</svelte:fragment>
	</Nav>

	{#if showAccounts}
		<!-- <aside class="column" transition:slide|global={{ axis: 'x' }}> -->
		<aside class="column" transition:fly|global={{ x: 400, opacity: 0, duration: 400, easing: quintOut }}>
			<AccountConnections layout="column" />
		</aside>
	{:else}
		<aside hidden>
			<AccountConnections />
		</aside>
	{/if}

	<div class="stack" data-show-accounts={showAccounts}>
		<slot></slot>
	</div>

	<!-- <SizeContainer transitionWidth transitionHeight={false} showIf={showAccounts}> -->
		<!-- <aside hidden={!showAccounts}>
			<section class="column" transition:slide|global={{ axis: 'x' }}>
				<AccountConnections layout="column" />
			</section>
		</aside> -->
	<!-- </SizeContainer> -->
		
	<!-- </SizeContainer> -->
</QueryClientProvider>
