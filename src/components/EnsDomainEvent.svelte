<script lang="ts">
	import type { ENS } from '../data/ens'
	
	export let event: ENS.DomainEvent
	console.log(event)

	import Address from './Address.svelte'
	import EthereumTransactionSummary from './EthereumTransactionSummary.svelte'
</script>

<style>
	.domain-event {
		--padding-inner: 0.5em;
	}
	.domain-event > :global(.transaction) {
		font-size: 0.66em;
		justify-self: end;
	}
</style>

<div class="card domain-event">
	<p>
		{#if event.__typename === 'Transfer'}
			<strong>Transferred to</strong>
			<Address address={event.owner.id}/>
		{:else if event.__typename === 'NewOwner'}
			<strong>Owner changed to</strong>
			<Address address={event.owner.id}/>
		{:else if event.__typename === 'NewResolver'}
			<strong>Resolver changed to</strong>
			<Address address={event.resolver.address}/>
		{:else if event.__typename === 'NewTTL'}
			<strong>Time To Live (TTL) changed to</strong>
			<span>{event.ttl}</span>
		{/if}
	</p>
	<EthereumTransactionSummary transactionID={event.transactionID} blockNumber={event.blockNumber}/>
</div>