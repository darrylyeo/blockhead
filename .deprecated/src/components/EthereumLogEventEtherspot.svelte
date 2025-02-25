<script lang="ts">
	import type { Ethereum } from '$/data/networks/types'
	import type { Transaction } from '$/api/etherspot'

	export let network: Ethereum.Network
	export let logEvent: Transaction['logs'][number]
</script>


<style>
	.log-event {
		display: grid;
		grid-template-columns: 1rem 1fr;
		align-items: center;
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


<div class="log-event">
	<h4 class="log-event-index">{logEvent.logIndex}</h4>
	{#if logEvent.topics.length}
		<span class="topics">
			{#each logEvent.topics as topic, i}
				<span class="topic-wrapper">
					<span class="topic-index">Topic {i}</span>
					<output class="topic-value">{topic}</output>
				</span>
			{/each}
		</span>
	{/if}
</div>