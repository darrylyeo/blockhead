<script lang="ts">
	import { writable } from 'svelte/store'
	import { page } from '$app/stores'
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'

	const networkSlug = writable<string>($page.params.networkSlug || 'ethereum')
	const query = writable<string>($page.params.query || '')
	$: console.log('$page.params', $page.params)
	$: console.log('$query', $query)
	$: if('networkSlug' in $page.params)
		$networkSlug = $page.params.networkSlug || 'ethereum'
	$: $query = $page.params.query || ''

	setContext('networkSlug', networkSlug)
	setContext('query', query)

	let path = $page.path
	$: if(browser){
		const newPath = `/explorer${$networkSlug ? `/${$networkSlug}${$query ? `/${$query}` : ''}` : ''}`
		console.log(newPath, path)
		if(newPath !== path)
			goto(newPath, {keepfocus: true})
	}


	import type { Ethereum } from '../../data/ethereum/types'
	import { preferences } from '../../data/ethereum/preferences'
	import { networks, networksBySlug, testnetsForMainnets, isTestnet } from '../../data/ethereum/networks'
	import { derived } from 'svelte/store'
	import { onMount, setContext } from 'svelte'
	import { getEthersProvider } from '../../data/ethereum/provider'


	const topNetworks = [
		'ethereum',
		'polygon',
		'avalanche',
		'xdai',
		'fantom',
		'bsc',
		'arbitrum-one',
		'arbitrum-xdai',
		'metis',
		'optimism',
		// 'oasis-paratime',
		'bitcoin'
	].map(slug => networksBySlug[slug])

	const otherNetworks = networks.filter(network =>
		!topNetworks.includes(network)
		&& !Object.values(testnetsForMainnets).some(testnetNetworks => testnetNetworks.includes(network))
	)


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
			set(await getEthersProvider($explorerNetwork, $preferences.rpcNetwork))
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

	let showTestnets = isTestnet($explorerNetwork)


	$: networkDisplayName = $explorerNetwork ? $explorerNetwork.name : $networkSlug[0].toUpperCase() + $networkSlug.slice(1)

	
	$: if(globalThis.document)
		document.documentElement.style.setProperty('--primary-color', `var(--${tokenColors[$networkSlug] || tokenColors['ethereum']})`)


	import { fly } from 'svelte/transition'
	import { tokenColors } from '../../data/token-colors'
	import Preferences from '../../components/Preferences.svelte'
</script>


<style>
	main {
		max-width: var(--one-column-width);
		grid-template-columns: 100%;
	}

	select {
		max-width: 11.5rem;
	}
</style>


<svelte:head>
	<title>{$query ? `${$query} | ` : ''}{$networkSlug ? `${networkDisplayName} Explorer` : `Explorer`} | Blockhead</title>
</svelte:head>


<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<div class="bar">
		<h1>{$networkSlug ? `${networkDisplayName} Explorer` : `Explorer`}</h1>
		<label>
			<span>Testnets: </span>
			<input type="checkbox" bind:checked={showTestnets} />
		</label>
		<!-- svelte-ignore a11y-label-has-associated-control -->
		<label>
			<span>Blockchain: </span>
			<select bind:value={$networkSlug} on:input={() => globalThis.requestAnimationFrame(() => goto(`/explorer/${$networkSlug}${$query ? `/${$query}` : ''}`))}>
				{#each topNetworks as {name, slug, chainId}}
					{#if showTestnets}
					<!-- {#if showTestnets && topTestNetworks[slug]} -->
						<optgroup label={name} style={tokenColors[slug] ? `--primary-color: var(--${tokenColors[slug]})` : ''}>
							<option value={slug}>{name} Mainnet{chainId ? ` (${chainId})` : ''}</option>
							{#each testnetsForMainnets[slug] ?? [] as {name, slug, chainId}}
								<option value={slug}>{name}{chainId ? ` (${chainId})` : ''}</option>
							{/each}
						</optgroup>
					{:else}
						<option value={slug} style={tokenColors[slug] ? `--primary-color: var(--${tokenColors[slug]})` : ''}>{name}</option>
					{/if}
				{/each}
				<optgroup label="Other EVM Chains">
					{#each otherNetworks as {name, slug, chainId}}
						<option value={slug}>{name}{chainId ? ` (${chainId})` : ''}</option>
					{/each}
				</optgroup>
			</select>
		</label>
	</div>

	<div class="stack">
		<slot />
	</div>
</main>

<Preferences
	relevantPreferences={[
		'theme',
		'rpcNetwork', 'tokenBalancesProvider', 'currentPriceProvider', 'historicalPriceProvider', 'transactionsProvider',
		'quoteCurrency'
	]}
/>