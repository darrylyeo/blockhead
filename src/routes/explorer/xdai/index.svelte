<script lang="ts">
	import type { Ethereum } from '../../../data/ethereum/types'
	import { getContext } from 'svelte'


	const explorerNetwork = getContext<SvelteStore<Ethereum.Network>>('explorerNetwork')
	const explorerProvider = getContext<SvelteStore<Ethereum.Provider>>('explorerProvider')
	const blockNumber = getContext<SvelteStore<number>>('blockNumber')


	import EthereumBlockHeight from '../../../components/EthereumBlockHeight.svelte'
</script>

<style>
	.row {
		align-items: stretch;
	}
	.row > * {
		flex: 1 20rem;
	}
</style>

<div class="row">
	<section class="card">
		<EthereumBlockHeight
			network={$explorerNetwork}
			provider={$explorerProvider}
			blockNumber={$blockNumber}
		/>
	</section>
</div>