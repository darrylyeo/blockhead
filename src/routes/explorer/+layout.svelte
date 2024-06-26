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
	let _isTestnet: boolean


	// Actions
	const setSelectedNetwork = async (selectedNetwork: Ethereum.Network | undefined) => {
		$networkSlug = selectedNetwork?.slug ?? ''
	}


	// Side effects
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
	import CollapsibleToolbar from '$/components/CollapsibleToolbar.svelte'
	import NetworkSelect from '$/components/NetworkSelect.svelte'
	import Preferences from '$/components/Preferences.svelte'
	import InlineTransition from '$/components/InlineTransition.svelte'
	import NetworkIcon from '$/components/NetworkIcon.svelte'


	// Style/transitions
	import { fly, scale } from 'svelte/transition'
	import { expoOut } from 'svelte/easing'
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
		font-size: 1.5em;
	}
</style>


<main in:fly={{ x: 150, easing: expoOut }} out:fly={{ x: -150, easing: expoOut }}>
	<header>
		<CollapsibleToolbar>
			<svelte:fragment slot="title">
				<div class="title row">
					<InlineTransition
						key={$networkSlug}
						align="center"
						contentTransition={[scale, { duration: 400 }]}
					>
						<span class="row title-icon">
							{#if $networkSlug}
								<NetworkIcon network={$explorerNetwork} />
							{:else}
								<img src="/Blockhead-Logo.svg" width="30" />
							{/if}
						</span>
					</InlineTransition>

					<h1>
						<InlineTransition
							key={$networkSlug}
							align="start"
							clip
							contentTransition={{
								in: [fly, { y: 20, duration: 400 }],
								out: [fly, { y: -20, duration: 400 }]
							}}
						>{networkDisplayName}</InlineTransition>
						Explorer
					</h1>
				</div>
			</svelte:fragment>

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
						network={$explorerNetwork}
						on:change={({ detail: { network } }) => setSelectedNetwork(network)}
						showTestnets={$showTestnets}
					/>
				</label>
			</div>
		</CollapsibleToolbar>
	</header>

	<div class="stack">
		<slot />
	</div>
</main>

<Preferences
	relevantPreferences={$relevantPreferences}
/>
