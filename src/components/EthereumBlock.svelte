<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import { getBlock } from '../data/analytics/covalent'
	
    export let blockNumber: Ethereum.BlockNumber
	export let provider: Ethereum.Provider
	export let analyticsProvider: AnalyticsProvider

	import Date from './Date.svelte'
	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
	import Loading from './Loading.svelte'
</script>

<div class="card">
	<div class="bar">
        <h2><EthereumBlockNumber {blockNumber}/></h2>
		<span class="card-annotation">Ethereum Block</span>
	</div>


	{#if analyticsProvider === 'Covalent'}
		{#await getBlock({blockNumber})}
			<Loading iconAnimation="hover">
				<img slot="icon" src="/logos/covalent-logomark.svg" alt="Covalent" width="25">
				<p>Fetching block data from Covalent...</p>
			</Loading>
		{:then block}
			{#each block.items as blockItem}
				<div class="card">
					<h3>Signed At</h3>
					<Date date={blockItem.signed_at} layout="horizontal" />
				</div>
			{/each}
		{:catch error}
			<div class="card">
				{error}
			</div>
		{/await}
	{/if}
</div>