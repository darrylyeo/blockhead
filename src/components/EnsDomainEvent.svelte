<script lang="ts">
	import type { ENS } from '../data/ens'
	import type { Ethereum } from '../data/networks/types'
	
	export let network: Ethereum.Network
	export let event: ENS.DomainEvent

	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'


	import Address from './Address.svelte'
	import EthereumTransactionLoader from './EthereumTransactionLoader.svelte'
	import EthereumTransactionSummary from './EthereumTransactionSummary.svelte'
</script>


<style>
	.transaction-summary {
		font-size: 0.66em;
		justify-self: end;
	}
</style>


<div class="ens-domain-event card">
	<EthereumTransactionLoader
		{network}
		transactionID={event.transactionID}
		contextualAddress={event.owner?.id || event.resolver?.address}

		{detailLevel}
		showIf={detailLevel !== 'summary'}
	>
		<svelte:fragment slot="header" let:status>
			<div class="bar">
				<h4>
					{#if event.__typename === 'Transfer'}
						<strong>Transferred to</strong>
						<Address {network} address={event.owner.id} format="middle-truncated" />
					{:else if event.__typename === 'NewOwner'}
						<strong>Owner changed to</strong>
						<Address {network} address={event.owner.id} format="middle-truncated" />
					{:else if event.__typename === 'NewResolver'}
						<strong>Resolver changed to</strong>
						<Address {network} address={event.resolver.address} format="middle-truncated" />
					{:else if event.__typename === 'NewTTL'}
						<strong>Time To Live (TTL) changed to</strong>
						<span>{event.ttl}</span>
					{:else}
						<p>{event.__typename}</p>
					{/if}
				</h4>

				<span class="card-annotation">
					<a href="/apps/ens#subgraph">ENS Subgraph</a> › {event.__typename.replace(/[A-Z]/g, m => ` ${m}`).trim()} › {event.id}
				</span>
			</div>

			<hr>

			{#if status !== 'resolved'}
				<span class="transaction-summary">
					<EthereumTransactionSummary
						{network}
						transactionID={event.transactionID}
						blockNumber={event.blockNumber}
					/>
				</span>
			{/if}
		</svelte:fragment>
	</EthereumTransactionLoader>
</div>