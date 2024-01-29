<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'

	// Params two-way binding

	import { page } from '$app/stores'
	import { browser } from '$app/environment'
	import { goto, beforeNavigate } from '$app/navigation'

	import {
		networkSlug,

		address,
		blockNumber,
		ensName,
		transactionId,

		derivedPath
	} from './_explorerParams'

	import { explorerQueryType, ExplorerQueryType, explorerQuery } from './_explorerContext'

	$: if($page.url.pathname.startsWith('/explorer')){
		$networkSlug = $page.params.networkSlug || $page.url.pathname.match(/^\/explorer\/([^/]+)/)?.[1] || ''
		$address = $page.params.address || ''
		$blockNumber = $page.params.blockNumber || ''
		$ensName = $page.params.ensName || ''
		$transactionId = $page.params.transactionId || ''
	}

	$: if(browser) goto($derivedPath, { keepFocus: true })

	beforeNavigate(({from, to, cancel}) => {
		if(from?.url.pathname === to?.url.pathname)
			cancel()
	})


	// Context
	import { explorerNetwork, showTestnets, relevantPreferences } from './_explorerContext'


	// Internal state

	let selectedNetwork: Ethereum.Network = $explorerNetwork

	let _isTestnet: boolean


	// Side effects

	$: if(selectedNetwork)
		$networkSlug = selectedNetwork.slug

	import { isTestnet, getNetworkColor, networksBySlug, networksByChainID } from '$/data/networks'

	$: _isTestnet = $explorerNetwork && isTestnet($explorerNetwork)

	$: if(_isTestnet)
		$showTestnets = true

	$: networkDisplayName =
		$networkSlug && $explorerNetwork ? $explorerNetwork.name :
		$networkSlug ? $networkSlug[0].toUpperCase() + $networkSlug.slice(1) :
		'Network'

	$: if(globalThis.document && $explorerNetwork)
		document.documentElement.style.setProperty('--primary-color', getNetworkColor($explorerNetwork))


	// Components
	import NetworkSelect from '$/components/NetworkSelect.svelte'
	import Preferences from '$/components/Preferences.svelte'
	import InlineContainer from '$/components/InlineContainer.svelte'
	import NetworkIcon from '$/components/NetworkIcon.svelte'


	// Style/transitions

	import { fly, scale } from 'svelte/transition'
</script>


<style>
	main {
		max-width: var(--one-column-width);
		grid-template-columns: 100%;
	}

	.title {
		gap: 0.66em;
		align-items: center;
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
				{#key $networkSlug}
					<span class="title-icon" in:scale={{ duration: 300 }} out:scale={{ duration: 300 }}>
						{#if $networkSlug}
							<NetworkIcon network={$explorerNetwork} />
						{:else}
							<img src="/Blockhead-Logo.svg" width="30" />
						{/if}
					</span>
				{/key}
			</span>
			<h1>
				<InlineContainer class="stack-inline align-end" clip>{#key $networkSlug}<b in:fly={{y: 20, duration: 200}} out:fly={{y: -20, duration: 200}}><InlineContainer isOpen={networkDisplayName}>{networkDisplayName} </InlineContainer></b>{/key}</InlineContainer>
				Explorer
			</h1>
		</div>

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
				bind:network={selectedNetwork}
				showTestnets={$showTestnets}
			/>
		</label>
	</div>

	<div class="stack">
		<slot />
	</div>
</main>

<Preferences
	relevantPreferences={$relevantPreferences}
/>
