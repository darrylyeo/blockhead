<script lang="ts">
	// Constants/types
	import type { Ethereum } from '$/data/networks/types'


	// Params two-way binding

	import { page } from '$app/stores'
	import { browser } from '$app/environment'
	import { goto, beforeNavigate } from '$app/navigation'

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

		farcasterCastId,
		farcasterCastShortId,
		farcasterChannelSlug,
		farcasterUserId,
		farcasterUserName,

		ipfsContentId,
		ipnsName,
		ipfsContentPath,

		derivedPath,
	} from './_appsParams'

	$: if($page.url.pathname.startsWith('/apps')){
		$web3AppSlug = $page.params.web3AppSlug || $page.url.pathname.match(/^\/apps\/(audius|ceramic|disco|ens|farcaster|ipfs|lens|uniswap)/)?.[1] || ''
		$networkSlug = $page.params.networkSlug || ''
		$accountId = $page.params.accountId || ''
		$audiusQuery = $page.params.audiusQuery || ''
		$audiusPlaylistId = $page.params.audiusPlaylistId || ''
		$audiusTrackId = $page.params.audiusTrackId || ''
		$audiusUserId = $page.params.audiusUserId || ''
		$didUrl = $page.params.didUrl || ''
		$discoCredentialId = $page.params.discoCredentialId || ''
		$farcasterCastId = $page.params.farcasterCastId || ''
		$farcasterCastShortId = $page.params.farcasterCastShortId || ''
		$farcasterChannelSlug = $page.params.farcasterChannelSlug || ''
		$farcasterUserId = $page.params.farcasterUserId || ''
		$farcasterUserName = $page.params.farcasterUserName || ''
		$ipfsContentId = $page.params.ipfsContentId || ''
		$ipnsName = $page.params.ipnsName || ''
		$ipfsContentPath = $page.params.ipfsContentPath || ''
	}

	$: if(browser) goto($derivedPath, { keepfocus: true })

	beforeNavigate(({from, to, cancel}) => {
		if(from?.url.pathname === to?.url.pathname)
			cancel()
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
	import NetworkIcon from '$/components/NetworkIcon.svelte'
	import NetworkSelect from '$/components/NetworkSelect.svelte'
	import Preferences from '$/components/Preferences.svelte'
	import TokenIcon from '$/components/TokenIcon.svelte'
	import InlineContainer from '$/components/InlineContainer.svelte'


	// Style/transitions

	import { fly, scale } from 'svelte/transition'
	import { tokenColors } from '$/data/tokenColors'
</script>


<style>
	main {
		max-width: var(--one-column-width);
		grid-template-columns: 100%;

		min-height: 100vh;
		grid-template-rows: auto 1fr;
	}

	select {
		max-width: 11.5rem;
	}

	.stack {
		flex: 1;
	}


	.title-icon {
		display: inline-flex;
		align-items: center;
		font-size: 1.5em;
	}
</style>


<main in:fly|global={{x: 300}} out:fly|global={{x: -300}}>
<!-- <main> -->
	<div class="bar wrap">
		<div class="title row">
			<span class="stack-inline">
				{#key $web3AppConfig}{#key $network}
					<span class="title-icon" in:scale={{ duration: 300 }} out:scale={{ duration: 300 }}>
						{#if $web3AppConfig}
							{#if $web3AppConfig.icon}
								<img src={$web3AppConfig.icon} width="30" />
							{:else}
								{@const erc20Token = $web3AppConfig.views?.flatMap(view => view.erc20Tokens ?? [])[0]}

								{#if erc20Token}
									<TokenIcon {erc20Token} />
								{:else}
									<img src="/Blockhead-Logo.svg" width="30" />
								{/if}
							{/if}
						{:else if $network}
							<NetworkIcon network={$network} />
						{:else}
							<img src="/Blockhead-Logo.svg" width="30" />
						{/if}
					</span>
				{/key}{/key}
			</span>

			<h1>
				<a href="/apps/{$web3AppSlug}" class="stack-inline">
					{#if $web3AppSlug && $web3AppConfig}
						<span in:fly|global={{y: 20, duration: 200}} out:fly|global={{y: -20, duration: 200}}>
							<InlineContainer class="stack-inline" clip>
								{#key $web3AppConfig}<mark in:fly|global={{y: 20, duration: 200}} out:fly|global={{y: -20, duration: 200}}>{$web3AppConfig.name}</mark>{/key}
							</InlineContainer>

							{#if $currentView !== 'Dashboard'}
								<InlineContainer class="stack-inline" clip>
									{#key $currentView}<span in:fly|global={{y: 20, duration: 200}} out:fly|global={{y: -20, duration: 200}}>{$currentView}</span>{/key}
								</InlineContainer>
							{/if}
						</span>
					{:else}
						<span in:fly|global={{y: 20, duration: 200}} out:fly|global={{y: -20, duration: 200}}>
							{#if $network}
								<InlineContainer class="stack-inline" clip>
									{#key $network}<span in:fly|global={{y: 20, duration: 200}} out:fly|global={{y: -20, duration: 200}}>{$network.name}</span>{/key}
								</InlineContainer>
							{/if}

							Apps
						</span>
					{/if}
				</a>
			</h1>
		</div>

		<div class="row wrap">
			<small>
				<label>
					<input type="checkbox" bind:checked={$showTestnets} disabled={_isTestnet} />
					<span>Testnets</span>
				</label>
			</small>

			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label>
				<span>Network: </span>
				<NetworkSelect
					network={$network}
					allowedNetworks={$web3AppConfig ? getWeb3AppSupportedNetworks($web3AppConfig) : undefined}
					on:change={({ detail: { network } }) => setSelectedNetwork(network)}
					showTestnets={$showTestnets}
					placeholder="All Networks"
				/>
			</label>
		</div>

		<label>
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
	</div>

	<div class="stack">
		<slot />
	</div>
</main>

<Preferences
	relevantPreferences={
		$web3AppSlug === 'farcaster' ? [
			'theme',
			'farcasterProvider',
		] : $web3AppSlug === 'ipfs' ? [
			'theme',
			'ipfsGateway',
		] : [
			'theme',
			'rpcNetwork', 'defiProvider', 'nftsProvider', 'currentPriceProvider', 'historicalPriceProvider', 'transactionProvider',
			'quoteCurrency'
		]
	}
/>
