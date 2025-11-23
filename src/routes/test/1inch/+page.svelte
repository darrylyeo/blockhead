<!-- TODO: getPortfolioValue is commented out due to 404 Not Found error -->
<!--
<script lang="ts">
	import { getPortfolioValue } from '$/data/1inch.remote.ts'
	import { EthereumMainnet } from '$/data/Network'

	const actor = {
		$network: EthereumMainnet.$id,
		address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' as `0x${string}`
	}

	let portfolio = getPortfolioValue({ actor })
</script>

<h1>1inch API Test</h1>

<h2>Portfolio</h2>

<svelte:boundary>
	{#await portfolio}
		<p>Loading...</p>
	{:then result}
		<pre>{JSON.stringify(result, null, 2)}</pre>
	{:catch error}
		<p style="color: red">Error: {error.message}</p>
	{/await}
</svelte:boundary>
-->

<h1>1inch API Test</h1>
<p style="color: orange;">Portfolio endpoints are temporarily disabled due to API 404 errors</p>
