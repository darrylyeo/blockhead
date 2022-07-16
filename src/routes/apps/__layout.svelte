<script lang="ts">
	import { setContext } from 'svelte'
	import { derived, writable } from 'svelte/store'
	import { page } from '$app/stores'
	import { browser } from '$app/env'
	import { goto } from '$app/navigation'

	// const web3AppSlug = derived<typeof page, string>(page, ($page, set) =>
	// 	set($page.params.web3App || '')
	// )
	// // $: $web3AppSlug = $page.params.web3App
	const web3AppSlug = writable<Web3AppSlug>($page.params.web3App || $page.url.pathname.match(/^\/apps\/([^/]+)/)?.[1] || '')
	const addressOrEnsName = writable<string>($page.params.addressOrEnsName || '')
	$: $web3AppSlug = $page.params.web3App || $page.url.pathname.match(/^\/apps\/([^/]+)/)?.[1] || ''
	$: $addressOrEnsName = $page.params.addressOrEnsName || ''

	setContext('web3AppSlug', web3AppSlug)
	setContext('addressOrEnsName', addressOrEnsName)

	// let path = $page.url.pathname
	// $: if(browser){
	// 	const newPath = `/apps${$web3AppSlug ? `/${$web3AppSlug}${$addressOrEnsName ? `/address/${$addressOrEnsName}` : ''}` : ''}`
	// 	console.log(newPath, path)
	// 	if(newPath !== path)
	// 		goto(newPath, {keepfocus: true})
	// }


	$: query = $page.params.query


	let currentView: 'Dashboard' | 'Explorer' | 'Account'
	$: currentView = 
		query || ($addressOrEnsName && $web3AppConfig.name) === 'ENS' ? 'Explorer' :
		$addressOrEnsName ? 'Account' :
		'Dashboard'


	import type { Web3AppConfig, Web3AppSlug} from '../../data/web3Apps'
	import { web3AppsBySection, web3AppsBySlug } from '../../data/web3Apps'


	// App context stores

	const web3AppConfig = derived<typeof web3AppSlug, Web3AppConfig>(web3AppSlug, ($web3AppSlug, set) => {
		if(web3AppsBySlug[$web3AppSlug])
			set(web3AppsBySlug[$web3AppSlug])
		else
			set(undefined)
	})
	setContext('web3AppConfig', web3AppConfig)


	$: if(globalThis.document)
		document.documentElement.style.setProperty('--primary-color', $web3AppConfig?.colors?.[$web3AppConfig.colors.length / 2 | 0] || `var(--${tokenColors['ethereum']})`)


	import { fly } from 'svelte/transition'
	import { tokenColors } from '../../data/token-colors'
	import Preferences from '../../components/Preferences.svelte'
	import TokenIcon from '../../components/TokenIcon.svelte'
	import InlineContainer from '../../components/InlineContainer.svelte'
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
	<title>{$addressOrEnsName || query ? `${$addressOrEnsName || query} | ` : ''}{$web3AppSlug && $web3AppConfig ? `${$web3AppConfig.name} ${currentView}` : `Apps`} | Blockhead</title>
</svelte:head>


<!-- <main in:fly={{x: 300}} out:fly={{x: -300}}> -->
<main>
	<div class="bar">
		<div class="row">
			<span class="title-icon">
				{#key $web3AppConfig}
					{#if $web3AppConfig}
						{#each $web3AppConfig.views?.flatMap(view => view.erc20Tokens ?? []).slice(0, 1) as erc20Token}
							<TokenIcon {erc20Token} />
						{/each}
					{:else}
						<img src="/Blockhead-Logo.svg" width="30" />
					{/if}
				{/key}
			</span>
			<h1>
				<a href="/apps/{$web3AppSlug}" class="stack-inline">
					{#if $web3AppSlug && $web3AppConfig}
						<span in:fly={{y: 20, duration: 200}} out:fly={{y: -20, duration: 200}}>
							<InlineContainer class="stack-inline">
								{#key $web3AppConfig}<mark in:fly={{y: 20, duration: 200}} out:fly={{y: -20, duration: 200}}>{$web3AppConfig.name}</mark>{/key}
							</InlineContainer>
							<InlineContainer class="stack-inline">
								{#key currentView}<span in:fly={{y: 20, duration: 200}} out:fly={{y: -20, duration: 200}}>{currentView}</span>{/key}
							</InlineContainer>
						</span>
					{:else}
						<span in:fly={{y: 20, duration: 200}} out:fly={{y: -20, duration: 200}}>
							Web3 Apps/Services
						</span>
					{/if}
				</a>
			</h1>
		</div>

		<label>
			<span>App</span>
			<select bind:value={$web3AppSlug} on:input={() => globalThis.requestAnimationFrame(() => goto(`/apps/${$web3AppSlug}${$addressOrEnsName ? `/address/${$addressOrEnsName}` : ''}`))}>
				<option value="" selected>Select App...</option>

				{#each web3AppsBySection as {title, apps}}
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
	relevantPreferences={[
		'theme',
		'rpcNetwork', 'defiProvider', 'nftsProvider', 'currentPriceProvider', 'historicalPriceProvider', 'transactionProvider',
		'quoteCurrency'
	]}
/>