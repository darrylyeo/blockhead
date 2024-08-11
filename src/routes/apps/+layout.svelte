<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'


	// Params two-way binding
	import {
		web3AppSlug,
		networkSlug,
		accountId,

		audiusQuery,
		audiusPlaylistId,
		audiusTrackId,
		audiusUserId,

		didUrl,
		discoCredentialId,

		easAttestationId,
		easSchemaId,

		farcasterCastId,
		farcasterCastShortId,
		farcasterChannelId,
		farcasterUserId,
		farcasterUserName,

		ipfsContentId,
		ipnsName,
		ipfsContentPath,

		derivedPath,
	} from './_appsParams'

	import { goto, beforeNavigate, afterNavigate } from '$app/navigation'
	import { page } from '$app/stores'
	import { get } from 'svelte/store'

	let canNavigate = false

	afterNavigate(navigation => {
		if(navigation.to?.route.id?.startsWith('/apps') && navigation.to.params){
			$web3AppSlug = navigation.to.params.web3AppSlug || navigation.to.url.pathname.match(/^\/apps\/(audius|ceramic|disco|eas|ens|farcaster|ipfs|lens|uniswap)/)?.[1] || ''
			$networkSlug = navigation.to.params.networkSlug || ''
			$accountId = navigation.to.params.accountId || ''
			$audiusQuery = navigation.to.params.audiusQuery || ''
			$audiusPlaylistId = navigation.to.params.audiusPlaylistId || ''
			$audiusTrackId = navigation.to.params.audiusTrackId || ''
			$audiusUserId = navigation.to.params.audiusUserId || ''
			$didUrl = navigation.to.params.didUrl || ''
			$discoCredentialId = navigation.to.params.discoCredentialId || ''
			$easAttestationId = navigation.to.params.easAttestationId || ''
			$easSchemaId = navigation.to.params.easSchemaId || ''
			$farcasterCastId = navigation.to.params.farcasterCastId || ''
			$farcasterCastShortId = navigation.to.params.farcasterCastShortId || ''
			$farcasterChannelId = navigation.to.params.farcasterChannelId || ''
			$farcasterUserId = navigation.to.params.farcasterUserId || ''
			$farcasterUserName = navigation.to.params.farcasterUserName || ''
			$ipfsContentId = navigation.to.params.ipfsContentId || ''
			$ipnsName = navigation.to.params.ipnsName || ''
			$ipfsContentPath = navigation.to.params.ipfsContentPath || ''

			canNavigate = true
		}
	})

	$: if(canNavigate && $derivedPath && $derivedPath !== get(page).url.pathname)
		goto($derivedPath, { keepFocus: true })

	beforeNavigate(navigation => {
		if(navigation.type === 'goto' && navigation.from && navigation.to && navigation.from.url.pathname === navigation.to.url.pathname)
			navigation.cancel()
		else if(!navigation.to?.route.id?.startsWith('/apps'))
			canNavigate = false
	})


	// Context

	import {
		web3AppConfig,
		network,
		currentView,
		showTestnets,
		title,
	} from './_appsContext'

	import { web3AppsBySection, getWeb3AppSupportedNetworks } from '$/data/web3Apps'

	// (Derived)

	$: filteredWeb3AppsBySection =
		$network
			? web3AppsBySection
				.map(({title, apps}) => ({
					title,
					apps: apps.filter(app => !$network || app === $web3AppConfig || app.views.some(view => view.chainId === $network.chainId)),
				}))
				.filter(({apps}) => apps.length)
			: web3AppsBySection


	// Internal state
	let _isTestnet: boolean


	// Side effects

	import { isTestnet } from '$/data/networks'

	$: _isTestnet = $network && isTestnet($network)

	$: if(_isTestnet)
		$showTestnets = true

	const setSelectedNetwork = async (selectedNetwork: Ethereum.Network | undefined) => {
		$networkSlug = selectedNetwork?.slug ?? ''
	}

	$: if(globalThis.document)
		document.documentElement.style.setProperty('--primary-color', $web3AppConfig?.colors?.[$web3AppConfig.colors.length / 2 | 0] || `var(--${tokenColors['ethereum']})`)


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
		h1 + :global(*) {
			flex: 1;
		}

		h1 + :global(* > *) {
			flex: 1;
			flex-direction: row-reverse;
			justify-content: space-between;
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
				<h1>
					<a
						href={`/apps/${$web3AppSlug}`}
						class="row"
					>
						<InlineTransition
							key={$web3AppConfig || $network}
							align="center"
							contentTransition={[scale, { duration: 400 }]}
						>
							{#if $web3AppConfig}
								{#if $web3AppConfig.icon}
									<img src={$web3AppConfig.icon} width="30" />
								{:else}
									{@const token = $web3AppConfig.views?.flatMap(view => view.erc20Tokens ?? [])[0]}

									{#if token}
										<TokenIcon
											{token}
										/>
									{:else}
										<img src="/Blockhead-Logo.svg" width="30" />
									{/if}
								{/if}
							{:else if $network}
								<NetworkIcon network={$network} />
							{:else}
								<img src="/Blockhead-Logo.svg" width="30" />
							{/if}
						</InlineTransition>

						<InlineTransition
							key={Boolean($web3AppSlug && $web3AppConfig)}
							align="start"
							contentProps={{ class: '' }}
							contentTransition={{
								in: [scale, { duration: 400 }],
								out: [scale, { duration: 400 }],
							}}
						>
							{#if $web3AppSlug && $web3AppConfig}
								<InlineTransition
									key={$web3AppConfig}
									clip
									align="start"
									contentTransition={{
										in: [fly, { y: 20, duration: 400 }],
										out: [fly, { y: -20, duration: 400 }],
									}}
								>
									<mark>{$web3AppConfig.name}</mark>
								</InlineTransition>

								<InlineTransition
									isOpen={$currentView !== 'Dashboard'}
									key={$currentView} 
									clip
									align="start"
									contentTransition={{
										in: [fly, { y: 20, duration: 400 }],
										out: [fly, { y: -20, duration: 400 }],
									}}
								>
									<span>{$currentView}</span>
								</InlineTransition>
							{:else}
								<InlineTransition
									isOpen={Boolean($network)}
									key={$network}
									clip
									align="start"
									contentTransition={{
										in: [fly, { y: 20, duration: 400 }],
										out: [fly, { y: -20, duration: 400 }],
									}}
								>
									{#if $network}
										<span>{$network.name}</span>
									{/if}
								</InlineTransition>

								Apps
							{/if}
						</InlineTransition>
					</a>
				</h1>
			</svelte:fragment>

			<div class="row wrap">
				<small>
					<label>
						<input type="checkbox" bind:checked={$showTestnets} disabled={_isTestnet} />
						<span>Testnets</span>
					</label>
				</small>

				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="row inline">
					<span>Network </span>

					<NetworkSelect
						network={$network}
						allowedNetworks={$web3AppConfig ? getWeb3AppSupportedNetworks($web3AppConfig) : undefined}
						on:change={({ detail: { network } }) => setSelectedNetwork(network)}
						showTestnets={$showTestnets}
						placeholder="All Networks"
					/>
				</label>
			</div>

			<label
				data-app-select-label
				class="row inline"
			>
				<span>App</span>
				<select bind:value={$web3AppSlug}>
					<option value="" selected>Select App...</option>

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
		$web3AppSlug === 'eas' ?
			[
				'theme',
				'transactionProvider',
				'ipfsGateway',
				'easProvider',
			]

		: $web3AppSlug === 'farcaster' ?
			[
				'theme',
				'farcasterProvider',
				'farcasterFeedProvider',
				'urlMetadataProvider',
			]

		: $web3AppSlug === 'ipfs' ?
			[
				'theme',
				'ipfsGateway',
			]

		:
			[
				'theme',
				'rpcNetwork', 'defiProvider', 'nftsProvider', 'currentPriceProvider', 'historicalPriceProvider', 'transactionProvider',
				'quoteCurrency'
			]
	}
/>
