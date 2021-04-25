<script lang="ts">
	import type { ENS } from '../data/ens'
	import { queryENSDomain, queryENSDomainsContaining } from '../data/ens'
	
	export let query: string
	
	const sortByLength = (a, b) => a.name.length - b.name.length
	
	import EnsDomain from './EnsDomain.svelte'
	import Loader from './Loader.svelte'
</script>

<style>
	.explorer {
		gap: 1.5em;
	}
</style>

<section class="explorer">
	<Loader
		fromStore={() => queryENSDomain(query)}
		loadingIcon="/logos/ens.svg"
		loadingIconName="The Graph"
		loadingMessage="Querying the Ethereum Name Service..."
		let:then={{domains}}
	>
		{#each domains.sort(sortByLength) as domain (domain.id)}
			<EnsDomain {domain}/>
		{:else}
			<div class="card">
				<p>The ENS name "{query}" doesn't have an owner.</p>
				<a href="https://app.ens.domains/name/{domain}" target="_blank"><button>Register On ENS</button></a>
			</div>
		{/each}

		<Loader
			fromStore={() => queryENSDomainsContaining(query)}
			loadingIcon="/logos/ens.svg"
			loadingIconName="The Graph"
			loadingMessage="Querying the Ethereum Name Service for similar names..."
			let:then={{domains}}
			showIf={({domains} = {}) => domains.length}
		>
			<svelte:fragment slot="header" let:status>
				{#if status === 'resolved'}
					<hr>
					<h2>Similar ENS Names</h2>
				{/if}
			</svelte:fragment>
	
			{#each domains.sort(sortByLength) as domain (domain.id)}
				<EnsDomain {domain}/>
			{:else}
				<div class="card">
					<p>The ENS name "{query}" doesn't have an owner.</p>
					<a href="https://app.ens.domains/name/{domain}" target="_blank"><button>Register On ENS</button></a>
				</div>
			{/each}
		</Loader>
	</Loader>
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