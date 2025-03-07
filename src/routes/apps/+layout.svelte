<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'

	import type { Web3AppSlug } from '$/data/web3Apps'
	import type { AccountId } from '$/data/accountId'
	import type { EasAttestationId, EasSchemaId } from '$/api/eas'
	import type { FarcasterCastId, FarcasterCastShortId, FarcasterChannelId, FarcasterUserId, FarcasterUserName } from '$/api/farcaster'
	import type { IpfsCid } from '$/api/ipfs/contentId'
	import type { IpnsName } from '$/api/ipfs/ipns'
	import type { MoxieAuctionId, MoxieOrderId } from '$/api/moxie'
	import type { MoxieSubjectId } from '$/api/moxie'


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

		moxieAuctionId,
		moxieOrderId,
		moxieSubjectId,

		derivedPath,
	} from './_appsParams'

	import { goto, beforeNavigate, afterNavigate } from '$app/navigation'
	import { page } from '$app/stores'
	import { get } from 'svelte/store'

	let canNavigate = false

	afterNavigate(navigation => {
		if(navigation.to?.route.id?.startsWith('/apps') && navigation.to.params){
			const { params } = navigation.to

			$web3AppSlug = 'web3AppSlug' in params ? params.web3AppSlug as Web3AppSlug : navigation.to.url.pathname.match(/^\/apps\/(audius|ceramic|disco|eas|ens|farcaster|ipfs|lens|moxie|uniswap)/)?.[1] as Web3AppSlug ?? undefined
			$networkSlug = 'networkSlug' in params ? params.networkSlug : undefined
			$accountId = 'accountId' in params ? params.accountId as AccountId : undefined
			$audiusQuery = 'audiusQuery' in params ? params.audiusQuery : undefined
			$audiusPlaylistId = 'audiusPlaylistId' in params ? params.audiusPlaylistId : undefined
			$audiusTrackId = 'audiusTrackId' in params ? params.audiusTrackId : undefined
			$audiusUserId = 'audiusUserId' in params ? params.audiusUserId : undefined
			$didUrl = 'didUrl' in params ? params.didUrl as DidUrl : undefined
			$discoCredentialId = 'discoCredentialId' in params ? params.discoCredentialId as ReturnType<typeof crypto.randomUUID> : undefined
			$easAttestationId = 'easAttestationId' in params ? params.easAttestationId as EasAttestationId : undefined
			$easSchemaId = 'easSchemaId' in params ? params.easSchemaId as EasSchemaId : undefined
			$farcasterCastId = 'farcasterCastId' in params ? params.farcasterCastId as FarcasterCastId : undefined
			$farcasterCastShortId = 'farcasterCastShortId' in params ? params.farcasterCastShortId as FarcasterCastShortId : undefined
			$farcasterChannelId = 'farcasterChannelId' in params ? params.farcasterChannelId as FarcasterChannelId : undefined
			$farcasterUserId = 'farcasterUserId' in params ? Number(params.farcasterUserId) as FarcasterUserId : undefined
			$farcasterUserName = 'farcasterUserName' in params ? params.farcasterUserName as FarcasterUserName : undefined
			$ipfsContentId = 'ipfsContentId' in params ? params.ipfsContentId as IpfsCid : undefined
			$ipnsName = 'ipnsName' in params ? params.ipnsName as IpnsName : undefined
			$ipfsContentPath = 'ipfsContentPath' in params ? params.ipfsContentPath : undefined
			$moxieAuctionId = 'moxieAuctionId' in params ? params.moxieAuctionId as MoxieAuctionId : undefined
			$moxieOrderId = 'moxieOrderId' in params ? params.moxieOrderId as MoxieOrderId : undefined
			$moxieSubjectId = 'moxieSubjectId' in params ? params.moxieSubjectId as MoxieSubjectId : undefined

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

	import { isTestnet, getNetworkColor } from '$/data/networks'

	$: _isTestnet = $network && isTestnet($network)

	$: if(_isTestnet)
		$showTestnets = true

	const setSelectedNetwork = async (selectedNetwork: Ethereum.Network | undefined) => {
		$networkSlug = selectedNetwork?.slug ?? ''
	}

	$: if(globalThis.document)
		document.documentElement.style.setProperty(
			'--primary-color',
			(
				$web3AppConfig?.colors?.[$web3AppConfig.colors.length / 2 | 0]
				|| getNetworkColor($network)
				|| `var(--${tokenColors['ethereum']})`
			)
		)


	// Components
	import CollapsibleToolbar from '$/components/CollapsibleToolbar.svelte'
	import Icon from '$/components/Icon.svelte'
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
						key={$web3AppConfig || $network}
						align="center"
						contentTransition={[scale, { duration: 400 }]}
					>
						{#if $web3AppConfig}
							{#if $web3AppConfig.icon}
								<Icon imageSources={[$web3AppConfig.icon]} />
							{:else}
								{@const token = $web3AppConfig.views?.flatMap(view => view.erc20Tokens ?? [])[0]}

								{#if token}
									<TokenIcon
										{token}
									/>
								{:else}
									<Icon imageSources={['/Blockhead-Logo.svg']} />
								{/if}
							{/if}
						{:else if $network}
							<NetworkIcon network={$network} />
						{:else}
							<Icon imageSources={['/Blockhead-Logo.svg']} />
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
							<a href={`/apps/${$web3AppSlug}`}>
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
							</a>

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
									<a href={`/explorer/${$network.slug}`}>
										<mark>{$network.name}</mark>
									</a>
								{/if}
							</InlineTransition>

							<a href={`/apps`}>
								Apps
							</a>
						{/if}
					</InlineTransition>
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
					<option value="" selected>All {$network ? `${$network.name} ` : ''}Apps</option>

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

		: $web3AppSlug === 'moxie' ?
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
	relevantNetwork={$network}
/>
