<script lang="ts">
	export let address
	export let provider

	import Address from './Address.svelte'
	import Balance from './Balance.svelte'
</script>

<div class="card">
	<div class="bar">
		<h2><Address {address}/></h2>
		<span class="card-annotation">Ethereum Account</span>
	</div>
	<Balance {provider} {address} />
</div>