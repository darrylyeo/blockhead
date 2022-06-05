<script lang="ts">
	import { writable } from 'svelte/store'
	import { page } from '$app/stores'
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'

	const networkSlug = writable<string>($page.params.networkSlug || '')
	const query = writable<string>($page.params.query || '')
	$: console.log('$page.params', $page.params)
	$: console.log('$query', $query)
	$: if('networkSlug' in $page.params)
		$networkSlug = $page.params.networkSlug || ''

	$: $query = $page.params.query || ''

	setContext('networkSlug', networkSlug)
	setContext('query', query)

	let path = $page.url.pathname
	$: if(browser){
		const newPath = `/explorer${$networkSlug ? `/${$networkSlug}${$query ? `/${$query}` : ''}` : ''}`
		console.log(newPath, path)
		if(newPath !== path)
			goto(newPath, {keepfocus: true})
	}


	import { preferences } from '../../data/ethereum/preferences'

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


	import type { Ethereum } from '../../data/ethereum/types'
	import { networksBySection, networksBySlug, testnetsForMainnets, isTestnet, getNetworkColor } from '../../data/ethereum/networks'
	import { derived } from 'svelte/store'
	import { onMount, setContext } from 'svelte'
	import { getEthersProvider } from '../../data/providers'


	// Explorer context stores

	const explorerNetwork = derived<typeof networkSlug, Ethereum.Network>(networkSlug, ($networkSlug, set) => {
		console.log('$networkSlug', $networkSlug)
		if(networksBySlug[$networkSlug])
			set(networksBySlug[$networkSlug])
	})
	setContext('explorerNetwork', explorerNetwork)

	const whenMounted = new Promise(r => onMount(r))
	const explorerProvider = derived<[typeof explorerNetwork, typeof preferences], Ethereum.Provider>([explorerNetwork, preferences], async ([$explorerNetwork, $preferences], set) => {
		await whenMounted
		if($explorerNetwork)
			set(await getEthersProvider({
				network: $explorerNetwork,
				networkProvider: $preferences.rpcNetwork
			}))
	})
	setContext('explorerProvider', explorerProvider)

	const blockNumber = derived<typeof explorerProvider, number>(explorerProvider, ($explorerProvider, set) => {
		const onBlock = blockNumber => set(blockNumber)
		if($explorerProvider){
			$explorerProvider.on('block', onBlock)
			return () => $explorerProvider.off('block', onBlock)
		}
	})
	setContext('blockNumber', blockNumber)


	// Preferences

	let showTestnets = false
	$: _isTestnet = $explorerNetwork && isTestnet($explorerNetwork)
	$: if(_isTestnet)
		showTestnets = true


	$: networkDisplayName =
		$explorerNetwork ? $explorerNetwork.name :
		$networkSlug ? $networkSlug[0].toUpperCase() + $networkSlug.slice(1) :
		'Networks'


	$: if(globalThis.document && $explorerNetwork)
		document.documentElement.style.setProperty('--primary-color', getNetworkColor($explorerNetwork))


	import { fly } from 'svelte/transition'
	import { tokenColors } from '../../data/token-colors'
	import Preferences from '../../components/Preferences.svelte'
	import InlineContainer from '../../components/InlineContainer.svelte'
	import NetworkIcon from '../../components/NetworkIcon.svelte'
</script>


<style>
	main {
		max-width: var(--one-column-width);
		grid-template-columns: 100%;
	}

	select {
		max-width: 11.5rem;
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
					{#key $networkSlug}<b in:fly={{y: 20, duration: 200}} out:fly={{y: -20, duration: 200}}><InlineContainer>{$networkSlug ? `${networkDisplayName} ` : `Blockchain `}</InlineContainer></b>{/key}
				</InlineContainer>
				Explorer
			</h1>
		</div>
		<small>
			<label>
				<span>Testnets: </span>
				<input type="checkbox" bind:checked={showTestnets} disabled={_isTestnet} />
			</label>
		</small>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<span>Blockchain: </span>
			<select bind:value={$networkSlug} on:input={() => globalThis.requestAnimationFrame(() => goto(`/explorer/${$networkSlug}${$query ? `/${$query}` : ''}`))}>
				<option value="" selected>Select Network...</option>

				{#each networksBySection as {title, networks}}
					<optgroup label={title}>
						{#each networks as network}
							{#if showTestnets}
								<option disabled>{network.name}</option>
								<option value={network.slug}>{network.name} Mainnet{network.chainId ? ` (${network.chainId})` : ''}</option>

								{#each testnetsForMainnets[network.slug] ?? [] as testnetNetwork}
									<option value={testnetNetwork.slug}>{testnetNetwork.name}{testnetNetwork.chainId ? ` (${testnetNetwork.chainId})` : ''}</option>
								{/each}
							{:else}
								<option value={network.slug} style={`--primary-color: ${getNetworkColor(network)}`}>{network.name}</option>
							{/if}
						{/each}
					</optgroup>
				{/each}

				<!-- {#if showTestnets}
					{#each networksBySection as {title, networks}}
						<option disabled>{title}</option>
						{#each networks as network}
							<optgroup label={network.name} style={`--primary-color: ${getNetworkColor(network)}`}>
								<option value={network.slug}>{network.name} Mainnet{network.chainId ? ` (${network.chainId})` : ''}</option>

								{#each testnetsForMainnets[network.slug] ?? [] as testnetNetwork}
									<option value={testnetNetwork.slug}>{testnetNetwork.name}{testnetNetwork.chainId ? ` (${testnetNetwork.chainId})` : ''}</option>
								{/each}
							</optgroup>
						{/each}
					{/each}
				{:else}
					{#each networksBySection as {title, networks}}
						<optgroup label={title}>
							{#each networks as network}
								<option value={network.slug} style={`--primary-color: ${getNetworkColor(network)}`}>{network.name}</option>
							{/each}
						</optgroup>
					{/each}
				{/if} -->
			</select>
		</label>
	</div>

	<div class="stack">
		{#key $networkSlug}
			<slot />
		{/key}
	</div>
</main>

<Preferences
	relevantPreferences={$relevantPreferences}
/>
