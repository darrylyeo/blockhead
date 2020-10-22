<script lang="ts">
	import type { ENS } from '../data/ens'
	
	export let domain: ENS.Domain

	import Address from './Address.svelte'
	import EnsDomainEvent from './EnsDomainEvent.svelte'
	import EnsResolver from './EnsResolver.svelte'
</script>

<style>
	.row {
		/* display: flex;
		flex-wrap: wrap; */
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
		align-items: stretch;
		gap: var(--padding-inner);

	}
	.row > * {
		flex: 1 16rem;
		padding: var(--padding-outer);
	}

	.subdomains {
		font-size: 0.8em;

		display: flex;
		flex-wrap: wrap;
		margin: calc(-0.5 * var(--padding-inner));
		justify-content: space-evenly;
	}
	.subdomains > :global(*) {
		padding: calc(0.5 * var(--padding-inner));
		flex: 0 auto;
		max-width: 20em;
	}
</style>

<div class="card domain">
	<div class="bar">
		<h2><Address address={domain.name}/></h2>
		<span class="card-annotation">ENS Name</span>
	</div>
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
		{#if domain.resolver}
			<div class="card">
				<h3>Resolver</h3>
				<Address address={domain.resolver.address}/>
				<!-- <EnsResolver resolver={domain.resolver}/> -->
			</div>
		{/if}
		{#if domain.parent}
			<div class="card">
				<h3>Subdomain of</h3>
				<Address address={domain.parent.name}/>
			</div>
		{/if}
	</div>

	<!-- {#if domain.labelhash}
		<p>Hash: {domain.labelhash}</p>
	{/if} -->


	{#if domain.subdomains && domain.subdomains.length}
		<div class="card">
			<h3>Subdomains</h3>
			<div class="subdomains">
				{#each domain.subdomains as subdomain}
					<Address address={subdomain.name}/>
				{/each}
			</div>
		</div>
	{/if}
	
	{#if domain.events}
		<div class="card">
			<h3>Transaction History</h3>
			{#each domain.events as event (event.id)}
				<EnsDomainEvent event={event}/>
			{/each}
		</div>
		<!-- <hr>
		<h3>Transaction History</h3>
		{#each domain.events as event (event.id)}
			<EnsDomainEvent event={event}/>
		{/each} -->
	{/if}
</div>