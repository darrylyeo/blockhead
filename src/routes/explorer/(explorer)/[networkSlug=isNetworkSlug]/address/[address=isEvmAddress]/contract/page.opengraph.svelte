<script lang="ts">
	$: ({
		pageData: {
			bytecode,
			contractMetadata,
			addressType,
			contractName,
			sourcePaths,
		},
	} = $$props as {
		pageData: Awaited<ReturnType<typeof import('./page.opengraph').load>>,
	})
</script>


<div class="column">
	{#each sourcePaths?.slice(1) ?? [] as sourcePath}
		{@const source = contractMetadata && contractMetadata.contractMetadata.sources[sourcePath]}
		<pre>
			{source && source.content || ''}
		</pre>
	{/each}
</div>


<style>
	pre {
		font-size: 0.66em;
		opacity: 0.5;
	}
</style>
