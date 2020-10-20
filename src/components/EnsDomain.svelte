<script lang="ts">
	import type { ENS } from '../data/ens'
	
	export let domain: ENS.Domain

	import Address from './Address.svelte'
	import EnsDomainEvent from './EnsDomainEvent.svelte'
	import EnsResolver from './EnsResolver.svelte'
</script>

{#if domain}
	<div class="card domain">
		<h2>{domain.name}</h2>
		{#if domain.resolvedAddress}
			<p>Resolves to: <Address address={domain.resolvedAddress.id}/></p>
		{/if}
		{#if domain.labelhash}
			<p>Hash: {domain.labelhash}</p>
		{/if}
		{#if domain.owner}
			<p>owned by <Address address={domain.owner.id}/></p>
		{/if}
		{#if domain.resolver}
			<h3>Resolver</h3>
			<EnsResolver resolver={domain.resolver}/>
		{/if}
		
		{#if domain.events}
			<hr>

			<h3>History</h3>
			{#each domain.events as event (event.id)}
				<EnsDomainEvent event={event}/>
			{/each}
		{/if}
	</div>
{/if}