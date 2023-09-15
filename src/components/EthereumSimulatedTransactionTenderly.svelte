<script lang="ts">
	import type { Ethereum } from '../data/networks/types'

	
	export let network: Ethereum.Network
	export let contextualAddress: Ethereum.Address

	export let data


	import { formatIdentifierToWords } from '../utils/formatIdentifierToWords'



	// import EthereumTransactionEtherspot from './EthereumTransactionEtherspot.svelte'
</script>


<style>
	dl {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		gap: 0 var(--padding-inner);
		font-size: 0.9em;
	}
	dl > span {
		display: flex;
    	gap: 0.6ch;
	}
	dt {
		opacity: 0.6;
	}
</style>


{#if data}
	<!-- <EthereumTransactionEtherspot
		{network}
		transaction={{
			from: data.transaction.from,
			to: data.transaction.to,
			timestamp: data.transaction.timestamp,
			value: data.transaction.value,
			status: data.transaction.status,
			hash: data.transaction.hash,
			gas: data.transaction.gas,
			nonce: data.transaction.nonce,
			block_number: data.transaction.block_number,
		}}

		{contextualAddress}
		detailLevel="exhaustive"
		showFees
	/> -->

	<section>
		<h4>Stack Trace</h4>

		<div class="scrollable-list" style="--resizeVertical-defaultHeight: 6rem;">
			{#each data.transaction.transaction_info.stack_trace as item, i}
				<dl>
					{#each Object.entries(item) as [key, value], i}
						<span>
							<dt>{formatIdentifierToWords(key)}</dt>
							<dd>{value}</dd>
						</span>
					{/each}
				</dl>
			{/each}
		</div>
	</section>

	<hr>

	<section>
		<h4>Call Trace</h4>

		<dl>
			{#each Object.entries(data.transaction.transaction_info.call_trace) as [key, value], i}
				<span>
					<dt>{formatIdentifierToWords(key)}</dt>
					<dd>
						{#if value && typeof value === 'object'}
							{@const object = value}

							<dl>
								{#each Object.entries(object) as [key, value], i}
									<span>
										<dt>{formatIdentifierToWords(key)}</dt>
										<dd>{value}</dd>
									</span>
								{/each}
							</dl>
						{:else}
							{value}
						{/if}
					</dd>
				</span>
			{/each}
		</dl>
	</section>
{/if}
