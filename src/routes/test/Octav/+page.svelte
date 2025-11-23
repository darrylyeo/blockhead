<script lang="ts">
	import { getDefiPositions, getCoins, getNetworks } from '$/data/Octav.remote.ts'
	import { EthereumMainnet } from '$/data/Network'

	const actor = {
		$network: EthereumMainnet.$id,
		address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' as `0x${string}`
	}

	let defiPositions = getDefiPositions({ actor })
	let coins = getCoins({ actor })
	let networks = getNetworks({ actor })
</script>

<h1>Octav API Test</h1>

<h2>DeFi Positions</h2>
<svelte:boundary>
	{#await defiPositions}
		<p>Loading DeFi Positions...</p>
	{:then result}
		<pre>{JSON.stringify(result, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)}</pre>
	{:catch error}
		<p style="color: red">Error: {error.message}</p>
	{/await}
</svelte:boundary>

<h2>Coins</h2>
<svelte:boundary>
	{#await coins}
		<p>Loading Coins...</p>
	{:then result}
		<pre>{JSON.stringify(result, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)}</pre>
	{:catch error}
		<p style="color: red">Error: {error.message}</p>
	{/await}
</svelte:boundary>

<h2>Networks</h2>
<svelte:boundary>
	{#await networks}
		<p>Loading Networks...</p>
	{:then result}
		<pre>{JSON.stringify(result, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)}</pre>
	{:catch error}
		<p style="color: red">Error: {error.message}</p>
	{/await}
</svelte:boundary>
