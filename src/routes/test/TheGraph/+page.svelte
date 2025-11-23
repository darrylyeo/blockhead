<script lang="ts">
	import { queryAmp } from '$/data/TheGraph.remote.ts'

	const simpleQuery = `
		SELECT number, hash 
		FROM blocks 
		ORDER BY number DESC 
		LIMIT 5
	`

	let result = queryAmp({ query: simpleQuery })
</script>

<h1>Amp API Test</h1>

<h2>Recent Blocks</h2>
<svelte:boundary>
	{#await result}
		<p>Loading Blocks...</p>
	{:then data}
		<pre>{JSON.stringify(data, null, 2)}</pre>
	{:catch error}
		<p style="color: red">Error: {error.message}</p>
	{/await}
</svelte:boundary>
