<script lang="ts">
	let address

	import { goto } from '@sapper/app'
	import Address from "../../components/Address.svelte"
</script>

<style>

</style>

<svelte:head>
	<title>Blockhead Explorer</title>
</svelte:head>

<h2>
	<Address editable={true} bind:address={address} on:change={goto(`explorer/${address}`)} />
</h2>