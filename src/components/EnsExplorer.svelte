<script lang="ts">
	import { onMount } from 'svelte'
	import type { ENS } from '../data/ens'
	
	export let domain: string
	
	let domainQuery
	onMount(async () => {
		const { queryENSDomain } = await import('../data/ens')
		domainQuery = queryENSDomain(domain)
	})
	
	let domains: ENS.Domain[]
	
	import EnsDomain from './EnsDomain.svelte'
	import Loading from './Loading.svelte'
</script>

<section>
	{#if domainQuery && $domainQuery}
		{#if $domainQuery.loading}
			<Loading>Querying the Ethereum Name Service...</Loading>
		{:else if domains = $domainQuery.data?.domains}
			{#each domains as domain (domain.id)}
 				<EnsDomain {domain}/>
			{/each}
		{:else if $domainQuery.error}
			<pre>{$domainQuery.error}</pre>
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