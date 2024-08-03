<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'

	// Params two-way binding
	import {
		networkSlug,

		address,
		blockNumber,
		ensName,
		transactionId,

		derivedPath
	} from './_explorerParams'

	import { goto, beforeNavigate, afterNavigate } from '$app/navigation'
	import { page } from '$app/stores'
	import { get } from 'svelte/store'

	let canNavigate = false

	afterNavigate(navigation => {
		if(navigation.to?.route.id?.startsWith('/explorer') && navigation.to.params){
			$networkSlug = navigation.to.params.networkSlug || navigation.to.url.pathname.match(/^\/explorer\/([^/]+)/)?.[1] || ''
			$address = navigation.to.params.address || ''
			$blockNumber = navigation.to.params.blockNumber || ''
			$ensName = navigation.to.params.ensName || ''
			$transactionId = navigation.to.params.transactionId || ''

			canNavigate = true
		}
	})

	$: if(canNavigate && $derivedPath && get(page).url.pathname !== $derivedPath)
		goto($derivedPath, { keepFocus: true })

	beforeNavigate(navigation => {
		if(navigation.type === 'goto' && navigation.from && navigation.to && navigation.from.url.pathname === navigation.to.url.pathname)
			navigation.cancel()
		else if(!navigation.to?.route.id?.startsWith('/explorer'))
			canNavigate = false
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
	import { isTestnet, getNetworkColor, networkBySlug, networkByChainId } from '$/data/networks'

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
