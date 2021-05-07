<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import type { AnalyticsProvider } from '../data/analytics/provider'
	import { getBlock } from '../data/analytics/covalent'
	
	export let network: Ethereum.Network
    export let blockNumber: Ethereum.BlockNumber
	export let provider: Ethereum.Provider
	export let analyticsProvider: AnalyticsProvider

	import Date from './Date.svelte'
	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
	import Loader from './Loader.svelte'
</script>

<div class="card">
	<div class="bar">
        <h2><EthereumBlockNumber {network} {blockNumber}/></h2>
		<span class="card-annotation">Ethereum Block</span>
	</div>


	{#if analyticsProvider === 'Covalent'}
		<Loader
			loadingIcon={'/logos/covalent-logomark.svg'}
			loadingIconName={'Covalent'}
			loadingMessage="Retrieving block data from {analyticsProvider}..."
			errorMessage="Error retrieving block data from {analyticsProvider}"
			fromPromise={() => getBlock({blockNumber})}
			let:then={block}
		>
			{#each block.items as blockItem}
				<div class="card">
					<h3>Signed At</h3>
					<Date date={blockItem.signed_at} layout="horizontal" />
				</div>
			{/each}
		</Loader>
	{/if}
</div>