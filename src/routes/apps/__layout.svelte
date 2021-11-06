<script lang="ts">
	import { setContext } from 'svelte'
	import { derived, writable } from 'svelte/store'
	import { page } from '$app/stores'
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'

	// const blockchainAppSlug = derived<typeof page, string>(page, ($page, set) =>
	// 	set($page.params.blockchainApp || '')
	// )
	// // $: $blockchainAppSlug = $page.params.blockchainApp
	const blockchainAppSlug = writable<BlockchainAppSlug>($page.params.blockchainApp || $page.path.match(/^\/apps\/([^/]+)/)?.[1] || '')
	const addressOrENSName = writable<string>($page.params.addressOrENSName || '')
	$: $blockchainAppSlug = $page.params.blockchainApp || $page.path.match(/^\/apps\/([^/]+)/)?.[1] || ''
	$: $addressOrENSName = $page.params.addressOrENSName || ''

	setContext('blockchainAppSlug', blockchainAppSlug)
	setContext('addressOrENSName', addressOrENSName)

	// let path = $page.path
	// $: if(browser){
	// 	const newPath = `/apps${$blockchainAppSlug ? `/${$blockchainAppSlug}${$addressOrENSName ? `/address/${$addressOrENSName}` : ''}` : ''}`
	// 	console.log(newPath, path)
	// 	if(newPath !== path)
	// 		goto(newPath, {keepfocus: true})
	// }


	$: query = $page.params.query


	let currentView: 'Dashboard' | 'Explorer' | 'Account'
	$: currentView = 
		query || ($addressOrENSName && $blockchainAppConfig.name) === 'ENS' ? 'Explorer' :
		$addressOrENSName ? 'Account' :
		'Dashboard'


	import type { BlockchainAppConfig, BlockchainAppSlug} from '../../data/blockchain-apps'
	import { blockchainApps, blockchainAppsBySlug, featuredBlockchainApps, notFeaturedBlockchainApps } from '../../data/blockchain-apps'


	// App context stores

	const blockchainAppConfig = derived<typeof blockchainAppSlug, BlockchainAppConfig>(blockchainAppSlug, ($blockchainAppSlug, set) => {
		if(blockchainAppsBySlug[$blockchainAppSlug])
			set(blockchainAppsBySlug[$blockchainAppSlug])
		else
			set(undefined)
	})
	setContext('blockchainAppConfig', blockchainAppConfig)


	$: if(globalThis.document)
		document.documentElement.style.setProperty('--primary-color', $blockchainAppConfig?.colors?.[$blockchainAppConfig.colors.length / 2 | 0] || `var(--${tokenColors['ethereum']})`)


	import { fly } from 'svelte/transition'
	import { tokenColors } from '../../data/token-colors'
	import Preferences from '../../components/Preferences.svelte'
	import TokenIcon from '../../components/TokenIcon.svelte'
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


<svelte:head>
	<title>{$addressOrENSName || query ? `${$addressOrENSName || query} | ` : ''}{$blockchainAppSlug && $blockchainAppConfig ? `${$blockchainAppConfig.name} ${currentView}` : `Apps`} | Blockhead</title>
</svelte:head>


<main in:fly={{x: 300}} out:fly={{x: -300}}>
	<div class="bar">
		<div class="row">
			<span class="title-icon">
				{#key $blockchainAppConfig}
					{#if $blockchainAppConfig}
						{#each $blockchainAppConfig.views?.flatMap(view => view.erc20Tokens ?? []).slice(0, 1) as {logoURI, address, name, symbol}}
							<TokenIcon
								{name}
								{symbol}
								icon={logoURI}
								tokenAddress={address}
							/>
						{/each}
						{#if $blockchainAppConfig.name === 'ENS'}<img src="/logos/ens.svg" width="30" />{/if}
					{:else}
						<img src="/Blockhead-Logo.svg" width="30" />
					{/if}
				{/key}
			</span>
			<h1>
				<a href="/apps/{$blockchainAppSlug}" class="stack-inline">
					{#if $blockchainAppSlug && $blockchainAppConfig}
						<span in:fly={{y: 20, duration: 200}} out:fly={{y: -20, duration: 200}}>
							<span class="stack-inline">{#key $blockchainAppConfig}<mark in:fly={{y: 20, duration: 200}} out:fly={{y: -20, duration: 200}}>{$blockchainAppConfig.name}</mark>{/key}</span>
							<span class="stack-inline">{#key currentView}<span in:fly={{y: 20, duration: 200}} out:fly={{y: -20, duration: 200}}>{currentView}</span>{/key}</span>
						</span>
					{:else}
						<span in:fly={{y: 20, duration: 200}} out:fly={{y: -20, duration: 200}}>
							Blockchain/Web 3.0 Apps
						</span>
					{/if}
				</a>
			</h1>
		</div>

		<label>
			<span>App</span>
			<!-- <select bind:value={$blockchainAppSlug}> -->
			<select bind:value={$blockchainAppSlug} on:input={() => globalThis.requestAnimationFrame(() => goto(`/apps/${$blockchainAppSlug}${$addressOrENSName ? `/address/${$addressOrENSName}` : ''}`))}>
				<option value="" selected>Select App...</option>
				<optgroup label="Featured">
					{#each featuredBlockchainApps as {name, slug}}
						<option value={slug}>{name}</option>
					{/each}
				</optgroup>
				<optgroup label="Other">
					{#each notFeaturedBlockchainApps as {name, slug}}
						<option value={slug}>{name}</option>
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
		'rpcNetwork', 'defiProvider', 'nftsProvider', 'currentPriceProvider', 'historicalPriceProvider', 'transactionProvider',
		'quoteCurrency'
	]}
/>