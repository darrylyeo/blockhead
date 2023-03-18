<script lang="ts">
	import type { Ethereum } from '../../data/networks/types'

	// Params two-way binding

	import { page } from '$app/stores'
	import { browser } from '$app/environment'
	import { goto, beforeNavigate } from '$app/navigation'

	import {
		networkSlug,
		query,
		derivedPath
	} from './_explorerParams'

	$: if($page.url.pathname.startsWith('/explorer')){
		$networkSlug = $page.params.networkSlug || $page.url.pathname.match(/^\/explorer\/([^/]+)/)?.[1] || ''
		$query = $page.params.query || ''
	}

	$: if(browser)
		goto($derivedPath, {keepfocus: true})

	beforeNavigate(({from, to, cancel}) => {
		if(from.url.pathname === to.url.pathname)
			cancel()
	})


	// Context

	import { explorerNetwork } from './_explorerContext'

	import { setContext } from 'svelte'
	import { writable } from 'svelte/store'

	const relevantPreferences = writable<string[]>()
	$: $relevantPreferences = $relevantPreferences || [
		'theme',
		...($query
			? ['rpcNetwork', 'tokenBalancesProvider', 'transactionProvider']
			: ['rpcNetwork', 'currentPriceProvider', 'historicalPriceProvider']
		),
		'quoteCurrency'
	]
	setContext('relevantPreferences', relevantPreferences)


	// Internal state

	let selectedNetwork: Ethereum.Network = $explorerNetwork

	let _isTestnet: boolean

	let showTestnets = false


	// Side effects

	$: if(selectedNetwork)
		$networkSlug = selectedNetwork.slug

	import { isTestnet, getNetworkColor, networksBySlug, networksByChainID } from '../../data/networks'

	$: _isTestnet = $explorerNetwork && isTestnet($explorerNetwork)

	$: if(_isTestnet)
		showTestnets = true

	$: networkDisplayName =
		$explorerNetwork ? $explorerNetwork.name :
		$networkSlug ? $networkSlug[0].toUpperCase() + $networkSlug.slice(1) :
		'Networks'

	$: if(globalThis.document && $explorerNetwork)
		document.documentElement.style.setProperty('--primary-color', getNetworkColor($explorerNetwork))


	// Components

	import AccountConnections from '../../components/AccountConnections.svelte'
	import NetworkSelect from '../../components/NetworkSelect.svelte'
	import Preferences from '../../components/Preferences.svelte'
	import InlineContainer from '../../components/InlineContainer.svelte'
	import NetworkIcon from '../../components/NetworkIcon.svelte'


	// Style/transitions

	import { fly } from 'svelte/transition'
</script>


<style>
	main {
		max-width: var(--one-column-width);
		grid-template-columns: 100%;
	}

	.title {
		gap: 0.66em;
	}
	.title-icon {
		display: inline-flex;
		align-items: center;
		font-size: 1.5em;
	}
</style>


<svelte:head>
	<title>{$query ? `${$query} | ` : ''}{$networkSlug ? `${networkDisplayName} Explorer` : `Explorer`} | Blockhead</title>
</svelte:head>


<main in:fly={{x: 300}} out:fly={{x: -300}}>
<!-- <main> -->
	<div class="bar">
		<div class="title row">
			<span class="title-icon">
				{#key $networkSlug}
					{#if $networkSlug}
						<NetworkIcon network={$explorerNetwork} />
					{:else}
						<img src="/Blockhead-Logo.svg" width="30" />
					{/if}
				{/key}
			</span>
			<h1>
				<InlineContainer class="stack-inline align-end" clip>
					{#key $networkSlug}<b in:fly|local={{y: 20, duration: 200}} out:fly|local={{y: -20, duration: 200}}><InlineContainer>{$networkSlug ? `${networkDisplayName} ` : `Blockchain `}</InlineContainer></b>{/key}
				</InlineContainer>
				Explorer
			</h1>
		</div>

		<small>
			<label>
				<input type="checkbox" bind:checked={showTestnets} disabled={_isTestnet} />
				<span>Testnets</span>
			</label>
		</small>

		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<span>Network: </span>
			<NetworkSelect
				bind:network={selectedNetwork}
				{showTestnets}
			/>
		</label>
	</div>

	<div class="stack">
		<slot />
	</div>
</main>

<aside hidden>
	<section class="column">
		<AccountConnections />
	</section>
</aside>

<Preferences
	relevantPreferences={$relevantPreferences}
/>
