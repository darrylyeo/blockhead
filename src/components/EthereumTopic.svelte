<script lang="ts">
	import type { Ethereum } from '../data/networks/types'


	export let topicHash: Ethereum.TopicHash | undefined
	export let topicIndex: 0 | 1 | 2 | 3 | undefined
	export let parameterType: Ethereum.ContractFunctionParameter['type'] | 'signature'
	export let parameterName: Ethereum.ContractFunctionParameterName | undefined
	export let parameterSignature: string | undefined

	$: formattedParameterSignature = parameterSignature?.replace('(', `(\n\t`).replace(/, ?/g, `,\n\t`).replace(')', `\n)`)
</script>


{#if topicHash}
	<abbr
		class="topic-hash"
		title="{parameterType || parameterName ? `${[parameterType, parameterName].filter(Boolean).join(' ')}\n\n` : ``}{topicHash ? `Topic ${topicIndex}: ${topicHash}` : ''}"
	>
		<slot>
			{parameterName}
		</slot>
	</abbr>
{:else}
	<slot>
		{parameterName}
	</slot>
{/if}
