<script lang="ts">
    export let blockNumber
    export let provider

	import EthereumBlockNumber from './EthereumBlockNumber.svelte'
</script>

<div class="card">
	<div class="bar">
        <h2><EthereumBlockNumber {blockNumber}/></h2>
		<span class="card-annotation">Ethereum Block</span>
	</div>
</div>