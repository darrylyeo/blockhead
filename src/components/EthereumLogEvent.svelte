<script lang="ts">
	// Types/constants
	import type { Ethereum } from '../data/networks/types'


	// Inputs
	export let network: Ethereum.Network
	export let logEvent: Ethereum.TransactionLogEvent
	export let contextualAddress: Ethereum.Address | undefined

	// (View options)
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'


	// Functions
	import { isTruthy } from '../utils/isTruthy'
</script>


<style>
	.log-event {
		display: grid;
		grid-template-columns: minmax(1rem, auto) 1fr;
		align-items: baseline;
		gap: var(--padding-inner);
		--padding-inner: 1.25em;
	}
	.log-event-index {
		font-size: 1em;
		text-align: end;
	}

	.topics {
		display: flex;
		flex-wrap: wrap;
		gap: 0 var(--padding-inner);
		font-size: 0.9em;
	}
	.topic-wrapper {
		flex: 0 auto;
		display: inline-block;
	}
	.topic-index {
		opacity: 0.6;
	}
</style>


<div
	class="log-event"	
	title={[
		logEvent.indexInBlock !== undefined && `Event #${logEvent.indexInBlock} in Block ${logEvent.blockNumber}`,
		logEvent.indexInTransaction !== undefined && `Event #${logEvent.indexInTransaction} in Transaction ${logEvent.transactionHash}`,
	].filter(isTruthy).join('\n\n')}
>
	<h4 class="log-event-index">{logEvent.indexInBlock}</h4>

	{#if logEvent.topics?.length}
		<span class="topics">
			{#each logEvent.topics as topicHash, i}
				<span class="topic-wrapper">
					<span class="topic-index">Topic {i}</span>
					<output class="topic-value">{topicHash}</output>
				</span>
			{/each}
		</span>
	{/if}
</div>
