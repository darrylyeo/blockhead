<script lang="ts">
	import type { Covalent } from '../data/analytics/covalent'

	export let logEvent: Covalent.LogEvent

	export let contextualAddress: Ethereum.Address // used for summary
	export let detailLevel: 'summary' | 'detailed' | 'exhaustive' = 'detailed'

	import Address from './Address.svelte'
	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
</script>

<style>
	.log-event {
		display: flex;
		gap: var(--padding-inner);
	}
	.parameters {
		display: flex;
		flex-wrap: wrap;
		gap: var(--padding-inner);
	}
	.parameter {
		flex: 0 auto;
	}
</style>

<div class="log-event">
	{#if logEvent.decoded}
		<span class="log-event-name">{logEvent.decoded.name}</span>
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
	{/if}
	<EthereumBlockNumber blockNumber={logEvent.block_height} />
</div>
<!--
block_height: 10874999
block_signed_at: "2020-09-16T19:25:54Z"
decoded: {name: "BalanceIncrease", signature: "BalanceIncrease(indexed address user, indexed addr…d, uint256 amount, uint256 reason, uint256 nonce)", params: Array(5)}
log_offset: 141
raw_log_data: "0x000000000000000000000000000000000000000000000000031b76fa8f1e4a0000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000"
raw_log_topics: (3) ["0x14d4d01c4d5dc621bda40cbf92745f0f6510eb2f5ef6a8f2d026bd4f659e58d4", "0x00000000000000000000000032c0e726a927b4d1cb16c09945f0e4cd89dbafc3", "0x0000000000000000000000000000000000000000000000000000000000000000"]
sender_address: "0x7ee7ca6e75de79e618e88bdf80d0b1db136b22d0"
sender_address_label: null
tx_hash: "0x569965cbbdae7645671814e7be3de9ac529b60911237b980a9db1050e04ebbab"
tx_offset
-->