<script lang="ts">
	import type { Ethereum } from '../data/networks/types'


	export let network: Ethereum.Network
	export let blockNumber: number


	// import Loader from './Loader.svelte'
	// import EthereumBlockNumber from './EthereumBlockNumber.svelte'
	// import NetworkIcon from './NetworkIcon.svelte'

	import EthereumLatestBlockNumber from './EthereumLatestBlockNumber.svelte'
</script>

<div class="bar">
	<h3>Block Height</h3>
	<!-- <span class="card-annotation">{$preferences.rpcNetwork}</span> -->
</div>
<!-- <Loader
	loadingMessage="Retrieving statistics..."
	fromPromise={provider && (() => new Promise(r => provider.once('block', r)))}
>
	<NetworkIcon slot="loadingIcon" {network} />

	<p class="centered">
		<span>The {network.name} blockchain is </span>
		<EthereumBlockNumber {network} {blockNumber} />
		<span> blocks long.</span>
	</p>
</Loader> -->


<p class="centered">
	<span>The {network.name} blockchain is </span>
	<EthereumLatestBlockNumber {network} />
	<span> blocks long.</span>
</p>