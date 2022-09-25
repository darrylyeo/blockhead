<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { Log } from '../data/moralis/api/Api'

	export let network: Ethereum.Network
	export let logEvent: Log

	$: topics = [logEvent.topic0, logEvent.topic1, logEvent.topic2, logEvent.topic3].filter(Boolean)
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


<div class="log-event">
	<h4 class="log-event-index">{logEvent.log_index}</h4>
	{#if topics.length}
		<span class="topics">
			{#each topics as topic, i}
				<span class="topic-wrapper">
					<span class="topic-index">Topic {i}</span>
					<output class="topic-value">{topic}</output>
				</span>
			{/each}
		</span>
	{/if}
</div>