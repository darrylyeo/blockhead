<script lang="ts">
	import type { ENS } from '../data/ens'

	export let resolver: ENS.Resolver
	
	import EnsDomain from './EnsDomain.svelte'
</script>

<div class="card">
	<p>ID: {resolver.id}</p>
	{#if resolver.domain}
		<p>Domain: <EnsDomain domain={resolver.domain}/></p>
	{/if}
	{#if resolver.address}
		<p>Address: {resolver.address}</p>
	{/if}
	{#if resolver.addr}
		<p>Addr: {resolver.addr.id}</p>
	{/if}
	{#if resolver.texts}
		<p>Texts: {resolver.texts}</p>
	{/if}
	{#if resolver.coinTypes}
		<p>Coin Types: {resolver.coinTypes.join(', ')}</p>
	{/if}
</div>