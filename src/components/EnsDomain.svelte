<script lang="ts">
	import type { ENS } from '../data/ens'
	import type { Ethereum } from '../data/ethereum/types'
	
	export let network: Ethereum.Network
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
		<h2><Address {network} address={domain.name} /></h2>
		<span class="card-annotation">ENS Name</span>
	</div>
	<div class="row">
		{#if domain.resolvedAddress}
			<div class="card">
				<h3>Resolved Ethereum Address</h3>
				<Address {network} address={domain.resolvedAddress.id} />
			</div>
		{/if}
		{#if domain.owner}
			<div class="card">
				<h3>Owned by</h3>
				<Address {network} address={domain.owner.id} />
			</div>
		{/if}
		{#if domain.resolver}
			<div class="card">
				<h3>Resolver Contract</h3>
				<Address {network} address={domain.resolver.address} />
				<!-- <EnsResolver {network} resolver={domain.resolver}/> -->
			</div>
		{/if}
		{#if domain.parent}
			<div class="card">
				<h3>Subdomain of</h3>
				<Address {network} address={domain.parent.name || domain.parent.id} />
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
					<Address {network} address={subdomain.name}/>
				{/each}
			</div>
		</div>
	{/if}
	
	{#if domain.events}
		<div class="card">
			<h3>History</h3>
			<div class="column scrollable-list">
				{#each domain.events as event (event.id)}
					<EnsDomainEvent {network} {event}/>
				{/each}
			</div>
		</div>
	{/if}
</div>