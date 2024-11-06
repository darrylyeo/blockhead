<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'

	// Params two-way binding
	import { explorerParams } from './_explorerParams.svelte'

	import { goto, beforeNavigate, afterNavigate } from '$app/navigation'
	import { page } from '$app/stores'
	import { get } from 'svelte/store'

	let canNavigate = $state(false)

	afterNavigate(navigation => {
		if(navigation.to?.route.id?.startsWith('/explorer') && navigation.to.params){
			explorerParams.networkSlug = navigation.to.params.networkSlug || navigation.to.url.pathname.match(/^\/explorer\/([^/]+)/)?.[1] || ''
			explorerParams.address = navigation.to.params.address || ''
			explorerParams.blockNumber = navigation.to.params.blockNumber && BigInt(navigation.to.params.blockNumber) || ''
			explorerParams.ensName = navigation.to.params.ensName || ''
			explorerParams.transactionId = navigation.to.params.transactionId || ''

			canNavigate = true
		}
	})

	$effect(() => {
		if(canNavigate && explorerParams.derivedPath && get(page).url.pathname !== explorerParams.derivedPath)
			goto(explorerParams.derivedPath, { keepFocus: true })
	})

	beforeNavigate(navigation => {
		if(navigation.type === 'goto' && navigation.from && navigation.to && navigation.from.url.pathname === navigation.to.url.pathname)
			navigation.cancel()
		else if(!navigation.to?.route.id?.startsWith('/explorer'))
			canNavigate = false
	})


	// Context
	import { explorerContext } from './_explorerContext.svelte'


	// Internal state
	let _isTestnet = $state<boolean>()


	// Actions
	const setSelectedNetwork = async (selectedNetwork: Ethereum.Network | undefined) => {
		explorerParams.networkSlug = selectedNetwork?.slug ?? ''
	}


	// Side effects
	import { isTestnet, getNetworkColor } from '$/data/networks'

	$effect(() => {
		_isTestnet = explorerContext.network && isTestnet(explorerContext.network)
	})

	$effect(() => {
		if(_isTestnet)
			explorerContext.showTestnets = true
	})

	const networkDisplayName = $derived(
		explorerParams.networkSlug && explorerContext.network ? explorerContext.network.name :
		explorerParams.networkSlug ? explorerParams.networkSlug[0].toUpperCase() + explorerParams.networkSlug.slice(1) :
		'Network'
	)

	$effect(() =>{
		if(globalThis.document && explorerContext.network)
			document.documentElement.style.setProperty('--primary-color', getNetworkColor(explorerContext.network))
	})


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
</style>


<main in:fly={{ x: 150, easing: expoOut }} out:fly={{ x: -150, easing: expoOut }}>
	<header>
		<CollapsibleToolbar>
			<svelte:fragment slot="title">
				<h1>
					<a
						href={`/explorer${explorerContext.network ? `/${explorerContext.network.slug}` : ''}`}
						class="row"
					>
						<InlineTransition
							key={explorerParams.networkSlug}
							align="center"
							contentTransition={[scale, { duration: 400 }]}
						>
							{#if explorerParams.networkSlug}
								<NetworkIcon network={explorerContext.network} />
							{:else}
								<img src="/Blockhead-Logo.svg" width="30" />
							{/if}
						</InlineTransition>

						<span>
							<InlineTransition
								key={explorerParams.networkSlug}
								align="start"
								clip
								contentTransition={{
									in: [fly, { y: 20, duration: 400 }],
									out: [fly, { y: -20, duration: 400 }]
								}}
							>{#if explorerParams.networkSlug}<mark>{networkDisplayName}</mark>{:else}{networkDisplayName}{/if}</InlineTransition>

							Explorer
						</span>
					</a>
				</h1>
			</svelte:fragment>

			<div class="row wrap">
				<small>
					<label>
						<input type="checkbox" bind:checked={explorerContext.showTestnets} disabled={_isTestnet} />
						<span>Testnets</span>
					</label>
				</small>

				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label>
					<span>Network: </span>
					<NetworkSelect
						network={explorerContext.network}
						on:change={({ detail: { network } }) => setSelectedNetwork(network)}
						showTestnets={explorerContext.showTestnets}
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
	relevantPreferences={explorerContext.relevantPreferences}
/>
