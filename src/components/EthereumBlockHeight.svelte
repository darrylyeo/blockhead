<script lang="ts">
	import type { Ethereum } from '../data/ethereum/types'


	export let network: Ethereum.Network
	export let provider: Ethereum.Provider
	export let blockNumber: number


	import Loader from './Loader.svelte'
	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
	import TokenIcon from './TokenIcon.svelte'
</script>

<div class="bar">
	<h3>Block Height</h3>
	<!-- <span class="card-annotation">{$preferredEthereumProvider}</span> -->
</div>
<Loader
	loadingMessage="Retrieving statistics..."
	fromPromise={() => new Promise(r => provider.once('block', r))}
>
	<TokenIcon slot="loadingIcon" token={network.nativeCurrency.symbol} />

	<p class="centered">
		<span>The {network.name} blockchain is </span>
		<EthereumBlockNumber {network} {blockNumber} format="number-only" />
		<span> blocks long.</span>
	</p>
</Loader>

