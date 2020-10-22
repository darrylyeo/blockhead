<script lang="ts">
	import type { ENS } from '../data/ens'
	
	export let domain: ENS.Domain

	import Address from './Address.svelte'
	import EnsDomainEvent from './EnsDomainEvent.svelte'
	import EnsResolver from './EnsResolver.svelte'
</script>

<style>
	.row {
		display: flex;
		align-items: stretch;
		flex-wrap: wrap;
		gap: var(--padding-inner);
	}
	.row > * {
		flex: 1 20rem;
		padding: var(--padding-outer);
	}
</style>

{#if domain}
	<div class="card domain">
		<h2>{domain.name}</h2>
		<div class="row">
			{#if domain.resolvedAddress}
				<div class="card">
					<h3>Resolves to</h3>
					<Address address={domain.resolvedAddress.id}/>
				</div>
			{/if}
			{#if domain.owner}
				<div class="card">
					<h3>Owned by</h3>
					<Address address={domain.owner.id}/>
				</div>
			{/if}
		</div>
		{#if domain.labelhash}
			<p>Hash: {domain.labelhash}</p>
		{/if}
		{#if domain.resolver}
			<h3>Resolver</h3>
			<EnsResolver resolver={domain.resolver}/>
		{/if}
		
		{#if domain.events}
			<hr>

			<h3>Transaction History</h3>
			{#each domain.events as event (event.id)}
				<EnsDomainEvent event={event}/>
			{/each}
		{/if}
	</div>
{/if}