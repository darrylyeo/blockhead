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


	// Events
	import { triggerEvent } from '$/events/triggerEvent'


	// Tanstack Query
	import { browser } from '$app/environment'
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query'
	import { type PersistedClient, persistQueryClient } from '@tanstack/query-persist-client-core'
	import { get, set, del } from 'idb-keyval'
	import { broadcastQueryClient } from '@tanstack/query-broadcast-client-experimental'

	export const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				keepPreviousData: true,
				staleTime: 60 * 60 * 1000,
				cacheTime: Infinity,
				enabled: browser,
			},
		}
	})
	
	$effect(() => {
		const idbKey = 'blockhead:queryClient'

		persistQueryClient({
			queryClient,
			persister: {
				persistClient: async (client: PersistedClient) => set(idbKey, client),
				restoreClient: async () => await get<PersistedClient>(idbKey),
				removeClient: async () => await del(idbKey),
			}
		})

		broadcastQueryClient({
			queryClient,
			broadcastChannel: globalThis.location?.origin,
		})

		queryClient.getQueryCache().subscribe(({ type, query }) => {
			if(type === 'added' || type === 'updated')
				triggerEvent('Query', {
					query: query.queryKey[0],
					queryStatus: query.state.status,
					...query.queryKey[1] && Object.fromEntries(
						Object.entries(query.queryKey[1])
							.filter(([key]) => ![
								'address',
								'did',
								'ensName',
								'lensName',
							].includes(key))
					),
				})
		})
	})


	// Global context
	import { setWalletsContext } from '$/state/wallets.svelte'
	setWalletsContext()

	import { preferences } from '$/state/preferences'

	$effect(() => {
		Object.assign(globalThis.document.documentElement?.dataset ?? {}, {
			'colorScheme': $preferences.theme,
			'animations': $preferences.animations,
			'scrollSnap': $preferences.scrollSnap,
		})
	})


	// Page data
	import type { PageData } from './$types'
	import { page } from '$app/stores'

	let metaTags = $derived($page.data.metaTags as PageData['metaTags'])


	// Metadata
	import { MetaTags } from 'svelte-meta-tags'


	// Accounts
	let showAccounts = $state(false)

	$effect(() => {
		globalThis.addEventListener('blockhead_addAccountConnection', () => {
			showAccounts = true
		})
	})


	// Functions
	import { parseFarcasterFrameServerMeta } from '$/api/farcaster/frame'


	// Components
	import Nav from '$/components/Nav.svelte'
	import AccountConnections from '$/components/AccountConnections.svelte'
	import SharePageDialog from '$/components/SharePageDialog.svelte'
</script>


<MetaTags {...metaTags} />


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
		min-width: min(var(--one-column-width), 100dvw);
		min-height: 100vh;
		min-height: 100dvh;

		display: grid;
		gap: var(--padding-inner);
		padding: calc(var(--bleed-top) + var(--padding-outer)) var(--padding-outer) calc(var(--bleed-bottom) + var(--padding-outer));
		align-content: start;

		transition-duration: 0.4s;
		transition-timing-function: var(--ease-out-expo);
		transition-property:
			min-width,
			padding
		;
	}

	@media (min-width: 50rem) {
		aside:not([inert]) ~ .stack :global(main) {
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
		backdrop-filter: var(--overlay-backdrop-filter);

		transition-duration: 0.4s;
		transition-timing-function: var(--ease-out-expo);
		transition-property:
			opacity,
			translate
		;

		&[inert] {
			opacity: 0;
			pointer-events: none;
			translate: 100%;
		}
	}

	.wallets-toggle span {
		font-weight: bold;
		opacity: 1 !important;
		padding: 0.2em 0.6em;
		
		&:before {
			content: none !important;
		}
	}

	.share {
		position: absolute;
		right: 1rem;
		bottom: 4rem;
	}
</style>


<QueryClientProvider client={queryClient}>
	<Nav>
		<svelte:fragment slot="header-right">
			<div role="toolbar">
				<label class="wallets-toggle">
					<input type="checkbox" bind:checked={showAccounts} />
					<span data-after={showAccounts ? '⏶' : '⏷'}>Wallets</span>
				</label>
			</div>
		</svelte:fragment>
	</Nav>

	<aside
		class="column"
		inert={!showAccounts}
	>
		<AccountConnections layout="column" />
	</aside>

	<div class="stack">
		<slot></slot>

		{#if metaTags.openGraph?.images?.[0]}
			<div class="share">
				<SharePageDialog
					url={$page.url.toString()}
					title={metaTags.title}
					imageUrl={metaTags.openGraph.images[0].url}
					farcasterFrameMetadata={
						metaTags.additionalMetaTags && parseFarcasterFrameServerMeta(
							Object.fromEntries(
								metaTags.additionalMetaTags
									.map(({ property, content }) => [property, content])
							)
						)
					}
				/>
			</div>
		{/if}
	</div>
</QueryClientProvider>
