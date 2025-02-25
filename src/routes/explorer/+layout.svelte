<script lang="ts">
	// Types
	import type { Ethereum } from '$/data/networks/types'
	import type { ENS } from '$/api/ens'


	// Params two-way binding
	import {
		networkSlug,

		address,
		blockNumber,
		ensName,
		transactionId,
		filecoinTipsetCid,
		filecoinBlockCid,

		derivedPath
	} from './_explorerParams'

	import { goto, beforeNavigate, afterNavigate } from '$app/navigation'
	import { page } from '$app/stores'
	import { get } from 'svelte/store'

	let canNavigate = false

	afterNavigate(navigation => {
		if(navigation.to?.route.id?.startsWith('/explorer') && navigation.to.params){
			const { params } = navigation.to

			$networkSlug = 'networkSlug' in params ? params.networkSlug : navigation.to.url.pathname.match(/^\/explorer\/([^/]+)/)?.[1] ?? undefined
			$address = 'address' in params ? params.address as Ethereum.Address : undefined
			$blockNumber = 'blockNumber' in params ? BigInt(params.blockNumber) : undefined
			$ensName = 'ensName' in params ? params.ensName as ENS.Name : undefined
			$transactionId = 'transactionId' in params ? params.transactionId as Ethereum.TransactionId : undefined
			$filecoinTipsetCid = 'filecoinTipsetCid' in params ? params.filecoinTipsetCid : undefined
			$filecoinBlockCid = 'filecoinBlockCid' in params ? params.filecoinBlockCid : undefined

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
	import { isTestnet, getNetworkColor } from '$/data/networks'

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
	import Icon from '$/components/Icon.svelte'
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
						href={`/explorer${$explorerNetwork ? `/${$explorerNetwork.slug}` : ''}`}
						class="row"
					>
						<InlineTransition
							key={$networkSlug}
							align="center"
							contentTransition={[scale, { duration: 400 }]}
						>
							{#if $networkSlug}
								<NetworkIcon network={$explorerNetwork} />
							{:else}
								<Icon imageSources={['/Blockhead-Logo.svg']} />
							{/if}
						</InlineTransition>

						<span>
							<InlineTransition
								key={$networkSlug}
								align="start"
								clip
								contentTransition={{
									in: [fly, { y: 20, duration: 400 }],
									out: [fly, { y: -20, duration: 400 }]
								}}
							>{#if $networkSlug}<mark>{networkDisplayName}</mark>{:else}{networkDisplayName}{/if}</InlineTransition>

							Explorer
						</span>
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
