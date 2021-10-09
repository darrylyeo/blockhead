<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'
	import { getBlock } from '../data/analytics/covalent'
	import { preferences } from '../data/ethereum/preferences'


	export let network: Ethereum.Network
	export let blockNumber: Ethereum.BlockNumber
	export let provider: Ethereum.Provider
	export let transactionProvider
	$: transactionProvider = $$props.transactionProvider || $preferences.transactionProvider


	import Date from './Date.svelte'
	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
	import Loader from './Loader.svelte'
	import TokenIcon from './TokenIcon.svelte'
</script>


<div class="card">
	<div class="bar">
		<h2><EthereumBlockNumber {network} {blockNumber}>Block #{blockNumber}</EthereumBlockNumber></h2>
		<span class="card-annotation">{network.name} Block</span>
	</div>


	{#if transactionProvider === 'Covalent'}
		<Loader
			loadingIcon={'/logos/covalent-logomark.svg'}
			loadingIconName={transactionProvider}
			loadingMessage="Retrieving block data from {transactionProvider}..."
			errorMessage="Error retrieving block data from {transactionProvider}"
			fromPromise={() => getBlock({blockNumber, chainID: network.chainId})}
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