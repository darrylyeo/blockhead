<script lang="ts">
	// Types/constants
	import type { Ethereum } from '$/data/networks/types'


	// Inputs
	export let network: Ethereum.Network
	export let param: Ethereum.ContractFunctionParameter


	// Components
	import Address from './Address.svelte'
	import EthereumParameters from './EthereumParameters.svelte';
</script>


<div
	class="value"
	class:scrollable-list={param.type?.endsWith('[]') && param.value?.length > 10}
>
	{#if param.type === 'tuple'}
		<div class="column card">
			<EthereumParameters
				{network}
				inputDecoded={{ params: param.value }}
				showMethodName={false}
			/>
		</div>
	{:else if param.type?.endsWith('[]')}
		{#if param.value?.length}
			<ol class="column">
				{#each param.value as value}
					<li>
						<output title={value}>
							{#if param.type === 'address[]'}
								<Address
									{network}
									address={value}
								/>
							{:else}
								{value}
							{/if}
						</output>
					</li>
				{/each}
			</ol>
		{:else}
			<div class="placeholder" data-after="–"></div>
		{/if}
	{:else if param.type === 'address'}
		<output title={param.value}>
			<Address
				{network}
				address={param.value}
			/>
		</output>
	{:else if param.value}
		<output title={param.value}>
			{param.value}
		</output>
	{:else}
		<div class="placeholder" data-after="–"></div>
	{/if}
</div>



<style>
	output {
		max-height: 6lh;
		overflow-y: auto;
	}

	ol {
		list-style: none;
	}
</style>
