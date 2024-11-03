<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'


	// Params two-way binding
	import { appsParams } from './_appsParams.svelte'

	import { goto, beforeNavigate, afterNavigate } from '$app/navigation'
	import { page } from '$app/stores'
	import { get } from 'svelte/store'

	let canNavigate = false

	afterNavigate(navigation => {
		if(navigation.to?.route.id?.startsWith('/apps') && navigation.to.params){
			appsParams.web3AppSlug = navigation.to.params.web3AppSlug || navigation.to.url.pathname.match(/^\/apps\/(audius|ceramic|disco|eas|ens|farcaster|ipfs|lens|moxie|uniswap)/)?.[1] || ''
			appsParams.networkSlug = navigation.to.params.networkSlug || ''
			appsParams.accountId = navigation.to.params.accountId || ''
			appsParams.audiusQuery = navigation.to.params.audiusQuery || ''
			appsParams.audiusPlaylistId = navigation.to.params.audiusPlaylistId || ''
			appsParams.audiusTrackId = navigation.to.params.audiusTrackId || ''
			appsParams.audiusUserId = navigation.to.params.audiusUserId || ''
			appsParams.didUrl = navigation.to.params.didUrl || ''
			appsParams.discoCredentialId = navigation.to.params.discoCredentialId || ''
			appsParams.easAttestationId = navigation.to.params.easAttestationId || ''
			appsParams.easSchemaId = navigation.to.params.easSchemaId || ''
			appsParams.farcasterCastId = navigation.to.params.farcasterCastId || ''
			appsParams.farcasterCastShortId = navigation.to.params.farcasterCastShortId || ''
			appsParams.farcasterChannelId = navigation.to.params.farcasterChannelId || ''
			appsParams.farcasterUserId = navigation.to.params.farcasterUserId || ''
			appsParams.farcasterUserName = navigation.to.params.farcasterUserName || ''
			appsParams.ipfsContentId = navigation.to.params.ipfsContentId || ''
			appsParams.ipnsName = navigation.to.params.ipnsName || ''
			appsParams.ipfsContentPath = navigation.to.params.ipfsContentPath || ''
			appsParams.moxieAuctionId = navigation.to.params.moxieAuctionId || ''
			appsParams.moxieOrderId = navigation.to.params.moxieOrderId || ''
			appsParams.moxieSubjectId = navigation.to.params.moxieSubjectId || ''

			canNavigate = true
		}
	})

	$effect(() => {
		if(canNavigate && appsParams.derivedPath && appsParams.derivedPath !== get(page).url.pathname)
			goto(appsParams.derivedPath, { keepFocus: true })
	})

	beforeNavigate(navigation => {
		if(navigation.type === 'goto' && navigation.from && navigation.to && navigation.from.url.pathname === navigation.to.url.pathname)
			navigation.cancel()
		else if(!navigation.to?.route.id?.startsWith('/apps'))
			canNavigate = false
			{}
	})


	// Context

	import { appsContext } from './_appsContext.svelte'

	import { web3AppsBySection, getWeb3AppSupportedNetworks } from '$/data/web3Apps'

	// (Derived)
	const filteredWeb3AppsBySection = $derived(
		appsContext.network
			? web3AppsBySection
				.map(({title, apps}) => ({
					title,
					apps: apps.filter(app => !appsContext.network || app === appsContext.web3AppConfig || app.views.some(view => view.chainId === appsContext.network.chainId)),
				}))
				.filter(({apps}) => apps.length)
			: web3AppsBySection
	)


	// Internal state
	let _isTestnet: boolean


	// Side effects
	import { isTestnet, getNetworkColor } from '$/data/networks'

	$effect(() => {
		_isTestnet = appsContext.network && isTestnet(appsContext.network)
	})

	$effect(() => {
		if(_isTestnet)
			appsContext.showTestnets = true
	})

	const setSelectedNetwork = async (selectedNetwork: Ethereum.Network | undefined) => {
		appsParams.networkSlug = selectedNetwork?.slug ?? ''
	}

	$effect(() => {
		if(globalThis.document)
			document.documentElement.style.setProperty(
				'--primary-color',
				(
					appsContext.web3AppConfig?.colors?.[appsContext.web3AppConfig.colors.length / 2 | 0]
					|| getNetworkColor(appsContext.network)
					|| `var(--${tokenColors['ethereum']})`
				)
			)
	})


	// Components
	import CollapsibleToolbar from '$/components/CollapsibleToolbar.svelte'
	import InlineTransition from '$/components/InlineTransition.svelte'
	import NetworkIcon from '$/components/NetworkIcon.svelte'
	import NetworkSelect from '$/components/NetworkSelect.svelte'
	import Preferences from '$/components/Preferences.svelte'
	import TokenIcon from '$/components/TokenIcon.svelte'


	// Style/transitions
	import { fly, scale } from 'svelte/transition'
	import { expoOut } from 'svelte/easing'
	import { tokenColors } from '$/data/tokenColors'
</script>


<style>
	main {
		max-width: var(--one-column-width);
		grid-template-columns: 100%;

		min-height: 100vh;
		min-height: 100dvh;
		grid-template-rows: auto 1fr;
	}

	h1 {
		--icon-size: 1em;
		flex: 0 auto;
		margin-inline-end: auto;

		> a {
			--text-decoration-opacity: 0.05;
			text-decoration-thickness: 2px;
			text-underline-offset: 20%;
			line-height: 1.4;
		}
	}

	select {
		max-width: 11.5rem;
	}

	/* Alternative layout: move App <select> to right of <h1> */
	header {
		h1 {
			flex: 0 auto !important;

			+ :global(*) {
				flex: 1 !important;
			}

			+ :global(* > *) {
				flex: 1;
				flex-direction: row-reverse;
				justify-content: space-between;
			}
		}

		[data-app-select-label] span {
			display: none;
		}

		select {
			width: 0;
			margin: -0.5em;
			padding: 1em;

			background-position: center;
			background-color: transparent;
			color: white;
			outline: none;

			transition-property: filter;

			@media (prefers-color-scheme: dark) {
				:global(:root:not([data-color-scheme="light"])) & {
					filter: invert();
				}
			}
		}
	}

	.content {
		container: Content / inline-size;
		flex: 1;
	}
</style>


<main in:fly={{ x: 150, easing: expoOut }} out:fly={{ x: -150, easing: expoOut }}>
	<header>
		<CollapsibleToolbar>
			<svelte:fragment slot="title">
				<h1 class="row">
					<InlineTransition
						key={appsContext.web3AppConfig || appsContext.network}
						align="center"
						contentTransition={[scale, { duration: 400 }]}
					>
						{#if appsContext.web3AppConfig}
							{#if appsContext.web3AppConfig.icon}
								<img src={appsContext.web3AppConfig.icon} width="30" />
							{:else}
								{@const token = appsContext.web3AppConfig.views?.flatMap(view => view.erc20Tokens ?? [])[0]}

								{#if token}
									<TokenIcon
										{token}
									/>
								{:else}
									<img src="/Blockhead-Logo.svg" width="30" />
								{/if}
							{/if}
						{:else if appsContext.network}
							<NetworkIcon network={appsContext.network} />
						{:else}
							<img src="/Blockhead-Logo.svg" width="30" />
						{/if}
					</InlineTransition>

					<InlineTransition
						key={Boolean(appsParams.web3AppSlug && appsContext.web3AppConfig)}
						align="start"
						contentProps={{ class: '' }}
						contentTransition={{
							in: [scale, { duration: 400 }],
							out: [scale, { duration: 400 }],
						}}
					>
						{#if appsParams.web3AppSlug && appsContext.web3AppConfig}
							<a href={`/apps/${appsParams.web3AppSlug}`}>
								<InlineTransition
									key={appsContext.web3AppConfig}
									clip
									align="start"
									contentTransition={{
										in: [fly, { y: 20, duration: 400 }],
										out: [fly, { y: -20, duration: 400 }],
									}}
								>
									<mark>{appsContext.web3AppConfig.name}</mark>
								</InlineTransition>
							</a>

							<InlineTransition
								isOpen={appsContext.currentView !== 'Dashboard'}
								key={appsContext.currentView} 
								clip
								align="start"
								contentTransition={{
									in: [fly, { y: 20, duration: 400 }],
									out: [fly, { y: -20, duration: 400 }],
								}}
							>
								<span>{appsContext.currentView}</span>
							</InlineTransition>
						{:else}
							<InlineTransition
								isOpen={Boolean(appsContext.network)}
								key={appsContext.network}
								clip
								align="start"
								contentTransition={{
									in: [fly, { y: 20, duration: 400 }],
									out: [fly, { y: -20, duration: 400 }],
								}}
							>
								{#if appsContext.network}
									<a href={`/explorer/${appsContext.network.slug}`}>
										<mark>{appsContext.network.name}</mark>
									</a>
								{/if}
							</InlineTransition>

							<a href={`/apps/${appsParams.web3AppSlug}`}>
								Apps
							</a>
						{/if}
					</InlineTransition>
				</h1>
			</svelte:fragment>

			<div class="row wrap">
				<small>
					<label>
						<input type="checkbox" bind:checked={appsContext.showTestnets} disabled={_isTestnet} />
						<span>Testnets</span>
					</label>
				</small>

				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="row inline">
					<span>Network </span>

					<NetworkSelect
						network={appsContext.network}
						allowedNetworks={appsContext.web3AppConfig ? getWeb3AppSupportedNetworks(appsContext.web3AppConfig) : undefined}
						on:change={({ detail: { network } }) => setSelectedNetwork(network)}
						showTestnets={appsContext.showTestnets}
						placeholder="All Networks"
					/>
				</label>
			</div>

			<label
				data-app-select-label
				class="row inline"
			>
				<span>App</span>
				<select bind:value={appsParams.web3AppSlug}>
					<option value="" selected>All {appsContext.network ? `${appsContext.network.name} ` : ''}Apps</option>

					{#each filteredWeb3AppsBySection as {title, apps}}
						<optgroup label={title}>
							{#each apps as app}
								<option value={app.slug} style={`--primary-color: ${app.colors?.[0]}`}>{app.name}</option>
							{/each}
						</optgroup>
					{/each}
				</select>
			</label>
		</CollapsibleToolbar>
	</header>

	<div class="content stack">
		<slot />
	</div>
</main>

<Preferences
	relevantPreferences={
		appsParams.web3AppSlug === 'eas' ?
			[
				'theme',
				'transactionProvider',
				'ipfsGateway',
				'easProvider',
			]

		: appsParams.web3AppSlug === 'farcaster' ?
			[
				'theme',
				'farcasterProvider',
				'farcasterFeedProvider',
				'urlMetadataProvider',
			]

		: appsParams.web3AppSlug === 'ipfs' ?
			[
				'theme',
				'ipfsGateway',
			]

		: appsParams.web3AppSlug === 'moxie' ?
			[
				'theme',
				'farcasterProvider',
				'urlMetadataProvider',
			]

		:
			[
				'theme',
				'rpcNetwork', 'defiProvider', 'nftsProvider', 'currentPriceProvider', 'historicalPriceProvider', 'transactionProvider', 'erc20TokenProvider',
				'quoteCurrency'
			]
	}
/>
