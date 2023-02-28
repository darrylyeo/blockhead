<script lang="ts">
	import type { Ethereum } from '../data/networks/types'


	export let topicHash: Ethereum.TopicHash | undefined
	export let topicIndex: 0 | 1 | 2 | 3 | undefined
	export let parameterType: Ethereum.ContractFunctionParameter['type'] | 'signature'
	export let parameterName: Ethereum.ContractFunctionParameterName
</script>


{#if topicHash}
	<abbr class="topic-hash" title="{parameterType || parameterName ? `${[parameterType, parameterName].filter(Boolean).join(' ')}\n\n` : ``}{topicHash ? `Topic ${topicIndex}: ${topicHash}` : ''}">
		<slot />
	</abbr>
{:else}
	<slot />
{/if}