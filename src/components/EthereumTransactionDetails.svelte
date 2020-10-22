<script lang="ts">
	export let transactionID
	export let provider

	import EthereumTransaction from './EthereumTransaction.svelte'
</script>

<div class="card">
	<div class="bar">
		<h2><EthereumTransaction {transactionID}/></h2>
		<span class="card-annotation">Ethereum Transaction</span>
	</div>
</div>