<script lang="ts">
	import type { Covalent } from '../data/analytics/covalent'
	import type { Ethereum } from '../data/ethereum/types'


	export let network: Ethereum.Network
	export let logEvent: Covalent.LogEvent

	export let contextualAddress: Ethereum.Address // used for summary
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'


	$: isSummary = detailLevel === 'summary'
	$: isExhaustive = detailLevel === 'exhaustive'

	$: paramsContainingContextualAddress = new Set(
		contextualAddress
			? logEvent.decoded?.params?.filter(param => (
				param.type === 'address' &&
				param.value.toLowerCase() == contextualAddress.toLowerCase()
			))
			: []
	)

	export let isHidden
	$: isHidden = !(logEvent.decoded && (isExhaustive || paramsContainingContextualAddress.size))


	import Address from './Address.svelte'
</script>


<style>
	.log-event {
		display: grid;
		grid-template-columns: 9rem 1fr;
		gap: var(--padding-inner);
		--padding-inner: 1.25em;
		align-items: baseline;
		border-radius: 0.3em;
	}
	.log-event:not(.hidden):hover {
		backdrop-filter: contrast(1.05);
	}

	.log-event-name-and-index {
		font-size: 1em;
	}
	.log-event-index {
		opacity: 0.6;
	}
	.log-event-name {
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


	.log-event.hidden {
		text-align: end;
	}
	.log-event.hidden + :global(.log-event.hidden) {
		display: none;
	}

	/* .log-event.hidden {
		display: none;
	}
	.log-event:not(.hidden) + :global(.log-event.hidden) { 
		display: grid;
	} */
</style>


{#if !isHidden}
	<div class="log-event">
		<h4 class="log-event-name-and-index bar">
			{#if isExhaustive}<span class="log-event-index">{logEvent.log_offset}</span>{/if}
			<span class="log-event-name" class:mark={isExhaustive && paramsContainingContextualAddress.size}>{logEvent.decoded.name.replace(/[A-Z]/g, m => ` ${m}`)}</span>
		</h4>
		{#if logEvent.decoded.params?.length}
			<span class="parameters">
				{#each logEvent.decoded.params as param}
					<span class="parameter">
						<span class="parameter-name">{param.name.replace(/[A-Z]/g, m => ` ${m.toLowerCase()}`)}</span>
						{#if param.type === 'address'}
							<span class="address" class:mark={paramsContainingContextualAddress.has(param)}>
								<Address {network} address={param.value} format="middle-truncated" />
							</span>
						{:else}
							<output class="parameter-value">{param.value}</output>
						{/if}
					</span>
				{/each}
			</span>
		{/if}
	</div>
{:else}
	<div class="log-event hidden">
		<span class="log-event-name">• • •</span>
		<span class="parameters">• • •</span>
	</div>
{/if}