<script lang="ts">
	import { onMount } from 'svelte'
	import type { ENS } from '../data/ens'
	
	export let query: string
	
	let domainQuery
	let domainsContainingQuery
	onMount(async () => {
		const { initENSClient, queryENSDomain, queryENSDomainsContaining} = await import('../data/ens')
		initENSClient()
		domainQuery = queryENSDomain(query)
		domainsContainingQuery = queryENSDomainsContaining(query)
	})
	
	let domains: ENS.Domain[]
	let domainsContaining: ENS.Domain[]

	const sortByLength = (a, b) => a.name.length - b.name.length
	
	import EnsDomain from './EnsDomain.svelte'
	import Loading from './Loading.svelte'
</script>

<style>
	.explorer {
		gap: 1.5em;
	}
</style>

<section class="explorer">
	{#if domainQuery && $domainQuery}
		{#if $domainQuery.loading}
			<Loading iconAnimation="hover">
				<img slot="icon" src="/logos/ens.svg" alt="The Graph" width="25">
				<p>Querying the Ethereum Name Service...</p>
			</Loading>
		{:else if domains = $domainQuery.data?.domains}
			{#each domains.sort(sortByLength) as domain (domain.id)}
				<EnsDomain {domain}/>
			{:else}
				<div class="card">
					<p>The ENS name "{query}" doesn't have an owner.</p>
					<a href="https://app.ens.domains/name/{domain}" target="_blank"><button>Register On ENS</button></a>
				</div>
			{/each}
		{:else if $domainQuery.error}
			<pre>{$domainQuery.error}</pre>
		{/if}
	{/if}

	{#if domainsContainingQuery && $domainsContainingQuery}
		{#if $domainsContainingQuery.loading}
		{:else if (domainsContaining = $domainsContainingQuery.data?.domains) && domainsContaining.length}
			<hr>
			<h2>Similar ENS Names</h2>
			{#each domainsContaining.sort(sortByLength) as domain (domain.id)}
				<EnsDomain {domain}/>
			{/each}
		{:else if $domainsContainingQuery.error}
			<pre>{$domainsContainingQuery.error}</pre>
		{/if}
	{/if}
</section>


<!--
{#await $domainQuery}
	<Loading>Querying the Ethereum Name Service...</Loading>
{:then domainQuery}
	<h2>{$domainQuery.name}</h2>
	<p>{$domainQuery.labelName}</p>
	<p>Hash: {$domainQuery.labelhash}</p>
	<p>Owner: {$domainQuery.owner}</p>
	<p>Resolver: {$domainQuery.resolver}</p>
	{#each $domainQuery.events || [] as event}
		{event}
	{/each}
{:catch error}

{/await}
-->