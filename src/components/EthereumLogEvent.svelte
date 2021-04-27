<script lang="ts">
	import type { Covalent } from '../data/analytics/covalent'
	import type { Ethereum } from '../data/ethereum/types'

	export let logEvent: Covalent.LogEvent

	export let contextualAddress: Ethereum.Address // used for summary
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'

	import Address from './Address.svelte'
</script>

<style>
	.log-event {
		display: grid;
		grid-template-columns: 9rem 1fr;
		gap: var(--padding-inner);
		--padding-inner: 1.25em;
	}
	.log-event-name {
		display: inline-block;
		font-size: 1em;
		text-align: end;
	}

	.parameters {
		display: flex;
		flex-wrap: wrap;
		gap: 0 var(--padding-inner);
		font-size: 0.9em;
	}
	.parameter {
		flex: 0 auto;
		display: inline-block;
	}
	.parameter-name {
		opacity: 0.6;
	}
</style>

{#if logEvent.decoded && !(
	detailLevel === 'summary' &&
	logEvent.decoded?.params?.every(param => !(
		param.type === 'address' &&
		param.value.toLowerCase() == contextualAddress.toLowerCase()
	))
)}
	<div class="log-event">
		<h4 class="log-event-name">{logEvent.decoded.name}</h4>
		{#if logEvent.decoded.params?.length}
			<span class="parameters">
				{#each logEvent.decoded.params as {type, name, value}}
					<span class="parameter">
						<span class="parameter-name">{name}</span>
						{#if type === 'address'}
							<Address address={value} format="middle-truncated" />
						{:else}
							<span class="parameter-value">{value}</span>
						{/if}
					</span>
				{/each}
			</span>
		{/if}
	</div>
{/if}