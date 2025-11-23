<script lang="ts">
	import { getContractEvents } from '$/data/Curvegrid-Multibaas.remote.ts'

	// Note: This requires CURVEGRID_MULTIBAAS_DEPLOYMENT_HOSTNAME to be set in environment variables
	// If baseUrl is not provided, it will use the environment variable
	const chain = 'ethereum'
	const contractLabel = 'usdt'
	const eventName = 'Transfer'

	let events = getContractEvents({ chain, contractLabel, eventName })
</script>

<h1>Curvegrid API Test</h1>

<h2>Contract Events</h2>
<p>Querying: {chain} / {contractLabel} / {eventName}</p>
<p style="color: orange;">Note: Using CURVEGRID_MULTIBAAS_DEPLOYMENT_HOSTNAME from environment variables</p>

<svelte:boundary>
	{#await events}
		<p>Loading Events...</p>
	{:then result}
		<pre>{JSON.stringify(result, (key, value) => typeof value === 'bigint' ? value.toString() : value, 2)}</pre>
	{:catch error}
		<p style="color: red">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
		{#if error instanceof Response}
			<p>Status: {error.status} {error.statusText}</p>
		{/if}
	{/await}
</svelte:boundary>
