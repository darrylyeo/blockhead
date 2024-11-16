<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'


	// Inputs
	export let network: Ethereum.Network
	export let inputDecoded: NonNullable<Ethereum.Transaction['inputDecoded']>
	export let showFormattedNames = true
	export let showMethodName = false


	// Functions
	import { isTruthy } from '$/utils/isTruthy'
	import { formatIdentifierToWords } from '$/utils/formatIdentifierToWords'


	// Internal state
	$: formatIdentifier = (
		showFormattedNames
			? formatIdentifierToWords
			: (identifier: string) => identifier
	)


	// Components
	import EthereumParameterValue from './EthereumParameterValue.svelte'


	// Transitions
	import { scale } from 'svelte/transition'
</script>


<div>
	{#if showMethodName}
		<div class="row inline">
			{#if inputDecoded.methodName}
				<h5>{formatIdentifier(inputDecoded.methodName)}</h5>
			{/if}
			{#if inputDecoded.methodHash}
				(<output>{inputDecoded.methodHash}</output>)
			{/if}
		</div>
	{/if}

	{#if inputDecoded.params?.length}
		<div class="params column">
			{#each inputDecoded.params as param, i (`${inputDecoded.methodName || i}/${param.name || i}`)}
				<label
					class="param"
					transition:scale={{ duration: 300, start: 0.8, delay: i * 25 }}
				>
					<span>
						{#if param.name}
							<abbr title={param.name}>{formatIdentifier(param.name, true)}</abbr>
						{:else}
							<span class="index">Input {i + 1}</span>
						{/if}
					</span>

					<EthereumParameterValue
						{network}
						{param}
					/>

					<abbr
						class="card-annotation"
						title={`${param.type} (${[param.indexed && 'indexed', param.internalType].filter(isTruthy).join(' ')})}`}
					>{param.type}</abbr>
				</label>
			{/each}
		</div>
	{/if}
</div>


<style>
	.params {
		display: grid;
		grid-template-columns: minmax(max-content, 0.1fr) minmax(0, 1fr) minmax(max-content, 0.1fr);
		gap: 1em;

		.param {
			display: grid;
			grid-template-columns: subgrid;
			grid-column: 1 / -1;
			align-items: center;

			gap: 1em;

			> :first-child {
				text-align: end;
			}
		}

		.index {
			opacity: 0.8;
		}

		.value {
			--resizeVertical-defaultHeight: 10lh;
		}
	}
</style>
